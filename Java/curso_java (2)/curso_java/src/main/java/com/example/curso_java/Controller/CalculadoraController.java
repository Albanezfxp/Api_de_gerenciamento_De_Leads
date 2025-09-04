package com.example.curso_java.Controller;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/calculadora")
public class CalculadoraController {

    @GetMapping(path = "/somar/{a}/{b}")
    public int somar(@PathVariable  int a, @PathVariable int b) {
        return a + b;
    }

    @GetMapping(path = "/subtrair")
    public int subtrair(@RequestParam(name = "a") int a, @RequestParam(name = "b") int b ) {
        return a - b;
    }
}
