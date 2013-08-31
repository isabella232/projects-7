function MapWidget() {

	this._map = null;
	this._geocoder = null;
	this._marker = null;
	this._gmapLat = '';
	this._gmapLng = '';
	this._gmapZoom = 16;
	this._mapView = 'map';
	this._panoramaPov = {}; // heading, pitch, zoom
	this._widgetClass = 'map-widget';

	this.getHTML = function () {
		this._html = '<div class="map" style="width:100%;"></div>';
		return BaseWidget.prototype.getHTML.call(this);
	};

	this.onWidgetInserted = function(){
		_initializeMap();
		this.body().find('.map').height(this._height).width(this._width);
		_centerMarker();
	}

	var $this = this;

	var _initializeMap = function () {
		if ($this._map != null) {
			return;
		}

		google.maps.visualRefresh = true;
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
			draggable: false,
			position: latlng
		});

		var panorama = $this._map.getStreetView();

		if($this._mapView == 'streetView'){
			var panoramaOptions = {
				position: latlng,
				pov: {
					heading: parseFloat($this._panoramaPov.heading),
					pitch: parseFloat($this._panoramaPov.pitch),
					zoom: parseFloat($this._panoramaPov.zoom)
				}
			};

			panorama.setOptions(panoramaOptions);
			$this._map.getStreetView().setVisible(true)
		}

		setTimeout(_centerMarker, 100);
	}

	var _centerMarker = function () {
		google.maps.event.trigger($this._map, "resize");
		var latlng = new google.maps.LatLng($this._gmapLat, $this._gmapLng);
		var latlngbounds = new google.maps.LatLngBounds();
		latlngbounds.extend(latlng);
		$this._map.setZoom(parseInt($this._gmapZoom));
		$this._map.setCenter(latlngbounds.getCenter());
	}
}

MapWidget.prototype = new BaseWidget();
MapWidget.prototype.constructor = MapWidget;