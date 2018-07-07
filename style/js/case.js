(function(PTM){
	PTM.extend(PTM.easing,{
		easeInSine: function (x, t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		}
	});

	PTM.fn.Xslider=function(settings){
		settings=PTM.extend({},PTM.fn.Xslider.sn.defaults,settings);
		this.each(function(){
			var scrollobj=settings.scrollobj ? PTM(this).find(settings.scrollobj) : PTM(this).find("ul"),
			    viewedSize=settings.viewedSize || (settings.dir=="H" ? scrollobj.parent().width() : scrollobj.parent().height()),//length of the wrapper visible;
			    scrollunits=scrollobj.find("li"),//units to move;
			    unitlen=settings.unitlen || (settings.dir=="H" ? scrollunits.eq(0).outerWidth() : scrollunits.eq(0).outerHeight()),
			    unitdisplayed=settings.unitdisplayed,//units num displayed;
				numtoMove=settings.numtoMove > unitdisplayed ? unitdisplayed : settings.numtoMove,
			    scrollobjSize=settings.scrollobjSize || scrollunits.length*unitlen,//length of the scrollobj;
			    offset=0,//max width to move;
			    offsetnow=0,//scrollobj now offset;
			    movelength=unitlen*numtoMove,
				pos=settings.dir=="H" ? "left" : "top",
			    moving=false,//moving now?;
			    btnright=PTM(this).find("a.aright"),
			    btnleft=PTM(this).find("a.aleft");
			
			btnright.unbind("click");
			btnleft.unbind("click");
					
			settings.dir=="H" ? scrollobj.css("left","0px") : scrollobj.css("top","0px");
							
			if(scrollobjSize>viewedSize){
				if(settings.loop=="cycle"){
					btnleft.removeClass("agrayleft");
					if(scrollunits.length<2*numtoMove+unitdisplayed-numtoMove){
						scrollobj.find("li").clone().appendTo(scrollobj);	
					}
				}else{
					btnleft.addClass("agrayleft");
					offset=scrollobjSize-viewedSize;
				}
				btnright.removeClass("agrayright");
			}else{
				btnleft.addClass("agrayleft");
				btnright.addClass("agrayright");
			}

			btnleft.click(function(){
				if(PTM(this).is("[class*='agrayleft']")){return false;}
				
				if(!moving){
					moving=true;
					
					if(settings.loop=="cycle"){
						scrollobj.find("li:gt("+(scrollunits.length-numtoMove-1)+")").prependTo(scrollobj);
						scrollobj.css(pos,"-"+movelength+"px");
						PTM.fn.Xslider.sn.animate(scrollobj,0,settings.dir,settings.speed,function(){moving=false;});
					}else{
						offsetnow-=movelength;
						if(offsetnow>unitlen*unitdisplayed-viewedSize){
							PTM.fn.Xslider.sn.animate(scrollobj,-offsetnow,settings.dir,settings.speed,function(){moving=false;});
						}else{
							PTM.fn.Xslider.sn.animate(scrollobj,0,settings.dir,settings.speed,function(){moving=false;});
							offsetnow=0;
							PTM(this).addClass("agrayleft");
						}
						btnright.removeClass("agrayright");
					}
				}

				return false;
			});
			btnright.click(function(){
				if(PTM(this).is("[class*='agrayright']")){return false;}
				
				if(!moving){
					moving=true;
					
					if(settings.loop=="cycle"){
						var callback=function(){
							scrollobj.find("li:lt("+numtoMove+")").appendTo(scrollobj);
							scrollobj.css(pos,"0px");
							moving=false;
						}
						PTM.fn.Xslider.sn.animate(scrollobj,-movelength,settings.dir,settings.speed,callback);
					}else{
						offsetnow+=movelength;
						if(offsetnow<offset-(unitlen*unitdisplayed-viewedSize)){
							PTM.fn.Xslider.sn.animate(scrollobj,-offsetnow,settings.dir,settings.speed,function(){moving=false;});
						}else{
							PTM.fn.Xslider.sn.animate(scrollobj,-offset,settings.dir,settings.speed,function(){moving=false;});//滚动到最后一个位置;
							offsetnow=offset;
							PTM(this).addClass("agrayright");
						}
						btnleft.removeClass("agrayleft");
					}
				}
				
				return false;
			});
			
			if(settings.autoscroll){
				PTM.fn.Xslider.sn.autoscroll(PTM(this),settings.autoscroll);
			}
		})
	}
	
	PTM.fn.Xslider.sn={
		defaults:{
			dir:"H",
			speed:500
		},
		animate:function(obj,w,dir,speed,callback){
			if(dir=="H"){
				obj.animate({
					left:w
				},speed,"easeInSine",callback);
			}else if(dir=="V"){
				obj.animate({
					top:w
				},speed,"easeInSine",callback);	
			}	
		},
		autoscroll:function(obj,time){
			var  vane="right";
			function autoscrolling(){
				if(vane=="right"){
					if(!obj.find("a.agrayright").length){
						obj.find("a.aright").trigger("click");
					}else{
						vane="left";
					}
				}
				if(vane=="left"){
					if(!obj.find("a.agrayleft").length){	
						obj.find("a.aleft").trigger("click");
					}else{
						vane="right";
					}
				}
			}
		}
	}
})(jQuery);