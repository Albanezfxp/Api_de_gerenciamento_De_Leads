package com.example.curso_java.Controller;

import com.example.curso_java.Model.Cliente;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/clientes")
public class ClienteController {

    @GetMapping(path = "/qualquer")
    public Cliente obterCliente() {
        return new Cliente(28, "Pedro", "12345677890");
    }

    @GetMapping("/{id}")
    public Cliente obterClientePorId1(@PathVariable int id) {
        return new Cliente(id,"Pedro", "12345678900");
    }

    @GetMapping
    public Cliente obterClientePorId2(@RequestParam(name = "id") int id) {
        return new Cliente(id, "Augusto", "11111111111");
    }
}
