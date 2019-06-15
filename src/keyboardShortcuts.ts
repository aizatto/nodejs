import { useEffect } from "react";
import { setEqual } from "./fn";
// Taken from https://github.com/facebook/draft-js/blob/aede8238ed5f36e6ebaf637c713bee24f56d29e6/src/component/utils/KeyBindingUtil.js

const isOSX = navigator.userAgent.indexOf("Mac OS X") !== -1;

// https://aizatto.github.io/keyboardevents/
// https://keycode.info/
// https://github.com/nfriend/ts-keycode-enum/blob/HEAD/Key.enum.ts
export enum KeyCode {
  ESCAPE = 27,
  DIGIT_0 = 48,
  DIGIT_1 = 49,
  DIGIT_2 = 50,
  DIGIT_3 = 51,
  DIGIT_4 = 52,
  DIGIT_5 = 53,
  DIGIT_6 = 54,
  DIGIT_7 = 55,
  DIGIT_8 = 56,
  DIGIT_9 = 57,
  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90
}

export enum Modifiers {
  CTRL = "ctrl",
  SHIFT = "shift",
  // macOS
  OPTION = "option",
  COMMAND = "command",
  // others
  ALT = "alt"
}

export enum OS {
  MAC,
  OTHERS
}

export function assertModifiers(
  e: React.KeyboardEvent<{}>,
  expectedModifiers: Set<Modifiers>
): boolean {
  const modifiers = new Set();
  if (e.ctrlKey) {
    modifiers.add(Modifiers.CTRL);
  }
  if (e.shiftKey) {
    modifiers.add(Modifiers.SHIFT);
  }
  if (isOSX) {
    if (e.altKey) {
      modifiers.add(Modifiers.OPTION);
    }
    if (e.metaKey) {
      modifiers.add(Modifiers.COMMAND);
    }
  } else {
    if (e.altKey) {
      modifiers.add(Modifiers.ALT);
    }
  }

  return setEqual(modifiers, expectedModifiers);
}

export function useKeyboardSaveShortcut(saveFn: () => void): void {
  useEffect(() => {
    const listener = (e: React.KeyboardEvent<{}>): void => {
      if (e.keyCode !== KeyCode.S) {
        return;
      }

      const modifiers = isOSX
        ? new Set([Modifiers.COMMAND])
        : new Set([Modifiers.CTRL]);

      if (assertModifiers(e, modifiers)) {
        e.preventDefault();
        saveFn();
      }
    };

    document.addEventListener("keydown", <any>listener);

    return () => {
      document.removeEventListener("keydown", <any>listener);
    };
  });
}
