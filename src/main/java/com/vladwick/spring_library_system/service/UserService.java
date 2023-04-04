package com.vladwick.spring_library_system.service;

import com.vladwick.spring_library_system.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    List<User> getAllUsers();

    User saveUser(User User);

    User updateUser(User User);

    User getUserById(Long id);

    void deleteUserById(Long id);

}
