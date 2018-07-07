PTM(function(){
	_slideAutoChange = setInterval("PTM.slideAutoChange()",3500);
	PTM('#wk_slide-nav li.wk_nav-bullet-container').click(function(){
		clearInterval(_slideAutoChange);
		PTM('#wk_slide-nav li.wk_nav-bullet-container').removeClass('active').eq(PTM(this).index()).addClass('active');
		
		PTM('.wk_slide-wrap li').removeClass('wk_selected').eq(PTM(this).data('index')).addClass('wk_selected');
		_slideAutoChange = setInterval("PTM.slideAutoChange()",3500);
	})
	PTM.extend({
		slideAutoChange:function(){
			curr = PTM('.wk_slide-wrap li.wk_selected');
			if(curr.next().size()>0){
        		next = curr.next(); 
        	}
			else{
				next = PTM('.wk_slide-wrap li:first');
			}
    		curr.removeClass('wk_selected');
        	next.addClass('wk_selected');
        	
    		PTM('#wk_slide-nav li.wk_nav-bullet-container').removeClass('active').eq(next.index()).addClass('active');
		}
	})
	//_slideAutoChange = setInterval("PTM.slideAutoChange()",5000);
		
});