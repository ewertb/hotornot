angular
		.module('hotornot')
		.directive('owl', function($rootScope, $timeout) {

		var linker = function ( scope, element, attr) {

			$timeout(function () {

                scope.owl = element.owlCarousel({items:1,center:true,loop:true}).data();

                scope.current = scope.owl['owl.carousel']._current;

            }, 250);

			scope.previous = function previous() {

				scope.owl['owl.carousel'].prev(250);

				scope.current = scope.owl['owl.carousel']._current;

			};

			scope.next = function next() {

				scope.owl['owl.carousel'].next(250);

				scope.current = scope.owl['owl.carousel']._current;

			};

		};


		return {
			restrict: 'A',
			transclude: false,
			scope : true,
			link: linker
		};
	});