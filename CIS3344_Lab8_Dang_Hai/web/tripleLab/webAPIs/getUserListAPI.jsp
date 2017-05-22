<%-- 
    Document   : getUserListAPI
    Created on : Mar 29, 2017, 1:29:04 AM
    Author     : Hai
--%>
<%@page import="view.ScientistView"%>
<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Scientist.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    StringDataList list = new StringDataList();

    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (list.dbError.length() == 0) { // got open connection
        list = ScientistView.buildScientistList(dbc);
    } 

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.

    Gson gson = new Gson();
    out.print(gson.toJson(list).trim()); 
%>