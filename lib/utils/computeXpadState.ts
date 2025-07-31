import { XpadButton } from "../enums/XpadButton";
import { XpadAxes } from "../models/XpadAxes";
import { XpadState } from "../models/XpadState";
import { computeInputValue } from "./computeInputValue";


export const computeXpadState = (gamepad: Gamepad, state: XpadState, inputThreshold = 0.15): XpadState => {
  state.buttons = gamepad.buttons.map((button) => computeInputValue(button?.value, inputThreshold));
  state.leftStick = new XpadAxes(computeInputValue(gamepad.axes[0], inputThreshold), computeInputValue(gamepad.axes[1], inputThreshold));
  state.rightStick = new XpadAxes(computeInputValue(gamepad.axes[2], inputThreshold), computeInputValue(gamepad.axes[3], inputThreshold));

  const dpadUp = -(~~gamepad.buttons[XpadButton.DPAD_UP]?.pressed);
  const dpadDown = ~~gamepad.buttons[XpadButton.DPAD_DOWN]?.pressed;
  const dpadLeft = -(~~gamepad.buttons[XpadButton.DPAD_LEFT]?.pressed);
  const dpadRight = ~~gamepad.buttons[XpadButton.DPAD_RIGHT]?.pressed;

  state.dpad = new XpadAxes(
    dpadLeft + dpadRight,
    dpadUp + dpadDown
  );

  return state;
};
