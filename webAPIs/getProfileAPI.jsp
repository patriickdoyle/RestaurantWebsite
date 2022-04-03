<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    if (session.getAttribute("loggedOnUser") != null) {
        sd = (StringData) session.getAttribute("loggedOnUser");
    }
    else {
        sd.errorMsg = "Error: no logged on user in session.";
    }

    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>
