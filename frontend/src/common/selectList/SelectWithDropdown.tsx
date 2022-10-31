import {PopoverPortal} from "../../core/portal/PopoverPortal";
import {ListItemTextProps} from "../list/item/ListItemText";
import {ListBase, ListItemProps} from "../list/ListBase";
import {BxCheckIcon} from "../../icons/BxCheckIcon";
import {ListItemBase} from "../list/item/ListItemBase";
import {useRef, useState} from "react";
import {verify} from "../../core/verify";
import {joinClassNames} from "../../core/styles/joinClassNames";
import styles from './SelectWithDropdown.module.css'
import {ButtonTextAndIcon} from "../button/ButtonTextAndIcon";
import {AngleDownIcon} from "../../icons/AngleDown";

type SelectListItemProps = ListItemTextProps & {
    id: string,
}

type SelectListProps = {
    items: Array<SelectListItemProps>,
    selected: string,
    className?: string,
}

function SelectWithDropdown({
    items,
    selected,
    className,
}: SelectListProps) {
    const buttonRef = useRef<HTMLDivElement|null>(null)
    const [popoverOpened, setPopoverOpened] = useState(false)

    const remappedItems: Array<ListItemProps|null> = items.map(item => {
        const rightIcon = item.id === selected
            ? <BxCheckIcon/>
            : undefined
        return {
            id: item.id,
            createBindingFn: () => <ListItemBase
                text={item.text}
                tooltipText={item.tooltipText}
                className={joinClassNames(item.className, styles.item)}
                onClick={() => {
                    item.onClick && item.onClick()
                    setPopoverOpened(false)
                }}
                iconRight={rightIcon}
            />
        }
    })

    return (
        <>
            <div ref={buttonRef} className={styles.selectButton}>
                <ButtonTextAndIcon
                    text={verify(items.find(item => item.id === selected)).text}
                    onClick={() => setPopoverOpened(true)}
                    size={'small'}
                    style={'secondary'}
                    className={className}
                    icon={<AngleDownIcon />}
                />
            </div>
            <PopoverPortal
                elementRef={buttonRef}
                show={popoverOpened}
                setShow={setPopoverOpened}
                content={<ListBase
                    items={remappedItems}
                />}
                align={'left'}
            />
        </>

    )
}

export type {
    SelectListProps,
    SelectListItemProps,
}

export {
    SelectWithDropdown,
}