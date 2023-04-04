package com.vladwick.spring_library_system.integration;

import static org.assertj.core.api.Assertions.assertThat;

import com.vladwick.spring_library_system.controller.GreetingController;
import com.vladwick.spring_library_system.controller.HomeController;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SpringLibrarySystemApplicationTests {

    @Autowired
    private HomeController homeController;
    @Autowired
    private GreetingController helloController;

    @Test
    public void contextLoads() {
        // Assert that context exists
    }

    @Test
    public void contextControllerCreation() {
        // Assert that context is creating my controller
        assertThat(homeController).isNotNull();
    }

    @Test
    public void contextControllerProcessing() {
        // Assert that context is creating my controller
        assertThat(helloController).isNotNull();
    }
}
