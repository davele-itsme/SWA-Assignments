function DateInterval(from, to) {
  this.from = from;
  this.to = to;
  this.getFrom = () => this.from;
  this.getTo = () => this.to;
  this.contains = (d) => {
    return d >= this.from && d <= this.to;
  };
}

export default DateInterval;
