import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const RequestsIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={25}
        viewBox="0 0 24 25"
        fill="none"
        {...props}
    >
        <Path
            d="M10 10.25L12 9.25L14 10.25V5.5H10V10.25ZM7 17.5V15.5H12V17.5H7ZM5 21.5C4.45 21.5 3.97933 21.3043 3.588 20.913C3.19667 20.5217 3.00067 20.0507 3 19.5V5.5C3 4.95 3.196 4.47933 3.588 4.088C3.98 3.69667 4.45067 3.50067 5 3.5H19C19.55 3.5 20.021 3.696 20.413 4.088C20.805 4.48 21.0007 4.95067 21 5.5V19.5C21 20.05 20.8043 20.521 20.413 20.913C20.0217 21.305 19.5507 21.5007 19 21.5H5ZM5 19.5H19V5.5H16V13.5L12 11.5L8 13.5V5.5H5V19.5Z"
            fill="#AEB9C4"
        />
    </Svg>
);

export default RequestsIcon;