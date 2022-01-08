import { Subject } from "https://dev.jspm.io/rxjs@6/_esm2015";
import {
  filter,
  map,
  flatMap,
  pluck,
  take,
  skip,
} from "https://dev.jspm.io/rxjs@6/_esm2015/operators";
import {
  addWarning,
  resetWarnings,
  updateWarning,
  warnings,
} from "./Warnings.js";

let ws;
let warningsOn;
let initSubject;
let frequentSubject;

document.body.onload = () => {
  ws = new WebSocket("ws://localhost:8090/warnings");

  const subject = new Subject();
  ws.onmessage = (message) => {
    subject.next(message.data);
  };

  initSubject = subject
    .pipe(take(1))
    .pipe(map((data) => JSON.parse(data)))
    .pipe(pluck("warnings"))
    .pipe(flatMap((data) => data))
    .pipe(filter((data) => data.prediction !== null));

  frequentSubject = subject
    .pipe(skip(1))
    .pipe(map((data) => JSON.parse(data)))
    .pipe(filter((data) => data.prediction !== null));

  ws.onopen = () => {
    subscribe();
  };

  ws.onerror = (event) => {
    console.log("WebSocket error: ", event);
  };
};

const subscribe = () => {
  ws.send("subscribe");
  warningsOn = true;

  initSubject.subscribe((data) => {
    console.log(data);
    addWarning(data);
  });

  frequentSubject.subscribe((data) => {
    console.log(data);
    updateWarning(data);
  });

  document.getElementById("toggle").innerText = "turn off";
};

const unsubscribe = () => {
  ws.send("unsubscribe");
  frequentSubject.unsubscribe();
  document.getElementById("toggle").innerText = "turn on";
  resetWarnings();
  warningsOn = false;
};

document.getElementById("toggle").onclick = () => {
  if (warningsOn) {
    unsubscribe();
  } else {
    subscribe();
  }
};

document.getElementById("changeSeverity").onclick = () => {
  let severity = document.getElementById("sev").value;

  let filteredWarnings = warnings.filter(
    (warning) => warning.severity >= severity
  );

  if (severity) {
    document.getElementById("body").innerHTML = "";

    filteredWarnings.forEach((warning) => {
      addWarning(warning, true);
    });
  }
};
