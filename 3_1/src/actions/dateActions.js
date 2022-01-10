import AppDispatcher from "../appDispatcher";
import { UPDATE_FROM } from "./actionTypes";

var DateStoreActions = {
  updateFrom: function (data) {
    AppDispatcher.handleAction({
      actionType: UPDATE_FROM,
      data: data,
    });
  },
};

export default DateStoreActions;
