import { EventDispatcher } from "conbine";
import { XpadStick } from "./XpadStick";
import { XpadEvent } from "../events/XpadEvent";

export class XpadState extends EventDispatcher {
  public leftStick: XpadStick = new XpadStick(0, 0, 0);
  public rightStick: XpadStick = new XpadStick(0, 0, 1);
  public dpad: XpadStick = new XpadStick(0, 0, 2);

  /**
   * Enable or disable D-pad input as part of the anyStick calculation
   */
  public dpadEnabled: boolean = true;

  #buttons: number[] = Array(16).fill(0);

  constructor() {
    super();

    this.sticks.forEach((stick) => {
      stick.addEventListener(XpadEvent.STICK_ACTIVE, this.redispatchEvent);
      stick.addEventListener(XpadEvent.STICK_INACTIVE, this.redispatchEvent);
      stick.addEventListener(XpadEvent.STICK_CHANGE, this.redispatchEvent);
    });
  }

  public get buttons(): number[] {
    return this.#buttons;
  }
  public set buttons(value: number[]) {
    const buttonChanges = value.map((value, index) => value !== this.#buttons[index]);
    buttonChanges.forEach((changed, index) => {
      if (changed) {
        const newValue = value[index];
        if (newValue !== 0 && this.#buttons[index] === 0) {
          this.dispatchEvent(new XpadEvent(XpadEvent.BUTTON_DOWN, index, newValue));
        } else if (newValue === 0 && this.#buttons[index] !== 0) {
          this.dispatchEvent(new XpadEvent(XpadEvent.BUTTON_UP, index, newValue));
        }
        this.dispatchEvent(new XpadEvent(XpadEvent.BUTTON_CHANGE, index, newValue));
      }
    });

    this.#buttons = value;
  }

  public get sticks(): XpadStick[] {
    return [this.leftStick, this.rightStick, this.dpad];
  }

  /**
   * Get the current state of the left stick, right stick or D-pad
   */
  public get anyStick(): XpadStick {
    return new XpadStick(
      this.leftStick.x || this.rightStick.x || (this.dpadEnabled && this.dpad.x) || 0,
      this.leftStick.y || this.rightStick.y || (this.dpadEnabled && this.dpad.y) || 0
    );
  }

  /**
   * @deprecated Use anyStick instead
   */
  public get anyAxes(): XpadStick {
    console.warn("XpadState.anyAxes is deprecated, use anyStick instead");
    return this.anyStick;
  }

  /**
   * Check if any button is pressed (excludes D-pad and stick buttons)
   */
  public get anyButton(): number {
    // Buttons: A (0), B (1), X (2), Y (3), LB (4), RB (5), LT (6), RT (7)
    return Math.max(...this.buttons.slice(0, 8));
  }

  public reset(): void {
    this.leftStick = new XpadStick();
    this.rightStick = new XpadStick();
    this.dpad = new XpadStick();
    this.buttons.fill(0);
  }

  // Internal

  protected redispatchEvent = (event: XpadEvent): void => {
    this.dispatchEvent(event);
  };
}