let myName = "Larla Here";

// Change the header
let header = document.querySelector(".header");
header.textContent= myName + "'s Lab 4";

// Add 2 paragraphs into the content
let content = document.querySelector(".content");

let p = document.createElement("p");
p.className = "paragraph1";
content.appendChild(p);

p = document.createElement("p");
p.className = "paragraph2";
content.appendChild(p);

// Update first paragraph
p = document.querySelector(".paragraph1");
p.textContent = "My name has " + myName.length + " characters... " + myName;

// Update second paragraph
p = document.querySelector(".paragraph2");
p.appendChild(document.createTextNode("the third character in my name is " + myName[2].toUpperCase() + " (" + myName + ")"));
p.appendChild(document.createElement("br"));
p.appendChild(document.createTextNode(myName.substr(myName.length - 3)));

// Substring the the first and last name into two separate variables
let index = myName.indexOf(" ");
let firstName = myName.substr(0, index);
let lastName = myName.substr(index + 1);

header.textContent += " (Letters total: " + (firstName.length + lastName.length) + ")";
