import { Xpad } from '../lib';

const xpad = new Xpad();
const axisIndicator = document.getElementById('axes-indicator') as HTMLSpanElement;
const buttonIndicator = document.getElementById('button-indicator') as HTMLSpanElement;

function animate() {
  xpad.update();

  const { anyAxes, anyButton } = xpad.state;
  axisIndicator.style.transform = `translate(${anyAxes.x * 240}px, ${anyAxes.y * 240}px)`;
  buttonIndicator.style.backgroundColor = `rgba(255, 0, 0, ${anyButton})`;

  for (let i = 0; i < 16; i++) {
    const buttonIndicator = document.getElementById(`button-${i}-indicator`) as HTMLSpanElement;
    buttonIndicator.style.backgroundColor = `rgba(255, 0, 0, ${xpad.state.buttons[i]})`;
  }

  requestAnimationFrame(animate);
}

animate();