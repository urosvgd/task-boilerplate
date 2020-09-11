import { BOARD_ROW, BOARD_COL, ITEM_SHORTEST } from '../constants.js';

export default class PathFinder {
  begin;

  end;

  updateItem;

  board;

  timers;

  dist;

  prev;

  static dx;

  static dy;

  constructor({
  	begin, end, updateItem, board,
  }) {
  	this.begin = begin;
  	this.end = end;
  	this.updateItem = updateItem;
  	this._init();
  	this.board = board;
  	this.timers = [];
  }

  static dx = [-1, 1, 0, 0];

  static dy = [0, 0, -1, 1];

  _init = () => {
  	this.dist = new Array(BOARD_ROW);
  	this.prev = new Array(BOARD_ROW);
  	for (let i = 0; i < BOARD_ROW; i++) {
  		this.dist[i] = [];
  		this.prev[i] = [];
  		for (let j = 0; j < BOARD_COL; j++) {
  			this.dist[i][j] = Infinity;
  			this.prev[i][j] = { x: -1, y: -1 };
  		}
  	}
  	this.dist[this.begin.x][this.begin.y] = 0;
  };

  clearTimers() {
  	this.timers.forEach((timer) => {
  		timer.destroy();
  	});
  	this.timers = [];
  }

  stopTimers() {
  	this.timers.forEach(timer => timer.pause());
  }

  resumeTimers() {
  	this.timers.forEach(timer => timer.resume());
  }

  paintShortestPath = () => {
  	const {
  		begin, end, prev, updateItem,
  	} = this;

  	const path = [];
  	let { x } = end;
  	let { y } = end;

  	while (prev[x][y].x !== -1 && prev[x][y].y !== -1) {
  		path.push({ x, y });
  		const tempX = x;
  		const tempY = y;
  		x = prev[tempX][tempY].x;
  		y = prev[tempX][tempY].y;
  	}
  	path.push({ x: begin.x, y: begin.y });

  	for (let i = path.length - 1; i >= 0; i--) {
  		x = path[i].x;
  		y = path[i].y;
  		updateItem(x, y, ITEM_SHORTEST, path.length - i);
  	}
  };
}
