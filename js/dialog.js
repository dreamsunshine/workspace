/**
 * create:2015.10.28
 * description:弹窗
 */


function dialog(){
	this.config={
		backdrop:true, //背景,可选true或false,默认true
		escset:true, //ESC按键可否控制
		show:true, //初始化完成是否立即显示
		type:'normal', //三种类型：normal,alert,confirm
		autohide:true, //alert类型时是否自动隐藏
		time:1000,  //alert类型时延迟时间
		title:undefined,//弹窗标题
		content:undefined //内容，处理简单内容
	};
	this.get=function(n){
			return this.config[n];
	};
	this.set=function(n,v){
			this.config[n]=v;
	};
	this.init.apply(this,arguments);
}

dialog.prototype={
	init:function(id,options,callback){
		this.config=$.extend(this.config,options||{});
		this.callback=callback||function(){};
		this.id=id;
		this.initbody();
		this.config.show&&this.show();
		this.bind();
	},
	initbody:function(){
		var body=$('body'),
			backdrop=$('.dialog-backdrop'),
			backdropmain='<div class="dialog-backdrop on"></div>',
			title=this.get('title'),
			content=this.get('content'),
			self=this,
			id=self.id;
		if(this.get('backdrop')){
			!backdrop.length&&body.append(backdropmain);
		}
		title&&$('.dialog-headtitle',id).html(title);
		content&&$('.dialog-content',id).html(content);	
	},
	bind:function(){
		var self=this,
			id=self.id,
			callback=self.callback;
		$('.dialog-headclose',id).on('click',function(e){
			e.preventDefault();
			self.hide();
		});
		$('.dialog-footclose',id).on('click',function(e){
			e.preventDefault();
			self.hide();
		});
		$('.dialog-footsubmit',id).on('click',function(e){
			e.preventDefault();
			callback&&callback();
			self.hide();
		});
		$(document).on('keyup',function(e){
			var code=e.keyCode;
			if(self.get('escset')){
				self.hide();
			}
		});
	},
	show:function(){
		var type=this.get('type'),
			time=this.get('time'),
			autohide=this.get('autohide'),
			self=this,
			id=self.id;
		switch (type) {
			case 'alert':
				id.addClass('active');
				if(autohide){
					setTimeout(function() {
						self.hide();
					}, time);
				}
				break;
			case 'confirm':
				id.addClass('active');
				break;
			case 'normal':
				id.addClass('active');
				break;
			default:
				break;
		}
	},
	hide:function(){
		var self=this,
			id=self.id;
		this.removebackdrop();
		id.removeClass('active');
	},
	removebackdrop:function(){
		$('.dialog-backdrop').length&&$('.dialog-backdrop').remove();
	}
};