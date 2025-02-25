import { Terrain } from "./terrain/terrainGenerator.js";

function main()
{
    const vectorSizes = [16, 8, 4];
    const canvasE = document.getElementById("map");

    const button = document.getElementById("generate");
    const resolution = document.getElementById("resolution");
    const seed = document.getElementById("number");
    const resolutionText = document.getElementById("resolutionText");

    let prevRes = resolution.value;
    let prevSeed = seed.value;

    let map = new Terrain(vectorSizes, canvasE, {'height': 200, 'width': 200}, 0);
    map.colourNoiseMap();
    //test.highlightNoises();

    button.addEventListener("click", (event) => {
        // idk man this is to make sure when the button is spammed, its not rendering every time
        if (prevSeed == seed.value && resolution.value == prevRes)
        {
            console.log("prev");
            return;
        }

        map = new Terrain(
            vectorSizes,
            canvasE,
            {'height': resolution.value, 'width': resolution.value},
            seed.value
        )
        map.clearMap();
        map.colourNoiseMap();

        prevSeed = seed.value;
        prevRes = resolution.value;
    })

    resolution.addEventListener('change', (event) => {
        resolutionText.innerText = resolution.value;
    })
    
}

window.onload = () => {
    main();
}