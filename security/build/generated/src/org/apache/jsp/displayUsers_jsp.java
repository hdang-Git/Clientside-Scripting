package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import dbUtils.DbConn;
import java.sql.*;

public final class displayUsers_jsp extends org.apache.jasper.runtime.HttpJspBase
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

      out.write("  \n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE HTML>\n");
      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <title>Display Users</title>\n");
      out.write("        <style>\n");
      out.write("            body {\n");
      out.write("                background-color: khaki; font-family:arial;\n");
      out.write("            }\n");
      out.write("            table {\n");
      out.write("                background-color: darkgoldenrod;\n");
      out.write("            }\n");
      out.write("            th, td {\n");
      out.write("                background-color: beige; \n");
      out.write("                padding: 6px;\n");
      out.write("                text-align:left;}\n");
      out.write("            th {\n");
      out.write("                background-color: darkgoldenrod;\n");
      out.write("                font-weight:bold;\n");
      out.write("                color:white;\n");
      out.write("            }\n");
      out.write("        </style>\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("        \n");
      out.write("        ");
      org.apache.jasper.runtime.JspRuntimeLibrary.include(request, response, "links.jsp", out, false);
      out.write("\n");
      out.write("\n");
      out.write("        ");

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

      out.write("\n");
      out.write("        <br/>\n");
      out.write("        View source to see the HTML that holds the injected JavaScript\n");
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
