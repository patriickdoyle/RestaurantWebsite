
package com.example.housingapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.*;
import javax.annotation.PostConstruct;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.Objects;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class HousingApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(HousingApiApplication.class, args);
    }

    //constant value: # of homes in csv
    final int len = 985;

    //create array of myHouse objects from csv file immediately
    @PostConstruct
    public myHouse[] csvParser() throws IOException {
        Reader in = new FileReader("data.csv");
        Iterable<CSVRecord> records = CSVFormat.EXCEL.withHeader().parse(in);

        //create array of myHouse objects, populate with data
        myHouse[] houseArray = new myHouse[len];
        int i = 0; //i = houseArray index
        for (CSVRecord record : records) {
            houseArray[i] = new myHouse(record.get("street"), record.get("city"), record.get("zip"),
                    record.get("state"), Integer.parseInt(record.get("beds")), Integer.parseInt(record.get("baths")),
                    Integer.parseInt(record.get("sq__ft")), record.get("type"), record.get("sale_date"),
                    Integer.parseInt(record.get("price")), Float.parseFloat(record.get("latitude")),
                    Float.parseFloat(record.get("longitude")));

            i++;
        }//end for

        return houseArray;
    }//end csvParser

    @GetMapping("/housing-data")
    @ResponseBody
    public String getData(@RequestParam String field, @RequestParam String statistic,
                          @RequestParam(required = false) String zipCode, @RequestParam(required = false) String startDate,
                          @RequestParam(required = false) String endDate) throws IOException {
        myHouse[] houseArray = csvParser(); //array contains data for entire csv file
        RequestHandler myHandler = new RequestHandler(field, statistic, zipCode, startDate, endDate);
        String returnVal = "";
        int[] fieldArray;

        //filter out entries by optional parameters and insert valid ones into newArray
        myHouse[] newArray = new myHouse[len];
        if (zipCode == null && startDate == null && endDate == null) {
            newArray = houseArray;
        }//end if
        else if (zipCode != null && startDate == null && endDate == null) {
            for (int i = 0, j = 0; i < len; i++) {
                if (zipCode.equals(houseArray[i].zip)) {
                    newArray[j] = houseArray[i];
                    j++;
                }
            }
        } else if (zipCode == null && startDate != null && endDate == null) {
            for (int i = 0, j = 0; i < len; i++) {
                if (myHandler.startDateVal.dateWeight < houseArray[i].saleDateVal.dateWeight) {
                    newArray[j] = houseArray[i];
                    j++;
                }//end if
            }//end for
        }//end else if

        else if (zipCode == null && startDate == null && endDate != null) {
            for (int i = 0, j = 0; i < len; i++) {
                if (myHandler.endDateVal.dateWeight > houseArray[i].saleDateVal.dateWeight) {
                    newArray[j] = houseArray[i];
                    j++;
                }//end if
            }//end for
        }//end else if

        else if (zipCode != null && startDate != null && endDate == null) {
            for (int i = 0, j = 0; i < len; i++) {
                if (myHandler.startDateVal.dateWeight < houseArray[i].saleDateVal.dateWeight &&
                        Objects.equals(houseArray[i].zip, zipCode)) {
                    newArray[j] = houseArray[i];
                    j++;
                }//end if
            }//end for
        }//end else if
        else if (zipCode != null && startDate == null && endDate != null) {
            for (int i = 0, j = 0; i < len; i++) {
                if (myHandler.endDateVal.dateWeight > houseArray[i].saleDateVal.dateWeight &&
                        Objects.equals(houseArray[i].zip, zipCode)) {
                    newArray[j] = houseArray[i];
                    j++;
                }//end if
            }//end for
        }//end else if

        else if (zipCode != null && startDate != null && endDate != null) {
            for (int i = 0, j = 0; i < len; i++) {
                if (myHandler.endDateVal.dateWeight > houseArray[i].saleDateVal.dateWeight &&
                        myHandler.startDateVal.dateWeight < houseArray[i].saleDateVal.dateWeight &&
                        Objects.equals(houseArray[i].zip, zipCode)) {
                    newArray[j] = houseArray[i];
                    j++;
                }//end if
            }//end for
        }//end else if
        else if (zipCode == null && startDate != null && endDate != null) {
            for (int i = 0, j = 0; i < len; i++) {
                if (myHandler.endDateVal.dateWeight > houseArray[i].saleDateVal.dateWeight &&
                        myHandler.startDateVal.dateWeight < houseArray[i].saleDateVal.dateWeight) {
                    newArray[j] = houseArray[i];
                    j++;
                }//end if
            }//end for
        }//end else if

        //handle field args
        if (Objects.equals(field, "price")) {
            fieldArray = myHandler.priceArray(newArray);
        }//end if
        else if (Objects.equals(field, "squareFeet")) {
            fieldArray = myHandler.squareFeetArray(newArray);
        }//end else if
        else {
            returnVal = "Error. Field can be either 'price' or 'squarefeet'";
            return returnVal;
        }//end else

        //handle statistic args
        int statVal;
        if (Objects.equals(statistic, "min")) {
            statVal = myHandler.min(fieldArray);
        }//end if
        else if (Objects.equals(statistic, "max")) {
            statVal = myHandler.max(fieldArray);
        }//end else if
        else if (Objects.equals(statistic, "average")) {
            statVal = myHandler.average(fieldArray);
        }//end else if
        else if (Objects.equals(statistic, "sum")) {
            statVal = myHandler.sum(fieldArray);
        }//end else if
        else if (Objects.equals(statistic, "range")) {
            statVal = myHandler.range(fieldArray);
        }//end else if
        else {
            returnVal = "Error. Statistic can be: 'min','max','average','sum','range'";
            return returnVal;
        }//end else
        returnVal = "result: " + statVal + "\n" + "numHouses: " + fieldArray.length;
        return returnVal;
    }//end getData
}