(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports, require("jquery"), require("popper.js"))
    : typeof define === "function" && define.amd
    ? define(["exports", "jquery", "popper.js"], factory)
    : ((global = global || self),
      factory((global.bootstrap = {}), global.jQuery, global.Popper));
})(this, function(exports, $, Popper) {
  "use strict";
  $ = $ && $.hasOwnProperty("default") ? $["default"] : $;
  Popper =
    Popper && Popper.hasOwnProperty("default") ? Popper["default"] : Popper;
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys = ownKeys.concat(
          Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          })
        );
      }
      ownKeys.forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var TRANSITION_END = "transitionend";
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000;
  function toType(obj) {
    return {}.toString
      .call(obj)
      .match(/\s([a-z]+)/i)[1]
      .toLowerCase();
  }
  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments);
        }
        return undefined;
      }
    };
  }
  function transitionEndEmulator(duration) {
    var _this = this;
    var called = false;
    $(this).one(Util.TRANSITION_END, function() {
      called = true;
    });
    setTimeout(function() {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }
  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  var Util = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function getUID(prefix) {
      do {
        prefix += ~~(Math.random() * MAX_UID);
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute("data-target");
      if (!selector || selector === "#") {
        var hrefAttr = element.getAttribute("href");
        selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : "";
      }
      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(
      element
    ) {
      if (!element) {
        return 0;
      }
      var transitionDuration = $(element).css("transition-duration");
      var transitionDelay = $(element).css("transition-delay");
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay);
      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      }
      transitionDuration = transitionDuration.split(",")[0];
      transitionDelay = transitionDelay.split(",")[0];
      return (
        (parseFloat(transitionDuration) + parseFloat(transitionDelay)) *
        MILLISECONDS_MULTIPLIER
      );
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(
      componentName,
      config,
      configTypes
    ) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType =
            value && Util.isElement(value) ? "element" : toType(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(
              componentName.toUpperCase() +
                ": " +
                ('Option "' +
                  property +
                  '" provided type "' +
                  valueType +
                  '" ') +
                ('but expected type "' + expectedTypes + '".')
            );
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      }
      if (typeof element.getRootNode === "function") {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }
      if (element instanceof ShadowRoot) {
        return element;
      }
      if (!element.parentNode) {
        return null;
      }
      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();
  //?inject start
  //*
  var NAME$2 = 'carousel'
var VERSION$2 = '4.3.1'
var DATA_KEY$2 = 'bs.carousel'
var EVENT_KEY$2 = '.' + DATA_KEY$2
var DATA_API_KEY$2 = '.data-api'
var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2]
var ARROW_LEFT_KEYCODE = 37
var ARROW_RIGHT_KEYCODE = 39
var TOUCHEVENT_COMPAT_WAIT = 500
var SWIPE_THRESHOLD = 40
var Default = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
}
var DefaultType = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  slide: '(boolean|string)',
  pause: '(string|boolean)',
  wrap: 'boolean',
  touch: 'boolean'
}
var Direction = {
  NEXT: 'next',
  PREV: 'prev',
  LEFT: 'left',
  RIGHT: 'right'
}
var Event$2 = {
  SLIDE: 'slide' + EVENT_KEY$2,
  SLID: 'slid' + EVENT_KEY$2,
  KEYDOWN: 'keydown' + EVENT_KEY$2,
  MOUSEENTER: 'mouseenter' + EVENT_KEY$2,
  MOUSELEAVE: 'mouseleave' + EVENT_KEY$2,
  TOUCHSTART: 'touchstart' + EVENT_KEY$2,
  TOUCHMOVE: 'touchmove' + EVENT_KEY$2,
  TOUCHEND: 'touchend' + EVENT_KEY$2,
  POINTERDOWN: 'pointerdown' + EVENT_KEY$2,
  POINTERUP: 'pointerup' + EVENT_KEY$2,
  DRAG_START: 'dragstart' + EVENT_KEY$2,
  LOAD_DATA_API: 'load' + EVENT_KEY$2 + DATA_API_KEY$2,
  CLICK_DATA_API: 'click' + EVENT_KEY$2 + DATA_API_KEY$2
}
var ClassName$2 = {
  CAROUSEL: 'carousel',
  ACTIVE: 'active',
  SLIDE: 'slide',
  RIGHT: 'carousel-item-right',
  LEFT: 'carousel-item-left',
  NEXT: 'carousel-item-next',
  PREV: 'carousel-item-prev',
  ITEM: 'carousel-item',
  POINTER_EVENT: 'pointer-event'
}
var Selector$2 = {
  ACTIVE: '.active',
  ACTIVE_ITEM: '.active.carousel-item',
  ITEM: '.carousel-item',
  ITEM_IMG: '.carousel-item img',
  NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
  INDICATORS: '.carousel-indicators',
  DATA_SLIDE: '[data-slide], [data-slide-to]',
  DATA_RIDE: '[data-ride="carousel"]'
}
var PointerType = {
  TOUCH: 'touch',
  PEN: 'pen'
}
var Carousel =
  (function() {
    function Carousel(element, config) {
      this._items = null
      this._interval = null
      this._activeElement = null
      this._isPaused = false
      this._isSliding = false
      this.touchTimeout = null
      this.touchStartX = 0
      this.touchDeltaX = 0
      this._config = this._getConfig(config)
      this._element = element
      this._indicatorsElement = this._element.querySelector(
        Selector$2.INDICATORS
      )
      this._touchSupported =
        'ontouchstart' in document.documentElement ||
        navigator.maxTouchPoints > 0
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent)
      this._addEventListeners()
    }
    var _proto = Carousel.prototype
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT)
      }
    }
    _proto.nextWhenVisible = function nextWhenVisible() {
      if (
        !document.hidden &&
        $(this._element).is(':visible') &&
        $(this._element).css('visibility') !== 'hidden'
      ) {
        this.next()
      }
    }
    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV)
      }
    }
    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true
      }
      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element)
        this.cycle(true)
      }
      clearInterval(this._interval)
      this._interval = null
    }
    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false
      }
      if (this._interval) {
        clearInterval(this._interval)
        this._interval = null
      }
      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval(
          (document.visibilityState ? this.nextWhenVisible : this.next).bind(
            this
          ),
          this._config.interval
        )
      }
    }
    _proto.to = function to(index) {
      var _this = this
      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM)
      var activeIndex = this._getItemIndex(this._activeElement)
      if (index > this._items.length - 1 || index < 0) {
        return
      }
      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, function() {
          return _this.to(index)
        })
        return
      }
      if (activeIndex === index) {
        this.pause()
        this.cycle()
        return
      }
      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV
      this._slide(direction, this._items[index])
    }
    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2)
      $.removeData(this._element, DATA_KEY$2)
      this._items = null
      this._config = null
      this._element = null
      this._interval = null
      this._isPaused = null
      this._isSliding = null
      this._activeElement = null
      this._indicatorsElement = null
    }
    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config)
      Util.typeCheckConfig(NAME$2, config, DefaultType)
      return config
    }
    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX)
      if (absDeltax <= SWIPE_THRESHOLD) {
        return
      }
      var direction = absDeltax / this.touchDeltaX // swipe left
      if (direction > 0) {
        this.prev()
      } // swipe right
      if (direction < 0) {
        this.next()
      }
    }
    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this
      if (this._config.keyboard) {
        $(this._element).on(Event$2.KEYDOWN, function(event) {
          return _this2._keydown(event)
        })
      }
      if (this._config.pause === 'hover') {
        $(this._element)
          .on(Event$2.MOUSEENTER, function(event) {
            return _this2.pause(event)
          })
          .on(Event$2.MOUSELEAVE, function(event) {
            return _this2.cycle(event)
          })
      }
      if (this._config.touch) {
        this._addTouchEventListeners()
      }
    }
    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this
      if (!this._touchSupported) {
        return
      }
      var start = function start(event) {
        if (
          _this3._pointerEvent &&
          PointerType[event.originalEvent.pointerType.toUpperCase()]
        ) {
          _this3.touchStartX = event.originalEvent.clientX
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX
        }
      }
      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (
          event.originalEvent.touches &&
          event.originalEvent.touches.length > 1
        ) {
          _this3.touchDeltaX = 0
        } else {
          _this3.touchDeltaX =
            event.originalEvent.touches[0].clientX - _this3.touchStartX
        }
      }
      var end = function end(event) {
        if (
          _this3._pointerEvent &&
          PointerType[event.originalEvent.pointerType.toUpperCase()]
        ) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX
        }
        _this3._handleSwipe()
        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          _this3.pause()
          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout)
          }
          _this3.touchTimeout = setTimeout(function(event) {
            return _this3.cycle(event)
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval)
        }
      }
      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(
        Event$2.DRAG_START,
        function(e) {
          return e.preventDefault()
        }
      )
      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, function(event) {
          return start(event)
        })
        $(this._element).on(Event$2.POINTERUP, function(event) {
          return end(event)
        })
        this._element.classList.add(ClassName$2.POINTER_EVENT)
      } else {
        $(this._element).on(Event$2.TOUCHSTART, function(event) {
          return start(event)
        })
        $(this._element).on(Event$2.TOUCHMOVE, function(event) {
          return move(event)
        })
        $(this._element).on(Event$2.TOUCHEND, function(event) {
          return end(event)
        })
      }
    }
    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return
      }
      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault()
          this.prev()
          break
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault()
          this.next()
          break
        default:
      }
    }
    _proto._getItemIndex = function _getItemIndex(element) {
      this._items =
        element && element.parentNode
          ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM))
          : []
      return this._items.indexOf(element)
    }
    _proto._getItemByDirection = function _getItemByDirection(
      direction,
      activeElement
    ) {
      var isNextDirection = direction === Direction.NEXT
      var isPrevDirection = direction === Direction.PREV
      var activeIndex = this._getItemIndex(activeElement)
      var lastItemIndex = this._items.length - 1
      var isGoingToWrap =
        (isPrevDirection && activeIndex === 0) ||
        (isNextDirection && activeIndex === lastItemIndex)
      if (isGoingToWrap && !this._config.wrap) {
        return activeElement
      }
      var delta = direction === Direction.PREV ? -1 : 1
      var itemIndex = (activeIndex + delta) % this._items.length
      return itemIndex === -1
        ? this._items[this._items.length - 1]
        : this._items[itemIndex]
    }
    _proto._triggerSlideEvent = function _triggerSlideEvent(
      relatedTarget,
      eventDirectionName
    ) {
      var targetIndex = this._getItemIndex(relatedTarget)
      var fromIndex = this._getItemIndex(
        this._element.querySelector(Selector$2.ACTIVE_ITEM)
      )
      var slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      })
      $(this._element).trigger(slideEvent)
      return slideEvent
    }
    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(
      element
    ) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(
          this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE)
        )
        $(indicators).removeClass(ClassName$2.ACTIVE)
        var nextIndicator = this._indicatorsElement.children[
          this._getItemIndex(element)
        ]
        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE)
        }
      }
    }
    _proto._slide = function _slide(direction, element) {
      var _this4 = this
      var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM)
      var activeElementIndex = this._getItemIndex(activeElement)
      var nextElement =
        element ||
        (activeElement && this._getItemByDirection(direction, activeElement))
      var nextElementIndex = this._getItemIndex(nextElement)
      var isCycling = Boolean(this._interval)
      var directionalClassName
      var orderClassName
      var eventDirectionName
      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT
        orderClassName = ClassName$2.NEXT
        eventDirectionName = Direction.LEFT
      } else {
        directionalClassName = ClassName$2.RIGHT
        orderClassName = ClassName$2.PREV
        eventDirectionName = Direction.RIGHT
      }
      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false
        return
      }
      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName)
      if (slideEvent.isDefaultPrevented()) {
        return
      }
      if (!activeElement || !nextElement) {
        return
      }
      this._isSliding = true
      if (isCycling) {
        this.pause()
      }
      this._setActiveIndicatorElement(nextElement)
      var slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      })
      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName)
        Util.reflow(nextElement)
        $(activeElement).addClass(directionalClassName)
        $(nextElement).addClass(directionalClassName)
        var nextElementInterval = parseInt(
          nextElement.getAttribute('data-interval'),
          10
        )
        if (nextElementInterval) {
          this._config.defaultInterval =
            this._config.defaultInterval || this._config.interval
          this._config.interval = nextElementInterval
        } else {
          this._config.interval =
            this._config.defaultInterval || this._config.interval
        }
        var transitionDuration = Util.getTransitionDurationFromElement(
          activeElement
        )
        $(activeElement)
          .one(Util.TRANSITION_END, function() {
            $(nextElement)
              .removeClass(directionalClassName + ' ' + orderClassName)
              .addClass(ClassName$2.ACTIVE)
            $(activeElement).removeClass(
              ClassName$2.ACTIVE +
                ' ' +
                orderClassName +
                ' ' +
                directionalClassName
            )
            _this4._isSliding = false
            setTimeout(function() {
              return $(_this4._element).trigger(slidEvent)
            }, 0)
          })
          .emulateTransitionEnd(transitionDuration)
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE)
        $(nextElement).addClass(ClassName$2.ACTIVE)
        this._isSliding = false
        $(this._element).trigger(slidEvent)
      }
      if (isCycling) {
        this.cycle()
      }
    }
    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var data = $(this).data(DATA_KEY$2)
        var _config = _objectSpread({}, Default, $(this).data())
        if (typeof config === 'object') {
          _config = _objectSpread({}, _config, config)
        }
        var action = typeof config === 'string' ? config : _config.slide
        if (!data) {
          data = new Carousel(this, _config)
          $(this).data(DATA_KEY$2, data)
        }
        if (typeof config === 'number') {
          data.to(config)
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError('No method named "' + action + '"')
          }
          data[action]()
        } else if (_config.interval && _config.ride) {
          data.pause()
          data.cycle()
        }
      })
    }
    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this)
      if (!selector) {
        return
      }
      var target = $(selector)[0]
      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return
      }
      var config = _objectSpread({}, $(target).data(), $(this).data())
      var slideIndex = this.getAttribute('data-slide-to')
      if (slideIndex) {
        config.interval = false
      }
      Carousel._jQueryInterface.call($(target), config)
      if (slideIndex) {
        $(target)
          .data(DATA_KEY$2)
          .to(slideIndex)
      }
      event.preventDefault()
    }
    _createClass(Carousel, null, [
      {
        key: 'VERSION',
        get: function get() {
          return VERSION$2
        }
      },
      {
        key: 'Default',
        get: function get() {
          return Default
        }
      }
    ])
    return Carousel
  })()
