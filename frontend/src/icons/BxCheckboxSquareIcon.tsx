import {IconPropsType} from "./IconPropsType";

function BxCheckboxSquareIcon(props?: IconPropsType){
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <path d="M9 9h6v6H9z" />
            <path d="M19 17V7c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2zM7 7h10l.002 10H7V7z" />
        </svg>
    )
}

export {
    BxCheckboxSquareIcon,
}