type Subscriber = (data: Render) => void;

export default class Render {
  subsctibers: Subscriber[] = [];
  ptimestamp: number = 0;
  timestamp: number = 0;
  fps: number = 0;

  constructor() {
    requestAnimationFrame((timestamp) => this.tick(timestamp));
  }

  tick(timestamp: number) {
    requestAnimationFrame((timestamp) => this.tick(timestamp));

    Object.assign(this, {
      timestamp,
      ptimestamp: this.timestamp,
      fps: 1000 / (timestamp - this.ptimestamp),
    });

    this.dispatch();
  }

  subscribe(subscriber: Subscriber) {
    if (this.subsctibers.includes(subscriber)) {
      return false;
    }

    this.subsctibers.push(subscriber);

    return () => {
      const index = this.subsctibers.indexOf(subscriber);

      if (index !== -1) {
        this.subsctibers.splice(index, 1);
      }
    };
  }

  dispatch() {
    for (const subscriber of this.subsctibers) {
      subscriber(this);
    }
  }
}
