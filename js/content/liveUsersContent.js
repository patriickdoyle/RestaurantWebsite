function liveUsersContent() {

    "use strict"; // turn off the "auto variable declaration" feature of the browser.
    // So, if we mispell a variable name, the browser will not auto-declare a new variable. 

    // ***** THE FIRST COMPONENT IS DONE FOR YOU *****

    var myDiv1 = document.createElement("div");
    document.getElementById("userContainer").appendChild(myDiv1);

    // Make AJAX call to read users.json and if the call was successful, run function
    // processUserData, otherwise, put an error message in the mydiv1 DOM element. 
    ajax('webAPIs/listUsersAPI.jsp', processUserData, myDiv1);
    console.log("got past ajax call");


    function processUserData(obj) { // callback function

        if (obj.dbError.length > 0) {
            myDiv1.innerHTML = obj.dbError;
            return;
        }
        var list = obj.webUserList;
        // turn this list of objects into click sort-able filterable HTML table (component)

        // now userList has been populated with data from the AJAX call to file users.json
        console.log("user list (in processUserData) on next line - open triangle to see data");
        console.log(list);

        // Create new object list where all properties are <td> elements
        var newUserList = [];
        for (var i = 0; i < list.length; i++) {
            newUserList[i] = {};
            newUserList[i].Web_UserId = SortableTableUtils.makeNumber(list[i].webUserId);
            newUserList[i].User_Email = SortableTableUtils.makeText(list[i].userEmail);
            newUserList[i].User_Password = SortableTableUtils.makeText(list[i].userPassword);
            newUserList[i]._Image = SortableTableUtils.makeImage(list[i].image, "4rem");
            newUserList[i].Birthday = SortableTableUtils.makeDate(list[i].birthday);
            newUserList[i].Membership_Fee = SortableTableUtils.makeNumber(list[i].membershipFee, true);
            newUserList[i].User_RoleId = SortableTableUtils.makeNumber(list[i].userRoleId);
            newUserList[i].User_RoleType = SortableTableUtils.makeText(list[i].userRoleType);
        }

        // MakeTableBetter expects all properties to be <td> elements.
        var myReport1 = MakeClickSortTable("User List", newUserList, "User_Email", "icons/sortUpDown16.png");
        myReport1.classList.add("clickSort");
        myDiv1.appendChild(myReport1);

    } // processUserData
    return myDiv1;

}

