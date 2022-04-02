<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    String searchEmail = request.getParameter("email");
    String searchPassword = request.getParameter("password");
    
    if (searchEmail == null || searchPassword == null) {
        sd.errorMsg = "Error - 'email' and 'password' must be supplied";
        System.out.println("NULL CHECK SUCCESS");
    } else {
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr(); 
        if (sd.errorMsg.length() == 0) { 
            System.out.println("*** Ready to call DbMods.newFind");
            sd = DbMods.newFind(dbc, searchEmail, searchPassword);
        }
        dbc.close(); 
    }
    
   if (sd.errorMsg.length() == 0) {
       session.setAttribute("loggedOnUser", sd);
       System.out.println("session set");
   }//end if
   else {
       session.invalidate();
       System.out.println("session invalidated");
   }
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>