export default class Asset<T = unknown> {
    private readonly _content: T;

    public constructor(content: T) {
        this._content = content;
    }

    public get content(): T {
        return this._content;
    }
}
