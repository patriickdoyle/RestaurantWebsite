function foodContent() {
    //makeFood() object
    const burrito = {
        name: "Burrito",
        price: 12,
        info: "Choice of steak or chicken, white or brown rice, black or pinto beans. ",
        type: "Entree",
        image: "pics/Burrito.JPG",
        gf: "Gluten Free"
    };

    const bowl = {
        name: "Bowl",
        price: 12,
        info: "Choice of steak or chicken, white or brown rice, black or pinto beans. ",
        type: "Entree",
        image: "pics/Bowl.jpg",
        gf: "Gluten Free"
    };

    var ele = document.createElement("div");
    var foodContainer = document.createElement("div");
    foodContainer.classList.add('flexContainer'); // see styling in this file, above...
    ele.appendChild(foodContainer);
    foodContainer.appendChild(MakeFood(bowl));
    foodContainer.appendChild(MakeFood(burrito));

    return ele;
}


