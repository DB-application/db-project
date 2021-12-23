import {IconPropsType} from "./IconPropsType";


function MoreAltIcon(props?: IconPropsType) {
    return (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M8 12a2 2 0 11-4 0 2 2 0 014 0zM14 12a2 2 0 11-4 0 2 2 0 014 0zM18 14a2 2 0 100-4 2 2 0 000 4z"
            />
        </svg>
    );
}

export {
    MoreAltIcon,
}