import React, { ReactElement } from 'react';

import { Text } from '../text/text';

import { css } from '../../../styles/system';

interface Props {
  /** Boolean to determine if the tab is rendered or not  */
  id: string;
  /** Children components rendered within the tab if "isActive" is true */
  label: string;
  /** Component optional that would show next tot the label */
  component?: ReactElement;
  /** If this tab is currently selected */
  isSelected: boolean;
  /** Number of validation errors on current tab */
  errorCount?: number;
}

export const Tab = ({ id, label, component, isSelected, errorCount }: Props) => {
  return (
    <div className={itemStyle({ isSelected })} id={id}>
      <Text size='medium'>{label}</Text>
      {!!component && <div className={tabIconStyle()}>{component}</div>}
    </div>
  );
};

const tabIconStyle = css({
  marginLeft: '$1'
});

const itemStyle = css({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$2 $4',
  cursor: 'pointer',
  textDecoration: 'none',
  color: '$grey8',
  border: '1px solid transparent',
  lineHeight: '1.5',
  borderBottom: '1px solid transparent !important',
  fontSize: '18px',
  '&:hover': {
    color: '$blue1',
    textDecoration: 'none'
  },
  variants: {
    isSelected: {
      true: {
        border: '1px solid $grey4',
        borderTopLeftRadius: '$1',
        borderTopRightRadius: '$1',

        '&:after': {
          content: '',
          display: 'block',
          width: '100%',
          height: '$1',
          position: 'absolute',
          bottom: '-3px',
          backgroundColor: '$white'
        }
      }
    }
  }
});
