package cgg.boot_react_login_test.boot_integration.controller;

import cgg.boot_react_login_test.boot_integration.dto.UserDTO;
import cgg.boot_react_login_test.boot_integration.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/test")
  public String hello() {
    return "Hello";
  }

  @PostMapping("/register")
  public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {
    try {
      //   userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
      UserDTO registeredUser = userService.createUser(userDTO);
      return new ResponseEntity<UserDTO>(registeredUser, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<UserDTO>(userDTO, HttpStatusCode.valueOf(409));
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO) {
    UserDTO userr = userService.getUserByEmail(userDTO.getEmail());
    if (
      userr != null &&
      //   passwordEncoder.matches(userDTO.getPassword(), userr.getPassword())
      userDTO.getPassword().equals(userr.getPassword())
    ) {
      return ResponseEntity.ok(userr);
    } else {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body("Invalid username or password !");
    }
  }
}
