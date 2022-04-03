"use strict";
function csFoodContent() {

    "use strict"; // turn off the "auto variable declaration" feature of the browser.
    // So, if we mispell a variable name, the browser will not auto-declare a new variable. 

    // ***** THE FIRST COMPONENT IS DONE FOR YOU *****

    var myDiv1 = document.createElement("div");
    document.getElementById("foodContainer").appendChild(myDiv1);

    // Make AJAX call to read food.json and if the call was successful, run function
    // processFoodData, otherwise, put an error message in the mydiv1 DOM element. 
    ajax('json/food.json', processFoodData, myDiv1);
    console.log("got past ajax call");


    function processFoodData(foodList) { // callback function

        // now foodList has been populated with data from the AJAX call to file food.json
        console.log("food list (in processFoodData) on next line - open triangle to see data");
        console.log(foodList);

        // Create new object list where all properties are <td> elements
        var newFoodList = [];
        for (var i = 0; i < foodList.length; i++) {
            newFoodList[i] = {};
            newFoodList[i].Food_Id = SortableTableUtils.makeNumber(foodList[i].foodId);
            newFoodList[i].Food_Name = SortableTableUtils.makeText(foodList[i].foodName);
            newFoodList[i]._Image = SortableTableUtils.makeImage(foodList[i].foodImg, "4rem");
            newFoodList[i].Food_Rating = SortableTableUtils.makeNumber(foodList[i].foodRating);
            newFoodList[i].Web_User_Id = SortableTableUtils.makeNumber(foodList[i].webUserId);
            newFoodList[i].User_Email = SortableTableUtils.makeText(foodList[i].userEmail);
        }

        // MakeTableBetter expects all properties to be <td> elements.
        var myReport1 = MakeClickSortTable("Food List", newFoodList, "Food_Id", "icons/sortUpDown16.png");
        myReport1.classList.add("clickSort");
        myDiv1.appendChild(myReport1);

    } // processFoodData
    return myDiv1;
}