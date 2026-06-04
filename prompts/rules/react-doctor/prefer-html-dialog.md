# `react-doctor/prefer-html-dialog`

Replace the hand-rolled modal wrapper with a native <dialog> opened via dialog.showModal()

- **Category:** Accessibility
- **Severity:** warn
- **Source:** oxlint-plugin-react-doctor
- **Framework:** global
- **Enabled when:** always
- **Documentation:** <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog>

## Validation prompt

Use this to decide whether a fired diagnostic is real or a false positive.

Fires on a JSXOpeningElement whose tag is a lowercase host element (not the literal dialog tag, and never a capitalized user component like <Dialog>) when it carries either role="dialog"/role="alertdialog" (a static string matching ROLE_DIALOG_VALUES) or aria-modal resolving statically to true — string "true", {true}, or the boolean-shorthand <div aria-modal>; role wins and is reported alone when both are present. False positives a reviewer should suppress: the attribute already sits on a native <dialog> (e.g. <dialog role="dialog" aria-modal="true">, redundant but harmless), an unrelated role like role="status", an explicit aria-modal="false", or a dynamic/unresolvable value such as aria-modal={isOpen} — the detector already skips all of these, so a finding on one indicates a parse quirk and is not a real issue.

## Fix prompt

Use this once validation confirms the diagnostic is real.

Swap the generic container for a native <dialog> and open it modally with dialog.showModal() so the browser provides the focus trap, scroll lock, Escape dismissal, and ::backdrop you would otherwise hand-wire: e.g. const dialogRef = useRef(null); render <dialog ref={dialogRef}>...</dialog> and trigger via dialogRef.current?.showModal() / .close(), or use the declarative <button commandfor="my-dialog" command="show-modal"> (Chrome 135+); drop the now-redundant role and aria-modal attributes. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
