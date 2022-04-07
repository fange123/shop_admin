<template>
  <div class="users">
    <!-- 面包屑 -->
    <!-- 搜索框 -->
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
           <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
         </template>

      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column label="操作" width="300">
         <template v-slot:default="scope">
           <el-button type="primary" plain icon="el-icon-edit" circle size="small"></el-button>
           <el-button type="danger" plain icon="el-icon-delete" circle size="small"></el-button>
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

  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'Users',
    data() {
        return {
          query:'',
          pageNum:1,
          pageSize:2,
          tableData:[],
          total:0
        };
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      this.getUserList();

    },

    methods: {
      getUserList(){
        axios.get('http://localhost:3000/userList',{
          params: {
            query:this.query,
            pageNum:this.pageNum,
            pageSize:this.pageSize,
          },
          //* 请求必须带token
          headers:{
            Authorization:localStorage.getItem('token')
          }
        }).then(res=> {
          const {data,meta:{status}} = res.data;
          if(status === 200){
            this.tableData = data.users;
            this.total = data.total;
          }

        });

      },

      handleSizeChange(val) { console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getUserList();
      },

      handleCurrentChange(val) {
        this.pageNum = val;
        this.getUserList();
       }


    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    }
};
</script>
<style lang="less" scoped>


</style>
