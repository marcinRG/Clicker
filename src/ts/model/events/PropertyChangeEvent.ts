export class PropertyChangeEvent<E> {
    constructor(public propertyName: string, public value: E) {
    }
}
