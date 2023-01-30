import { observeResize } from './observeResize';
/**
 * Detects whether an element's content has horizontal overflow
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */

export function onResizeElement(node) {
	const handleResize = (event) => {
		console.log(event.target);
	};

	node.addEventListener('resized', handleResize, true);

	return {
		destroy() {
			node.removeEventListener('resized', handleResize, true);
		}
	};
}

/**
 * Detects whether an element's content has horizontal overflow
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
export function hasHorizontalOverflow(element: HTMLElement): boolean {
	return element.clientWidth < element.scrollWidth;
}

/**
 * Detects whether an element's content has vertical overflow
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
export function hasVerticalOverflow(element: HTMLElement): boolean {
	return element.clientHeight < element.scrollHeight;
}

/**
 * Detects whether an element's content has overflow in any direction
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
export function hasOverflow(element: HTMLElement): boolean {
	return hasHorizontalOverflow(element) || hasVerticalOverflow(element);
}
