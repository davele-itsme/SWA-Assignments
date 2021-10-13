class DateInterval {
  constructor(from, to) {
    this.from = from;
    this.to = to;
    Object.freeze(this);
  }

  getFrom() {
    return this.from;
  }
  getTo() {
    return this.to;
  }
  contains(d) {
    return d >= this.from && d <= this.to;
  }
}

export { DateInterval };
