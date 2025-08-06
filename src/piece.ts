import type { Board } from './board';

export class Piece {
  x = 3;
  y = 0;
  shape: number[][];

  constructor(shape: number[][]) {
    this.shape = shape;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = '#f0f';
    this.shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        if (value !== 0) {
          context.fillRect((this.x + dx) * 30, (this.y + dy) * 30, 30, 30);
        }
      });
    });
  }

  move(dir: number, board: Board) {
    this.x += dir;
    if (!board.isValidPosition(this)) {
      this.x -= dir;
    }
  }

  drop(board: Board) {
    this.y++;
    if (!board.isValidPosition(this)) {
      this.y--;
    }
  }

  rotate(board: Board) {
    const oldShape = this.shape;
    const rotated = this.shape[0].map((_, i) => this.shape.map(row => row[i]).reverse());
    this.shape = rotated;
    if (!board.isValidPosition(this)) {
      this.shape = oldShape;
    }
  }
}

export function createRandomPiece(): Piece {
  const tetrominoes = [
    // I
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    // O
    [
      [2, 2],
      [2, 2],
    ],
    // T
    [
      [0, 3, 0],
      [3, 3, 3],
      [0, 0, 0],
    ],
    // S
    [
      [0, 4, 4],
      [4, 4, 0],
      [0, 0, 0],
    ],
    // Z
    [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0],
    ],
    // J
    [
      [6, 0, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    // L
    [
      [0, 0, 7],
      [7, 7, 7],
      [0, 0, 0],
    ],
  ];
  const shape = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
  return new Piece(shape);
}
