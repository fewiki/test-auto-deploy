$(document).ready(function() {
	var menuLeft = document.getElementById('cbp-spmenu-s1');
	$(document).on('click',function(){
		classie.remove( menuLeft, 'cbp-spmenu-open' );
	})

	$('.showlist').on('click',function(e){	
		e.stopPropagation();
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
	})

	//计数
	var number = window.localStorage.getItem("number");
	if(!number){
		number = 0;
		window.localStorage.setItem("number", number);
	}else{
		number = parseInt(number) + 1;
		window.localStorage.setItem("number", number);
		$('.number').text(number)
	}
})