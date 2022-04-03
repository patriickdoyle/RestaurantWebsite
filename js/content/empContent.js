"use strict";
function empContent() {

    var content = `
        <style>
            p {
                margin-left: 1.5rem;
            }
            .flexContainer {
                display:flex; 
                align-items: center;
                justify-content: center;
                flex-direction: row;
                background-color: green;
                
            }
            .flexContainer .emp {
                width: 50%; /* to fit two columns inside the flexContainer */
                box-sizing: border-box; /* makes padding and border counted in the width */
                background-color: white;
            }
        </style>
        
    `;
    var ele = document.createElement("div");
    ele.innerHTML = content; // the HTML code specified just above...
    var empContainer = document.createElement("div");
    empContainer.classList.add('flexContainer'); // see styling in this file, above...
    ele.appendChild(empContainer);
    empContainer.appendChild(MakeEmp("https://cis-linux2.temple.edu/~sallyk/pics_users/dominic.jpg", "Dominic", "Line Cook"));
    empContainer.appendChild(MakeEmp("https://cis-linux2.temple.edu/~sallyk/pics_users/abha.jpg", "Abha", "Head Chef"));

    return ele;


}