package model.Scientist;

import model.Scientist.*;
import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class StringDataList {

    public String dbError = "";
    private ArrayList<StringData> recordList = new ArrayList();

    // Default constructor just leaves the 2 data members initialized as above
    public StringDataList() {
    }

    // overloaded constructor populates the list (and possibly the dbError) 
    //filters on user input
    /* Uncomment if you want to do server side filtering
    public StringDataList(String planetNameStartsWith, DbConn dbc) {

        StringData sd = new StringData();

        System.out.println("Searching for planets that start with " + planetNameStartsWith);

        try {

            String sql = "SELECT scientist_id, scientist_email, scientist_password, scientist_Name, user_role\n" +
                         "FROM sp17_3344_1_tug25055.scientist \n" +
                         "WHERE scientist_email LIKE ? ORDER BY scientist_Name";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, planetNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                try {
                    sd = new StringData();
                    sd.scientistId = FormatUtils.formatInteger(results.getObject("scientist_id"));
                    sd.scientistEmail = FormatUtils.formatString(results.getObject("scientist_email"));
                    sd.scientistPassword = FormatUtils.formatString(results.getObject("scientist_password"));
                    sd.scientistName = FormatUtils.formatString(results.getObject("scientist_Name"));
                    sd.userRole = FormatUtils.formatString(results.getObject("user_role"));



                    this.recordList.add(sd);
                } catch (Exception e) {
                    sd.errorMsg = "Record Level Error in model.Planet.StringDataList Constructor: " + e.getMessage();
                    this.recordList.add(sd);
                }
            } // while
        } catch (Exception e) {
            this.dbError = "List Level Error in model.Planets.StringDataList Constructor: " + e.getMessage();
        }
    } // method
    */
    
    //method to add StringData of planet ot arraylist
    public void add(StringData stringData) {
        this.recordList.add(stringData);
    }

} // class
