// (function($){
// 	//	jQuery plugin for a slider that can handle multiple ranges
// 	//	Originally developed for my income tax-bracket viewer

// 	$.fn.multiSlider = function(options){

// 		var defaults = $.extend({
// 			min: 0,
// 			max: 1000,
// 			values: [10, 50, 150, 300, 800],
// 			labels: [1, 2, 3, 4, 5, 6]
// 		}, options);

// 		console.log(this);
// 		console.log($(this));
// 		this.addClass("ui-slider");
// 		$(this).addClass("ui-slider");

// 		//	Figure out the positioning of each of the handles
// 		var positions = [];
// 		for(var v in options.values){
// 			positions.push(options.values[v] / (options.max - options.min) * 100);
// 		}

// 		//	Create a handle for each of the values
// 		for(var p in positions){
// 			var handle = $("<div class='ui-slider-handle ui-slider-handle-" + p + "' style='left:" + positions[p] + "%;'></div>")
// 				.draggable({
// 					axis: 'x',
// 					drag: function(event, ui){

// 						var leftPct = ui.position.left / (options.max - options.min) * 100;

// 						options.values[p] = leftPct * (options.max - options.min) / 100;
// 						console.log(options.values[p]);
// 					}
// 				});
// 			console.log(handle);
// 			$(this).append(handle);
// 		}

// 		//	Create a range between each of the handles (including between the start & first handle, and last handle & end)
// 	}


// 	$(document).ready(function(){
// 		$("#slider-range").multiSlider({
// 			min: 0,
// 			max: 500000,
// 			values: [ 18450, 74900, 151200, 230450, 411500, 464850 ],
// 			labels: [ "10%", "15%", "25%", "28%", "33%", "35%", "39.6%"]
// 		});
// 	});

// })(jQuery);




	$(function() {
		$("#slider-range").slider({
			min: 0,
			max: 500000,
			values: [ 18450, 74900, 151200, 230450, 411500, 464850 ],
			slide: function( event, ui ) {
				console.log(event);
				console.log(ui);
				$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
		$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
			" - $" + $( "#slider-range" ).slider( "values", 1 ) );
	});
