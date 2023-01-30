import Point from '@common/Point';

import { Coord, GraphData } from '../types';

export function roundGraphMax(x: number) {
  const length = Math.floor(x).toString().length;
  const tenDegree = Math.max(length - 2, 1);
  const remains = x % Math.pow(10, tenDegree);

  return x + Math.pow(10, tenDegree) - remains;
}

export function getGraphsMax(graphs: GraphData[]) {
  const max = Math.max(
    ...graphs.map((graph) =>
      Math.max(...graph.points.map((point) => point.value)),
    ),
  );

  return roundGraphMax(max);
}

export function getGraphsMin(graphs: GraphData[]) {
  return Math.min(
    ...graphs.map((graph) =>
      Math.min(...graph.points.map((point) => point.value)),
    ),
  );
}

export function getProjectionOnLine(line: [Point, Point], coord: Coord) {
  const { x: x1, y: y1 } = line[0];
  const { x: x2, y: y2 } = line[1];

  const [x3, y3] = coord;

  const a = x2 - x1;
  const b = y2 - y1;

  if (a === 0) return [x2, y3];
  if (b === 0) return [x3, y2];

  const x = ((a / b) * x3 + y3 - y1 + (b / a) * x1) / (b / a + a / b);
  const y = (b / a) * x - (b / a) * x1 + y1;

  return [x, y];
}
