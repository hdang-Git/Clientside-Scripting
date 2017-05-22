/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.Scientist;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author Hai
 */
public class SearchScientist {
    public static StringData logonFind(String userEmail, String password, DbConn dbc) {
        StringData retrievedData = new StringData();
        //Check that email & password are non-null
        if ((userEmail == null) || (password == null)) {
            retrievedData.errorMsg = "Search.logonFind: email and pw must be both non-null.";
            return retrievedData;
        }
        try {
            // prepare (compiles) the SQL statement
        String sql = "SELECT scientist_id, scientist_email, scientist_password, scientist_Name, user_role " +
                      "FROM sp17_3344_1_tug25055.scientist WHERE scientist_email = ? AND scientist_password = ?;";
           
            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, userEmail);
            pStatement.setString(2, password);

            ResultSet results = pStatement.executeQuery();
            // Just getting back the name and email
            if (results.next()) {
                retrievedData.scientistEmail = userEmail;
                retrievedData.scientistName = FormatUtils.formatString(results.getObject("scientist_Name"));            
                return retrievedData;
            } else {
                return null;
            }
        } catch (Exception e) {
            retrievedData.errorMsg = "Exception in Search.logonFind: " + e.getMessage();
            System.out.println("******" + retrievedData.errorMsg);
            return retrievedData;
        }
    } // logonFind
}
