package com.backend.vote.user;

import com.backend.vote.validaition.CpfValidation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService service;
    private CpfValidation cpfValidation;

    @GetMapping
   public  ResponseEntity <List<User>> findAll(){
        List<User> users = service.findAll();
        return ResponseEntity.ok().body(users);
    }
    @GetMapping(value = "/id={id}")
    public ResponseEntity<User> findById(@PathVariable("id") Long id) {
        User obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping(value = "/document={document}")
    public ResponseEntity<User> findByDocument(@PathVariable("document") String document) {
        User obj = service.findByDocument(document);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<User> insert(@RequestBody User obj) {
        if (service.findByDocument(obj.getDocument()) != null && cpfValidation.iscpf(obj.getDocument())) {
                obj = service.insert(obj);
                URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                        .buildAndExpand(obj.getId()).toUri();
                return ResponseEntity.created(uri).body(obj);
        } else {
            log.info("User already exists in database");
            return null;
        }
    }
}
