import { useEffect } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const matches =
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          !!event.ctrlKey === !!shortcut.ctrlKey &&
          !!event.metaKey === !!shortcut.metaKey &&
          !!event.shiftKey === !!shortcut.shiftKey &&
          !!event.altKey === !!shortcut.altKey;

        if (matches) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcuts]);
}

export function useEditorShortcuts(
  onSave: () => void,
  onExport: () => void,
  onTogglePreview: () => void,
  onToggleTheme: () => void
) {
  const shortcuts = [
    { key: 's', ctrlKey: true, action: onSave, description: 'Save resume' },
    { key: 'e', ctrlKey: true, action: onExport, description: 'Export PDF' },
    { key: 'p', ctrlKey: true, action: onTogglePreview, description: 'Toggle preview' },
    { key: 't', ctrlKey: true, action: onToggleTheme, description: 'Toggle theme' },
  ];

  useKeyboardShortcuts(shortcuts);
  return shortcuts;
}