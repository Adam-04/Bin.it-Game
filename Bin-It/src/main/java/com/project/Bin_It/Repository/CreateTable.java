package com.project.Bin_It.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;

public class CreateTable {

    public void initializeBooksTable() {
        try (Connection conn = NeonConnection.getConnection();
             Statement stmt = conn.createStatement()) {

            stmt.execute("DROP TABLE IF EXISTS books;");

            stmt.execute("""
                CREATE TABLE books (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    author VARCHAR(255),
                    publication_year INT,
                    in_stock BOOLEAN DEFAULT TRUE
                );
            """);

            String insertSql =
                "INSERT INTO books (title, author, publication_year, in_stock) VALUES (?, ?, ?, ?)";

            try (PreparedStatement pstmt = conn.prepareStatement(insertSql)) {
                Object[][] books = {
                    {"The Catcher in the Rye", "J.D. Salinger", 1951, true},
                    {"The Hobbit", "J.R.R. Tolkien", 1937, true},
                    {"1984", "George Orwell", 1949, true},
                    {"Dune", "Frank Herbert", 1965, false}
                };

                for (Object[] book : books) {
                    pstmt.setString(1, (String) book[0]);
                    pstmt.setString(2, (String) book[1]);
                    pstmt.setInt(3, (Integer) book[2]);
                    pstmt.setBoolean(4, (Boolean) book[3]);
                    pstmt.addBatch();
                }

                pstmt.executeBatch();
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize books table", e);
        }
    }
}