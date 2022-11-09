import request from "@/utill/request";

// 获取歌单详情
export function getPlayListDetail(id) {
  return request({
    url: "/playlist/detail?id=" + id,
    method: "get",
  });
}

// 获取歌单所有歌曲
export function getAllPlaySong(id) {
  return request({
    url: "/playlist/track/all?id=" + id,
    method: "get",
  });
}

// 获取精品歌单

export function getJingPingList() {
  let url = "/top/artists";
  if (process.env.VUE_APP_ENV === "pro") {
    url = process.env.VUE_APP_BASE_URL + "/top/artists";
  }
  return request({
    url,
    method: "get",
  });
}
