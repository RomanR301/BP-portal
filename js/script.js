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
        // this.$body.addClass('active')
        } else {
            this.hamburger.removeClass('open');
            this.nav.toggleClass('active');
            // this.$body.removeClass('active')
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
  }
};


jQuery(function () {
  front.init();
});

// $(window).scroll(function () {
//   if ($(this).scrollTop() > 10) {
//     $('.scroll-to-top').addClass("scrolled");
//   } else {
//   	$('.scroll-to-top').removeClass("scrolled");
//   }
// });

document.body.addEventListener('keyup', function(e) {
  if (e.which === 9) /* tab */ {
    document.body.classList.remove('no-focus-outline');
  }
});


// HIDE MENU ON BODY CLICK

// $('html').click(function(e) {
//     var a = e.target;
//     if ($(a).parents('.menu-item-has-child').length === 0) {
//       $('.menu-item-has-child').removeClass('show'); //hide menu item
//    }
//   });

$(document).ready(function() {
	
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
   
    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button, .edit-profile-image-btn").on('click', function() {
       $(".file-upload").click();
    });

    $('a.btn[href^="#"]').on('click',function (e) {
	    e.preventDefault();
	    var target = this.hash;
	    var $target = $(target);
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900);
    });
    $('.menu-item-has-child a').on('click', function(e) {
        e.preventDefault();
    })


   
    $('#edit-profile-save').attr('disabled', true); 
    $('.edit-page-filled #edit-profile-save').attr('disabled', false); 
    $('.edit-page input, .edit-page textarea, .edit-page select').on('change', (event) => {
        event.preventDefault();
        $('#edit-profile-save').attr('disabled', false);
    });
    

    $('.input-file').change(function() {
        var filepath = this.value;
        var m = filepath.match(/([^\/\\]+)$/);
        var filename = m[1];
        $(this).parent().parent().find('.filename').html(filename);
    });
});


