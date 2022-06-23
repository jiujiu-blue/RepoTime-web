<template>
<div style="width: 70%;margin-left: 30%;margin-right: 30%;margin-top: 20%;">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="修改密码" prop="pass" style="width: 310px;background-color: aliceblue;">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认修改" prop="checkPass" style="width: 310px;background-color: aliceblue;">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "countcontrol",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if(value.length<=6){
          callback(new Error("密码长度不能低于6"))
        }
        if (this.ruleForm.checkPass !== '' ) {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        verify: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
			this.$axios({
			url: "/editpwd",
			method: 'post',
			params: {
				userid:this.$store.state.userid,
				password:this.ruleForm.pass
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
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>

