<template>
     <el-container class="index">
      <el-header>
        <div class="logo"></div>
        <div class="title">
          <h1>电商管理系统</h1>
        </div>
        <div class="logout">
          Hi~xxx
          <a href="javascript:;" @click="logout">登出</a>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
          >
          <el-submenu index="1">
            <template v-slot:title>
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                <span slot="title">用户列表</span>
            </el-menu-item>

          </el-submenu>
          <el-submenu index="2">
            <template v-slot:title>
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                <span slot="title">权限列表</span>
            </el-menu-item>

          </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
    name:'Index',
    data() {
        return {

        };
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    },

    methods:{
      logout() {
        this.$confirm('是否退出登录?', '温馨提示', {
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('token');
          this.$router.push('/login');
          this.$message.success({ message: '登出成功!' });

        }).catch(() => {
          this.$message('已取消退出');
        });
      }
    }
};
</script>
<style lang="less" scoped>
// * scoped原理：scoped会给当前组件里面的所有的元素都添加一个随机的自定义属性，比如长这样：data-v-5fhf747
// * 并且给当前组件的style中的所有样式都加上一个属性选择器，属性选择器和添加的自定义属性是匹配的
.index {
  height:100%;
  .el-header {
    background-color:#bdc3c7;
    display: flex;
    height:60px;
    line-height: 60px;
    .logo {
      width:180px;
      background: url('../assets/images/logo.png') no-repeat center center / contain;

    }
    .title {
      flex:1;
      h1 {
        text-align: center;
        color:#fff
      }

    }
    .logout {
      width:180px;
      text-align: right;
      a {
        text-decoration: none;
        color:#f39c12;
      }


    }
  }
  .el-aside {
    background-color: #7f8c8d;
  }
  .el-main {
    background-color: #ecf0f1;
  }


}

</style>
