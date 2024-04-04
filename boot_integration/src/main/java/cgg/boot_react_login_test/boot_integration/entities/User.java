package cgg.boot_react_login_test.boot_integration.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "userDetails")
@Data
public class User {

  @Id
  private Integer empId;

  @Column(name = "user_name")
  private String userName;

  @Column(unique = true, nullable = false)
  private String email;

  private String password;
}
