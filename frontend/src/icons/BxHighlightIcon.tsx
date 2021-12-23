import {IconPropsType} from "./IconPropsType";


function BxHighlightIcon(props?: IconPropsType){
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <path d="M20.707 5.826l-3.535-3.533a.999.999 0 00-1.408-.006L7.096 10.82a1.01 1.01 0 00-.273.488l-1.024 4.437L4 18h2.828l1.142-1.129 3.588-.828c.18-.042.345-.133.477-.262l8.667-8.535a1 1 0 00.005-1.42zm-9.369 7.833l-2.121-2.12 7.243-7.131 2.12 2.12-7.242 7.131zM4 20h16v2H4z" />
        </svg>
    );
}

export {
    BxHighlightIcon,
}