import Asset from '../Asset.ts';
import {Object3D, AnimationClip} from 'three';

export default class AnimationAsset extends Asset<Object3D> {
    private readonly _clip: AnimationClip;

    public constructor(content: Object3D) {
        if (!content.animations.length)
            throw new Error('No animations found in asset');
        super(content);
        this._clip = content.animations[0];
    }

    public get clip(): AnimationClip {
        return this._clip;
    }
}
