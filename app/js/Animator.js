
PubSub.subscribe('gotoSlide', function(msg, data) {

	// console.log(msg, data);

	let currentSlide = $('[data-slide=' + data.from + ']');
	let newSlide = $('[data-slide=' + data.to + ']');
	let elements = currentSlide.find('[data-stagger]');
	let newElements = newSlide.find('[data-stagger]');


	let paragraphs = currentSlide.find('p');

	currentSlide.css({ opacity: 1 });
	newSlide.addClass('section--active');
	currentSlide.removeClass('section--active')

	let t1 = new TimelineMax();

	if (data.dir > 0) {

		t1
			.staggerTo(elements, 0.3, { y: -20, opacity: 0 }, 0)
			.to(currentSlide, 1, { y: '-100%', opacity: 1 })
			.fromTo(newSlide, 1, { y: '100%' }, { y: '0%', opacity: 1 }, 0)
			.staggerFromTo(newElements, 0.5, { y: -20, opacity: 0 }, { y: 0, opacity: 1 }, 0.1, '-=1')
	} else {
		t1
			.staggerTo(elements, 0.3, { y: 0, opacity: 0 }, 0)
			.to(currentSlide, 1, { y: '100%', opacity: 1 })
			.fromTo(newSlide, 1, { y: '-100%' }, { y: '0%', opacity: 1 }, 0)
			.staggerFromTo(newElements, 0.3, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 0.1, '-=1')

	}


});