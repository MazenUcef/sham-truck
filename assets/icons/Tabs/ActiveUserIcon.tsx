import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const ActiveUserIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={25}
        viewBox="0 0 25 25"
        fill="none"
        {...props}
    >
        <Path
            d="M12.5 12.5C15.2614 12.5 17.5 10.2614 17.5 7.5C17.5 4.73858 15.2614 2.5 12.5 2.5C9.73858 2.5 7.5 4.73858 7.5 7.5C7.5 10.2614 9.73858 12.5 12.5 12.5Z"
            fill="#0077B6"
        />
        <Path
            d="M12.4999 15C7.48991 15 3.40991 18.36 3.40991 22.5C3.40991 22.78 3.62991 23 3.90991 23H21.0899C21.3699 23 21.5899 22.78 21.5899 22.5C21.5899 18.36 17.5099 15 12.4999 15Z"
            fill="#0077B6"
        />
    </Svg>
);

export default ActiveUserIcon;