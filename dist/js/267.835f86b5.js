"use strict";(self["webpackChunkvue_littlefivemusic"]=self["webpackChunkvue_littlefivemusic"]||[]).push([[267],{8267:function(e,t,s){s.r(t),s.d(t,{default:function(){return c}});var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"login_page"},[t("van-nav-bar",{attrs:{title:"登录","left-text":"返回","left-arrow":""},on:{"click-left":e.backBtn}}),e._m(0),t("div",{staticClass:"userpwd"},[t("van-form",[t("van-cell-group",[t("van-field",{attrs:{label:"手机号",placeholder:"请输入手机号","left-icon":"phone-o",autosize:"",rules:e.phoneRule},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),t("van-field",{attrs:{label:"密码","left-icon":"orders-o",placeholder:"请输入密码","right-icon":e.passwordStatus?"eye":"closed-eye",type:e.passwordStatus?"text":"password",autosize:""},on:{"click-right-icon":function(t){e.passwordStatus=!e.passwordStatus}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),t("div",{staticStyle:{margin:"2rem"}},[t("van-button",{attrs:{round:"",block:"",type:"info"},on:{click:function(t){return e.onSubmit(e.username,e.password)}}},[e._v("登录")])],1)],1)],1)],1)},a=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"img",staticStyle:{margin:"3rem 0 2rem","text-align":"center"}},[t("img",{staticStyle:{width:"90%",height:"30vh","border-radius":"5rem"},attrs:{src:s(768)}})])}],n=(s(7658),s(3822)),i={data(){return{username:"13979927696",password:"Chenshuxu0409",passwordStatus:!1,phoneRule:[{required:!0,message:"手机号不能为空",trigger:"onBlur"},{validator:e=>{let t=/^1[3|4|5|7|8]\d{9}/,s=t.test(e);return s},message:"手机号格式错误",trigger:"onBlur"}]}},methods:{...(0,n.nv)(["user/login"]),backBtn(){this.$router.go(-1)},async onSubmit(e,t){const s=this.$toast.loading({message:"加载中",forbidClick:!0,loadingType:"spinner"});if(e||t)try{await this["user/login"]({phone:e,password:t}),this.$router.push("/")}catch(r){console.log(r)}finally{s.clear()}}}},o=i,l=s(1001),u=(0,l.Z)(o,r,a,!1,null,"02cd0cfb",null),c=u.exports},768:function(e,t,s){e.exports=s.p+"img/login_lo.e4811fb4.png"}}]);
//# sourceMappingURL=267.835f86b5.js.map