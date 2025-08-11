import { EventDispatcher } from "conbine";
import { XpadEvent } from "../events/XpadEvent";

export class XpadStick extends EventDispatcher {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public index: number = -1
  ) {
    super();
  }

  public set(x: number, y: number): void {
    if (this.x !== x || this.y !== y) {
      const active = this.active;

      this.x = x;
      this.y = y;

      if (active !== this.active) {
        this.dispatchEvent(new XpadEvent(active ? XpadEvent.STICK_ACTIVE : XpadEvent.STICK_INACTIVE));
      }
      this.dispatchEvent(new XpadEvent(XpadEvent.STICK_CHANGE, this.index));
    }
  }

  public get active(): boolean {
    return this.x !== 0 || this.y !== 0;
  }
}

/**
 * @deprecated Use XpadStick instead
 */
export class XpadAxes extends XpadStick {
  constructor(x: number = 0, y: number = 0) {
    console.warn('XpadAxes is deprecated, use XpadStick instead');
    super(x, y);
  }
}