
//js抽象模式  单个对象

var Coffee = function(){};

//创建方法
Coffee.prototype.boilWater = function(){
	console.log('把水煮沸')
};
Coffee.prototype.brewCoffee = function(){
	console.log('把水煮沸')
};
Coffee.prototype.pourInCup = function(){
	console.log('把水煮沸')
};
Coffee.prototype.addSugarAndMilk = function(){
	console.log('把水煮沸')
};

//初始化函数
Coffee.prototype.init = function(){
	this.boilWater();
	this.brewCoffee();
	this.pourInCup();
	this.addSugarAndMilk();
};



//煮水泡茶
var Tea = function(){};

Tea.prototype.boilWater = function(){
	console.log('把水煮沸')
};
Tea.prototype.steepTea = function(){
	console.log('用溺水浸泡茶叶')
};
Tea.prototype.pourInCup = function(){
	console.log('把茶水倒进杯子')
};
Tea.prototype.addLemon = function(){
	console.log('加柠檬')
};

Tea.prototype.init = function() {
	this.boilWater();
	this.steepTea();
	this.pourInCup();
	this.addLemon();
};

//调用方法前实例化对象
var coffee = new Coffee();
var tea = new Tea();
//调用方法
coffee.init();
tea.init();




/**   上面和下面分开    **/



//js抽象父类操作模式
var Beverage = function(){};

Beverage.prototype.boilWater = function(){
	console.log('把水煮沸');
}
Beverage.prototype.brew = function(){
	throw new Error('子类必须重写该方法');
};
Beverage.prototype.pourInCup = function(){
	throw new Error('子类必须重写该方法');
};
Beverage.prototype.addCondiments = function(){
	throw new Error('子类必须重写该方法');
};

//添加勾子方法
Beverage.prototype.customerWantsCondiments = function(){
	return true;
};

//封装算法框架   
Beverage.prototype.init = function(){
	this.Beverage.boilWater();
	this.brew();
	this.pourInCup();
	if( this.customerWantsCondiments ){
		this.addCondiments();
	};
}

//下面是子类

var Coffee = function(){};
//创建方法
Coffee.prototype.brew = function(){
	console.log('用沸水泡咖啡')
};
Coffee.prototype.pourInCup = function(){
	console.log('把咖啡倒进杯子')
};
Coffee.prototype.addCondiments = function(){
	console.log('加糖和牛奶')
};




//煮水泡茶
var Tea = function(){};

Tea.prototype.brew= function(){
	console.log('用沸水浸泡茶叶')
};
Tea.prototype.pourInCup = function(){
	console.log('把茶水倒进杯子')
};
Tea.prototype.addCondiments = function(){
	console.log('加柠檬')
};

//用不用加调料的方法
Tea.prototype.customerWantsCondiments = function(){
	//return false;
	return window.confirm('请问需要加调料吗？');
}


//子类要用父类方法就要继承
Coffee.prototype = new Beverage();
Tea.prototype = new Beverage();

//调用方法前实例化对象  此处的对象就是Coffee了，是通过原型链继承的
var coffee = new Coffee();
var tea = new Tea();
//调用方法
coffee.init();
tea.init();


