//封装购物车的商品操作方法
function Car(){}

//格式：[{"id":1,"price":100,"number":2},{},{},..]
//添加商品到购物车
Car.prototype.addCar = function(goods){
  //1取出商品
  var carlist = this.getCar();
  //2.判断是否有相同的商品，有则直接累加数量，否则直接加入
  if(this.hasGoods(goods.id)){
    //有则加数量
    for(var i=0; i<carlist.length; i++){
      if(carlist[i].id === goods.id){
        carlist[i].number += goods.number; //商品在原来的数量上进行累加
        break; //跳出for循环
      }
    }
  }else{
    //没有直接加入
    carlist.push(goods);
  }

  //3、把商品重新存储到本地存储
  localStorage.setItem('carlist', JSON.stringify(carlist) );
}


//判断是否有相同商品
Car.prototype.hasGoods = function(id){
  //获取本地存储的商品数据，进行判断是否有相同商品，有返回true,否则返回false
  var carlist = this.getCar();
  for(var i=0; i<carlist.length; i++){
    if(carlist[i].id === id){
     return true;
    }
  }

  return false;
}


//获取购物车所有的商品
Car.prototype.getCar = function(){
  //因为可能没有数据，所以默认设置为一个空数组
  var carlist = JSON.parse( localStorage.getItem('carlist') ) || [];
  return carlist
}


//获取购物车商品的总价
Car.prototype.getTotalPrice = function(){
  var carlist = this.getCar();
  var totalPrice = 0.00;
  for(var i=0; i<carlist.length; i++){
    totalPrice += carlist[i].price*carlist[i].number
  }
  return totalPrice+"&yen;";
}



//删除购物车商品
Car.prototype.delGoods = function(id){
  var carlist = this.getCar();
  for(var i=0; i<carlist.length; i++){
    if(carlist[i].id == id){
      //删除指定的商品
      carlist.splice(i,1);
      break;
    }
  }
  //在把商品写入到本地存储
  localStorage.setItem('carlist',JSON.stringify(carlist));
  
}

