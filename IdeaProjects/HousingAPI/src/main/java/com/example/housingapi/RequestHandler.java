package com.example.housingapi;

public class RequestHandler {
    final int len = 985;
    String field;
    String statistic;
    String zipCode;
    String startDate;
    String endDate;
    Date startDateVal;
    Date endDateVal;
    myHouse[] houses = new myHouse[985];

    public RequestHandler(String field, String statistic, String zipCode, String startDate, String endDate) {
        this.field = field;
        this.statistic = statistic;
        this.zipCode = zipCode;
        this.startDate = startDate;
        this.endDate = endDate;

        if (startDate != null) {
            //every date in csv is in may 2008, only need day of the month
            Date inputDate = new Date();
            this.startDateVal = inputDate.inputDate(startDate);
        }
        if (endDate != null) {
            Date inputDate = new Date();
            this.endDateVal = inputDate.inputDate(endDate);
        }
    }

    //functions to return arrays of price or squareFeet depending on user parameters
    public int[] priceArray(myHouse[] houseArray) {
        int arraySize = 0;
        for (int i =0; i< houseArray.length; i++) {
            if (houseArray[i] == null) {
                break;
            }//end if
            else {
                arraySize++;
            }
        }
        int[] priceArray = new int[arraySize];
        for (int i = 0; i < priceArray.length; i++) {
            priceArray[i] = houseArray[i].price;
        }//end for

        return priceArray;
    }//end priceArray

    public int[] squareFeetArray(myHouse[] houseArray) {
        int arraySize = 0;
        for (int i =0; i< houseArray.length; i++) {
            if (houseArray[i] == null) {
                break;
            }//end if
            else {
                arraySize++;
            }
        }
        int[] squareFeetArray = new int[arraySize];
        for (int i = 0; i < squareFeetArray.length; i++) {
            squareFeetArray[i] = houseArray[i].squareFeet;
        }//end for

        return squareFeetArray;
    }//end priceArray

    //create methods for each statistic option
    //returns minimum value in array of integers
    public int min(int[] fieldArray) {
        int i = 0;
        int min = fieldArray[i];
        for (i = 1; i < fieldArray.length; i++) {
            if (fieldArray[i] < min) {
                min = fieldArray[i];
            }
        }//end for
        return min;
    }//end min

    //returns max value in array of integers
    public int max(int[] fieldArray) {
        int max = 0;
        for (int j : fieldArray) {
            if (j > max) {
                max = j;
            }
        }
        return max;
    }

    //returns average value in array of integers
    public int average(int[] fieldArray) {
        int sum = 0;
        for (int i =0; i < fieldArray.length; i++) {
            sum += fieldArray[i];
        }
        return sum / fieldArray.length;
    }//end average()

    //return sum of array of integers
    public int sum(int[] fieldArray) {
        int sum = 0;
        for (int i = 0; i < fieldArray.length; i++) {
            sum += fieldArray[i];
        }
        return sum;
    }

    //return range of array of integers
    public int range(int[] fieldArray) {
        int max = max(fieldArray);
        int min = min(fieldArray);

        return max - min;
    }
}//end RequestHandler
