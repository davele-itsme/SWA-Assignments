class EventData {
  constructor(time, place, type, unit) {
    this.time = time;
    this.place = place;
    this.type = type;
    this.unit = unit;
    Object.freeze(this);
  }

  getTime() {
    return this.time;
  }
  getPlace() {
    return this.place;
  }
  getType() {
    return this.type;
  }
  getUnit() {
    return this.unit;
  }
}

export { EventData };
