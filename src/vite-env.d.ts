/// <reference types="vite/client" />
import {Asset} from './engine/asset-manager';

/**
 * Constructor type
 */
type Construct<T> = new (...args: any[]) => T extends Asset ? T : never;
