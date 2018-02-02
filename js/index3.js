$(function(){


	var rating = (function(){
		//点亮整颗
		var LightEntire = function(el,options){
			this.$el = $(el);
			this.$item = this.$el.find('.rating-item');
			this.opts = options;
		};
		LightEntire.prototype.init = function(){
			this.lightOn(this.opts.num);
			if( !this.opts.readOnly ) this.bindEvent(); //如果不是只读就可以绑定事件
		};

		LightEntire.prototype.lightOn = function(num){
			num = parseInt(num);
			this.$item.each(function(index){
				if( index < num ){
					$(this).css('background-position','0 -36px');
				}else{
					$(this).css('background-position','0 0');
				};
			});
		};

		LightEntire.prototype.bindEvent = function(){
			var self = this,
					itemLength = self.$item.length;
			self.$el.on('mouseover','.rating-item',function(){
				var numb = $(this).index() + 1;
				self.lightOn(numb);

				//浮动到哪个star就打印出第几个
				//(typeof self.opts.select === 'function') && self.opts.select(numb,itemLength);
				//第一种输出方法；通过call方法指向浮动在指定的星星上
				(typeof self.opts.select === 'function') && self.opts.select.call(this,numb,itemLength);
			
				//第二种输出方法；当鼠标浮动到star上可触发一个事件,此事件的调用方法也就不一样了，属于事件绑定
				self.$el.trigger('select',[numb,itemLength]);

			}).on('click','.rating-item',function(){
				self.opts.num = $(this).index() + 1;

				//第一种输出方法；点击到哪个star就打印出第几个
				(typeof self.opts.chosen === 'function') && self.opts.chosen.call(this,self.opts.num,itemLength);

				//第二种输出方法；当鼠标点击star上可触发一个事件,此事件的调用方法也就不一样了，属于事件绑定
				self.$el.trigger('chosen',[self.opts.num,itemLength]);

			}).on('mouseout',function(){
				self.lightOn(self.opts.num);
			})
		};

		//默认参数
		var defaults = {
			num:0,
			readOnly:false,
			select:function(){},
			chosen:function(){}
		}

		//初始化方法
		var init = function(el,options){
			options = $.extend({},defaults,options);

			new LightEntire(el,options).init();
		};

		return {
			init:init
		};

	})();

	rating.init('#rating',{
		num:2,
		select:function(numb,total){   //第一种输出方法；
			//console.log(this)
			//console.log(numb + " / " + total);
		},
		chosen:function(numb,total){  //第一种输出方法；
			//console.log(this)
			//console.log(numb + " / " + total);
		}
	});

	//第二种输出方法；触发事件绑定
	$('#rating').on('select',function(e,num,total){
		console.log(num +" / "+total);
	}).on('chosen',function(e,num,total){
		console.log(num +" / "+total)
	})
	

});