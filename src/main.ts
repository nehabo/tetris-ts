import { Game } from './game';
const canvas = document.getElementById('game') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;
const game = new Game(context);
game.start();
