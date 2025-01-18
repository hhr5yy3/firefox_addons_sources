import React from 'react';

type Props = {
    width?: string | number;
    height?: string | number;
    size?: string | number;
} & React.SVGProps<SVGSVGElement>;

function InfoCircle({ width, height, size, ...props }: Props) {
    return (
        <svg
            width={size ?? width ?? '1rem'}
            height={size ?? height ?? '1rem'}
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                id="Vector"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.62024 3.91429C9.62024 4.41923 9.2109 4.82857 8.70596 4.82857C8.20101 4.82857 7.79167 4.41923 7.79167 3.91429C7.79167 3.40934 8.20101 3 8.70596 3C9.2109 3 9.62024 3.40934 9.62024 3.91429ZM8.70596 6.42857C9.08467 6.42857 9.39167 6.73558 9.39167 7.11429V9.4V11.6857C9.39167 12.0644 9.08467 12.3714 8.70596 12.3714C8.32725 12.3714 8.02024 12.0644 8.02024 11.6857V7.11429C8.02024 6.73558 8.32725 6.42857 8.70596 6.42857Z"
                fill="#161616"
            />
            <circle id="Ellipse 1" cx="8.79167" cy="8" r="7.5" stroke="#161616" />
        </svg>
    );
}

export default InfoCircle;
