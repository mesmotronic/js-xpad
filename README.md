# Xpad: Xbox Controller API for JavaScript

Xpad is a wrapper for the JavaScript Gamepad API that makes it easy to use one or more Xbox 360 / One / Series controllers with your app or game, whether you want to implement it as a simple joystick (detect direction from any stick or d-pad, or the press of any button) or want to access data from each stick and button individually.

[Made by @mesmotronic](https://x.com/mesmotronic)

## Installation

```
npm i @mesmotronic/xpad
```

## Example

```js
import { Xpad, XpadButton } from "@memotronic/xpad";

const xpad = new Xpad();

function animate() {
  xpad.update();

  const { anyAxes, anyButton, buttons } = xpad.state;

  console.log(`Move: ${anyAxes.x}, ${anyAxes.y}`);
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
| `index`          | `number`          | Gamepad index (default: 0)                           |
| `connected`      | `boolean`         | `true` if the gamepad is connected                   |
| `gamepad`        | `Gamepad \| null` | The browser Gamepad instance for this Xpad           |
| `state`          | `XpadState`       | Current state of the Xpad                            |
| `update()`       | `void`            | Updates the state from the current gamepad           |
| `reset()`        | `void`            | Resets the Xpad state                                |

To use multiple controllers, specify the gamepad index in the constructor, e.g. `new Xpad(0)`

### XpadState

The XpadState class represents the current state of a controller:

| Member        | Type       | Description                                                               |
| ------------- | ---------- | ------------------------------------------------------------------------- |
| `leftStick`   | `XpadAxes` | Left analog stick axes                                                    |
| `rightStick`  | `XpadAxes` | Right analog stick axes                                                   |
| `dpad`        | `XpadAxes` | D-pad axes                                                                |
| `buttons`     | `number[]` | Array of button states (0 to 1); use `XpadButton` enum for button indexes |
| `dpadEnabled` | `boolean`  | Whether D-pad input is included in anyAxes calculation (default: true)    |
| `anyAxes`     | `XpadAxes` | Combined axes from left stick, right stick, and optionally D-pad          |
| `anyButton`   | `number`   | Highest value of main buttons (A, B, X, Y, LB, RB, LT, RT)                |
| `reset()`     | `void`     | Resets all axes and buttons to default state                              |

## License

BSD 2-Clause License
