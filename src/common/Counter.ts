import App from '../App';

import Point from '@common/Point';

import { getProjectionOnLine } from '@utils/geom';
import { YPadding } from '../config';
import { Coord } from '../types';

export default class Counter {
  app: App;

  constructor(app: App) {
    this.app = app;

    this.app.render.subscribe(() => this.app.canvas.draw(this.draw.bind(this)));
  }

  getGraphPoints(): [Point, Point] | null {
    if (!this.app.currentGraph) return;

    const points = this.app.currentGraph.points;

    const { x, y } = this.app.mouse;

    for (let i = 0; i < points.length - 1; i++) {
      const { x: x1, y: y1 } = points[i];
      const { x: x2, y: y2 } = points[i + 1];

      if (Math.min(x1, x2) - 5 <= x && x <= Math.max(x1, x2) + 5) {
        if (Math.min(y1, y2) - 5 <= y && y <= Math.max(y1, y2) + 5) {
          return [points[i], points[i + 1]];
        }
      }
    }

    return null;
  }

  getCounterPosition(line: [Point, Point], coords: Coord, dist: number): Coord {
    const [x, y] = coords;

    const a = line[1].x - line[0].x;
    const b = line[1].y - line[0].y;

    const l = Math.sqrt(a * a + b * b);

    return [x + (b / l) * dist, y - (a / l) * dist];
  }

  getValue(y: number) {
    const height = this.app.canvas.height - 2 * YPadding;

    const [min, max] = this.app.extremum;

    const value = ((YPadding - y) / height) * (max - min) + max;

    return value;
  }

  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    if (this.app.currentPoint) return;
    if (!this.app.currentGraph) return;

    const points = this.getGraphPoints();

    if (!points) return;

    const { x: mouseX, y: mouseY } = this.app.mouse;

    const { x: x1, y: y1 } = points[0];
    const { x: x2, y: y2 } = points[1];

    const angle = -Math.atan((y2 - y1) / (x2 - x1));

    const [gx, gy] = getProjectionOnLine(points, [mouseX, mouseY]); // Graph point;
    const [x, y] = this.getCounterPosition(points, [gx, gy], 3);

    const value = this.getValue(gy);

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(-angle);

    ctx.fillStyle = this.app.currentGraph.color;
    ctx.font = 'bold 10px serif';

    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'center';

    ctx.fillText(value.toFixed(2), 0, 0);

    ctx.restore();
  }
}
