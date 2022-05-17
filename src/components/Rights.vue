<template>
<div class="rights">
   <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
      <el-table
      :data="rightsList">
      <el-table-column
        prop="authName"
        label="权限名称">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        label="权限等级">
       <template v-slot:default="{row:{level}}">
       <!-- # 自定义插槽，可以用三目运算符，也可以用v-if语句 -->
       <!-- {{+level === 0?'一级':(+level === 2 ? '二级':'三级')}} -->
       <span v-if="+level === 0">一级</span>
       <span v-else-if="+level === 1">二级</span>
       <span v-else>三级</span>

       </template>
      </el-table-column>
    </el-table>

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
