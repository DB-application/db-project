import {IconPropsType} from "./IconPropsType";

function WarningCircleIcon(props?: IconPropsType){
    return (
        <svg
            viewBox="0 0 21 21"
            fill="currentColor"
            {...props}
        >
            <g fill="none" fillRule="evenodd">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.5 10.5 A8 8 0 0 1 10.5 18.5 A8 8 0 0 1 2.5 10.5 A8 8 0 0 1 18.5 10.5 z"
                />
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 11.5v-5"
                />
                <path
                    fill="currentColor"
                    d="M11.5 14.5 A1 1 0 0 1 10.5 15.5 A1 1 0 0 1 9.5 14.5 A1 1 0 0 1 11.5 14.5 z"
                />
            </g>
        </svg>
    );
}

export {
    WarningCircleIcon,
}