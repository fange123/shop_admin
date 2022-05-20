<!--  -->
<template>
<div class="categories">
  <el-button type="success" plain @click="showAddDialog">添加分类</el-button>
  <el-table
      v-loading="loading"
      element-loading-text="拼命加载中~~~~"
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
    <el-dialog title="添加分类" :visible.sync="addVisible" width="40%">
      <el-form label-width="80px" :model="form"  status-icon :rules="rules" ref="form">
         <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="form.cat_name" placeholder="请输入分类名"></el-input>
        </el-form-item>
         <el-form-item label="父级名称" prop="cat_pid">
             <el-cascader
             :props="props"
             clearable
              v-model="form.cat_pid"
              :options="options">
            </el-cascader>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>

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
          total:1,
          loading:true,
          addVisible:false,
          options:[],
          form:{
            cat_name:'',
            cat_level:'',
            cat_pid:''
          },
          rules: {
            cat_name:[
              { required: true,message:'分类名称不能为空',trigger:['change','blur']}
            ]
          },
          props:{
            value:'cat_pid',
            label:'cat_name',
            checkStrictly:true
          }

        };
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      this.getCategoryList();

    },
    methods: {
      async getCategoryList(){
        this.loading = true;
        const {result,meta:{status}} = await this.$axios.get('/categories',{
          type:3,
          pageNum:this.pageNum,
          pageSize:this.pageSize
        });
        if(status === 200){
          this.categoryList = result.data;
          this.total = result.total;
        }

        // TODO:假装数据量大，服务器返回时间有一点长
        setTimeout(() =>{
          this.loading = false;

        },1000);

      },
      async showAddDialog(){
        this.addVisible = true;
        const {data,meta:{status}} = await this.$axios.get('/categoriesType2');
        if(status === 200){
          this.options = data;
        }else {
          this.$message.error('获取失败');
        }
      },
      async handleAdd(){

        try {
          await this.$refs.form.validate();
          //TODO:假装请求成功，关闭弹框，清空form
          this.addVisible = false;
          this.$refs.form.resetFields();
          const {} = await this.$axios.post('/categories/add',{
          cat_name: this.form.cat_name,
          //只要最后一级父id
          cat_pid:this.form.cat_pid[this.form.cat_pid.length -1] || 0,
          cat_level:this.form.cat_pid.length
        });

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
