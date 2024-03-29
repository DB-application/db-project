import styles from './TimePicker.module.css'
import {joinClassNames} from "../../core/styles/joinClassNames";
import {useCallback, useMemo, useRef, useState} from "react";
import {ButtonText} from "../button/ButtonText";
import {ListItemText} from "../list/item/ListItemText";
import {ListBase, ListItemProps} from "../list/ListBase";
import {PopoverPortal} from "../../core/portal/PopoverPortal";
import {getStylesWithMods} from "../../core/styles/getStylesWithMods";
import {serializeNumber} from './converters';
import {parsePickerValue, validTimePickerValue} from "./validation";
import {TextField} from "../textfield/TextField";
import {useEventHandler} from "../../core/hooks/useEventHandler";


type TimeType = {
    hours: number,
    minutes: number,
}

type TimePickerProps = {
    time: TimeType,
    onChange: (time: TimeType) => void,
    hoursStep?: number,
    minutesStep?: 5 | 10 | 15 | 30,
    className?: string,
    disabled?: boolean,
}

type TimePickerPopoverType = {
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
        createBindingFn: () => <ListItemText
            text={String(digit)}
            onClick={() => onSelect(digit)}
            className={getStylesWithMods(styles.listItem, {
                [styles.selectedItem]: selected === digit,
            })}
        />
    }))

    return (
        <ListBase
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
}: TimePickerPopoverType) {
    const popoverRef = useRef<HTMLDivElement|null>(null)
    const setHour = useCallback((hour: number) => {
        setCurrentTime({...currentTime, hours: hour})
    }, [setCurrentTime, currentTime])

    const setMinute = useCallback((minute: number) => {
        setCurrentTime({...currentTime, minutes: minute})
    }, [setCurrentTime, currentTime])

    const hours = useMemo(() => generateDigits(hoursStep, 24), [hoursStep])
    const minutes = useMemo(() => generateDigits(minutesStep, 60), [minutesStep])

    useEventHandler('mousedown', popoverRef, event => event.preventDefault())

    return(
        <div ref={popoverRef}>
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
                <ButtonText
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
                <ButtonText
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
        setPopoverOpened(false)
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
                    onChange={setInputValue}
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