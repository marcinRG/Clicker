export function addTextToChild(className: string, textToAdd: string, elem: HTMLElement) {
    if (elem) {
        const child = elem.querySelector(className);
        if (child) {
            child.textContent = textToAdd;
        }
    }
}

export function toggleDisability(elem: HTMLElement, toggle: boolean) {
    if (elem.hasAttribute('disabled') && toggle) {
        elem.removeAttribute('disabled');
    }
    if (!elem.removeAttribute('disabled') && !toggle) {
        elem.setAttribute('disabled', '');
    }
}

export function toggleVisibility(elem: HTMLElement, toggle: boolean) {
    if (toggle) {
        elem.style.display = 'none';
    } else {
        elem.style.display = '';
    }
}

export function createGeneratorElem(name: string, price: number, amount: number, className: string): HTMLElement {
    const div = document.createElement('div');
    div.classList.add('generator', className);
    div.appendChild(createSpan('name'));
    div.appendChild(createSpan('price'));
    div.appendChild(createSpan('quantity'));
    addTextToChild('.name', name, div);
    addTextToChild('.price', price + '', div);
    addTextToChild('.quantity', amount + '', div);
    toggleDisability(div, false);
    toggleVisibility(div, true);
    return div;
}

export function createSpan(name: string) {
    const span = document.createElement('span');
    span.classList.add(name);
    return span;
}
