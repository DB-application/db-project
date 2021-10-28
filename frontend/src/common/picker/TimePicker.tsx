import styles from './TimePicker.module.css'
import {joinClassNames} from "../../core/styles/joinClassNames";
import {useCallback, useMemo, useRef, useState} from "react";
import {Button_Text} from "../button/Button_Text";
import {ListItem_Text} from "../list/item/ListItem_Text";
import {List_Base, ListItemProps} from "../list/List_Base";
import {PopoverPortal} from "../../core/portal/PopoverPortal";
import {getStylesWithMods} from "../../core/styles/getStylesWithMods";
import {serializeNumber} from './converters';
import {parsePickerValue, validTimePickerValue} from "./validation";
import {TextField} from "../textfield/TextField";


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
    disabled?: boolean,
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
    const setHour = useCallback((hour: number) => {
        setCurrentTime({...currentTime, hours: hour})
    }, [setCurrentTime, currentTime])

    const setMinute = useCallback((minute: number) => {
        setCurrentTime({...currentTime, minutes: minute})
    }, [setCurrentTime, currentTime])

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
                    spacing={false}
                    size={'small'}
                    style={'link'}
                />
                <Button_Text
                    text={'Ok'}
                    size={'small'}
                    onClick={onSubmit}
                    className={styles.submitButton}
                    spacing={false}
                    style={'primary'}
                />
            </div>
        </div>
    )
}

function getTimeString(time: TimeType) {
    return `${serializeNumber(time.hours)}:${serializeNumber(time.minutes)}`
}

function TimePicker({
    time,
    minutesStep,
    hoursStep,
    onChange,
    className,
    disabled = false,
}: TimePickerProps) {
    const ref = useRef<HTMLDivElement|null>(null)
    const [inputValue, setInputValue] = useState<string>(getTimeString(time))
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false)

    const onBlur = useCallback(inputValue => {
        const result = validTimePickerValue(inputValue)
        if (result) {
            setInputValue(inputValue)
            onChange(result)
        }
        else {
            setInputValue(getTimeString(time))
        }
    }, [onChange])

    const timePickerValue = useMemo(() => {
        const value = parsePickerValue(inputValue)
        return value || {hours: 0, minutes: 0}
    }, [inputValue])

    return (
        <div className={joinClassNames(styles.container, className)}>
            <div ref={ref}>
                <TextField
                    value={inputValue}
                    onFocus={() => setPopoverOpened(true)}
                    onChange={value => {
                        setInputValue(value)
                    }}
                    onBlur={onBlur}
                    disabled={disabled}
                    inputClassName={styles.input}
                />
            </div>

            <PopoverPortal
                content={<TimePickerPopover
                    onSubmit={() => setPopoverOpened(false)}
                    currentTime={timePickerValue}
                    setCurrentTime={currentTime => {
                        onChange(currentTime)
                        setInputValue(getTimeString(currentTime))
                    }}
                    hoursStep={hoursStep}
                    minutesStep={minutesStep}
                />}
                align={'center'}
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