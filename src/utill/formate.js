// 歌手数组转字符串
export function SingerFormate(arr) {
  let ars = [];
  arr.map((v) => {
    ars.push(v.name);
  });
  let str = JSON.stringify(ars)
    .replace(/\[|]|"/g, "")
    .replace(/,/g, "/");
  return str;
}

// 00:00时间转换
export function formateTime(duration) {
  let mm = parseInt(duration / 60);
  let ss = parseInt(duration % 60);
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;
  duration = mm + ":" + ss;
  return duration;
}
