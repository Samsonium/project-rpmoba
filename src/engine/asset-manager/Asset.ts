export default class Asset {
    private readonly _content: any;

    public constructor(content: any) {
        this._content = content;
    }

    public get content(): any {
        return this._content;
    }
}
