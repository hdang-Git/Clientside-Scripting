package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.sql.*;

public final class _01_005fSQL_005fInjectable_005fLogon_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"\n");
      out.write("    \"http://www.w3.org/TR/html4/loose.dtd\">\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <style>\n");
      out.write("            body {background-color: khaki;}\n");
      out.write("            table, th, td {background-color: beige; \n");
      out.write("                           border:thin solid maroon;\n");
      out.write("                           padding: 3px;\n");
      out.write("                           text-align:left;}\n");
      out.write("        </style>\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("\n");
      out.write("        ");

            String strUserEmail = "";
            String strUserPwd = "";
            String logonMsg = "";
            String sql = "";

            if (request.getParameter("userEmailInput") != null) {

                strUserEmail = request.getParameter("userEmailInput");
                strUserPwd = request.getParameter("userPwdInput");

                Connection con = null; // "telephone call" between web app and the db mgt system
                Statement stmt = null; // holds the SQL statement the web app wants to run
                ResultSet results = null;  // holds the data which results from a SQL select statement.

                try { // to find the driver

                    String DRIVER = "com.mysql.jdbc.Driver";
                    Class.forName(DRIVER).newInstance();

                    try { // to get the connection

                        // if you have mysql database (not workbench) running locally
                        //String url = "jdbc:mysql://localhost/cis2308?user=root"; //cis2308 is the name of my database/schema on my local mysql instance
                        // if you are at Wachman PC Labs or published on the web server
                        //String url = "jdbc:mysql://CIS-Linux2.temple.edu/SP11_2308_sallyk?user=sallyk&password=loh3Nito";  // my connection string on cis-linux2.
                        // if you are at home tunnelling into cis-linux2
                        String url = "jdbc:mysql://localhost:3307/SP11_2308_sallyk?user=sallyk&password=loh3Nito";  // my connection string on cis-linux2.

                        con = DriverManager.getConnection(url);

                        try {
                            sql = "select user_email, user_password, web_user_id, user_role_id from web_user "
                                    + "where user_email = '" + strUserEmail + "' and user_password = '" + strUserPwd + "'";

                            stmt = con.createStatement();
                            results = stmt.executeQuery(sql);

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

                            results.close();  // close the result set
                            stmt.close(); // close the statement
                            con.close();  // close the db connection (THIS ONE IMPORTANT-no leaks!)
                        } catch (Exception e) {
                            logonMsg += "problem creating statement & running query:" + e.getMessage();
                            results.close();  // close the result set
                            stmt.close(); // close the statement
                            con.close();  // close the db connection (THIS ONE IMPORTANT-no leaks!)
                        }
                    } catch (Exception e) {
                        logonMsg += "problem getting connection:" + e.getMessage();
                    }
                } catch (Exception e) {
                    logonMsg += "problem getting driver:" + e.getMessage();
                }
            }
        
      out.write("\n");
      out.write("        Remember: In MySql, comments start with # \n");
      out.write("        <br/>\n");
      out.write("        This is what the hacker would enter for User Email:  x' or 1=1; #\n");
      out.write("        <br/>\n");
      out.write("        # means start a comment in sql\n");
      out.write("        <br/>\n");
      out.write("        <br/>\n");
      out.write("        <form action=\"01_SQL_Injectable_Logon.jsp\" method=\"get\">\n");
      out.write("            User Email <input name=\"userEmailInput\" type=\"text\" size=\"120\" value=\"");
      out.print(strUserEmail);
      out.write("\"/>\n");
      out.write("            <br/><br/>\n");
      out.write("            Password <input name=\"userPwdInput\" type=\"text\" size=\"120\" value=\"");
      out.print(strUserPwd);
      out.write("\"/>\n");
      out.write("            <br/><br/>\n");
      out.write("            <input type=\"submit\">\n");
      out.write("        </form>\n");
      out.write("        <br/><br/>\n");
      out.write("        <h3>SQL: ");
      out.print(sql);
      out.write("</h3>\n");
      out.write("        <br/>\n");
      out.write("        ");
      out.print(logonMsg);
      out.write("\n");
      out.write("    </body>\n");
      out.write("</html>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
