package com.example.curso_java.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrimeiroController {

    @GetMapping(path = "ola")
    public String ola() {
        return "Olá Spring Boot!";
    }
}
