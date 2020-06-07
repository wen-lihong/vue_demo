<template>
  <div>
     <div class="md-modal modal-msg md-modal-transition " v-bind:class ="{'md-show':mdShow}" >
          <div class="md-modal-inner">
            <div class="md-content">
              <div class="md-top">
                <button class="md-close" @click = "closs"></button>
              </div>
              <div class="confirm-tips">
                <slot name = "message"></slot>
              </div>
              <div class="btn-wrap">
                <slot name = "btnGroup"></slot>
              </div>
            </div>
          </div>
     </div>
     <div class="md-overlay" v-if='mdShow'  @click = "closs"></div>
  </div>
</template>
<script> 
  export default{
  	props:['mdShow'],
    data(){
      return{
        
        }
      },
    
     methods:{
      closs(){
        console.log(1)
      	this.$emit('closs')
      }
      },
     
  }
</script>