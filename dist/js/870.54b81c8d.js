"use strict";(self["webpackChunkvue_littlefivemusic"]=self["webpackChunkvue_littlefivemusic"]||[]).push([[870],{870:function(e,t,s){s.r(t),s.d(t,{default:function(){return h}});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"search_main_page"},[t("BS_Scroll",{class:["wrapper",e.currentPlaySong.id?"has_play":"no_play"],attrs:{data:e.searchHot}},[t("div",{staticClass:"search_org"},[e.keys?t("div",{staticClass:"search_history"},[t("header",[t("h3",[e._v("历史")]),t("van-icon",{attrs:{name:"delete",size:"20"},on:{click:e.deleteAll}})],1),t("ul",e._l(e.keys,(function(s,a){return t("li",{key:a,on:{click:function(t){return e.searchSong(s)}}},[e._v(" "+e._s(s)+" ")])})),0)]):e._e(),t("div",{staticClass:"search_history"},[t("header",[t("h3",[e._v("推荐")])]),t("ul",e._l(e.ideas,(function(s,a){return t("li",{key:a,on:{click:function(t){return e.searchSong(s.first)}}},[e._v(" "+e._s(s.first)+" ")])})),0)]),t("div",{staticClass:"search_hot"},[t("h2",[e._v("热搜榜")]),t("ul",e._l(e.searchHot,(function(s,a){return t("li",{key:s.score,on:{click:function(t){return e.searchSong(s.searchWord)}}},[t("span",{style:{color:a==e.hotIndex[a]?"gold":""}},[e._v(e._s(a+1))]),t("p",[e._v(e._s(s.searchWord))]),t("van-icon",{attrs:{name:s.iconUrl}})],1)})),0)])])])],1)},r=[],i=(s(7658),s(3822)),c={data(){return{searchHot:"",hotIndex:[0,1,2],ideas:"",keys:"",main_wrap:null}},computed:{...(0,i.Se)(["keys_history","currentPlaySong"])},async created(){window.addEventListener("load",(()=>{this.keys=JSON.parse(window.localStorage.getItem("keywords"))||""}));let e=await this.$store.dispatch("search/getSearchHot");this.searchHot=e.data.data;let t=await this.$store.dispatch("search/getSearchIdea"),s=[];t.data.result.hots.map(((e,t)=>{t<3&&s.push(e)})),this.ideas=s,this.keys=this.keys_history},methods:{...(0,i.OI)(["search/clearSearchHistory"]),searchSong(e){this.$emit("keyProp",e),this.$router.replace({name:"result",params:{keywords:e}})},deleteAll(){let e=this;this.$dialog.confirm({message:"确定清空全部历史记录?",beforeClose:function(t,s){"confirm"===t?(setTimeout(e["search/clearSearchHistory"],500),e.keys="",s()):s()}})}}},n=c,o=s(1001),l=(0,o.Z)(n,a,r,!1,null,"f43f2b4c",null),h=l.exports}}]);
//# sourceMappingURL=870.54b81c8d.js.map