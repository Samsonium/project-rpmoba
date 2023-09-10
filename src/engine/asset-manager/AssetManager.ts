import Asset from './Asset.ts';
import {Construct} from '../../vite-env';

/**
 * A resource manager that allows
 * to load and manage resources
 */
export default class AssetManager {
    private readonly _assets: Record<string, Asset>;

    public constructor() {
        this._assets = {};
    }

    /**
     * Get the asset by the specified name and check the type if specified
     * @param name Name of the asset
     * @param type Construct of the asset
     *
     * @example Load with specified construct
     *  AssetManager.getAsset("paladin", ModelAsset);
     *
     * @example Load with specified type
     *  AssetManager.getAsset<ModelAsset>("paladin");
     */
    public getAsset<T extends Asset>(name: string, type?: Construct<T>): T | null {
        if (!Object.keys(this._assets).includes(name))
            return null;

        const asset = this._assets[name];
        if (type && asset.constructor.name === type.name || !type)
            return this._assets[name] as T;
        else return null;
    }

    /**
     * Add asset with specified name
     * @param name Name of the asset
     * @param asset Asset contents
     */
    public addAsset<T extends Asset>(name: string, asset: T): void {
        if (name in this._assets)
            throw new Error('Asset with specified name already exists');
        this._assets[name] = asset;
    }

    /**
     * Removes asset from assets list
     * @param name Name of the asset
     */
    public deleteAsset(name: string): void {
        delete this._assets[name];
    }

    /**
     * Assets list accessor
     */
    public get assets(): Record<string, Asset> {
        return this._assets;
    }
}
