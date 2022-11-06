import request from "@/utill/request";

let cookie =
  "NMTID=00O4Xaonka5P-BPWUcXs3XhOkLvn6gAAAGEOKxlUQ; __remember_me=true; __csrf=90e4c7e8ac4906a27e669e5de449240c; MUSIC_U=894f2c6f31087ca071323aaa8ff15af0ab90a8d5fdc5d94d27536d508106c17c2db2b902059571880ed15caf20f6e3a9692c3bf12aeace7f2dd6e518d91e0adad7ea49dab684aa50a89fe7c55eac81f3";

// 登录
export function login(data) {
  return request({
    url: "/login/cellphone",
    method: "post",
    data,
    cookie,
  });
}

// 登出
export function refresh() {
  return request({
    url: "/login/refresh",
    method: "post",
  });
}

// 登出
export function logOut() {
  return request({
    url: "/logout",
    method: "post",
  });
}

// 获取用户信息
export function getUserInfo(id) {
  return request({
    url: "/login/status?uid=" + id,
    method: "get",
  });
}

// 获取用户信息，歌单，收藏，dj数量
export function getUserInfoDetail() {
  return request({
    url: "/user/subcount",
    method: "get",
  });
}

// 获取用户歌单
export function getPlayList(id) {
  return request({
    url: "user/playlist?uid=" + id,
    method: "get",
  });
}
