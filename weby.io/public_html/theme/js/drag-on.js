/**
 * jQuery.Drag-On v2.5.2
 * @author Dark Heart aka PretorDH
 * @site dragon.deparadox.com
 * MIT license
 */

$(function () {

	$.fn.extend({
		dragOn: function (opt) {
			return jQuery.DragOn(this, opt);
		}
	});

	$.extend({
		DragOn: function (el, opt) { /* Scroll mechanics */
			var def = {
				exclusion: {'input': '', 'textarea': '', 'select': '', 'object': '', 'iframe': '', 'id': '#gmap,#map-canvas'},
				cursor: 'all-scroll',
				easing: 'true'
			}, $this;

			function onPrevent(E) {
				var e = E || event, et = (e && e.target && (e.target.tagName || e.target.localName || e.target.nodeName).toLowerCase());
				return e && et && (et in $this.opt.exclusion || (e.target.href || $(e.target).parents().attr('href') && (e.stopPropagation && e.stopPropagation(), true)))
					|| (e && e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), false);
			};

			$this = (el = $(el)).DragOn = {
				opt: (function (opt) {
					for (var b in opt) def[b] = opt[b];
					return def;
				})(opt),
				moment: {},
				x: 1,
				y: 1,
				on: true,
				turnOn: function (e) {
					if ($this.on) {
						return false;
					}
					el.css({ cursor: $this.opt.cursor })
						.children('a')
						.on('mousedown', onPrevent)
						.css({ cursor: 'pointer' });
					el.on({'mousedown': $this.onHold});
					$('body').on({'keydown': $this.onKeyDown, 'keyup': $this.onKeyDown});
					$this.on = true;
					return false;
				},

				turnOff: function (e) {
					if (!$this.on) {
						return false;
					}
					el.css({ cursor: '' })
						.children('a')
						.off('mousedown', onPrevent)
						.css({ cursor: '' });
					el.off({'mousedown': $this.onHold});
					$('body').off({'keydown': $this.onKeyDown, 'keyup': $this.onKeyDown});
					$this.on = false;
					return false;
				},
				toggle: function (e) {
					if ($this.on) {
						return $this.turnOff(e);
					} else {
						return $this.turnOn(e);
					}
				},
				getCurrentPosition: function () {
					var a, b, c, to = el.to;
					return el.curPos = {
						't': a = to.scrollTop(),
						'ph': b = to.innerHeight(),
						'maxY': b = to[0].scrollHeight - b,
						'l': a = to.scrollLeft(),
						'pw': b = to.innerWidth(),
						'maxX': b = to[0].scrollWidth - b
					}
				},
				setCurrentPosition: function (dx, dy) {
					var t, l, cp, ddy, ddx;
					do {
						el.to = $this.scrollParent(el.to);
						cp = $this.getCurrentPosition();
						(cp.maxY > 0) && (Math.abs(dy) > Math.abs(dx))
							&& ((cp.maxX > 0) || (dx = 0), ddy = (cp.t - (ddy = Math.round((cp.maxY / cp.ph + 1) * dy)) < 0) ? cp.t : (cp.t - ddy > cp.maxY ? cp.t - cp.maxY : ddy))
							&& el.to.scrollTop(cp.t - ddy), (t = el.to.scrollTop() != cp.t) && (dy = 0, el.to.trigger('scroll'));
						(cp.maxX > 0) && (Math.abs(dx) > Math.abs(dy))
							&& (dy = 0, ddx = (cp.l - (ddx = Math.round((cp.maxX / cp.pw + 1) * dx)) < 0) ? cp.l : (cp.l - ddx > cp.maxX ? cp.l - cp.maxX : ddx))
							&& el.to.scrollLeft(cp.l - ddx), (l = el.to.scrollLeft() != cp.l) && (dx = 0, el.to.trigger('scroll'));
					} while ((el.to.data('overflow') == 'no-dragon'
						|| el.to[0].tagName.toLowerCase() == 'a'
						|| !(dy && t) && !(dx && l))
						&& el[0] != el.to[0]
						&& (el.to = el.to.parent()));
				},
				scrollParent: function (el) {
					while ((el[0].nodeType != 1 || el.css('overflow') == 'visible') || el.data('overflow') == 'no-dragon' && el[0] != el[0]) {
						el = el.parent();
					}
					return el;
				},

				onHold: function (e) {
					$this.moment = {};
					var b, et = (e.target.tagName || e.target.localName || e.target.nodeName).toLowerCase();
					if ($(e.target).closest('.widget').length !== 0) {
						return;
					}
					if (et in $this.opt.exclusion){
						return;
					}

					el.too = el.to = $((this === e.target) ? this : e.target);
					if (el.too.parents($this.opt.exclusion.id).length){
						return;
					}

					(e.type == 'mousedown') && (e.preventDefault(), e.stopPropagation());

					$this.moment = el.holdPos = { 'x': e.pageX, 'y': e.pageY };
					$this.moment.startTime = +new Date();
					el.on({'mousemove': $this.onDrag, 'mouseleave mouseup': $this.onRelease});
					el.too.on('mouseup', $this.onRelease);

					$this.noButtonHold = false;
					($this.SAH = el.too).on('scroll', $this.onScrollAfterHold);
				},
				onScrollAfterHold: function (e) {
					$this.moment = {};
					$this.noButtonHold = true;
					$this.SAH.off('scroll', $this.onScrollAfterHold);
				},
				onDrag: function (e) {
					$this.SAH && ($this.SAH.off('scroll', $this.onScrollAfterHold), $this.SAH = null);
					var x = e.pageX, y = e.pageY, dx = x - el.holdPos.x;
					dy = y - el.holdPos.y;
					el.to = $((this === e.target) ? this : e.target);

					if ($this.noButtonHold || !(e.which + e.button)) {
						return $this.onRelease(e);
					}
					e.preventDefault();
					e.stopPropagation();

					el.holdPos = { 'x': x, 'y': y };
					$this.setCurrentPosition(dx * $this.x, dy * $this.y);
					return true;
				},
				onRelease: function (e) {
					$this.noButtonHold = true;
					var sm;
					$this.opt.easing && (sm = $this.moment) &&
					(sm.vector = {y: e.pageY - sm.y, x: e.pageX - sm.x},
						sm.snatch = (+new Date() - sm.startTime),
						sm.speedX = ((sm.vector.x > 0) ? 1 : -1) * sm.vector.x * sm.vector.x / (2 * sm.snatch),
						sm.speedY = ((sm.vector.y > 0) ? 1 : -1) * sm.vector.y * sm.vector.y / (2 * sm.snatch),
						(sm.snatch < 350) && (sm.ORE = setTimeout($this.onReleaseEasing, 10)));

					/*if (e.type in { 'mouseup': '', 'mouseleave': '' }) {
						(e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation());
					}*/

					$this.SAH && ($this.SAH.off('scroll', $this.onScrollAfterHold), $this.SAH = null);
					el.off({'mouseleave mouseup': $this.onRelease, 'mousemove': $this.onDrag});
					el.too && el.too.off('mouseup', $this.onRelease);
					return true;
				},
				onReleaseEasing: function (e) {
					var sm;
					if (!(sm = $this.moment)) return;

					el.to = el.too;
					$this.setCurrentPosition($this.x * (sm.speedX *= 0.98), $this.y * (sm.speedY *= 0.98));
					sm.ORE = (Math.round(sm.speedX) || Math.round(sm.speedY)) ? setTimeout($this.onReleaseEasing, 10) : null;
				},
				onKeyDown: function (e) {
					var so, to, too, ek = e.which, sm = $this.moment, wh = $(window).innerHeight();

					sm.speedX = (ek in {37: 0, 100: 0} ? 2 : (ek in {39: 0, 102: 0} ? -2 : 0 ) );
					sm.speedY = (ek in {38: 0, 104: 0} ? 1 : (ek in {40: 0, 98: 0} ? -1 : (ek in {33: 0, 105: 0} ? (so = Math.sqrt(Math.sqrt(wh))) * Math.sqrt(so / 3) - 4 : (ek in {34: 0, 99: 0} ? -(so = Math.sqrt(Math.sqrt(wh))) * Math.sqrt(so / 3) + 4 : (ek in {35: 0, 97: 0} ? -88 : (ek in {36: 0, 103: 0} ? 88 : 0) ) ) ) ) );
					if (!(sm.speedX || sm.speedY) || Math.abs(sm.speedY) > 15 && e.type == 'keydown' || Math.abs(sm.speedY) < 15 && e.type == 'keyup') return;

					if (sm.key != ek) {
						sm.key = ek;
						to = too = $(el);
						while (to.length && !( sm.speedY && ( to[0].scrollHeight - to.innerHeight() > 2
							&& (so = to.offset()).left <= (ek = $(window).innerWidth() - to.innerWidth())
							&& (so.left >= 0 || ek < 0 && so.left >= ek) )
							|| sm.speedX && ( to[0].scrollWidth - to.innerWidth() > 2
							&& (so = to.offset()).top <= (ek = wh - to.innerHeight())
							&& (so.top >= 0 || ek < 0 && so.top >= ek) )
							))
							(to = to.slice(1)).length || (to = too = too.children());
						el.too = to.eq(0);
					}
					;

					$this.onReleaseEasing();
					e.preventDefault();
					e.stopPropagation();
				}
			};

			el.on({'DragOn.toggle': $this.toggle, 'DragOn.remove': function () {
				$this.on || $this.toggle();
				Bo = null;
				el.off('DragOn.toggle DragOn.remove')
			}});
			el.on({'DragOn.turnOn': $this.turnOn, 'DragOn.turnOff': $this.turnOff});
			$this.toggle();

			return $this;
		}
	});
});