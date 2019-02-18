package com.webSocket.demo.controller;

import com.webSocket.demo.bean.Chat;
import com.webSocket.demo.bean.Message;
import com.webSocket.demo.dao.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tk.mybatis.mapper.entity.Condition;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @author pengfeng
 * @date 2019-02-16
 */
@Controller
@Slf4j
public class WebSocketController {

    @Resource
    private UserMapper userMapper;

    private static final ThreadLocal<Message> tl = new ThreadLocal<>();

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Message greeting(Message message) throws Exception {
        Message message1 = tl.get();
        log.info("用户名:{}",message1.getName());
        message1.setContent(message.getContent());
        return message1;
    }

    @GetMapping("/login")
    public void a(@RequestParam("username")String username,
                  @RequestParam("password")String password,
                  HttpServletResponse response) throws IOException, ServletException {

        Chat chat = new Chat();
        chat.setName(username);
        Condition condition = new Condition(Chat.class);
        condition.createCriteria().andEqualTo("name", username);
        List<Chat> chatList = userMapper.selectByCondition(condition);
        if (!password.equals(chatList.get(0).getPassword())) {
            response.sendRedirect("http://localhost:8085/404.html");
            return;
        }
        Message message = new Message();
        message.setName(username);
        tl.set(message);
        response.sendRedirect("http://localhost:8085/chat.html");
    }
}
