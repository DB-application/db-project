import {NavLink} from 'react-router-dom'

type ComponentWithLinkProps = {
    component: JSX.Element,
    path: string,
    className?: string,
}


function ComponentWithLink({
    path,
    component,
    className,
}: ComponentWithLinkProps) {
    return (
        <NavLink tabIndex={-1} className={className} to={path}>
            {component}
        </NavLink>
    )
}

export {
    ComponentWithLink,
}