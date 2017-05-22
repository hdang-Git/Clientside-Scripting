<%-- 
    Document   : webApi
    Created on : Mar 1, 2017, 11:57:11 PM
    Author     : Hai
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Planet.*" %>
<%@page language="java" import="java.util.ArrayList" %>

<%@page language="java" import="com.google.gson.*" %>

<%

    StringDataList list = new StringDataList();

    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (list.dbError.length() == 0) { // got open connection 

        String planetNameStartsWith = request.getParameter("q");
        if (planetNameStartsWith == null) {
            planetNameStartsWith = "";
        }

        // list is an object with an array of planet objects inside, 
        // plus a possible dbError.
        System.out.println("jsp page ready to search for planet with " + planetNameStartsWith);
        list = new StringDataList(planetNameStartsWith, dbc);
    } 

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.

    Gson gson = new Gson();
    out.print(gson.toJson(list).trim()); 
%>