/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.Planet.StringData;
import model.Planet.StringDataList;

/**
 *
 * @author Hai
 */
public class PlanetView {
    
        //Formats each property of the record into StringData object
        public static StringData extractPlanet(ResultSet results) {
        StringData planet = new StringData();
        try {
            planet.planetId = FormatUtils.formatInteger(results.getObject("planet_id"));
            planet.planetName = FormatUtils.formatString(results.getObject("planetName"));
            planet.planetSize = FormatUtils.formatDouble(results.getObject("planet_Size"));
            planet.dateDiscovered = FormatUtils.formatDate(results.getObject("date_Discovered"));
            planet.planetDescrip = FormatUtils.formatString(results.getObject("p_descriptor"));
            planet.planetURL = FormatUtils.formatString(results.getObject("planet_url"));
        } catch (Exception e) {
            planet.errorMsg = "Data Exception thrown in PlanetView.extractPlanet(): " + e.getMessage();
            System.out.println("*****" + planet.errorMsg);
        }
        return planet;
    }

    //Returns back an arraylist of StringData planet objects from the sql query.
    public static StringDataList buildPlanetList(DbConn dbc) {

        StringDataList planetList = new StringDataList();

        planetList.dbError = dbc.getErr();
        if (planetList.dbError.length() == 0) {
            
            String sql = "SELECT planetName, planet_id, planet_Size, date_Discovered, p_descriptor, planet_url " +
                         "FROM sp17_3344_1_tug25055.planet ORDER BY planetName;";
            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                ResultSet results = stmt.executeQuery();

                while (results.next()) {
                    planetList.add(extractPlanet(results));
                }
            } catch (Exception e) {
                planetList.dbError = "SQL Exception thrown in PlanetView.BuildPlanetList(): " + e.getMessage();
                System.out.println("*****" + planetList.dbError);
            }
        }
        return planetList;
    }
    
    
    public static StringData findPlanetById(DbConn dbc, String id) {

        StringData planet = new StringData();

        if (id == null) {
            planet.errorMsg = "Cannot find planet with null id.";
            return planet;
        }

        planet.errorMsg = dbc.getErr();
        if (planet.errorMsg.length() == 0) {

            String sql = "SELECT planetName, planet_id, planet_Size, date_Discovered, p_descriptor, planet_url " +
                         "FROM sp17_3344_1_tug25055.planet WHERE planet_id = ?";

            try {
                PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
                stmt.setString(1, id);
                ResultSet results = stmt.executeQuery();

                if (results.next()) {
                    planet = extractPlanet(results);
                }
            } catch (Exception e) {
                planet.errorMsg = "SQL Exception thrown in PlanetView.findPlanetById(): " + e.getMessage();
                System.out.println("*****" + planet.errorMsg);
            }
        }
        return planet;
    }
}
