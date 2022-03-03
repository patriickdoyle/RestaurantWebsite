package com.example.housingapi;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class HousingApiApplicationTests {

    //test the csv parsers output for the first and last objects of the array returned
    //from csvParser(). If the first and last are correct, its reasonable to assume the ones
    //between are as well.
    @Test
    void csvParserTest1() throws IOException {
        //test that the first object in the array returned
        //has the same fields as the first line of the csv file
        HousingApiApplication obj = new HousingApiApplication();
        myHouse[] testHouse = obj.csvParser();
        String output = testHouse[0].street + testHouse[0].city + testHouse[0].zip + testHouse[0].state
                + testHouse[0].beds + testHouse[0].baths + testHouse[0].squareFeet + testHouse[0].type
                + testHouse[0].saleDate + testHouse[0].price; //leave out latitude longitude, not used in program
        String expectedOutput = "3526 HIGH STSACRAMENTO95838CA21836ResidentialWed May 21 00:00:00 EDT 200859222";
        assertEquals(expectedOutput, output);
    }
    @Test
    void csvParserTest2() throws IOException {
        //test that the last object in the array returned
        //has the same fields as the last line of the csv file
        HousingApiApplication obj = new HousingApiApplication();
        myHouse[] testHouse = obj.csvParser();
        String output = testHouse[984].street + testHouse[984].city + testHouse[984].zip + testHouse[984].state
                + testHouse[984].beds + testHouse[984].baths + testHouse[984].squareFeet + testHouse[984].type
                + testHouse[984].saleDate + testHouse[984].price; //leave out latitude longitude, not used in program
        String expectedOutput = "3882 YELLOWSTONE LNEL DORADO HILLS95762CA321362ResidentialThu May 15 00:00:00 EDT 2008235738";
        //change expectedOuput and test will fail
        assertEquals(expectedOutput, output);
    }

    //write tests for filtering the csv file based on query parameters
    @Test
    void filterTest1() throws IOException {
        HousingApiApplication obj = new HousingApiApplication();
        String output = obj.getData("price", "max", null, null, null);
        //max price of objects in csv can be found using excel. it should be 884790
        String expectedOutput = "result: 884790\nnumHouses: 985"; //change this value and test will fail
        assertEquals(expectedOutput, output);
    }

    @Test
    void filterTest2 () throws IOException {
        HousingApiApplication obj = new HousingApiApplication();
        String output = obj.getData("squareFeet", "min", "95838", null, null);
        //min squareFeet of objects in zip 95838 can be found using excel. it should be 0 (somehow)
        String expectedOutput = "result: 0\nnumHouses: 37"; //change this value and test will fail
        assertEquals(expectedOutput, output);
    }

    //write tests for calculation functions
    @Test
    void statisticTest1 () {
        //dont need arguments to test stat calculating functions
        RequestHandler myHandler = new RequestHandler(null, null, null, null, null);
        int array[] = {12, 22, 76, 32, 99, 83, 44, 19, 22, 43, 91, 300, 7707};
        int output = myHandler.max(array);
        int expectedOutput = 7707;//change this value and the test will fail
        assertEquals(expectedOutput, output);
    }

    @Test
    void statisticTest2 () {
        //dont need arguments to test stat calculating functions
        RequestHandler myHandler = new RequestHandler(null, null, null, null, null);
        int array[] = {12, 22, 76, 32, 99, 83, 44, 19, 22, 43, 91, 300, 7707};
        int output = myHandler.average(array);
        //average of this array is 657.6923... but Java rounds down
        int expectedOutput = 657;//change this value and the test will fail
        assertEquals(expectedOutput, output);
    }

    //date tests
    @Test
    void dateTest1 () throws IOException {
        HousingApiApplication app = new HousingApiApplication();
        String output = app.getData("squareFeet", "max", null, null, "05-16-2008");
        String expectedOutput = "result: 2280\nnumHouses: 118"; //acquired using excel
        assertEquals(expectedOutput, output);
    }

    @Test
    void dateTest2 () throws IOException {
        HousingApiApplication app = new HousingApiApplication();
        String output = app.getData("squareFeet", "average", null, "05-14-2008", "05-21-2008");
        String expectedOutput = "result: 1269\nnumHouses: 827"; //acquired using excel
        assertEquals(expectedOutput, output);
    }

    @Test
    void dateTest3 () throws IOException {
        HousingApiApplication app = new HousingApiApplication();
        String output = app.getData("price", "average", null, "05-14-2008", "05-21-2008");
        String expectedOutput = "result: 232028\nnumHouses: 827"; //acquired using excel
        assertEquals(expectedOutput, output);
    }


}
