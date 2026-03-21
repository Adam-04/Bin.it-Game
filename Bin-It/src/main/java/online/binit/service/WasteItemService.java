package online.binit.service;
 
import online.binit.model.WasteItem;
import online.binit.repository.WasteItemRepository;
import org.springframework.stereotype.Service;
 
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
 
@Service
public class WasteItemService {
 
    private final WasteItemRepository wasteItemRepository;
 
    public WasteItemService(WasteItemRepository wasteItemRepository) {
        this.wasteItemRepository = wasteItemRepository;
    }
 
    public List<WasteItem> getAllWasteItems() {
        return wasteItemRepository.findAll();
    }
 
    public List<WasteItem> getWasteItemsByType(String garbageType) {
        return wasteItemRepository.findByGarbageType(garbageType);
    }
 
    public WasteItem getWasteItemById(UUID id) {
        return wasteItemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Waste item not found."));
    }
 
    /**
     * Returns a fixed randomized set for Apply mode.
     */
    public List<WasteItem> getRandomWasteItems(int count) {
        List<WasteItem> all = new ArrayList<>(wasteItemRepository.findAll());
        Collections.shuffle(all);
        return all.stream().limit(count).toList();
    }
 
    /**
     * Returns all items shuffled for Arcade mode.
     * Frontend cycles through them for the duration of the timer.
     */
    public List<WasteItem> getAllWasteItemsShuffled() {
        List<WasteItem> all = new ArrayList<>(wasteItemRepository.findAll());
        Collections.shuffle(all);
        return all;
    }
}