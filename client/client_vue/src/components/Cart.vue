<template>
<div>
    <table class="table">
    <tr style="font-weight:bold; font-size:0.9em">
      <td>image</td>
      <td>model</td>
      <td>year of issue</td>
      <td>engine capacity</td>
      <td>max speed</td>
      <td>price</td>
      <td>status order</td>
    </tr>
    <tr v-for="car in  orders"  >
      <td>
        <img alt="car" class="car-img"  :src="car.img" />
      </td>
      <td>{{ car.name }}</td>
      <td>{{ car.year_of_issue }}</td>
      <td>{{ car.engine_capacity }}</td>
      <td>{{ car.max_speed }}</td>
      <td>{{ car.max_speed }} EUR</td>
      <td><button class="btn black" @click="revokeOrder(car.id_order)">revoke</button></td>
    </tr>
    </table>
</div>  
</template>

<script>
import axios from 'axios';
export default {
  name: 'cart',
  data () {
    return {
      orders:{},
      config: {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      },
       
      
  }
},
  created(){			
    var self = this	

    axios.get('http://localhost:88/REST/client/api/auth/'+localStorage['hash_log']+"/"+localStorage['user'], this.config)
      //axios.get('http://192.168.0.15/~user15/REST/client/api/auth/'+localStorage['hash_log']+"/"+localStorage['user'], this.config)
     .then(function (response) {

        var client_id = parseInt(response.data['data'])
      
        if(client_id>0){
          //alert(client_id)
          axios.get('http://localhost:88/REST/client/api/order/'+client_id,self.config)
          //axios.get('http://192.168.0.15/~user15/REST/client/api/order/'+client_id, this.config)
                .then(function (response) {
                 self.orders = response.data['data']
          })
          .catch(function (error) {
            console.log(error);
            //self.err_work = self.error_str
            //self.is_not_err_work = false;
          });
        }else{
          self.logout()
        }
        })
        .catch(function (error) {
           console.log(error);
                //self.err_work = self.error_str
                //self.is_not_err_work = false;
        });

  
      
      
  },
  methods: {
    revokeOrder(order_id){
      var self = this	

  axios.get('http://localhost:88/REST/client/api/auth/'+localStorage['hash_log']+"/"+localStorage['user'], this.config)
      //axios.get('http://192.168.0.15/~user15/REST/client/api/auth/'+localStorage['hash_log']+"/"+localStorage['user'], this.config)
     .then(function (response) {

        var client_id = parseInt(response.data['data'])
       
        if(client_id>0){
          axios.put('http://localhost:88/REST/client/api/order/', 
            {
              id_user: client_id,
              id_order: order_id
            }, self.config)
                .then(function (response) {
                 //console.log(response.data['data']); 
                 if(response.data['data']=='order_update'){
                   for(var i=0; i<self.orders.length; i++){
                     if(self.orders[i].id_order==order_id){
                       if (confirm("Are you sure you want to cancel this order?")) {
                          self.orders.splice(i, 1);
                        } 
                     }
                   }
                 }
          })
          .catch(function (error) {
            console.log(error);
            //self.err_work = self.error_str
            //self.is_not_err_work = false;
          });
        }else{
          self.logout()
        }
        })
        .catch(function (error) {
           console.log(error);
                //self.err_work = self.error_str
                //self.is_not_err_work = false;
        });
        
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
.black{
	background-color : black;
	color: white;
}
</style>
