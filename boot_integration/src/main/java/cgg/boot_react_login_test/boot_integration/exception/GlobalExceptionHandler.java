package cgg.boot_react_login_test.boot_integration.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public void handleResourceNotFound(ResourceNotFoundException e) {
    System.out.println(e.getMessage());
  }
}
