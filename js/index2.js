$(function(){

	var num = 2,
		$rating = $('#rating'),
		$item = $('#rating').find('li');

	//点亮
	var lightOn = function(num){
		$item.each(function(index){
			if( index < num ){
				$(this).css('background-position','0 -36px');
			}else{
				$(this).css('background-position','0 0');
			}
		})
	}

	//开始考虑
	/*$('#rating').find('li').each(function(index){
		if( index < num ){
			$(this).css('background-position','0 -26px');
		}else{
			$(this).css('background-position','0 0');
		}
	})*/

	//初始化
	lightOn(num);

	//事件绑定 --  委托写法
	$item.on('mouseover','.rating-item',function(){
		console.log(111)
		lightOn($(this).index() + 1);
	}).on('click','.rating-item',function(){
		num = $(this).index() + 1;
	}).on('mouseout',function(){
		lightOn(num);
	})

});