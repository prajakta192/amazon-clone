const Reducer = (state, action) => {
        switch (action.type) {
          case "FETCH_REQUEST":
            return { ...state, loading: true };
          case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false };
          case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
          default:
            return state;
        }
      };
  

export default Reducer


export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};