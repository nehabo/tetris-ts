import { Board } from './board';
import { Piece, createRandomPiece } from './piece';
import { handleInput } from './input';

export class Game {
  private board: Board;
  private currentPiece: Piece;
  private dropInterval = 1000;
  private dropCounter = 0;
  private lastTime = 0;
  private context: CanvasRenderingContext2D;
  private isGameOver = false;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.board = new Board(10, 20);
    this.currentPiece = createRandomPiece();
    handleInput(() => this.currentPiece, this.board);
  }

  start() {
    const update = (time = 0) => {
      const deltaTime = time - this.lastTime;
      this.lastTime = time;
      this.dropCounter += deltaTime;

      if (this.dropCounter > this.dropInterval) {
        this.drop();
      }

      this.context.clearRect(0, 0, 300, 600);
      this.board.draw(this.context);
      this.currentPiece.draw(this.context);

      if (!this.isGameOver) {
        requestAnimationFrame(update);
      } else {
        this.context.fillStyle = "white";
        this.context.font = "20px Arial";
        this.context.fillText("Game Over", 90, 300);
      }
    };
    update();
  }

  drop() {
    this.currentPiece.y++;
    if (!this.board.isValidPosition(this.currentPiece)) {
      this.currentPiece.y--;
      this.board.place(this.currentPiece);
      this.board.clearLines();
      this.currentPiece = createRandomPiece();
      if (!this.board.isValidPosition(this.currentPiece)) {
        this.isGameOver = true;
      }
    }
    this.dropCounter = 0;
  }
}
