package cgg.boot_react_login_test.boot_integration.repo;

import cgg.boot_react_login_test.boot_integration.entities.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
  Optional<User> findByEmail(String email);
}
