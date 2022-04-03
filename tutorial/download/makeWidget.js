function makeWidget(objList) {
    //create div to return
    var myDiv = document.createElement("div");
    
    //create array to hold itemDivs
    var items = new Array();

    //loop through the object list
    for (var i = 0; i < objList.length; i++) {
        console.log(objList[i].name);
        //output clickable menu item to the page
        var itemDiv = document.createElement("div");
        myDiv.appendChild(itemDiv);
        itemDiv.innerHTML = objList[i].name;
        items[i] = itemDiv;
        
        //when itemDiv is clicked: create + trigger the modal
        items[i].onclick = function () {
            //create modal box for menu item
            var modal = document.createElement("div");
            modal.classList.add("modal");

            var modalContent = document.createElement("div");
            modalContent.classList.add("modal-content");

            var span = document.createElement("span");
            span.classList.add("close");
            modalContent.appendChild(span);

            var modalData = document.createElement("p");
            //find the correct item in objList and use its data in the modal
            for (var i = 0; i < objList.length; i++) {
                console.log(this.innerHTML);
                if (this.innerHTML === objList[i].name) {
                    modalData.innerHTML = "Name :" + objList[i].name + "<br />" + "Price: $" + objList[i].price +
                            "<br />" + objList[i].desc;
                    break;
                }//end if
            }//end for
            modalContent.appendChild(modalData);

            var cartButton = document.createElement("button");
            cartButton.innerHtml = "Add to Cart";
            modalContent.appendChild(cartButton);

            var checkoutButton = document.createElement("button");
            checkoutButton.innerHtml = "Checkout";
            modalContent.appendChild(checkoutButton);

            console.log(cartButton.innerHtml + "    " + checkoutButton.innerHtml);
            modal.appendChild(modalContent);
            myDiv.appendChild(modal);
            modal.style.display = "block";
            display();

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            };
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            };
            // Get the <span> element that closes the modal
            //var span = document.getElementsByClassName("close")[0];
        };//end itemDiv.onClick

        var display = function () {

        };

        //create star graphic based on obj rating

        //menu should be searchable via the searchbar
    }//end for

    return myDiv;
}//end makeWidget





