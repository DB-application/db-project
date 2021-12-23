import {IconPropsType} from "./IconPropsType";

function FormatHeader1Icon(props?: IconPropsType) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <path d="M3 4h2v6h4V4h2v14H9v-6H5v6H3V4m11 14v-2h2V6.31l-2.5 1.44V5.44L16 4h2v12h2v2h-6z" />
        </svg>
    );
}

export {
    FormatHeader1Icon,
}