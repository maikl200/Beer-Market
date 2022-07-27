import {productSliceAction} from "../redux/beer/beerSlice";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

const allAction = {
  ...productSliceAction
}
export const useAction = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allAction, dispatch)
}