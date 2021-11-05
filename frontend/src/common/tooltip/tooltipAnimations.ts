import {animateFlipOut} from "../../core/animation/flipOutAnimation";
import {animateFlipUp} from "../../core/animation/flipUpAnimation";


function tooltipAppearAnimation(element: HTMLElement, time: number = 100) {
    return Promise.all([
        animateFlipUp(element, time)
    ])
}

function tooltipHideAnimation(element: HTMLElement, time: number = 100) {
    return Promise.all([
        animateFlipOut(element, time),
    ])
}

export {
    tooltipHideAnimation,
    tooltipAppearAnimation,
}