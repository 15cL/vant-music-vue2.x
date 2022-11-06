import request from "@/utill/request";

// 获取歌曲详情
export function getSongDetail(id) {
  return request({
    url: "/song/detail?ids=" + id,
    method: "get",
  });
}

// 获取歌曲url
export function getPlayUrl(id) {
  return request({
    url: "/song/url?id=" + id,
    method: "get",
  });
}
