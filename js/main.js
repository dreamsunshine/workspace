Zepto(function($){
    $('.setuptip').css('opacity','1').find('.setuptip_sub2,.setuptip_sub3').addClass('slide-enter');
	$('.setuptip').tap(function(e){
		e.preventDefault();
		$(this).toggle();
	})
	$('.setuptip').swipe(function(e){
		e.preventDefault();
	})
	var pic_w=$('.infopic').width();
	$('.infopic').height(pic_w);
//	$('.infopic img').attr('src','').css('background-image','url(./dist/img/qrcodebtn.png)')
	function picmiddle(obj,url,w){
		var img=new Image();
		img.src=url;
		if(img.complete){
			
		}else{
			img.onload=function(){
				var pw=img.width,ph=img.height;
				if(pw<w-4){
					obj.find('img').css('margin-top',(w-4-ph)/2+'px').attr('src',url)
				}
			
		}
		}
		
	}
})