$(document).on(
  Event$2.CLICK_DATA_API,
  Selector$2.DATA_SLIDE,
  Carousel._dataApiClickHandler
)
$(window).on(Event$2.LOAD_DATA_API, function() {
  var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE))
  for (var i = 0, len = carousels.length; i < len; i++) {
    var $carousel = $(carousels[i])
    Carousel._jQueryInterface.call($carousel, $carousel.data())
  }
})
$.fn[NAME$2] = Carousel._jQueryInterface
$.fn[NAME$2].Constructor = Carousel
$.fn[NAME$2].noConflict = function() {
  $.fn[NAME$2] = JQUERY_NO_CONFLICT$2
  return Carousel._jQueryInterface
}

  var NAME$3 = "collapse";
  var VERSION$3 = "4.3.1";
  var DATA_KEY$3 = "bs.collapse";
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = ".data-api";
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ""
  };
  var DefaultType$1 = {
    toggle: "boolean",
    parent: "(string|element)"
  };
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    SHOW: "show",
    COLLAPSE: "collapse",
    COLLAPSING: "collapsing",
    COLLAPSED: "collapsed"
  };
  var Dimension = {
    WIDTH: "width",
    HEIGHT: "height"
  };
  var Selector$3 = {
    ACTIVES: ".show, .collapsing",
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };
  var Collapse = (function() {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(
        document.querySelectorAll(
          '[data-toggle="collapse"][href="#' +
            element.id +
            '"],' +
            ('[data-toggle="collapse"][data-target="#' + element.id + '"]')
        )
      );
      var toggleList = [].slice.call(
        document.querySelectorAll(Selector$3.DATA_TOGGLE)
      );
      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice
          .call(document.querySelectorAll(selector))
          .filter(function(foundElem) {
            return foundElem === element;
          });
        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;
          this._triggerArray.push(elem);
        }
      }
      this._parent = this._config.parent ? this._getParent() : null;
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }
    var _proto = Collapse.prototype;
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };
    _proto.show = function show() {
      var _this = this;
      if (
        this._isTransitioning ||
        $(this._element).hasClass(ClassName$3.SHOW)
      ) {
        return;
      }
      var actives;
      var activesData;
      if (this._parent) {
        actives = [].slice
          .call(this._parent.querySelectorAll(Selector$3.ACTIVES))
          .filter(function(elem) {
            if (typeof _this._config.parent === "string") {
              return elem.getAttribute("data-parent") === _this._config.parent;
            }
            return elem.classList.contains(ClassName$3.COLLAPSE);
          });
        if (actives.length === 0) {
          actives = null;
        }
      }
      if (actives) {
        activesData = $(actives)
          .not(this._selector)
          .data(DATA_KEY$3);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }
      var startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }
      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), "hide");
        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }
      var dimension = this._getDimension();
      $(this._element)
        .removeClass(ClassName$3.COLLAPSE)
        .addClass(ClassName$3.COLLAPSING);
      this._element.style[dimension] = 0;
      if (this._triggerArray.length) {
        $(this._triggerArray)
          .removeClass(ClassName$3.COLLAPSED)
          .attr("aria-expanded", true);
      }
      this.setTransitioning(true);
      var complete = function complete() {
        $(_this._element)
          .removeClass(ClassName$3.COLLAPSING)
          .addClass(ClassName$3.COLLAPSE)
          .addClass(ClassName$3.SHOW);
        _this._element.style[dimension] = "";
        _this.setTransitioning(false);
        $(_this._element).trigger(Event$3.SHOWN);
      };
      var capitalizedDimension =
        dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(
        this._element
      );
      $(this._element)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };
    _proto.hide = function hide() {
      var _this2 = this;
      if (
        this._isTransitioning ||
        !$(this._element).hasClass(ClassName$3.SHOW)
      ) {
        return;
      }
      var startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }
      var dimension = this._getDimension();
      this._element.style[dimension] =
        this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element)
        .addClass(ClassName$3.COLLAPSING)
        .removeClass(ClassName$3.COLLAPSE)
        .removeClass(ClassName$3.SHOW);
      var triggerArrayLength = this._triggerArray.length;
      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);
          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));
            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger)
                .addClass(ClassName$3.COLLAPSED)
                .attr("aria-expanded", false);
            }
          }
        }
      }
      this.setTransitioning(true);
      var complete = function complete() {
        _this2.setTransitioning(false);
        $(_this2._element)
          .removeClass(ClassName$3.COLLAPSING)
          .addClass(ClassName$3.COLLAPSE)
          .trigger(Event$3.HIDDEN);
      };
      this._element.style[dimension] = "";
      var transitionDuration = Util.getTransitionDurationFromElement(
        this._element
      );
      $(this._element)
        .one(Util.TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration);
    };
    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };
    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };
    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$1, config);
      config.toggle = Boolean(config.toggle);
      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };
    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };
    _proto._getParent = function _getParent() {
      var _this3 = this;
      var parent;
      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent;
        if (typeof this._config.parent.jquery !== "undefined") {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }
      var selector =
        '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function(i, element) {
        _this3._addAriaAndCollapsedClass(
          Collapse._getTargetFromElement(element),
          [element]
        );
      });
      return parent;
    };
    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(
      element,
      triggerArray
    ) {
      var isOpen = $(element).hasClass(ClassName$3.SHOW);
      if (triggerArray.length) {
        $(triggerArray)
          .toggleClass(ClassName$3.COLLAPSED, !isOpen)
          .attr("aria-expanded", isOpen);
      }
    };
    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };
    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);
        var _config = _objectSpread(
          {},
          Default$1,
          $this.data(),
          typeof config === "object" && config ? config : {}
        );
        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }
        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };
    _createClass(Collapse, null, [
      {
        key: "VERSION",
        get: function get() {
          return VERSION$3;
        }
      },
      {
        key: "Default",
        get: function get() {
          return Default$1;
        }
      }
    ]);
    return Collapse;
  })();
  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function(
    event
  ) {
    if (event.currentTarget.tagName === "A") {
      event.preventDefault();
    }
    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function() {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? "toggle" : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });
  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;
  $.fn[NAME$3].noConflict = function() {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };
  var NAME$4 = "dropdown";
  var VERSION$4 = "4.3.1";
  var DATA_KEY$4 = "bs.dropdown";
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = ".data-api";
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27;
  var SPACE_KEYCODE = 32;
  var TAB_KEYCODE = 9;
  var ARROW_UP_KEYCODE = 38;
  var ARROW_DOWN_KEYCODE = 40;
  var RIGHT_MOUSE_BUTTON_WHICH = 3;
  var REGEXP_KEYDOWN = new RegExp(
    ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE
  );
  var Event$4 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var ClassName$4 = {
    DISABLED: "disabled",
    SHOW: "show",
    DROPUP: "dropup",
    DROPRIGHT: "dropright",
    DROPLEFT: "dropleft",
    MENURIGHT: "dropdown-menu-right",
    MENULEFT: "dropdown-menu-left",
    POSITION_STATIC: "position-static"
  };
  var Selector$4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: ".dropdown form",
    MENU: ".dropdown-menu",
    NAVBAR_NAV: ".navbar-nav",
    VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
  };
  var AttachmentMap = {
    TOP: "top-start",
    TOPEND: "top-end",
    BOTTOM: "bottom-start",
    BOTTOMEND: "bottom-end",
    RIGHT: "right-start",
    RIGHTEND: "right-end",
    LEFT: "left-start",
    LEFTEND: "left-end"
  };
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: "scrollParent",
    reference: "toggle",
    display: "dynamic"
  };
  var DefaultType$2 = {
    offset: "(number|string|function)",
    flip: "boolean",
    boundary: "(string|element)",
    reference: "(string|element)",
    display: "string"
  };
  var Dropdown = (function() {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();
      this._addEventListeners();
    }
    var _proto = Dropdown.prototype;
    _proto.toggle = function toggle() {
      if (
        this._element.disabled ||
        $(this._element).hasClass(ClassName$4.DISABLED)
      ) {
        return;
      }
      var parent = Dropdown._getParentFromElement(this._element);
      var isActive = $(this._menu).hasClass(ClassName$4.SHOW);
      Dropdown._clearMenus();
      if (isActive) {
        return;
      }
      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);
      $(parent).trigger(showEvent);
      if (showEvent.isDefaultPrevented()) {
        return;
      }
      if (!this._inNavbar) {
        if (typeof Popper === "undefined") {
          throw new TypeError(
            "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
          );
        }
        var referenceElement = this._element;
        if (this._config.reference === "parent") {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference;
          if (typeof this._config.reference.jquery !== "undefined") {
            referenceElement = this._config.reference[0];
          }
        }
        if (this._config.boundary !== "scrollParent") {
          $(parent).addClass(ClassName$4.POSITION_STATIC);
        }
        this._popper = new Popper(
          referenceElement,
          this._menu,
          this._getPopperConfig()
        );
      }
      if (
        "ontouchstart" in document.documentElement &&
        $(parent).closest(Selector$4.NAVBAR_NAV).length === 0
      ) {
        $(document.body)
          .children()
          .on("mouseover", null, $.noop);
      }
      this._element.focus();
      this._element.setAttribute("aria-expanded", true);
      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent)
        .toggleClass(ClassName$4.SHOW)
        .trigger($.Event(Event$4.SHOWN, relatedTarget));
    };
    _proto.show = function show() {
      if (
        this._element.disabled ||
        $(this._element).hasClass(ClassName$4.DISABLED) ||
        $(this._menu).hasClass(ClassName$4.SHOW)
      ) {
        return;
      }
      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);
      var parent = Dropdown._getParentFromElement(this._element);
      $(parent).trigger(showEvent);
      if (showEvent.isDefaultPrevented()) {
        return;
      }
      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent)
        .toggleClass(ClassName$4.SHOW)
        .trigger($.Event(Event$4.SHOWN, relatedTarget));
    };
    _proto.hide = function hide() {
      if (
        this._element.disabled ||
        $(this._element).hasClass(ClassName$4.DISABLED) ||
        !$(this._menu).hasClass(ClassName$4.SHOW)
      ) {
        return;
      }
      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
      var parent = Dropdown._getParentFromElement(this._element);
      $(parent).trigger(hideEvent);
      if (hideEvent.isDefaultPrevented()) {
        return;
      }
      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent)
        .toggleClass(ClassName$4.SHOW)
        .trigger($.Event(Event$4.HIDDEN, relatedTarget));
    };
    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$4);
      $(this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;
      if (this._popper !== null) {
        this._popper.destroy();
        this._popper = null;
      }
    };
    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    };
    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;
      $(this._element).on(Event$4.CLICK, function(event) {
        event.preventDefault();
        event.stopPropagation();
        _this.toggle();
      });
    };
    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread(
        {},
        this.constructor.Default,
        $(this._element).data(),
        config
      );
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };
    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);
        if (parent) {
          this._menu = parent.querySelector(Selector$4.MENU);
        }
      }
      return this._menu;
    };
    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM;
      if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
        placement = AttachmentMap.TOP;
        if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }
      return placement;
    };
    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest(".navbar").length > 0;
    };
    _proto._getOffset = function _getOffset() {
      var _this2 = this;
      var offset = {};
      if (typeof this._config.offset === "function") {
        offset.fn = function(data) {
          data.offsets = _objectSpread(
            {},
            data.offsets,
            _this2._config.offset(data.offsets, _this2._element) || {}
          );
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }
      return offset;
    };
    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };
      if (this._config.display === "static") {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }
      return popperConfig;
    };
    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function() {
        var data = $(this).data(DATA_KEY$4);
        var _config = typeof config === "object" ? config : null;
        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY$4, data);
        }
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };
    Dropdown._clearMenus = function _clearMenus(event) {
      if (
        event &&
        (event.which === RIGHT_MOUSE_BUTTON_WHICH ||
          (event.type === "keyup" && event.which !== TAB_KEYCODE))
      ) {
        return;
      }
      var toggles = [].slice.call(
        document.querySelectorAll(Selector$4.DATA_TOGGLE)
      );
      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var context = $(toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };
        if (event && event.type === "click") {
          relatedTarget.clickEvent = event;
        }
        if (!context) {
          continue;
        }
        var dropdownMenu = context._menu;
        if (!$(parent).hasClass(ClassName$4.SHOW)) {
          continue;
        }
        if (
          event &&
          ((event.type === "click" &&
            /input|textarea/i.test(event.target.tagName)) ||
            (event.type === "keyup" && event.which === TAB_KEYCODE)) &&
          $.contains(parent, event.target)
        ) {
          continue;
        }
        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }
        if ("ontouchstart" in document.documentElement) {
          $(document.body)
            .children()
            .off("mouseover", null, $.noop);
        }
        toggles[i].setAttribute("aria-expanded", "false");
        $(dropdownMenu).removeClass(ClassName$4.SHOW);
        $(parent)
          .removeClass(ClassName$4.SHOW)
          .trigger($.Event(Event$4.HIDDEN, relatedTarget));
      }
    };
    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);
      if (selector) {
        parent = document.querySelector(selector);
      }
      return parent || element.parentNode;
    };
    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (
        /input|textarea/i.test(event.target.tagName)
          ? event.which === SPACE_KEYCODE ||
            (event.which !== ESCAPE_KEYCODE &&
              ((event.which !== ARROW_DOWN_KEYCODE &&
                event.which !== ARROW_UP_KEYCODE) ||
                $(event.target).closest(Selector$4.MENU).length))
          : !REGEXP_KEYDOWN.test(event.which)
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
        return;
      }
      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName$4.SHOW);
      if (
        !isActive ||
        (isActive &&
          (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE))
      ) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
          $(toggle).trigger("focus");
        }
        $(this).trigger("click");
        return;
      }
      var items = [].slice.call(
        parent.querySelectorAll(Selector$4.VISIBLE_ITEMS)
      );
      if (items.length === 0) {
        return;
      }
      var index = items.indexOf(event.target);
      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        index--;
      }
      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        index++;
      }
      if (index < 0) {
        index = 0;
      }
      items[index].focus();
    };
    _createClass(Dropdown, null, [
      {
        key: "VERSION",
        get: function get() {
          return VERSION$4;
        }
      },
      {
        key: "Default",
        get: function get() {
          return Default$2;
        }
      },
      {
        key: "DefaultType",
        get: function get() {
          return DefaultType$2;
        }
      }
    ]);
    return Dropdown;
  })();
  $(document)
    .on(
      Event$4.KEYDOWN_DATA_API,
      Selector$4.DATA_TOGGLE,
      Dropdown._dataApiKeydownHandler
    )
    .on(
      Event$4.KEYDOWN_DATA_API,
      Selector$4.MENU,
      Dropdown._dataApiKeydownHandler
    )
    .on(
      Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API,
      Dropdown._clearMenus
    )
    .on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function(event) {
      event.preventDefault();
      event.stopPropagation();
      Dropdown._jQueryInterface.call($(this), "toggle");
    })
    .on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function(e) {
      e.stopPropagation();
    });
  $.fn[NAME$4] = Dropdown._jQueryInterface;
  $.fn[NAME$4].Constructor = Dropdown;
  $.fn[NAME$4].noConflict = function() {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };
  var NAME$9 = 'tab'
  var VERSION$9 = '4.3.1'
  var DATA_KEY$9 = 'bs.tab'
  var EVENT_KEY$9 = '.' + DATA_KEY$9
  var DATA_API_KEY$7 = '.data-api'
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9]
  var Event$9 = {
    HIDE: 'hide' + EVENT_KEY$9,
    HIDDEN: 'hidden' + EVENT_KEY$9,
    SHOW: 'show' + EVENT_KEY$9,
    SHOWN: 'shown' + EVENT_KEY$9,
    CLICK_DATA_API: 'click' + EVENT_KEY$9 + DATA_API_KEY$7
  }
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  }
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE:
      '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  }
  var Tab =
    (function() {
      function Tab(element) {
        this._element = element
      }
      var _proto = Tab.prototype
      _proto.show = function show() {
        var _this = this
        if (
          (this._element.parentNode &&
            this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
            $(this._element).hasClass(ClassName$9.ACTIVE)) ||
          $(this._element).hasClass(ClassName$9.DISABLED)
        ) {
          return
        }
        var target
        var previous
        var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0]
        var selector = Util.getSelectorFromElement(this._element)
        if (listElement) {
          var itemSelector =
            listElement.nodeName === 'UL' || listElement.nodeName === 'OL'
              ? Selector$9.ACTIVE_UL
              : Selector$9.ACTIVE
          previous = $.makeArray($(listElement).find(itemSelector))
          previous = previous[previous.length - 1]
        }
        var hideEvent = $.Event(Event$9.HIDE, {
          relatedTarget: this._element
        })
        var showEvent = $.Event(Event$9.SHOW, {
          relatedTarget: previous
        })
        if (previous) {
          $(previous).trigger(hideEvent)
        }
        $(this._element).trigger(showEvent)
        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return
        }
        if (selector) {
          target = document.querySelector(selector)
        }
        this._activate(this._element, listElement)
        var complete = function complete() {
          var hiddenEvent = $.Event(Event$9.HIDDEN, {
            relatedTarget: _this._element
          })
          var shownEvent = $.Event(Event$9.SHOWN, {
            relatedTarget: previous
          })
          $(previous).trigger(hiddenEvent)
          $(_this._element).trigger(shownEvent)
        }
        if (target) {
          this._activate(target, target.parentNode, complete)
        } else {
          complete()
        }
      }
      _proto.dispose = function dispose() {
        $.removeData(this._element, DATA_KEY$9)
        this._element = null
      }
      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this
        var activeElements =
          container &&
          (container.nodeName === 'UL' || container.nodeName === 'OL')
            ? $(container).find(Selector$9.ACTIVE_UL)
            : $(container).children(Selector$9.ACTIVE)
        var active = activeElements[0]
        var isTransitioning =
          callback && active && $(active).hasClass(ClassName$9.FADE)
        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback)
        }
        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active)
          $(active)
            .removeClass(ClassName$9.SHOW)
            .one(Util.TRANSITION_END, complete)
            .emulateTransitionEnd(transitionDuration)
        } else {
          complete()
        }
      }
      _proto._transitionComplete = function _transitionComplete(
        element,
        active,
        callback
      ) {
        if (active) {
          $(active).removeClass(ClassName$9.ACTIVE)
          var dropdownChild = $(active.parentNode).find(
            Selector$9.DROPDOWN_ACTIVE_CHILD
          )[0]
          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName$9.ACTIVE)
          }
          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false)
          }
        }
        $(element).addClass(ClassName$9.ACTIVE)
        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true)
        }
        Util.reflow(element)
        if (element.classList.contains(ClassName$9.FADE)) {
          element.classList.add(ClassName$9.SHOW)
        }
        if (
          element.parentNode &&
          $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)
        ) {
          var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0]
          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(
              dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE)
            )
            $(dropdownToggleList).addClass(ClassName$9.ACTIVE)
          }
          element.setAttribute('aria-expanded', true)
        }
        if (callback) {
          callback()
        }
      }
      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function() {
          var $this = $(this)
          var data = $this.data(DATA_KEY$9)
          if (!data) {
            data = new Tab(this)
            $this.data(DATA_KEY$9, data)
          }
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError('No method named "' + config + '"')
            }
            data[config]()
          }
        })
      }
      _createClass(Tab, null, [
        {
          key: 'VERSION',
          get: function get() {
            return VERSION$9
          }
        }
      ])
      return Tab
    })()
  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function(event) {
    event.preventDefault()
    Tab._jQueryInterface.call($(this), 'show')
  })
  $.fn[NAME$9] = Tab._jQueryInterface
  $.fn[NAME$9].Constructor = Tab
  $.fn[NAME$9].noConflict = function() {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9
    return Tab._jQueryInterface
  }

  //*
  //!inject end
});
