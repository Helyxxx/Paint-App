"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const sizeElement = document.getElementById("size");
const colorElement = document.getElementById("color");
const clearElement = document.getElementById("clear");

let x, y, isPressed = false, size = 4, color = "black";

//FUNCTIONS

//Allows you to start drawing
function drawCircle(x, y) {
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
};

//Allows you to connect from one point to another to make the line
function drawLine(xInitial, yInitial, xEnd, yEnd){
    context.beginPath();
    context.moveTo(xInitial, yInitial);
    context.lineTo(xEnd, yEnd);
    context.strokeStyle = color;
    context.lineWidth = size * 2;
    context.stroke();
};

//Updates the size text for the user to know which size it is currently at
function updateSizeElement() {
    sizeElement.innerText = size;
}

// EVENT LISTENER

//When the mouse is pressed down, it will know to start drawing
canvas.addEventListener("mousedown", (event) => {
    isPressed = true;

    x = event.offsetX;
    y = event.offsetY;
});

//When mouse is no longer pressed down, it will end drawing
canvas.addEventListener("mouseup", (event) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

//When the mouse moves, it will constant reset itself to draw a proper line
canvas.addEventListener("mousemove", (event) => {
    if(isPressed) {
        let x2 = event.offsetX;    
        let y2 = event.offsetY;

        drawCircle(x2,y2);
        drawLine(x, y, x2, y2);

        x= x2;
        y = y2;
    }
})

//When increase button is clicked, the size will increase
increaseButton.addEventListener("click", () => {
    size += 2;

    if(size > 70) {
        size = 70;
    };

    updateSizeElement();
});

//When decrease button is clicked, the size will decrease
decreaseButton.addEventListener("click", () => {
    size -= 2;

    if(size < 2) {
        size = 2;
    };

    updateSizeElement();
})

//When the color picker takes a new new, it will deplace the new color when drawing
colorElement.addEventListener("change", (event) => 
    color = event.target.value
);

//Clears the canvas
clearElement.addEventListener("click", () => 
    context.clearRect(0, 0, canvas.width, canvas.height)
);
