package model.Planet;

public class StringData {

    // select country_id, country_name, flag_abbrev, flag_URL from country_flag
    public String planetId = "";
    public String planetName = "";
    public String planetSize = "";
    public String dateDiscovered = "";
    public String planetDescrip = "";
    public String planetURL = "";
    public String errorMsg = "";
    
    // default constructor leaves all data members with empty string.
    public StringData() {

    }

    public int getCharacterCount() {
        String s = this.planetId + this.planetName + this.planetSize 
                + this.dateDiscovered + this.planetDescrip + this.planetURL;
        return s.length();
    }

    public String toString() {
        return "planetId:" + this.planetId
                + ", planetName:" + this.planetName
                + ", planetSize:" + this.planetSize
                + ", dateDiscovered:" + this.dateDiscovered
                + ", planetDescrip:" + this.planetDescrip
                + ", planetURL:" + this.planetURL;
    }
}

