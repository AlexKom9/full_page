;
var App = function (){
	return {
		init: function(){
			Paginator().init();
			Nav().init();
		}
	}
};

App().init();