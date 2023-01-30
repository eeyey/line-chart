import App from '../App';

import Graph from '@common/Graph';

import { drawArc } from '@utils/drawing';
import { PointRadius, XPadding, YPadding } from '../config';
import { Coord, PointData } from '../types';

export default class Point {
  app: App;

  graph: Graph;

  color: string;
  value: number;
  title: string;

  x: number;
  y: number;

  constructor(app: App, graph: Graph, data: PointData) {
    this.app = app;
    this.graph = graph;

    this.color = this.graph.color;
    this.value = data.value;
    this.title = data.title;

    const [min, max] = this.app.extremum;

    const width = this.app.canvas.width - 2 * XPadding;
    const height = this.app.canvas.height - 2 * YPadding;

    this.x = XPadding + data.progress * width;
    this.y = YPadding + height * (1 - (this.value - min) / (max - min));

    this.app.render.subscribe(() => this.app.canvas.draw(this.draw.bind(this)));

    this.app.mouse.on('mousemove', () => {
      const { x, y } = this.app.mouse;

      const currentPoint = this.app.currentPoint;
      if (currentPoint?.includes([x, y])) return;

      this.app.currentPoint = null;

      if (this.app.currentGraph !== this.graph) return;

      if (this.includes([x, y])) {
        this.app.currentPoint = this;
      }
    });
  }

  includes(coord: Coord) {
    const [x, y] = coord;

    const r = PointRadius;
    const { x: x2, y: y2 } = this;

    if (x2 - r < x && x < x2 + r && y2 - r < y && y < y2 + r) return true;

    return false;
  }

  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const { x, y } = this;

    let fillColor = this.app.canvas.background;
    const strokeColor = this.color;

    if (this.app.currentPoint === this) fillColor = this.color;

    drawArc(ctx, x, y, PointRadius, fillColor, strokeColor);
  }
}
