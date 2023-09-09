import './style.css';
import Game from './game';

const root = document.querySelector<HTMLDivElement>('#game');
if (!root) throw new Error('No #game element in DOM');

const game = new Game();
game.prepare();
game.start();
root.appendChild(game.domElement);
