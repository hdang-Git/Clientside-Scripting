<%@page contentType="application/json" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Scientist.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%
    //To test the api use url i.e. http://localhost:8080/CIS3344_Lab9_Dang_Hai/tripleLab/webAPIs/logonAPI.jsp?email=""&password=""
    
    // last name error msg and age error msg (inside of userErrors) are both now ""
    StringData userErrors = new StringData();  
    Gson gson = new Gson();
    DbConn dbc = new DbConn();
    userErrors.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.
    
    if (userErrors.errorMsg.length() == 0) { // got open connection 
        //Extract email & password values from url
        String emailInput = request.getParameter("email");
        String passwordInput= request.getParameter("password");

        //Validate that input for both fields aren't null/empty
        if (emailInput.length() == 0) {
            userErrors.scientistEmail = "Email is required";
        }
        if(passwordInput.length() == 0){
            userErrors.scientistPassword = "Password is required";
        }
       
        // userData is an object of scientist data inside, 
        // plus a possible errorMsg.
        System.out.println("jsp page ready to search for email with " + emailInput + " password with " + passwordInput);
        StringData foundUser = SearchScientist.logonFind(emailInput, passwordInput, dbc);
        if(foundUser == null){
            userErrors.errorMsg = "User name and password not found.";
            session.invalidate();
        } else {    //user is found
            userErrors.errorMsg = foundUser.errorMsg; // errorMsg will hold db error, e.g., sql error, if any
            if (userErrors.getCharacterCount()== 0) {  //success in finding email, password pair
                // otherwise, it was a good logon
                session.setAttribute("user", foundUser);
            } else {
                userErrors.errorMsg = "Please try again.";
            }
        }
        System.out.println("logonAPI.jsp found these errors: " + userErrors.toString());
    } else {
        userErrors.errorMsg = "Bad connection";
    }

    out.print(gson.toJson(userErrors).trim());
    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.

    
%>
