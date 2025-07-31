import { XpadAxes } from "./XpadAxes";

export class XpadState {
  public leftStick: XpadAxes = new XpadAxes();
  public rightStick: XpadAxes = new XpadAxes();
  public dpad: XpadAxes = new XpadAxes();
  public buttons: number[] = Array(16).fill(0);

  /**
   * Enable or disable D-pad input as part of the anyAxes calculation
   */
  public dpadEnabled: boolean = true;

  /**
   * Get the current state of the left stick, right stick or D-pad
   */
  public get anyAxes(): XpadAxes {
    return new XpadAxes(
      this.leftStick.x || this.rightStick.x || (this.dpadEnabled && this.dpad.x) || 0,
      this.leftStick.y || this.rightStick.y || (this.dpadEnabled && this.dpad.y) || 0
    );
  }

  /**
   * Check if any button is pressed (excludes D-pad and stick buttons)
   */
  public get anyButton(): number {
    // Buttons: A (0), B (1), X (2), Y (3), LB (4), RB (5), LT (6), RT (7)
    return Math.max(...this.buttons.slice(0, 8));
  }

  public reset(): void {
    this.leftStick = new XpadAxes();
    this.rightStick = new XpadAxes();
    this.dpad = new XpadAxes();
    this.buttons.fill(0);
  }
}