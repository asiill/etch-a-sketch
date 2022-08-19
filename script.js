/*
Etch-a-Sketch
*/

const grid = document.querySelector("#grid");

const gridSlider = document.querySelector("#gridSlider");
const sliderValue = document.querySelector("#sliderValue");
sliderValue.textContent = gridSlider.value;

const reset = document.querySelector("#reset");

function createGrid (rows, columns){
    grid.style.setProperty("--rows", rows);
    grid.style.setProperty("--columns", columns);
    for (let i = 0; i < rows * columns; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("mouseenter", selectColour);
        grid.appendChild(cell);
    }
}

createGrid(gridSlider.value, gridSlider.value);

gridSlider.oninput = function() {
    sliderValue.textContent = this.value;
}

gridSlider.addEventListener("mouseup", function() {
    grid.textContent = "";
    createGrid(gridSlider.value, gridSlider.value);
});

reset.addEventListener("click", function() {
    location.reload();
});

function selectColour() {
    let blackRadio = document.querySelector("#black");
    let colourRadio = document.querySelector("#colours");

    if (blackRadio.checked) {
        this.style.backgroundColor = "#000000";
    }
    else if (colourRadio.checked) {
        let colour = generateRandomColour();
        this.style.backgroundColor = colour;
    }
    else {
        this.style.backgroundColor = "#FFFFFF";
    }
}

function generateRandomColour(){
    const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    let colour = "#";
    for (let i = 0; i < 6; i++){
        let index = Math.floor(Math.random() * 16);
        colour += values[index];
    }
    return(colour);
}