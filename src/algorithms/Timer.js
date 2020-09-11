export default class Timer {
  id;

  callback;

  delay;

  remain;

  start;

  constructor({ callback, delay }) {
  	this.id = setTimeout(callback, delay);
  	this.callback = callback;
  	this.delay = delay;
  	this.remain = delay;
  	this.start = Date.now();
  }

  pause = () => {
  	clearTimeout(this.id);
  	this.remain -= Date.now() - this.start;
  };

  resume = () => {
  	this.start = Date.now();
  	clearTimeout(this.id);
  	this.id = setTimeout(this.callback, this.remain);
  };

  destroy = () => {
  	clearTimeout(this.id);
  };
}
