import { XpadState } from "../models/XpadState";
import { computeXpadState } from "../utils/computeXpadState";

export class Xpad {
  public inputThreshold: number = 0.15;

  #state = new XpadState();

  constructor(
    public readonly index: number = 0
  ) {
    window.addEventListener('gamepadconnected', this.connectedHandler);
    window.addEventListener('gamepaddisconnected', this.disconnectedHandler);
  }

  /**
   * Returns true if the Xpad is connected
   */
  public get connected(): boolean {
    return !!this.gamepad;
  }

  /**
   * Returns the Gamepad instance for this Xpad
   */
  public get gamepad(): Gamepad | null {
    const gamepads = navigator.getGamepads();
    return gamepads[this.index] ?? null;
  }

  /**
   * Returns the current state of the Xpad
   */
  public get state(): XpadState {
    return this.#state;
  }

  /**
   * Updates the state of the Xpad
   */
  public update = (): void => {
    const { gamepad } = this;

    if (gamepad) {
      computeXpadState(gamepad, this.state, this.inputThreshold);
    }
  };

  /**
   * Resets the state of the Xpad
   */
  public reset(): void {
    this.state.reset();
  }

  // Internal

  protected connectedHandler = (event: GamepadEvent): void => {
    if (event.gamepad.index !== this.index) return;
    this.update();
  };

  protected disconnectedHandler = (event: GamepadEvent): void => {
    if (event.gamepad.index !== this.index) return;
    this.reset();
  };
}
