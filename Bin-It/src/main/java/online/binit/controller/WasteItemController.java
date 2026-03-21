package online.binit.controller;
 
import online.binit.model.WasteItem;
import online.binit.service.WasteItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
import java.util.UUID;
 
@RestController
@RequestMapping("/waste")
public class WasteItemController {
 
    private final WasteItemService wasteItemService;
 
    public WasteItemController(WasteItemService wasteItemService) {
        this.wasteItemService = wasteItemService;
    }
 
    @GetMapping
    public ResponseEntity<List<WasteItem>> getAllWasteItems() {
        return ResponseEntity.ok(wasteItemService.getAllWasteItems());
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<WasteItem> getWasteItemById(@PathVariable UUID id) {
        return ResponseEntity.ok(wasteItemService.getWasteItemById(id));
    }
 
    @GetMapping("/type/{garbageType}")
    public ResponseEntity<List<WasteItem>> getByType(@PathVariable String garbageType) {
        return ResponseEntity.ok(wasteItemService.getWasteItemsByType(garbageType));
    }
 
    @GetMapping("/random")
    public ResponseEntity<List<WasteItem>> getRandom(
            @RequestParam(defaultValue = "10") int count) {
        return ResponseEntity.ok(wasteItemService.getRandomWasteItems(count));
    }
 
    @GetMapping("/random/arcade")
    public ResponseEntity<List<WasteItem>> getArcadeItems() {
        return ResponseEntity.ok(wasteItemService.getAllWasteItemsShuffled());
    }
}