import { actionTypes } from "../types/reducerTypes";

const Reducer = (state: object, action: actionTypes) => {
  switch (action.type) {
    case 'flip':
      return action.payload.updated;
    case 'sizes':
      return action.payload.sizes;
    default:
      return (
        {
          ...state,
          count: 0,
          flipHorizontal: false,
          flipVertical: false
        }
      );
  }
}
export default Reducer;