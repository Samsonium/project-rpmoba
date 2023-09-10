import {describe, it, expect, beforeEach} from 'vitest';
import AssetManager, {Asset} from '../../../src/engine/asset-manager';

class TextAsset extends Asset {
    constructor(text: string) {
        super(text);
    }
}

describe('AssetManager', () => {
    let assetManager: AssetManager;
    beforeEach(() => {
        assetManager = new AssetManager();
    });

    describe('getAsset', () => {
        it('Should return null if specified asset doesn\'t exists', () => {
            const result = assetManager.getAsset('test', TextAsset);
            expect(result).to.be.null;
        });
        it('Should return asset if specified asset exists', () => {
            const textAsset = new TextAsset('abc');
            assetManager.addAsset('text-asset', textAsset);
            const result = assetManager.getAsset('text-asset');
            expect(result).not.to.be.null;
        });
        it('Should return asset with specified type', () => {
            const textAsset = new TextAsset('abc');
            assetManager.addAsset('text-asset', textAsset);
            const result = assetManager.getAsset('text-asset', TextAsset);
            expect(result).toBeInstanceOf(TextAsset);
        });
        it('Should return null if asset with specified name exists but type doesn\'t match', () => {
            const textAsset = new TextAsset('abc');
            assetManager.addAsset('text-asset', textAsset);
            const result = assetManager.getAsset('text-asset', Asset);
            expect(result).to.be.null;
        });
    });

    describe('addAsset', () => {
        it('Should add asset with specified name', () => {
            const textAsset = new TextAsset('abc');
            assetManager.addAsset('txt', textAsset);
            expect(assetManager.assets['txt']).toBe(textAsset);
        });
        it('Should throw error if asset with specified name already exists', () => {
            const textAsset = new TextAsset('abc');
            assetManager.addAsset('txt', textAsset);
            expect(() => {
                assetManager.addAsset('txt', textAsset);
            }).toThrow('Asset with specified name already exists');
        });
    });

    describe('deleteAsset', () => {
        it('Should remove asset with specified name', () => {
            const textAsset = new TextAsset('abc');
            assetManager.addAsset('txt', textAsset);
            assetManager.deleteAsset('txt');
            expect(assetManager.assets['txt']).toBeUndefined();
        });
        it('Should do nothing if asset with specified name doesn\'t exists', () => {
            assetManager.deleteAsset('unspecified asset');
            expect(assetManager.assets).toEqual({});
        });
    });
});
