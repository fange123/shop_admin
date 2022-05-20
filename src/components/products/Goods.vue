<template>
<div class="goods">
<el-button type="success" plain>添加商品</el-button>
<el-table
  v-loading="loading"
  element-loading-text="拼命加载中~~~~"
  :data="goodsList"
  style="width: 100%"
>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180">
        <template v-slot:default="scope">
        <span>{{scope.cat_delete ? '无效':'有效'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量">
      </el-table-column>
      <el-table-column
        label="添加时间">
        <template v-slot="{row}">
        {{new Date(row.add_time)}}
        </template>
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
    name:'Goods',
    data() {
        return {
          goodsList:[],
          loading:false,

        };
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
      this.getGoodsList();



    },
    methods:{
      async getGoodsList(){
       try{
          this.loading = true;
        const {data,meta:{status}} = await this.$axios.get('/goods',{
          pageSize:1,
          pageNum:10
        });

        if(status === 200){
          this.goodsList = data.goods;
          this.$message.success('获取成功');
        }else{
          this.$message.error('获取失败');
        }
        this.loading = false;
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
