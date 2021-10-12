function DataType(type, unit) {
  const state = { type, unit };
  Object.freeze(this);
  return {
    getType() {
      return state.type;
    },
    setType(type) {
      state.type = type;
    },
    getUnit() {
      return state.unit;
    },
    setUnit(unit) {
      state.unit = unit;
    },
  };
}

Object.freeze(DataType);

export { DataType };
