var validation_commonKeyCode = [4,6,8,9,13,46,37,39];
var validation_numberCheck   = ["bizValid","ssnValid","corpValid","mobileValid","telValid","money","number","mNumber"];
var validation_imeMode       = ["onlyEng"];
(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* 필수 항목 입니다.",
                    //"alertText": "* 필수 항목 입니다.", // WCW00001 웹콩통경고성 응답코드
                    "alertTextCheckboxMultiple": "* Please select an option",
                    "alertTextCheckboxe": "* This checkbox is required",
                    "alertTextDateRange": "* Both date range fields are required"
                },
                "notNull": {
                    "func": function(field, rules, i, options){
                		var regExp 	= /[\s]/g;
                		var dat = field.val().replace(regExp,"");
                		var fn = window[field.attr("fn")];
	        			if (dat == "") {
	        				if(fn != null){
	        					if( $.isFunction(fn) ){
	        						fn(field);
	        					}
	        				}
	        				return false;
	        			} else {
	        				return true;
	        			}
                    },
                    "info"     : "* 필수 항목 입니다.",
                    "alertText": "* 필수 항목 입니다."
                },
                "notZero": {
                    "func": function(field, rules, i, options){
                		var regExp 	= /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
                		var dat = pf.null2void(field.val(),"0").replace(regExp,"");
                		var fn = window[field.attr("fn")];
	        			if (dat == "0" || dat == "") {
	        				return false;
	        			} else {
	        				return true;
	        			}
                    },
                    "info"     : "* 필수 항목 입니다.",
                    "alertText": "* 필수 항목 입니다."
                },                
                "maxCustomFn": {
                    "func": function(field, rules, i, options){
                		var fn = window[field.attr("fn")];
                		if( $.isFunction(fn) ){
                			return fn();
                		}
                    },
                    "info"     : "",
                    "alertText": "WAI00035"
                },                
                "customFn": {
                	"func": function(field, rules, i, options){
	                	var fn = window[field.attr("fn")];
	                	if( $.isFunction(fn) ){
	                		return fn();
	                	}
	                },
	                "info"     : "* 필수 항목 입니다.",
	                "alertText": "* 필수 항목 입니다."
	            },                
                "bizValid": { 
                    "func": function(field, rules, i, options){
	                	var dat = field.val().replace(/[^0-9]/g, "");
	        			if (dat.length == 10) {
	        				return true;
	        			} else {
	        				return false;
	        			}
                    },
                    "format": function(field, rules, i, options){
                    	if (!field.val()) return;
            			var dat = field.val().replace(/[^0-9]/g, "");
            			
            			if (dat.length == 10) {
            				dat = dat.substring(0, 3) + "-" + dat.substring(3, 5) + "-" + dat.substring(5, 10);
            				field.val(dat);
            			} else {
            			}
                    },
                    "check2": function(field, rules, i, options, event){
                    	var code = validation_getKeyCode(event);
            			if (validation_isCommonKeyCode(code)){
            				return true;
            			}
            			if( (code>=48/*number 0*/ && code<=57/*number 9*/) || (code>=96/*number 0*/ && code<=105/*number 9*/)) {
            				return true; 
            			} else {
            				event.preventDefault();
            				return false;
            			}
                    },
					"info"     : "사업자번호 양식 : 123-75-78977",
					 "alertText": "* 사업장 번호가 올바르지 않습니다."
                },
                "emailValid": { 
                	"func": function(field, rules, i, options){
	                	var regExp 	= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        			if (!regExp.test(field.val())) {
	        				return false;
	        			} else {
	        				return true;
	        			}
	                },
 					"info"     : "E-Mail 양식 : WEBCASH@WEBCASH.COM",
	                "alertText": "* E-Mail 주소가 올바르지 않습니다."
                },
                "ssnValid": { 
                	"func": function(field, rules, i, options){
	                	var dat = field.val().replace("-","");
	        			
	        			if (typeof(dat) == "number") {
	        				return false;
	        			}
	        			
	        			if (dat.length != 13) {
	        				return false;
	        			}
	        			
	        			var arrList = new Array(13);
	          
	        			for (var i=0; i<13; i++) {
	        				arrList[i] = dat.charAt(i);
	        			}
	        			
	        			var sumNo = 0;
	        						
	        			sumNo += arrList[0]  * 2;
	        			sumNo += arrList[1]  * 3;
	        			sumNo += arrList[2]  * 4;
	        			sumNo += arrList[3]  * 5;
	        			sumNo += arrList[4]  * 6;
	        			sumNo += arrList[5]  * 7;
	        			sumNo += arrList[6]  * 8;
	        			sumNo += arrList[7]  * 9;
	        			sumNo += arrList[8]  * 2;
	        			sumNo += arrList[9]  * 3;
	        			sumNo += arrList[10] * 4;
	        			sumNo += arrList[11] * 5;

	        			var checkNo = (11 - (sumNo % 11))%10

	        			if (checkNo != arrList[12]) {
	        				return false;
	        			} else {
	        				return true;
	        			}
	                },
	                "format": function(field, rules, i, options){
	                	if (!field.val()) return;
	        			var dat = field.val().replace(/[^0-9]/g, "");
	        			if (dat.length == 13) {
	        				dat = dat.substring(0,6) + "-" + dat.substring(6,13);
	        				field.val(dat);
	        			} else {
	        			}
                    },
                    "check2": function(field, rules, i, options, event){
                    	var code = validation_getKeyCode(event);
            			if (validation_isCommonKeyCode(code)){
            				return true;
            			}
            			if( (code>=48/*number 0*/ && code<=57/*number 9*/) || (code>=96/*number 0*/ && code<=105/*number 9*/)) {
            				return true; 
            			} else {
            				event.preventDefault();
            				return false;
            			}
                    },
	                "info"     : "주민번호 양식 : 123456-1234567",
	                "alertText": "* 주민등록 번호가 올바르지 않습니다."
                },
                "corpValid": { 
                    "func": function(field, rules, i, options){
	                	var dat = field.val().replace("-","");
	        			if (dat.length != 13) return false;
	        			
	        			var sumNo = 0;
	        			
	        			for (var i = 0; i < 12; i++ ) {
	        				sumNo += ((i % 2) + 1) * parseFloat(dat.charAt(i));
	        			}
	        	
	        			var result = (10 - ( sumNo % 10 )) % 10;
	        			
	        			if (parseFloat(dat.charAt(12)) != result) {
	        				return false;
	        			} else {
	        				return true;
	        			}
                    },
                    "format": function(field, rules, i, options){
                    	if (!field.val()) return;
            			var dat = field.val().replace(/[^0-9]/g, "");
            			
            			if (dat.length == 13){
            				dat = dat.substring(0,6) + "-" + dat.substring(6,13);
            				field.val(dat);
            			} else {
            			}
                    },
                    "check2": function(field, rules, i, options, event){
                    	var code = validation_getKeyCode(event);
            			if (validation_isCommonKeyCode(code)){
            				return true;
            			}
            			if( (code>=48/*number 0*/ && code<=57/*number 9*/) || (code>=96/*number 0*/ && code<=105/*number 9*/)) {
            				return true; 
            			} else {
            				event.preventDefault();
            				return false;
            			}
                    },
					 "info"     : "법인번호 양식 : 120111-0038506",
					 "alertText": "* 법인 번호가 올바르지 않습니다."
                },
                "mobileValid": { 
                	"func": function(field, rules, i, options){
	                	var regExp = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
	        			
	        			if (!regExp.test(field.val())) {
	        				return false;
	        			} else {
	        				return true;
	        			}
	                },
	                "format": function(field, rules, i, options){
	                	if (!field.val()) return;
	        			var dat 	= field.val().replace(/[^0-9]/g, "");
	        			var datLeng	= dat.length;
	        			
	        			if 			(datLeng ==  9) dat = dat.substring(0,2)+ "-" + dat.substring(2,5) + "-" + dat.substring(5,9);
	        			else if 	(datLeng == 10) dat = dat.substring(0,3)+ "-" + dat.substring(3,6) + "-" + dat.substring(6,10);
	        			else if 	(datLeng == 11) dat = dat.substring(0,3)+ "-" + dat.substring(3,7) + "-" + dat.substring(7,11);
	        			//else dat = "";
	        			
	        			field.val(dat);
                    },
                    "check2": function(field, rules, i, options, event){
                    	var code = validation_getKeyCode(event);
            			if (validation_isCommonKeyCode(code)){
            				return true;
            			}
            			if( (code>=48/*number 0*/ && code<=57/*number 9*/) || (code>=96/*number 0*/ && code<=105/*number 9*/)) {
            				return true; 
            			} else {
            				event.preventDefault();
            				return false;
            			}
                    },
	                "info"     : "핸드폰번호 양식 : 010-0000-0000",
                	 "alertText": "* 핸드폰 번호가 올바르지 않습니다."
                },
                "telValid": { 
                	"func": function(field, rules, i, options){
	                	var regExp = /^(02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

	                	if( field.val() == "" || field.val() == undefined || field.val() == null ){
	                		return true;
	                	} 	                	
	                	
	                	if (!regExp.test(field.val())) {
	                		return false;
	                	} else {
	                		return true;
	                	}
	                },
	                "format": function(field, rules, i, options){
	        			var dat 	= field.val().replace(/[^0-9]/g, "");
	        			var datLeng	= dat.length;
	        			
	        			if 			(datLeng ==  9) dat = dat.substring(0,2)+ "-" + dat.substring(2,5) + "-" + dat.substring(5,9);
	        			else if 	(datLeng == 10) dat = dat.substring(0,3)+ "-" + dat.substring(3,6) + "-" + dat.substring(6,10);
	        			else if 	(datLeng == 11) dat = dat.substring(0,3)+ "-" + dat.substring(3,7) + "-" + dat.substring(7,11);
	        			//else dat = "";
	        			
	        			field.val(dat);
                    },
                    "check2": function(field, rules, i, options, event){
                    	var code = validation_getKeyCode(event);
            			if (validation_isCommonKeyCode(code)){
            				return true;
            			}
            			if( (code>=48/*number 0*/ && code<=57/*number 9*/) || (code>=96/*number 0*/ && code<=105/*number 9*/)) {
            				return true; 
            			} else {
            				event.preventDefault();
            				return false;
            			}
                    },
	                "info"     : "전화번호 양식 : 02-5555-7777",
                 	"alertText": "* 전화번호가 올바르지 않습니다."
                },
                "maxLength": { 
                	"func": function(field, rules, i, options){
	                	var min = parseInt(field.attr("Length"));
	        			var dat = field.val();
	        			
	        			if (dat.length > min) {
	        				field.val(dat.substring(0, min));
	        				return false;
	        			}else{
	        				return true;
	        			}
                	},
                	"format": function(field, rules, i, options){
                		var min = parseInt(field.attr("Length"));
            			var dat = field.val();
            			
            			if (dat.length > min) {
            				field.val(dat.substring(0, min));
            			}
                    },
					"info"     : "길이제한",
					 "alertText": "* 입력값 길이 제한."
                },
                "minLength": { 
                	"func": function(field, rules, i, options){
	                	var min = parseInt(field.attr("Length"));
	        			var dat = field.val();
	        			
	        			if (dat.length >= min) {
	        				return true;
	        			}else{
	        				return false;
	        			}
                	},
                	"info"     : "최소길이제한",
                	"alertText": "* 최소 입력값 길이 제한"
                },
                "maxbyte": { 
                	"func": function(field, rules, i, options){
	                	var len = 0;
	                	var min = parseInt(field.attr("Length"));
	                	var str = field.val();
	                	var fn = window[field.attr("fn")];
	                	
	            		for ( var i = 0; i < str.length; i++) {
	            			var c = escape(str.charAt(i));
	            			if (c.length == 1)
	            				len++;
	            			else if (c.indexOf("%u") != -1)
	            				len += 2;
	            			else if (c.indexOf("%") != -1)
	            				len += c.length / 3;
	            		}
	            		if (len > min) {
	        				if(fn != null){
	        					if( $.isFunction(fn) ){
	        						fn(field);
	        					}
	        				}	            			
	        				return false;
	        			}else{
	        				return true;
	        			}
                	},
                	"check2": function(field, rules, i, options, event){
                		var len = 0;
	                	var min = parseInt(field.attr("Length")) - 1;
	                	var str = field.val();
	            		for ( var i = 0; i < str.length; i++) {
	            			var c = escape(str.charAt(i));
	            			if (c.length == 1)
	            				len++;
	            			else if (c.indexOf("%u") != -1)
	            				len += 2;
	            			else if (c.indexOf("%") != -1)
	            				len += c.length / 3;
	            		}
	            		if (len > min) {
	            			var code = validation_getKeyCode(event);
	            			if (validation_isCommonKeyCode(code)){
	            				return true;
	            			}else{
	            				event.preventDefault();
	            				return false;
	            			}
	        			}else{
	        				return true;
	        			}
                    },
                	"info"     : "",
                	"alertText": "WAI00035"
                },
                "minbyte": { 
                	"func": function(field, rules, i, options){
	                	var len = 0;
	                	var min = parseInt(field.attr("Length"));
	                	var str = field.val();
	            		for ( var i = 0; i < str.length; i++) {
	            			var c = escape(str.charAt(i));
	            			if (c.length == 1)
	            				len++;
	            			else if (c.indexOf("%u") != -1)
	            				len += 2;
	            			else if (c.indexOf("%") != -1)
	            				len += c.length / 3;
	            		}
	            		if (len >= min) {
	            			return true;
	        			}else{
	        				return false;
	        			}
                	},
                	"info"     : "WAI00036",
                	"alertText": "WAI00036"
                },
                "number": { 
                	"func": function(field, rules, i, options){
	                	var dat = field.val().replace(/[0-9]/g, "");
	        			if (dat.length == 0) {
	        				return true;
	        			} else {
	        				return false;
	        			}
                	},
                	"format": function(field, rules, i, options){
                		var dat = field.val();
                		field.val(dat.replace(/[^0-9]/g, "")); 
                    },
                    "check2": function(field, rules, i, options, event){
                    	var code = validation_getKeyCode(event);
            			if (validation_isCommonKeyCode(code)){
            				return true;
            			}
            			if( (code>=48/*number 0*/ && code<=57/*number 9*/) || (code>=96/*number 0*/ && code<=105/*number 9*/)) {
            				return true; 
            			} else {
            				event.preventDefault();
            				return false;
            			}
                    },
                	"info"     : "* 숫자만 입력해 주세요.",
                	"alertText": "* 숫자만 입력해 주세요."
                },
                "upper": { 
                	"func": function(field, rules, i, options){
    					return true;
        			},
                    "format": function(field, rules, i, options){
                    	var dat = field.val();
                    	field.val(dat.toUpperCase()); 
                    },
                    "info"     : "WAI00038",
                    "alertText": "WAI00038"
                },
                "lower": { 
                	"func": function(field, rules, i, options){
    					return true;
        			},
                    "format": function(field, rules, i, options){
                    	var dat = field.val();
                    	field.val(dat.toLowerCase()); 
                    },
                    "info"     : "WAI00039",
                    "alertText": "WAI00039"
                },
                "domain": { 
                	"func": function(field, rules, i, options){
	                	var regExp 	= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\")).((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//	                	var regExp1 = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;
	                	var regExp1 = /(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.)/;
	                	if(field.val() == ""){
	                		return true;
	                	}
	        			if (!regExp.test(field.val())) {
	        				if(!regExp1.test(field.val())){
	        					return false;
	        				}else{
	        					return true;
	        				}
	        			} else {
	        				return true;
	        			}
	                },
	                "info"     : "WAI00061",
	                "alertText": "WAI00062"
                }
                ,
                "money": { 
                	"func": function(field, rules, i, options){
	                	var dat = field.val().replace(/[0-9]/g, "").replaceAll(",", "");
	        			if (dat.length == 0) {
	        				return true;
	        			} else {
	        				return false;
	        			}
                	},
                	"format": function(field, rules, i, options){
                		var dat = field.val();
                		if(typeof dat == "number")	dat = String(dat);
                		
                		if(dat.indexOf('.') > -1){
                			dat = dat.substring(0,dat.indexOf('.')); 
                		}
                		
                		//dat = field.val().replace(/[^0-9]/g, "");
                		
                		var reg = /(^[+-]?\d+)(\d{3})/;    				// 정규식(3자리마다 ,를 붙임)
                		dat += ''; 										// ,를 찍기 위해 숫자를 문자열로 변환
                		while (reg.test(dat)) 							// dat값의 첫째자리부터 마지막자리까지
                			dat = dat.replace(reg, '$1' + ',' + '$2');	// 인자로 받은 dat 값을 ,가 찍힌 값으로 변환시킴
                		
                		field.val(dat); 
                    },
                    "check2": function(field, rules, i, options, event){
                    	var code = validation_getKeyCode(event);
            			if (validation_isCommonKeyCode(code)){
            				return true;
            			}
            			if( (code>=48/*number 0*/ && code<=57/*number 9*/) || (code>=96/*number 0*/ && code<=105/*number 9*/)) {
            				return true; 
            			} else {
            				event.preventDefault();
            				return false;
            			}
                    },
                	"info"     : "* 숫자만 입력해 주세요.",
                	"alertText": "* 숫자만 입력해 주세요."
                },
                "mNumber": { 
                	"func": function(field, rules, i, options){
	                	var dat  = field.val().replace(/[0-9]/g, "").replaceAll(",", "").replaceAll("-", "");
	                	var dat2 = field.val().replaceAll("-", "");
	                	
	                	if (dat2.length == 0 && field.val().indexOf("-") > -1) {
	        				return false;
	        			}
	                	
	        			if (dat.length == 0) {
	        				return true;
	        			} else {
	        				return false;
	        			}
                	},
                	"format": function(field, rules, i, options){
                		var dat = field.val();
                		if(typeof dat == "number")	dat = String(dat);
                		
                		if(dat.indexOf('.') > -1){
                			dat = dat.substring(0,dat.indexOf('.')); 
                		}
                		
                		//dat = field.val().replace(/[^0-9]/g, "");
                		
                		var reg = /(^[+-]?\d+)(\d{3})/;    				// 정규식(3자리마다 ,를 붙임)
                		dat += ''; 										// ,를 찍기 위해 숫자를 문자열로 변환
                		while (reg.test(dat)) 							// dat값의 첫째자리부터 마지막자리까지
                			dat = dat.replace(reg, '$1' + ',' + '$2');	// 인자로 받은 dat 값을 ,가 찍힌 값으로 변환시킴
                		
                		field.val(dat); 
                    },
                    "check2": function(field, rules, i, options, event){
                    	var code = validation_getKeyCode(event);
            			if (validation_isCommonKeyCode(code)){
            				return true;
            			}

            			if( ( code==109 || code==189 ) && ( field.val().length != 0 )){
            				event.preventDefault();
            				return false;
            			}
            			if( (code>=48/*number 0*/ && code<=57/*number 9*/) || (code>=96/*number 0*/ && code<=105/*number 9*/) || code==109 || code==189) {
            				return true; 
            			} else {
            				event.preventDefault();
            				return false;
            			}
                    },
                	"info"     : "* 숫자만 입력해 주세요.",
                	"alertText": "* 숫자만 입력해 주세요."
                },
                "specialChar": { 
                	"func": function(field, rules, i, options){
//	                	var regExp 	= /[`'~!@#$%^&*|\\\'\";:\/?\[\]<>{},.+=\-_()]/gi;
//	                	var regExp 	= /[`'~!@#$%^&*|\\\'\";:?\[\]<>{}+=\-_()]/gi;
                		var regExp 	= /[`'@#$%^&*|\\\'\";:?\[\]<>{}+=\-_()]/gi;
	                	if(field.val()==""){
	                		return true;
	                	}
	        			if (regExp.test(field.val())) {
	        				return false;
	        			} else {
	        				return true;
	        			}
	                },
	                "check1": function(field, rules, i, options, event){
	                	var code  = validation_getKeyCode(event);
	                	var allow = field.attr("allowable_Char");
	                	if(allow && ( code == "33" /* ! */|| code == "46" /* . */|| code == "126" /* ~ */) ){
	                		return true;
	                	}
	                	if ((code > 32 && code < 48) || (code > 57 && code < 65) || (code > 90 && code < 97) || (code > 122 && code < 127)){
	                		event.preventDefault();
	        				return false;
	        			}
                	},
	                "info"     : "",
	                "alertText": "WAI00068"
                },
                "htmlTag": { 
                	"func": function(field, rules, i, options){
	                	var regExp 	= /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig;
	                	if(field.val()==""){
	                		return true;
	                	}
	        			if (regExp.test(field.val())) {
	        				return false;
	        			} else {
	        				return true;
	        			}
	                },
	                "info"     : "",
	                "alertText": "뭐하시려구요? 안됩니다"
                },
                "onlyEng": { 
                	"func": function(field, rules, i, options){
                		return true;
                	},
                	"check2": function(field, rules, i, options, event){
	                	var code = validation_getKeyCode(event);
	                	if (validation_isCommonKeyCode(code)){
	                		return true;
	                	}else{
	                		if( code>=90/*number 9*/ || code<=65/*number 0*/ )
	                		{
	                			event.preventDefault();
	                			return false;
	                		}
	                	}
                	},
                	 "info"     : "",
 	                 "alertText": ""
	           },
               "Eng_Number": { 
	               	"func": function(field, rules, i, options){
	               		return true;
	               	},
	               	"check2": function(field, rules, i, options, event){
		                	var code = validation_getKeyCode(event);
		                	if (validation_isCommonKeyCode(code)){
		                		return true;
		                	}else{
		                		if( !(code>=90/*number 9*/ || code<=65/*number 0*/) || (code>=48/*number 0*/ && code<=57/*number 9*/) || (code>=96/*number 0*/ && code<=105/*number 9*/))
		                		{
		                			return true; 
		                		}else{
	                				event.preventDefault();
	                				return false;
 
		                		}
		                	}
	               	},
	               	 "info"     : "",
	                 "alertText": ""
	           }

            };
            
        }
    };
    

    $.validationEngineLanguage.newLang();
    
})(jQuery);
function validation_isCommonKeyCode(code){
	for (var i=0; i<validation_commonKeyCode.length; i++) {
		if (validation_commonKeyCode[i] == code) return true;
	}
	return false;
}
function validation_getKeyCode(e){
	var code;
	if (!e) e = window.event;
	if (!!e.keyCode) code = e.keyCode;
	else if(e.which) code = e.which;
	
	return code;
}