import request from "@/utill/request";

// 获取轮播图
export function getBanner() {
  return request({
    url: "/banner?type=2",
    method: "get",
  });
}

// 获取每日推荐歌曲
export function getRecommedSong() {
  return request({
    url: "/recommend/songs",
    method: "get",
  });
}

// 获取每日推荐歌单
export function getRecommedList() {
  return request({
    url: "/recommend/resource",
    method: "get",
  });
}

// 获取新歌
export function getNewSong(type) {
  return request({
    url: "/top/song?type=" + type,
    method: "get",
  });
}

// 获取新碟
export function getNewDie(num) {
  return request({
    url: "/top/album?limit=" + num,
    method: "get",
  });
}
