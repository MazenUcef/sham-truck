import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const HomeIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={25}
        viewBox="0 0 25 25"
        fill="none"
        {...props}
    >
        <Path
            d="M9.52 3.34016L4.13 7.54016C3.23 8.24016 2.5 9.73016 2.5 10.8602V18.2702C2.5 20.5902 4.39 22.4902 6.71 22.4902H18.29C20.61 22.4902 22.5 20.5902 22.5 18.2802V11.0002C22.5 9.79016 21.69 8.24016 20.7 7.55016L14.52 3.22016C13.12 2.24016 10.87 2.29016 9.52 3.34016Z"
            stroke="#AEB9C4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M12.5 18.4902V15.4902"
            stroke="#AEB9C4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default HomeIcon;