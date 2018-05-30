/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.6
 *
 * @license MIT, see http://github.com/asvd/intence
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    factory((root.dragscroll = {}));
  }
}(this, (exports) => {
  const _window = window;
  const _document = document;
  const mousemove = 'mousemove';
  const mouseup = 'mouseup';
  const mousedown = 'mousedown';
  const EventListener = 'EventListener';
  const addEventListener = `add${  EventListener}`;
  const removeEventListener = `remove${  EventListener}`;

  let dragged = [];
  const reset = function (i, el) {
    for (i = 0; i < dragged.length;) {
      el = dragged[i++];
      el = el.container || el;
      el[removeEventListener](mousedown, el.md, 0);
      _window[removeEventListener](mouseup, el.mu, 0);
      _window[removeEventListener](mousemove, el.mm, 0);
    }

    // cloning into array since HTMLCollection is updated dynamically
    dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
    for (i = 0; i < dragged.length;) {
      (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
        (cont = el.container || el)[addEventListener](
          mousedown,
          cont.md = function (e) {
            if (!el.hasAttribute('nochilddrag') ||
              _document.elementFromPoint(
                e.pageX, e.pageY
              ) === cont
            ) {
              pushed = 1;
              lastClientX = e.clientX;
              lastClientY = e.clientY;

              e.preventDefault();
            }
          }, 0
        );

        _window[addEventListener](
          mouseup, cont.mu = function () {
            pushed = 0;
          }, 0
        );

        _window[addEventListener](
          mousemove,
          cont.mm = function (e) {
            if (pushed) {
              (scroller = el.scroller || el).scrollLeft -=
                (-lastClientX + (lastClientX = e.clientX));
              scroller.scrollTop -=
                (-lastClientY + (lastClientY = e.clientY));
            }
          }, 0
        );
      })(dragged[i++]);
    }
  };

  if (_document.readyState === 'complete') {
    reset();
  } else {
    _window[addEventListener]('load', reset, 0);
  }

  exports.reset = reset;
}));
