<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    // 是否派发点击事件
    click: {
      type: Boolean,
      default: true,
    },

    // 是否横向滚动
    scrollX: {
      type: Boolean,
      default: false,
    },

    // 列表的数据
    data: {
      type: Array,
      default: null,
    },

    // 是否派发滚动到底部的事件，用于上拉加载
    pullup: {
      type: Boolean,
      default: false,
    },

    // 是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false,
    },
    // 是否派发列表滚动开始时的事件
    beforeScroll: {
      type: Boolean,
      default: false,
    },

    //  当数据更新后，刷新scroll的延时
    refreshDelay: {
      type: Number,
      default: 20,
    },
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }

      // better-scroll的初始化
      this.scroll = window.BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        stopPropagation: true,
      });

      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on("scroll", (pos) => {
          this.$emit("scroll", pos);
        });
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("pullup");
          }
        });
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on("touchend", (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit("pulldown");
          }
        });
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable();
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable();
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
  },
};
</script>

<style lang="scss" scoped></style>
