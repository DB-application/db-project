import {IconPropsType} from "./IconPropsType";


function CrossIcon(props?: IconPropsType) {
    return (
        <svg
            viewBox="0 0 21 21"
            {...props}
        >
            <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5.5 15.5l10-10M15.5 15.5l-10-10z" />
            </g>
        </svg>
    );
}

export {
    CrossIcon,
}