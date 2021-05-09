let front = {
  hamburger: $('.hamburger'),
  nav: $('.navbar'),
  $body: $('body'),
  subMenuTrigger: $('.sub-menu'),
  subMenu: $('.menu-item-has-child'),
  init: function () {
      this.events();
      
      $( "#datepicker" ).datepicker({
        dateFormat: "dd-MM-yy"
    });
  },
  toggleNav: function () {
    if (!this.hamburger.hasClass('open')) {
        this.hamburger.addClass('open');
        this.nav.toggleClass('active');
        } else {
            this.hamburger.removeClass('open');
            this.nav.toggleClass('active');
        }
    },
    toggleLogin: function () {
        if (!this.subMenu.hasClass('open')) {
            this.subMenu.addClass('open');
            this.subMenu.toggleClass('active');
            } else {
                this.subMenu.removeClass('open');
                this.subMenu.toggleClass('active');
            }
        },
  openTab: function (element, tabName, parent) {
      let i, tab_content, tab_links;

      tab_content = $(element).closest(parent).find('.tab-content');

      for (i = 0; i < tab_content.length; i++) {
          tab_content[i].style.display = "none";
      }

      tab_links = $(element).closest('.tabs-ul').find('.tab-links');

      for (i = 0; i < tab_links.length; i++) {
          tab_links[i].className = tab_links[i].className.replace(" active", "");
      }

      document.getElementById(tabName).style.display = "block";
      $(element).addClass('active');
  },

  events: function () {
      let self = this;
      $(document).on('click', '.hamburger', function () {
          self.toggleNav();
      });
      $(document).on('click', '.menu-item-has-child', function () {
          let $this = $(this);
          $this.find('.sub-menu').toggleClass('active');
          if ($('.sub-menu').hasClass('active')) {
                $('.sub-menu').removeClass('active');
                $this.find('.sub-menu').addClass('active');
          } else {
              null;
          }
      });
   
      // Get all triggers
      const checkAll = document.querySelectorAll('[data-checkall-trigger]');
      
      // Check / Uncheck all matching checkboxes
      function toggleCheckboxGroup (checked, checkboxGroup) {
        let matchingCheckboxes = document.querySelectorAll('[data-checkall-group="'+ checkboxGroup +'"]');
        matchingCheckboxes.forEach(function(el){
          if (checked !== el.checked) {
            el.checked = !el.checked; 
          }
        });
      };
      
      // Get all checkboxes of a group
      checkAll.forEach(function(el){
        el.addEventListener('change', function(){
          let checkboxGroup = el.dataset.checkallTrigger;
          let checked = el.checked ? true : false;
          toggleCheckboxGroup(checked, checkboxGroup); 
        });
      });

  },
  addFields: function() {
    // for (let i = 0;i++;){
    //     return i
    // }
    // console.log(i)
    let formElement = `
    <div class="row form-disbursement">
    <div class="col-md-4 col-xs-12">
      <label for="funding-request-amount-requested">Amount Requested<span>*</span></label>
      <div class="form-group">
        <input type="text" name="funding-request-amount-requested_1" id="funding-request-amount-requested_1"
          required>
      </div>
    </div>
    <div class="col-md-8 col-xs-12">
      <label for="funding-request-description">Description <small>(maximum 100 characters)</small></label>
      <div class="form-group">
        <input type="text" name="funding-request-description-1" id="funding-request-description-1" maxlength="100">
      </div>
    </div>
    <div class="col-xs-12 d-flex align-items-center">
      <div class="upload">
        <input id="upload_2" type="file" name="upload_2" class="empty">
        <label for="upload_2" data-input-value="" data-select-text="Select file" data-remove-text="Remove file"
          data-drag-text="Upload Attachment">
        </label>
      </div>
      <span class="upload-helper">(i.e. invoice)</span>
    </div>
  </div>
  `
    $(formElement).insertBefore('.funding-request-add')
}

};


jQuery(function () {
  front.init();
});
$(document).ready(function(){
    // $('.upload input[type=file]').each(function () {
    //     var eventNamespace = '.upload';
    //     var labelInputValueAttr = 'data-input-value';
    //     var $input = $(this);
    //     var $inputClone = $input.clone(true,true);
    //     $inputClone.removeClass('empty');
    //     var $label = $input.next('label');
    //     var setLabelInputValue = function () {
    //         var $input = $(this);
    //         if($input.val() && $input.val() !== ''){
    //         $input.removeClass('empty');
    //         $label.attr(labelInputValueAttr, $input.val().split('\\').pop());
    //         } else {
    //         $label.attr(labelInputValueAttr, '');
    //         $input.addClass('empty');
    //         }
    //     }
    //     if(!$input.val() || $input.val() === ''){
    //         $input.addClass('empty');
    //     }
    //     $label.attr(labelInputValueAttr,'');
    //     $input.on('change' + eventNamespace, setLabelInputValue);
    //     $label.on('click' + eventNamespace, function (event) {
    //         if($input.val() && $input.val() !== '' && $input.is(':valid')){
    //         event.preventDefault();
    //         $input.remove();
    //         $label.before($inputClone); // cant just empty val because of ie
    //         $input = $inputClone;
    //         if(!$input.val() || $input.val() === ''){
    //             $input.addClass('empty');
    //         }
    //         $inputClone = $input.clone(true,true);
    //         $inputClone.removeClass('empty');
    //         $input.off('change' + eventNamespace);
    //         $input.on('change' + eventNamespace, setLabelInputValue);
    //         $label.attr(labelInputValueAttr,'');
    //         }
    //     });
    // });
  });


  $(function() {
    $('.upload input[type=file]').each(function () {
        var eventNamespace = '.upload';
        var labelInputValueAttr = 'data-input-value';
        var $input = $(this);
        var $inputClone = $input.clone(true,true);
        $inputClone.removeClass('empty');
        var $label = $input.next('label');
        var setLabelInputValue = function () {
            var $input = $(this);
            if($input.val() && $input.val() !== ''){
            $input.removeClass('empty');
            $label.attr(labelInputValueAttr, $input.val().split('\\').pop());
            } else {
            $label.attr(labelInputValueAttr, '');
            $input.addClass('empty');
            }
        }
        if(!$input.val() || $input.val() === ''){
            $input.addClass('empty');
        }
        $label.attr(labelInputValueAttr,'');
        $input.on('change' + eventNamespace, setLabelInputValue);
        $label.on('click' + eventNamespace, function (event) {
            if($input.val() && $input.val() !== '' && $input.is(':valid')){
            event.preventDefault();
            $input.remove();
            $label.before($inputClone); // cant just empty val because of ie
            $input = $inputClone;
            if(!$input.val() || $input.val() === ''){
                $input.addClass('empty');
            }
            $inputClone = $input.clone(true,true);
            $inputClone.removeClass('empty');
            $input.off('change' + eventNamespace);
            $input.on('change' + eventNamespace, setLabelInputValue);
            $label.attr(labelInputValueAttr,'');
            }
        });
    })
    front.addFields();

   });