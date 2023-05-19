import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getType } from "../../redux/actions/actions";

export const useFetchTypes = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    if (types.length === 0) {
      dispatch(getType());
    }
  }, [dispatch, types]);

  return types;
};
