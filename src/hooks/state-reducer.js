import { useReducer, useCallback } from 'react';

export const useStateReducer = (
  initialState: T
) => {
  const [state, dispatch] = useReducer(
    (state: T, action: any) => ({
      ...state,
      ...action
    }),
    initialState
  );

  const setState = useCallback(
    (action, payload) => {
      dispatch({ [action]: payload });
    },
    [dispatch]
  );

  return [state, setState];
};
