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
                String storedProcLike = "";

                if (request.getParameter("userEmailInput") != null) {

                    strUserEmail = request.getParameter("userEmailInput");
                    strUserPwd = request.getParameter("userPwdInput");

                    DbConn dbc = new DbConn();

                    //Statement stmt = null; // DO NOT USE a Statement object (holds the SQL with user input embedded)
                    PreparedStatement prepStmt = null; // Instead, use a PreparedStatement (holds the SQL with ?s for user input)

                    ResultSet results = null; // holds the result set if the SQL is SELECT

                    logonMsg = dbc.getErr();
                    if (logonMsg.length() == 0) {

                        try {
                            //results = stmt.executeQuery("select user_email, user_password from web_user order by user_email");
                            sql = "select user_email, user_password, web_user_id, user_role_id from web_user "
                                    + "where user_email = ? and user_password = ?";

                            storedProcLike = "EXEC storedProcedure with 1st parameter = \"" + strUserEmail
                                    + "\" and second parameter = \"" + strUserPwd + "\"";

                            //stmt = con.createStatement();
                            prepStmt = dbc.getConn().prepareStatement(sql);

                            //results = stmt.executeQuery(sql);
                            prepStmt.setString(1, strUserEmail);
                            prepStmt.setString(2, strUserPwd);
                            results = prepStmt.executeQuery();

                            if (results.next()) {
                                logonMsg += "Hello, user " + results.getString("user_email") + ". "
                                        + "I see your password is " + results.getString("user_password") + ". "
                                        + "You are user number " + results.getString("web_user_id")
                                        + " with role number " + results.getString("user_role_id") + ".";
                            } else {
                                logonMsg += "Invalid logon.";
                            }

                            results.close();  // close the result set
                            prepStmt.close(); // close the statement
                        } catch (Exception e) {
                            logonMsg += "problem creating statement & running query:" + e.getMessage();
                            results.close();  // close the result set
                            prepStmt.close(); // close the statement
                        }

                    } // db connection good
                    dbc.close();

                } // postback
%>

            <jsp:include page="links.jsp" />

            In MySql, comments start with # 
            <br/>
            This is what the hacker would enter for User Email:  x' or 1=1; #
            <br/>
            <br/>
            <form action="Safe_Logon_PreparedStatement.jsp" method="get">
                User Email <input name="userEmailInput" type="text" size="120" value="<%=strUserEmail%>"/>
                <br/><br/>
                Password <input name="userPwdInput" type="text" size="120" value="<%=strUserPwd%>"/>
                <br/><br/>
                <input type="submit">
            </form>
            <br/>
            <span style="color:red;"><%=logonMsg%></span>
        <br/><br/>
        SQL: <%=sql%>
        <br/><br/>
        It's like calling a stored procedure like this: <%=storedProcLike%>

    </body>
</html>