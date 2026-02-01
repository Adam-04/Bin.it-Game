package com.project.Bin_It.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameController {
    @GetMapping("/game-home")
    public String showHomepage() {
        return "game-home-page";
    }

}
