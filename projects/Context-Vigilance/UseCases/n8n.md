# n8n Flow: Zoom Bot → Meeting Summary → Salesforce Sync


## 1. What n8n is

**n8n** is a workflow automation platform: build flows from nodes, trigger them on events, and connect apps via prebuilt integrations or plain HTTP. It runs self‑hosted or in the cloud, uses JSON between nodes, and lets you add logic (code/expressions) where needed. Think of it as a visual glue layer for product operations.


## 2. Goal

When a Zoom meeting ends (or a recording/transcript becomes available), automatically produce a concise summary with action items, store the transcript, and **write a structured note to Salesforce** linked to the right Account/Contact/Opportunity. Optionally, notify the channel (Slack/Email) and file the full transcript in internal storage.



## 3. High‑level flow

1. **Trigger:** Receive a Zoom webhook for `meeting.ended` or `recording.completed`.
2. **Verify & filter:** Validate the Zoom signature; ignore events without permission or missing artifacts.
3. **Get transcript:** Prefer Zoom transcript (if enabled). Otherwise, fetch audio and transcribe via an approved ASR provider.
4. **Summarize:** Call an LLM with a controlled prompt to produce a short, structured brief: who/when, purpose, key decisions, risks, action items with owners/dates.
5. **Resolve CRM links:** Find or create the related Contact/Account in Salesforce; optionally link to an Opportunity.
6. **Upsert note/task:** Write the summary, attach links to recording/transcript, and store normalized fields for reporting.
7. **Notify:** Post the summary to Slack/Email with a link to the Salesforce record.
8. **Idempotency & logs:** Deduplicate by Zoom event ID; keep an audit trail of API calls.



## 4. Prerequisites

* **Zoom**: Webhook app with events `meeting.ended` and/or `recording.completed`; transcript enabled if available.
* **Salesforce**: Connected App (OAuth) and a minimal schema for notes/tasks or a custom `Meeting__c` object.
* **LLM provider**: HTTP endpoint or dedicated n8n node; a prompt and a token.
* **Optional ASR**: Speech‑to‑text provider if Zoom transcripts are unavailable.
* **Storage**: S3/GCS/Supabase Storage (or Salesforce Files) for transcripts if you keep them.



## 5. Node‑by‑node blueprint (n8n)

**(A) Webhook (Trigger)**

* **Purpose**: Receive Zoom webhook payloads.
* **Path**: `/zoom/hooks` (example).
* **Method**: POST.

**(B) Function (Verify Zoom signature)**

* Validate `x-zm-signature` using the shared secret. Reject invalid requests early.

**(C) IF (Event filter)**

* Proceed only if `event` ∈ {`meeting.ended`, `recording.completed`}.

**(D) HTTP Request (Get transcript or recording details)**

* If Zoom transcript URL present: **download transcript** (JSON/VTT).
* Else: **download audio** from recording files (if policy allows), or skip to fallback.

**(E) HTTP Request (ASR, optional)**

* Send audio to ASR provider; receive transcript text + timestamps.

**(F) LLM (Summarize meeting)**

* Input: transcript text, meeting metadata (topic, host, participants, start/end time).
* Output: short JSON with `title`, `date`, `participants`, `summary`, `decisions[]`, `actions[] {owner, due, text}`, `risks[]`.

**(G) Salesforce (Search/Upsert)**

* **Find Contact(s)** by participant emails; **find Account** by domain; **optionally find Opportunity** by account + date window.
* **Upsert Note/Task** or custom `Meeting__c` with fields: `Subject`, `Summary__c`, `Decisions__c`, `ActionItems__c` (JSON), `MeetingDate__c`, `RecordingURL__c`, `TranscriptURL__c`, `ZoomMeetingId__c`.
* Use `ZoomMeetingId__c` as an external ID for idempotency.

**(H) Storage (optional)**

* Upload full transcript to storage; get a signed URL for Salesforce/Slack.

**(I) Slack/Email (Notify)**

* Post summary and the Salesforce link to the relevant channel or email the attendees.

**(J) Logger**

* Store the tool run metadata: timestamps, request IDs, error summaries.



## 6. Minimal schema (Salesforce)

Use existing Tasks/Notes, or a custom object `Meeting__c`:

* `ZoomMeetingId__c` (External ID, Unique)
* `Account__c`, `Contact__c`, `Opportunity__c` (Lookup)
* `MeetingDate__c` (Date/Time)
* `Summary__c` (Long Text)
* `Decisions__c` (Long Text or JSON)
* `ActionItems__c` (Long Text or JSON)
* `RecordingURL__c`, `TranscriptURL__c` (URL)

This keeps reports simple and deduplication reliable.

---

## 7. Summarization prompt (LLM)

```
System: You produce concise, factual meeting briefs from transcripts. Use only provided text and metadata. If information is missing, leave fields null; do not invent facts.

User: Create a structured JSON summary for the meeting below.
Return exactly this schema:
{
  "title": string,
  "date": string (ISO),
  "participants": string[],
  "summary": string (5–7 sentences),
  "decisions": string[],
  "actions": [{"owner": string|null, "due": string|null, "text": string}],
  "risks": string[]
}

Context:
- Topic: {{ $json["payload"]["object"]["topic"] }}
- Host: {{ $json["payload"]["object"]["host_email"] }}
- Participants: {{ $json["payload"]["object"]["participant_email_list"] || [] }}
- Transcript: <<<
{{ $json["transcript_text"] }}
>>>
```


## 8. Matching & linking records

* **Contacts**: match by meeting participant emails (exact or domain-based fallback).
* **Accounts**: derive from primary contact’s domain; fall back to fuzzy name match.
* **Opportunities**: optional lookup by account + active window (±30 days around meeting date).
* If no match: create a Task attached to the requesting user and include links; let humans triage.



## 9. Variations

* **Google Meet / Teams**: swap the trigger and transcript source, keep the rest.
* **Knowledge base**: also write summaries to Confluence/Notion with links back to Salesforce.
* **Daily digest**: aggregate today’s summaries and post to Slack.


## Summary

n8n can turn raw meeting data into structured knowledge with minimal glue code. Trigger on Zoom events, verify requests, ingest or transcribe audio, summarize via an LLM, and upsert structured notes to Salesforce with idempotency. The result is faster follow‑ups, consistent records, and fewer manual steps across tools.
