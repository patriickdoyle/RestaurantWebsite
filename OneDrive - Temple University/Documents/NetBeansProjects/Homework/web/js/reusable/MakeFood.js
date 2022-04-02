function MakeFood (myProps) {
    
    var foodObj = document.createElement("div");
    foodObj.classList.add("foodStyle");
    
    //public properties
    foodObj.price = myProps.price; //price of the food
    
    //private properties
    var name = myProps.name;//name of item
    var info = myProps.info; //description of the food
    var type = myProps.type; //whether food is app/entree etc
    var gf = myProps.gf;
    
    //optional property: empty string if not supplied
    if (gf === undefined) {
      gf = "";  
    }//end if
    
    //mutator functions
    foodObj.setName = function (newName) {
        name = newName;
        display(); // show updated property on the page
    };//end setName()
    
    foodObj.setInfo = function (newInfo) {
        info = newInfo;
        display(); // show updated property on the page
    };//end setInfo()
    
    foodObj.setType = function (newType) {
        type = newType;
        display(); // show updated property on the page
    };//end setType()
    
    foodObj.setGf = function (newGf) {
        gf = newGf;
        display(); // show updated property on the page
    };//end setGf()
    
    foodObj.changePrice = function (newRate) {
        foodObj.price = newRate * foodObj.price;
        display();
    };//end changePrice()
    
    //event handling to allow user to use public functions
    // create User interface for changing price
    var priceButton = document.createElement("button");
    priceButton.innerHTML = "Change price by factor: ";
    foodObj.appendChild(priceButton);

    var priceFactor = document.createElement("input");
    foodObj.appendChild(priceFactor);

    priceButton.onclick = function () {
        foodObj.changePrice(priceFactor.value);
    };//end priceButton.onclick()
    
    foodObj.appendChild(document.createElement("br")); // new line
    
    // create User interface for changing name
    var nameButton = document.createElement("button");
    nameButton.innerHTML = "Change name: ";
    foodObj.appendChild(nameButton);

    var newName = document.createElement("input");
    foodObj.appendChild(newName);

    nameButton.onclick = function () {
        foodObj.setName(newName.value);
    };//end nameButton.onclick()
    
    foodObj.appendChild(document.createElement("br")); // new line
    
    // create User interface for changing info
    var infoButton = document.createElement("button");
    infoButton.innerHTML = "Change info: ";
    foodObj.appendChild(infoButton);

    var newInfo = document.createElement("input");
    foodObj.appendChild(newInfo);

    infoButton.onclick = function () {
        foodObj.setInfo(newInfo.value);
    };//end infoButton.onclick()
    
    foodObj.appendChild(document.createElement("br")); // new line
   
   // create User interface for changing meal type
    var typeButton = document.createElement("button");
    typeButton.innerHTML = "Change course type: ";
    foodObj.appendChild(typeButton);

    var newType = document.createElement("input");
    foodObj.appendChild(newType);

    typeButton.onclick = function () {
        foodObj.setType(newType.value);
    };//end typeButton.onclick()
    
    foodObj.appendChild(document.createElement("br")); // new line
    
    // create User interface for changing gf status
    var gfButton = document.createElement("button");
    gfButton.innerHTML = "Change gf status: ";
    foodObj.appendChild(gfButton);

    var newGf = document.createElement("input");
    foodObj.appendChild(newGf);

    gfButton.onclick = function () {
        foodObj.setGf(newGf.value);
    };//end gfButton.onclick()
    
    foodObj.appendChild(document.createElement("br")); // new line
    
    //div to hold image of food
    var foodImg = document.createElement("img");
    foodImg.src = myProps.image;
    foodObj.appendChild(foodImg);
    
    //div to hold food info
    var foodInfo = document.createElement("div");
    foodObj.appendChild(foodInfo);
    
    //function to display food attributes
    function display() {           // create custom method “display”

        // make the current properties visible on the page
        foodInfo.innerHTML = name + "<br/>$" + foodObj.price + "<br/>" + type + "<br/>" + info + "<br/>" + gf;
    }; //end display()
    
    
    display();
    return foodObj;
    
}//end MakeFood()


