<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page import="model.Planet.DbPlanetMods"%>
<%@page import="model.Planet.StringData"%>
<%@page language="java" import="dbUtils.DbConn"%> 
<%@page language="java" import="com.google.gson.*" %>

<%
    /*  http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type 
     The MIME media type for JSON text is application/json. The default encoding is UTF-8. (Source: RFC 4627).
     */

    // This is the object we get from the GSON library.
    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    StringData errorMsgs = new StringData();
    
    //check is user is logged in
    if(session.getAttribute("user") == null){
        errorMsgs.errorMsg = "Unauthorized - Please login to insert.";
        System.out.println("Unauthorized - Please login to insert.");
    }
    
    //Get input data
    String jsonInsertData = request.getParameter("jsonData");
    if (jsonInsertData == null) {
        errorMsgs.errorMsg += "Cannot insert -- no data was received";
        System.out.println(errorMsgs.errorMsg);
    } else {
        System.out.println("jsonInsertData is " + jsonInsertData);
        errorMsgs.errorMsg += dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
            System.out.println("insertOtherAPI.jsp ready to insert");
            StringData insertData = gson.fromJson(jsonInsertData, StringData.class);
            errorMsgs = DbPlanetMods.insert(insertData, dbc); // this is the form level message
        }
    }

    out.print(gson.toJson(errorMsgs).trim());
    dbc.close();

%>