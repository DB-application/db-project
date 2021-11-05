import {animate, createAnimation} from "./animation";


function createFlipUpAnimation(element: HTMLElement, time: number = 150) {
    const startTop = element.getBoundingClientRect().top
    return createAnimation({
        opacity: [1, 0],
        top: [startTop + 20, startTop],
    }, time)
}

function animateFlipUp(element: HTMLElement, time: number = 150) {
    const animation = createFlipUpAnimation(element, time)
    return Promise.all([
        animate(element, animation)
    ])
}

export {
    animateFlipUp,
    createFlipUpAnimation,
}