<template>
  <div class="list_table">
    <div class="tltle" v-if="lists.listCount">
      {{ title }}({{ lists.listCount }}个)
    </div>
    <ul>
      <li
        class="list_style"
        v-for="list in lists"
        :key="list.id"
        @click="navToList(list.id)"
      >
        <img
          :src="list.imgUrl"
          style="
            width: 5rem;
            border-radius: 1rem;
            margin-right: 1rem;
            border: 0.0625rem solid ghostwhite;
          "
        />
        <div class="name_list">
          <h3>{{ list.name }}</h3>
          <div class="count_name">
            <van-icon
              v-if="!list.creator"
              name="passed"
              color="rgb(0, 204, 255)"
            />
            {{ list.count }}首<span v-if="list.creator"
              >，by {{ list.creator }}</span
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["title", "lists"],
  methods: {
    navToList(id) {
      console.log("id", id);
      this.$router.push({ name: "listDetail", query: { listId: id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.list_table {
  .list_style {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 0.8rem;
    border-radius: 1rem;
    &:nth-child(n + 2) {
      margin-top: 1rem;
    }
    .name_list {
      .count_name {
        margin-top: 0.3rem;
        color: rgb(186, 184, 187);
      }
    }
  }
  .tltle {
    padding: 1rem 0.3rem;
    color: rgba(110, 109, 109, 0.86);
  }
}
</style>
