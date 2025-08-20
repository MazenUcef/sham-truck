import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const OffersIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={25}
        viewBox="0 0 24 25"
        fill="none"
        {...props}
    >
        <Path
            d="M21.41 12.08L12.41 3.08C12.05 2.72 11.55 2.5 11 2.5H4C2.9 2.5 2 3.4 2 4.5V11.5C2 12.05 2.22 12.55 2.59 12.92L11.59 21.92C11.95 22.28 12.45 22.5 13 22.5C13.55 22.5 14.05 22.28 14.41 21.91L21.41 14.91C21.78 14.55 22 14.05 22 13.5C22 12.95 21.77 12.44 21.41 12.08ZM13 20.51L4 11.5V4.5H11V4.49L20 13.49L13 20.51Z"
            fill="#AEB9C4"
        />
        <Path
            d="M6.5 8.5C7.32843 8.5 8 7.82843 8 7C8 6.17157 7.32843 5.5 6.5 5.5C5.67157 5.5 5 6.17157 5 7C5 7.82843 5.67157 8.5 6.5 8.5Z"
            fill="#AEB9C4"
        />
    </Svg>
);

export default OffersIcon;