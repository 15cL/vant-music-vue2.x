import store from "@/store/index";

// 切换歌曲
export async function switchSong(a, flag, type) {
  let songIndex = "";
  if (type == 1) {
    songIndex = store.getters.currentPlaySong.index + a;
  } else if (type == 2) {
    songIndex = Math.floor(
      Math.random() * (store.getters.currentPlayList.length + 1)
    );
  } else {
    songIndex = store.getters.currentPlaySong.index;
  }
  console.log(songIndex);
  if (songIndex >= store.getters.currentPlayList.length) {
    songIndex = 0;
  }
  let song = store.getters.currentPlayList[songIndex];
  song.index = songIndex;
  let id = song.id;
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
  store.commit("play/setCurrentPlaySong", song); //存放当前song
  // store.dispatch("play/getSongDetail", id); //获取歌曲详情
}
