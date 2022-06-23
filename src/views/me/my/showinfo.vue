<template>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="简介" :column="2" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            头像<!--{{$store.state.userid}}-->
          </template>
          <el-avatar class="img" :src="avatar" alt="" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
          </template>
          {{ nickname }}(id:{{this.$store.state.userid}})
        </el-descriptions-item>
		<el-descriptions-item>
	<template slot="label">
		<i class="el-icon-user"></i>
			手机号码
		</template>
		{{ phone }}
		</el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-message"></i>
            邮箱Email
          </template>
          {{ email }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
//import { userInfo } from "@/api/user.js";
export default {
  name: "Info",
  data() {
    return {
		avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
		nickname: 'hero',
		email: '1978928022@qq.com',
		phone: '17829304567',
		};
	},
  created(){
	this.$axios({
	url: "/userinfo",
	method: 'post',
	params: {
		userid:this.$store.state.userid
	},
	}).then(res =>{
		if(res.data.code==200)
		{
			console.log(res.data.msg);
			//this.avatar=res.data.avatar;
			this.nickname=res.data.data.nickname;
			this.phone=res.data.data.phone;
			this.email=res.data.data.email;
		}
		else
			console.log(res.data.msg);
	}).catch(function(error){
		console.log(error);
	})
	},
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped>
.el-card{
	margin-top: 20%;
}
.el-descriptions{
	font-size:15px;
}
.img {
  width: 100px;
  height: 100px;
}
</style>
