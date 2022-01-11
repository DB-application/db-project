import {Editor, FloatingMenu} from '@tiptap/react'
import styles from './AddBlockPopover.module.css'
import {UnorderedListIcon} from "../../../../icons/UnorderedListIcon";
import {OrderedListIcon} from "../../../../icons/OrderedListIcon";
import {List_Base, ListItemProps} from "../../../../common/list/List_Base";
import {ListItem_IconAndText} from "../../../../common/list/item/ListItem_IconAndText";
import {ListCheckIcon} from "../../../../icons/ListCheckIcon";
import {CodeSlashIcon} from "../../../../icons/CodeSlashIcon";
import {FormatHeader1Icon} from "../../../../icons/FormatHeader1Icon";
import {FormatHeader2Icon} from "../../../../icons/FormatHeader2Icon";
import {DoubleQuotesLIcon} from "../../../../icons/DoubleQuotesLIcon";
import {TableIcon} from "../../../../icons/TableIcon";
import {ImageIcon} from "../../../../icons/ImageIcon";

type AddBlockPopoverProps = {
    editor: Editor,
}

function AddBlockPopover({
    editor,
}: AddBlockPopoverProps) {
    const addImage = () => {
        const url = window.prompt('URL')
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }


    const items: Array<ListItemProps> = [
        {
            id: 'head_1',
            createBindingFn: () => <ListItem_IconAndText
                icon={<FormatHeader1Icon />}
                text={'Заголовок 1'}
                onClick={() => editor.chain().focus().setHeading({level: 1}).run()}
                className={styles.item}
            />,
        },
        {
            id: 'head_2',
            createBindingFn: () => <ListItem_IconAndText
                icon={<FormatHeader2Icon />}
                text={'Заголовок 2'}
                onClick={() => editor.chain().focus().setHeading({level: 2}).run()}
                className={styles.item}
            />,
        },
        {
            id: 'bulleted_list',
            createBindingFn: () => <ListItem_IconAndText
                icon={<UnorderedListIcon/>}
                text={'Маркированный список'}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={styles.item}
            />,
        },
        {
            id: 'ordered_list',
            createBindingFn: () => <ListItem_IconAndText
                icon={<OrderedListIcon/>}
                text={'Нумерованный список'}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={styles.item}
            />,
        },
        {
            id: 'task_list',
            createBindingFn: () => <ListItem_IconAndText
                icon={<ListCheckIcon/>}
                text={'Список заданий'}
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={styles.item}
            />,
        },
        {
            id: 'code_block',
            createBindingFn: () => <ListItem_IconAndText
                icon={<CodeSlashIcon/>}
                text={'Блок кода'}
                onClick={() => editor.chain().focus().setCodeBlock().run()}
                className={styles.item}
            />,
        },
        {
            id: 'blockquote',
            createBindingFn: () => <ListItem_IconAndText
                icon={<DoubleQuotesLIcon/>}
                text={'Цитата'}
                onClick={() => editor.chain().focus().setBlockquote().run()}
                className={styles.item}
            />,
        },
        {
            id: 'image',
            createBindingFn: () => <ListItem_IconAndText
                icon={<ImageIcon />}
                text={'Картинка'}
                onClick={() => addImage()}
                className={styles.item}
            />
        },
        {
            id: 'table',
            createBindingFn: () => <ListItem_IconAndText
                icon={<TableIcon/>}
                text={'Таблица'}
                onClick={() => editor.chain().focus().insertTable().run()}
                className={styles.item}
            />,
        }
    ]

    return (
        <FloatingMenu
            editor={editor}
            tippyOptions={{
                duration: [200, 200],
                offset: [100, 35],
                animation: 'shift-away',
            }}
        >
            <div className={styles.container}>
                <List_Base
                    items={items}
                />
            </div>
        </FloatingMenu>
    )
}

export {
    AddBlockPopover,
}

export type {
    AddBlockPopoverProps,
}