<template>
 <div id='build'>
  <div class="contain">
  <el-card class="login-container">
	<el-card class="welcome">Repotime</el-card>
	<el-card style="font-size:20px;margin: 30px auto;">New here? Sign up for free.</el-card>
  </el-card>
  <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
   <el-card class="login_title">Welcome to join in!</el-card>
    <el-form-item label="用户名" label-width="80px" prop="username" class="username">
      <el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item class="longin_submit">
      <el-button type="primary" @click="regist" class="longin_submit">注册</el-button>
    </el-form-item>
  </el-form>
  </div>
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
      }
    }
  },
  methods: {
    regist() {
	this.$axios({
	url: "/register",
	method: 'post',
	params: {
		username:this.form.username,
		password:this.form.password
	},
	}).then(res =>{
		if(res.data.code==200)
		{
			console.log(res);
			this.$message.success("注册成功！");
			this.$router.push({ name: 'login' })
		}
		else
		{
			console.log(res);
			this.$message.error("注册失败！");
		}
	}).catch(function(error){
		console.log(error);
		this.$message.error("注册失败！");
	})
    }
  }
}
</script>

<style>
#build{
  background:url("../../assets/images/11.jpeg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.contain{
	margin: 150px 240px;
	display: flex;
	flex-direction:row ;
}
.welcome{
	color: #370081;;
	text-align: center;
	font-size:43px;
	margin: 6px auto;
		text-shadow: 
			/* 扩散白光 */
			0 0 7px white,
			0 0 10px white,
			0 0 21px white,
			/* 扩散绿光 */
			0 0 42px #4f6cb6,
			0 0 82px #0fa,
			0 0 92px #0fa,
			0 0 102px #0fa,
			0 0 151px #0fa;
}
.info{
	border-radius: 15px;
	background-clip: padding-box; 
	margin: 20px 0px; 
	width: 350px;
	padding: 35px 35px 15px 35px;
	background: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;
}
.login-container {
  border-radius: 15px; /*圆角*/
  background-clip: padding-box; /*背景被裁剪到内边距框*/
  margin: 20px 0px; /*边界 距上180px 左右居中*/
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
  font-size:20px;
  background-color: #7ea9ff;
}

.longin_submit {
  margin: 10px auto 0px auto; /*上边界10 下边边界40 左右居中*/
}
</style>
