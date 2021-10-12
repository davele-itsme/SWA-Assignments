function DateInterval(from, to) {
  const state = { from, to };
  Object.freeze(this);

  function getFrom() {
    return state.from;
  }
  function getTo() {
    state.to;
  }
  function contains(d) {
    return d >= state.from && d <= state.to;
  }

  return { getFrom, getTo, contains };
}
Object.freeze(DateInterval);

export { DateInterval };
