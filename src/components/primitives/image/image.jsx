import React, { useState } from "react";

import { css } from "../../../styles/system";

interface Props {
  /** Set image source */
  src: string;
  /** Set default image that fall back when src does not exist */
  defaultSrc: string;
  /** Set image width */
  width?: number | string;
  /** Set image height */
  height?: number | string;
  /** Set the alternate text for an image */
  alt?: string;
  /** Set the styling of the element */
  css?: CSS;
  /** Render image as thumbnail if set to true */
  isThumbnail?: boolean;
  /** Render image in greyscale */
  isGreyedOut?: boolean;
  /** Set role */
  role?: string;
}

export const Image = ({
  src: rawSrc,
  defaultSrc,
  width,
  height,
  css,
  alt,
  isThumbnail,
  isGreyedOut,
  role,
}: Props) => {

  const [src, setSrc] = useState(rawSrc);

  return (
    <img
      className={styles({ isThumbnail, isGreyedOut, css })}
      src={src}
      width={width}
      height={height}
      alt={alt}
      role={role}
      onError = {() => setSrc(defaultSrc ? defaultSrc : '/media/general/default.png')}
    />
  );
};

const styles = css({
  variants: {
    isThumbnail: {
      true: {
        width: "$6",
        height: "$6",
      },
    },
    isGreyedOut: {
      true: {
        filter: "grayscale(100%)",
        opacity: "50%",
      },
    },
  },
});
