import React from 'react';

type Props = {
    width?: string | number;
    height?: string | number;
    size?: string | number;
} & React.SVGProps<SVGSVGElement>;

function Cross({ width, height, size, ...props }: Props) {
    return (
        <svg
            width={size ?? width ?? 16}
            height={size ?? height ?? 16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                id="Vector"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00754 10.3539L12.7568 15.1032C13.9745 16.3209 15.8185 14.4594 14.6008 13.2417L9.85158 8.49249L14.6008 3.74325C15.8185 2.5255 13.9745 0.681472 12.7568 1.89922L8.00754 6.64846L3.2583 1.89922C2.04055 0.681472 0.179128 2.5255 1.39688 3.74325L6.14611 8.49249L1.39688 13.2417C0.179128 14.4594 2.04055 16.3209 3.2583 15.1032L8.00754 10.3539Z"
                fill="#161616"
            />
        </svg>
    );
}

export default Cross;
