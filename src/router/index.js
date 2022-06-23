import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 完整路由代码
export default new VueRouter({
  routes: [
	{
	path: '/',
	name: 'login',
	component: () => import('@/views/Login/Login')
	},
	{
	path: '/register',
	name: 'register',
	component: () => import('@/views/Login/register')
	},
    {
    path: '/home',
	name:'home',
      component: () => import('@/views/Main'),
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard/Dashboard'),
        },
		{
			path: '/home/Profile',
			name: 'Profile',
			component: () => import('@/views/me/Profile'),
			children: [
			{
				path: '/',
				name: 'showinfo',
				component: () => import('@/views/me/my/showinfo'),
				},
			{
				path: '/home/Profile/infoeditor',
				name: 'infoeditor',
				component: () => import('@/views/me/my/infoeditor'),
				},
			{
				path: '/home/Profile/imageup',
				name: 'imageup',
				component: () => import('@/views/me/my/imageup'),
				},
			{
				path: '/home/Profile/account',
				name: 'account',
				component: () => import('@/views/me/my/account'),
				},
			]
		},
        {
          path: '/About',
          name: 'About',
          component: () => import('@/views/me/About'),
        },
      ]
    },
	
  ]
})