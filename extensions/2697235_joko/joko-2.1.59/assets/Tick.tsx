import React from 'react';

type Props = {
    width?: string | number;
    height?: string | number;
    size?: string | number;
    fill?: string;
} & React.SVGProps<SVGSVGElement>;

function Tick({ width, height, size, fill, ...props }: Props) {
    return (
        <svg
            width={size ?? width ?? 16}
            height={size ?? height ?? 16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g id="tick">
                <path
                    id="Vector"
                    d="M4.14983 7.22249C3.67511 6.74509 2.88595 6.72644 2.3872 7.18084C1.88844 7.63523 1.86895 8.3906 2.34368 8.868L6.08393 12.6294C6.55452 13.1026 7.33519 13.1257 7.83537 12.6811L13.6016 6.06787C14.1062 5.6194 14.1354 4.86431 13.6669 4.38134C13.1983 3.89838 12.4095 3.87041 11.9049 4.31888L7.32145 8.67049C7.15704 8.82659 6.90222 8.85436 6.70534 8.73764L4.14983 7.22249Z"
                    fill={fill ?? 'white'}
                />
            </g>
        </svg>
    );
}

export default Tick;
