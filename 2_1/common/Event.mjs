function Event(time, place) {
  this.time = time;
  this.place = place;

  this.getTime = () => this.time;
  this.getPlace = () => this.place;
}

export default Event;
