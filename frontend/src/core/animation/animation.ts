const FRAME_TIME = 1000 / 120

type Reducer = [number, number]

type Reducers = {
    top?: Reducer,
    opacity?: Reducer,
    transform?: [Reducer, Reducer],
}

type AnimationReducer = {
    startValue: number,
    delta: number,
}

type Animation = {
    top: AnimationReducer|null,
    opacity: AnimationReducer|null,
    transform: [AnimationReducer, AnimationReducer]|null,
    time: number,
}

function createAnimation(reducers: Reducers, time: number = 150): Animation {
    const topReducer = reducers.top
    const opacityReducer = reducers.opacity
    const transformReducer = reducers.transform

    const iterationsCount = time / FRAME_TIME

    const createAnimationByReducer = (reducer: Reducer) => {
        return {
            delta: (reducer[1] - reducer[0]) / iterationsCount,
            startValue: reducer[0],
        }
    }

    return {
        top: topReducer
            ? createAnimationByReducer(topReducer)
            : null,
        opacity: opacityReducer
            ? createAnimationByReducer(opacityReducer)
            : null,
        transform: transformReducer
            ? [createAnimationByReducer(transformReducer[0]), createAnimationByReducer(transformReducer[1])]
            : null,
        time,
    }
}

async function animate(element: HTMLElement, animation: Animation) {
    const setTopCssValue = (top: number) => {
        element.style.top = `${top}px`
    }
    const setOpacityCssValue = (opacity: number) => {
        element.style.opacity = `${opacity}`
    }
    const setTransformCssValue = (x: number, y: number) => {
        element.style.transform = `translate(${x}px, ${y}px)`
    }
    animation.opacity && setOpacityCssValue(animation.opacity.startValue)
    animation.top && setOpacityCssValue(animation.top.startValue)
    animation.transform && setTransformCssValue(animation.transform[0].startValue, animation.transform[1].startValue)

    const animateValue = ({startValue, delta}: AnimationReducer, setter: (value: number) => void) => {
        let currentValue = startValue + delta
        return setInterval(() => {
            setter(currentValue)
            currentValue += delta
        }, FRAME_TIME);
    }
    const animateTransform = (reducerX: AnimationReducer, reducerY: AnimationReducer) => {
        let currentX = reducerX.startValue + reducerX.delta
        let currentY = reducerY.startValue + reducerY.delta
        return setInterval(() => {
            setTransformCssValue(currentX, currentY)
            currentX += reducerX.delta
            currentY += reducerY.delta
        }, FRAME_TIME);
    }

    return new Promise((resolve) => {
        const timers = [
            animation.top && animateValue(animation.top, setTopCssValue),
            animation.opacity && animateValue(animation.opacity, setOpacityCssValue),
            animation.transform && animateTransform(animation.transform[0], animation.transform[1]),
        ]

        setTimeout(() => {
            timers.forEach(timerId => timerId && clearInterval(timerId))
            resolve(undefined)
        }, animation.time);
    })
}

export {
    createAnimation,
    animate,
    FRAME_TIME,
}

export type {
    Reducer,
    AnimationReducer,
    Animation,
    Reducers,
}