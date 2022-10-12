import { CSSProperties } from "react";

export const IconThumbsUp = (props: {className: string; style?: CSSProperties;}) => {
  return (
    <svg className={props.className} style={props.style} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <path d="M13.648 7.362c-0.133-0.355 3.539-3.634 1.398-6.291-0.501-0.621-2.201 2.975-4.615 4.603-1.332 0.898-4.431 2.81-4.431 3.867v6.842c0 1.271 4.914 2.617 8.648 2.617 1.369 0 3.352-8.576 3.352-9.938 0-1.368-4.221-1.344-4.352-1.7zM5 7.457c-0.658 0-3 0.4-3 3.123v4.848c0 2.721 2.342 3.021 3 3.021 0.657 0-1-0.572-1-2.26v-6.373c0-1.768 1.657-2.359 1-2.359z" fill="currentColor"></path>
    </svg>
  );
};