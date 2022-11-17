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

// 获取推荐歌单
export function getRecommedList(limit) {
  return request({
    url: "/personalized?limit=" + limit,
    method: "get",
  });
}

// 获取新歌
export function getNewSong(limit) {
  return request({
    url: "/personalized/newsong?limit=" + limit,
    method: "get",
  });
}

// 获取新碟
export function getNewDie() {
  return request({
    url: "/album/newest",
    method: "get",
  });
}
