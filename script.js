const container = document.querySelector("div#container");
const sizeDisplay = document.querySelector("#gridSizeDisplay");

// Get buttons for event listeners
const randomizeButton = document.querySelector("#randomizeGrid");
const decrementGridButton = document.querySelector("#decrementSize");
const incrementGridButton = document.querySelector("#incrementSize");
const clearButton = document.querySelector("#clearGrid");

let sketch = {
    squares: [],
    size: 60,
    CONTAINER_SIZE: container.clientWidth,
    DEFAULT_GRID_COLOR: "rgb(156 163 175);"
};

const generateGridItems = () => {
    for (let i = 0; i < sketch.size*sketch.size; i++) {
        let square = document.createElement("div");
        square.classList = `box-border w-[${sketch.CONTAINER_SIZE/sketch.size}px] h-[${sketch.CONTAINER_SIZE/sketch.size}px]`;
        square.style.backgroundColor = sketch.DEFAULT_GRID_COLOR;
        square.addEventListener("mouseover", (e) => {
            e.target.style.backgroundColor = "black";
        });
        container.appendChild(square);
        sketch.squares.push(square);
    }
};

generateGridItems();

const randomGrid = () => {
    sketch.squares.forEach((s) => {
        s.style.backgroundColor = "#"+Math.floor(Math.random()*16777215).toString(16);
    });
};

const resetGrid = () => {
    sketch.squares.forEach((s) => {
        s.style.backgroundColor = "";
    });
};

// Direction represents the id of the event that triggered the function, if direction === "incrementGrid" then increase size... vice versa
const updateSize = (direction) => {
    sketch.size = Math.min(Math.max(sketch.size + (direction === "incrementSize" ? 12 : -12), 12), 96); // clamp
    sizeDisplay.textContent = sketch.size;
    sketch.squares.length = 0; // clear array
    while(container.childElementCount > 0) {
        container.removeChild(container.lastElementChild);
    }; // clear squares from container node
    generateGridItems(); // regen squares
};

// attach event listeners
randomizeButton.addEventListener("click", randomGrid);
clearButton.addEventListener("click", resetGrid);
incrementGridButton.addEventListener("click", (e) => { updateSize(e.target.id); });
decrementGridButton.addEventListener("click", (e) => { updateSize(e.target.id); });