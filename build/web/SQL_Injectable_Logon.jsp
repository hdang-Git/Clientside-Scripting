<%@page language="java" import="java.sql.*"%>
<%@page language="java" import="dbUtils.DbConn" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>
    <head>
        <style>
            body {background-color: khaki;}
            table, th, td {background-color: beige; 
                           border:thin solid maroon;
                           padding: 3px;
                           text-align:left;}
        </style>
    </head>
    <body>

        <%
            String strUserEmail = "";
            String strUserPwd = "";
            String logonMsg = "";
            String sql = "";

            if (request.getParameter("userEmailInput") != null) {

                strUserEmail = request.getParameter("userEmailInput");
                strUserPwd = request.getParameter("userPwdInput");

                DbConn dbc = new DbConn();
                logonMsg = dbc.getErr();
                if (logonMsg.length() == 0) {

                    try {
                        sql = "select user_email, user_password, web_user_id, user_role_id from web_user "
                                + "where user_email = '" + strUserEmail + "' and user_password = '" + strUserPwd + "'";

                        Statement stmt = dbc.getConn().createStatement();
                        ResultSet results = stmt.executeQuery(sql);

                        // Note: this is NOT a parameterized SQL statement (there are no ?s)
                        // user input is incorporated directly into the SQL and this is what opens up 
                        // the opportunity for SQL injection by a hacker.
                        if (results.next()) {
                            logonMsg += "Hello, user " + results.getString("user_email") + ". "
                                    + "I see your password is " + results.getString("user_password") + ". "
                                    + "You are user number " + results.getString("web_user_id")
                                    + " with role number " + results.getString("user_role_id") + ".";
                        } else {
                            logonMsg += "Invalid logon.";
                        }

                    } catch (Exception e) {
                        logonMsg += "problem creating statement & running query:" + e.getMessage();
                    }
                } // db connection is good
                dbc.close(); // NO DB connection leaks !
            }
        %>

        <jsp:include page="links.jsp" />

        In MySql, comments start with # 
        <br/>
        This is what the hacker would enter for User Email:  x' or 1=1; #
        <br/>
        <br/>
        <form action="SQL_Injectable_Logon.jsp" method="get">
            User Email <input name="userEmailInput" type="text" size="120" value="<%=strUserEmail%>"/>
            <br/><br/>
            Password <input name="userPwdInput" type="text" size="120" value="<%=strUserPwd%>"/>
            <br/><br/>
            <input type="submit">
        </form>
        <br/><br/>
        <h3>SQL: <%=sql%></h3>
        <br/>
        <%=logonMsg%>

    </body>
</html>