import { CSSProperties } from "react";

export const IconStream = (props: {className: string; style?: CSSProperties;}) => {
    return (
        <svg className={props.className} style={props.style} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 3H21C22.1 3 23 3.9 23 5V19C23 20.1 22.1 21 21 21H14V19H21V5H3V8H1V5C1 3.9 1.9 3 3 3ZM1 21V18C2.66 18 4 19.34 4 21H1ZM1 14V16C3.76 16 6 18.24 6 21H8C8 17.13 4.87 14 1 14ZM1 12V10C7.07 10 12 14.92 12 21H10C10 16.03 5.97 12 1 12Z" fill="currentColor" />
        </svg>
    );
};
