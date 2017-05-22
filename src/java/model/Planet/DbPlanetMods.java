/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.Planet;

import dbUtils.DbConn;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.math.BigDecimal;

/**
 *
 * @author Hai
 */
public class DbPlanetMods {
    
    /**
     * input parameters:
     *
     * inputData: an object that holds all the pre-validated fields that the
     * user wants to insert into the database, such as email_address, ...,
     * credit_limit. Remember that all fields in inputData are String type (even
     * the dollar amount credit_limit) because this is PRE-VALIDATED data. dbc:
     * an open DbConn database connection object.
     *
     * output parameter:
     *
     * If record is updated OK, return "" empty string. Otherwise, return a form
     * level error message (e.g., if validation error, something like "please
     * try again", or could be database error, or could be a programmer error.
     */
    public static StringData insert(StringData userData, DbConn dbc) {

        StringData errorMsgs = new StringData();

        System.out.println("In InsertUpdate DbPlanetMods.insert() ready to insert planet with these values: " + userData.toString());

        errorMsgs = validate(userData);
        System.out.println("In InsertUpdate DbPlanetMods.insert()  finished with validation");

        String formMsg = "";

        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            System.out.println("Validation errors: " + errorMsgs.toString());
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;
        } else { // all fields passed validation
            System.out.println("In InsertUpdate DbPlanetMods.insert() passed validation");

            // Start preparing SQL statement
            formMsg = dbc.getErr(); // will be empty string if DB connection is OK.
            if (formMsg.length() == 0) { // db connection is good

                // prepare the statement
                String sql = "INSERT INTO sp17_3344_1_tug25055.planet (planetName, p_descriptor, planet_url, date_Discovered, planet_Size) "
                        + "VALUES (?, ?, ?, ?, ?);";

                // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                // Only difference is that Sally's class takes care of encoding null 
                // when necessary. And it also System.out.prints exception error messages.
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                // Encoding string values into the prepared statement is pretty easy...
                pStatement.setString(1, userData.planetName);
                pStatement.setString(2, userData.planetDescrip);
                pStatement.setString(3, userData.planetURL);
                pStatement.setDate(4, ValidationUtils.dateConversion(userData.dateDiscovered));
                pStatement.setBigDecimal(5, ValidationUtils.decimalConversion(userData.planetSize));

                System.out.println("ready to execute insert");

                // here the INSERT is actually executed
                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                formMsg = pStatement.getErrorMsg();
                System.out.println("Error msg from after executing the insert: " + formMsg);

                if (formMsg.length() == 0) {
                    if (numRows == 1) {
                        formMsg = ""; // This means SUCCESS. Let the JSP page decide how to tell this to the user.
                    } else {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        formMsg = numRows + " records were inserted when exactly 1 was expected.";
                    }
                    System.out.println("Number of records affected: " + numRows);
                }
            } // Db Connection is good - double check, JSP page should not send us a bad one... 
        } // customerId is not null and not empty string.
        errorMsgs.errorMsg = formMsg;
        return errorMsgs;
    } // constructor method
    
    
    /**
     * input parameters:
     *
     * inputData: an object that holds all the pre-validated fields that the
     * user wants to update into the database. Remember that all fields in
 inputData are String type because this is PRE-VALIDATED data. dbc: an
 open DbConn database connection object.

 output parameter:

 If record is updated OK, return "" empty string. Otherwise, return a form
 level error message (e.g., if validation error, something like "please
 try again", or could be database error, or could be a programmer error
 msg).
     */
    public static StringData update(StringData userData, DbConn dbc) {

        StringData errorMsgs = new StringData();

        System.out.println("In InsertUpdate.update() ready to update planet with these values: " + userData.toString());

        if (userData.planetId == null) {
            errorMsgs.errorMsg = "Programmer error: for update, planet Id should not be null.";
            return errorMsgs;
        }
        if (userData.planetId.length() == 0) {
            errorMsgs.errorMsg =  "Programmer error: for update, planet Id should not be empty string.";
            return errorMsgs;
        }

        errorMsgs = validate(userData);
        System.out.println("In InsertUpdate.update() finished with validation");

        String formMsg = "";

        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            System.out.println("Validation errors: " + errorMsgs.toString());
            errorMsgs.errorMsg =  "Please try again";
            return errorMsgs;

        } else { // all fields passed validation
            System.out.println("In InsertUpdate.update() passed validation");

            // Start preparing SQL statement
            formMsg = dbc.getErr(); // will be empty string if DB connection is OK.
            if (formMsg.length() == 0) { // db connection is good

                // prepare the statement
                String sql = "UPDATE sp17_3344_1_tug25055.planet SET planetName = ?, p_descriptor = ?, "
                        + "planet_url = ?, date_Discovered = ?, planet_Size = ? WHERE planet_id = ?";

                // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                // Only difference is that Sally's class takes care of encoding null 
                // when necessary. And it also System.out.prints exception error messages.
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                pStatement.setString(1, userData.planetName);
                pStatement.setString(2, userData.planetDescrip);
                pStatement.setString(3, userData.planetURL);
                pStatement.setDate(4, ValidationUtils.dateConversion(userData.dateDiscovered));
                pStatement.setBigDecimal(5, ValidationUtils.decimalConversion(userData.planetSize));
                pStatement.setInt(6, ValidationUtils.integerConversion(userData.planetId));


                System.out.println("ready to execute update, id is " + userData.planetId);

                // here the UPDATE is actually executed
                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                formMsg = pStatement.getErrorMsg();
                System.out.println("Error msg from after executing the update: " + formMsg);

                if (formMsg.length() == 0) {
                    if (numRows == 1) {
                        formMsg = ""; // This means SUCCESS. Let the JSP page decide how to tell this to the user.
                    } else {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        formMsg = numRows + " records were updated when only 1 was expected.";
                    }
                    System.out.println("Number of records affected: " + numRows);
                }
            } // Db Connection is good - double check, JSP page should not send us a bad one... 
        } // customerId is not null and not empty string.
        errorMsgs.errorMsg = formMsg;
        return errorMsgs;
    } // constructor method
    
        
    public static String deleteById(String id, DbConn dbc) {

        if (id == null) {
            return "Programmer error: for delete, Planet Id should not be null.";
        }
        if (id.length() == 0) {
            return "Programmer error: for delete, Planet Id should not be empty string.";
        }

        String formMsg = dbc.getErr(); // will be empty string if DB connection is OK.

        if (formMsg.length() == 0) { // db connection is good

            // prepare the statement 
            String sql = "DELETE FROM sp17_3344_1_tug25055.planet WHERE planet_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encoding string values into the prepared statement is pretty easy...
            pStatement.setString(1, id);

            // here the DELETE is actually executed (executeUpdate is used for any SQL other than SELECT, 
            // so that includes insert, update, and delete)
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            formMsg = pStatement.getErrorMsg();
            if (formMsg.length() == 0) {
                if (numRows == 1) {
                    formMsg = ""; // This means SUCCESS. Let the JSP page decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    formMsg = numRows + " records were deleted (expected to delete 1).";
                }
            }
        } // Db Connection is good - double check, JSP page should not send us a bad one... 
        return formMsg;
    }
    
    
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        // Validation
        errorMsgs.planetName = ValidationUtils.stringValidationMsg(inputData.planetName, 100, true);    //true for only field required
        errorMsgs.planetDescrip = ValidationUtils.stringValidationMsg(inputData.planetDescrip, 45, false);
        errorMsgs.planetURL = ValidationUtils.stringValidationMsg(inputData.planetURL, 150, false);
        errorMsgs.planetSize = ValidationUtils.decimalValidationMsg(inputData.planetSize, false);
        errorMsgs.dateDiscovered = ValidationUtils.dateValidationMsg(inputData.dateDiscovered, false);
 
        return errorMsgs;
    }
}
