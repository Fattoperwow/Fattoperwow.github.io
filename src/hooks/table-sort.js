import { useState } from "react";

export const useTableSort = (params) => {
  const [sortState, setSortState] = useState({
    direction: params.direction,
    sort: params.sort
  });

  const handleSort = (sort: string, reset?: boolean) => {
    let direction: string = null;
    const isFieldEqual = sortState.sort === null || sortState.sort === sort;

    if (reset) {
      direction = null;
      sort = null;
    } else {
      if (sortState.direction === null) {
        direction = isFieldEqual ? 'desc' : sortState.direction;
      } else if (sortState.direction === 'desc') {
        direction = isFieldEqual ? 'asc' : sortState.direction;
      } else if (sortState.direction === 'asc') {
        direction = isFieldEqual ? null : sortState.direction;
        sort = isFieldEqual ? null : sort;
      }
    }

    setSortState({ direction, sort });
  };

  return { sortState, handleSort };
};
