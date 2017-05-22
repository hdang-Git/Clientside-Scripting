package dbUtils;

import java.sql.DriverManager;
import java.sql.Connection;

/**
 * Wrapper class for database connection. Constructor opens connection. Close
 * method closes connection.
 */
public class DbConn {

    private String errMsg = ""; // will remain "" unless error getting connection
    private Connection conn = null;

    /**
     * Constructor - opens database connection to database, using the right 
     * URL dependin on whether the app is running locally or not (by checking if
     * "temple.edu" is at the end of the hostname of the machine on which you
     * are running your app).
     */
    public DbConn() {
        try {
            String DRIVER = "com.mysql.jdbc.Driver";
            Class.forName(DRIVER).newInstance();
            try {
                //String url = "jdbc:mysql://localhost/sales?user=root";
                String url = "jdbc:mysql://localhost:3307/SP11_2308_sallyk?user=sallyk&password=Vaca1415";

                if (isTemple()) {
                    // SP11_2308_sallyk is the name of my database/schema on cis-linux2
                    url = "jdbc:mysql://cis-linux2.temple.edu/SP11_2308_sallyk?user=sallyk&password=Vaca1415";
                }
                this.conn = DriverManager.getConnection(url);
            } catch (Exception e) { // cant get the connection
                String err = " Could not get connection:" + e.getMessage();
                System.out.println("**** Exception in DbConn: " + err);
                this.errMsg += err;
            }
        } catch (Exception e) { // cant get the driver...
            String err = " Could not find driver:" + e.getMessage();
            System.out.println("**** Exception in DbConn: " + err);
            this.errMsg += err;
        }
    } // method

    /**
     * Returns database connection for use in SQL classes.
     */
    public Connection getConn() {
        return this.conn;
    }

    /**
     * Returns database connection error message or "" if there is none.
     */
    public String getErr() {
        return this.errMsg;
    }

    /**
     * Close database connection.
     */
    public void close() {
        // java.sql.Connection throws an exception if you try to close the connection if 
        // is not open. I do not want this behavior so I hange it in my wrapper class.
        if (conn != null) {
            try {
                conn.close();
            } catch (Exception e) {
                // DO NOTHING -- DONT CARE if the connection wasn't open when the close method is called.
            } // catch
        } // if
    } // method

    /**
     * Checks the hostname to see if the web application is running on a Temple computer or not.
     * If the computer name doesn't have "temple.edu" in it, then you need to be tunnelled in.
     */
    private boolean isTemple() {
        boolean temple = false;
        try {
            String hostName = java.net.InetAddress.getLocalHost().getCanonicalHostName();
            hostName = hostName.toLowerCase();
            if (hostName.endsWith("temple.edu")) {
                temple = true;
                System.out.println("**** DbConn: running on a Temple computer. Using cis-linux2 db connection string");
            } else {
                System.out.println("**** DbConn: not running on a Temple computer. Using tunnelled db connection string");
            }
        } catch (Exception e) {
            System.out.println("**** DbConn: Unable to get hostname. " + e.getMessage());
        }
        return temple;
    }
} // class