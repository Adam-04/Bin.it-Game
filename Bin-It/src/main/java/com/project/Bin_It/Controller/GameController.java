package com.project.Bin_It.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.Bin_It.Repository.*;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:5173/")
public class GameController {

    private final ReadTable readData = new ReadTable();
    private final CreateTable createTable = new CreateTable();

    @GetMapping("/books")
    public ResponseEntity<?> getBooks() {
        return ResponseEntity.ok(readData.readBooks());
    }

    @PostMapping("/books/init")
    public ResponseEntity<?> initBooks() {
        createTable.initializeBooksTable();
        return ResponseEntity.ok("Books table initialized");
    }
}