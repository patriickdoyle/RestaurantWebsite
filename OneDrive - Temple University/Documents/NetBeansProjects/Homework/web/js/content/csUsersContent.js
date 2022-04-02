
function csUsersContent() {

    "use strict"; // turn off the "auto variable declaration" feature of the browser.
    // So, if we mispell a variable name, the browser will not auto-declare a new variable. 

    // ***** THE FIRST COMPONENT IS DONE FOR YOU *****

    var myDiv1 = document.createElement("div");
    document.getElementById("userContainer").appendChild(myDiv1);

    // Make AJAX call to read users.json and if the call was successful, run function
    // processUserData, otherwise, put an error message in the mydiv1 DOM element. 
    ajax('json/users.json', processUserData, myDiv1);
    console.log("got past ajax call");


    function processUserData(userList) { // callback function
    
        // now userList has been populated with data from the AJAX call to file users.json
        console.log("user list (in processUserData) on next line - open triangle to see data");
        console.log(userList);

        // Create new object list where all properties are <td> elements
        var newUserList = [];
        for (var i = 0; i < userList.length; i++) {
            newUserList[i] = {};
            newUserList[i].User_Email = SortableTableUtils.makeText(userList[i].userEmail);
            newUserList[i]._Image = SortableTableUtils.makeImage(userList[i].image, "4rem");
            newUserList[i].Birthday = SortableTableUtils.makeDate(userList[i].birthday);
        }

        // MakeTableBetter expects all properties to be <td> elements.
        var myReport1 = MakeClickSortTable("User List", newUserList, "User_Email", "icons/sortUpDown16.png");
        myReport1.classList.add("clickSort");
        myDiv1.appendChild(myReport1);

    } // processUserData
    return myDiv1;

}