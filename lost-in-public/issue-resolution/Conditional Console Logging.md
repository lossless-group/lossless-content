# Issue Resolution Breadcrumb: Conditional Console Logging as a Standard Practice

## Context

Console logging is essential for debugging, transparency, and stepwise traceability during development and maintenance. However, excessive logging in production or stable environments can clutter output and obscure critical information. To address this, our standard practice is to keep all log statements in the codebase, but control their execution with user-configurable flags.

## Resolution: Pattern for Conditional Console Logging

### 1. **User Option Flags for Logging**
- Extend the relevant configuration (e.g., `USER_OPTIONS.services.logging`) with boolean flags for each pipeline or processing step.
- Example:
  ```typescript
  services: {
    logging: {
      addSiteUUID: true,
      openGraph: false,
      validation: false
    }
  }
  ```

### 2. **Guard Each Log Statement**
- Wrap each `console.log` in a conditional based on the relevant flag:
  ```typescript
  if (logging?.addSiteUUID) {
    console.log('After addSiteUUID:', updatedFrontmatter);
  }
  ```
- The log code remains in place, but only runs if the flag is `true`.

### 3. **Benefits**
- **Non-destructive:** No log code is deleted; all can be re-enabled instantly.
- **Fine-grained:** Developers can toggle logs for each step, per directory or globally.
- **Debuggability:** When issues arise, simply flip the relevant flag(s) to true, without code churn.

### 4. **Optional: Logging Helper Function**
- For DRYness, use a utility function:
  ```typescript
  function stepLog(enabled: boolean, ...args: any[]) {
    if (enabled) console.log(...args);
  }
  // Usage:
  stepLog(logging.addSiteUUID, 'After addSiteUUID:', updatedFrontmatter);
  ```

### 5. **Standardization**
- This pattern must be followed across all code that uses console logging for stepwise or pipeline debugging.
- All new features and refactors should preserve log statements, guarded by config flags.

## References
- Prompt: `content/lost-in-public/prompts/workflow/Write-an-Issue-Resolution-Breadcrumb.md`

---

**This breadcrumb codifies conditional console logging as a best practice for this codebase.**