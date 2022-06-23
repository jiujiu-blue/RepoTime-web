<template>
	<div id='building'>
  <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
    <el-card class="login_title">Reportime</el-card>
    <el-form-item label="用户名" label-width="80px" prop="username" class="username">
      <el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码" show-password
            clearable></el-input>
    </el-form-item>
    <el-form-item class="longin_submit">
    <el-button round type="primary" @click="login" class="longin_submit">登陆</el-button>
	<div @click="gotoregiste" class="regist_submit">去注册-></div>
    </el-form-item>
  </el-form>
	</div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            message: '用户名长度不能小于3位',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
    }
  },
  mounted(){
  },
  watch: {
  '$route' () {
   this.initData();//我的初始化方法
   }
  },
  methods: {
	login(){
	console.log(this.$store.state.userid);
	this.$axios({
	url: "/login",
	method: 'post',
	params: {
		username:this.form.username,
		password:this.form.password
	},
	}).then(res =>{
	//let data = res.data
		if(res.data.code==200)
		{
			this.$store.state.userid=res.data.data.userid;
			this.$message.success("登录成功！");
			this.$router.push({ name: 'Dashboard' });
		}
		else
		{
			console.log(res.data.msg);
			this.$message.error("登录失败！");
		}
	}).catch(function(error){
		console.log(error);
		this.$message.error("登录失败！");
	})
	},
	gotoregiste(){
		//var _this=this;
		//_this.show=!show;
		this.$router.push({ name: 'register' });
	}
  }
}
</script>

<style>
#building{
  background:url("../../assets/images/3.gif");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.login-container {
  border-radius: 15px; /*圆角*/
  background-clip: padding-box; /*背景被裁剪到内边距框*/
  margin: 180px auto; /*边界 距上180px 左右居中*/
  width: 350px; /*表单宽度*/
  padding: 35px 35px 15px 35px; /*填充*/
  background: #fff;
  border: 1px solid #eaeaea; /*边框*/
  box-shadow: 0 0 25px #cac6c6; /*隐形*/
}

.login_title {
  margin: 0px auto 40px auto; /*上边界0 下边边界40 左右居中*/
  text-align: center; /*上面仅是标签居中 这里是文字居中*/
  color: #505458;
  font-size:30px;
  background-color: #7ea9ff;
}

.longin_submit {
  margin: 10px auto 0px auto; /*上边界10 下边边界40 左右居中*/
}
.regist_submit{
	position: absolute;
	right:0%;
	bottom:1%;
	font-size: 0.2em;
}
.transition-box {
    margin-bottom: 10px;
    width: 300px;
    height: 100px;
    border-radius: 4px;
    background-color: #42B983;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-left: 520px;
  }
</style>
