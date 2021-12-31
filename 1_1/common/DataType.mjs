function DataType(type, unit) {
  const state = { type, unit };

  return {
    getType() {
      return state.type;
    },
    getUnit() {
      return state.unit;
    },
    setUnit(unit) {
      state.unit = unit;
    },
  };
}

export default DataType;
