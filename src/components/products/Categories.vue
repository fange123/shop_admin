<!--  -->
<template>
<div class="categories">
  <el-button type="success" plain>添加分类</el-button>
  <el-table
  row-key="cat_id"
      :data="categoryList"
      style="width: 100%">
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cat_delete"
        label="是否有效"
        width="180">
        <template v-slot:default="scope">
        <span>{{scope.cat_delete ? '无效':'有效'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="排序">
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot="{row}">
            <el-button type="primary" plain circle size='small' icon='el-icon-edit'/>
            <el-button type="danger" plain circle size='small' icon='el-icon-delete'/>

        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    name:'Categories',
    data() {
        return {
          categoryList:[],
          pageSize:1,
          pageNum:10,
          total:1

        };
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      this.getCategoryList();

    },
    methods: {
      async getCategoryList(){
        const {result,meta:{status}} = await this.$axios.get('/categories',{
          type:3,
          pageNum:this.pageNum,
          pageSize:this.pageSize
        });
        if(status === 200){
          this.categoryList = result.data;
          this.total = result.total;
        }
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
