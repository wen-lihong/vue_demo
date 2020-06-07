<template>
 <div>
<nav-header></nav-header>    
<nav-bread>
  <span>Goods</span>
</nav-bread>
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="javascript:void(0)" class="default cur" >Default</a>
      <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sort}" @click='sortif()'>Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
      <a href="javascript:void(0)" class="filterby stopPop"  @click='fiter()'>Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter -->
    <div class="filter stopPop " id="filter" v-bind:class="{'filterby-show':openPop}">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)" @click="setPriceFilter('All')"v-bind:class="{'cur':change=='All'}">All</a></dd>
          <dd v-for="(price,index) in pricelist" >
            <a  @click="setPriceFilter(index)" v-bind:class="{'cur':change==index}">{{price.priceStar}} - {{price.priceEed}}</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul >
            <li v-for = "item in goodsList">
              <div class="pic">
                <a href="#"><img  v-lazy="'static/'+item.productImage"  alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice|currency('$')}}</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
          <div class="loadMore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
             <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop()"></div>
    </div>
  </div>
</div>
<nav-footer></nav-footer>
<model v-bind:mdShow='mdShow'v-on:closs = 'closs'>
  <p slot="message">当前未登录，不能加入到购物车里面！</p>
  <div slot="btnGroup">
    <a href="javascript:;" class="btn btn--m" @click = "mdShow=false">关闭</a>
  </div>
</model>
<model v-bind:mdShow='mdShowcart'v-on:closs = 'closs'>
  <p slot="message">
    <svg class="icon-status-ok">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
    </svg>   
    <span>加入购物车成功！</span>
  </p>
  <div slot="btnGroup">
    <a href="javascript:;" class="btn btn--m" @click = "mdShowcart=false">继续购物</a>
    <router-link href="javascript:;" class="btn btn--m" to ="/cart">查看购物车</router-link>
  </div>
</model>
  <!-- 箭头 -->
 <symbol id="icon-arrow-short" viewBox="0 0 25 32">
          <title>arrow-short</title>
          <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
  </symbol>
 </div>
</template>
<style type="text/css">
  .loadMore{
    height: 100px;
    line-height: 100px;
    text-align: center;

  }
  .sort-up .icon-arrow-short{
    transition: all .3s ease-out;
  }
  .price .icon-arrow-short{

     transition: all .3s ease-out;
  }
  .btn:hover{
    background-color: #ffe5e6;
    transition: all .3s ease-out;
  }
</style>
<script>
 
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import Model from '@/components/Model.vue'
  import axios from 'axios'
  export default{
    data(){
      return {
        goodsList:[],
        pricelist:[
          {priceStar:'0',priceEed:'100'},
          {priceStar:'100',priceEed:'500'},
          {priceStar:'500',priceEed:'1000'},
          {priceStar:'1000',priceEed:'2000'}
        ],
        openPop:false,
        overLayFlag:false,
        change:'All',
        page:'1',
        pagesize:'8',
        sort:true,
        busy:true,//控制下拉加载方法是否执行
        loading:false,
        mdShow:false,
        mdShowcart:false

        }
     },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
      Model
     },
    mounted:function(){
        this.getGoodsList()
       },
     methods:{
       getGoodsList(flag){
         let page =this.page;
         let pagesize =this.pagesize;
         let sort =this.sort?1:-1;
         let change = this.change
         let param={
          page:page,
          pagesize:pagesize,
          sort:sort,
          priceLevel:change
        }
         console.log(pagesize)
         this.loading = true;
         axios.get("/goods",{
          params:param
       }).then((result)=>{
        this.loading = false;
      if(result.data.status='0'){
        if (flag) {
            if(result.data.result.count==0){
             this.busy=true
           }else{
            this.busy=false
           }
           this.goodsList=this.goodsList.concat(result.data.result.list)
         
        }else{
         this.goodsList=result.data.result.list
         this.busy=false
        }
        }else{
          this.goodsList=[]
        }
    })
       },
       //升降序
       sortif(){
         this.sort=!this.sort;
         this.page=1;
         this.getGoodsList()
       },
       fiter(){
        this.openPop = true;
        this.overLayFlag = true;
       },
       closePop(){
        this.openPop = false;
        this.overLayFlag = false;
       },
      
       //下拉加载（分页）
       loadMore(){
      this.busy = true;
      setTimeout(() => {
        this.page++;

        this.getGoodsList(true)
      }, 1000);
       },
       //价格区间
       setPriceFilter(index){
         this.change = index;
         this.page = 1;
         this.getGoodsList();
       },
        //加入购物车
       addCart(productId){
        axios.post("/goods/addCart",
          {productId:productId}).then((res)=>{
            var res = res.data;
            if(res.status==0){
             this.mdShowcart =true;
             this.$store.commit('updateCartCount',1);
            }else{
              this.mdShow =true;
            }
          })
       },
      closs(){
        this.mdShow = false;
         this.mdShowcart = false;
      }
     }
  }
</script>
