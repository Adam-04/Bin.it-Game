package online.binit.model;
 
import jakarta.persistence.*;
import java.util.UUID;
 
@Entity
@Table(name = "garbage_images")
public class WasteItem {
 
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
 
    @Column(name = "garbagetype", nullable = false)
    private String garbageType;
 
    @Column(name = "path", nullable = false)
    private String path;
 
    public WasteItem() {}
 
    public WasteItem(String garbageType, String path) {
        this.garbageType = garbageType;
        this.path = path;
    }
 
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
 
    public String getGarbageType() { return garbageType; }
    public void setGarbageType(String garbageType) { this.garbageType = garbageType; }
 
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
 
    @Override
    public String toString() {
        return "WasteItem{id=" + id + ", garbageType='" + garbageType + "', path='" + path + "'}";
    }
}
 