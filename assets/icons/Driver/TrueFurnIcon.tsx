import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const TrueFurnIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        {...props}
    >
        <Path
            d="M10.05 15.15L18.525 6.675C18.725 6.475 18.9583 6.375 19.225 6.375C19.4917 6.375 19.725 6.475 19.925 6.675C20.125 6.875 20.225 7.11267 20.225 7.388C20.225 7.66333 20.125 7.90067 19.925 8.1L10.75 17.3C10.55 17.5 10.3167 17.6 10.05 17.6C9.78333 17.6 9.55 17.5 9.35 17.3L5.05 13C4.85 12.8 4.754 12.5627 4.762 12.288C4.77 12.0133 4.87433 11.7757 5.075 11.575C5.27566 11.3743 5.51333 11.2743 5.788 11.275C6.06266 11.2757 6.3 11.3757 6.5 11.575L10.05 15.15Z"
            fill="#F8F9FA"
        />
    </Svg>
);

export default TrueFurnIcon;