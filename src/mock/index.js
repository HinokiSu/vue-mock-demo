import Mock from "mockjs";
import user from "./data";

// 当get请求到 /api/data 路由时 Mock会拦截请求并返回上面的数据
Mock.mock("/api/data", "get", user);
