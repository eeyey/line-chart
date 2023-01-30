import App from 'App';

import {
  TooltipHeight,
  TooltipMargin,
  TooltipPadding,
  TooltipWidth,
  XPadding,
  YPadding,
} from '../config';

export default class Tooltip {
  app: App;

  element: HTMLElement;
  _show: boolean = false;

  constructor(app: App) {
    this.app = app;

    this.app.render.subscribe(() => {
      this.app.canvas.draw(this.draw.bind(this));
    });
  }

  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const point = this.app.currentPoint;

    if (!point) return;

    const [left, top] = this.getPosition(point.x, point.y);

    const text = `Dataset ${point.value.toFixed(2)}`;
    const title = point.title;

    const innerLeft = left + TooltipPadding;
    const innerTop = top + TooltipPadding;

    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.beginPath();
    ctx.roundRect(left, top, TooltipWidth, TooltipHeight, 5);
    ctx.fill();

    ctx.font = 'bold 18px monospace';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#fff';
    ctx.fillText(title, innerLeft, innerTop, TooltipWidth);

    ctx.beginPath();
    ctx.fillStyle = point.graph.color;
    ctx.strokeStyle = '#fff';
    ctx.fillRect(innerLeft, innerTop + 20, 15, 15);

    ctx.beginPath();
    ctx.font = '16px monospace';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#fff';
    ctx.fillText(text, innerLeft + 20, innerTop + 20, TooltipWidth);
  }

  getPosition(x: number, y: number) {
    const width = this.app.canvas.width - XPadding;
    const height = this.app.canvas.height - YPadding;

    let left = x + TooltipMargin; // right
    let top = y - TooltipHeight / 2;

    if (left + TooltipWidth > width) {
      left = x - TooltipMargin - TooltipWidth;
    }

    if (top < YPadding) {
      top = YPadding;
    }
    if (top + TooltipHeight > height) {
      top = height - TooltipHeight;
    }

    return [left, top];
  }
}
