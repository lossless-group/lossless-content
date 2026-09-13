---
date_created: 2026-09-12
date_modified: 2026-09-12
title: "Up and Running with Omarchy on Apple Silicon"
at_semantic_version: 0.0.0.2
slug: up-and-running-w-omarchy-on-apple-silicon
publish: true
authors:
  - Michael Staton
tags: [Operating-Systems, Linux-Distributions, Apple-Silicon, Window-Managers]
site_uuid: 6a4fa786-c10f-4e84-830a-626f54f78baf
---

[Omarchy](https://omarchy.org/) is DHH's opinionated Arch + Hyprland desktop. It targets
x86_64, so putting it on Apple Silicon means going through [Asahi Linux](https://asahilinux.org/)
and then a community port. We found two ports, their setup rules are near-inverses of one
another. We started with one and found frustration (likely user error), so we switched to the other and it worked almost seamlessly.

Use **`malik-na/omarchy-mac`**. The commands below are the clean path, with the known
failures pre-empted inline rather than left for you to hit. Everything after that is the
reasoning, the dead ends, and the errors — in *Trials and Tribulations*.

Tested on a **MacBook Air 13" (M2, 2022, 8 GB)**, dual-booting macOS Tahoe 26.6.2 with
FileVault on.

> **Before you commit:** external displays do not work on M2 Asahi — DisplayPort alt-mode is
> still WIP at the SoC level. Neither does Touch ID, and battery life is meaningfully worse
> than macOS. If that's disqualifying, read *Decide before you start* below first.

# Clean Install

## 1 — macOS: clear snapshots, then install Asahi Alarm


> **Note:** This section is adapted from the [Asahi Alarm documentation](https://asahi-alarm.org/docs/installer/), and the first step is for if you've been using Asahi already and have local snapshots. If not, skip this step.

Local APFS snapshots occupy free space and block the resize.

```bash
tmutil listlocalsnapshots /
tmutil deletelocalsnapshots <date-string>   # only if the above lists any
```

```bash
curl https://asahi-alarm.org/installer-bootstrap.sh | sh
```

- **What to install** → option **`2: Asahi Alarm Minimal (BTRFS)`**. Not a Desktop flavor —
  Omarchy brings its own Hyprland stack. Not `alx.sh`, which is Fedora Asahi Remix.
- **OS name** → something short; it's the boot-picker label.
- **Size** → an even split works. The installer holds back 38 GB for macOS automatically.

If the resize fails on "encrypted and locked volumes" — that's FileVault, don't abort:

```bash
diskutil apfs list | grep -i -B5 "FileVault: *Yes (locked)"
diskutil apfs unlockVolume <diskXsY>    # Data volume only — skip System volumes
```

## 2 — the 1TR boot

No commands, and no automatic recovery if you get it wrong.

1. Wait the **full 25 seconds** after shutdown.
2. **Press and hold** power — one press, held continuously, not repeated taps.
3. Release at "Loading startup options..." or a spinner.
4. Choose your Linux volume.
5. **A "macOS Recovery" dialog is expected**, not an error. If asked to select a volume to
   recover, pick your normal macOS volume and authenticate.

## 3 — console login, as root

Defaults are `root`/`root` and `alarm`/`alarm`. There is no `sudo` yet and you are root, so
drop `sudo` from anything you paste until step 5.

```bash
passwd
passwd alarm
```

## 4 — networking

```bash
nmtui
```

If it errors immediately after activating, reboot and retry — known quirk. Manual fallback:

```bash
nmcli device wifi connect "SSID_NAME" password "PASSWORD" ifname wlan0
```

## 5 — create your user

This port expects you to do this yourself.

```bash
pacman -S --needed sudo git base-devel
useradd -m -G wheel -s /bin/bash <username>
passwd <username>
echo '%wheel ALL=(ALL:ALL) ALL' > /etc/sudoers.d/10-wheel
chmod 0440 /etc/sudoers.d/10-wheel
visudo -c
```

`visudo -c` must print `parsed OK`. Then verify from a **fresh login** — a shell opened
before the group change carries stale group membership:

```bash
su - <username>
id            # must list wheel
sudo -v       # password, then silence = working
```

## 6 — pre-empt the two known blockers

Both of these will otherwise stop `install.sh` partway. Run them as your user, before
installing.

Refresh package databases — a stale `extra` is what produces `target not found: hyprland-guiutils`:

```bash
sudo pacman -Syy
pacman -Si hyprland-guiutils        # expect: Repository : extra, Version : 0.2.2-2
```

Allow the repo key's SHA-1 self-signature, which GnuPG 2.4+ rejects by default:

```bash
echo 'allow-weak-key-signatures' | sudo tee -a /etc/pacman.d/gnupg/gpg.conf
```

## 7 — install

```bash
git clone https://github.com/malik-na/omarchy-mac.git ~/.local/share/omarchy
cd ~/.local/share/omarchy
bash install.sh -sri
```

Two prompts to expect:

- `hyprland is in IgnorePkg/IgnoreGroup. Install anyway?` → **y**. That's `install.sh`
  managing repo overlap deliberately.
- `No aarch64 build is known for: obs-studio dotnet-runtime pinta obsidian … Try building
  them anyway?` → **n**. On 8 GB these are long compiles with a real chance of OOM, and a
  failure here can take the whole run with it. Substitutions are below.

## 8 — clean up and reboot

```bash
sudo sed -i '/allow-weak-key-signatures/d' /etc/pacman.d/gnupg/gpg.conf
reboot
```

That reboot brings up Hyprland.

---

# Trials and Tribulations

## Decide before you start

Does not work on M2 Asahi, regardless of port:

- **External displays.** DisplayPort alt-mode is WIP at the SoC level. USB2 and USB3 over
  the Type-C ports work fine. This is the big one.
- **Touch ID.** No active development.
- **Battery life.** Meaningfully worse than macOS.

Works: display, GPU (Vulkan via Mesa), keyboard and backlight, trackpad, brightness, Wi-Fi,
Bluetooth, speakers, 3.5 mm jack, mics, webcam, battery reporting, suspend.

| You want | Take this path |
|---|---|
| Omarchy specifically | An x86 machine. It's the supported target and none of this applies. |
| This laptop, running Linux | [Fedora Asahi Remix](https://asahilinux.org/fedora/) — the flavor the Asahi team actually maintains. |
| This laptop, best experience | macOS. The trackpad and battery are why you bought it. |
| Omarchy on this laptop anyway | The clean install above. |

## The two ports are not interchangeable

| | `malik-na/omarchy-mac` | `maralcbr/omarchy-mx-mac` |
|---|---|---|
| Create your own user first | **Yes** | **No** — it creates the user and refuses any it didn't |
| Run as | your user, with `sudo` | root, for `--fresh` |
| `yay` / AUR | needed | not used |
| Hyprland comes from | Arch Linux ARM `extra` | its own frozen repo |
| Worked, Sept 2026 | **Yes** | No |

Mixing their steps is the single most expensive mistake available here. The user-creation
rule alone is a hard inversion: doing the right thing for one port produces a hard abort on
the other.

## Why `maralcbr/omarchy-mx-mac` failed

Worth recording, because the failure is non-obvious and no page on the internet currently
explains it.

The design is genuinely elegant — its own signed aarch64 pacman repo with all ~150 packages
prebuilt, so nothing compiles on the machine. But its pinned `hyprland-0.56.2-3` declares:

```
depend = libaquamarine.so=14-64
depend = hyprland-guiutils
```

Arch Linux ARM's `extra` has moved on to `aquamarine-0.15.0-2` (soname 15), and
`hyprland-guiutils` isn't in maralcbr's repo at all. A frozen third-party repo pinned
against a rolling upstream that drifted out from under it. Terminal symptom:
`error: failed to prepare transaction: could not satisfy dependencies`. Nothing you type
fixes it — it's an upstream packaging problem.

Two more undocumented edges, if you try it anyway:

1. Its installer **creates your user itself** (`useradd --create-home --groups wheel`) and
   writes its own `/etc/sudoers.d/10-omarchy-wheel`. A pre-created account produces
   `The target user is not owned by this installation` — and `userdel` will refuse while any
   login shell for that user is alive on another virtual console.
2. Neither `install-asahi-quattro` nor `omarchy-install-asahi-fresh` ever **adds** the
   `[omarchy]` repository that both depend on. You get ~150 `target not found` lines with no
   hint why, and the fix is to resolve the pinned repo tag by hand: channel pointer →
   release descriptor → `package_source_commit` → `asahi-packages-stable-<commit>`.

## The errors, in full

### `third party key signatures using SHA1 are rejected`

GnuPG 2.4+ rejects SHA-1 key self-signatures; the repo key's self-signature is SHA-1. You
can't pass `--allow-weak-key-signatures` through `install.sh`, so it goes in gpg's config —
that's step 6 above. Remove it afterward. Chosen-prefix SHA-1 collisions have been practical
since 2020, so the rejection isn't theater, and signing is a one-time act.

The strictly-weaker fallback, if the key won't import at all, is setting
`SigLevel = Optional TrustAll` on the repo block — that disables package signature
verification entirely. Try the SHA-1 workaround first.

### `signature ... is invalid` / `database omarchy is not valid`

Only if you tried the other port first. Both projects name their database `omarchy.db`, so
both land at `/var/lib/pacman/sync/omarchy.db`. pacman keeps the cached bytes under
If-Modified-Since while fetching the *new* signature, pairs them, and rejects the mismatch.
The error names the old signer even though that repo is long gone from your config.

```bash
sudo rm -f /var/lib/pacman/sync/omarchy.db /var/lib/pacman/sync/omarchy.db.sig
sudo pacman -Syy
```

### `target not found: hyprland-guiutils`

A stale local database, not a missing package. Everything needed is in ALARM `extra`,
version-matched:

```
aquamarine-0.15.0-2    hyprland-0.56.1-3      hyprland-guiutils-0.2.2-2
hyprtoolkit-0.5.4-6    hyprutils-0.14.2-1     hyprwire-0.3.1-3
```

`sudo pacman -Syy` is step 6. If that isn't enough, your mirror is lagging:

```bash
sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
echo 'Server = http://mirror.archlinuxarm.org/$arch/$repo' | sudo tee /etc/pacman.d/mirrorlist
sudo pacman -Syy
```

> A package appearing in two repos is normal, not a conflict. pacman resolves a name to the
> **first repository in `pacman.conf` order** that carries it — version is not the tiebreaker
> across repos.

### `No aarch64 build is known for …`

Answer **n**, then add them individually where each can fail on its own.

| Package | Do this instead |
|---|---|
| Obsidian | Official arm64 AppImage from obsidian.md, or `flatpak install flathub md.obsidian.Obsidian`. Don't build Electron. |
| OBS Studio | `flatpak install flathub com.obsproject.Studio` — Flathub builds aarch64 for a good share of apps. |
| Pinta | Skip. GIMP and Krita are both in ALARM `extra`, prebuilt, no dotnet. |
| dotnet-runtime | Skip unless something else demands it. `pinta` was the only thing asking. |

## Things that cost time and shouldn't have

- **`makepkg` refuses to run as root, by design.** A PKGBUILD executes arbitrary upstream
  build code; as root, one unset variable in a build script is `rm -rf /`. The `--asroot`
  escape hatch was removed from pacman over a decade ago. Build as your user — `makepkg -si`
  builds as you, then calls `sudo pacman -U`, and the package installs system-wide exactly
  like any other. **Who builds a package has no bearing on where it installs.**
- **Arch Linux ARM ships `.pkg.tar.xz`, not `.pkg.tar.zst`.** Mainline Arch moved; ALARM
  didn't. Globs written for mainline Arch silently match nothing.
- **`curl -fLO` writes no file and prints no error on a 404.** It looks exactly like success.
  Use `-LO` while debugging.
- **`sudo` silently ignores `/etc/sudoers.d/` files** that aren't mode `0440` root-owned, or
  whose names contain a `.` or `~`. Check `ls -l /etc/sudoers.d/` when a rule seems ignored.
- **`visudo` only validates syntax.** Nano's exit-without-saving is silent, so a no-op edit
  passes quietly and you discover it later as `<user> is not in the sudoers file`. Use a
  drop-in file instead.
- **Don't run desktop installers as root.** Omarchy writes `~/.config/hypr`,
  `~/.local/share/omarchy`, systemd `--user` units, and dotfile symlinks. As root, all of it
  lands in `/root` and your actual login gets nothing.
- **Never partial-upgrade.** `linux-asahi` must stay in lockstep with Mesa and the Asahi
  firmware. Always full `pacman -Syu`, never `pacman -Sy <package>`. Snapshot first if you
  took the BTRFS option.
- **macOS must stay installed.** It's required to update or repair m1n1 and to resize the
  Asahi install later. It stays at Full Security throughout; Permissive Security is set only
  on the Asahi stub's boot policy.

## If the 1TR boot loops

It means 1TR wasn't entered correctly, not that anything is damaged. **Do not reinstall
anything.** Shut down fully, hold power to boot, select macOS, re-run the Asahi installer,
and choose the `p` option to retry the boot-policy step.

From then on: hold power from a full shutdown for the picker; a normal restart boots
whichever OS is currently default.

# Uninstalling

No automated uninstaller. From macOS, **after setting macOS as the default boot OS**:

```bash
diskutil apfs deleteContainer diskN        # the 2.5 GB stub
diskutil eraseVolume free free disk0sX     # the EFI partition
diskutil eraseVolume free free disk0sY     # the Linux root
diskutil apfs resizeContainer disk0s2 0    # return the space to macOS
```

Substitute your real identifiers — they differ per machine. The last command can freeze
Terminal for several minutes; that's normal.

**Never touch `disk0s3` (`Apple_APFS_Recovery`)** — deleting it makes macOS unupgradeable
and the machine unbootable without a DFU restore.

# References

- Asahi Linux FAQ — https://asahilinux.org/docs/project/faq/
- M2 feature support — https://asahilinux.org/docs/platform/feature-support/m2/
- Asahi Alarm — https://asahi-alarm.org/
- malik-na/omarchy-mac — https://github.com/malik-na/omarchy-mac
- maralcbr/omarchy-mx-mac — https://github.com/maralcbr/omarchy-mx-mac
- Omarchy Manual, "Omarchy on…" — https://learn.omacom.io/2/the-omarchy-manual/79/omarchy-on
