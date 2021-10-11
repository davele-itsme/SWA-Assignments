function EventClass(time, place) {
  //Renamed to EventClass so that it is not confused with Event
  this.time = time;
  this.place = place;

  this.getTime = () => this.time;
  this.getPlace = () => this.place;
}

export { EventClass };
