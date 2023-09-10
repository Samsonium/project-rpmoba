import Asset from '../Asset.ts';
import {Object3D} from 'three';

/**
 * 3D model asset
 */
export default class ModelAsset extends Asset<Object3D> {
    public constructor(content: Object3D) {
        super(content);
    }
}
