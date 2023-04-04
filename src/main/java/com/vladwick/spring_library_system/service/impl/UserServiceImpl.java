package com.vladwick.spring_library_system.service.impl;

import com.vladwick.spring_library_system.model.User;
import com.vladwick.spring_library_system.repository.BookRepository;
import com.vladwick.spring_library_system.repository.UserRepository;
import com.vladwick.spring_library_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
//        User userToUpdate = userRepository.getUserById(user.getId());
//        userToUpdate.setEmail(user.getEmail());
//        userToUpdate.setPassword(user.getPassword());
//        userToUpdate.setName(user.getName());
//        userToUpdate.setRole(user.getRole());
//        userToUpdate.setLastName(user.getLastName());
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findUserById(id);
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}
