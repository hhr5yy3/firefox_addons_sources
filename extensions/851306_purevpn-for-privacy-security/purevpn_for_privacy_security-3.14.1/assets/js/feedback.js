/*
*   PureVPN
*   by GZ systems Ltd.
* Everyone is permitted to copy and distribute verbatim copies
* of this document, but changing it is not allowed.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
* copyright 2017 All Rights are Reserved.
*/

(function() {
  'use strict';
  document.getElementById("feedbackButtonSubmit2")
    .addEventListener('click', function() {
      var onSet = function() {
        window.close();
      };
      chrome.runtime.sendMessage({
        what: 'Feedback_MakeUsHappyCTA'
      }, onSet);
    });
  var rating = "";
  var feedbackButtonSubmit = document.getElementById(
    'feedbackButtonSubmit');

  var feedbackText = document.getElementById(
    'feedbackText');

  var textAreaShowHide = function() {
    rating = this.value;
    var wrapField = document.getElementsByClassName("wrapField");
    var i = 0;
    if (rating <= 3) {
      for (i = 0; i < wrapField.length; i++) {
        wrapField[i].style.display = 'inline-block';
      }
      feedbackButtonSubmit.setAttribute('disabled', 'disabled');
    } else {
      for (i = 0; i < wrapField.length; i++) {
        wrapField[i].style.display = 'none';
      }
      resetAll();
    }
  };

  /**
   * Make fields value null
   * @return {void}
   */
  function resetAll() {
    feedbackButtonSubmit.removeAttribute('disabled');
    feedbackText.value = "";
    feedbackText.classList.remove("valid");
    var characterCount = document.getElementsByClassName("character_count");

    for (var i = 0; i < characterCount.length; i++) {
      characterCount[i].innerHTML = "0";
    }
  }

  var x = document.querySelectorAll(
    ".starsRating input[type=radio]");
  for (var i = 0; i < x.length; i++) {
    x[i].addEventListener('change', textAreaShowHide);
  }

  var requiredCharLengthText = 10;
  showCharCount('feedbackText', requiredCharLengthText);

  var showError = function(e, characterRequired) {
    var feedBackTextVal = document.getElementById(
      'feedbackText').value;

    var errorElement = e.parentNode.firstChild.parentNode.children[1];
    var textVal = e.value.replace(/\s+/g, " ").trim().length;
    if (textVal < characterRequired) {
      errorElement.classList.add('showMinLengthError');
      feedbackButtonSubmit.setAttribute('disabled', 'disabled');
    } else {
      errorElement.classList.remove('showMinLengthError');
      if (feedBackTextVal !== "" &&
        feedBackTextVal.length >= requiredCharLengthText) {
        feedbackButtonSubmit.removeAttribute('disabled');
      }
    }
  };

  /**
   * Make fields value null
   * @param {object} ele element
   * @param {int} reqChar required character
   * @return {void}
   */
  function showCharCount(ele, reqChar) {
    ele = document.getElementById(
      ele);
    ele.addEventListener("keyup", function() {
      var textVal = this.value.replace(/\s+/g, " ").trim().length;
      var textCount = this.parentNode.firstChild.parentNode.children[2];
      textCount.innerHTML = textVal;

      showError(this, reqChar);
    });
  }

  feedbackButtonSubmit.addEventListener('click', function() {
    var feedBackTextVal = document.getElementById(
      'feedbackText').value;

    if (feedBackTextVal !== "") {
      feedBackTextVal = feedBackTextVal.replace(/\s+/g, " ").trim();
    }
    var oFields = {};
    if (feedBackTextVal === "") {
      oFields = {feedbackRating: rating};
    } else {
      oFields = {
        feedbackRating: rating,
        feedbackDescription: feedBackTextVal
      };
    }
    var feedBackContentChromeStore = document.getElementById(
      'feedBackContentChromeStore');
    var feedBackContent = document.getElementById(
      'feedBackContent');
    var feedBackThanks = document.getElementById(
      'feedBackThanks');
    // if user made change from console
    if (rating === 0 || rating === "" || typeof rating === "undefined") {
      return;
    } else if (rating <= 3) {
      feedBackThanks.style.display = 'block';
      feedBackContentChromeStore.style.display = 'none';
      feedBackContent.style.display = 'none';
      setTimeout(function() {
        window.close();
      }, 5000);
    } else {
      feedBackContentChromeStore.style.display = 'block';
      feedBackContent.style.display = 'none';
      feedBackThanks.style.display = 'none';
    }
    chrome.runtime.sendMessage({what: 'ProxyExtension_Feedback',
      submitData: oFields});
  });
})();
