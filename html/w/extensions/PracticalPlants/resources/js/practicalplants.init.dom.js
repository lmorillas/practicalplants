(function($){


//move things around on dom load
/*$(function(){
	setArticleSummary();
	setArticleImage();
	setArticleState();	
	glueFooter();
	$(window).resize(glueFooter);
});*/


//domload isn't fast enough, still get FOUC, so we need to check every 10ms for the presence of the dom elements
var loop = setTimeout(checkDom, 10);
$(function(){ 
	clearTimeout(loop);
	
	//sometimes the dom loads so fast things don't get a chance to execute, so run through again to be sure
	setArticleSummary();
	setArticleImage();
	resizeArticleImage();
	setTOC();
	setIconBar();
	setArticleCommonName();
	setArticleState();	
	setArticleActions();
	glueFooter();
	initScrollSpy();
	
	$(window).resize(windowResize);
});//if things haven't been dom by dom load, the element ain't there...

var domOps = {
	summary:{
		selector: '#article-summary',
		call: setArticleSummary,
		done: false
	},
	image:{
		selector: '#article-image',
		call: setArticleSummary,
		done: false
	},
	state:{
		selector: '#article-state',
		call: setArticleSummary,
		done: false
	}
};
function checkDom(){
	//console.log("checking");
	var allDone=true;
	for(var k in domOps){
		if(!domOps.hasOwnProperty(k)){
			//console.log('Not even my property, yo');
			return;
		}
		if(domOps[k].done===false && $(domOps[k].selector).length > 0){
			//console.log('Element detected: '+domOps[k].selector+' performing dom op');
			domOps[k].done = true;
			domOps[k].call.call();
		}else{
			allDone=false;
		}
	}
	if(allDone===true){
		clearTimeout(loop);
	}else{
		loop = setTimeout(checkDom,50);
	}
}

function windowResize(){
  resizeArticleImage();
  glueFooter();
}

function setArticleSummary(){
	var summary = $('#article-summary');
	if(summary.length > 0){
		$('#page-header #article-title').after(summary);
	}
}

function setArticleImage(){

	var image = $('#article-image')
	    , image_el = $('header#page-header #article-image-container')
	    , header = $('#page-header');
	if(image.length){
		header.addClass('with-image')
		      .find('#article-title').before(image_el);
		
		image_el.append(image);
		
		resizeArticleImage();
	}else{
		image_el.hide();
	}
	
}

function resizeArticleImage(){
  /*var ic = $('#article-image-container');
  var height = $('#page-header').height();
  console.log('Setting image height to',height);
  
  //if( ic.find('img').width() / ic.find('img').height() > 1 )
  o_height = height+2;
  o_width = 'auto';
  width = 'auto';
  ic.css( {'height':o_height, 'width':o_width} );
  ic.find('#article-image,img').css( {'height':height, 'width':width} );*/
}

function setTOC(){
  var $toc = $('#toc');
  if($toc.length > 0){
    $('#sidebar #toc-container').prepend($toc);
  }
}  
function setIconBar(){
  var $ib = $('#plant-iconbar');
  if($ib.length > 0)
    $('#page-header').append($ib).addClass('with-iconbar');
}
function setArticleState(){
	//console.log("setting article state to top!");
	var state=$('#article-state');
	if(state.length>0){
		$('#page-header').before(state);
	}
}
function setArticleActions(){
	var actions = $('#article-actions');
	$('#page-header').prepend(actions);
	actions.addClass('moved');
}
function setArticleCommonName(){
	var common = $('#common-name');
	common.addClass('moved');
	if(common.length > 0){
		$('#page-header #article-title').append(common);
	}
}	
function initScrollSpy(){
    //$('body').scrollspy();
}
function glueFooter(){
	/*var footer = $('#footer');
	if(footer.length > 0 && footer.pos().top+footer.outerHeight() < window.height){
		footer.css({
		'position':'absolute',
		'bottom':window.height,
		'width':window.width
		});
	}*/
}
	
})(jQuery||$);