package model.Planet;

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
    public StringDataList(String planetNameStartsWith, DbConn dbc) {

        StringData sd = new StringData();

        System.out.println("Searching for planets that start with " + planetNameStartsWith);

        try {

            String sql = "SELECT planetName, planet_id, planet_Size, date_Discovered, p_descriptor, planet_url " +
                         "FROM sp17_3344_1_tug25055.planet " +
                         "WHERE planetName LIKE ? ORDER BY planetName;";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, planetNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                try {
                    sd = new StringData();
                    sd.planetId = FormatUtils.formatInteger(results.getObject("planet_id"));
                    sd.planetName = FormatUtils.formatString(results.getObject("planetName"));
                    sd.planetSize = FormatUtils.formatDouble(results.getObject("planet_Size"));
                    sd.dateDiscovered = FormatUtils.formatDate(results.getObject("date_Discovered"));
                    sd.planetDescrip = FormatUtils.formatString(results.getObject("p_descriptor"));
                    sd.planetURL = FormatUtils.formatString(results.getObject("planet_url"));
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

} // class
