//我的歌单分类处理
export function playlistClassify(list) {
  let likeList = [];
  let createList = [];
  let collectList = [];
  let likeCount = 0;
  let createCount = 0;
  let collectCount = 0;

  for (const [i, v] of list.entries()) {
    if (i == 0) {
      likeList.push({ id: v.id, imgUrl: v.coverImgUrl, count: v.trackCount });
      likeCount = likeCount + 1;
    } else if (!v.subscribed) {
      createList.push({
        name: v.name,
        id: v.id,
        imgUrl: v.coverImgUrl,
        count: v.trackCount,
      });
      createCount = createCount + 1;
    } else {
      collectList.push({
        name: v.name,
        id: v.id,
        imgUrl: v.coverImgUrl,
        count: v.trackCount,
        creator: v.creator.nickname,
      });
      collectCount = collectCount + 1;
    }
  }

  likeList.listCount = likeCount;
  createList.listCount = createCount;
  collectList.listCount = collectCount;

  return { likeList, createList, collectList };
}
