const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return {
        ...state,
        themeColor: action.payload,
      };
    case "CHANGE_BACKGROUND_COLOR":
      return {
        ...state,
        backgroundColor: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
