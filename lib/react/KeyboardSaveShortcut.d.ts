import React from "react";
/**
 * This is a React component because using functional components require us to
 * put all the Hooks at the top of the functional component.
 *
 * Because of the requirement that hooks be at the top (before any conditional
 * statements), this can unfortunately exposes the keyboard shortcut before any
 * permission checks are done.
 *
 * We could wrap the component with another component that does the permission
 * check, but for safety reasons I think its better to have it visible in the
 * same component.
 *
 * For example this exposes the keyboard shortcut when the permission denied
 * is displayed. That is bad.
 *
 * const Example = (props) => {
 *   useSaveKeyboardShorcut(() => {});
 *
 *   if (!props.hasPermission) {
 *     return <PermissionDenied />
 *   }
 *
 *   return <Content />
 * }
 *
 */
interface Props {
    saveFn: () => void;
}
declare const KeyboardSaveShortcut: React.FC<Props>;
export default KeyboardSaveShortcut;
//# sourceMappingURL=KeyboardSaveShortcut.d.ts.map