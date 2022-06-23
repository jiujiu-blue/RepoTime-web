<template>
  <!--collapse 是否水平折叠收起菜单-->
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#7ea9ff"
    text-color="#fff"
    active-text-color="#000000"
	active-backgroundcolor="#f56007"
  >
    <!--是否水平折叠收起菜单 会影响这里字段的显示 -->
	<h3 v-show="!isCollapse" style="font-size: 33px;height:12%;font-style: italic;color:black">Reportime</h3>
	<h3 v-show="isCollapse"><el-avatar :src="avatar"></el-avatar></h3>
	<h3 v-show="!isCollapse" style="color:black">
	<el-avatar :src="avatar"></el-avatar>{{nickname}}</h3>
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon" style="color: #fc241a;"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon" style="color: #fc241a;"></i>
        <span slot="title" style="font-size:17px">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon" style="color: #fc241a;"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
	<h3 v-show="!isCollapse" class="footview" style="line-height: 40px;">
		<el-link href="https://element.eleme.io" target="_blank" style="color:black;font-style: italic;font-size: 1.7em;font-weight:400;text-align: center;">
			Contact us
		</el-link>
	</h3>
  </el-menu>
</template>

<script>
export default {
  //计算属性
  computed: {
    //没有子菜单
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    //有子菜单 (这样设置会有一个问题 就是有子菜单的 永远会在没有子菜单的下面
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    isCollapse() {
      // 这里的数据就是从vuex取得
      return this.$store.state.tab.isCollapse
    }
  },
  data() {
    return {
      menu: [
        {
          path: '/',
          name: 'Dashboard',
          label: 'Dashboard',
          icon: 's-platform',
          url: 'Dashboard/Dashboard'
        },
        {
          label: 'me',
          icon: 'user-solid',
          children: [
            {
              path: '/Profile',
              name: 'Profile',
              label: 'Profile',
              icon: 'setting',
              url: 'me/Profile'
            },
            {
              path: '/About',
              name: 'About',
              label: 'About',
              icon: 'info',
              url: 'me/About'
            }
          ]
        }
      ],
	avatar:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
	nickname:'hero',
	url:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  created(){
	if(this.$store.state.userid==-1)
	{
        this.$alert('您未登录或登录已过期，请重新登录', 'Error!', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });		
	}});
	}
	this.$axios({
	url: "/userinfo",
	method: 'post',
	params: {
		userid:this.$store.state.userid
	},
	}).then(res =>{
		console.log(res.data.msg);
		if(res.data.code==200)
		{
			//this.avatar=res.data.data.avatar;
			this.nickname=res.data.data.nickname;
		}
		console.log(res);
	}).catch(function(error){
		console.log(error);
	})
  },
  methods: {
    //跳转路由 根据名称跳转
    clickMenu(item) {
	this.$router.push({ name: item.name });
	
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border:2px solid royalblue;
  font-size: 17px;
  font-weight: 800;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 70px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.footview{
	background-color: #ffffff;
	width:100%;
	position:absolute;
	height:15%;
	bottom: 0;
	}
.el-menu-item{
	font-size: 17px;
}
.el-submenu{
	font-size: 17px;
}
</style>
