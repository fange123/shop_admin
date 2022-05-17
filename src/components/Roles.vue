<template>
  <div class="roles">
     <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table :data="rolesList">
      <el-table-column
      type="expand" class="expand">
      <template v-slot:default="{row}">
        <el-row v-for="l1 in row.children" :key="l1.id" class="l1">
          <el-col :span="4">
            <el-tag closable @close="delRight(row,l1.id)">{{l1.authName}}</el-tag>
            &nbsp;<span class="el-icon-arrow-right"></span>
          </el-col>
          <el-col :span="20">
            <el-row v-for="l2 in l1.children" :key="l2.id" class="l2">
              <el-col :span="4">
                <el-tag closable type="success" @close="delRight(row,l2.id)">{{l2.authName}}</el-tag>
                 &nbsp;<span class="el-icon-arrow-right"></span>
              </el-col>
              <el-col :span="20">
                <el-tag closable type="warning" v-for="l3 in l2.children" :key="l3.id" class="l3" @close="delRight(row,l3.id)">{{l3.authName}}</el-tag>
              </el-col>
            </el-row>
          </el-col>

        </el-row>
      </template>
      </el-table-column>
      <el-table-column
      label="#"
      width="50"
      type="index" >
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
      </el-table-column>
      <el-table-column
        label="描述">
       <template v-slot:default="{row}">
        <el-button type="primary" plain circle size='small' icon='el-icon-edit'/>
        <el-button type="danger" plain circle size='small' icon='el-icon-delete'/>
        <el-button type="success" plain round  size='small' icon='el-icon-check'>分配权限</el-button>
       </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
export default {
    name:'Roles',
    data() {
        return {
          rolesList:[]

        };
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      this.getRolesList();

    },
    methods:{
      async getRolesList(){
       try {
          const {data,meta:{ status}} = await this.$axios.get('/roles');
        if(status === 200){
          this.rolesList = data;
          this.$message.success('角色列表获取成功');
        }else{
          this.$message.error('角色列表获取失败');

        }

       }catch(e){}

      },
     async delRight(row,id){
       try {
         const {meta:{ status},data} = await this.$axios.delete(`roles/${row.id}/del/${id}`);
       if(status === 200){
         this.$message.success('删除成功');
         this.getRolesList();
         //TODO:删除后重新渲染，但并不是渲染整个列表，只渲染当前列表的权限内容，通过返回值把原来的替换掉
         row.children = data;

       }else{
         this.$message.error('删除失败');
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

.l1 {
  padding:20px 0 0 20px;
  border-bottom: 1px dashed #ccc;
}
.l2 {
  margin-bottom: 10px;
  &::last-child {
    margin-bottom: 0;
  }
}

.l3 {
  margin-right: 5px;
}

</style>
