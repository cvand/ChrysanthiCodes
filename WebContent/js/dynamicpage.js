$(function() {

	if (Modernizr.history) {

		var newHash = "", 
		$mainContent = $("#content"), 
		$pageWrap = $("#content-wrapper"),
		$navBar = $("#navbar"),
		baseHeight = 0, $el;

		$pageWrap.height($pageWrap.height());
		baseHeight = $pageWrap.height() - $mainContent.height();

		$("nav").delegate("a.dynamic", "click", function() {
			_link = $(this).attr("href");
			history.pushState(null, null, _link);

			loadContent(_link);

			var active = $navBar.find("li.active");
			active.removeClass('active');
			var new_active = $(this).parent();
			new_active.addClass('active');
			
//			var dropdown = $("#navbar-dropdown");
//			if (dropdown.is(":visible")) {
//				dropdown.dropdown('toggle');
//			}

			return false;
		});

		function loadContent(href) {
			$mainContent.find("#content-main").fadeOut(200, function() {
				$mainContent.hide().load(href + " #content-main", function() {
					$mainContent.fadeIn(200, function() {
						$pageWrap.animate({height : baseHeight + $mainContent.height() + "px"});
					});
					console.log(href);
				}).css("display", "block");
			});
		}

		$(window).bind('popstate', function(event) {
			var hash = location.hash;
			if ( hash == '') {
				_link = location.pathname.replace(/^.*[\\\/]/, ''); // get filename only
				loadContent(_link);
				
				var old = $navBar.find("li.active");
				old.removeClass('active');
				var new_nav = $navBar.find('a[href="' + _link + '"]').parent();
				new_nav.addClass('active');
				
			} else {
//				hash = hash.split("#")[1];
				var old = $mainContent.find("li.active");
				old.removeClass('active');
				var new_nav = $mainContent.find('a[href="' + hash + '"]').parent();
				new_nav.addClass('active');
			}
		});

	} // otherwise, history is not supported, so nothing fancy here.

});