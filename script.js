/*jslint browser:true */
$(document).ready(function () {
	var $body = $('body');
	var $navbar = $('.navbar-default');
	var $offsetY = $navbar.offset().top + 10;
	var $menuButton = $('button.navbar-toggle');
	var $menuIcon = $('.navbar-toggle .glyphicon');
	var $collapsedMenuItem = $('.navbar-collapse.collapse li');
	var $modalBackdropDiv = $('<div class="modal-backdrop fade in"></div>');
	var $scrollButton = $('.scroll');
	var $socialIcon = $('.social');

	// Fixed Nav after scroll
	function scroll() {
		if ($(window).scrollTop() >= $offsetY) {
			$navbar.addClass('menu-fixed').css('background-color', 'rgba(255,254,253,0.97)');
		} else {
			$navbar.removeClass('menu-fixed').css('background-color', 'transparent');
		}
	}
	document.onscroll = scroll;

	// Mobile Menu functions
	function openMenu() {
		$menuIcon.removeClass('glyphicon-menu-hamburger').addClass('glyphicon-remove active');
		$modalBackdropDiv.css('z-index', 900);
		$body.append($modalBackdropDiv);
		if (!$navbar.hasClass('menu-fixed')) {
			$navbar.css('background-color', 'rgba(255,254,253,0.97)');
		}
		// Close menu after clicking modal-backdrop
		$modalBackdropDiv.on('click', function () {
			$('.navbar-toggle').click();
			closeMenu();
		});
	}
	function closeMenu() {
		$menuIcon.removeClass('glyphicon-remove active').addClass('glyphicon-menu-hamburger');
		$modalBackdropDiv.css('z-index', 1025).remove();
		if (!$navbar.hasClass('menu-fixed')) {
			$navbar.css('background-color', 'transparent');
		}
	}
	// Mobile Menu Icon Toggle
	$menuButton.on('click', function () {
		if ($menuIcon.hasClass('glyphicon-menu-hamburger')) {
			openMenu();
			// Close menu after clicking a link
			$collapsedMenuItem.on('click', function () {
				$('.navbar-toggle').click(); // Trigger collapse animation
				closeMenu();
			});
		} else {
			closeMenu();
		}
	});
	// Collapse menu on resize
	$(window).resize(closeMenu());

	// Smooth scroll to content
	$scrollButton.on('click', function (e) {
		e.preventDefault();
		var $link = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $($link).offset().top - 60
		}, 900);
	});

	// Social icons hover effect
	$socialIcon.on({
		'focus mouseenter': function () {
			var $iconImg = $(this).children();
			var $href = $iconImg.attr('src').slice(0, -18) + 'color.png?raw=true'; // Remove 'black.svg' from end and add 'color.svg'
			$iconImg.attr('src', $href);
		},
		'blur mouseleave': function () {
			var $iconImg = $(this).children();
			var $href = $iconImg.attr('src').slice(0, -18) + 'black.png?raw=true';
			$iconImg.attr('src', $href);
		}
	});

	// Center modals vertically
	function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find('.modal-dialog');
    var $offset = ($(window).height() - $dialog.height()) / 2;
    var $bottomMargin = parseInt($dialog.css('margin-bottom'), 10);

    // If modal is taller than screen height, top margin = bottom margin
    if ($offset < $bottomMargin) {
    	$offset = $bottomMargin;
    }
    $dialog.css('margin-top', $offset);
  }

  $(document).on('show.bs.modal', '.modal', centerModal);
  $(window).on('resize', function () {
    $('.modal:visible').each(centerModal);
  });
});