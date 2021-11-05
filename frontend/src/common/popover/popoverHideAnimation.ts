import {animateFlipOut} from "../../core/animation/flipOutAnimation";


function popoverHideAnimation(element: HTMLElement, time: number = 150) {
    return Promise.all([
        animateFlipOut(element, time)
    ])
}

export {
    popoverHideAnimation,
}