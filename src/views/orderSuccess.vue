<template>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/checkout.css">
</head>
<body>
<nav-header></nav-header>
<nav-bread>
  <span>orderSuccess</span>
</nav-bread>
<div>
  <div class="container">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>check out</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
      <ul>
        <li class="cur"><span>Confirm</span> address</li>
        <li class="cur"><span>View your</span> order</li>
        <li class="cur"><span>Make</span> payment</li>
        <li class="cur"><span>Order</span> confirmation</li>
      </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
      <div class="order-create-main">
        <h3>Congratulations! <br>Your order is under processing!</h3>
        <p>
          <span>Order ID：{{orderId}}</span>
          <span>Order total：{{orderTotle|currency('$')}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link to="/Cart" class="btn btn--m">Cart List</router-link>
          </div>
          <div class="btn-r-wrap">
            <router-link to="/" class="btn btn--m">Goods List</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<nav-footer></nav-footer>
</body>
</html>

</template>
<script type="text/javascript">
  import './../assets/css/checkout.css'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import Model from '@/components/Model.vue'
  import axios from 'axios'
   export default{
    data(){
      return {
          orderId:'',
          orderTotle:''
         }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
      Model
     },
    mounted:function(){
      this.init()
    },
    methods:{
      init(){
         let orderId = this.$route.query.orderId
        axios.get("/users/orderSuccess",{
          params:{
           'orderId':orderId
          }
        }).then((respones)=>{
          let res = respones.data;
          if(res.status == 0){
           this.orderId=res.result.orderId
           this.orderTotle=res.result.orderTotol
          }
        })
      }    	
    	}     
  }
</script>