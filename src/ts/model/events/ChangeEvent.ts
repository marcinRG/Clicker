export class ChangeEvent<E> {
    constructor(public propertyName: string, public value: E) {
    }
}
