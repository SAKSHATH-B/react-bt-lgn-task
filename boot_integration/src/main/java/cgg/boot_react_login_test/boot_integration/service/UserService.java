package cgg.boot_react_login_test.boot_integration.service;

import cgg.boot_react_login_test.boot_integration.dto.UserDTO;
import cgg.boot_react_login_test.boot_integration.exception.ResourceNotFoundException;
import java.util.List;

public interface UserService {
  List<UserDTO> getAllUsers();
  UserDTO createUser(UserDTO userDTO);
  UserDTO updateUser(int id, UserDTO userDTO);
  void deleteUser(int id) throws ResourceNotFoundException;
  UserDTO getUserByEmail(String email);
}
