import { timer } from "rxjs";
import { switchMapTo } from "rxjs/operators";

export function poll(pollInterval) {
  return (source$) => timer(0, pollInterval).pipe(switchMapTo(source$));
}
