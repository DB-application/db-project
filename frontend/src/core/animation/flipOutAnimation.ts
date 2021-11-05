import {animate, createAnimation} from "./animation";


function createFlipOutAnimation(element: HTMLElement, time: number = 150) {
    const startTop = element.getBoundingClientRect().top
    return createAnimation({
        opacity: [1, 0],
        top: [startTop, startTop + 20],
    }, time)
}

function animateFlipOut(element: HTMLElement, time: number = 150) {
    const animation = createFlipOutAnimation(element, time)
    return Promise.all([
        animate(element, animation)
    ])
}

export {
    createFlipOutAnimation,
    animateFlipOut,
}