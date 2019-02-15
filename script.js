(function() {
  //document.documentElement.scrollTop
  var scrollTop,
      backToTopButton = document.getElementById('back-to-top');

  function scrolling(elFrom, elTo) {
    scrollTop = elTo.offsetTop;
    function scrollToEl(){
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
    elFrom.addEventListener('click', function(e) {
      console.log(scrollTop)
      e.preventDefault();
      scrollToEl();
    });
    elFrom.addEventListener('keydown', function(e) {
      if (e.key === 14) {
        scrollToEl();
      }
    });
  }
  scrolling(backToTopButton, document.documentElement);

  var toggleBackToTop = function() {
    scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= 500) {
      backToTopButton.classList.remove('hidden');
      return;
    }
    backToTopButton.classList.add('hidden');
  }
  window.addEventListener('scroll', toggleBackToTop);


  var loadWords = function(options) {
    var xhr = new XMLHttpRequest(),
        data,
        letters = [];

    // element selectors
    var wordsContainer = options.wordsContainer,
        wordsLinksContainer = options.wordsLinksContainer;

    // load data
    xhr.responseType = 'text';
    xhr.open('GET', 'words.json', true);
    xhr.onload = function() {
      if (xhr.status === 200){
        data = JSON.parse(xhr.responseText);
        init();
      }
    } // xhr.onload
    xhr.send();

    function init() {
      // set letters array
      for (var l in data) {
        letters.push(l);
      }

      // create elements
      for (var letter in data) {
        var letterArray = data[letter]; // array of words in the letter
        var numberOfWords = letterArray.length;

        // DOM format
        var format = {
          link: '<li class="d-inline-block"><a class="letters-link h3 text-body font-weight-bold text-uppercase" href="#'+letter+'">'+letter+'</a></li>',
          wordSection: '<div id="'+letter+'" class="words-section col-12 pt-3 mt-3 border-top border-secondary w-100"><div class="row no-gutters"><h2 class="words-heading col-3 text-uppercase font-weight-bold">'+letter+'</h2><ul class="words-list col-9 list-unstyled"></ul></div></div>',
          word: function(word) {
            return '<li><a href="#" class="word text-body">'+word+'</a></li>';
          }
        }

        // set up letters links
        document.querySelector(wordsLinksContainer).innerHTML += format.link;

        // set up the containers
        document.querySelector(wordsContainer).innerHTML += format.wordSection;

        for (i = 0; i < numberOfWords; i++) {
          var word = letterArray[i].word;
          var def = letterArray[i].definition;

          document.querySelector('#'+letter+' .words-list').innerHTML += format.word(word);

        }
      }
    } // init


  } // loadWords

  // generate html from json data
  loadWords({
    wordsContainer: '#words-container',
    wordsLinksContainer: '#letters-container'
  });


}());




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