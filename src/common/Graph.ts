import App from '../App';

import Point from '@common/Point';

import { Coord, GraphData } from '../types';

import {
  GraphLineWidth,
  LightedDistance,
  LightedLineWidth,
  LightedSpace,
} from '../config';

import { drawLine } from '../utils/drawing';
import { getProjectionOnLine } from '../utils/geom';

export default class Graph {
  app: App;

  points: Point[];
  color: string;

  constructor(app: App, props: GraphData) {
    this.app = app;
    this.color = props.color;

    this.app.render.subscribe(() => {
      this.app.canvas.draw(this.draw.bind(this));
    });
    this.app.mouse.on('mousemove', this.onMouseMove.bind(this));
    this.app.mouse.on('mousedown', this.onMouseDown.bind(this));

    this.points = props.points.map((point) => new Point(this.app, this, point));
  }

  onMouseMove() {
    const { x, y } = this.app.mouse;

    const currentGraph = this.app.currentGraph;
    if (currentGraph && currentGraph.includes([x, y])) return;

    this.app.currentGraph = null;

    if (this.includes([x, y])) {
      this.app.currentGraph = this;
    }
  }

  onMouseDown() {
    const { x, y } = this.app.mouse;

    const selectedGraph = this.app.selectedGraph;
    if (selectedGraph && selectedGraph.includes([x, y])) return;

    this.app.selectedGraph = null;

    const currentGraph = this.app.currentGraph;

    if (currentGraph !== this) return;
    if (!currentGraph.includes([x, y])) {
      this.app.selectedGraph = null;
    } else {
      this.app.selectedGraph = this;
    }
  }

  includes(coord: Coord) {
    const [x, y] = coord;

    const points = this.points;

    for (let i = 0; i < points.length - 1; i++) {
      const { x: x1, y: y1 } = points[i];
      const { x: x2, y: y2 } = points[i + 1];

      const [xMax, xMin] = [Math.max(x1, x2), Math.min(x1, x2)];
      const [yMax, yMin] = [Math.max(y1, y2), Math.min(y1, y2)];

      if (x <= xMin - LightedSpace || x >= xMax + LightedSpace) continue;
      if (y <= yMin - LightedSpace || y >= yMax + LightedSpace) continue;

      const [px, py] = getProjectionOnLine([points[i], points[i + 1]], [x, y]);
      const d = Math.sqrt((px - x) * (px - x) + (py - y) * (py - y));

      if (d > LightedDistance) continue;

      return true;
    }

    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const lighted =
      this.app.currentGraph === this || this.app.selectedGraph === this;
    const lineWidth = lighted ? LightedLineWidth : GraphLineWidth;

    let prevPoint = { x: this.points[0].x, y: this.points[0].y };

    for (const curPoint of this.points) {
      const { x: x1, y: y1 } = prevPoint;
      const { x: x2, y: y2 } = curPoint;

      drawLine(ctx, x1, y1, x2, y2, lineWidth, this.color);

      prevPoint = { x: x2, y: y2 };
    }

    // this.points.forEach((point) => point.draw(true, addLineWidth));
  }
}
