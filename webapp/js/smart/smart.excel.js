/**
 * 
 */
$(document).ready(function(){
	try{
		var excelDownloadHtml="<div style='display:none' id='_jexGridExcelDown'>";
		excelDownloadHtml+="<form method='post' enctype='multipart/form-data' name='_jexGridDownloadForm' id='_jexGridDownloadForm' action='/js/jexGrid/file/downloadProc.jsp' target='_jexGridDownloadIfrm'>";
		excelDownloadHtml+="<textarea  name='json' id='json'></textarea>";
		excelDownloadHtml+="</form>";
		excelDownloadHtml+="<iframe name='_jexGridDownloadIfrm' id='_jexGridDownloadIfrm' style='width:0px;height:0px;display:none'/>";
		excelDownloadHtml+="</div>";	
		$("body").append(excelDownloadHtml);
	}catch(e){};
});

function _excelDownload(downGrid, title){
	//원본 그리드 정보읽기

	var orgGrid = downGrid;
	var jgridDownload = {};
	jgridDownload.fileTitle = {
		title: jex.null2Void(title,"")
		,details:[]
	};

	//파일의 헤더(타이틀)정보 읽기
	if(!!orgGrid.fileTitle)
	{
		jgridDownload.fileTitle.title = orgGrid.fileTitle.title;
		for(var key in orgGrid.fileTitle.details)
		{
			if(!!orgGrid.fileTitle.details[key].key)
			{
				jgridDownload.fileTitle.details.push({
					key:orgGrid.fileTitle.details[key].key
					,value:orgGrid.fileTitle.details[key].value
				});
			}
		}
	}
	
	var _datalist = orgGrid.dataMgr.datalist;
	var _datalistLength = _datalist.length;
	
	if(_datalist.length==0)
	{
		alert("저장 할 항목이 없습니다. 저장항목을 확인해주세요.");
		return false;
	}
	
	
	
	var orgColDef = orgGrid.colDefMgr.getAll();
	var _colDefList = [];
	for(var i=0 ; i<orgColDef.length ; i++)
	{
		if( orgColDef[i].key == "checkbox" || orgColDef[i].hidden )
		{
			continue;
		}
		
		_colDefList.push({
			 gridunqid : String(i)
			,name : orgColDef[i].name
			,key : orgColDef[i].key
			,width: orgColDef[i].width
			,sumRenderer: !!orgColDef[i].sumRenderer?true:false
			,renderer : orgColDef[i].renderer
			,excelFormat : orgColDef[i].excelFormat
		});
	}
	var _colDefLength = _colDefList.length;
	var _saveDatalist = [];
	var _saveDatarow;
	var pattern = /(<([^>]+)>)/gi;	// 컬럼안에 태그 있을경우 내용까지 공백으로 변환되어 변경 by lsh
	for(var i=0 ; i<_datalistLength ; i++)
	{
		_saveDatarow = {};
		for(var j=0 ; j<_colDefLength ; j++)
		{
			var _cellValue;
			//var _cellValue = !!_colDefList[j].renderer?_colDefList[j].renderer(_datalist[i][ _colDefList[j].key ] , i):_datalist[i][ _colDefList[j].key ];
			if( !!_colDefList[j].renderer ) {
				try{
					var tempValue = _datalist[i][ _colDefList[j].key ];
					if(tempValue == null || tempValue == undefined || tempValue == "" || tempValue == "undefined"){
						tempValue ="";
					}
					_cellValue = _colDefList[j].renderer(tempValue , i , j , _datalist[i] , _colDefList[j]);
					if(_cellValue == null || _cellValue == undefined || _cellValue == "" || _cellValue == "undefined"){
						_cellValue = "";
					}else{
						if(typeof _cellValue == "string"){
							_cellValue = _cellValue.replace(pattern, "").replace(/&nbsp;/ig, " "); 	
						}
					}
				}catch(e){
					_cellValue = "";
				}
			}else{
				_cellValue = _datalist[i][ _colDefList[j].key ];
			}
			
			//console.log("excelFormat = [" + _colDefList[j].excelFormat + "]" + " :: value :: " + _cellValue + " :: type :: " + (typeof _cellValue));
			if (_colDefList[j].excelFormat == "int"){
				if((typeof _cellValue) == "string"){
					_cellValue = parseInt(_cellValue.replace(/,/g,"").replace("\\(", "").replace("\\)", ""));
				}
			}
			
			_saveDatarow["A"+j] = _cellValue==undefined?"":_cellValue;
			
		}
		
		_saveDatalist.push(_saveDatarow);
	} 

	var result = {
		colDef:_colDefList,
		data:_saveDatalist,
		title:jgridDownload.fileTitle
	};
	
	$("#_jexGridDownloadForm").find("#json").val( encodeURI(JSON.stringify(result)) );
	document.getElementById("_jexGridDownloadForm").submit();

};
