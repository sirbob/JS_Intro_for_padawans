(function($) {
    $.fn.wobblyFX = function(params) {
	params = $.extend({
	    rotation : 30,
	    ease : 1.0,
	    color : 100, //this will generate from 0 to 100
	    numOfDivs : 0,
	    delay : 0,
	    transformOrigin : 'center',
	    width : 100,
	    height : 100,
	    margin : 15,
	    randomizeAll : 0,
	    startWidth : 0,
	    startHeight : 0,
	    startMargin : 0,
	    timing : 'ease',
	    method : 'wobble',
	    method : 'move',
	    iteration : 0,
	    moveX : 0,
	    moveY : 0
	}, params);		
	var $self = $(this);

	var methods = {
	    addDivs : function() {	
		if(params.numOfDivs > 0) {
		    $self.empty();
		    var i = 0;
		    var divs = '';
		    while(i < params.numOfDivs) {
			divs += '<div class="wobbly_div" style="width:' + params.startWidth + ';height:' + params.startHeight + ';margin:' + params.startMargin + '"></div>';
			i++;
		    }
		    $self.append(divs);
		}
	    },
	    generateColor : function() {
		return Math.floor(Math.random() * params.color) + "" + Math.floor(Math.random() * params.color) + "" + Math.floor(Math.random() * params.color);
	    },
	    wobbleLeft : function(el) {
		var rot = params.rotation;
		var ease = params.ease;
		var width = params.width;
		var height = params.height;
		var margin = params.margin;
		if(params.randomizeAll > 0) {
		    rot = methods.randomize(rot, params.randomizeAll);
		    ease = methods.randomize(ease, params.randomizeAll);
		    width = methods.randomize(width, params.randomizeAll);
		    height = methods.randomize(height, params.randomizeAll);
		//margin = methods.randomize(margin, params.randomizeAll);
		}

		var color = methods.generateColor();
		$(el).css({
		    'width' : width + 'px',
		    'height' : height + 'px',
		    'margin' : margin + 'px',
		    '-moz-transform-origin' : params.transformOrigin,
		    '-webkit-transform-origin' : params.transformOrigin,
		    'transform' : 'rotate(-' + rot + 'deg)',
		    '-moz-transform' : 'rotate(-' + rot + 'deg)', /* Firefox 4 */
		    '-webkit-transform' : 'rotate(-' + rot + 'deg)', /* Safari and Chrome */
		    '-o-transform' : 'rotate(-' + rot + 'deg)',
		    'background-color' : '#' + color,
		    '-webkit-transition' : 'all ' + ease + 's ' + params.timing,
		    '-moz-transition' : 'all ' + ease + 's ' + params.timing,
		    '-o-transition' : 'all ' + ease + 's ' + params.timing,
		    'transition' : 'all ' + ease + 's ' + params.timing
		});
		$(el).attr('right', '0');
	    },
	    wobbleRight : function(el) {
		var rot = params.rotation;
		var ease = params.ease;				
		var width = params.width;
		var height = params.height;
		var margin = params.margin;
		if(params.randomizeAll > 0) {
		    rot = methods.randomize(rot, params.randomizeAll);
		    ease = methods.randomize(ease, params.randomizeAll);
		    width = methods.randomize(width, params.randomizeAll);
		    height = methods.randomize(height, params.randomizeAll);
		//margin = methods.randomize(margin, params.randomizeAll);
		}
		var color = methods.generateColor();
		$(el).css({
		    'width' : width + 'px',
		    'height' : height + 'px',
		    'margin' : margin + 'px',
		    '-moz-transform-origin' : params.transformOrigin,
		    '-webkit-transform-origin' : params.transformOrigin,
		    'transform' : 'rotate(' + rot + 'deg)',
		    '-moz-transform' : 'rotate(' + rot + 'deg)', /* Firefox 4 */
		    '-webkit-transform' : 'rotate(' + rot + 'deg)', /* Safari and Chrome */
		    '-o-transform' : 'rotate(' + rot + 'deg)',
		    'background-color' : '#' + color,
		    '-webkit-transition' : 'all ' + ease + 's ' + params.timing,
		    '-moz-transition' : 'all ' + ease + 's ' + params.timing,
		    '-o-transition' : 'all ' + ease + 's ' + params.timing,
		    'transition' : 'all ' + ease + 's ' + params.timing
		});
		$(el).attr('right', '1');
	    },
	    delayedRight : function(el) {
		var del = (params.randomizeAll > 0) ? methods.randomize(params.delay, params.randomizeAll) : params.delay;
		setTimeout(methods.wobbleRight, params.delay, el);
	    },
	    delayedLeft : function(el) {
		setTimeout(methods.wobbleLeft, params.delay, el);
	    },
	    randomize : function(x, y) {
		var rand = (x * 0.8 * Math.random()) * (y / 100);
		return ((Math.random() > 5) ? x + rand : x - rand);
	    },
	    wobble : function() {
		methods.addDivs();
		$('.wobbly_div').unbind();
		//unbind all events
		$('.wobbly_div').each(function(el) {
		    $(this).bind('transitionend', function(e) {
			if($(this).attr('right') == 1) {
			    methods.delayedLeft(this);
			} else {
			    methods.delayedRight(this);
			}
		    });

		    $(this).bind('webkitTransitionEnd', function(e) {
			if($(this).attr('right') == 1) {
			    methods.delayedLeft(this);
			} else {
			    methods.delayedRight(this);
			}
		    });

		    $(this).bind('oTransitionEnd', function(e) {
			if($(this).attr('right') == 1) {
			    methods.delayedLeft(this);
			} else {
			    methods.delayedRight(this);
			}
		    });
		    methods.delayedRight(this);
		});
	    },
	    bounce : function() {
		methods.addDivs();
		$('.wobbly_div').unbind();
		var ease = params.ease;
		if(params.randomizeAll > 0) {
		    ease = methods.randomize(ease, params.randomizeAll);
		}
		//unbind all events
		$('.wobbly_div').each(function(el) {
		    $(this).css({
			'-webkit-transition' : 'all ' + ease + 's ' + params.timing,
			'-moz-transition' : 'all ' + ease + 's ' + params.timing,
			'-o-transition' : 'all ' + ease + 's ' + params.timing,
			'transition' : 'all ' + ease + 's ' + params.timing,
			'margin' : params.margin + 'px',
			'width' : params.width + 'px',
			'height' : params.height + 'px'
		    })

		    $(this).bind('bounceend', function(e) {
			if($(this).attr('bounce') == 1) {
			    methods.bounceUp(this);
			} else {
			    methods.bounceDown(this);
			}
		    });

		    $(this).bind('webkitTransitionEnd', function(e) {
			if($(this).attr('bounce') == 1) {
			    methods.bounceUp(this);
			} else {
			    methods.bounceDown(this);
			}
		    });

		    $(this).bind('oTransitionEnd', function(e) {
			if($(this).attr('bounce') == 1) {
			    methods.bounceUp(this);
			} else {
			    methods.bounceDown(this);
			}
		    });
		    methods.bounceUp(this);
		});
	    //methods.startBounce(this);
	    },
	    bounceUp : function(el) {
		$(el).attr('bounce', '0');
		var w = parseInt(params.width) + params.width * 0.25;
		var h = parseInt(params.height) + params.height * 0.25;
		$(el).css({
		    'width' : w + 'px',
		    'height' : h + 'px',
		    '-webkit-box-shadow' : '15px 15px 15px 5px rgba(55, 55, 55, 0.7)',
		    '-moz-box-shadow' : '15px 15px 15px 5px rgba(55, 55, 55, 0.7)',
		    'box-shadow' : '15px 15px 15px 5px rgba(55, 55, 55, 0.7)'
		});
		setTimeout(methods.triggerBounceEnd, 900, el);
	    },
	    bounceDown : function(el) {
		$(el).attr('bounce', '1');
		$(el).css({
		    'width' : params.width + 'px',
		    'height' : params.height + 'px',
		    '-webkit-box-shadow' : '1px 1px 1px 1px rgba(22, 22, 22, 1)',
		    '-moz-box-shadow' : '1px 1px 1px 1px rgba(22, 22, 22, 1)',
		    'box-shadow' : '1px 1px 1px 1px rgba(22, 22, 22, 1)'
		});
		setTimeout(methods.triggerBounceEnd, 900, el);
	    },
	    triggerBounceEnd : function(el) {
		$(el).trigger('bounceend');
	    },
	    move : function() {
		methods.addDivs();
		$('.wobbly_div').unbind();
		//unbind all events
		$('.wobbly_div').each(function(el) {
		    $(this).bind('transitionend', function(e) {
			methods.doMove(this);
		    });

		    $(this).bind('webkitTransitionEnd', function(e) {
			methods.doMove(this);
		    });

		    $(this).bind('oTransitionEnd', function(e) {
			methods.doMove(this);
		    });
		    methods.delayedRight(this);
		});
	    },
	    doMove : function(el) {
		$(el).css({
		    'width' : params.width + 'px',
		    'height' : params.height + 'px',
		    'margin' : params.margin + 'px',
		    '-webkit-transition' : 'all ' + params.ease + 's ' + params.timing,
		    '-moz-transition' : 'all ' + params.ease + 's ' + params.timing,
		    '-o-transition' : 'all ' + params.ease + 's ' + params.timing,
		    'transition' : 'all ' + params.ease + 's ' + params.timing,
		    '-moz-transform' : 'translate('+params.moveX+'px,'+params.moveY+'px)'
		});
	    }
	};

	if(params.method === 'wobble') {
	    methods.wobble();
	} else if(params.method === 'bounce') {
	    methods.bounce();
	} else if(params.method === 'move') {
	    methods.move();
	}
	return this;
    };
})(jQuery);