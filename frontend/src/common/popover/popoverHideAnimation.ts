import {animateFlipOut} from "../../core/animation/flipOutAnimation";
import { animateFlipUp } from "../../core/animation/flipUpAnimation";

function popoverAppearAnimation(element: HTMLElement, time: number = 100) {
    return Promise.all([
        animateFlipUp(element, 5, time)
    ])
}

function popoverHideAnimation(element: HTMLElement, time: number = 100) {
    return Promise.all([
        animateFlipOut(element, 5, time)
    ])
}

export {
    popoverHideAnimation,
    popoverAppearAnimation,
}