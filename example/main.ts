import { Xpad, XpadEvent } from '../lib';

const xpad = new Xpad();
xpad
  .addEventListener(XpadEvent.CONNECT, eventHandler)
  .addEventListener(XpadEvent.DISCONNECT, eventHandler)
  .addEventListener(XpadEvent.BUTTON_UP, eventHandler)
  .addEventListener(XpadEvent.BUTTON_DOWN, eventHandler)
  .addEventListener(XpadEvent.BUTTON_CHANGE, eventHandler)
  .addEventListener(XpadEvent.STICK_ACTIVE, eventHandler)
  .addEventListener(XpadEvent.STICK_INACTIVE, eventHandler)
  .addEventListener(XpadEvent.STICK_CHANGE, eventHandler);

const axesContainer = document.getElementById('axes') as HTMLDivElement;
const axisIndicator = document.getElementById('axes-indicator') as HTMLSpanElement;
const buttonIndicator = document.getElementById('button-indicator') as HTMLSpanElement;
const eventTimeouts: Record<string, number | NodeJS.Timeout> = {};

function eventHandler(event: XpadEvent) {
  const indicator = document.getElementById(`button-${event.type}-indicator`) as HTMLTableCellElement;

  if (indicator) {
    indicator.style.backgroundColor = `rgba(255, 0, 0, 1)`;

    clearTimeout(eventTimeouts[event.type]);
    eventTimeouts[event.type] = setTimeout(() => {
      indicator.style.backgroundColor = `rgba(255, 0, 0, 0)`;
    }, 200);
  }
}

function animate() {
  xpad.update();

  const { anyStick: anyAxes, anyButton } = xpad.state;
  const size = Math.min(axesContainer.offsetWidth, axesContainer.offsetHeight) / 2;

  axisIndicator.style.transform = `translate(${anyAxes.x * size}px, ${anyAxes.y * size}px)`;
  buttonIndicator.style.backgroundColor = `rgba(255, 0, 0, ${anyButton})`;

  for (let i = 0; i < 16; i++) {
    const buttonIndicator = document.getElementById(`button-${i}-indicator`) as HTMLTableCellElement;
    buttonIndicator.style.backgroundColor = `rgba(255, 0, 0, ${xpad.state.buttons[i]})`;
  }

  requestAnimationFrame(animate);
}

animate();