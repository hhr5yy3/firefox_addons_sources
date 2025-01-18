/* global YT */
angular.module('feed')
  .directive('muzliVideo', ['$http', '$rootScope', '$timeout', '$state', function ($http, $rootScope, $timeout, $state) {

    return {
      restrict: 'EA',
      templateUrl: 'modules/feed/video.drv.html',
      link: function ($scope, element) {

        $scope.item.playing = false;

        var $window = $(window)
        var container = element.parents('li');
        var videoContainer = $('.video-container');
        var isLiveFeed = !!element.parents('.live').length;

        //Use global debounce function to limit checks once per 100ms
        $scope.trackScrollDistance = debounce(function(e) {

            var videoOutOfBounds = (container.offset().top - $window.scrollTop() - 65) < 0

            if (videoOutOfBounds) {
              $scope.popVideo();
            }
        }, 100)

        $scope.getTileDimensions = function() {
          return {
            top: container.offset().top,
            left: container.offset().left,
            width: container.width(),
            height: container.height(),
          }
        }

        $scope.popVideo = function() {

          videoContainer.addClass('pop');
          videoContainer.css({
            top: '',
            left: '',
            width: '',
            height: '',
          })

          $scope.isPopup = true;
          $window.off("wheel scroll", $scope.trackScrollDistance);
          videoContainer.removeClass('no-padding');
        }

        $scope.imageClicked = function ($event) {

          $event.preventDefault();
          $event.stopPropagation();
          
          $state.go($state.current.name + '.videos', {
            item: $scope.item,
          })

          //Log video click
          $http.put(window.MUZLI_APP + '/click', {
            id: $scope.item.id,
            link: $scope.item.link,
            source: $scope.item.source.name ? $scope.item.source.name : $scope.item.source,
            referer: 'Extension video'
          })

        };

        $scope.$on("$destroy", function() {
          if ($scope.item.playing && !$scope.isPopup) {
            $scope.popVideo()
          }
        })

        if ($scope.item.vimeo && !$scope.item.thumbnail) {

          if (!$scope.item.image) {
            $http.get('https://vimeo.com/api/v2/video/' + $scope.item.videoId + '.json', {
              skipAuth: true
            }).then(function (res) {
              $scope.item.thumbnail = res.data[0].thumbnail_large;
            }).catch(function(){
              element.parents('.postPhoto').addClass('image-error');
            })
          } else {
            $scope.item.thumbnail = $scope.item.image;
          }
        }

        if ($scope.item.htmlVideo) {
          $scope.item.thumbnail = $scope.item.image;
        }

      }
    }
  }]);
