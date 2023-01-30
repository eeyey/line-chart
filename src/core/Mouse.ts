import EventObserver from './EventObserver';

enum Button {
  left = 0,
}

export default class Mouse extends EventObserver<MouseEvent> {
  element!: HTMLElement;

  under: boolean = false;
  punder: boolean = false;

  x: number = 0;
  y: number = 0;

  readonly px: number = 0;
  readonly py: number = 0;

  dx: number = 0;
  dy: number = 0;

  left: boolean = false;
  pleft: boolean = false;

  constructor(element: HTMLElement) {
    super();

    this.element = element;

    this.element.addEventListener('mousemove', this.mousemoveHandler);
    this.element.addEventListener('mouseleave', this.mouseleaveHandler);
    this.element.addEventListener('mouseenter', this.mousemoveHandler);
    this.element.addEventListener('mousedown', this.mousedownHandler);
    this.element.addEventListener('mouseup', this.mouseupHandler);
  }

  mousemoveHandler = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top } = this.element.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    Object.assign(this, { x, y, px: this.x, py: this.y, under: true });

    this.dispatch('mousemove', e);
  };

  mouseleaveHandler = (e: MouseEvent) => {
    this.under = false;

    this.dispatch('mouseleave', e);
  };

  mousedownHandler = (e: MouseEvent) => {
    if (e.button === Button.left) {
      this.left = true;
    }

    this.dispatch('mousedown', e);
  };

  mouseupHandler = (e: MouseEvent) => {
    if (e.button === Button.left) {
      this.left = false;
    }

    this.dispatch('mouseup', e);
  };

  tick() {
    Object.assign(this, {
      dx: this.x - this.px,
      dy: this.y - this.py,
      px: this.x,
      py: this.y,
      pleft: this.left,
      punder: this.under,
    });
  }
}
