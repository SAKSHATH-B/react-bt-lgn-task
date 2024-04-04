package cgg.boot_react_login_test.boot_integration.service.impl;

import cgg.boot_react_login_test.boot_integration.dto.UserDTO;
import cgg.boot_react_login_test.boot_integration.entities.User;
import cgg.boot_react_login_test.boot_integration.exception.ResourceNotFoundException;
import cgg.boot_react_login_test.boot_integration.repo.UserRepo;
import cgg.boot_react_login_test.boot_integration.service.UserService;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepo userRepo;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public List<UserDTO> getAllUsers() {
    List<User> allUsers = userRepo.findAll();
    List<UserDTO> userDtos = allUsers
      .stream()
      .map(user -> userToUserDTO(user))
      .collect(Collectors.toList());
    return userDtos;
  }

  @Override
  public UserDTO createUser(UserDTO userDTO) {
    User userDTOtoUser = userDTOtoUser(userDTO);
    User savedUser = userRepo.save(userDTOtoUser);
    return userToUserDTO(savedUser);
  }

  @Override
  public UserDTO updateUser(int id, UserDTO userDTO) {
    User existingUser = userRepo.findById(id).orElseThrow();
    existingUser.setEmail(userDTO.getEmail());
    existingUser.setUserName(userDTO.getUserName());
    existingUser.setPassword(userDTO.getPassword());
    User updatedUser = userRepo.save(existingUser);
    return userToUserDTO(updatedUser);
  }

  @Override
  public void deleteUser(int id) throws ResourceNotFoundException {
    User user = userRepo
      .findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
    userRepo.delete(user);
  }

  @Override
  public UserDTO getUserByEmail(String email) {
    User user = userRepo.findByEmail(email).orElseThrow();
    return userToUserDTO(user);
  }

  public User userDTOtoUser(UserDTO userDTO) {
    return modelMapper.map(userDTO, User.class);
  }

  public UserDTO userToUserDTO(User user) {
    return modelMapper.map(user, UserDTO.class);
  }
}
