import { PerlinNoise } from "./perlinNoise.js"

class noiseLayer
{
    constructor(vectorFieldSize, canvasSize, seed)
    {
        this.vectorPixelSize = {
            'height': vectorFieldSize / canvasSize['height'],
            'width': vectorFieldSize / canvasSize['width']
        };

        this.perlinNoise = new PerlinNoise(vectorFieldSize, seed);
    }

    getPerlinNoiseAt(x, y)
    {
        return this.perlinNoise.getPerlinNoise(x*this.vectorPixelSize['width'], y*this.vectorPixelSize['height']);
    }
}

export class noisyLayers
{
    constructor(vectorFieldSizesArray, canvasSize, seed)
    {
        this.noiseLayers = vectorFieldSizesArray.map((size) => { return new noiseLayer(size, canvasSize, seed) });
        this.length = vectorFieldSizesArray.length;
    };

    getPerlinNoiseHere(x, y)
    {
        let height = 0;
        this.noiseLayers.forEach((layers) => { 
            height += layers.getPerlinNoiseAt(x, y);
        });
        return height/this.length;
    };
}