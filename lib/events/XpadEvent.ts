import { ConbineEvent } from "conbine";

export class XpadEvent extends ConbineEvent {
  /**
   * Xpad is connected and ready to use
   */
  public static CONNECT = "connect";
  /**
   * Xpad is disconnected
   */
  public static DISCONNECT = "disconnect";

  /**
   * Xpad button is pressed
   */
  public static BUTTON_DOWN = "buttonDown";
  /**
   * Xpad button is released
   */
  public static BUTTON_UP = "buttonUp";
  /**
   * Xpad button state has changed
   */
  public static BUTTON_CHANGE = "buttonChange";

  /**
   * Xpad stick is active (not in center)
   */
  public static STICK_ACTIVE = "stickActive";
  /**
   * Xpad stick is inactive (in center)
   */
  public static STICK_INACTIVE = "stickInactive";
  /**
   * Xpad stick state has changed
   */
  public static STICK_CHANGE = "stickChange";

  constructor(type: string, public index?: number, data?: any) {
    super(type, data);
  }
}
