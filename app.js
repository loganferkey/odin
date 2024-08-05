const container = document.querySelector("#container");

let redText = document.createElement("p");
redText.style.color = 'red';
redText.innerText = "Hey I'm red!";
container.appendChild(redText);

let blueH3 = document.createElement("h3");
blueH3.style.color = 'blue';
blueH3.innerText = "I'm a blue H3!";
container.appendChild(blueH3);

let pinkDiv = document.createElement("div");
pinkDiv.style.cssText = "border: 2px solid black; background-color: pink;";

let h1 = document.createElement("h1");
h1.innerText = "I'm in a div!";
pinkDiv.appendChild(h1);

let p = document.createElement("p");
p.innerText = "ME TOO!";
pinkDiv.appendChild(p);

container.appendChild(pinkDiv);

