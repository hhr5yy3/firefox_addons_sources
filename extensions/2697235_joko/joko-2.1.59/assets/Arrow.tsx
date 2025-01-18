import React from 'react';

type Props = {
    width?: string | number;
    height?: string | number;
    fill?: string;
} & React.SVGProps<SVGSVGElement>;

function Arrow({ width, height, fill, ...props }: Props) {
    return (
        <svg
            width={width ?? '11'}
            height={height ?? '11'}
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                id="Icon"
                d="M2.83101 4.56179C2.60571 4.7871 2.24042 4.7871 2.01512 4.56179C1.78982 4.33649 1.78982 3.9712 2.01512 3.7459L5.09205 0.668977C5.31735 0.443674 5.68264 0.443674 5.90794 0.668977L8.98486 3.7459C9.21017 3.9712 9.21017 4.33649 8.98486 4.56179C8.75956 4.7871 8.39427 4.7871 8.16897 4.56179L6.07692 2.46974L6.07691 9.92308C6.07691 10.2417 5.81862 10.5 5.49999 10.5C5.18137 10.5 4.92307 10.2417 4.92307 9.92308L4.92307 2.46974L2.83101 4.56179Z"
                fill={fill ?? 'white'}
            />
        </svg>
    );
}

export default Arrow;
