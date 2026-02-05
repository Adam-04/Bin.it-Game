package com.project.Bin_It.Repository;

import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;


public class ReadTable {

    public List<String> readBooks() {
        List<String> books = new ArrayList<>();

        try (Connection conn = NeonConnection.getConnection();
             Statement stmt = conn.createStatement()) {

            String sql = "SELECT * FROM books ORDER BY publication_year;";
            try (ResultSet rs = stmt.executeQuery(sql)) {
                while (rs.next()) {
                    books.add(
                        String.format(
                            "ID: %d, Title: %s, Author: %s, Year: %d, In Stock: %b",
                            rs.getInt("id"),
                            rs.getString("title"),
                            rs.getString("author"),
                            rs.getInt("publication_year"),
                            rs.getBoolean("in_stock")
                        )
                    );
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to read books", e);
        }

        return books;
    }
}