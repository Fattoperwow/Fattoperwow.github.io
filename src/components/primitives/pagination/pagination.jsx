import React from "react";
import { usePagination, DOTS } from "../../../hooks/pagination/pagination";
import { css } from "../../../styles/system";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={paginationContainer()}>
      {/* Left navigation arrow */}
      <li
        className={paginationItem({
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className={arrow({ left: true, disabled: currentPage === 1 })} >
        <AiOutlineArrowLeft />
        </div>
      </li>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li key={index} className={dots()}>&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={paginationItem({
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={paginationItem({
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div
          className={arrow({ right: true, disabled: currentPage === lastPage })}
        >
          <AiOutlineArrowRight />
        </div>
      </li>
    </ul>
  );
};

const paginationContainer = css({
  display: "flex",
  listStyleType: "none",
});

const paginationItem = css({
  padding: "0 12px",
  height: "32px",
  textAlign: "center",
  margin: "auto 4px",
  color: "rgba(0, 0, 0, 0.87)",
  display: "flex",
  boxSizing: "border-box",
  alignItems: "center",
  letterSpacing: "0.01071em",
  borderRadius: "16px",
  lineHeight: 1.43,
  fontSize: "13px",
  minWidth: "32px",
  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)", cursor: "pointer" },
  variants: {
    selected: {
      true: {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
      },
    },
    disabled: {
      true: {
        pointerEvents: "none",
        "&:hover": { backgroundColor: "transparent", cursor: "default" },
      },
    },
  },
});

const dots = css({
  "&:hover": { backgroundColor: "transparent", cursor: "default" },
});

const arrow = css({
  "&::before": {
    position: "relative",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: "0.12em solid rgba(0, 0, 0, 0.87)",
    borderTop: "0.12em solid rgba(0, 0, 0, 0.87)",
    variants: {
      disabled: {
        true: {
          "&::before": {
            borderRight: "0.12em solid rgba(0, 0, 0, 0.43)",
            borderTop: "0.12em solid rgba(0, 0, 0, 0.43)",
          },
        },
      },
    },
  },
});
