"use strict";

function MakeEmp(image, name, title) {
    
    var ele = document.createElement("div");
    ele.classList.add("emp"); 
    
    var myImage = document.createElement("img");
    myImage.src = image;
    ele.appendChild(myImage);
    
    var myName = document.createElement("h3");
    myName.innerHTML = name;
    ele.appendChild(myName);
    
    var myTitle = document.createElement("h4");
    myTitle.innerHTML = title; 
    ele.appendChild(myTitle);

    return ele;
}//end MakeEmp()


