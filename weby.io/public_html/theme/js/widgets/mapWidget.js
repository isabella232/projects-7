var MapWidget = function () {

	this._widgetClass = 'map-widget';
	this._map = null;
	this._geocoder = null;
	this._marker = null;
	this._gmapLat = '';
	this._gmapLng = '';
	this._gmapZoom = 16;
	this._mapView = 'map';
	this._panoramaPov; // heading, pitch, zoom
	this._firstLoad = true;

	// Only set options we need (handle methods using callbacks - see below)
	this._resizableOptions = {
		minHeight: 150,
		minWidth: 300
	};

	this.widgetResize = function(data){
		// data contains: element, event, ui
		var _widget = this._html;
		_widget.find('.address').width(_widget.width() - 12);
		_widget.find('.map').width(_widget.width()).height(_widget.height() - 28);
		google.maps.event.trigger(this._map, "resize");
	}

	this.widgetResizeStop = function(data){
		_centerMarker();
	}

	this.onActivate = function(){
		if(!this._isContentLoaded){
			this._html.find('input').focus();
		}
	}

	this.onMakeEditable = function(){
		this._html.find('input').focus();
	}

	this.getHTML = function () {
		this._html = '<input class="address" type="text" placeholder="Type your desired address here" value="Tibljaška cesta 11"/>' +
			'<span class="message"></span>' +
			'<div class="map" style="width:100%;"></div>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onWidgetInserted = function () {
		BaseWidget.prototype.onWidgetInserted.call(this);
		App.deactivateTool();
		this._html.find('input').focus();
		this.hideResizeHandle();
		this._html.find('input').blur(function () {
			if ($(this).val() != '') {
				_initializeMap();
				_codeAddress($(this).val());
			}
		});
	}

	BaseWidget.prototype.init.call(this);

	var $this = this;

	var _initializeMap = function () {
		if ($this._map != null) {
			return;
		}

		$this._geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng($this._gmapLat, $this._gmapLng);
		var mapOptions = {
			zoom: parseInt($this._gmapZoom),
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		$this._map = new google.maps.Map($this._html.find('.map')[0], mapOptions);
		$this._marker = new google.maps.Marker({
			map: $this._map,
			draggable: true,
			position: latlng
		});


		var panorama = $this._map.getStreetView();
		google.maps.event.addListener(panorama, 'visible_changed', function () {
			if (panorama.getVisible()) {
				$this._mapView = 'streetView';
			} else {
				$this._mapView = 'map';
			}
		});

		google.maps.event.addListener(panorama, 'position_changed', function () {
			var position = panorama.getPosition();
			$this._gmapLng = position.lng();
			$this._gmapLat = position.lat();
			$this._marker.setPosition(panorama.getPosition());
			_centerMarker();
		});

		google.maps.event.addListener(panorama, 'pov_changed', function () {
			$this._panoramaPov = {
				heading: panorama.getPov().heading,
				pitch: panorama.getPov().pitch,
				zoom: panorama.getPov().zoom
			};
		});

		google.maps.event.addListener($this._marker, 'dragend', function (evt) {
			$this._geocoder.geocode({
				latLng: $this._marker.getPosition()
			}, function (responses) {
				if (responses && responses.length > 0) {
					if (typeof evt != "undefined") {
						$this._gmapLat = evt.latLng.lat();
						$this._gmapLng = evt.latLng.lng();
						$this._html.find('.address').val(responses[0].formatted_address);
					}
					_centerMarker()
				}
			});
		});

		setTimeout(_centerMarker, 100);
	}

	var _codeAddress = function (addr) {
		$this._html.find('.message').hide();
		$this._geocoder.geocode({ 'address': addr}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				$this._map.setCenter(results[0].geometry.location);
				$this._marker.setPosition(results[0].geometry.location);
				$this._gmapLat = results[0].geometry.location.lat();
				$this._gmapLng = results[0].geometry.location.lng();

				mapHeight = $this._html.height();
				if ($this._firstLoad) {
					$this._firstLoad = false;
					mapHeight = 300;
					if($this._isActive && $this._isEditable){
						$this.showResizeHandle();
					}
				}
				$this._html.find('.map').height(mapHeight - 28);
				$this.resize();
				_centerMarker();
				$this._isContentLoaded = true;
			} else {
				$this._html.find('.message').html("We couldn't locate your address! Please try a different one!").show();
				delete $this._map;
			}
		});
	}

	var _centerMarker = function () {
		google.maps.event.trigger($this._map, "resize");
		var latlng = new google.maps.LatLng($this._gmapLat, $this._gmapLng);
		var latlngbounds = new google.maps.LatLngBounds();
		latlngbounds.extend(latlng);
		$this._map.setCenter(latlngbounds.getCenter());
		$this._map.fitBounds(latlngbounds);
		$this._map.setZoom(parseInt($this._gmapZoom));
		$this._html.find('.map').attr('lat', $this._gmapLat).attr('lng', $this._gmapLng);
	}
}

MapWidget.prototype = new BaseWidget();
MapWidget.prototype.constructor = MapWidget;