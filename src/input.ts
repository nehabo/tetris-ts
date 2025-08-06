import { Piece } from './piece';
import { Board } from './board';

export function handleInput(getPiece: () => Piece, board: Board) {
  document.addEventListener('keydown', (event) => {
    const piece = getPiece();
    switch (event.key) {
      case 'ArrowLeft':
        piece.move(-1, board);
        break;
      case 'ArrowRight':
        piece.move(1, board);
        break;
      case 'ArrowDown':
        piece.drop(board);
        break;
      case 'ArrowUp':
        piece.rotate(board);
        break;
    }
  });
}
