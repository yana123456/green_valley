$(document).ready(function () {
  var $window = $(window);
  var $body = $('body');
  var $photo = $('#gallery__photo');
  var $preview = $('#gallery__preview');

  /**
   * Plugin for linking multiple owl instances
   * @version 1.0.0
   * @author David Deutsch
   * @license The MIT License (MIT)
   */
  ;
  (function ($, window, document, undefined) {
    /**
     * Creates the Linked plugin.
     * @class The Linked Plugin
     * @param {Owl} carousel - The Owl Carousel
     */
    var Linked = function (carousel) {
      /**
       * Reference to the core.
       * @protected
       * @type {Owl}
       */
      this._core = carousel;

      /**
       * All event handlers.
       * @protected
       * @type {Object}
       */
      this._handlers = {
        'dragged.owl.carousel changed.owl.carousel': $.proxy(function (e) {
          if (e.namespace && this._core.settings.linked) {
            this.update(e);
          }
        }, this),
        'linked.to.owl.carousel': $.proxy(function (e, index, speed, standard, propagate) {
          if (e.namespace && this._core.settings.linked) {
            this.toSlide(index, speed, propagate);
          }
        }, this)
      };

      // register event handlers
      this._core.$element.on(this._handlers);

      // set default options
      this._core.options = $.extend({}, Linked.Defaults, this._core.options);
    };

    /**
     * Default options.
     * @public
     */
    Linked.Defaults = {
      linked: false
    };

    /**
     * Updated linked instances
     */
    Linked.prototype.update = function (e) {
      this.toSlide(e.relatedTarget.relative(e.item.index));
    };

    /**
     * Carry out the to.owl.carousel proxy function
     * @param {int} index
     * @param {int} speed
     * @param {bool} propagate
     */
    Linked.prototype.toSlide = function (index, speed, propagate) {
      var id = this._core.$element.attr('id'),
        linked = this._core.settings.linked.split(',');

      if (typeof propagate == 'undefined') {
        propagate = true;
      }

      index = index || 0;

      if (propagate) {
        $.each(linked, function (i, el) {
          $(el).trigger('linked.to.owl.carousel', [index, 300, true, false]);
        });
      } else {
        this._core.$element.trigger('to.owl.carousel', [index, 300, true]);

        if (this._core.settings.current) {
          this._core._plugins.current.switchTo(index);
        }
      }
    };

    /**
     * Destroys the plugin.
     * @protected
     */
    Linked.prototype.destroy = function () {
      var handler, property;

      for (handler in this._handlers) {
        this.$element.off(handler, this._handlers[handler]);
      }
      for (property in Object.getOwnPropertyNames(this)) {
        typeof this[property] != 'function' && (this[property] = null);
      }
    };

    $.fn.owlCarouselLinked.Constructor.Plugins.linked = Linked;

  })(window.Zepto || window.jQuery, window, document);


  $photo.owlCarouselLinked({
    items: 1,
    nav: false,
    loop: true,
    center: true,
    startPosition: 3,
    smartSpeed: 500,
    dots: false,
    linked: "#gallery__preview"
  });

  $preview.owlCarouselLinked({
    items: 6,
    startPosition: 3,
    smartSpeed: 500,
    loop: true,
    center: true,
    dots: false,
    linked: "#gallery__photo"
  }).on('initialized.owl.carousel linked.to.owl.carousel', function () {
    $preview.find('.owl-item.current').removeClass('current');
    var current = $preview.find('.owl-item.active.center').length ? $preview.find('.owl-item.active.center') : $preview.find('.owl-item.active').eq(0);
    current.addClass('current');
  });

  newAttr();

  $preview.on('refreshed.owl.carousel', function () {
    setTimeout(newAttr, 1000);
  });

  // Cобытие при переключении превью
  $preview.find('.owl-item').on('click', function () {
    var $position = $(this).data('item');
    $photo.trigger('to.owl.carousel', $position % 7 + 1);
  });

  $photo.on('click', function () {
    $(this).trigger('next.owl.carousel');
  });

  function newAttr(){
    $preview.find('.owl-item').each(function (i) {
      //$(this).data("item", i);
      $(this).attr("data-item", i );
    });
  }
});