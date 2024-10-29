package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String content;

    // Constructors, getters and setters
    public Post() {}

    public Post(String content) {
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

  package com.example.demo.repository;

import com.example.demo.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
  package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class PostController {
    @Autowired
    private PostRepository postRepository;

    @GetMapping("/")
    public String index(Model model) {
        List<Post> posts = postRepository.findAll();
        model.addAttribute("posts", posts);
        return "index";
    }

    @PostMapping("/submit")
    public String submitPost(@RequestParam String content) {
        Post post = new Post(content);
        postRepository.save(post);
        return "redirect:/";
    }
}
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>匿名投稿</title>
</head>
<body>
    <h1>匿名投稿</h1>
    <form action="/submit" method="post">
        <textarea name="content" rows="4" cols="50" required></textarea><br>
        <button type="submit">提交</button>
    </form>

    <h2>投稿列表</h2>
    <ul>
        <th:block th:each="post : ${posts}">
            <li th:text="${post.content}"></li>
        </th:block>
    </ul>
</body>
</html>
