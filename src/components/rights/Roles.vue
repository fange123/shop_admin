<template>
  <div class="roles">
     <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="search_wrap">
    <el-button type="success" plain @click="addDialog">添加角色</el-button>

  </div>
  <el-table :data="rolesList">
      <el-table-column
      type="expand" class="expand">

      <template v-slot:default="{row}">
      <span v-if="row.children.length===0">当前角色没有任何权限...</span>
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
        <el-button type="primary" plain circle size='small' icon='el-icon-edit' @click='editVisible(row)'/>
        <el-button type="danger" plain circle size='small' icon='el-icon-delete' @click='delRight(row,$event)'/>
        <el-button type="success" plain round  size='small' icon='el-icon-check' @click="showDialog(row)">分配权限</el-button>
       </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="分配权限"
      :visible.sync="assignVisible"
      width="40%">
      <el-tree
      :data="data"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      ref="tree"
      default-expand-all></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignRights">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="type"
      :visible.sync="addVisible"
      width="40%">
      <el-form :model="form" label-width="80px" :rules="rules" ref="form" status-icon>
      <el-form-item label="角色名称" prop="roleName" >
        <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc" >
        <el-input v-model="form.roleDesc" placeholder="请输角色描述"></el-input>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>


export default {
    name:'Roles',
    data() {
        return {
          type:'',
          rolesList:[],
          assignVisible:false,
          addVisible:false,
           data: [],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        form:{
          roleName:'',
          roleDesc:''
        },
        roleId:'',
        rules:{
          roleName:[
            { required: true,message:'角色名称不能为空',trigger:['change','blur']}
           ],
          roleDesc:[
            { required: true,message:'角色描述不能为空',trigger:['change','blur']}
           ],

        }


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

      },
      async getRolesTree(row){
        try {
          const {data,meta:{status}} = await this.$axios.get('/rightsTree');
        if(status === 200){
           if(status === 200){
          this.data = data;
          this.$message.success('角色列表获取成功');
          // 回显三级id
          const ids = [];//三级id
          row.children.forEach(l1=>{
            l1.children.forEach(l2=> {
              l2.children.forEach(l3=> {
                ids.push(l3.id);
              });
            });
          });
          this.$refs.tree.setCheckedKeys(ids);
        }else{
          this.$message.error('角色列表获取失败');

        }

        }

        }catch(e){}
      },
      async assignRights(){
        //分配权限，需要子id以及父级id
        const ids = this.$refs.tree.getCheckedKeys();//全选中id
        const halfIds = this.$refs.tree.getHalfCheckedKeys();//半选中id
        const rids = [...ids,...halfIds].join();
       try {
          const {meta:{ status}} = await this.$axios.post(`/roles/${this.roleId}/rights`,{rids});
        if(status === 200){
          this.$message.success('成功');
          this.assignVisible = false;
          this.getRolesList();
        }else{
          this.$message.success('失败');

        }

       }catch(e) {}

      },
      async delRight(row,e){

        try {
        await this.$confirm('确定删除吗','确定',{type:"warning"});
        //TODO: 发送删除的ajax请求。。。


        }catch(e){
          this.$message.info('取消删除');

        }finally{
        //TODO:解决elementUI失焦bug,icon-delete,外面是button,里面是i
        if(e.target.nodeName ==='I'){
          e.target.parentNode.blur();

        }else{
          e.target.blur();
        }

        }

      },
      showDialog(row){
        this.assignVisible = true;
        this.getRolesTree(row);
        this.roleId = row.id;
      },
      addDialog(){
        this.addVisible = true;
        this.$nextTick(()=>{ this.$refs.form.resetFields(); });
        this.type = '添加';

      },
      editVisible(row){
        this.addVisible = true;
        this.type = '编辑';
        const {roleName,roleDesc,id } = row;
        this.$nextTick(()=> {
          this.form.roleDesc = roleDesc;
        this.form.roleName = roleName;
        });

      },
      async handleSubmit(){
       try {
          await this.$refs.form.validate();
        //TODO:添加或者编辑的ajax
        this.$message.success('操作成功');
        this.$refs.form.resetFields();
        this.addVisible = false;

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
.search_wrap {
  margin: 5px 0;
}

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
