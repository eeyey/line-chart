export interface PointData {
  value: number;
  progress: number;
  title: string;
}

export interface GraphData {
  color: string;
  points: PointData[];
}

export interface TimeLine {
  title: string;
  position: number;
}

export type Coord = [number, number];
