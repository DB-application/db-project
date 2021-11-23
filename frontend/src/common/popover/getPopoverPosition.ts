type PopoverAlign = 'center' | 'left' | 'right'
type PopoverSide = 'top' | 'bottom' | 'left' | 'right'

type Position = {
    left: number,
    top: number,
}

function getPopoverPositionLeft(elementRect: DOMRect, popoverRect: DOMRect, align: PopoverAlign) {
    switch (align) {
        case "left":
            return {
                left: elementRect.left - popoverRect.width - 5,
                top: elementRect.top,
            }
        case "center":
            return {
                left: elementRect.left - popoverRect.width - 5,
                top: (elementRect.top + elementRect.bottom) / 2 - popoverRect.height / 2,
            }
        case "right":
            return {
                left: elementRect.left - popoverRect.width - 5,
                top: elementRect.bottom - popoverRect.height,
            }
    }
    throw new Error(`unknown align ${align}`)
}

function getPopoverPositionRight(elementRect: DOMRect, popoverRect: DOMRect, align: PopoverAlign) {
    switch (align) {
        case "left":
            return {
                left: elementRect.right + 5,
                top: elementRect.top,
            }
        case "center":
            return {
                left: elementRect.right + 5,
                top: (elementRect.top + elementRect.bottom) / 2 - popoverRect.height / 2,
            }
        case "right":
            return {
                left: elementRect.right + 5,
                top: elementRect.bottom - popoverRect.height,
            }
    }
    throw new Error(`unknown align ${align}`)
}

function getPopoverPositionBottom(elementRect: DOMRect, popoverRect: DOMRect, align: PopoverAlign) {
    switch (align) {
        case "left":
            return {
                left: elementRect.left + 5,
                top: elementRect.bottom + 5,
            }
        case "center":
            return {
                left: (elementRect.left + elementRect.right) / 2 - popoverRect.width / 2,
                top: elementRect.bottom + 5,
            }
        case "right":
            return {
                left: elementRect.right - 5 - popoverRect.width,
                top: elementRect.bottom + 5,
            }
    }
    throw new Error(`unknown align ${align}`)
}

function getPopoverPositionTop(elementRect: DOMRect, popoverRect: DOMRect, align: PopoverAlign) {
    switch (align) {
        case "left":
            return {
                left: elementRect.left + 5,
                top: elementRect.top - popoverRect.height - 5,
            }
        case "center":
            return {
                left: (elementRect.left + elementRect.right) / 2 - popoverRect.width / 2,
                top: elementRect.top - popoverRect.height - 5,
            }
        case "right":
            return {
                left: elementRect.right - 5 - popoverRect.width,
                top: elementRect.top - popoverRect.height - 5
            }
    }
    throw new Error(`unknown align ${align}`)
}

function getPopoverPosition(elementRect: DOMRect, popoverRect: DOMRect, side: PopoverSide, align: PopoverAlign): Position {
    switch (side) {
        case "bottom":
            return getPopoverPositionBottom(elementRect, popoverRect, align)
        case "top":
            return getPopoverPositionTop(elementRect, popoverRect, align)
        case "left":
            return getPopoverPositionLeft(elementRect, popoverRect, align)
        case "right":
            return getPopoverPositionRight(elementRect, popoverRect, align)
    }
    throw new Error(`unknown side ${side}`)
}

function invertPopoverSide(elementRect: DOMRect, popoverRect: DOMRect, positionInfo: {side: PopoverSide, align: PopoverAlign}) {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    switch (positionInfo.side) {
        case "bottom":
            if (elementRect.bottom + popoverRect.height + 5 >= windowHeight) {
                positionInfo.side = 'top'
            }
            break
        case 'top':
            if (elementRect.top - popoverRect.height - 5 <= 0) {
                positionInfo.side = 'bottom'
            }
            break
        case 'left':
            if (elementRect.left - popoverRect.width - 5 <= 0) {
                positionInfo.side = 'right'
            }
            break
        case 'right':
            if (elementRect.right + popoverRect.width + 5 >= windowWidth) {
                positionInfo.side = 'left'
            }
            break
    }
}

function checkScreenOverflowPosition(position: Position, popoverRect: DOMRect) {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    if (position.top < 0) {
        position.top = 5
    }
    if (position.top + popoverRect.height > windowHeight) {
        position.top = windowHeight - popoverRect.height - 5
    }
    if (position.left < 0) {
        position.left = 5
    }
    if (position.left + popoverRect.width > windowWidth) {
        position.left = windowWidth - popoverRect.width - 5
    }
}

export type {
    PopoverAlign,
    PopoverSide,
    Position,
}

export {
    getPopoverPosition,
    invertPopoverSide,
    checkScreenOverflowPosition,
}