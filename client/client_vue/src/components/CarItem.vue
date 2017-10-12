<template>
<div>
    <p class="bg-danger" id="err">{{err_param}}</p>
    <div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <figure>
            <figcaption><h3>{{carItem.name}}</h3></figcaption>
            <img alt="car"  :src="carItem.img"  style="height:200px;"/>
          </figure>
        </div>
        <table class="table panel_table">
          <tr>
            <td class="bold">Year of issue:</td>
            <td>{{carItem.year_of_issue}}</td>
          </tr>
          <tr>
            <td class="bold">Max speed:</td>
            <td>{{carItem.max_speed}}</td>
          </tr>
          <tr>
              <td class="bold">Price:</td>
              <td>{{carItem.price}} EUR</td>
          </tr>
          <tr>
              <td class="bold">Colors:</td>
              <td>
                  <ul v-for="color in carItem.colors">
                    <li>{{color}}</li>
                  </ul>
              </td>
          </tr>
        </table>
      </div> 

      <div class="order-form left ">
        <h4>Order form</h4>
        <p class="bg-success" id="isOrder" style="margin-top: 10px; color:blue; text-align: right;" >
          <b>{{isOrder}}</b>
        </p>
        <div class="form-group">
          <select id="color" v-model="color_order" class="form-control">
            <option value="">colors</option>
            <option  v-for="color in carItem.colors" :value="color">
               {{color}}
            </option>
          </select>
        </div> 
        <label>Select Payment Method</label>
        <div class="form-group radio_div">
          <div class="radio">
            <input type="radio" id="cash"  name="payment_method" v-model="payment_method"  value="cash"   />
            <label for="cash" class="small_check">Cash</label>
          </div>
          <div class="radio">
            <input type="radio" id="credit_card" name="payment_method" v-model="payment_method"  value="credit card">
            <label for="credit_card" >Credit card</label>
          </div>
        </div> 
        <button class="btn add_bag_btn large" @click="ordered(carItem.id)">Create order</button>                         
      </div>
    </div>
</div>  
</template>

<script>
import axios from 'axios';
export default {
  name: 'carItem',
  data () {
    return {
      carItem: {},
      err: '',
      isOrder: "",
      first_name: "",
      last_name: "",
      payment_method: "cash",
      err_param:"",
      err_work:"",
      is_not_err_work :true,
      color_order:"",
      config: {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      },
      
  }
},
  created(){			
    var self = this		
     var id = this.$route.params.id
      axios.get('http://localhost:88/REST/client/api/cars/'+id+".json", this.config)
      //axios.get('http://192.168.0.15/~user15/REST/client/api/cars/'+id+".json", this.config)
            .then(function (response) {
              self.carItem = response.data['data'];

              //console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
        //self.err_work = self.error_str
        //self.is_not_err_work = false;
      });
      
  },
  methods: {
    ordered(car_id){
      var self = this
      alert(this.color_order)
      axios.get('http://localhost:88/REST/client/api/auth/'+localStorage['hash_log']+"/"+localStorage['user'], this.config)
      //axios.get('http://192.168.0.15/~user15/REST/client/api/auth/'+localStorage['hash_log']+"/"+localStorage['user'], this.config)
     .then(function (response) {
        var client_id = parseInt(response.data['data'])      
        if(client_id>0){
            alert(self.color_order)
            var data = new FormData()
            data.append("id_car", car_id)
            data.append("color",self.color_order)
            data.append("id_user",client_id)
            data.append("payment_method",self.payment_method)
          
            axios.post('http://localhost:88/REST/client/api/order/', data, self.config)         
            //axios.post('http://192.168.0.15/~user15/REST/client/api/order/', data, this.config)
            .then(function (response) {
              console.log(response)
              if(response.data['data']=='1') 
              self.isOrder = "Your order is accepted"
              self.payment_method = "cash"
              self.color_order = ''
              setTimeout(function () {
                self.isOrder = ""
              },1500);        
          })
          .catch(function (error) {
            console.log(error);
          });
        }else{
          self.isOrder = "for ordering you need to register"
          setTimeout(function () {
                self.isOrder = ""
              },1500);     
        }
        })
        .catch(function (error) {
           console.log(error);
              self.isOrder = "for ordering you need to register"
          setTimeout(function () {
                self.isOrder = ""
              },1500);    
        });

    }
        
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.centr{
	text-align:center;
}


.bold{
    font-weight: bold;
}

.panel_table td{
    text-align: left;
}

.left{
    text-align:left;
}

.add_bag_btn{
	background-color : black;
	color: white;
  width: 100%;
}

</style>
