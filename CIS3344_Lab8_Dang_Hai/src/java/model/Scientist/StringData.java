package model.Scientist;


public class StringData {

    // select country_id, country_name, flag_abbrev, flag_URL from country_flag
    public String scientistId = "";
    public String scientistEmail = "";
    public String scientistPassword = "";
    public String scientistName = "";
    public String userRole = "";
    public String errorMsg = "";
    
    // default constructor leaves all data members with empty string.
    public StringData() {

    }

    public int getCharacterCount() {
        String s = this.scientistId + this.scientistEmail + this.scientistPassword 
                + this.scientistName + this.userRole;
        return s.length();
    }

    public String toString() {
        return "scientistId:" + this.scientistId
                + ", scientistEmail:" + this.scientistEmail
                + ", scientistPassword:" + this.scientistPassword
                + ", scientistName:" + this.scientistName
                + ", userRole:" + this.userRole;
    }
}

