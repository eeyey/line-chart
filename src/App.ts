import Canvas from '@core/Canvas';
import Mouse from '@core/Mouse';
import Render from '@core/Render';

import Counter from '@common/Counter';
import Tooltip from '@common/Tooltip';
import Field from '@common/Field';
import Graph from '@common/Graph';
import Point from '@common/Point';

import { getGraphsMax, getGraphsMin } from '@utils/geom';
import { GraphData, TimeLine } from './types';

interface AppProps {
  root: HTMLElement;
  graphs: GraphData[];
  timeLines: TimeLine[];
  valueLines: number[];
  min?: number;
  max?: number;
}

export default class App {
  root: HTMLElement;

  render = new Render();
  canvas: Canvas;
  mouse: Mouse;

  counter: Counter;
  tooltip: Tooltip;
  field: Field;
  graphs: Graph[];

  extremum: [number, number] = [0, 0];

  currentGraph: Graph | null = null;
  selectedGraph: Graph | null = null;

  currentPoint: Point | null = null;

  constructor(props: AppProps) {
    this.root = props.root;

    this.extremum[0] = props.min ?? getGraphsMin(props.graphs);
    this.extremum[1] = props.max ?? getGraphsMax(props.graphs);

    this.canvas = new Canvas(this.root, '#fff');
    this.mouse = new Mouse(this.canvas.element);

    this.render.subscribe(() => {
      this.canvas.clear();
      this.mouse.tick();
    });

    this.field = new Field(this, {
      timeLines: props.timeLines,
      valueLines: props.valueLines,
    });

    this.graphs = props.graphs.map((graph) => new Graph(this, graph));

    this.render.subscribe(() => {
      this.canvas.draw(this.drawSelectedGraph.bind(this));
      this.canvas.draw(this.drawCurrentGraph.bind(this));
    });

    this.counter = new Counter(this);
    this.tooltip = new Tooltip(this);
  }

  drawCurrentGraph() {
    if (this.currentGraph) {
      this.canvas.draw((ctx) => this.currentGraph.draw(ctx));
      this.currentGraph.points.forEach((point) => {
        this.canvas.draw(point.draw.bind(point));
      });
      this.root.style.cursor = 'pointer';
    } else {
      this.root.style.cursor = 'default';
    }
  }

  drawSelectedGraph() {
    if (this.selectedGraph) {
      this.canvas.draw((ctx) => this.selectedGraph.draw(ctx));
      this.selectedGraph.points.forEach((point) => {
        this.canvas.draw(point.draw.bind(point));
      });
    }
  }
}
