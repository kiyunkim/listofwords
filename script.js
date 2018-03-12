$('.words-list').each(function() {
  if ($(this).children().length > 3) {
    $(this).addClass('columns');
  }
});


var xhr = new XMLHttpRequest();
xhr.responseType = 'text';
xhr.open('get', 'words.json', true);
xhr.send();

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var list,
    word,
    definition;
  
  function log(log) {
    console.log(log);
  }
  
xhr.onload = function() {
  if (xhr.status === 200){
    list = JSON.parse(xhr.responseText);
    log(list)

    //log(alphabet[0])
    log(Object.keys(list)[0])

    for (l = 0; l < Object.keys(list).length; l++) {
      var letter = Object.keys(list)[l];
      log(typeof(letter))
      log(typeof(list.a));
      for (i = 0; i < list.letter.length; i++) {
        console.log(list.letter[i].word+': '+list.letter[i].definition)
      }
    }

    
    
  }
}











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







/**
 * ScrollTo js, copy + pasted
 * TODO: Combine with tooltip js
 */




/*
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

$(document).ready(function(e) {
  //scrollMenu.setup('.alphabetlist span');
  //backToTop.setup();
});