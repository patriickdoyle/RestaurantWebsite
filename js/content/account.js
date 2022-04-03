var account = {}; // Declare account before the IIFE so it is global

(function ( ) { // This is an IIFE immediately invoking function execution

    account.logon = function ( ) { // public method of global object
        // build user interface (a div with labels, text boxes, and logon button which makes an ajax call)
        var logonDiv = document.createElement("div");
        logonDiv.classList.add("find");

        var emailSpan = document.createElement('span');
        emailSpan.innerHTML = "Email: ";
        logonDiv.appendChild(emailSpan);

        var emailInput = document.createElement("input");
        logonDiv.appendChild(emailInput);

        var passwordSpan = document.createElement('span');
        passwordSpan.innerHTML = "Password: ";
        logonDiv.appendChild(passwordSpan);

        // Here’s how to build a password style text box showing dots instead of characters…
        var passwordInput = document.createElement("input");
        passwordInput.setAttribute("type", "password"); // so it shows dots not characters
        logonDiv.appendChild(passwordInput);

        var submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit";
        logonDiv.appendChild(submitButton);

        var msgDiv = document.createElement("div");
        logonDiv.appendChild(msgDiv);

        submitButton.onclick = function () {

            // You have to encodeURI user input before putting into a URL for an AJAX call.
            // Otherwise, your URL may be refused (for security reasons) by the web server.
            var url = "webAPIs/logonAPI.jsp?email=" + encodeURI(emailInput.value)
                    + "&password=" + encodeURI(passwordInput.value);

            console.log("onclick function will make AJAX call with url: " + url);
            ajax(url, processLogon, msgDiv);

            function processLogon(obj) {
                var msg = buildProfile(obj);

                console.log("msg:" + msg);
                msgDiv.innerHTML = msg;
            }
        };  // onclick function

        return logonDiv;
    };
    function buildProfile(obj) { // NOW PRIVATE, can be called by any of the account functions…
        var msg = "";
        // …
        console.log("Successfully called the find API. Next line shows the returned object.");
        console.log(obj);


        if (obj.errorMsg.length > 0) {
            console.log("if statement");
            msg += "<strong>Error: " + obj.errorMsg + "</strong>";
        } else {
            console.log("else statement");
            msg += "<strong>Welcome Web User " + obj.webUserId + "</strong>";
            msg += "<br/> Email: " + obj.userEmail;
            msg += "<br/> MembershipFee: " + obj.membershipFee;
            msg += "<br/> User Role: " + obj.userRoleId + " " + obj.userRoleType;
            msg += "<p> <img src ='" + obj.image + "'></p>";
        }


        return msg;
    }
    ;
    account.getProfile = function ( ) {
        // create a div, invoke Get Profile API, fill div w/ error msg or web user info, return the div.
        var profileDiv = document.createElement("div");
        profileDiv.classList.add("find");
        
        
        var msgDiv = document.createElement("div");
        profileDiv.appendChild(msgDiv);
        
        var url = "webAPIs/getProfileAPI.jsp";
        ajax(url, processProfile, msgDiv);
        function processProfile(obj) {
                var msg = buildProfile(obj);

                console.log("msg:" + msg);
                msgDiv.innerHTML = msg;
            }
        return msgDiv;
    };
    account.logoff = function ( ) {
        // create a div, invoke logoff API, fill div with “logged off” message, return the div.
        var logoffDiv = document.createElement("div");
        logoffDiv.classList.add("find");
        
        var msgDiv = document.createElement("div");
        logoffDiv.appendChild(msgDiv);
        
        var url = "webAPIs/logoffAPI.jsp";
        ajax(url, processLogout, msgDiv);
        
        function processLogout(obj) {
                var msg = buildProfile(obj);

                console.log("msg:" + msg);
                msgDiv.innerHTML = msg;
            }
        return msgDiv;
    };
}( )); // invoke the IIFE



