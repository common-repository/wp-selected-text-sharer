/* 
 * Selected Text Sharer v1.5
 * http://www.aakashweb.com/
 * Copyright 2010, Aakash Chakravarthy
 * Released under the MIT License.
 */

window.onload = function(){

	// Defaults
	var sts_options = {
		title : 'Use this text ...',
		lists : 'Google,http://www.google.com/search?q=%s',
		truncateChars : 115,
		extraClass : '',
		borderColor : '#444',
		background : '#fff',
		titleColor : '#f2f2f2',
		hoverColor : '#ffffcc',
		textColor : '#000'
	};
	
	// Assign defaults
	if(typeof sts_config !== "undefined"){
		for(var keyDef in sts_options){
			if(sts_config[keyDef] !== undefined){
				sts_options[keyDef] = sts_config[keyDef];
			}
		}
	}
	
	// Start ..
	var listSplit = [];
	var lstSplit = [];
	var cc;
	
	function getBaseUrl( url ) {
		if (url.indexOf('.') == -1 || url.indexOf('/') == -1){ 
			return false; 
		}
		var result = url.substr(0, url.indexOf( '/' , url.indexOf('.') ) + 1 );
		return result;
	}
	
	function splitList(){
		listSplit = (sts_options.lists).split('|');
		for(i=0; i<listSplit.length; i++){
			lstSplit[i] = listSplit[i].split(',');
		}
	} 
	
	function createListBox(){

		stsBox_wrap = document.createElement('div');
		stsBox_wrap_f = stsBox_wrap.setAttribute("id", "stsBox_wrap");
		stsBox_wrap.innerHTML = '<div id="stsBox_title">' + sts_options.title + '<a href="http://www.aakashweb.com" title="What is this ?" target="_blank" rel="follow">?</a></div><div id="stsBox_list"><ul id="stsBox_ul"></ul></div><span id="stsBox_arrow"></span>';
		stsBox_wrap.setAttribute('class', sts_options.extraClass);
		document.body.appendChild(stsBox_wrap);
		
	}
	
	function addToList(){
		for(i=0; i<listSplit.length; i++){
			if(lstSplit[i][0] !== null){
				if(lstSplit[i][2] !== null){
					iconUrl = lstSplit[i][2].split(' ').join('');
					if(iconUrl == 'favicon'){
						img = '<img src="' + getBaseUrl(lstSplit[i][1]) + 'favicon.ico" width="16" height="16" alt="' + lstSplit[i][0] + '"/> ';
						
					}else{
						img = '<img src="' + lstSplit[i][2] + '" width="16" height="16" alt="' + lstSplit[i][0] + '"/> ';
					}
					
				}else{
					img = '';
				}
				tempList= img + '<a rel="' + lstSplit[i][1] + '" title="' + lstSplit[i][0] + '" href="#">' + lstSplit[i][0] + '</a>';
				newList = document.createElement("li");
				newList.setAttribute('value', lstSplit[i][1]);
				newList.innerHTML = tempList;
				document.getElementById('stsBox_ul').appendChild(newList);
			}
		}
	}
	
	function applyCss(){

		stsW = document.getElementById('stsBox_wrap');
		stsW.style.position = 'absolute';
		stsW.style.display = 'none';
		stsW.style.margin = '0';
		stsW.style.width = '200px';
		stsW.style.border = '5px solid ' + sts_options.borderColor;
		stsW.style.borderRadius = '5px';
		stsW.style.webkitBorderRadius = '5px';
		stsW.style.MozBorderRadius = '5px';
		
		stsImg = stsW.getElementsByTagName('img');
		for(var i=0;i<stsImg.length;i++){
			stsImg[i].style.verticalAlign = 'middle';
		}

		stsT = document.getElementById('stsBox_title');
		stsT.style.background = sts_options.titleColor;
		stsT.style.padding = '3px';
		stsT.style.borderBottom = '1px solid #e5e5e5';
		stsT.style.color = sts_options.textColor;
		
		stsTa = stsT.getElementsByTagName('a');
		for(var i=0;i<stsTa.length;i++){
			stsTa[i].style.float = 'right';
			stsTa[i].style.paddingLeft = '5px';
			stsTa[i].style.paddingRight = '5px';
		}
		
		stsA = stsW.getElementsByTagName('a');
		for(var i=0;i<stsA.length;i++){
			stsA[i].style.color = sts_options.textColor;
			stsA[i].style.textDecoration = 'none';
		}
		
		stsL = document.getElementById('stsBox_list');
		stsL.style.background = sts_options.background;
		
		stsUl = stsW.getElementsByTagName('ul');
		for(var i=0;i<stsUl.length;i++){
			stsUl[i].style.listStyle = 'none';
			stsUl[i].style.margin = '0px';
			stsUl[i].style.padding = '0px';
			stsUl[i].style.cursor = 'pointer';
		}
		
		stsLi = stsW.getElementsByTagName('li');
		for(var i=0;i<stsLi.length;i++){
			stsLi[i].style.padding = '3px';
			stsLi[i].onmouseover = function(){
				this.style.background = sts_options.hoverColor;
			};
			stsLi[i].onmouseout = function(){
				this.style.background = 'none';
			};
		}
		
		stsAr = document.getElementById('stsBox_arrow');
		stsAr.style.width = 0;
		stsAr.style.height = 0; 
		stsAr.style.lineHeight = 0; 
		stsAr.style.borderLeft = '10px solid transparent'; 
		stsAr.style.borderTop = '15px solid ' + sts_options.borderColor; 
		stsAr.style.position = 'absolute'; 
		stsAr.style.bottom = '-19px';
		
	}
	
	function getSelectionText(){
		if (window.getSelection){
			selectionTxt = window.getSelection();
		}
		else if (document.getSelection){
			selectionTxt = document.getSelection();
		}
		else if (document.selection){
			selectionTxt = document.selection.createRange().text;
		}
		
		cc = selectionTxt;
		
		return selectionTxt;
	}
	
	String.prototype.trunc = function(n){
		return this.substr(0, n-1) + (this.length > n ? '...' : '');
	};
	
	function getCursorPosition(e) {
		e = e || window.event;
		var cursor = {x:0, y:0};
		if (e.pageX || e.pageY) {
			cursor.x = e.pageX;
			cursor.y = e.pageY;
		} 
		else {
			cursor.x = e.clientX + 
				(document.documentElement.scrollLeft || 
				document.body.scrollLeft) - 
				document.documentElement.clientLeft;
			cursor.y = e.clientY + 
				(document.documentElement.scrollTop || 
				document.body.scrollTop) - 
				document.documentElement.clientTop;
		}
		return cursor;
	}
	
	function isBox(elem) {
		return elem != null && (elem.id === 'stsBox_wrap' || isBox(elem.parentNode));
	}
	
	document.onmouseup = function(e){
		var e = e || window.event;
		
		if (isBox(e.target || e.srcElement))
			return;
			
		if(getSelectionText() != ''){
			cursor = getCursorPosition(e);
			var x = cursor.x;
			var y = cursor.y;
			
			Ests = document.getElementById('stsBox_wrap');
			Ests.style.display = 'block';
			Ests.style.top = (y - (Ests.offsetHeight + 30)) + 'px';
			Ests.style.left = (x - 30) + 'px';
			
			EstsLi = Ests.getElementsByTagName('li');
			for(var i=0;i<EstsLi.length;i++){
				EstsLi[i].setAttribute('sel', getSelectionText());
			}
			
		}
	};
	
	function liOnClick(){
		Gsts = document.getElementById('stsBox_wrap');
		GstsLi = Gsts.getElementsByTagName('li');
		for(var j=0;j<GstsLi.length;j++){
			GstsLi[j].onclick = function(){				
				sUrl = this.getAttribute('value');
				selectedText = this.getAttribute('sel');
				theUrl = sUrl.replace('%s', selectedText);
				theUrl = theUrl.replace('%ts', selectedText.trunc(sts_options.truncateChars));
				window.open(theUrl, 'sts_window');
			};
		}
	}
	
	document.onmousedown = function(e){
		e = e || window.event;
		if (isBox(e.target || e.srcElement))
			return;
			
		Fsts = document.getElementById('stsBox_wrap');
		Fsts.style.display = 'none';
	}
	
	function init(){
		splitList();
		createListBox();
		addToList();
		applyCss();
		liOnClick();
	}
	
	init();
	
};