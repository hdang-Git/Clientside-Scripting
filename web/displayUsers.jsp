<%@page contentType="text/html" pageEncoding="UTF-8"%>  
<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="java.sql.*"%>

<!DOCTYPE HTML>
<html>
    <head>
        <title>Display Users</title>
        <style>
            body {
                background-color: khaki; font-family:arial;
            }
            table {
                background-color: darkgoldenrod;
            }
            th, td {
                background-color: beige; 
                padding: 6px;
                text-align:left;}
            th {
                background-color: darkgoldenrod;
                font-weight:bold;
                color:white;
            }
        </style>
    </head>
    <body>
        
        <jsp:include page="links.jsp" />

        <%
            DbConn dbc = new DbConn();
            String formMsg = dbc.getErr();
            if (formMsg.length() == 0) { // DB connection is good
                //out.println("got the connection with the db..." + "<br/>");

                try {
                    Statement stmt = dbc.getConn().createStatement();
                    ResultSet rst = stmt.executeQuery("select web_user_id, user_email, user_password, user_info, user_role_id from web_user order by user_email");
                    //out.println("executed the query " + "<br/>");
                    out.println("<h2>User List</h2>");

                    out.println("<table>");
                    out.println("<tr><th>User Id</th><th>Email</th><th>Password</th><th>Role</th><th>Info</th></tr>");
                    while (rst.next()) {
                        out.println("<tr>");
                        out.print("<td>" + rst.getString("web_user_id") + "</td>");
                        out.print("<td>" + rst.getString("user_email") + "</td>");
                        out.print("<td>" + rst.getString("user_password") + "</td>");
                        out.print("<td>" + rst.getString("user_role_id") + "</td>");
                        out.print("<td>" + rst.getString("user_info") + "</td>");
                        out.println("</tr>");
                    }
                    out.println("</table>");
                    //out.println("<br/> All Done !!");
                } catch (Exception e) {
                    out.println("problem creating statement and/or running query:" + e.getMessage() + "<br/>");
                }
            }
            dbc.close();  // close the db connection (THIS ONE IMPORTANT-no leaks!)
%>
        <br/>
        View source to see the HTML that holds the injected JavaScript
    </body>
</html>