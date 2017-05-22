package model.person;

import java.util.ArrayList;

public class StringDataList {

    public String dbError = "";
    public ArrayList<StringData> personList = new ArrayList();

    public StringDataList() {
    }

    public void add(StringData stringData) {
        this.personList.add(stringData);
    }
}
