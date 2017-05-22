<%-- 
    Document   : webApi
    Created on : Mar 1, 2017, 11:57:11 PM
    Author     : Hai
--%>

<%@page import="view.PlanetView"%>
<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Planet.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    StringDataList list = new StringDataList();

    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (list.dbError.length() == 0) { // got open connection
        list = PlanetView.buildPlanetList(dbc);
    } 

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.

    Gson gson = new Gson();
    out.print(gson.toJson(list).trim()); 
%>