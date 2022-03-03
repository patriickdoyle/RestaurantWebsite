package com.example.housingapi;
public class myHouse {
    //create a field for each column name in csv
    String street;
    String city;
    String zip;
    String state;
    int beds;
    int baths;
    int squareFeet;
    String type;
    String saleDate;
    Date saleDateVal;
    int price;
    float latitude;
    float longitude;

    //constructor method
    public myHouse(String street, String city, String zip, String state,
                   int beds, int baths, int squareFeet, String type, String saleDate,
                   int price, float latitude, float longitude) {
        this.street = street;
        this.city = city;
        this.zip = zip;
        this.state = state;
        this.beds = beds;
        this.baths = baths;
        this.squareFeet = squareFeet;
        this.type = type;
        this.saleDate = saleDate;
        this.price = price;
        this.latitude = latitude;
        this.longitude = longitude;

        Date myDate = new Date();
        this.saleDateVal = myDate.csvDate(Integer.parseInt(saleDate.substring(8,10)));
    }
}
