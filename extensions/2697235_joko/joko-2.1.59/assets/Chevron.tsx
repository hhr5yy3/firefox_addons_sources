import React from 'react';

type Props = {
    width?: string | number;
    height?: string | number;
    size?: string | number;
} & React.SVGProps<SVGSVGElement>;

function Chevron({ width, height, size, ...props }: Props) {
    return (
        <svg
            width={size ?? width ?? '1rem'}
            height={size ?? height ?? '1rem'}
            viewBox="0 0 7 10"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                xmlns="http://www.w3.org/2000/svg"
                d="M1 8.82501L5.24994 5.00007L1 1.17512"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default Chevron;
