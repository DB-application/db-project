import styles from './TimePicker.module.css'
import {joinClassNames} from "../../core/styles/joinClassNames";
import {useMemo, useRef, useState} from "react";
import {Button_Text} from "../button/Button_Text";
import {ListItem_Text} from "../list/item/ListItem_Text";
import {List_Base, ListItemProps} from "../list/List_Base";
import {useEventHandler} from "../../core/hooks/useEventHandler";
import {PopoverPortal} from "../../core/portal/PopoverPortal";
import {getStylesWithMods} from "../../core/styles/getStylesWithMods";
import {serializeNumber} from './converters';


type TimeType = {
    hours: number,
    minutes: number,
}

type TimePickerProps = {
    time: TimeType
    onChange: (time: TimeType) => void,
    hoursStep?: number,
    minutesStep?: 5 | 10 | 15 | 30,
    className?: string,
}

type TimePickerPopover = {
    onSubmit: () => void,
    currentTime: TimeType,
    setCurrentTime: (time: TimeType) => void,
    hoursStep?: number,
    minutesStep?: number,
}

type TimePickerListProps = {
    digits: Array<number>,
    onSelect: (value: number) => void,
    selected: number,
}

function generateDigits(step: number, digitsCount: number) {
    const digits = []
    for (let i = 0; i < digitsCount; i += step) {
        digits.push(i)
    }
    return digits
}

function TimePickerList({
    digits,
    onSelect,
    selected,
}: TimePickerListProps) {
    const items: Array<ListItemProps> = digits.map(digit => ({
        id: String(digit),
        createBindingFn: () => <ListItem_Text
            text={String(digit)}
            onClick={() => onSelect(digit)}
            className={getStylesWithMods(styles.listItem, {
                [styles.selectedItem]: selected === digit,
            })}
        />
    }))

    return (
        <List_Base
            items={items}
            className={styles.timeList}
        />
    )
}

function TimePickerPopover({
    onSubmit,
    currentTime,
    setCurrentTime,
    minutesStep = 1,
    hoursStep = 1,
}: TimePickerPopover) {
    const setHour = (hour: number) => {
        setCurrentTime({...currentTime, hours: hour})
    }
    const setMinute = (minute: number) => {
        setCurrentTime({...currentTime, minutes: minute})
    }

    const hours = useMemo(() => generateDigits(hoursStep, 24), [hoursStep])
    const minutes = useMemo(() => generateDigits(minutesStep, 60), [minutesStep])

    return(
        <div>
            <div className={styles.timeListsContainer}>
                <TimePickerList
                    onSelect={setHour}
                    digits={hours}
                    selected={currentTime.hours}
                />
                <TimePickerList
                    onSelect={setMinute}
                    digits={minutes}
                    selected={currentTime.minutes}
                />
            </div>
            <div className={styles.bottomPanel}>
                <Button_Text
                    text={'Now'}
                    onClick={() => {
                        const now = new Date()
                        setCurrentTime({
                            hours: now.getHours(),
                            minutes: now.getMinutes(),
                        })
                    }}
                    size={'small'}
                />
                <Button_Text
                    text={'Ok'}
                    size={'small'}
                    onClick={onSubmit}
                    className={styles.submitButton}
                />
            </div>
        </div>
    )
}

function TimePicker({
    time,
    minutesStep,
    hoursStep,
    onChange,
    className,
}: TimePickerProps) {
    const ref = useRef<HTMLInputElement|null>(null)
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false)

    useEventHandler('click', ref, () => {
        setPopoverOpened(true)
    })

    const getTimeString = () => {
        return `${serializeNumber(time.hours)}:${serializeNumber(time.minutes)}`
    }

    return (
        <div className={joinClassNames(styles.container, className)}>
            <input
                ref={ref}
                type={'text'}
                value={getTimeString()}
                defaultValue={getTimeString()}
                className={styles.input}
            />

            <PopoverPortal
                content={<TimePickerPopover
                    onSubmit={() => setPopoverOpened(false)}
                    currentTime={time}
                    setCurrentTime={onChange}
                    hoursStep={hoursStep}
                    minutesStep={minutesStep}
                />}
                align={'center'}
                side={'top'}
                show={popoverOpened}
                setShow={setPopoverOpened}
                elementRef={ref}
            />
        </div>
    )
}

export type {
    TimeType,
}

export {
    TimePicker,
}