import { Canvas } from "./canvas.js";
import { noisyLayers } from "./noisyLayers.js";

export class Terrain
{
    constructor(vectorFieldSizeArray, canvasHTMLElement, terrainSize, seed)
    {
        this.canvas = new Canvas(canvasHTMLElement, terrainSize);
        this.terrainSize = terrainSize;
        this.noisyLayers = new noisyLayers(vectorFieldSizeArray, terrainSize, seed);

        this.terrainTextures = [
            {'heightThreshold': 40, 'colour': '#aed6f1', 'name': 'Ice'},
            {'heightThreshold': 107, 'colour': '#154360', 'name': 'Deep Water'},
            {'heightThreshold': 130, 'colour': '#2874a6', 'name': 'Water'},
            {'heightThreshold': 135, 'colour': '#f9e79f', 'name': 'Beach'},
            {'heightThreshold': 150, 'colour': '#52be80', 'name': 'Grass'},
            {'heightThreshold': 200, 'colour': '#145a32', 'name': 'Hill'},
            {'heightThreshold': 220, 'colour': '#566573', 'name': 'Rocky Mountain'},
            {'heightThreshold': 1000, 'colour': '#fbfcfc', 'name': 'Mountain'}
        ];

    };
    
    getTerrainHeight(x, y)
    {
        const height = Math.floor(256 * this.noisyLayers.getPerlinNoiseHere(x, y));
        return height;
    };

    colourNoiseMap()
    {
        for (let g = 0; g < this.terrainSize['width']; g++)
        {
            for (let h = 0; h < this.terrainSize['height']; h++)
            {
                const height = this.getTerrainHeight(g, h);

                for (let f in this.terrainTextures)
                {
                    const texture = this.terrainTextures[f];
                    if (height <= texture['heightThreshold'])
                    {
                        this.canvas.draw(g, h, texture['colour']);
                        break;
                    };
                };
            };
        };
    };

    highlightNoises()
    {
        const hex = "0123456789ABCDEF";

        for (let i = 0; i < this.terrainSize['width']; i++)
        {
            for (let j = 0; j < this.terrainSize['height']; j++)
            {
                const height = this.getTerrainHeight(i, j);
                const heightMod = height % 16;
                const hexCode = `${hex[(height - heightMod)/16]}${hex[heightMod]}`;
                this.canvas.draw(i, j, "#" + hexCode.repeat(3));
            }
        }
    }

    clearMap()
    {
        this.canvas.clear();
    }


}