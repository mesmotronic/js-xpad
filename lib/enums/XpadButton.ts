export enum XpadButton {
  A = 0,
  B = 1,
  X = 2,
  Y = 3,

  LEFT_BUMPER = 4,
  RIGHT_BUMPER = 5,
  LEFT_TRIGGER = 6,
  RIGHT_TRIGGER = 7,

  /**
   * @deprecated Use VIEW
   */
  BACK = 8, // Xbox 360 controller
  /**
   * @deprecated Use MENU
   */
  START = 9, // Xbox 360 controller

  VIEW = 8, // Xbox One controller
  MENU = 9, // Xbox One controller

  LEFT_STICK_BUTTON = 10,
  RIGHT_STICK_BUTTON = 11,

  DPAD_UP = 12,
  DPAD_DOWN = 13,
  DPAD_LEFT = 14,
  DPAD_RIGHT = 15,
}