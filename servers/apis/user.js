import request from "../request";

// 获取用户openid
export const usrInfos = data => request("POST", "/user/usrInfos", data);