import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const ActiveHomeIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={25}
        viewBox="0 0 25 25"
        fill="none"
        {...props}
    >
        <Path
            d="M20.54 7.31969L14.78 3.28969C13.21 2.18969 10.8 2.24969 9.28999 3.41969L4.27999 7.32969C3.27999 8.10969 2.48999 9.70969 2.48999 10.9697V17.8697C2.48999 20.4197 4.55999 22.4997 7.10999 22.4997H17.89C20.44 22.4997 22.51 20.4297 22.51 17.8797V11.0997C22.51 9.74969 21.64 8.08969 20.54 7.31969ZM13.25 18.4997C13.25 18.9097 12.91 19.2497 12.5 19.2497C12.09 19.2497 11.75 18.9097 11.75 18.4997V15.4997C11.75 15.0897 12.09 14.7497 12.5 14.7497C12.91 14.7497 13.25 15.0897 13.25 15.4997V18.4997Z"
            fill="#0077B6"
        />
    </Svg>
);

export default ActiveHomeIcon;