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
  }

};


jQuery(function () {
  front.init();
  let i = 1;
  $(document).on('click', '.add-funding', function (e) {
    e.preventDefault()
    i++
    let formElement = `
        <div class="row form-disbursement">
      <div class="col-md-4 col-xs-12">
        <label for="funding-request-amount-requested-${i}">Amount Requested<span>*</span></label>
        <div class="form-group">
          <input type="text" name="funding-request-amount-requested-${i}" id="funding-request-amount-requested-${i}"
            required>
        </div>
      </div>
      <div class="col-md-8 col-xs-12">
        <label for="funding-request-description-${i}">Description <small>(maximum 100 characters)</small></label>
        <div class="form-group">
          <input type="text" name="funding-request-description-${i}" id="funding-request-description-${i}" maxlength="100">
        </div>
      </div>
      <div class="col-xs-12 d-flex align-items-center">
        <div class="upload">
          <input id="upload-${i}" type="file" name="upload-${i}">
          <label for="upload-${i}" data-input-value="">
          </label>
          <span class="remove"></span>
        </div>
        <span class="upload-helper">(i.e. invoice)</span>
      </div>
    </div>`
    $(formElement).insertBefore('.funding-request-add')
  });
  $(document).on('change', '.upload input', function(){
    let name = this.files[0].name;
    $(this).next('label').attr('data-input-value', name).addClass('active');
    $(this).parent().parent().find('.upload-helper').hide()
  })
  $(document).on('click', '.remove', function (e) {
    $(this).parent().find('input').val('');
    $(this).prev('label').attr('data-value-name', '').removeClass('active');
    $(this).parent().parent().find('.upload-helper').show()
  })
});



