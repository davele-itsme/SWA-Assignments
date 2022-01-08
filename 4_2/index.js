import { Observable, from } from "https://dev.jspm.io/rxjs@6/_esm2015";
import {
  filter,
  map,
  pluck,
} from "https://dev.jspm.io/rxjs@6/_esm2015/operators";
import { messages } from "./Warnings.js";

let ws;
let warningsOn;
let observable;

const load = () => {
  ws = new WebSocket("ws://localhost:8090/warnings");

  warningsOn = true;

  observable = Observable.create((observer) => {
    ws.onmessage = (message) => {
      observer.next(message.data);
    };
  })
    .pipe(map((data) => JSON.parse(data)))
    .pipe(pluck("warnings"))
    .pipe(
      map((data) => {
        return data.filter((update) => update.prediction !== null);
      })
    );

  ws.onopen = () => {
    ws.send("subscribe");
    observable.subscribe((msg) => {
      console.log(msg);
    });
  };

  ws.onerror = (event) => {
    console.log("WebSocket error: ", event);
  };
};

load();

document.getElementById("toggle").onclick = () => {
  if (warningsOn === true) {
    unSubscribe();
    document.getElementById("warnings").style.display = "none";
    messages = [];
    warningsOn = false;
  } else {
    location.reload();
    warningsOn = true;
  }
};

const unSubscribe = () => {
  ws.onopen = () => {
    const message = "unsubscribe";
    ws.send(message);
  };
};

document.getElementById("changeSeverity").onclick = () => {
  let severity = document.getElementById("sev").value;

  let ul = document.getElementById("warnings");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  const source = from(messages);

  console.log(messages.length);
  const modified = source.pipe(filter((v) => v.severity >= severity));

  modified.subscribe((x) => {
    warnings.retrieveData(x, true);
  });
};
