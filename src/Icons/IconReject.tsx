import { CSSProperties } from "react";

export const IconReject = (props: {className: string; style?: CSSProperties;}) => {
    return (
      <svg className={props.className} style={props.style} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20.016q3.281 0 5.648-2.367t2.367-5.648q0-1.125-0.492-2.578t-1.195-2.344l-11.25 11.25q2.109 1.688 4.922 1.688zM3.984 12q0 1.125 0.492 2.578t1.195 2.344l11.25-11.25q-2.109-1.688-4.922-1.688-3.281 0-5.648 2.367t-2.367 5.648zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z" fill="currentColor"></path>
      </svg>
    );
};