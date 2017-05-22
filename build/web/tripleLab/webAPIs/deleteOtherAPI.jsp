<%@page import="model.Planet.DbPlanetMods"%>
<%@page import="model.Planet.StringData"%>
<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.DbConn"%> 

<%@page language="java" import="com.google.gson.*" %>

<%
    /*  http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type 
     The MIME media type for JSON text is application/json. The default encoding is UTF-8. (Source: RFC 4627).
     */

    // This is the object we get from the GSON library.
    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    String deleteId = request.getParameter("id");
    System.out.println("ready to delete planet "+deleteId);
    
    // just so we have an actual pojo (plain old java object)
    // to convert to json. 
    StringData planet = new StringData();
    
    planet.errorMsg = "";

    if (deleteId == null) {
        planet.errorMsg += "Cannot delete -- no id was received";
    } else if(session.getAttribute("user") == null){                    //check is user is logged in
        planet.errorMsg += "Unauthorized - Please login to delete.";
        System.out.println("Unauthorized - Please login to delete.");
    } else {
        planet.errorMsg = dbc.getErr();
        if (planet.errorMsg.length() == 0) { // means db connection is ok
            //System.out.println("personDelete.jsp ready to delete id "+deleteId);
            planet.errorMsg = DbPlanetMods.deleteById(deleteId, dbc);
        }
    }
    System.out.println("result of that delete is: "+planet.errorMsg+"(empty string means worked)");
    out.print(gson.toJson(planet));
    dbc.close();
%>