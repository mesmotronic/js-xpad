import { Xpad } from '../lib';

const xpad = new Xpad();
const axisIndicator = document.getElementById('axes-indicator') as HTMLSpanElement;
const buttonIndicator = document.getElementById('button-indicator') as HTMLSpanElement;

function animate() {
  xpad.update();

  const { anyAxes, anyButton } = xpad.state;
  axisIndicator.style.transform = `translate(${anyAxes.x * 100}px, ${anyAxes.y * 100}px)`;
  buttonIndicator.style.backgroundColor = anyButton ? `rgba(255, 0, 0, ${anyButton})` : 'transparent';

  requestAnimationFrame(animate);
}

animate();