<template>
<div class="rights">
   <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>

</div>
</template>

<script>
export default {
    name:'Rights',
    data() {
        return {
          rightsList:[]

        };
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      this.getRightsList();

    },
    methods:{
      async getRightsList(){
       try {
          const res =  await this.$axios.get('/rightsList');
          const {meta:{ status },data} = res;
          if(status === 200){
            this.rightsList = data;
            this.$message.success('权限列表获取成功');
          }else{
            this.$message.error('权限列表获取失败');

          }

       }catch(e){}

      }

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {


    }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */

</style>
