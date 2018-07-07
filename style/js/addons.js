PTM(function(){
	PTM('.wk_index_main').fullpage({
		anchors: ['banner', 'service', 'cases', 'about','client','contact','footer'],
		verticalCentered: !1,
		navigation: !0,
		afterLoad: function(anchorLink, index){
		
		//alert(index);
			if(index == 1){
				indexnum=0;
				PTM('#dn-nav').addClass('selected');
				PTM('.dn_show').removeClass('show');
				PTM('.dn_hide').addClass('hide');
				PTM('.contact').removeClass('active');
			}
			if(index == 2){
				indexnum=1;
				PTM('.dn_show').addClass('show');
				PTM('.dn_hide').removeClass('hide');
				PTM('#dn-nav').addClass('selected');
				PTM('.contact').removeClass('active');
			}
			if(index == 3){
				indexnum=2;
				PTM('#dn-nav').removeClass('selected');
				PTM('.dn_show').addClass('show');
				PTM('.dn_hide').removeClass('hide');
				PTM('#dn-nav').addClass('selected');
				PTM('.contact').removeClass('active');
			}
			if(index == 4){
				indexnum=3;
				PTM('#dn-nav').addClass('selected');
				PTM('.dn_show').addClass('show');
				PTM('.dn_hide').removeClass('hide');
				PTM('.contact').removeClass('active');
			}
			if(index == 5){
				indexnum=4;
				PTM('#dn-nav').removeClass('selected');
				PTM('.dn_show').addClass('show');
				PTM('.dn_hide').removeClass('hide');
				PTM('.contact').removeClass('active');
			}
			if(index == 6){
				indexnum=5;
				PTM('#dn-nav').addClass('selected');
				PTM('.dn_show').addClass('show');
				PTM('.dn_hide').removeClass('hide');
				PTM('.contact').removeClass('active');
			}
			if(index == 7){
				indexnum=6;
				PTM('#dn-nav').addClass('selected');
				PTM('.dn_show').addClass('show');
				PTM('.dn_hide').removeClass('hide');
				PTM('.contact').addClass('active');
			}
			PTM(".show li").removeClass("active").eq(indexnum).addClass("active");
		},
		onLeave: function(index, nextIndex, direction){
			if(index == 1 && direction == 'down'){
			}
		}
	});
	
})