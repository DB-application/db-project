import {useRef, useState} from "react";
import {SwitchButton} from "./SwitchButton";
import {LinkIcon} from "../../../../icons/LinkIcon";
import {PopoverPortal} from "../../../../core/portal/PopoverPortal";
import {Editor} from "@tiptap/react";
import styles from './UrlSwitch.module.css'
import {TextField} from "../../../../common/textfield/TextField";
import {Button_Text} from "../../../../common/button/Button_Text";

type SwitchButtonProps = {
    editor: Editor,
    className?: string,
}

type UrlPopoverProps = {
    setUrl: (url: string) => void,
}

function UrlPopover({setUrl}: UrlPopoverProps) {
    const [input, setInput] = useState('')
    return (
        <div className={styles.popoverContainer}>
            <TextField
                value={input}
                onChange={setInput}
            />
            <Button_Text
                text={'Применить'}
                onClick={() => setUrl(input)}
                style={"link"}
            />
        </div>
    )
}

function UrlSwitchButton({
    editor,
    className,
}: SwitchButtonProps) {
    const buttonRef = useRef<HTMLButtonElement|null>(null)
    const [show, setShow] = useState(false)
    const _setLink = (link: string) => {
        if (link === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            setShow(false)
            return
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: link }).run()
        setShow(false)
    }

    return (
        <>
            <SwitchButton
                ref={buttonRef}
                checked={editor.isActive('link')}
                onCheckedChange={() => setShow(true)}
                icon={<LinkIcon />}
                className={className}
            />
            <PopoverPortal
                elementRef={buttonRef}
                show={show}
                setShow={setShow}
                content={<UrlPopover
                    setUrl={_setLink}
                />}
            />
        </>
    )
}

export {
    UrlSwitchButton,
}