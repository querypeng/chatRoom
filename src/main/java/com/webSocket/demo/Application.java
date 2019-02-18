package com.webSocket.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tk.mybatis.spring.annotation.MapperScan;

/**
 * @author pengfeng
 * @date 2019-02-17
 */
@SpringBootApplication
@MapperScan(basePackages = "com.webSocket.demo.dao")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}
