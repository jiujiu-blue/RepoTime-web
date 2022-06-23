<template>
<div style="width: 70%;margin-left: 30%;margin-right: 30%;margin-top: 20%;">
  <el-form :model="ruleForm"
           :rules="rules"
           ref="ruleForm"
           label-width="100px"
           class="demo-dynamic"
  >
    <el-form-item
      style="width: 310px;background-color: aliceblue;"
      label="昵称"
      prop="nickname"
      :rules="[
          { required: true, message: '请注意昵称长度在3~20个字符', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20个字符', trigger: 'blur' }
        ]"

    >
      <el-input v-model="ruleForm.nickname"></el-input>
    </el-form-item>
    <br>
	<!--
    <el-form-item label="性别" prop="region">
      <el-select v-model="ruleForm.sex" placeholder="请选择性别">
        <el-option label="男" value="shanghai"></el-option>
        <el-option label="女" value="beijing"></el-option>
      </el-select>
    </el-form-item>
	-->
    <el-form-item
      style="width: 310px;background-color: aliceblue;"
      label="手机号码"
      prop="phone"
      :rules="[
          { required: true, message: '请注意长度在3~20个字符', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]"

    >
      <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>

    <el-form-item
      style="width: 310px;background-color: aliceblue;"
      prop="email"
      label="邮箱"
      :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
    >
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交修改</el-button>

    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "infoeditor",
  data() {
    return {
      ruleForm: {
        nickname: '',
        phone: '',
        email: ''
      },
    };
  },
  methods: {
    submitForm() {
	this.$axios({
	url: "/editinfo",
	method: 'post',
	params: {
		userid:this.$store.state.userid,
		nickname:this.ruleForm.nickname,
		phone:this.ruleForm.phone,
		email:this.ruleForm.email,
	}
	}).then(res =>{
		if(res.data.code==200)
		{
          console.log(res);
          this.$notify({
          title: '修改成功',
          type: 'success'
        });
		}
		else
		{
          console.log(res);
          this.$notify.error({
          title: '修改失败',
        });			
		}
	}).catch(function(error){
		console.log(error);
		this.$notify.error({
		title: '修改失败',
		});			
	})
    },
  }
}
</script>

<style scoped>

</style>

