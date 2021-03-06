/// <reference types="react" />
export declare enum KeyCode {
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
export declare enum Modifiers {
    CTRL = "ctrl",
    SHIFT = "shift",
    OPTION = "option",
    COMMAND = "command",
    ALT = "alt"
}
export declare enum OS {
    MAC = 0,
    OTHERS = 1
}
export declare function assertModifiers(e: React.KeyboardEvent<{}>, expectedModifiers: Set<Modifiers>): boolean;
export declare function useKeyboardSaveShortcut(saveFn: () => void): void;
//# sourceMappingURL=keyboardShortcuts.d.ts.map