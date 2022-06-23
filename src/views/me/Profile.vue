<template>
  <div>
    <el-container style="height: 600px; border: 2px solid #eee;">
      <el-aside width="200px" height="800px" >
        <el-menu :default-active="$route.path" active-text-color="#36eb06">
		<router-link class="alink" to="/home/Profile">
                <el-menu-item index="1-1" shadow="hover" >
				<el-card style="background-color:#76b2f8;">基本信息</el-card>
                </el-menu-item>
        </router-link>

              <router-link class="alink" to="/home/Profile/infoeditor">
                <el-menu-item index="1-2" shadow="hover" >
					<el-card>信息修改</el-card>
                </el-menu-item>
              </router-link>

              <router-link class="alink" to="/home/Profile/imageUp">
                <el-menu-item index="1-3" shadow="hover" >
					<el-card>头像修改</el-card>

                </el-menu-item>
              </router-link>

              <router-link class="alink" to="/home/Profile/account">
                <el-menu-item index="1-4" shadow="hover" >
					<el-card>账号管理</el-card>

                </el-menu-item>
              </router-link>

        </el-menu>
      </el-aside>


        <el-main>
          <div style="width: 80%;margin: 0 auto">
            <router-view></router-view>
          </div>
        </el-main>

    </el-container>

  </div>
</template>

<script>
export default {
  name: "myspace",
  data() {

    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.el-container{
	background:url("../../assets/images/44.jpeg");
	background-size: 100% 100%;
	height:100vh;
	width:100%;
	overflow: auto;
	border-right: 2px solid #eee;
}
.el-header {
  background-color: #000000;
  color: #ffffff;
  line-height: 60px;
}

.el-aside {
  color: #ffffff;
  height:100%;
  background-color:#ffffff;
}
.el-menu {
  height: 100%;
  border:2px solid royalblue;
  font-size: 17px;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 70px;
  }
}

.el-menu-item{
	background-color: #ffffff;
	color: #19c206;
	height:80px;
}
.router-link-active {
  text-decoration: none;
}
.alink{
	text-align: center;
	margin-bottom: 1%;
	text-decoration: none;
}


</style>

