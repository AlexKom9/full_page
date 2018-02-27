'use strict'

var Paginator = function() {
	var activeSlide = 1;
	$(`.section[data-slide="${activeSlide}"]`).addClass('section--active');
	$(`.pagination__item[data-gotoslide="${activeSlide}"]`).addClass('pagination__item--active');

	var canGo = 1;
	var max = 4;
	var delay = 1500;
	// console.log('Im worked');
	return {
		scrollEvents: function() {
			var self = this;
			$(window).on('wheel', function(e) {
				if (!canGo) return;
				e = e.originalEvent;
				// console.log(e)
				var direction = e.deltaY > 0 ? 1 : -1;

				var newslide = activeSlide + direction;
				if (newslide > max || newslide < 1) return;
				canGo = false;

				PubSub.publish('gotoSlide', { from: activeSlide, to: newslide, dir: direction });
				activeSlide = newslide;
				setTimeout(function() {
					canGo = true;
				}, delay);
			});
		},

		clickEvents: function() {
			var self = this;
			// console.log('Click')
			$('.pagination__item').on('click', function(e) {
				// console.log(canGo, activeSlide)
				// // PubSub.publish('gotoSlide', { from: 1, to: 2 });
				e.preventDefault();
				if (!canGo) return;
				canGo = true;
				var newslide = $(this).data('gotoslide');
				var direction = newslide > activeSlide ? 1: -1; 
				if (newslide !== activeSlide) {
					PubSub.publish('gotoSlide', { from: activeSlide, to: newslide, dir: direction });
					activeSlide = newslide;
					setTimeout(function() {
						canGo = true;
					}, delay);
				}
			});
		},
		init: function() {
			this.scrollEvents();
			this.clickEvents();
		}
	}
};