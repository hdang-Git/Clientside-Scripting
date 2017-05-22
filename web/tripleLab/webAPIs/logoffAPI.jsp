<%-- 
    Document   : logoffAPI
    Created on : Apr 13, 2017, 8:12:24 PM
    Author     : Hai
--%>

<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Scientist.*" %>
<%@page language="java" import="com.google.gson.*" %>


<%
    Gson gson = new Gson();
    String msg;
    if(session.getAttribute("user") != null){   //if session is active, then invalidate it
        msg = "Logged out";
        session.invalidate();
    } else {
        msg = "No active session.";
    }
    out.print(gson.toJson(msg).trim());
    
    //or just write session.invalidate() 
%>
        