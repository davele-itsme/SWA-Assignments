function DataType(type, unit) {
  const state = { type, unit };

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

export { DataType };
