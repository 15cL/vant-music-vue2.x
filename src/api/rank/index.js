import request from "@/utill/request";

export function getTopRank() {
  return request({
    url: "/toplist/detail",
    method: "get",
  });
}
