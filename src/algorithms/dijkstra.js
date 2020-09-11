import PriorityQueue from 'js-priority-queue';
import {
	BOARD_ROW, BOARD_COL, ITEM_CLICKED, ITEM_VISITED,
} from '../constants.js';
import PathFinder from './pathFinder';

export default class Dijkstra extends PathFinder {
	constructor(args) {
		super(args);
		this.pq = new PriorityQueue({ comparator: (a, b) => a.d - b.d });
	}

  execute = () => {
  	const {
  		pq, dist, prev, board, begin, end, updateItem,
  	} = this;

  	pq.queue({ x: begin.x, y: begin.y, d: 0 });
  	let find = false;

  	while (pq.length) {
  		const current = pq.peek();
  		pq.dequeue();
  		const currentX = current.x;
  		const currentY = current.y;
  		const currentD = current.d;

  		for (let i = 0; i < PathFinder.dx.length; i++) {
  			const nextX = currentX + PathFinder.dx[i];
  			const nextY = currentY + PathFinder.dy[i];

  			if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
  			if (
  				dist[currentX][currentY] === Infinity ||
          dist[currentX][currentY] + 1 >= dist[nextX][nextY]
  			) continue;
  			if (board[nextX][nextY] === ITEM_CLICKED) continue;

  			board[nextX][nextY] = ITEM_VISITED;
  			updateItem(nextX, nextY, ITEM_VISITED, currentD);
  			prev[nextX][nextY] = { x: currentX, y: currentY };

  			if (nextX === end.x && nextY === end.y) {
  				find = true;
  				break;
  			}

  			dist[nextX][nextY] = dist[currentX][currentY] + 1;
  			pq.queue({ x: nextX, y: nextY, d: dist[nextX][nextY] });
  		}

  		if (find) {
  			pq.clear();
  			return true;
  		}
  	}
  	this.clearTimers();
  	return false;
  };
}
