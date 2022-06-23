<template>
  <div>
    <div class="show">
      <div class="show1" >
        <img ref="showing" src="" id="showimg" style="margin-left: 1px;margin-top: 3px">
      </div>
      <br>
      <div class="upload">图片选择
      <input multiple="multiple" id="file" ref="file"
             accept=".jpg,.png"
             @click="changepic(this)" type="file" name="userpic"
             style="
              position: absolute;
              overflow: hidden;
              right: 0;
              top: 0;
              opacity: 0;
             width: 100%;
             height: 32px;
             "
      >
      </div>
      <button @click="subchangepic()" style="height: 40px;position: relative; margin-left:35%;">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "imageUp",
  data(){
    return {
      filename: null,
      f64: null,
      loadImage: ""
    }
  },
  methods: {


    changepic() {
      document.getElementById('file').onchange = function () {
        var imgFile = this.files[0];
        var fr = new FileReader();

        fr.onload = function () {
          let showing = document.getElementById('showimg')
          let img = fr.result;
          this.f64 = img;
          this.filename = imgFile.name
          showing.src = img;
          showing.style.height = "220px";
          showing.style.width = "220px";
          showing.style.borderRadius = "200px"
        };
        fr.readAsDataURL(imgFile);
      }
    },
	subchangepic(){
		if(this.$refs.file.files[0]!=null){
			this.f64 = this.$refs.file.files[0]
			console.log(this.f64.name)
			let param = new FormData();
			param.append("file",this.f64);
			this.$axios({
			url: "/login",
			method: 'post',
			data: param,
			}).then(res =>{
			//let data = res.data
				console.log(res);
				this.$router.push({ name: 'showinfo' });
			}).catch(function(error){
				console.log(error);
			})
		}
	}
  }
}
</script>

<style scoped>

.upload{
  margin-left: 13%;
  text-align: center;
  color: white;
  height: 35px;
  border-radius: 3px;
  background: #1E90FF;
  cursor: pointer;
  outline: none;
  border-width: 0px;
  font-size: 17px;
  display:inline-block;
  padding: 4px 10px;
  line-height:30px;
  position: relative;
  text-decoration: none;

}

button {
  margin-left: 70%;
  width: 20%;
  height: 35px;
  border-width: 0px;
  border-radius: 3px;
  background: #1E90FF;
  cursor: pointer;
  outline: none;
  color: white;
  font-size: 17px;
}
.show{
  margin: 65px auto;
  width: 80%;
  height: 450px;
  border: 5px solid #18a0ec;
  transition: all 0.9s;
  border-radius: 10px;

}
.show1{
  margin: 50px auto;
  width: 222px;
  height: 226px;
  border: 5px solid #18a0ec;
  transition: all 0.9s;
  border-radius: 150px;

}

.show1:hover{
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
  margin-top: 45px;
}

.show:hover{
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
  margin-top: 45px;

}

.texti{
  border: 1px solid #ccc;
  padding: 13px 14px;
  width: 30%;

  font-size: 14px;
  font-weight: 300;

  border-radius: 5px; /* 边框半径 */
  background: white; /* 背景颜色 */
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */


}
.texti:focus{
  border-color: #1e88e1;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}
textarea {
  resize: none;

}
</style>


