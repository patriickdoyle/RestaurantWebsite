package com.example.housingapi;

public class Date {
    int month;
    int day;
    int year;
    int dateWeight;

    public Date csvDate(int day) {
        Date inputDate = new Date();
        inputDate.month = 5;
        inputDate.day = day;
        inputDate.year = 2008;
        inputDate.dateWeight = inputDate.month + inputDate.year + inputDate.day;
        return inputDate;
    }

    public Date inputDate(String input) {
        Date inputDate = new Date();
        inputDate.month = Integer.parseInt(input.substring(0,2));
        inputDate.day = Integer.parseInt(input.substring(3,5));
        inputDate.year = Integer.parseInt(input.substring(6,10));
        inputDate.dateWeight = inputDate.month + inputDate.year + inputDate.day;
        return inputDate;
    }//end inputDate
}
