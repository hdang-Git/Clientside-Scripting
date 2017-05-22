package model.CountryFlag;

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
    public StringDataList(String countryNameStartsWith, DbConn dbc) {

        StringData sd = new StringData();

        System.out.println("Searching for countries that start with " + countryNameStartsWith);

        try {

            String sql = "SELECT country_id, country_name, flag_abbrev, flag_URL FROM country_flag "
                    + " WHERE country_name LIKE ? ORDER BY country_name";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, countryNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                try {
                    sd = new StringData();
                    sd.countryId = FormatUtils.formatInteger(results.getObject("country_id"));
                    sd.countryName = FormatUtils.formatString(results.getObject("country_name"));
                    sd.flagAbbrev = FormatUtils.formatString(results.getObject("flag_abbrev"));
                    sd.flagURL = FormatUtils.formatString(results.getObject("flag_URL"));
                    this.recordList.add(sd);
                } catch (Exception e) {
                    sd.errorMsg = "Record Level Error in model.CountryFlag.StringDataList Constructor: " + e.getMessage();
                    this.recordList.add(sd);
                }
            } // while
        } catch (Exception e) {
            this.dbError = "List Level Error in model.CountryFlag.StringDataList Constructor: " + e.getMessage();
        }
    } // method

} // class
