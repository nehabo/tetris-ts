import { Piece } from './piece';

export class Board {
  grid: number[][];

  constructor(public width: number, public height: number) {
    this.grid = Array.from({ length: height }, () => Array(width).fill(0));
  }

  isValidPosition(piece: Piece): boolean {
    return piece.shape.every((row, dy) => {
      return row.every((value, dx) => {
        if (value === 0) return true;

        const x = piece.x + dx;
        const y = piece.y + dy;

        if (x < 0 || x >= this.width || y >= this.height) return false;
        if (this.grid[y]?.[x]) return false;

        return true;
      });
    });
  }

  place(piece: Piece) {
    piece.shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        if (value !== 0) {
          const x = piece.x + dx;
          const y = piece.y + dy;
          if (y >= 0 && y < this.height) {
            this.grid[y][x] = value;
          }
        }
      });
    });
  }

  clearLines(): number {
    let linesCleared = 0;
    this.grid = this.grid.filter(row => {
      if (row.every(cell => cell !== 0)) {
        linesCleared++;
        return false;
      }
      return true;
    });
    while (this.grid.length < this.height) {
      this.grid.unshift(Array(this.width).fill(0));
    }
    return linesCleared;
  }

  draw(context: CanvasRenderingContext2D) {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = '#0ff';
          context.fillRect(x * 30, y * 30, 30, 30);
        }
      });
    });
  }
}
