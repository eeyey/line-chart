export function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  lineWidth: number,
  color: string
) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

export function drawArc(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  fillColor: string,
  strokeColor: string
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 360);
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.fill();
  ctx.stroke();
}
