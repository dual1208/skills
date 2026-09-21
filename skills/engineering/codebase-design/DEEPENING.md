# Simplifying coupled code

Use this when one behavior requires callers to coordinate several pieces of code.

## Find the responsibility that belongs together

Trace a real request or operation. Record what each caller must configure, check, retry, and clean up. Propose a change only when it removes a demonstrated burden or fixes a concrete failure.

A single function is not automatically better than several functions. A large file is not automatically a useful abstraction. Show which knowledge stops being repeated and which choices remain with the caller.

## Handle dependencies honestly

- Pure calculations can usually be tested directly.
- A local database or filesystem substitute is useful when it preserves the behavior under test. Use the real dependency for behavior the substitute cannot represent.
- For another process you control, test both the code using it and the actual protocol where failures depend on that protocol.
- For a third-party dependency, use a controlled substitute for repeatable cases and available integration tests for compatibility.

Introduce a replaceable dependency when there is a concrete reason. Keep test-only controls out of the caller's interface unless callers need them too.

## Preserve useful tests

Test the operation as callers use it, including relevant failures. If a refactor removes a helper, remove obsolete helper tests only after their meaningful cases are covered elsewhere. Do not delete tests just because they are small or assert internal behavior; first identify what regression protection would be lost.

Report the change with a before/after example and the files affected. Explain the benefit directly, such as "the request handler no longer needs to retry three separate calls."
