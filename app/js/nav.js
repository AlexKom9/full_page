;
var Nav = function() {
	return {
		init: function() {
			PubSub.subscribe('gotoSlide', function(msg, data) {
				// console.log(data)
				$('.pagination__item').removeClass('pagination__item--active');
				$('.pagination__item').removeClass('pagination__item--even--active');
				// console.log(data.to)
				if ((data.to % 2) == 0) {
					$('.pagination__item').addClass('pagination__item--even');
					$(`.pagination__item[data-gotoslide="${data.to}"]`).addClass('pagination__item--even--active');
				} else {
					$('.pagination__item').removeClass('pagination__item--even');
					$(`.pagination__item[data-gotoslide="${data.to}"]`).addClass('pagination__item--active');
				}
			});
		}
	}
}