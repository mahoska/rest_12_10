<template>
        <div>
        111111111-{{isFilter}}-2222222222
          <table class="table">
            <tr v-for="car in filters"  >
              <td>
                <router-link  :to="'/carItem/'+car.id">
                  <img alt="car" class="car-img"  :src="car.img" />
                </router-link>
              </td>
              <td>{{ car.brand }}</td>
              <td>{{ car.model }}</td>
            </tr>
          </table>
        </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'carFilter',
  props: ['isFilter'],
   data () {
    return {
      config: {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      },
      cars:{},
  }
},
   created(){						
    if (localStorage['filter_cars']) {
        this.cars =  JSON.parse(localStorage['filter_cars'])
    }  
  },
  computed:{    
    filters(){
      //alert(1)
      var filterList = this.cars
      if(this.isFilter  ||  !this.isFilter){
        if (localStorage['filter_cars']) {
          filterList =  JSON.parse(localStorage['filter_cars'])
        }  
      }
      return filterList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.car-img{
   max-height:100px;
   max-width:100px;
   cursor:pointer;
}



</style>
