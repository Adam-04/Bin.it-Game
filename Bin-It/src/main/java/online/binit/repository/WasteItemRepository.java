package online.binit.repository;
 
import online.binit.model.WasteItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
import java.util.UUID;
 
@Repository
public interface WasteItemRepository extends JpaRepository<WasteItem, UUID> {
    List<WasteItem> findByGarbageType(String garbageType);
}
 