import React, { ReactNode } from 'react';

import { css } from '../../../styles/system';

interface Props {
  children?: ReactNode;
  htmlFor?: string;
  error?: string;
  isSuccess?: boolean;
  isRegular?: boolean;
  /** Set role */
  role?: string;
  /** Set if label has colon disabled*/
  colonIsDisabled?: boolean;
}

export const Label = ({
  children,
  error,
  htmlFor,
  isSuccess,
  isRegular = false,
  colonIsDisabled
}: Props) => {
  const endsWithColon = typeof children === 'string' ? children.endsWith(':') : false;

  const colon = !colonIsDisabled && !endsWithColon && ':';
  return (
    <div className={wrapper()}>
      <label className={styles({ hasError: !!error, isSuccess, isRegular })} htmlFor={htmlFor}>
        {children}
        {colon}
      </label>
    </div>
  );
};

const wrapper = css({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  width: '100%'
});

const styles = css({
  fontFamily: '$normal',
  fontWeight: 500,
  m: 0,
  marginRight: '$1',
  marginBottom: '$2',
  display: 'flex',
  color: '$black',
  whiteSpace: 'nowrap',
  variants: {
    isRegular: {
      true: {
        fontWeight: 'normal',
        marginBottom: 0
      }
    },
    hasError: {
      true: {
        color: '$red1'
      }
    },
    isSuccess: {
      true: {
        color: '$blue2'
      }
    }
  }
});
