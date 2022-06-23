<template>
	<el-row class="home" :gutter="30">
		<el-col :span="15" style="margin-top: 20px">
			<el-card shadow="hover" 
			style="background-color:#7c96ff;color:black;height: 80px;width:50%;margin-top: 10px;font-size: 1.8vw;text-align: center;">
				Dashboard Overview
			</el-card>
			<el-card id="totaltime" shadow="hover" style="background-color: black;height: 260px;margin-top: 40px">
			</el-card>
			<el-card shadow="hover"
			style="background-color:#23ffe5;color:black;width:30%;margin-top: 40px;font-size: 1.0em;text-align: center;">
			project time
			</el-card>
			<el-card id="projectime" shadow="hover" style="background-color: black;height: 260px;margin-top: 20px">
			</el-card>
			<el-card shadow="hover"
			style="background-color:#23ffe5;color:black;width:30%;margin-top: 40px;font-size: 1.0em;text-align: center;">
				language time
			</el-card>
			<el-card id="languagetime" shadow="hover" style="background-color: black;height: 260px;margin-top: 20px">
			</el-card>
		</el-col>
		<el-col :span="9" style="margin-top: 20px">
			<div  style="background-color: black; height: 45px;margin-top: 13px">
				<el-col :span="10">
					Last seven days</el-col>
				<el-col :span="14" style="border-width: 20px;font-size: 1.3vw;color:white">
				<el-date-picker
					v-model="date"
					align="right"
					type="date"
					placeholder="选择日期"
					:picker-options="pickerOptions"
					@blur="reload">
				</el-date-picker>	
				</el-col>
			</div>
			<el-card id="userlevel" shadow="hover" style="height: 260px;margin-top: 10px;background-color:#0f0b28; ">
			</el-card>
			<el-card id="mytool" shadow="hover" style="background-color: #0f0b28;height: 260px;margin-top: 15px">
			</el-card>
			<el-card id="operating_system" shadow="hover" style="height: 260px;margin-top: 10px;background-color:#0f0b28">
			</el-card>
			<el-card id="language" shadow="hover" style="height: 260px;margin-top: 10px;background-color:#0f0b28">
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
	import * as echarts from 'echarts';
    export default {
        data() {
            return {
                userImg: require('../../assets/images/user.png'),
				pickerOptions: {
				disabledDate(time) {
				return time.getTime() > Date.now();
				},
				shortcuts: [{
				text: '今天',
				onClick(picker) {
				picker.$emit('pick', new Date());
				}
				}, {
				text: '昨天',
				onClick(picker) {
				const date = new Date();
				date.setTime(date.getTime() - 3600 * 1000 * 24);
				picker.$emit('pick', date);
				}
				}, {
				text: '一周前',
				onClick(picker) {
				const date = new Date();
				date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
				picker.$emit('pick', date);
				}
				}]
				},
				date:new Date()
		}
		},
		mounted(){
			this.drawLine();
			this.tool();
			this.getuserlevel();
			this.getoperating_system();
			this.getlanguage();
			this.getprojectime();
			this.getlanguagetime();
		},
        methods: {
			reload(){
				this.drawLine();
				this.tool();
				this.getuserlevel();
				this.getoperating_system();
				this.getlanguage();
				this.getprojectime();
				this.getlanguagetime();
			},
            dateFormat(time) {
                var date=new Date(time);
                var year=date.getFullYear();
                /* 在日期格式中，月份是从0开始的，因此要加0
                * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
                * */
                var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
                var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
                var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
                // 拼接
                return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
            },			
			async drawLine(){
				var chartDom = document.getElementById('totaltime');
				var myChart = this.$echarts.init(chartDom, '');
				var option;

				option = {
				tooltip: {
				trigger: 'axis',
				axisPointer: {
				type: 'none'
				},
				formatter: function (params) {
                let result = params[0].value;            
                let y =
                    Math.floor(result / 86400) < 10
                    ? "0" + Math.floor(result / 86400)
                    : Math.floor(result / 86400);           
                let h =
                    Math.floor((result / 3600) % 24) < 10
                    ? "0" + Math.floor((result / 3600) % 24)
                    : Math.floor((result / 3600) % 24);            
                let m =
                    Math.floor((result / 60) % 60) < 10
                    ? "0" + Math.floor((result / 60) % 60)
                    : Math.floor((result / 60) % 60);           
                let s =
                    Math.floor(result % 60) < 10
                    ? "0" + Math.floor(result % 60)
                    : Math.floor(result % 60); 
                let res = "";
                if (y !== "00") res =res+y+"天";            
                if (h !== "00") res =res+h+"时";            
                if (m !== "00") res =res+m+"分";            
                res=res+s+"秒";          
                return res;
				}
				},
				xAxis: {
				data: ['Jun 9th', 'Jun 10th', 'Jun 11th', 'Jun 12th', 'Jun 13th', 'Jun 14th', 'Jun 15th'],
				axisTick: { show: false },
				axisLine: { show: false },
				axisLabel: {
				color: '#ffffff',
				}
				},
				yAxis: {
				type: 'value', 
				splitLine: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				axisLabel: {
					fontSize: 22,
					show: false,
                }	
				},
				color: ['#4c6de8'],
				title: {
				text: '*Coding time over the Last 7 Days. ',
				left: 'left',
				top: 3,
				textStyle: {
				color: '#75ffff'
				}
				},
				toolbox: {
				show: true,
				feature: {
				mark: { show: true },
				restore: { show: true },
				saveAsImage: { show: true }
				}
				},
				series: [
				{
				name: 'hill',
				type: 'pictorialBar',
				barCategoryGap: '-130%',
				// symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
				symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
				itemStyle: {
				opacity: 0.5
				},
				emphasis: {
				itemStyle: {
				opacity: 1
				}
				},
				data: [167, 230, 25, 111, 270, 9, 2],
				z: 10
				}
				]
				};
				option && myChart.setOption(option);
				
				var {data:res}=await this.$axios({
									url: "/sevendays",
									method: 'post',
									params: {
										userid:this.$store.state.userid,
										date:this.dateFormat(this.date),
										//userid:1.,
										//date:'2022-06-21 23:22:22'
									},
								});
				if(res.code==200)
				{
				console.log("getsevendays,success")
				option.xAxis.data=res.data.name;
				option.series[0].data=res.data.time;
				option && myChart.setOption(option);
				}
				else
					console.log(res.msg);
			},
			async tool(){
				var chartDom = document.getElementById('mytool');
				var myChart = this.$echarts.init(chartDom,'dark');
				var option;
			
			option = {
			backgroundColor: '#0f0b28',
			title: {
			text: 'Editors',
			left: 'center',
			top: 'bottom',
			textStyle: {
			color: '#ccc'
			}
			},
			/*
			tooltip: {
				trigger: 'item'
			},*/
			visualMap: {
			show: false,
			min: 80,
			max: 600,
			inRange: {
			colorLightness: [0, 1]
			}
			},
			legend: {
			top: '5%',
			left: 'left'
			},
			toolbox: {
			show: true,
			feature: {
			mark: { show: true },
			restore: { show: true },
			saveAsImage: { show: true }
			}
			},
			series: [
			{
			name: '',
			type: 'pie',
			radius: '55%',
			center: ['50%', '50%'],
			data: [
			{ value: 335, name: 'VS code'},
			].sort(function (a, b) {
			return a.value - b.value;
			}),
			roseType: 'radius',
			label: {
			color: 'rgba(255, 255, 255, 1.0)'
			},
			labelLine: {
			lineStyle: {
			color: 'rgba(255, 255, 255, 0.3)'
			},
			smooth: 0.2,
			length: 10,
			length2: 20
			},
            emphasis: {
                label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold',
                formatter: "{aa|{b}}{aa|:}{aa|{d}}{aa|%}",
                rich: {
                    aa: { color: '#fff',fontSize: '18', fontWeight: 20},
                }
                }
            },			
			itemStyle: {
			color: '#c23531',
			shadowBlur: 200,
			shadowColor: 'rgba(0, 0, 0, 0.5)'
			},
			animationType: 'scale',
			animationEasing: 'elasticOut',
			animationDelay: function () {
			return Math.random() * 200;
			}
			}
			]
			};
			option && myChart.setOption(option);
			/*
			var {data:res}=await this.$axios({
								url: "/login",
								method: 'post',
								params: {
									//userid:this.$store.state.userid,
									//date:this.dateFormat(this.date),
								},
							});
			//var value=res.data.level.value;
			option.xAxis.data=res.data.name;
			option.series[0].data=res.data.time;
			option && myChart.setOption(option);
			*/
			},
			async getuserlevel(){
				var chartDom = document.getElementById('userlevel');
				var myChart = this.$echarts.init(chartDom,'dark');
				var option;
				
				option = {
				title: {
				text: 'level',
				left: 'left',
				top: 'top',
				textStyle: {
				color: '#ffffff'
				}
				},
				toolbox: {
				show: true,
				feature: {
				mark: { show: true },
				restore: { show: true },
				saveAsImage: { show: true }
				}
				},
				series: [
				{
				type: 'gauge',
				axisLine: {
				lineStyle: {
				width: 30,
				color: [
				[0.3, '#67e0e3'],
				[0.7, '#37a2da'],
				[1, '#fd666d']
				]
				}
				},
				pointer: {
				itemStyle: {
				color: 'auto'
				}
				},
				axisTick: {
				distance: -30,
				length: 8,
				lineStyle: {
				color: '#fff',
				width: 3
				}
				},
				splitLine: {
				distance: -30,
				length: 30,
				lineStyle: {
				color: '#fff',
				width: 4
				}
				},
				axisLabel: {
				color: 'auto',
				distance: 40,
				fontSize: 10
				},
				detail: {
				valueAnimation: true,
                formatter : "{score|{value}}",
                offsetCenter: [0, "40%"],
                rich : {
                    score : {
                    color : "white",
                    fontFamily : "微软雅黑",
                    fontSize : 22
                    }
                }
				},
				data: [
				{
				value: 40
				}
				]
				}
				]
				};
				//定时函数
				/*
				setInterval(function () {					
				myChart.setOption({
				series: [
				{
				data: [
				{
				value: 100
				}
				]
				}
				]
				});
				}, 2000);
				*/
				option && myChart.setOption(option);
				var {data:res}=await this.$axios({
									url: "/level",
									method: 'post',
									params: {
										userid:this.$store.state.userid,
										date:this.dateFormat(this.date)
										//userid:1.,
										//date:'2022-06-21 23:22:22'
									},
								});
				if(res.code==200)
				{
				console.log("getuserlevel,success");				
				option.series[0].data[0].value=res.data.level[0].value;
				option && myChart.setOption(option);					
				}
				else
					console.log(res.msg);
			},
			async getoperating_system()
			{
				var chartDom = document.getElementById('operating_system');
				var myChart = this.$echarts.init(chartDom,'dark');
				var option;
				
				option = {
				backgroundColor: '#0f0b28',
				title: {
				text: 'Operating Systems',
				left: 'center',
				top: 220,
				textStyle: {
				color: '#ffffff'
				}
				},
				tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {d}%'
				},
				legend: {
				top: '5%',
				left: 'left'
				},
				toolbox: {
				show: true,
				feature: {
				mark: { show: true },
				restore: { show: true },
				saveAsImage: { show: true }
				}
				},
				series: [
				{
				name: 'Operating Systems',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				label: {
				show: true,
				position: 'center'
				},
				labelLine: {
				show: false
				},
				data: [
				{ value: 1048, name: 'Mac' },
				{ value: 2048, name: 'windows' }
				]
				}
				]
				};
				option && myChart.setOption(option);
				var {data:res}=await this.$axios({
									url: "/operatingsystem",
									method: 'post',
									params: {
										userid:this.$store.state.userid,
										date:this.dateFormat(this.date),
										//userid:1,
										//date:'2022-06-21 23:22:22'
									},
								});
				if(res.code==200)
				{
				console.log("getoperatingsystem,success");
				option.series[0].data=res.data.operatingsystem;
				option && myChart.setOption(option);
				}
				else
					console.log(res.msg);
			},
			async getlanguage(){
				var chartDom = document.getElementById('language');
				var myChart = this.$echarts.init(chartDom,'dark');
				var option;
				
				option = {
				title: {
				text: 'Language',
				top: 'bottom',
				left:'center'
				},
				tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {d}%'
				},
				legend: {
				top: 'top',
				left:'left'
				},
				toolbox: {
				show: true,
				feature: {
				mark: { show: true },
				restore: { show: true },
				saveAsImage: { show: true }
				}
				},
				series: [
				{
				name: 'Language',
				type: 'pie',
				radius: [2.5, 100],
				center: ['50%', '50%'],
				roseType: 'radius',
				itemStyle: {
				borderRadius: 4
				},
				label: {
				show: false
				},
				emphasis: {
				label: {
				show: true
				}
				},
				data: [
				{ value: 40, name: 'vue' },
				{ value: 33, name: 'python' },
				{ value: 28, name: 'java' }
				]
				},
				]
				};
				option && myChart.setOption(option);
				var {data:res}=await this.$axios({
									url: "/language",
									method: 'post',
									params: {
										userid:this.$store.state.userid,
										date:this.dateFormat(this.date),
										//userid:1.,
										//date:'2022-06-21 23:22:22'
									},
								});
				if(res.code==200)
				{
				console.log("getlanguage,success");
				option.series[0].data=res.data.language;
				option && myChart.setOption(option);					
				}
				else
					console.log(res.msg);
			},
			async getprojectime(){
			var chartDom = document.getElementById('projectime');
			var myChart = this.$echarts.init(chartDom);
			var option;
			var colors = ['#87ffa4', '#8aa3d6', '#d36ce2','#cceefb', '#3535d6', '#e1b2d1', '#d5ff09','#40dab5', '#e05526']; //三种状态的颜色
			//var state = ['Reportime', 'hello-world','yeah']; //三种状态
			
			// echart配置
			option = {
			color: colors,
			tooltip: {//提示框
			formatter: function (params) {
			return params.name + ':' + params.value[1] + '~' + params.value[2];
			}//数据的值
			},
			legend: {//图例
			//data: state,
			bottom: '1%',
			selectedMode: false, // 图例设为不可点击
			textStyle: {
			color: '#ffffff'
			}
			},
			grid: {//绘图网格
			left: '3%',
			right: '3%',
			top: '1%',
			bottom: '10%',
			containLabel: true
			},
			xAxis: { 
			type: 'time',               
			interval: 3600  * 1000,   //以一个小时递增 
			//min:'2009/6/1 0:00', //将data里最小时间的整点时间设为min,否则min会以data里面的min为开始进行整点递增
			axisLabel: {formatter: function (value) { 
			var date = new Date(value); return getzf(date.getHours()) + ':00';  
			function getzf(num) {
				if (parseInt(num) < 10) {  num = '0' + num; }  
				return num; 
			}           
			}, 
			color: '#ffffff',
			},
			},
			yAxis: {
			data: ['Reportime', 'hello-world', 'yeah'],
			axisLabel: {
				fontSize: 12,
				color: '#ffffff',
			}	
			},
			toolbox: {
			show: true,
			feature: {
			mark: { show: true },
			restore: { show: true },
			saveAsImage: { show: true }
			}
			},
			series: [
			// 用空bar来显示三个图例
			{ name: "", type: 'bar', data: [] },
			{ name: "", type: 'bar', data: [] },
			{ name: "", type: 'bar', data: [] },
			{
			type: 'custom',                
			renderItem: function (params, api) {//开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
			var categoryIndex = api.value(0);//这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
			var start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
			var end = api.coord([api.value(2), categoryIndex]);
			var height = 35
			
			return {
			type: 'rect',// 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
			shape: echarts.graphic.clipRectByRect({ // 矩形的位置和大小。
			x: start[0],
			y: start[1] - height / 2,
			width: end[0] - start[0],
			height: height
			}, { // 当前坐标系的包围盒。
			x: params.coordSys.x,
			y: params.coordSys.y,
			width: params.coordSys.width,
			height: params.coordSys.height
			}),
			style: api.style()
			};
			},
			encode: {
			x: [1, 2], // data 中『维度1』和『维度2』对应到 X 轴
			y: 0// data 中『维度0』对应到 Y 轴
			},
			data: [ // 维度0 维度1 维度2
			{
			itemStyle: { normal: { color: colors[0] } },//条形颜色
			name: 'Reportime',
			value: [0, '2021/6/1 1:28', '2021/6/1 5:00']//0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
			},
			{
			itemStyle: { normal: { color: colors[0] } },
			name: 'Reportime',
			value: [0, '2021/6/1 6:13', '2021/6/1 8:22']
			},
			{
			itemStyle: { normal: { color: colors[0] } },
			name: 'Reportime',
			value: [0, '2021/6/1 9:13', '2021/6/1 24:00']
			},
			{
			itemStyle: { normal: { color: colors[1] } },
			name: 'hello-world',
			value: [1, '2021/6/1 5:00', '2021/6/1 9:13']
			},
			{
			itemStyle: { normal: { color: colors[1] } },
			name: 'hello-world',
			value: [1, '2021/6/1 13:22', '2021/6/1 18:10']
			},
			{
			itemStyle: { normal: { color: colors[1] } },
			name: 'hello-world',
			value: [1, '2021/6/1 12:47', '2021/6/1 14:52']
			},
			{
			itemStyle: { normal: { color: colors[2] } },
			name: 'yeah',
			value: [2, '2021/6/1 2:10', '2021/6/1 9:47']
			},
			{
			itemStyle: { normal: { color: colors[2] } },
			name: 'yeah',
			value: [2, '2021/6/1 9:10', '2021/6/1 12:47']
			},
			{
			itemStyle: { normal: { color: colors[2] } },
			name: 'yeah',
			value: [2, '2021/6/1 14:52', '2021/6/1 17:00']
			},
			]
			}
			]
			};
				option && myChart.setOption(option);
				var {data:res}=await this.$axios({
									url: "/projecttime",
									method: 'post',
									params: {
										userid:this.$store.state.userid,
										date:this.dateFormat(this.date)
										//userid:1.,
										//date:'2022-06-21 23:22:22'
									},
								});
				if(res.code==200)
				{
				console.log("getprojectime,success");
				option.yAxis.data=res.data.name;
				var timedata=[];
				var len=res.data.length[0];
				for(let i=0;i<len;i++)
				{
					var obj=new Object;
					var arr1=new Object;
					var arr2=new Object;
					arr2.color=colors[res.data.projecttime[i].value[0]];
					arr1.normal=arr2;
					obj.itemStyle=arr1;
					obj.name=res.data.projecttime[i].name[0];
					obj.value=res.data.projecttime[i].value;
					obj.value[0]=parseInt(obj.value[0]);
					timedata[i]=obj;
				}
				option.series[3].data=timedata;
				option && myChart.setOption(option);					
				}
				else
					console.log(res.msg);
			},
			async getlanguagetime(){
			var chartDom = document.getElementById('languagetime');
			var myChart = this.$echarts.init(chartDom);
			var option;
			var colors = ['#87ffa4', '#8aa3d6', '#d36ce2','#cceefb', '#3535d6', '#e1b2d1', '#d5ff09','#40dab5', '#e05526']; 
			//var state1 = ['vue','python','java']; //三种状态
			
			// echart配置
			option = {
			color: colors,
			tooltip: {//提示框
			formatter: function (params) {
			return params.name + ':' + params.value[1] + '~' + params.value[2];
			}//数据的值
			},
			legend: {//图例
			//data:state1,
			bottom: '1%',
			selectedMode: false, // 图例设为不可点击
			textStyle: {
			color: '#ffffff'
			}
			},
			grid: {//绘图网格
			left: '3%',
			right: '3%',
			top: '1%',
			bottom: '10%',
			containLabel: true
			},
			xAxis: { 
			type: 'time',               
			interval: 3600  * 1000,   //以一个小时递增 
			//min:'2009/6/1 0:00', //将data里最小时间的整点时间设为min,否则min会以data里面的min为开始进行整点递增
			axisLabel: {formatter: function (value) { 
			var date = new Date(value); return getzf(date.getHours()) + ':00';  
			function getzf(num) {
				if (parseInt(num) < 10) {  num = '0' + num; }  
				return num; 
			}           
			}, 
			color: '#ffffff',
			},
			},
			yAxis: {
			data: ['vue','python','java'],
			axisLabel: {
				fontSize: 12,
				color: '#ffffff',
			}	
			},
			toolbox: {
			show: true,
			feature: {
			mark: { show: true },
			restore: { show: true },
			saveAsImage: { show: true }
			}
			},
			series: [
			// 用空bar来显示三个图例
			{ name: "", type: 'bar', data: [] },
			{ name: "", type: 'bar', data: [] },
			{ name: "", type: 'bar', data: [] },
			{
			type: 'custom',                
			renderItem: function (params, api) {//开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
			var categoryIndex = api.value(0);//这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
			var start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
			var end = api.coord([api.value(2), categoryIndex]);
			var height = 35
			
			return {
			type: 'rect',// 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
			shape: echarts.graphic.clipRectByRect({ // 矩形的位置和大小。
			x: start[0],
			y: start[1] - height / 2,
			width: end[0] - start[0],
			height: height
			}, { // 当前坐标系的包围盒。
			x: params.coordSys.x,
			y: params.coordSys.y,
			width: params.coordSys.width,
			height: params.coordSys.height
			}),
			style: api.style()
			};
			},
			encode: {
			x: [1, 2], // data 中『维度1』和『维度2』对应到 X 轴
			y: 0// data 中『维度0』对应到 Y 轴
			},
			data: [ // 维度0 维度1 维度2
			{
			itemStyle: { normal: { color: colors[0] } },//条形颜色
			name: 'vue',
			value: [0, '2021/6/1 1:28', '2021/6/1 5:00']//0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
			},
			{
			itemStyle: { normal: { color: colors[0] } },
			name: 'vue',
			value: [0, '2021/6/1 6:13', '2021/6/1 8:22']
			},
			{
			itemStyle: { normal: { color: colors[0] } },
			name: 'vue',
			value: [0, '2021/6/1 9:13', '2021/6/1 24:00']
			},
			{
			itemStyle: { normal: { color: colors[1] } },
			name: 'python',
			value: [1, '2021/6/1 5:00', '2021/6/1 9:13']
			},
			{
			itemStyle: { normal: { color: colors[1] } },
			name: 'python',
			value: [1, '2021/6/1 13:22', '2021/6/1 18:10']
			},
			{
			itemStyle: { normal: { color: colors[1] } },
			name: 'python',
			value: [1, '2021/6/1 12:47', '2021/6/1 14:52']
			},
			{
			itemStyle: { normal: { color: colors[2] } },//条形颜色
			name: 'java',
			value: [2, '2021/6/1 1:28', '2021/6/1 5:00']//0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
			},
			{
			itemStyle: { normal: { color: colors[2] } },
			name: 'java',
			value: [2, '2021/6/1 6:13', '2021/6/1 8:22']
			},
			
			]
			}
			]
			};
				option && myChart.setOption(option);
				var {data:res}=await this.$axios({
									url: "/languagetime",
									method: 'post',
									params: {
										userid:this.$store.state.userid,
										date:this.dateFormat(this.date),
										//userid:1.,
										//date:'2022-06-21 23:22:22'
									},
								});
				if(res.code==200)
				{
				console.log("getlanguagetime,success");
				option.yAxis.data=res.data.name;
				var timedata=[];
				var len=res.data.length[0];
				for(let i=0;i<len;i++)
				{
					var obj=new Object;
					var arr1=new Object;
					var arr2=new Object;
					arr2.color=colors[res.data.languagetime[i].value[0]];
					arr1.normal=arr2;
					obj.itemStyle=arr1;
					obj.name=res.data.languagetime[i].name[0];
					obj.value=res.data.languagetime[i].value;
					obj.value[0]=parseInt(obj.value[0]);
					timedata[i]=obj;
				}
				option.series[3].data=timedata;
				//option.legend.data=option.yAxis.data;
				option && myChart.setOption(option);
				}
				else
					console.log(res.msg);
			}
        },
		//监听函数
		watch: {
		'$route' () {
			this.initData();//我的初始化方法
			}
		},

    }


</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/home';
	.div-inline{ 
		display:inline;
		width:30%;
	}
	::v-deep.el-input--suffix .el-input__inner {
	padding-right: 102px;
	background-color:#6276ef;
	color:black;
	}
	/*
	::v-deep.el-input__inner {
	background-color:#5200c1;
	color: #fff;
	border: 1px solid #31cae4;
	}
	
	.el-select-dropdown__item {
  font-size: 15px;
	line-height: 19px;
	color: #000000;
	font-weight: 200;
	background-color: #5200c1;
	}
	::v-deep.el-select-dropdown {
	background-color: #5200c1;
	border: 1px solid blue;
	}
	::v-deep.el-select-dropdown__list {
	padding: 0;
	background-color:#5200c1;
	}
	::v-deep.el-popper[x-placement^="bottom"] {
	margin-top: 0px;
	background-color:#5200c1;
	}
	::v-deep.el-popper .popper__arrow,
	::v-deep.el-popper .popper__arrow::after {
	display: none;
	background-color:#5200c1;
	}
	.el-select-dropdown__item:hover {
	background-color:#5200c1;
	//background-color: rgba(0, 225, 219, 0.690196078431373);
	}
	*/
</style>
