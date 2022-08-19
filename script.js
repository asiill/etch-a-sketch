/*
Etch-a-Sketch
*/

const grid = document.querySelector("#grid");

const gridSlider = document.querySelector("#gridSlider");
const sliderValue = document.querySelector("#sliderValue");
sliderValue.textContent = gridSlider.value;

const customColourSelector = document.querySelector("#customColour");
const resetGrid = document.querySelector("#resetGrid");

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

// Initialize the grid using the default slider value (16)
createGrid(gridSlider.value, gridSlider.value);

// Always display the current slider value
gridSlider.oninput = function() {
    sliderValue.textContent = this.value;
}

// Allow the user to toggle the grid dimensions using the slider
gridSlider.addEventListener("mouseup", reset);

// Clear the grid when the "resetGrid" button is clicked
resetGrid.addEventListener("click", reset);

// Get the current value of the colour selector
let customColour = customColourSelector.value; 
// Update the value of the colour selector and uncheck radio items
customColourSelector.onchange = function(){
    customColour = this.value;
    uncheckRadio();
}
// Uncheck radio items even if user selects the same colour
customColourSelector.addEventListener("click", function() {
    customColour = this.value;
    uncheckRadio();
});

// This function clears the grid
function reset() {
    grid.textContent = "";
    createGrid(gridSlider.value, gridSlider.value);
    uncheckRadio();
}

// This function unchecks all radio items
function uncheckRadio() {
    let checkedRadioItems = document.querySelectorAll("input[type=radio]:checked");
    checkedRadioItems.forEach(r => {
        r.checked = false;
    });
}

// This function selects a colour based on which radio item is checked
function selectColour() {
    let blackRadio = document.querySelector("#black");
    let colourRadio = document.querySelector("#colours");
    let grayscaleRadio = document.querySelector("#grayscale");
    let eraserRadio = document.querySelector("#eraser");

    if (blackRadio.checked) {
        this.style.backgroundColor = "#000000";
        this.style.opacity = 1;
    }
    else if (colourRadio.checked) {
        let colour = generateRandomColour();
        this.style.backgroundColor = colour;
        this.style.opacity = 1;
    }
    else if (grayscaleRadio.checked) {
        this.style.backgroundColor = "#000000";
        if (this.style.opacity >= 0.1){
            this.style.opacity = Number(this.style.opacity) + 0.1;
        }
        else {
            this.style.opacity = 0.1;
        }
    }
    else if (eraserRadio.checked) {
        this.style.backgroundColor = "#FFFFFF";
    }
    else {
        this.style.backgroundColor = customColour;
        this.style.opacity = 1;
    }
}

// This function returns a random HEX colour code
function generateRandomColour() {
    const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    let colour = "#";
    for (let i = 0; i < 6; i++){
        let index = Math.floor(Math.random() * 16);
        colour += values[index];
    }
    return(colour);
}