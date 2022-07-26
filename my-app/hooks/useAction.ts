import {selectBeerAction} from "../redux/beer/beerSlice";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

const allAction = {
  ...selectBeerAction
}
export const useAction = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allAction, dispatch)
}