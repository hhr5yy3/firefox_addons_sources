import React from 'react';

type Props = {
    width?: string | number;
    height?: string | number;
    size?: string | number;
    initialFill?: string;
} & React.SVGProps<SVGSVGElement>;

function Bookmark({ width, height, size, initialFill, ...props }: Props) {
    const [fill, setFill] = React.useState(initialFill ?? '#161616');
    return (
        <svg
            width={size ?? width ?? 20}
            height={size ?? height ?? 22}
            viewBox="0 0 20 20"
            fill="none"
            stroke="black"
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setFill('#161616')}
            onMouseLeave={() => setFill(initialFill ?? '#161616')}
            {...props}
        >
            <path
                d="M3.82343 2.66828C4.04262 1.1139 5.38222 -2.07101e-06 6.91981 0L12.974 2.10867e-05C14.4122 2.76763e-05 15.7152 0.981308 16.0106 2.44845C16.7773 6.25725 16.8658 10.2475 16.1276 17.9992L15.9416 19.952L9.90383 15.0646L4.27976 20L4.03245 18.0306C3.14998 11.0035 3.20477 7.05566 3.82343 2.66828Z"
                fill={fill ?? '#161616'}
            />
        </svg>
    );
}

export default Bookmark;
