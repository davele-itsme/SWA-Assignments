import dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";
import { EventEmitter } from "events";

const createDateWithOffset = (days) => {
  var date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const CHANGE_FROM = "change_from";

let _from = createDateWithOffset(-7);

class DateStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_FROM, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_FROM, callback);
  }

  emitChange() {
    this.emit(CHANGE_FROM);
  }

  getFrom() {
    return _from;
  }
}

const store = new DateStore();

dispatcher.register((action) => {
  switch (action.actionTypes) {
    case actionTypes.UPDATE_FROM:
      _from = action.from;
      store.emitChange();
      break;
    default:
  }
});

export default store;
