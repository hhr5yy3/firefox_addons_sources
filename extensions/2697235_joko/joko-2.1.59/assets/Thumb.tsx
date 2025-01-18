import React from 'react';

type Props = {
    width?: string | number;
    height?: string | number;
    fill?: string;
} & React.SVGProps<SVGSVGElement>;

function Thumb({ width, height, fill, ...props }: Props) {
    return (
        <svg
            width={width ?? '20'}
            height={height ?? '21'}
            viewBox="0 0 20 21"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                id="Vector"
                d="M9.44737 3.35373C9.0657 3.35374 8.70817 3.54044 8.49006 3.85365L4.96349 8.9179C4.30126 9.86888 4.0061 11.0276 4.13269 12.1795L4.40387 14.6474C4.51976 15.702 5.34765 16.5373 6.40115 16.6626L8.16536 16.8725C9.51258 17.0327 10.8786 16.8938 12.1659 16.4656C13.067 16.1659 13.7888 15.482 14.1365 14.5983L15.5604 10.9799C15.6292 10.8049 15.6768 10.6222 15.7021 10.4358C15.9224 8.81319 14.4562 7.46891 12.8587 7.82887L9.61048 8.5608L10.577 4.81152C10.7674 4.07318 10.2098 3.35372 9.44737 3.35373Z"
                fill={fill ?? 'black'}
            />
        </svg>
    );
}

export default Thumb;
