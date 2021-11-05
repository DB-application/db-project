import {animateFlipOut} from "../../core/animation/flipOutAnimation";
import { animateFlipUp } from "../../core/animation/flipUpAnimation";

function popoverAppearAnimation(element: HTMLElement, time: number = 150) {
    return Promise.all([
        animateFlipUp(element, time)
    ])
}

function popoverHideAnimation(element: HTMLElement, time: number = 150) {
    return Promise.all([
        animateFlipOut(element, time)
    ])
}

export {
    popoverHideAnimation,
    popoverAppearAnimation,
}