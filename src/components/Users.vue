<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
    <!-- 搜索框 -->
    <div class="input_wrap">
      <el-input placeholder="请输入搜索关键字" v-model="query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
    </el-input>
    <el-button plain type="success" @click="showAddDialog">添加用户</el-button>


    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱地址">
      </el-table-column>
      <el-table-column
        label="用户状态">
        <!-- TODO:默认插槽，新写法 -->
         <template v-slot:default="scope">
           <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeState(scope.row)">
          </el-switch>
         </template>

      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column label="操作" width="300">
         <template v-slot:default="scope">
           <el-button type="primary" plain icon="el-icon-edit" circle size="small" @click="showEdit(scope.row)"></el-button>
           <el-button type="danger" plain icon="el-icon-delete" circle size="small" @click="delUser(scope.row.id)"></el-button>
            <el-button type="success" plain icon="el-icon-check" round size="small">分配角色</el-button>


         </template>

      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2,4,6,8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
    <el-dialog
      title="编辑用户"
      :visible.sync="editVisible"
      width="40%">
      <el-form label-width="80px" :model="editForm"  status-icon :rules="rules" ref="editForm">
         <el-form-item label="用户名" >
         <el-tag type="info">{{editForm.username}}</el-tag>
        </el-form-item>
         <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
         <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加用户"
      :visible.sync="addVisible"
      width="40%">
      <el-form label-width="80px" :model="form"  status-icon :rules="rules" ref="form">
         <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
         <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
         <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
    name:'Users',
    data() {
        return {
          query:'',
          pageNum:1,
          pageSize:2,
          tableData:[],
          total:0,
          addVisible:false,
          editVisible:false,
          form:{
            username:'',
            password:'',
            email:'',
            mobile:''
          },
          editForm:{
            id:'',
            username:'',
            email:'',
            mobile:''
          },
              rules: {
                 password: [
                  { required: true, message: '请输入密码', trigger: ['blur','change'] },
                  { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['blur','change'] }
                ],
                username: [
                  { required: true, message: '请输入用户名', trigger: ['blur','change'] },
                  { min: 3, max: 8, message: '长度在 3 到 8 个字符',trigger: ['blur','change'] }
                ],
                email: [
                   { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                mobile: [
                   { pattern: /^1[3-9](\d{9})$/, message: '请输入正确的手机格式', trigger: ['blur', 'change'] }
                ],

        }

        };
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      this.getUserList();

    },

    methods: {
      async getUserList(){
        try{
           const res =  await this.$axios.get('/userList',{
            params: {
              query:this.query,
              pageNum:this.pageNum,
              pageSize:this.pageSize,
            },

        });
          const {data,meta:{status}} = res;
          if(status === 200){
            this.tableData = data.users;
            this.total = data.total;
          }

        }catch(e){
          console.log(e);
        }

      },

      handleSizeChange(val) { console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getUserList();
      },

      handleCurrentChange(val) {
        this.pageNum = val;
        this.getUserList();
       },

       async delUser(id){
         try {
            await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          });
            const res =  await this.$axios.delete(`/userList/${id}`);
            const {meta:{ status,msg}} = res;
            if(status == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              // !: 如果当前页面的数据只剩一条了，那么删除之后应该页码数减1
              if(this.tableData.length === 1 && this.pageNum > 1){
                this.pageNum --;
              }
              this.getUserList();
            }else{
              this.$message.error(msg);
            }

         }catch(e){
            this.$message({
            type: 'info',
            message: '已取消删除'
          });
         }

       },
       searchUser(){
         //搜索时要重新显示第一页
         this.pageNum = 1;
         this.getUserList();
       },
       async changeState(row){
       try{
          const res = await this.$axios.put(`/getUserList/${row.id}`,{
          data:{
            mg_state:row.mg_state
          }
         });
          if(res.msg.status === 200){
             this.$message.success = '修改成功';
           }else{
             this.$message.error = '修改失败';

           }
       }catch(e){
         console.log(e);
       }
       },
       showAddDialog(){
         this.addVisible = true;
       },
       async addUser(){
         try {
           await this.$refs.form.validate;
           const res = await this.$axios.get('/addUserList',{params:this.form});
           const {meta:{ status, msg }} = res;
           if(status === 200){
             this.$message.success(msg);
            // 重置表单
            this.$refs.form.resetFields();
            // 关闭弹窗
            this.addVisible = false;
            // 更新列表
            this.getUserList();
           }else{
             this.$message.error('添加失败');

           }

         }catch(e){
           console.log(e);
         }

       },

       showEdit(form){
         const {username,email,mobile,id} = form;
         //!: 编辑的时候，需要在显示弹框的时候回显出内容
         this.editVisible = true;
         this.editForm.username =username;
         this.editForm.email =email;
         this.editForm.mobile =mobile;
         this.editForm.id = id;

       },
      async editUser(){
        try {
          await this.$refs.editForm.validate();
          //TODO: 提交表单项，最好精确一下提交参数，不要传多余值
          const {id,username,email,mobile} = this.editForm;
        const res =  await this.$axios.put(`/users/${id}`,{
          username,email,mobile
        });
        const {status,msg} = res.meta;
        if(status === 200){
          this.$message.success(msg);
          this.editVisible = false;
          this.$refs.editForm.resetFields();
          this.getUserList();
        }else{
          this.$message.error(msg);
        }
        }catch(e){
          console.log(e);
        }

       }


    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    }
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  height:40px;
  line-height: 40px;
}
.input_wrap {
  margin:10px 0;
  .el-input {
    width:300px;
    margin-right: 20px;

  }
}


</style>
