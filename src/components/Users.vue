<template>
  <div class="users">
    <!-- 面包屑 -->
    <!-- 搜索框 -->
    <!-- 表格 -->
    <!-- 分页 -->
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
          pageSize:5
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
          console.log(res.data);

        });

      }

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    }
};
</script>
<style lang="less" scoped>
.users {
}

</style>
