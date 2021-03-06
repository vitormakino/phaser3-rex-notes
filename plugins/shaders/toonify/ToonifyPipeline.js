import frag from './toonify-frag.js';

const TextureTintPipeline = Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class ToonifyPipeline extends TextureTintPipeline {
    constructor(scene, key, config) {
        console.log(frag);
        var game = scene.game;
        super({
            game: game,
            renderer: game.renderer,
            fragShader: frag // GLSL shader
        });
        this._width = 0; // width wo resolution
        this._height = 0; // height wo resolution
        this._edgeGain = 0;
        this._edgeThreshold = 0;
        this._hueLevels = 0;
        this._satLevels = 0;
        this._valLevels = 0;

        game.renderer.addPipeline(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setEdgeGain(GetValue(o, 'edgeGain', 5));
        this.setEdgeThreshold(GetValue(o, 'edgeGain', 0.2));
        this.setHueLevels(GetValue(o, 'hLevels', 0));
        this.setSatLevels(GetValue(o, 'sLevels', 0));
        this.setValLevels(GetValue(o, 'vLevels', 0));
        return this;
    }

    // edgeGain
    get edgeGain() {
        return this._edgeGain;
    }

    set edgeGain(value) {
        this._edgeGain = value;
        this.setFloat1('edgeGain', value);
    }

    setEdgeGain(value) {
        this.edgeGain = value;
        return this;
    }

    // edgeThreshold
    get edgeThreshold() {
        return this._edgeThreshold;
    }

    set edgeThreshold(value) {
        this._edgeThreshold = value;
        this.setFloat1('edgeThreshold', value);
    }

    setEdgeThreshold(value) {
        this.edgeThreshold = value;
        return this;
    }

    // hueLevels
    get hueLevels() {
        return this._hueLevels;
    }

    set hueLevels(value) {
        this._hueLevels = value;
        value = (value > 0) ? 360 / value : 0;
        this.setFloat1('hStep', value);
    }

    setHueLevels(value) {
        this.hueLevels = value;
        return this;
    }

    // satLevels
    get satLevels() {
        return this._satLevels;
    }

    set satLevels(value) {
        this._satLevels = value;
        value = (value > 0) ? 1 / value : 0;
        this.setFloat1('sStep', value);
    }

    setSatLevels(value) {
        this.satLevels = value;
        return this;
    }

    // valLevels
    get valLevels() {
        return this._valLevels;
    }

    set valLevels(value) {
        this._valLevels = value;
        value = (value > 0) ? 1 / value : 0;
        this.setFloat1('vStep', value);
    }

    setValLevels(value) {
        this.valLevels = value;
        return this;
    }

    // size
    resize(width, height, resolution) {
        this._width = width;
        this._height = height;
        super.resize(width, height, resolution);
        this.setFloat2('texSize', width, height);
        return this;
    }
}

export default ToonifyPipeline;