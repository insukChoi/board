/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * @@@@ function call
 * call          : dateUtil.init("20140218"); or dateUtil.init("2014-02-18");
 * argument      : 8자리 오늘날짜
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * html sample   : <input type="text" name="test1" value="2014-02-06" dataType="date" notuse originId="id" dateType="MD" img="/img/comm/etc/ico_calendar.gif" maxDate="Y"></input>
 * @@@@ html sample attribute
 * name          : array 일 경우 id 를 필수로 작성한다.
 * value         : 선택되어져 있는 날짜
 * dataType      : date 고정 필수
 * notuse        : ib2.js 를 사용할 경우 필수입력
 * img           : 달력 이미지 경로
 * maxDate       : Y 일경우 직접입력시 금일 이상의 날짜가 입력되지 않는다.
 * originId        : 달력 일자 클릭시 해당 id 로 full date 를 넣어준다. >> 세금계산서에서 품목에 사용
 * dateType      : MD 인경우 월일 - 없이 넣어준다. >> 세금계산서에서 품목에 사용
 * @@@@ css
 * dateUtil.css 에 선언
 */
var dateUtil = {
	maxDay : [31,28,31,30,31,30,31,31,30,31,30,31],
	yoil : ["일","월","화","수","목","금","토"],
	toDay : "",
	calDay : "",
	toDate : {},
	originId : "",
	dateType : "",
	btnId:"",
	lastDay : function(year,mon){
		if(parseInt(mon,10) == 2 && year%4 == 0) return dateUtil.maxDay[parseInt(mon,10)-1]+1;
		else return dateUtil.maxDay[parseInt(mon,10)-1];
	},
	preDateSetting : function(d){
		if(parseInt(d.substring(0,4),10)%4 == 0) dateUtil.maxDay[1] = 29;
		else dateUtil.maxDay[1] = 28;
		dateUtil.toDate = new Date(parseInt(d.substring(0,4),10),parseInt(d.substring(4,6)-1),1);
	},
	dateSetting : function(i){
		dateUtil.toDate.setDate(i);
	},
	addOption : function(option){
		if(option.id != null && option.value != null && option.text != null){
			jQuery("#"+option.frameId).contents().find("#"+option.id).get(0).options.add(new Option(option.text,option.value));
		}else if(option.name != null && option.value != null && option.text != null){
			jQuery("#"+option.frameId).contents().find("select[name='"+option.name+"']").get(0).options.add(new Option(option.text,option.value));
		}
	},
	delOption : function(option){
		var size = 0;
		if(option.size != null) size = option.size;
		if(option.id != null){
			jQuery("#"+option.frameId).contents().find("#"+option.id).get(0).options.length = size;
		}else if(option.name != null){
			jQuery("#"+option.frameId).contents().find("select[name='"+option.name+"']").get(0).options.length = size;
		}
	},
	css : {
		inlineDivBody : "margin:0px;background-color:#fff;width:180px;",
		inlineDivHead : "",
		inlineDivHeadLeft : "width:20px;padding-top:3px;color:#A0A0A0;text-align:center;vertical-align:middle;cursor:pointer;",
		inlineDivHeadRigth : "width:20px;padding-top:3px;color:#A0A0A0;text-align:center;vertical-align:middle;cursor:pointer;",
		inlineCallCss : "background-color:#fff;height:16px;color:#cbc7bd;cursor:pointer;",
		daySun : {"background-color":"#fff","color":"#FF0000","font-weight":"normal"},
		daySat : {"background-color":"#fff","color":"#368CFE","font-weight":"normal"},
		dayToday : {"background-color":"#368CFE","color":"white","font-weight":"bold"},
		selDay : {"background-color":"#CF4040","color":"white","font-weight":"bold"},
		onDay : {"background-color":"#006060","color":"white","font-weight":"bold"},
		dayEv : {"background-color":"#fff","color":"black","font-weight":"normal"},
		calCss : {"background-color":"#fff","color":"#CBC7BD","font-weight":"normal"}
	},
	mousewheelevt : (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel",
	mouseWhellEvent : function(e){
		if("block" == $("#calendarPopupFrame").css("display")){
			var evt=window.event || e;
			var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta;
			if(!dateUtil.mouseWait){
				if(delta < 0){
					dateUtil.mouseWait = true;
					dateUtil.moveDate(1);
				}else{
					dateUtil.mouseWait = true;
					dateUtil.moveDate(-1);
				}
			}
		}
	},
	mouseWait : false,
	mouseWheelEventCheck : false,
	moveDate : function(arg){
		var year = parseInt(dateUtil.toDate.getFullYear(),10);
		var month = parseInt(dateUtil.toDate.getMonth(),10);
		month += arg;
		if( month == 0){
			month = 12;
			year  += arg;
		}else if(month == 13){
			month = 1;
			year  += arg;
		}
		dateUtil.toDate = new Date(year,month,1);
		if(parseInt($("#calendarPopupFrame").contents().find("#calendarYearSelect").val(),10)%4 == 0) dateUtil.maxDay[1] = 29;
		else dateUtil.maxDay[1] = 28;
		dateUtil.calendarSetting();
	},
	changeDate : function(){
		dateUtil.toDate = new Date($("#calendarPopupFrame").contents().find("#calendarYearSelect").val(),parseInt($("#calendarPopupFrame").contents().find("#calendarMonthSelect").val(),10)-1,1);
		dateUtil.calendarSetting();
		if(parseInt($("#calendarPopupFrame").contents().find("#calendarYearSelect").val(),10)%4 == 0) dateUtil.maxDay[1] = 29;
		else dateUtil.maxDay[1] = 28;
	},
	format : function(d){
		d = d.replace(/-/gi,'');
		if(d.length < 4){
			return d;
		}else if(d.length == 4){
			return d.substring(0,4)+"-";
		}else if(d.length == 5){
			if(d.substring(4,5) != "1" && d.substring(4,5) != "0") return d.substring(0,4)+"-0"+d.substring(4,5);
		}else if(d.length == 6){
			if(d.substring(4,6) > "12"){
				return d.substring(0,4)+"-0"+d.substring(4,5)+"-"+d.substring(5,6);
			}else{
				if(d.substring(4,6) > 9) return d.substring(0,4)+"-"+d.substring(4,6)+"-";
				else if(d.substring(4,5) == "0") return d.substring(0,4)+"-"+d.substring(4,6)+"-";
				else return d.substring(0,4)+"-0"+d.substring(4,6)+"-";
			}
		}else if(d.length == 7){
			if(d.substring(6,7) > 3){
				return d.substring(0,4)+"-"+d.substring(4,6)+"-0"+d.substring(6,7);
			}
		}else if(d.length == 8){
			if(dateUtil.toDay < d){
				return dateUtil.format(dateUtil.toDay);
			}else{
				if(dateUtil.lastDay(d.substring(0,4),d.substring(4,6)) < d.substring(6,8)){
					return d.substring(0,4)+"-"+d.substring(4,6)+"-"+dateUtil.lastDay(d.substring(0,4),d.substring(4,6));
				}else{
					return d.substring(0,4)+"-"+d.substring(4,6)+"-"+d.substring(6,8);
				}
			}
		}else{
			return dateUtil.format(dateUtil.toDay);
		}
	},
	editFormat : function(d){
		d = d.replace(/-/gi,'');
		if(d.length < 4){
			return d;
		}else if(d.length == 4){
			return d.substring(0,4)+"-";
		}else if(d.length == 5){
			if(d.substring(4,5) != "1" && d.substring(4,5) != "0") return d.substring(0,4)+"-0"+d.substring(4,5);
		}else if(d.length == 6){
			if(d.substring(4,6) > "12"){
				return d.substring(0,4)+"-0"+d.substring(4,5)+"-"+d.substring(5,6);
			}else{
				if(d.substring(4,6) > 9) return d.substring(0,4)+"-"+d.substring(4,6)+"-";
				else if(d.substring(4,5) == "0") return d.substring(0,4)+"-"+d.substring(4,6)+"-";
				else return d.substring(0,4)+"-0"+d.substring(4,6)+"-";
			}
		}else if(d.length == 7){
			if(d.substring(6,7) > 3){
				return d.substring(0,4)+"-"+d.substring(4,6)+"-0"+d.substring(6,7);
			}
		}else if(d.length == 8){
			if(dateUtil.lastDay(d.substring(0,4),d.substring(4,6)) < d.substring(6,8)){
				return d.substring(0,4)+"-"+d.substring(4,6)+"-"+dateUtil.lastDay(d.substring(0,4),d.substring(4,6));
			}else{
				return d.substring(0,4)+"-"+d.substring(4,6)+"-"+d.substring(6,8);
			}
		}
	},
	calFormat : function(obj){
		var y = obj.getFullYear();
		var m =obj.getMonth()+ 1 + "";
		var d = obj.getDate() + "";
		if(m.length == 1) m = "0" + m;
		if(d.length == 1) d = "0" + d;
		return dateUtil.editFormat(y+m+d);
	},
	mkFrame : function(){
		if(typeof $("#calendarPopupFrame").attr("id") == "undefined"){
			$("body").prepend("<IFRAME SRC='' id='calendarPopupFrame' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='display:block;position:absolute;display:none;z-index:999999999;'></IFRAME>");
			dateUtil.chkFrame();
		}
	},
	chkFrame : function(){
		if($("#calendarPopupFrame").contents().find("body").html() == null || $("#calendarPopupFrame").contents().find("body").html() == ""){
			setTimeout(function(){dateUtil.chkFrame();},1000);
			$("#calendarPopupFrame").contents().find("body").html(dateUtil.mkHeader());
		}
		$("#calendarPopupFrame").contents().find("body").html(dateUtil.mkHeader());
	},
	calendarSetting : function(){
		dateUtil.delOption({frameId:"calendarPopupFrame",id:"calendarYearSelect",size:"0"});
		dateUtil.delOption({frameId:"calendarPopupFrame",id:"calendarMonthSelect",size:"0"});
		calYear = dateUtil.toDate.getFullYear();
		for(var i=calYear -5,len=calYear+5;i<=len;i++){
			dateUtil.addOption({frameId:"calendarPopupFrame",id:"calendarYearSelect",text:i,value:i});
		}
		for(var i=1;i<13;i++){
			dateUtil.addOption({frameId:"calendarPopupFrame",id:"calendarMonthSelect",text:i,value:i});
		}
		$("#calendarPopupFrame").contents().find("#calendarChangeBody").html(dateUtil.mkBody());
		$("#calendarPopupFrame").contents().find("#calendarYearSelect").val(dateUtil.toDate.getFullYear());
		$("#calendarPopupFrame").contents().find("#calendarMonthSelect").val(parseInt(dateUtil.toDate.getMonth()+1));
		dateUtil.cssSetting();
		if($(document).scrollTop() < $("#calendarPopupFrame").offset().top + $("#calendarPopupFrame").height() - $(window).height()){
			$(document).scrollTop($("#calendarPopupFrame").offset().top + $("#calendarPopupFrame").height() - $(window).height());
		}
	},
	cssSetting : function(){
		$("#calendarPopupFrame").css({"display":"block"});
		$("#calendarPopupFrame").css({"width":$("#calendarPopupFrame").contents().find("body").children("div").width(),"height":$("#calendarPopupFrame").contents().find("body").children("div").height()});
		$("#calendarPopupFrame").contents().find("#calendarChangeBody [day='0']").css(dateUtil.css.daySun);
		$("#calendarPopupFrame").contents().find("#calendarChangeBody [day='6']").css(dateUtil.css.daySat);
		for(var i=1;i<=5;i++){
			$("#calendarPopupFrame").contents().find("#calendarChangeBody [day='"+i+"']").css(dateUtil.css.dayEv);
		}
		$("#calendarPopupFrame").contents().find("#calendarChangeBody [value='"+dateUtil.editFormat(dateUtil.toDay)+"']").css(dateUtil.css.dayToday);
		$("#calendarPopupFrame").contents().find("#calendarChangeBody [value='"+dateUtil.editFormat(dateUtil.calDay)+"']").css(dateUtil.css.selDay);
		if(dateUtil.targetId != ""){
			$(document).unbind("click").click(function(event){
				if(event.target.id != dateUtil.btnId && $("#calendarPopupFrame").css('display') != "none"){
					$("#calendarPopupFrame").css({"display":"none"});
				}
			});
		}
		$("#calendarPopupFrame").contents().find(".dayOther").unbind("hover").hover(function(){
			$(this).css(dateUtil.css.onDay);
		},function(){
			if(typeof $(this).attr("day") == "undefined"){
				$(this).css(dateUtil.css.calCss);
			}else{
				if($(this).attr("day") == "6"){
					$(this).css(dateUtil.css.daySat);
				}else if($(this).attr("day") == "0"){
					$(this).css(dateUtil.css.daySun);
				}else{
					$(this).css(dateUtil.css.dayEv);
				}
				$("#calendarPopupFrame").contents().find("#calendarChangeBody [value='"+dateUtil.editFormat(dateUtil.toDay)+"']").css(dateUtil.css.dayToday);
				$("#calendarPopupFrame").contents().find("#calendarChangeBody [value='"+dateUtil.editFormat(dateUtil.calDay)+"']").css(dateUtil.css.selDay);
			}
		}).unbind("click").click(function(e){
			if("MD"==dateUtil.dateType){
				$("#"+dateUtil.targetId).val($(this).attr("value").replace(/-/gi,'').substring(4));
			}else{
				$("#"+dateUtil.targetId).val($(this).attr("value"));
			}
			if(dateUtil.originId != "undefined" && typeof dateUtil.originId != "undefined"){
				$("#"+dateUtil.targetId).closest("tr").children().find("input[name='"+dateUtil.originId+"']").val($(this).attr("value").replace(/-/gi,''));
			}
			$("#calendarPopupFrame").css({"display":"none"});
		});
		$("#calendarPopupFrame").contents().find("select").unbind("change").change(function(){
			dateUtil.changeDate();
		});
		dateUtil.mouseWait = false;
	},
	mkHeader : function(){
		var xhtml = "";
		xhtml += "<div style='"+dateUtil.css.inlineDivBody+"'>\n";
		xhtml += "	<table style='width:100%;border-collapse:collapse;border:2px solid #666;'>\n";
		xhtml += "		<tr>\n";
		xhtml += "			<td>\n";
		xhtml += "				<div style='"+dateUtil.css.inlineDivHead+"'>\n";
		xhtml += "					<table style='text-align:center;width:100%;border-collapse:collapse;border-spacing:0;'>\n";
		xhtml += "						<tr>\n";
		xhtml += "							<td style='"+dateUtil.css.inlineDivHeadLeft+"' onclick='parent.dateUtil.moveDate(-1);'>&#9664;</td>\n";
		xhtml += "							<td>\n";
		xhtml += "								<select name='calendarYearSelect' id='calendarYearSelect' style=''></select>\n";
		xhtml += "								<select name='calendarMonthSelect' id='calendarMonthSelect' style=''></select>\n";
		xhtml += "							</td>\n";
		xhtml += "							<td style='"+dateUtil.css.inlineDivHeadRigth+"' onclick='parent.dateUtil.moveDate(1);'>&#9654;</td>\n";
		xhtml += "						</tr>\n";
		xhtml += "					</table>\n";
		xhtml += "				</div>\n";
		xhtml += "			</td>\n";
		xhtml += "		</tr>\n";
		xhtml += "		<tr>\n";
		xhtml += "			<td id='calendarChangeBody'></td>\n";
		xhtml += "		</tr>\n";
		xhtml += "	</table>\n";
		xhtml += "</div>\n";
		return xhtml;
	},
	mkBody : function(){
		var xhtml = "";
		xhtml += "<table style='table-layout:fixed;font-size:11px;text-align:center;width:100%;border-collapse:collapse;border-spacing:0;font-family:tahoma,sans-serif;'>\n";
		xhtml += "	<tr>\n";
		for(var i=0,len=dateUtil.yoil.length;i<len;i++){
			xhtml += "		<td style='padding-top:5px;padding-bottom:5px;border-top:1px solid #F4F4F4;border-bottom:1px solid #F4F4F4;background-color:#FBFBFB;color:#000;font-family:dotum,sans-serif;font-weight:bold;'>"+dateUtil.yoil[i]+"</td>\n";
		}
		xhtml += "	</tr>\n";
		if(dateUtil.toDate.getDay() != 0){
			var startDay = dateUtil.toDate.getMonth() == 0 ? 0:eval(dateUtil.toDate.getMonth()-1);
			var lastDay   = dateUtil.toDate.getDay()== 0 ? 6: dateUtil.toDate.getDay();
			xhtml +="<tr>";
			for(i=lastDay;i>0;i--){
				xhtml += "<td><div class='dayOther' value='"+dateUtil.calFormat(new Date(dateUtil.toDate.getFullYear(),eval(dateUtil.toDate.getMonth()-1),(dateUtil.maxDay[startDay] - (i-1))))+"' style='"+dateUtil.css.inlineCallCss+"'><span style='font-size:11px'>"+(dateUtil.maxDay[startDay]-(i-1))+"</span></div></td>";
			}
		}
		for(i=1;i<=dateUtil.maxDay[dateUtil.toDate.getMonth()];i++){
			dateUtil.dateSetting(i);
			if(dateUtil.toDate.getDay() == 0){
				xhtml +="<tr>";
			}
			xhtml += "<td><div class='dayOther' value='" + dateUtil.calFormat(dateUtil.toDate) +"' day='"+dateUtil.toDate.getDay()+"' style='"+dateUtil.css.inlineCallCss+"'><span style='font-size:11px'>"+i+"</span></td></div>";
			if(dateUtil.toDate.getDay() == 6){
				xhtml +="</tr>";
			}
		}
		if(dateUtil.toDate.getDay() != 6){
			var nextDay = 1;
			for(i=dateUtil.toDate.getDay();i<6;i++){
				xhtml += "<td><div class='dayOther' value='"+dateUtil.calFormat(new Date(dateUtil.toDate.getFullYear(),eval(dateUtil.toDate.getMonth()+1),nextDay))+"' style='"+dateUtil.css.inlineCallCss+"'><span style='font-size:11px'>"+(nextDay++)+"</span></td></div>";
			}
		}
		xhtml += "</table>\n";
		return xhtml;
	},
	click : function(obj){
		if($("#calendarPopupFrame").contents().find("body").html() == null || $("#calendarPopupFrame").contents().find("body").html() == ""){
			dateUtil.mkFrame();
			return;
		}
		$("#"+obj.frameId).css({"top":$("#"+obj.id).offset().top+$("#"+obj.id).outerHeight()+4, "left":$("#"+obj.id).offset().left-4});
		dateUtil.targetId = obj.id;
		dateUtil.originId = obj.originId;
		dateUtil.btnId = obj.btnId;
		dateUtil.dateType = obj.dateType;
		dateUtil.calDay = $("#"+obj.id).attr("value").replace(/-/gi,'');
		if(dateUtil.calDay.length != 8) dateUtil.calDay = "";
		var calDay = ("" == dateUtil.calDay)?dateUtil.toDay:dateUtil.calDay;
		dateUtil.preDateSetting(calDay);
		dateUtil.calendarSetting();
	},
	init : function(d){
		dateUtil.toDay = d.replace(/-/gi,'');
		dateUtil.mkFrame();
		$("input[type='text']").each(function(){
			if($(this).attr("dataType") == "date"){
				if($(this).attr("id") == "" || $(this).attr("id") == "undefined" || $(this).attr("id") == null){
					$(this).attr("id",$(this).attr("name"));
				}
				if(typeof $("#"+$(this).attr("id")+"_btn").attr("id") == "undefined"){
					if($(this).attr("LOC") == "PRE"){
						$(this).before("<img src='"+$(this).attr("img")+"' name='"+$(this).attr("originNm")+"' dateType='"+$(this).attr("dateType")+"' id='"+$(this).attr("id")+"_btn' style='margin-right:3px;cursor:pointer;' />");
					}else{
						$(this).after("<img src='"+$(this).attr("img")+"' name='"+$(this).attr("originNm")+"' dateType='"+$(this).attr("dateType")+"' id='"+$(this).attr("id")+"_btn' style='margin-left:3px;cursor:pointer;' />");
					}
				}
				$(this).css({'ime-mode':'disabled'}).attr("maxLength","10").unbind("keyup").keyup(function(e){
					if(e.which == 8){
						e.preventDefault();
					}else{
						if($(this).attr("dateType") != "MD"){
							if($(this).attr("maxDate") == "Y"){
								$(this).val(dateUtil.format($(this).val()));
								if($(this).val().replace(/-/gi,"").length==8 && parseInt($(this).val().replace(/-/gi,""),10) > parseInt(dateUtil.toDay,10)){
									$(this).val(dateUtil.format(dateUtil.toDay));
								}
							}else{
								$(this).val(dateUtil.editFormat($(this).val()));
							}
						}
					}
				}).unbind("focusout").focusout(function(){
					if($(this).val().length != 0 && $(this).val().length != 10 && $(this).attr("dateType") != "MD"){
						alert("날짜를 정확하게 입력하시기 바랍니다.");
						$(this).focus();
					}
				});
				if($(this).val() != "" && $(this).attr("dateType") != "MD"){
					$(this).val(dateUtil.editFormat($(this).val()));
				}
				$("#"+$(this).attr("id")+"_btn").unbind("click").click(function(){
					dateUtil.click({frameId:"calendarPopupFrame",id:$(this).attr("id").replace(/_btn/,""),btnId:$(this).attr("id"),originId:$(this).attr("name"),dateType:$(this).attr("dateType")});
				});
			}
		});
		if(!dateUtil.mouseWheelEventCheck){
			if(typeof document.addEventListener == "undefined"){
				document.getElementById("calendarPopupFrame").contentWindow.document.attachEvent("on"+dateUtil.mousewheelevt, dateUtil.mouseWhellEvent, false);
			}else{
				if(navigator.userAgent.toLowerCase().indexOf("msie") > -1){
					document.getElementById("calendarPopupFrame").contentWindow.document.addEventListener(dateUtil.mousewheelevt, dateUtil.mouseWhellEvent, false);
				}else{
					if("DOMMouseScroll" == dateUtil.mousewheelevt){
						document.getElementById("calendarPopupFrame").contentWindow.addEventListener(dateUtil.mousewheelevt, dateUtil.mouseWhellEvent, false);
					}else{
						document.getElementById("calendarPopupFrame").addEventListener(dateUtil.mousewheelevt, dateUtil.mouseWhellEvent, false);
					}
				}
			}
			dateUtil.mouseWheelEventCheck = true;
		}
	},
	/*
	 *  ex) alert(dateUtil.getCustomDate('20141231',"0","-1","0")); 현재날짜 +- 년 +- 월 +- 일
	 */
	getCustomDate : function(arg,y,m,d){
		arg = arg.replace(/-/gi,"");
		if(parseInt(arg.substring(0,4),10)%4 == 0){
			dateUtil.maxDay[1] = 29;
		}else{
			dateUtil.maxDay[1] = 28;
		}
		if(parseInt(arg.substring(6),10) > dateUtil.maxDay[parseInt(arg.substring(4,6),10)+parseInt(m,10)-1]){
			d = parseInt(d,10) + dateUtil.maxDay[parseInt(arg.substring(4,6),10)+parseInt(m,10)-1] - parseInt(arg.substring(6),10);
		}
		var date = new Date(parseInt(arg.substring(0,4),10),parseInt(arg.substring(4,6),10)-1,parseInt(arg.substring(6),10));
		var format = "-";
		date.setYear(date.getFullYear() + (parseInt(y,10)));
		date.setMonth(date.getMonth() + (parseInt(m,10)));
		date.setDate(date.getDate() + (parseInt(d,10)));
		return date.getFullYear()+format+dateUtil.addChar((date.getMonth()+1),"LEFT",2,"0") + format + dateUtil.addChar(date.getDate(),"LEFT",2,"0");
	},
	addChar : function(s,loc,len,ch){
		for(var i=0;i<len-s.toString().length;i++){
			if(loc == "LEFT") s = ch+s;
			else  if(loc == "RIGHT") s = s+ch;
		}
		return s;
	},
	getToday : function(){
		var now = new Date();
		year = now.getFullYear();
		month = now.getMonth()+1;
		day = now.getDate();

		if ( month < 10) {
		 month = "0"+month;
		}
		if ( day < 10) {
		day = "0"+day;
		}
 
		return year+''+month+''+day;
	},
	getMoveMonth : function(arg_month){
		var now = new Date();
		year = now.getFullYear();
		month = now.getMonth()+1 + arg_month;
		day = now.getDate();

		if ( month < 10) {
			month = "0"+month;
		}
		if ( day < 10) {
			day = "0"+day;
		}

		return year+''+month+''+day;
	},
	getBackMonth : function(arg_month){
		var now = new Date();
		year = now.getFullYear();
		month = now.getMonth()-1 + arg_month;
		day = now.getDate();

		if ( month < 10) {
			month = "0"+month;
		}
		if ( day < 10) {
			day = "0"+day;
		}

		return year+''+month+''+day;
	},
	month_minus : function (sDate, nMon) {
		var yy = parseInt(sDate.substr(0, 4), 10);
		var mm = parseInt(sDate.substr(4, 2), 10);
		var dd = parseInt(sDate.substr(6, 2), 10);
		d = new Date(yy, (mm - 1) - nMon, dd);
		yy = d.getFullYear();
		mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
		dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
		return '' + yy + '' +  mm  + '' + dd;
	}
};