import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowRight: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M15.0898 19.92L8.56984 13.4C7.79984 12.63 7.79984 11.37 8.56984 10.6L15.0898 4.08"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowRight;
