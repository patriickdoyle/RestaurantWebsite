"use strict";
        function homeContent () {

// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 

        var content = `

            <h3>Welcome!</h3>
            <p>
                Welcome to Mexipizza! With this site you can do everything from view menus, prices,and hours to posting
                and viewing reviews of our excellent food. First timer? Can't decide what to order? Not a problem. 
                Use our menu to take a look at our excellent selection of foods, including their prices and pictures
                of the food. You can also see what other customers have to say about the food in the reviews, and even post
                your own if you feel so inclined. Check in daily for exclusive offers!
            </p>
            
            <p>
                <a href="https://youtu.be/dQw4w9WgXcQ" style="text-decoration:none;">
                    Click here to view our amazing offers!</a>
            </p>
            
           
    
            `;
    
    
    
                var ele = document.createElement("div");
                ele.innerHTML = content;
                return ele;
        }