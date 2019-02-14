(function() {
  var loadWords = function(options) {
    var xhr = new XMLHttpRequest(),
        data,
        letters = [];

    // load data
    xhr.responseType = 'text';
    xhr.open('get', 'words.json', true);
    xhr.onload = function() {
      if (xhr.status === 200){
        data = JSON.parse(xhr.responseText);
        init();
      }
    } // xhr.onload
    xhr.send();

    function init() {
      // set letters array
      for (var letter in data) {
        letters.push(letter);
      }
      console.log(letters);
    } // init

  } // loadWords

  loadWords();
}());


















(function() {

  var myFunc = function(options) {
    var xhr = new XMLHttpRequest(),
        data,
        word,
        definition,
        alphabet = [],

        // element selectors
        lettersList = options.lettersList,
        lettersListItems = options.lettersListItems,
        lettersListLinks = options.lettersListLinks,
        wordsListsContainer = options.wordsListsContainer,
        $wordsSection,
        wordsSectionClass = options.wordsSectionClass,
        $wordsHeading,
        wordsHeadingClass = options.wordsHeadingClass,
        $wordsList,
        wordsListClass = options.wordsListClass,
        wordLinkClass = options.wordLinkClass,
        wordsColumnClass = options.wordsColumnClass;
        
    xhr.responseType = 'text';
    xhr.open('get', 'words.json', true);
    xhr.send();

    xhr.onload = function() {
      if (xhr.status === 200){
        data = JSON.parse(xhr.responseText);

        // create array of letters for retrieving its index
        for (var letter in data) {
          alphabet.push(letter);
        }
        
        // loop through all letters
        for (i = 0; i < alphabet.length; i++) {
          var letter = alphabet[i],
              letterArray = data[letter];
          
          $wordsSection = $('<div></div>').attr({
            id: letter,
            class: wordsSectionClass
          });

          if (letterArray.length > 0) {
            $wordsSection
              .appendTo(wordsListsContainer)
              .append('<h2 class="'+wordsHeadingClass+'">'+letter+'</h2><ul class="'+wordsListClass+'"></ul>');
          } else {
            console.log(letter+' is empty');
          }
          
          // loop through all words for each letter
          for (j = 0; j < letterArray.length; j++) {
            
            word = letterArray[j].word;
            definition = letterArray[j].definition;
            $wordsList =  $('#'+letter+' .'+wordsListClass);
            
            $wordsList.append('<li><a href="#" class="'+wordLinkClass+'">'+word+'</a></li>');
            addColumns();
          }
        }
      }
    };

    function addColumns() {
      $('.'+wordsListClass).each(function() {
        if ($(this).children().length > 3) {
          $(this).addClass(wordsColumnClass);
        }
      });
    }
  
  };/* 
  $(document).ready(function() {
    // TODO: change function name..
    myFunc({
      lettersList: '.letters-list',
      lettersListItems: '',
      lettersListLinks: '.letters-link',
      wordsListsContainer: '.words-container',   // using
      wordsSectionClass: 'words-section',        // using
      wordsHeadingClass: 'words-heading',        // using
      wordsListClass: 'words-list',              // using
      wordLinkClass: 'word',                     // using
      wordsColumnClass: 'columns'                // using
    });
  });  */

}());













/**
 * ScrollTo js, copy + pasted
 * TODO: Combine with tooltip js
 * 
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
		$('#top').fadeIn();
		} else {
			$('#top').fadeOut();
		}
	});
	$('#top').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});
  */
	
var backToTop = {
  setup: function () {
    // values can be set in Chameleon, but we don't trust Chameleon...
    var fadeSpeed = (typeof backToTopFadeSpeed == 'undefined') ? 'slow' : backToTopFadeSpeed;
    var scrollSpeed = (typeof backToTopScrollSpeed == 'undefined') ? 'slow' : backToTopScrollSpeed;
    var trigger = (typeof backToTopTrigger == 'undefined') ? 400 : backToTopTrigger;


    $(window).on('scroll.isScroll', function () {
      if ($(this).scrollTop() >= trigger) {
          $('#back-to-top').fadeIn(fadeSpeed);
      }
      else {
          $('#back-to-top').fadeOut(fadeSpeed);
      }
    });

    $('#back-to-top').on('click', function () {
        $('body, html').animate({ scrollTop: 0 }, scrollSpeed);
    });
  }
}
var scrollMenu = {
  setup: function (menu, scrollSpeed) {
      scrollSpeed = scrollSpeed || 'slow';
      $(menu).on('click', function (e) {
        var scrollElement = $($(this).attr('data-href')).offset().top;
        // console.log(scrollElement)
        scrollMenu.scroll(scrollElement, scrollSpeed);
      });
  },
  scroll: function (scroll, scrollSpeed) {
      $('body, html').animate({ scrollTop: scroll }, scrollSpeed);
  }
}

/* $(document).ready(function(e) {
  //scrollMenu.setup('.alphabetlist span');
  //backToTop.setup();
}); */



/* Old: Tooltips

var holiday_tooltip17 = (function(option) {
  var self = this,
      proto = holiday_tooltip17.prototype,
  
      $this,    
      titleValue,
      tooltipTarget = option.tooltipTarget,
      toolTip = option.toolTip,
      tooltipText = $(toolTip).find('p');
  
  
  function tooltipMouseenter($this) {
    // todo: make this code better for the love of god
      
    titleValue = $this.attr('title');
    $this.removeAttr('title'); // remove title so it doesn't show up on hover
    $(tooltipText).text(titleValue);
    
    var paddingHeight = $(toolTip).css('paddingTop').replace('px','') * 2;
    var paddingWidth = $(toolTip).css('paddingLeft').replace('px','') * 2;
    var width = $(toolTip).width() + paddingWidth;
    var height = $(toolTip).height() + paddingHeight + 30;
    
    
    $this.mousemove(function(cursorPosition) {
      var $left = width/2;
      var $top = height;
      $(toolTip).css({ 
        left: (cursorPosition.pageX - $left), 
        top: (cursorPosition.pageY - $top)
      });
    });
    setTimeout(function () { $(toolTip).show(); }, 100); // give time to calc position before showing
    
    
  };
  
  function tooltipMouseout($this) {
    $this.attr('title', titleValue);
    $(toolTip).hide();
  };

  function showTooltips() {
    $(tooltipTarget)
      .mouseover(function() {
        $this = $(this);
        tooltipMouseenter($this);
      })
      .mouseout(function() {

        tooltipMouseout($this);
      })
  }
  function showTooltips2() {
    $(tooltipTarget).hover(
      function() {
        // mouseenter
        $this = $(this);
        tooltipMouseenter($this);
      },
      function() {
        // mouseout
        tooltipMouseout($this);
      }
    );
  };
  proto.setup = function() {
    showTooltips();
  };
  return {
    setup: self.setup
  };
});

$(document).ready(function() {
  var holiday_tooltip2017 = new holiday_tooltip17({
    tooltipTarget: '.tooltip_map_area',
    toolTip: '.title_tag'
  });
  // holiday_tooltip2017.setup();
});

*/