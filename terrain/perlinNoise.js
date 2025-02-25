import { RandomGenerator } from "./randomGenerator.js";

/*
references: 
    <https://joeiddon.github.io/projects/javascript/perlin.html>
    <https://en.wikipedia.org/wiki/Perlin_noise>
    <https://adrianb.io/2014/08/09/perlinnoise.html>
*/

export class PerlinNoise
{
    constructor(size, seed)
    {
        this.vectorGrid = [];
        this.size = size + 1;
        this.random = new RandomGenerator(seed);
        this.generateGrid();
        
    };

    getRandomUnitVector()
    {
        const theta = (this.random.rand() * 2 * Math.PI);
        return {'x': Math.cos(theta), 'y': Math.sin(theta)};
    };

    generateGrid()
    {
        const dummyGrid = [];
        for (let i = 0; i < this.size; i++)
        {
            const dummyRow = [];
            for (let j = 0; j < this.size; j++)
            {
                dummyRow.push(this.getRandomUnitVector());
            }
            dummyGrid.push(dummyRow);
        }
        this.vectorGrid = dummyGrid;
    };

    getPerlinNoise(x, y)
    {
        const x0 = Math.floor(x);
        const y0 = Math.floor(y);
        const dotProducts = [];
        for (let m = 0; m < 2; m++)
        {
            for (let n = 0; n < 2; n++)
            {
                const cornerVector = this.vectorGrid[y0 + m][x0 + n];
                const offSetVector = {
                    'x': x - (x0 + n),
                    'y': y - (y0 + m)
                };
                dotProducts.push(this.getDotProduct(offSetVector, cornerVector));
            }
        }

        const z0 = this.interpolate(x - x0, dotProducts[0], dotProducts[1]);
        const z1 = this.interpolate(x - x0, dotProducts[2], dotProducts[3]);
        const z2 = this.interpolate(y - y0, z0, z1)

        return (z2 + 1)/2; // shifts range from [-1, 1] -> [0, 1]
    }

    getDotProduct(vector1, vector2)
    {
        return vector1['x'] * vector2['x'] + vector1['y'] * vector2['y'];
    }

    interpolate(x, a, b)
    {
        const smoothStep = (6*x**5) - (15*x**4) + (10*x**3);
        return a + (smoothStep * (b-a));
    }
}
