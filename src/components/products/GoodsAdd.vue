<!--  -->
<template>
<div class="goods_add">
 <el-steps :active="active"  finish-status="success">
  <el-step :title="t1" description="基本信息"></el-step>
  <el-step :title="t2" description="商品图片"></el-step>
  <el-step :title="t3" description="商品内容"></el-step>
</el-steps>
<el-tabs :tab-position="tabPosition" @tab-click="handleClick" v-model="activeName">
    <el-tab-pane label="基本信息" name="0">
      <el-form :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.goods_weight" placeholder="请输入商品重量"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.goods_number" placeholder="请输入商品数量"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
             <el-cascader
                v-model="form.goods_cat"
                :options="options"
                :props="props">
              </el-cascader>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="next">下一步</el-button>
        </el-form-item>

      </el-form>


    </el-tab-pane>
    <el-tab-pane label="商品图片" name="1">
        <el-upload
          action="http://localhost:3000/upload"
          :header="header"
          list-type="picture-card"
          multiple
          @on-success="handleSuccess"
          >
          <i slot="default" class="el-icon-plus"></i>
         <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>

      </el-upload>
      <el-button type="primary" @click="next" style="marginTop:20px">下一步</el-button>

    </el-tab-pane>
    <el-tab-pane label="商品内容" name="2">
      <!-- # 富文本编辑器  基于vue的插件
        http://doc.quilljs.cn/1434140

       -->
      <quill-editor
        v-model="form.goods_introduce"
      >
      </quill-editor>

    </el-tab-pane>
  </el-tabs>


<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>

</div>
</template>

<script>

export default {
    name:'GoodsAdd',
    data() {
        return {
          active:0,
          activeName:'0',
          t1:'',
          t2:'',
          t3:'',
          tabPosition:'left',
          form:{
            goods_name:'',
            goods_cat:[],
            goods_price:'',
            goods_number:'',
            goods_weight:'',
            goods_introduce:'',
            pics:[]

          },
          options:[],
          props:{
            value:'cat_pid',
            label:'cat_name',

          },
          header:{
            Authorization:localStorage.getItem('token')
          },
          dialogVisible:false,
          dialogImageUrl:'',

        };
    },
    watch:{
      //TODO:监听active
      active:{
        immediate:true,//立即监听
        handler(value){
          if(value === 0){
            this.t1 = '进行中';
            this.t2 = '未完成';
            this.t3 = '未完成';
            this.activeName = '0';
          }else if(value ===1){
            this.t1 = '已完成';
            this.t2 = '进行中';
            this.t3 = '未完成';
            this.activeName = '1';
          }else if(value === 2){
            this.t1 = '已完成';
            this.t2 = '已完成';
            this.t3 = '进行中';
            this.activeName = '2';

          }
        }
      }
    },
    methods:{
      handleClick(tab){
        this.active = +tab.index;

      },
      next(){
        this.active++;
        this.activeName = `${this.active}`;
      },

      handleSuccess(res,file,fileList){
        //TODO:假装上传成功。有返回值
        this.form.pics = fileList;


      },
      handlePreview(file){
        // 图片预览就是弹个弹框，把图片地址给弹框里的图片
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;

      },
      handleRemove(file,fileList){
        this.form.pics = this.form.pics.filter(item=> item.name !== file.name);
        //要改变fileList

        // TODO:不会删除失败，因为上传接口有问题
        const ids = fileList.findIndex(item=>item.uid===file.uid);
        fileList.splice(ids, 1);

      },
    },
    //生命周期 - 创建完成（访问当前this实例）
    async created() {
      const {result,meta:{status}} = await this.$axios.get('/categories');
        if(status === 200){
          this.options = result.data;
        }else {
          this.$message.error('获取失败');
        }

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    }
};
</script>
<!-- # 让插件中的子类生效：1，去掉scoped，2，再写一个style不加scoped,3，使用下面的深度作用选择器 -->
<style lang="less" scoped>
//!:https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84%E6%A0%B9%E5%85%83%E7%B4%A0
//>>>是css语法
// /deep/是less语法
// ::v-deep是scss语法

.quill-editor {
  background-color: #fff;

  /deep/ .ql-editor {
    height:300px
  }


}

</style>
