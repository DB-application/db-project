import {PopoverPortal} from "../../core/portal/PopoverPortal";
import {ListItem_TextProps} from "../list/item/ListItem_Text";
import {List_Base, ListItemProps} from "../list/List_Base";
import {BxCheckIcon} from "../../icons/BxCheckIcon";
import {ListItem_Base} from "../list/item/ListItem_Base";
import {useRef, useState} from "react";
import {Button_Text} from "../button/Button_Text";
import {verify} from "../../core/verify";
import {joinClassNames} from "../../core/styles/joinClassNames";
import styles from './SelectWithDropdown.module.css'
import {Button_TextAndIcon} from "../button/Button_TextAndIcon";
import {AngleDownIcon} from "../../icons/AngleDown";

type SelectListItemProps = ListItem_TextProps & {
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
            createBindingFn: () => <ListItem_Base
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
                <Button_TextAndIcon
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
                content={<List_Base
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