import {IconPropsType} from "./IconPropsType";


function BxAlignJustifyIcon(props?: IconPropsType) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <path d="M4 7h16v2H4zm0-4h16v2H4zm0 8h16v2H4zm0 4h16v2H4zm2 4h12v2H6z" />
        </svg>
    );
}

export {
    BxAlignJustifyIcon,
}