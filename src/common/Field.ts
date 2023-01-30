import App from '../App';

import {
  FieldLineColor,
  FieldLineWidth,
  FieldMarkClass,
  FieldMarkColor,
  FieldMarkPadding,
  XPadding,
  YPadding,
} from 'config';
import { drawLine } from '@utils/drawing';
import { TimeLine } from '../types';

interface FieldProps {
  timeLines: TimeLine[];
  valueLines: number[];
}

export default class Field {
  app: App;

  timeLines: TimeLine[];
  valueLines: number[];

  constructor(app: App, props: FieldProps) {
    this.app = app;

    this.timeLines = props.timeLines;
    this.valueLines = [0, ...props.valueLines, 1];

    this.createLabels();

    this.app.render.subscribe(() => {
      this.app.canvas.draw(this.draw.bind(this));
    });
  }

  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const width = canvas.width - 2 * YPadding;
    const height = canvas.height - 2 * YPadding;

    for (const percent of this.valueLines) {
      const y = percent * height + YPadding;
      const x = XPadding;

      drawLine(ctx, x, y, x + width, y, FieldLineWidth, FieldLineColor);
    }

    const timeLines = this.timeLines
      .map(({ position }) => position)
      .concat(0, 1);

    for (const position of timeLines) {
      const x = XPadding + position * width;
      const y = YPadding;

      drawLine(ctx, x, y, x, y + height, FieldLineWidth, FieldLineColor);
    }
  }

  createLabels() {
    const width = this.app.canvas.width - 2 * XPadding;
    const height = this.app.canvas.height - 2 * YPadding;

    const [min, max] = this.app.extremum;

    for (const percent of this.valueLines) {
      const value = (1 - percent) * (max - min) + min;
      const text = value.toFixed(2);

      const label = this.createLabel(text);

      const left = -label.clientWidth - FieldMarkPadding;
      const top = YPadding + percent * height - label.clientHeight / 2;

      label.style.left = `${left}px`;
      label.style.top = `${top}px`;
    }

    for (const progressLine of this.timeLines) {
      const label = this.createLabel(progressLine.title);

      const left =
        XPadding + progressLine.position * width - label.clientWidth / 2;
      const top = YPadding + height + FieldMarkPadding;

      label.style.left = `${left}px`;
      label.style.top = `${top}px`;
    }
  }

  createLabel(text: string) {
    const mark = document.createElement('div');

    mark.className = FieldMarkClass;
    mark.innerHTML = text;

    mark.style.position = 'absolute';
    mark.style.color = FieldMarkColor;

    this.app.root.append(mark);

    return mark;
  }
}
