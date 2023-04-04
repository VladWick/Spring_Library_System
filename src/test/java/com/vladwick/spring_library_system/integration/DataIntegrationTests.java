package com.vladwick.spring_library_system.integration;

import com.vladwick.spring_library_system.model.User;
import com.vladwick.spring_library_system.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class DataIntegrationTests {

    @Autowired
    private UserService userService;

    @Test
    public void addUserTest() {

        // Arrange
        User user = User.builder()
                .name("example")
                .lastName("example")
                .email("example@gmail.com")
                .password("example")
                .role("USER")
                .build();

        // Act
        User savedUser = userService.saveUser(user);

        // Assert
        assertThat(savedUser).isNotNull();
    }
}
