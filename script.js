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
  holiday_tooltip2017.setup();
});
