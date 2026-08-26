export enum XpadButton {

  A = 0,
  SOUTH = 0,
  B = 1,
  EAST = 1,
  X = 2,
  NORTH = 2,
  Y = 3,
  WEST = 3,

  /** @deprecated use TL */
  LEFT_BUMPER = 4,
  TL = 4,
  /** @deprecated use TR */
  RIGHT_BUMPER = 5,
  TR = 5,
  /** @deprecated use TL2 */
  LEFT_TRIGGER = 6,
  TL2 = 6,
  /** @deprecated use TR2 */
  RIGHT_TRIGGER = 7,
  TR2 = 7,

  /** @deprecated Use SELECT */
  BACK = 8, // Xbox 360
  /** @deprecated Use SELECT */
  VIEW = 8, // Xbox One
  SELECT = 8,

  /** @deprecated Use START */
  MENU = 9, // Xbox One
  START = 9, // Xbox 360

  /** @deprecated Use THUMBL */
  LEFT_STICK_BUTTON = 10,
  THUMBL = 10,
  /** @deprecated Use THUMBR */
  RIGHT_STICK_BUTTON = 11,
  THUMBR = 11,

  DPAD_UP = 12,
  DPAD_DOWN = 13,
  DPAD_LEFT = 14,
  DPAD_RIGHT = 15,

  /** @deprecated Use MODE */
  GUIDE = 16, // Xbox
  MODE = 16,

  /** @deprecated Use RECORD */
  EXTRA = 17,
  /**
   * Not exposed in all browsers and maps to different buttons, e.g.
   * Xbox Series Share, Switch Capture, PS touchpad click
   */
  RECORD = 17,
}
