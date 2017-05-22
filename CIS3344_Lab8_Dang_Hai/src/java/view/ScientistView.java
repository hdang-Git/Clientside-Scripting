package view;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.Scientist.StringData;
import model.Scientist.StringDataList;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Hai Dang
 */
public class ScientistView {
    
    
        //Formats each property of the record into StringData object
        public static StringData extractScientist(ResultSet results) {
        StringData scientist = new StringData();
        try {
            scientist.scientistId = FormatUtils.formatInteger(results.getObject("scientist_id"));
            scientist.scientistEmail = FormatUtils.formatString(results.getObject("scientist_email"));
            scientist.scientistPassword = FormatUtils.formatString(results.getObject("scientist_password"));
            scientist.scientistName = FormatUtils.formatString(results.getObject("scientist_Name"));
            scientist.userRole = FormatUtils.formatString(results.getObject("user_role"));
            System.out.println(scientist.toString());
        } catch (Exception e) {
            scientist.errorMsg = "Data Exception thrown in ScientistView.extractPlanet(): " + e.getMessage();
            System.out.println("*****" + scientist.errorMsg);
        }
        return scientist;
    }

    //Returns back an arraylist of StringData planet objects from the sql query.
    public static StringDataList buildScientistList(DbConn dbc) {

        StringDataList scientistList = new StringDataList();

        scientistList.dbError = dbc.getErr();
        if (scientistList.dbError.length() == 0) {
            
            String sql = "SELECT scientist_id, scientist_email, scientist_password, scientist_Name, user_role " +
                         "FROM sp17_3344_1_tug25055.scientist ORDER BY scientist_Name;";
            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                ResultSet results = stmt.executeQuery();

                while (results.next()) {
                    scientistList.add(extractScientist(results));
                }
            } catch (Exception e) {
                scientistList.dbError = "SQL Exception thrown in ScientistView.buildScientistList(): " + e.getMessage();
                System.out.println("*****" + scientistList.dbError);
            }
        }
        return scientistList;
    }
    
}
