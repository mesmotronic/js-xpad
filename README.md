# Xpad: Simplified Gamepad API for JavaScript

Xpad is a wrapper for the JavaScript Gamepad API that simplifies the process of using one or more controllers with your web apps and games, regardless of whether you want to implement it as a simple joystick (detect direction from any stick or d-pad, or the press of any button) or access data from each stick and button individually.

Button names follow the Linux `xpad` library's naming conventions.

[Made by @mesmotronic](https://x.com/mesmotronic)

## Installation

```
npm i @mesmotronic/xpad
```

## Example

```js
import { Xpad, XpadButton } from "@mesmotronic/xpad";

const xpad = new Xpad();

xpad
  .addEventListener(XpadEvent.CONNECT, console.log)
  .addEventListener(XpadEvent.DISCONNECT, console.log)
  .addEventListener(XpadEvent.BUTTON_UP, console.log)
  .addEventListener(XpadEvent.BUTTON_DOWN, console.log)
  .addEventListener(XpadEvent.BUTTON_CHANGE, console.log)
  .addEventListener(XpadEvent.STICK_ACTIVE, console.log)
  .addEventListener(XpadEvent.STICK_INACTIVE, console.log)
  .addEventListener(XpadEvent.STICK_CHANGE, console.log);

function animate() {
  xpad.update();

  const { anyStick, anyButton, buttons } = xpad.state;

  console.log(`Move: ${anyStick.x}, ${anyStick.y}`);
  console.log(`Fire: ${anyButton}`);

  console.log(`A: ${buttons[XpadButton.A]}`);
  console.log(`B: ${buttons[XpadButton.B]}`);
  console.log(`X: ${buttons[XpadButton.X]}`);
  console.log(`Y: ${buttons[XpadButton.Y]}`);

  requestAnimationFrame(animate);
}

animate();
```

## API reference

### Xpad

The Xpad class exposes everything you need to interact with your controllers:

| Member           | Type              | Description                                          |
| ---------------- | ----------------- | ---------------------------------------------------- |
| `inputThreshold` | `number`          | Threshold for axis/button activation (default: 0.15) |
| `index`          | `number`          | Index of bound gamepad, or -1 if none (readonly)     |
| `connected`      | `boolean`         | `true` if the gamepad is connected                   |
| `gamepad`        | `Gamepad \| null` | The browser Gamepad instance for this Xpad           |
| `state`          | `XpadState`       | Current state of the Xpad                            |
| `update()`       | `void`            | Updates the state from the current gamepad           |
| `reset()`        | `void`            | Resets the Xpad state                                |
| `dispose()`      | `void`            | Removes all listeners; unusable once disposed        |

By default, `new Xpad()` binds to the first available gamepad and rebinds if it is disconnected.

To use multiple controllers, specify the gamepad index in the constructor, e.g. `new Xpad(0)`, which pins Xpad to that index.

### XpadState

The XpadState class represents the current state of a controller:

| Member        | Type          | Description                                                               |
| ------------- | ------------- | ------------------------------------------------------------------------- |
| `leftStick`   | `XpadAxes`    | Left analog stick axes                                                    |
| `rightStick`  | `XpadAxes`    | Right analog stick axes                                                   |
| `dpad`        | `XpadAxes`    | D-pad axes                                                                |
| `dpadEnabled` | `boolean`     | Whether D-pad input is included in anyStick calculation (default: true)   |
| `buttons`     | `number[]`    | Array of button states (0 to 1); use `XpadButton` enum for button indexes |
| `sticks`      | `XpadStick[]` | Array of stick states in `leftStick`, `rightStick`, `dpad` order          |
| `anyStick`    | `XpadAxes`    | Combined axes from left stick, right stick, and optionally D-pad          |
| `anyButton`   | `number`      | Highest value of main buttons (A, B, X, Y, LB, RB, LT, RT)                |
| `reset()`     | `void`        | Resets all axes and buttons to default state                              |

### XpadButton

| Enum         | Alternative          | Value | Notes                                                                 |
| ------------ | -------------------- | ----- | --------------------------------------------------------------------- |
| `SOUTH`      | `A`                  | `0`   | PS Cross · Switch B                                                   |
| `EAST`       | `B`                  | `1`   | PS Circle · Switch A                                                  |
| `NORTH`      | `X`                  | `2`   | PS Square · Switch Y; physically the west button                      |
| `WEST`       | `Y`                  | `3`   | PS Triangle · Switch X; physically the north button                   |
| `TL`         | `LEFT_BUMPER`        | `4`   | PS L1 · Switch L                                                      |
| `TR`         | `RIGHT_BUMPER`       | `5`   | PS R1 · Switch R                                                      |
| `TL2`        | `LEFT_TRIGGER`       | `6`   | PS L2 · Switch ZL                                                     |
| `TR2`        | `RIGHT_TRIGGER`      | `7`   | PS R2 · Switch ZR                                                     |
| `SELECT`     | `BACK`, `VIEW`       | `8`   | Xbox Back/View · PS Share/Create · Switch Minus                       |
| `START`      | `MENU`               | `9`   | Xbox Start/Menu · PS Options · Switch Plus                            |
| `THUMBL`     | `LEFT_STICK_BUTTON`  | `10`  | PS L3 · Switch left stick press                                       |
| `THUMBR`     | `RIGHT_STICK_BUTTON` | `11`  | PS R3 · Switch right stick press                                      |
| `DPAD_UP`    |                      | `12`  |                                                                       |
| `DPAD_DOWN`  |                      | `13`  |                                                                       |
| `DPAD_LEFT`  |                      | `14`  |                                                                       |
| `DPAD_RIGHT` |                      | `15`  |                                                                       |
| `MODE`       | `GUIDE`              | `16`  | Xbox Guide · PS PS button · Switch Home; often unavailable on Windows |
| `RECORD`     | `EXTRA`              | `17`  | Xbox Series Share · Switch Capture · PS touchpad click; non-standard  |

### XpadEvent

Xpad dispatches the following events, where the `index` property of the event tells you the index of the button or stick and the `data` property the value (0 to 1)

| Type             | Description                                       |
| ---------------- | ------------------------------------------------- |
| `CONNECT`        | Connected and ready to use                        |
| `DISCONNECT`     | Disconnected                                      |
| `BUTTON_DOWN`    | One or more button pressed                        |
| `BUTTON_UP`      | One or more button released                       |
| `BUTTON_CHANGE`  | One or more button state has changed              |
| `STICK_ACTIVE`   | One or more stick is active (not in center)       |
| `STICK_INACTIVE` | One or more stick has become inactive (in center) |
| `STICK_CHANGE`   | One or more stick state has changed               |

## License

BSD 2-Clause License
