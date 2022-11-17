import store from "@/store/index";

// 切换歌曲
export async function switchSong(a, flag, type) {
  let song = store.getters.currentPlaySong;
  let list = store.getters.currentPlayList;
  let index = list.findIndex((v) => v.id == song.id);
  let songIndex = "";
  if (type == 1) {
    songIndex = index + a;
  } else if (type == 2) {
    songIndex = Math.floor(Math.random() * (list.length + 1));
  } else {
    songIndex = index;
  }
  if (songIndex >= store.getters.currentPlayList.length) {
    songIndex = 0;
  }
  let son = list[songIndex];
  let id = son.id;
  let useUrl = await store.dispatch("play/getPlayUrl", id); //获取歌曲url
  if (!useUrl) {
    if (flag) {
      a = a + 1;
      flag = true;
    } else {
      a = a - 1;
      flag = false;
    }
    switchSong(a, flag, type);
    return true;
  }
  store.commit("play/setCurrentPlaySong", son); //存放当前song
  // store.dispatch("play/getSongDetail", id); //获取歌曲详情
}
