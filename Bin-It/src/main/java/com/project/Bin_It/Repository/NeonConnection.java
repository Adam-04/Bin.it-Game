package com.project.Bin_It.Repository;

import io.github.cdimascio.dotenv.Dotenv;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class NeonConnection {

    private static final Dotenv dotenv = Dotenv.configure().load();
    private static final String CONN_STRING = dotenv.get("DATABASE_URL");

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(CONN_STRING);
    }
}