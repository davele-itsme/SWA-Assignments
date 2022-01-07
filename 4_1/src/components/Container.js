import React, { useEffect, useRef, useState } from "react";
import { timer, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, switchMap, pluck, filter, map } from "rxjs/operators";
import WarningTable from "./WarningTable";

const Container = () => {
  const [warnings, setWarnings] = useState(null);
  const [updates, setUpdates] = useState(null);
  const [status, setStatus] = useState("turn on");
  const [severity, setSeverity] = useState(1);

  const subscription = useRef();
  const updatesSubscription = useRef();

  const filterData = (e) => {
    setSeverity(e.target.value);
  };

  const fetchData = () => {
    return timer(0, 10000)
      .pipe(switchMap(() => ajax(`http://localhost:8080/warnings`)))
      .pipe(
        pluck("response"),
        catchError((error) => {
          console.log("error: " + error);
          return of(error);
        }),
        pluck("warnings")
      );
  };

  const fetchUpdates = () => {
    return timer(10000, 10000)
      .pipe(
        switchMap(() => {
          const now = new Date();
          const date = new Date(now.getTime() - 10000).toUTCString();
          return ajax(`http://localhost:8080/warnings/since/${date}`);
        })
      )
      .pipe(
        catchError((error) => {
          console.log("error: " + error);
          return of(error);
        }),
        pluck("response"),
        pluck("warnings")
      )
      .pipe(filter((data) => data.length !== 0))
      .pipe(
        map((data) => {
          return data.filter((update) => update.prediction !== null);
        })
      );
  };

  const switchPolling = () => {
    if (status === "turn on") {
      var observable = fetchData();
      subscription.current = observable.subscribe((response) => {
        setWarnings(response);
        setStatus("turn off");
      });

      var updatesObservable = fetchUpdates();
      updatesSubscription.current = updatesObservable.subscribe((response) => {
        setUpdates(response);
      });
    } else {
      if (subscription.current) {
        subscription.current.unsubscribe();
        updatesSubscription.current.unsubscribe();
        setStatus("turn on");
        console.log("Turned off");
      }
    }
  };

  useEffect(() => {
    switchPolling();

    return () => {
      if (subscription.current && updatesSubscription.current) {
        subscription.current.unsubscribe();
        updatesSubscription.current.unsubscribe();
      }
    };
  }, []);

  return (
    <div>
      <span>Severity level </span>
      <input type="text" onChange={(e) => filterData(e)} />
      <h3>1. Warnings</h3>
      <WarningTable warnings={warnings} severity={severity} />
      <h3>2. Updates since last update</h3>
      <WarningTable warnings={updates} severity={1} />
      <button className="button" onClick={switchPolling}>
        {status}
      </button>
    </div>
  );
};

export default Container;
