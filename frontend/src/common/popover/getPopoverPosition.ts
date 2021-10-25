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
                top: (elementRect.top + elementRect.top) / 2 - popoverRect.width / 2,
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
                top: (elementRect.top + elementRect.top) / 2 - popoverRect.width / 2,
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

function invertPopoverSide() {

}

export type {
    PopoverAlign,
    PopoverSide,
    Position,
}

export {
    getPopoverPosition,
}