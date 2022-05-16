<!--  -->
<template>
<div class="container">

 <el-form :model="ruleForm" status-icon label-width="80px" :rules="rules" ref="ruleForm">
     <img :src="loginPng" alt="">
  <el-form-item label="用户名" prop="username">
    <el-input type="username" v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
  </el-form-item>
  //TODO:.native 修饰符:给组件添加原声事件
  <el-form-item label="密码" prop="password" @keyup.enter.native = "submitForm">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item >
    <el-button type="primary" @click="submitForm" class="submit-btn">提交</el-button>
    <el-button @click="resetForm" class="submit-btn">重置</el-button>

  </el-form-item>
</el-form>

</div>

</template>

<script>
import loginPng from '../assets/images/1.jpeg';

export default {
    name:'Login',
    data() {
        return {
          ruleForm: {
            password:'',
            username:'',
          },
          loginPng,
          rules: {
          password: [
            { required: true, message: '请输入密码', trigger: ['blur','change'] },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['blur','change'] }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: ['blur','change'] },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符',trigger: ['blur','change'] }
          ],

        }

        };
    },
    methods:{
      async submitForm(){
      try {
          await this.$refs.ruleForm.validate();
          const res = await this.$axios.get('/login',{params: this.form});
          const {meta:{ status, msg },data} = res;
              if(status === 200){
                this.$message({ message: msg, type: 'success' ,duration:1000});
                localStorage.setItem('token',data.token);
                this.$router.push('/');

              }else{
                this.$message.error(err);
              }

      }catch(e){
        console.log(e);
      }
      },
      resetForm(){
        console.log('重置');
        // * 使用了refs就必须给组件ref的属性
        this.$refs.ruleForm.resetFields();

      }

    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */

.container {
  height:100%;
  width:100%;
  background-color:#48574f;
  overflow: hidden;

}
.el-form {
  width:450px;
  height:280px;
  margin: 0 auto;
  margin-top: 120px;
  padding: 100px 20px 0;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  img {
    width:150px;
    height:150px;
    border-radius: 50%;
    position: absolute;
    top:-70px;
    left:50%;
    margin-left:-75px;
    border:5px solid #fff;

     }

}

.submit-btn {
  width: 120px;
  }


</style>
