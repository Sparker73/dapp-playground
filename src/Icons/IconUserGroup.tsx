import { CSSProperties } from "react";

export const IconUserGroup = (props: {className: string; style?: CSSProperties;}) => {
    return (
        <svg className={props.className} style={props.style} width="24" height="24" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M79.81 14.045c-7.878 2.25-15.263 8.464-18.738 15.752-2.35 4.893-3.033 7.926-3.033 13.307 0 7.926 2.885 14.92 8.561 20.694l3.475 3.474-2.054 1.125c-1.173.587-3.523 2.299-5.331 3.768l-3.278 2.691-3.475-.88c-4.403-1.076-11.691-1.076-16.242 0-11.45 2.74-20.791 11.253-25.097 22.896-1.222 3.326-1.322 4.158-1.322 11.153s.097 7.877 1.322 11.153c2.347 6.556 6.36 12.133 11.888 16.684 1.32 1.125 1.76 1.711 1.272 1.86-.341.147-2.591 1.566-4.94 3.13-9.149 6.114-15.657 15.262-18.69 26.418-1.076 3.913-1.125 4.941-1.125 19.814 0 18.005-.293 16.78 4.648 19.275 11.153 5.625 33.807 8.171 54.842 6.115 6.36-.635 12.378-1.712 19.128-3.423l1.321-.342.148 11.985.148 11.987 1.222 1.37c2.74 2.984 12.084 6.163 22.993 7.877 8.12 1.27 32.974 1.27 41.094 0 10.911-1.711 20.255-4.893 22.993-7.877l1.222-1.37.148-11.987.145-11.985 1.321.342c6.75 1.711 12.768 2.788 19.13 3.423 21.036 2.054 43.69-.49 54.843-6.115 4.94-2.495 4.648-1.27 4.648-19.275 0-14.873-.049-15.9-1.125-19.814-3.034-11.153-9.541-20.304-18.69-26.419-2.346-1.563-4.599-2.984-4.94-3.13-.49-.148-.05-.734 1.272-1.86 5.528-4.55 9.541-10.127 11.888-16.683 1.222-3.278 1.322-4.158 1.322-11.153s-.097-7.827-1.322-11.153c-4.306-11.643-13.648-20.156-25.097-22.896-4.793-1.125-12.67-1.028-17.122.245l-3.424.98-1.467-1.37c-2.056-1.908-7.436-5.822-8.561-6.164-.783-.244-.39-.783 2.398-3.571 11.888-11.936 11.936-30.283.048-42.171-6.114-6.163-12.523-8.806-21.135-8.806-5.283 0-8.903.831-13.258 2.984-7.68 3.865-13.55 11.057-15.803 19.373-.98 3.668-.98 11.301 0 14.921 1.321 4.793 3.913 9.344 7.633 13.21 1.86 1.956 3.278 3.62 3.033 3.716-.98.293-6.508 4.207-8.562 6.018-5.038 4.403-9.734 12.036-11.398 18.444-.49 1.957-1.028 3.523-1.173 3.523-.145 0-.635-1.467-1.125-3.278-2.691-10.225-9.638-18.786-20.255-24.852-.049 0 1.37-1.567 3.18-3.475 3.67-3.816 6.458-8.61 7.634-13.21.98-3.815 1.028-11.349.048-15.017-2.691-10.321-11.301-18.934-21.625-21.625-3.819-.982-11.793-.883-15.561.194ZM96.1 24.856c4.404 2.005 7.827 5.48 9.98 10.028 1.467 3.13 1.615 3.816 1.615 8.072 0 4.206-.148 4.94-1.566 7.926-6.164 13.012-22.26 16.046-32.24 6.066-7.73-7.778-7.926-19.666-.39-27.691 2.298-2.447 6.653-5.039 9.785-5.87 3.572-.88 9.1-.243 12.817 1.469Zm79.108-.097c6.115 2.888 10.321 8.316 11.546 14.921 2.398 13.061-9.834 25.294-22.896 22.896-13.699-2.544-20.841-17.416-14.137-29.452 1.467-2.543 5.137-6.212 7.829-7.73 5.183-2.936 12.178-3.18 17.658-.635ZM95.71 74.022c12.378 3.278 21.184 14.138 22.161 27.299l.196 2.788-5.137 2.495c-4.452 2.153-5.676 3.033-9.345 6.701-6.36 6.409-9.247 12.182-10.273 20.694-1.518 12.036 3.475 24.02 13.21 31.75l2.298 1.812-2.054.98c-2.984 1.466-9.734 6.7-11.936 9.244l-1.908 2.253-.293-5.09c-.342-5.43-.929-8.17-3.034-13.648-2.984-7.826-11.007-17.17-18.395-21.525-2.005-1.125-3.72-2.153-3.816-2.25-.148-.097.293-.538.98-.977 2.591-1.811 6.456-5.87 8.512-8.903 4.11-6.263 5.87-12.085 5.87-19.618 0-6.456-.684-9.196-3.768-15.607-2.054-4.258-3.033-5.676-6.212-8.855l-3.768-3.767 2.202-1.516c3.181-2.104 6.018-3.423 9.003-4.257 3.375-.883 12.081-.932 15.507-.003Zm78.911 0c3.181.832 6.995 2.643 9.931 4.745l1.957 1.418-3.523 3.62c-2.888 2.936-4.013 4.549-6.018 8.658-3.033 6.36-3.717 9.148-3.717 15.557 0 7.533 1.76 13.354 5.87 19.617 2.054 3.033 5.919 7.094 8.513 8.903.684.441 1.125.88.977.977-.097.097-1.811 1.125-3.816 2.25-7.388 4.355-15.411 13.7-18.396 21.526-2.104 5.48-2.691 8.22-3.033 13.648l-.29 5.097-1.909-2.25c-2.201-2.544-8.951-7.778-11.936-9.245l-2.054-.98 2.299-1.811c9.735-7.73 14.727-19.717 13.209-31.75-1.028-8.513-3.913-14.286-10.225-20.597-4.206-4.207-7.778-6.508-12.867-8.317l-2.543-.928.148-2.837c.196-4.451 1.028-7.388 3.178-11.888 3.572-7.387 10.618-13.16 18.69-15.41 3.374-.883 12.083-.932 15.555-.003ZM53.784 83.808c8.954 2.298 15.9 9.148 18.2 17.905.928 3.375.928 9.248 0 12.623-2.35 8.903-9.98 16.29-18.738 18.102-13.406 2.786-26.567-5.48-29.697-18.592-3.668-15.607 8.023-30.576 23.972-30.722 1.908-.05 4.745.293 6.263.684Zm160.513.048c8.904 2.299 16.046 9.49 18.151 18.347 4.844 20.646-16.29 37.424-35.47 28.179-4.012-1.957-9.099-6.947-10.959-10.714-4.941-10.077-3.23-21.281 4.355-29.06 6.214-6.361 15.41-8.953 23.923-6.752Zm-82.385 29.549c9.296 1.467 17.612 8.903 20.156 18.053 3.18 11.546-2.299 23.63-13.21 29.06l-4.158 2.053h-13.403l-4.158-2.054c-18.64-9.247-18.737-35.566-.145-44.714 5.329-2.592 9.341-3.23 14.918-2.398ZM55.348 143.98c1.908.39 5.528 1.76 8.023 2.985 3.816 1.908 5.383 3.033 8.903 6.508 4.893 4.842 7.633 9.393 9.344 15.46 1.028 3.619 1.077 4.892 1.125 16.39v12.474l-2.691 1.077c-6.605 2.591-18.54 4.158-32.288 4.158-13.748 0-25-1.518-32.534-4.355l-2.446-.928.048-11.692c0-13.844.539-17.122 3.962-23.775 7.194-14.092 22.95-21.58 38.554-18.302Zm160.368.049c10.127 2.298 18.737 9.003 23.482 18.247 3.424 6.654 3.962 9.932 3.962 23.776l.048 11.691-2.446.929c-7.533 2.837-18.786 4.355-32.533 4.355-13.748 0-25.684-1.567-32.289-4.159l-2.691-1.076v-12.475c.048-11.497.097-12.768 1.125-16.39 1.712-6.066 4.451-10.617 9.344-15.46 6.898-6.849 14.628-10.078 24.169-10.175 2.35-.044 5.872.298 7.829.737Zm-78.176 30.577c12.035 3.719 20.79 12.525 24.216 24.413.929 3.179 1.125 5.283 1.322 16.194l.245 12.525-1.908.784c-15.608 6.214-51.223 6.214-66.83 0l-1.908-.784.245-12.525c.196-10.91.39-13.013 1.321-16.194 3.817-13.21 14.676-22.992 28.279-25.439 3.665-.686 11.153-.196 15.018 1.026Z" fill="currentColor" />
        </svg>
    );
};
