(function(root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define([], function() {
			return factory();
		});
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require());
	} else {
		root.progress = factory();
	}
})(this, function() {
	'use strict';
	var progress = (function() {
		var settings = {};
		var id, backgroundColor, position, height, text, color, timeOut;
		var init = function(id, options) {
			settings.status = options.startWidth || 0; //maintains the current width of the progress bar
			settings.started = options.started || false; // boolean check if progress bar is started
			settings.steps = options.steps - 1 || 1; // specifies the number of steps or number of ajax calls 
			settings.lastPosition = options.lastPosition || 75; // the last position where the progress bar will be stuck if ajax is not responding
			id = id; //id where the progress bar will be appended
			backgroundColor = options.backgroundColor || '#b91f1f';
			position = options.position || 'fixed';
			height = options.height || '20px';
			text = options.text || 'Searching for buses';
			color = options.color || '#fff';
		};

		var template = function() {
			var elem = document.createElement('div');
			elem.id = 'loadingbar';
			//elem.className = 'slider';
			var textSpan = document.createElement('span');
			textSpan.id = 'loadingText';
			var text = document.createTextNode(this.text);
			textSpan.appendChild(text);
			elem.appendChild(textSpan);
			return elem;
		};

		var start = function(val) {
			if (timeOut) {
				clearInterval(timeOut);
			}
			if (!settings.started) {
				settings.status = 50;
				settings.initialStart = val;
				settings.remaining = settings.lastPosition - settings.initialStart;
				settings.perStepCount = parseInt((settings.remaining / settings.steps), 10);
				var loader = template();
				loader.style.height = this.height;
				loader.style.lineHeight = this.height;
				loader.style.background = this.backgroundColor;
				if (document.getElementById(id)) {
					loader.style.position = position;
					document.getElementById(id).appendChild(loader);
				} else {
					document.getElementsByTagName('body')[0].appendChild(loader);
				}
				settings.started = true;
				set(val);
			}
		};
		var set = function() {
			if (timeOut) {
				clearInterval(timeOut);
			}
			if (settings.started) {
				if (val < 100) {
					settings.status = val;
					document.getElementById('loadingbar').style.width = val + '%';

					if (val <= 100) {
						this.inc();
					}
				} else {
					this.done();
				}
			}
		};

		var done = function() {
			if (timeOut) {
				clearInterval(timeOut);
			}
			document.getElementById('loadingbar').style.width = 100 + '%';
			var timeOutDone = setTimeout(function() {
				document.getElementById('loadingbar').className += ' closed';
				clearTimeout(timeOutDone);
			}, 1500);
			settings.status = 0;
			settings.started = false;
		};

		var inc = function() {
			var statusNo = parseInt(settings.status, 10);
			var nextStatus = statusNo + settings.perStepCount;
			timeOut = setInterval(function() {
				if (statusNo < nextStatus && statusNo < settings.lastPosition) {
					statusNo = statusNo + 1;

					settings.status = parseInt(statusNo, 10);

					document.getElementById('loadingbar').style.width = statusNo + '%';
				}


			}, 50);
		};

		var next = function() {
			settings.initialStart = settings.initialStart + settings.perStepCount;
			set(settings.initialStart);
		};

		var setText = function(text) {
			document.getElementById('loadingText').innerText = text;
		}

		return {
			init: init,
			start: start,
			done: done
		};

	})();

	return progress;
});