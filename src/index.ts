import App from './App';

const graph1 = {
  color: 'blue',
  points: [
    { progress: 0, value: random(0, 145), title: 'Март' },
    { progress: 0.125, value: random(0, 145), title: 'Апрель' },
    { progress: 0.25, value: random(0, 145), title: 'Май' },
    { progress: 0.375, value: random(0, 145), title: 'Июнь' },
    { progress: 0.5, value: random(0, 145), title: 'Июль' },
    { progress: 0.625, value: random(0, 145), title: 'Август' },
    { progress: 0.75, value: random(0, 145), title: 'Сентябрь' },
    { progress: 0.875, value: random(0, 145), title: 'Октябрь' },
    { progress: 1, value: random(0, 145), title: 'Ноябрь' },
  ],
};

const graph2 = {
  color: 'red',
  points: [
    { progress: 0, value: random(0, 145), title: 'Март' },
    { progress: 0.125, value: random(0, 145), title: 'Апрель' },
    { progress: 0.25, value: random(0, 145), title: 'Май' },
    { progress: 0.375, value: random(0, 145), title: 'Июнь' },
    { progress: 0.5, value: random(0, 145), title: 'Июль' },
    { progress: 0.625, value: random(0, 145), title: 'Август' },
    { progress: 0.75, value: random(0, 145), title: 'Сентябрь' },
    { progress: 0.875, value: random(0, 145), title: 'Октябрь' },
    { progress: 1, value: random(0, 145), title: 'Ноябрь' },
  ],
};

new App({
  graphs: [graph1, graph2],

  root: document.querySelector('#root') as HTMLElement,
  timeLines: [
    { position: 0, title: 'Март' },
    { position: 0.125, title: 'Апрель' },
    { position: 0.25, title: 'Май' },
    { position: 0.375, title: 'Июнь' },
    { position: 0.5, title: 'Июль' },
    { position: 0.625, title: 'Август' },
    { position: 0.75, title: 'Сентябрь' },
    { position: 0.875, title: 'Октябрь' },
    { position: 1, title: 'Ноябрь' },
  ],
  valueLines: [1 / 8, 1 / 4, 3 / 8, 1 / 2, 5 / 8, 3 / 4, 7 / 8],
  // min: 0,
  // max: 1000,
});

function random(from: number, to: number) {
  return from + Math.random() * (to - from);
}
