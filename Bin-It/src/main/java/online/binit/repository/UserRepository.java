package online.binit.repository;
 
import online.binit.model.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserDetail, UUID> {
    Optional<UserDetail> findByUsername(String username);
    Optional<UserDetail> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}