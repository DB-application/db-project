import {animateFlipOut} from "../../core/animation/flipOutAnimation";
import {animateFlipUp} from "../../core/animation/flipUpAnimation";


function tooltipAppearAnimation(element: HTMLElement, time: number = 100) {
    return Promise.all([
        animateFlipUp(element, 5, time)
    ])
}

function tooltipHideAnimation(element: HTMLElement, time: number = 100) {
    return Promise.all([
        animateFlipOut(element, 5, time),
    ])
}

export {
    tooltipHideAnimation,
    tooltipAppearAnimation,
}