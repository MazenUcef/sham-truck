import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const ActiveRequestsIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={25}
        viewBox="0 0 24 25"
        fill="none"
        {...props}
    >
        <Path
            d="M5 21.5C4.45 21.5 3.97933 21.3043 3.588 20.913C3.19667 20.5217 3.00067 20.0507 3 19.5V5.5C3 4.95 3.196 4.47933 3.588 4.088C3.98 3.69667 4.45067 3.50067 5 3.5H19C19.55 3.5 20.021 3.696 20.413 4.088C20.805 4.48 21.0007 4.95067 21 5.5V19.5C21 20.05 20.8043 20.521 20.413 20.913C20.0217 21.305 19.5507 21.5007 19 21.5H5ZM7 17.5H12V15.5H7V17.5ZM8 13.5L12 11.5L16 13.5V5.5H8V13.5Z"
            fill="#0077B6"
        />
    </Svg>
);

export default ActiveRequestsIcon;