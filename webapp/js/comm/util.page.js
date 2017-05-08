var pageUtil = {
	init : function(TOT_PG_CNT, PG_NO){
		$("#paging_wrap").show();
		
		var pagehtml = "";
		if(TOT_PG_CNT > 1 && PG_NO > 1){
				pagehtml +="<span class=\"pg_fix\">";
				pagehtml +="<a href='javascript:pageUtil.move_page("+(parseInt(PG_NO)-1)+");'><img src='/img/econt/btn/btn_prev.gif' alt='이전'></a>";
				pagehtml +="</span>";
		}else{
				pagehtml +="<span class=\"pg_fix\">";
				pagehtml +="</span>";
		}
		
		pagehtml +="<span class=\"pag_num\">";

		var pageStart = parseInt(PG_NO);
		var pageEnd = parseInt(TOT_PG_CNT);
		
		if(pageEnd > 10){
			if(pageStart-4 > 0 || pageStart < 4){
				pageStart = pageStart - 4;
				
				if(pageStart < 0){
					pageStart = 1;
			  }
		  }
		  
		  if(pageEnd+5 < pageEnd){
				pageEnd = pageEnd +5 ;
		  }	
		}else{
			pageStart = 1;
		}
	  
		for(var i=pageStart;i<=pageEnd;i++){
			if(PG_NO == i){
				pagehtml +="<a href='javascript:pageUtil.move_page("+i+");' class=\"on\">"+i+"</a>";
			}else{
				pagehtml +="<a href='javascript:pageUtil.move_page("+i+");'>"+i+"</a>";
			}
		}
		pagehtml +="</span>";
		
		if(TOT_PG_CNT != PG_NO){
				pagehtml +="<span class=\"pg_fix\">";
				pagehtml +="<a href='javascript:pageUtil.move_page("+(parseInt(PG_NO)+1)+");'><img src='/img/econt/btn/btn_next.gif' alt='다음'></a>";
				pagehtml +="</span>";
		}else{
				pagehtml +="<span class=\"pg_fix\">";
				pagehtml +="</span>";
		}
		
		$("#paging").html(pagehtml);
	},
	move_page : function(page_no){
		$("#PG_NO").val(page_no);
		uf_search();
	} 
};