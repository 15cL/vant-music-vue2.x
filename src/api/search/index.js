import request from "@/utill/request";

// 获取搜索建议
export function getSearchTip(keywords) {
  return request({
    url: "/search/suggest?keywords=" + keywords,
    method: "get",
  });
}

//获取热搜列表
export function getSearchHot() {
  return request({
    url: "/search/hot/detail",
    method: "get",
  });
}

// 搜索   get请求用params  post用data
export function getSearchRes(data) {
  return request({
    url: "/cloudsearch",
    params: {
      keywords: data.keywords,
      type: data.type,
      offset: data.offset,
    },
    method: "get",
  });
}

// 获取搜索关键词
export function getSearchIdea() {
  return request({
    url: "/search/hot",
    method: "get",
  });
}
