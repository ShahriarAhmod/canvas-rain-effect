(function($){
	$.fn.Background = function(options){
	'use strict';
		/**------------------ SETTING PARAMETERS ------------------**/
		var height;
		var width;
		var drops = 500;
		var length = 40;
		var interval = 50;
		var color = {r:256, g:256, b:256};
		var angle = 30;
		var opacity = .2;
		var stroke = 2;
		var config = {};
		if(options){
			$.extend(config, options);
		}
		/**------------------ BEGIN FUNCTION BODY ------------------**/
			var selector = $(this);
			var selectorCan = $(this).find("canvas");
			
			if(config.drops)
				drops = parseInt(config.drops, 10);

			if(config.length)
				length = parseInt(config.length, 10);

			if(config.interval)
				interval = parseInt(config.interval, 10);

			if(config.stroke)
				stroke = parseInt(config.stroke, 10);

			if(config.angle)
				angle = parseInt(config.angle, 10);

			if(config.opacity)
				opacity = parseFloat(config.opacity);

			
			if(config.color){
				var regExp = new RegExp("\\d+", "g");
				color.r = regExp.exec(config.color);
				color.g = regExp.exec(config.color);
				color.b = regExp.exec(config.color);
			}
			
			
			/**------------------------------------------------  SETTING FUNCTIONS ------------------------------------------------- **/

			width = selector.width();
			height = selector.height();
			
			selectorCan.attr('height', height);
			selectorCan.attr('width', width);
			
			var canvas = selectorCan[0];
			var ctx = canvas.getContext("2d");

			var rain = new Array();
			
			function refresh(){
				width = selector.width();
				height = selector.height();
				
				selectorCan.attr('height', height);
				selectorCan.attr('width', width);
				
				for(var i = 0; i < drops; i++){
					rain[i] = {posX : 100, posY : 100, angle : 30, length : 20, opacity : .4, stroke : 2};
					rain[i].posX = Math.random()*width;
					rain[i].posY = Math.random()*height;
					rain[i].angle = angle;
					rain[i].length = Math.random()*length;
					rain[i].opacity = Math.random()*opacity;
					rain[i].stroke = Math.random()*stroke;
				}

			}
			
			function createRain(rainId){
				var fposX, fposY, fangle, flength, fopacity, fstroke;
				fposX = rain[rainId].posX;
				fposY = rain[rainId].posY;
				fangle = rain[rainId].angle;
				fopacity = rain[rainId].opacity;
				fstroke = rain[rainId].stroke;
				flength = rain[rainId].length;
				
				ctx.beginPath();
				ctx.moveTo(fposX, fposY);
				ctx.lineTo(fposX + flength*Math.sin(Math.PI*fangle/180) , fposY + flength*Math.cos(Math.PI*fangle/180));
				ctx.strokeStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", " + fopacity +")";
				ctx.lineWidth = fstroke;
				ctx.stroke();

				rain[rainId].posX = Math.random()*width;
				rain[rainId].posY = Math.random()*height;
				rain[rainId].angle = angle;
				rain[rainId].length = Math.random()*length;
				rain[rainId].opacity = Math.random()*opacity;
				rain[rainId].stroke = Math.random()*stroke;
				
			}
			

			function setBackground(){
									
				ctx.clearRect(0, 0, width, height);
				
				for(var i = 0; i < drops; i++){
					createRain(i);
				}
				
			}
			refresh();
						
			
			setInterval(setBackground, interval);
		
			$(window).resize(function(){
				refresh();
			})
		
	}
})(jQuery)
