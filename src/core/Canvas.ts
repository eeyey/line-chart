export default class Canvas {
  element = document.createElement('canvas');
  context = this.element.getContext('2d') as CanvasRenderingContext2D;

  root: HTMLElement;
  background: string;

  constructor(root: HTMLElement, bcg: string) {
    this.root = root;
    this.background = bcg;

    this.root.append(this.element);

    document.addEventListener('resize', this.resize.bind(this));

    this.resize();
  }

  resize() {
    if (!this.element.parentElement) return;

    this.element.width = this.element.parentElement.offsetWidth;
    this.element.height = this.element.parentElement.offsetHeight;

    this.clear();
  }

  draw(
    callback: (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
    ) => void,
  ) {
    callback(this.context, this.element);
  }

  clear() {
    this.context.beginPath();
    this.context.fillStyle = this.background;
    this.context.rect(0, 0, this.element.width, this.element.height);
    this.context.fill();
  }

  get width() {
    return this.element.width;
  }

  get height() {
    return this.element.height;
  }
}
