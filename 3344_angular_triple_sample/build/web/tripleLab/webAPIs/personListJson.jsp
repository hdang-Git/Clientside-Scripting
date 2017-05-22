<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*"%> 
<%@page language="java" import="view.PersonView"%>
<%@page language="java" import="model.person.*"%>

<%@page language="java" import="com.google.gson.*" %>

<%
    /*  http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type 
     The MIME media type for JSON text is application/json. The default encoding is UTF-8. (Source: RFC 4627).
     */

    DbConn dbc = new DbConn();
    
    // buildPersonList will check for db connection errors (and put error message into personList).
    StringDataList personList = PersonView.buildPersonList(dbc);

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.

    Gson gson = new Gson();
    out.print(gson.toJson(personList).trim());
%>