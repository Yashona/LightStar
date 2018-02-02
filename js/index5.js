$(function(){

//抽象父类
	var rating = (function(){

		//继承方法  为设置缓存
		var extend = function(subClass,superClass){
			var F = function(){};
			F.prototype = superClass.prototype;
			subClass.prototype = new F();
			subClass.prototype.construtor = subClass;
		}


		//点亮
		var Light = function(el,options){
			this.$el = $(el);
			this.$item = this.$el.find('.rating-item');
			this.opts = options;
			this.add = 1;
			this.selectEvent = 'mouseover';
		};

		Light.prototype.init = function(){
			this.lightOn(this.opts.num);
			if( !this.opts.readOnly ) this.bindEvent(); //如果不是只读就可以绑定事件
		};

		Light.prototype.lightOn = function(num){
			num = parseInt(num);
			this.$item.each(function(index){
				if( index < num ){
					$(this).css('background-position','0 -36px');
				}else{
					$(this).css('background-position','0 0');
				};
			});
		};

		Light.prototype.bindEvent = function(){
			var self = this,
					itemLength = self.$item.length;
			self.$el.on(self.selectEvent,'.rating-item',function(e){
				var $this = $(this)
						numb = 0;

				self.select(e,$this);
				numb = $(this).index() + self.add;
				self.lightOn(numb);

				//浮动到哪个star就打印出第几个
				//(typeof self.opts.select === 'function') && self.opts.select(numb,itemLength);
				//第一种输出方法；通过call方法指向浮动在指定的星星上
				(typeof self.opts.select === 'function') && self.opts.select.call(this,numb,itemLength);
			
				//第二种输出方法；当鼠标浮动到star上可触发一个事件,此事件的调用方法也就不一样了，属于事件绑定
				self.$el.trigger('select',[numb,itemLength]);

			}).on('click','.rating-item',function(){
				self.opts.num = $(this).index() + self.add;

				//第一种输出方法；点击到哪个star就打印出第几个
				(typeof self.opts.chosen === 'function') && self.opts.chosen.call(this,self.opts.num,itemLength);

				//第二种输出方法；当鼠标点击star上可触发一个事件,此事件的调用方法也就不一样了，属于事件绑定
				self.$el.trigger('chosen',[self.opts.num,itemLength]);

			}).on('mouseout',function(){
				self.lightOn(self.opts.num);
			})
		};

		Light.prototype.select = function(){
			throw new Error('子类必须重写此方法！')
		}



		//点亮整颗
		var LightEntire = function(el,options){
			Light.call(this,el,options);
			this.selectEvent = 'mouseover';
		};

		extend(LightEntire,Light);

		LightEntire.prototype.init = function(){
			this.lightOn(this.opts.num);
			if( !this.opts.readOnly ) this.bindEvent(); //如果不是只读就可以绑定事件
		};

		LightEntire.prototype.lightOn = function(num){
			Light.prototype.lightOn.call(this,num);
		};

		LightEntire.prototype.select = function(){
			self.add = 1;
		};


		//点亮半颗
		var LightHalf = function(el,options){
			Light.call(this,el,options);
			this.selectEvent = 'mousemove';
		};

		extend(LightHalf,Light);

		LightHalf.prototype.init = function(){
			this.lightOn(this.opts.num);
			if( !this.opts.readOnly ) this.bindEvent(); //如果不是只读就可以绑定事件
		};

		LightHalf.prototype.lightOn = function(num){
			var count = parseInt(num);
			    isHalf = count !== num;
			
			Light.prototype.lightOn.call(this,count);

			if( isHalf ){
				this.$item.eq(count).css('background-position','0 -72px')
			}
		};

		LightHalf.prototype.select = function(e,$this){
			var self = this,
					itemLength = self.$item.length;
			self.$el.on(self.selectEvent,'.rating-item',function(e){
					var $this = $(this),
							num = 0;


					if( e.pageX - $this.offset().left < $this.width()/2 ){
						self.add = 0.5;
						//num = $this.index() + 0.5;
					}else{
						self.add = 1;
						//num = $this.index() + 1;
					}

				var numb = $(this).index() + self.add;
				self.lightOn(numb);

				//浮动到哪个star就打印出第几个
				//(typeof self.opts.select === 'function') && self.opts.select(numb,itemLength);
				//第一种输出方法；通过call方法指向浮动在指定的星星上
				(typeof self.opts.select === 'function') && self.opts.select.call(this,numb,itemLength);
			
				//第二种输出方法；当鼠标浮动到star上可触发一个事件,此事件的调用方法也就不一样了，属于事件绑定
				self.$el.trigger('select',[numb,itemLength]);

			}).on('click','.rating-item',function(){
				self.opts.num = $(this).index() + self.add;

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
			mode:'lightEntire',
			num:0,
			readOnly:false,
			select:function(){},
			chosen:function(){}
		}

		var mode = {
			'LightEntire':LightEntire,
			'LightHalf':LightHalf
		}

		//初始化方法
		var init = function(el,options){
			options = $.extend({},defaults,options);

			//new LightHalf(el,options).init();

			if( !mode[options.mode] ){
				options.mode = 'LightEntire';
			};
			new mode[options.mode](el,options).init();
		};

		return {
			init:init
		};

	})();

	rating.init('#rating',{
		mode:'LightHalf',
		num:2.5,
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

























/*

	var rating = (function(){

		//点亮整颗
		var LightEntire = function(el,options){
			this.$el = $(el);
			this.$item = this.$el.find('.rating-item');
			this.opts = options;
			this.add = 1;
			this.selectEvent = 'mouseover';
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
			self.$el.on(self.selectEvent,'.rating-item',function(){
				var numb = $(this).index() + self.add;
				self.lightOn(numb);

				//浮动到哪个star就打印出第几个
				//(typeof self.opts.select === 'function') && self.opts.select(numb,itemLength);
				//第一种输出方法；通过call方法指向浮动在指定的星星上
				(typeof self.opts.select === 'function') && self.opts.select.call(this,numb,itemLength);
			
				//第二种输出方法；当鼠标浮动到star上可触发一个事件,此事件的调用方法也就不一样了，属于事件绑定
				self.$el.trigger('select',[numb,itemLength]);

			}).on('click','.rating-item',function(){
				self.opts.num = $(this).index() + self.add;

				//第一种输出方法；点击到哪个star就打印出第几个
				(typeof self.opts.chosen === 'function') && self.opts.chosen.call(this,self.opts.num,itemLength);

				//第二种输出方法；当鼠标点击star上可触发一个事件,此事件的调用方法也就不一样了，属于事件绑定
				self.$el.trigger('chosen',[self.opts.num,itemLength]);

			}).on('mouseout',function(){
				self.lightOn(self.opts.num);
			})
		};

		//点亮半颗
		var LightHalf = function(el,options){
			this.$el = $(el);
			this.$item = this.$el.find('.rating-item');
			this.opts = options;
			this.add = 1;
			this.selectEvent = 'mousemove';
		};
		LightHalf.prototype.init = function(){
			this.lightOn(this.opts.num);
			if( !this.opts.readOnly ) this.bindEvent(); //如果不是只读就可以绑定事件
		};

		LightHalf.prototype.lightOn = function(num){
			var count = parseInt(num);
			    isHalf = count !== num;
			//num = parseInt(num);
			this.$item.each(function(index){
				if( index < num ){
					$(this).css('background-position','0 -36px');
				}else{
					$(this).css('background-position','0 0');
				};
			});

			if( isHalf ){
				this.$item.eq(count).css('background-position','0 -72px')
			}

		};

		LightHalf.prototype.bindEvent = function(){
			var self = this,
					itemLength = self.$item.length;
			self.$el.on(self.selectEvent,'.rating-item',function(e){
					var $this = $(this),
							num = 0;
					if( e.pageX - $this.offset().left < $this.width()/2 ){
						self.add = 0.5;
						//num = $this.index() + 0.5;
					}else{
						self.add = 1;
						//num = $this.index() + 1;
					}

				var numb = $(this).index() + self.add;
				self.lightOn(numb);

				//浮动到哪个star就打印出第几个
				//(typeof self.opts.select === 'function') && self.opts.select(numb,itemLength);
				//第一种输出方法；通过call方法指向浮动在指定的星星上
				(typeof self.opts.select === 'function') && self.opts.select.call(this,numb,itemLength);
			
				//第二种输出方法；当鼠标浮动到star上可触发一个事件,此事件的调用方法也就不一样了，属于事件绑定
				self.$el.trigger('select',[numb,itemLength]);

			}).on('click','.rating-item',function(){
				self.opts.num = $(this).index() + self.add;

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
			mode:'lightEntire',
			num:0,
			readOnly:false,
			select:function(){},
			chosen:function(){}
		}

		var mode = {
			'LightEntire':LightEntire,
			'LightHalf':LightHalf
		}

		//初始化方法
		var init = function(el,options){
			options = $.extend({},defaults,options);

			//new LightHalf(el,options).init();

			if( !mode[options.mode] ){
				options.mode = 'LightEntire';
			};
			new mode[options.mode](el,options).init();
		};

		return {
			init:init
		};

	})();

	rating.init('#rating',{
		mode:'LightHalf',
		num:2.5,
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
	
*/

});