// @flow

import PriorityQueue from 'js-priority-queue';
import {
	BOARD_ROW,
	BOARD_COL,
	ITEM_CLICKED,
	ITEM_VISITED,
} from '../constants.js';
import PathFinder from './pathFinder';

export default class AStar extends PathFinder {
	constructor(args) {
		super(args);
		this.opened = new Array(BOARD_ROW);
		for (let i = 0; i < BOARD_ROW; i++) {
			this.opened[i] = new Array(BOARD_COL).fill(false);
		}
		this.pq = new PriorityQueue({ comparator: (a, b) => a.f - b.f });
	}

  _h = start => Math.abs(start.x - this.end.x) + Math.abs(start.y - this.end.y);

  execute = () => {
  	const {
  		dist, pq, opened, board, updateItem, prev, begin, _h, end,
  	} = this;
  	const fBegin = _h(begin);
  	pq.queue({ x: begin.x, y: begin.y, f: fBegin });
  	dist[begin.x][begin.y] = 0;
  	opened[begin.x][begin.y] = true;

  	let find = false;
  	let timeFactor = 1;

  	while (pq.length) {
  		const current = pq.peek();
  		const currentX = current.x;
  		const currentY = current.y;

  		if (currentX === end.x && currentY === end.y) {
  			pq.clear();
  			find = true;
  			break;
  		}

  		opened[currentX][currentY] = false;
  		pq.dequeue();

  		for (let i = 0; i < PathFinder.dx.length; i++) {
  			const nextX = currentX + PathFinder.dx[i];
  			const nextY = currentY + PathFinder.dy[i];

  			if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL) continue;
  			if (board[nextX][nextY] === ITEM_CLICKED) continue;

  			const g = dist[currentX][currentY] + 1;
  			const nextF = g + _h({ x: nextX, y: nextY });

  			if (g < dist[nextX][nextY]) {
  				prev[nextX][nextY] = { x: currentX, y: currentY };
  				dist[nextX][nextY] = g;

  				updateItem(nextX, nextY, ITEM_VISITED, timeFactor);
  				timeFactor++;

  				if (opened[nextX][nextY] === false) {
  					pq.queue({ x: nextX, y: nextY, f: nextF });
  					opened[nextX][nextY] = true;
  				}
  			}
  		}
  	}
  	if (!find) this.clearTimers();
  	return find;
  };
}
