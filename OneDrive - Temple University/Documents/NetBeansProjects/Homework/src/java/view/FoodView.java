package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.food.*;

// classes in my project
import dbUtils.*;

public class FoodView {

    public static StringDataList getAllFood(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT food_id, food_name, food_img, food_date_ordered, food_rating, food_description,"
                    + "food.web_user_id, user_email, user_password "
                    + "FROM web_user, food where web_user.web_user_id = food.web_user_id "
                    + "ORDER BY food_id ";  // you always want to order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the formatUtils methods do not throw exceptions, but if they find illegal data, they write 
                // a message right in the field that they are trying to format.

                // plainInteger returns integer converted to string with no commas.
                sd.foodId = FormatUtils.plainInteger(results.getObject("food_id"));
                sd.foodName = FormatUtils.formatString(results.getObject("food_name"));
                sd.foodImg = FormatUtils.formatString(results.getObject("food_img"));
                sd.foodDateOrdered = FormatUtils.formatDate(results.getObject("food_date_ordered"));
                sd.foodRating = FormatUtils.plainInteger(results.getObject("food_rating"));
                sd.foodDescription = FormatUtils.formatString(results.getObject("food_description"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("food.web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                sd.userPassword = FormatUtils.formatString(results.getObject("user_password"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in FoodView.getAllFood(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}