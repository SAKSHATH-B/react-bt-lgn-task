package cgg.boot_react_login_test.boot_integration.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceNotFoundException extends Exception {

  public String message;

  public ResourceNotFoundException(String resName, String field, int id) {
    message = "Resource not found: " + resName + " " + field + " " + id;
  }
}
