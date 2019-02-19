package com.webSocket.demo.config;

import tk.mybatis.mapper.common.ConditionMapper;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/**
 * @auther: pengfeng
 * @date: 2019/2/18
 */
public interface MyMapper<T> extends Mapper<T>, MySqlMapper<T>, ConditionMapper<T> {
    //！！！特别注意，该接口不能被扫描到，否则会出错
}
