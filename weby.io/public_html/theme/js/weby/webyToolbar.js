function WebyToolbar() {

	var _activeWidget;
	var _widgetSettings = $('#widget-settings');
	var _webyColorPicker;
	var _colorPicker;
	var _opacitySlider;
	var _widthSlider;
	var _radiusSlider;
	var _shadowDistanceSlider;
	var _shadowSpreadSlider;

	$('.send-backward').click(function () {
		_activeWidget.sendBackward();
	});

	$('.bring-forward').click(function () {
		_activeWidget.bringForward();
	});

	$('.send-to-back').click(function () {
		_activeWidget.sendToBack();
	});

	$('.bring-to-front').click(function () {
		_activeWidget.bringToFront();
	});

	$('.background').click(function () {
		var $this = $(this);
		var settings = $('#background-settings');
		var css = {
			top: $this.offset().top + $this.height() + 10 + 'px',
			left: $this.offset().left + 'px'
		};

		if (settings.css('display') == 'none') {
			settings.css(css).show();
			_webyColorPicker.value(_webyColorPicker.value());
		} else {
			settings.hide();
		}
	});

	$('#background-settings-youtube').keydown(function (e) {
		var input = $(this);
		var val = $.trim(input.val());
		if (e.keyCode == 13 && val != '') {
			var parser = new VideoParser();
			var videoId = parser.parse(val);
			if (videoId && parser.getVideoType() == 'youtube') {
				// @TODO: Check if video exists
				App.getWeby().getBackground().setVideo(videoId).render();
			} else {
				// Show error
			}
		}
	});

	$("#background-settings").kendoTabStrip({
		animation: {
			open: {
				effects: "fadeIn"
			}
		}
	});

	var currentColor = App.getWeby().getBackgroundColor();

	_webyColorPicker = $("#color-picker").kendoFlatColorPicker({
		preview: true,
		value: currentColor == null ? '#ffffff' : currentColor,
		change: function (e) {
			App.getWeby().getBackground().setColor(e.value).render();
		}
	}).data("kendoFlatColorPicker");

	var patterns = [
		{"name": "45degreee_fabric.png"},
		{"name": "60degree_gray.png"},
		{"name": "absurdidad.png"},
		{"name": "agsquare.png"},
		{"name": "always_grey.png"},
		{"name": "arab_tile.png"},
		{"name": "arches.png"},
		{"name": "argyle.png"},
		{"name": "asfalt.png"},
		{"name": "assault.png"},
		{"name": "az_subtle.png"},
		{"name": "back_pattern.png"},
		{"name": "batthern.png"},
		{"name": "bedge_grunge.png"},
		{"name": "beige_paper.png"},
		{"name": "bgnoise_lg.png"},
		{"name": "billie_holiday.png"},
		{"name": "binding_dark.png"},
		{"name": "binding_light.png"},
		{"name": "black-Linen.png"},
		{"name": "black_denim.png"},
		{"name": "black_linen_v2.png"},
		{"name": "black_lozenge.png"},
		{"name": "black_mamba.png"},
		{"name": "black_paper.png"},
		{"name": "black_scales.png"},
		{"name": "black_thread.png"},
		{"name": "black_twill.png"},
		{"name": "blackmamba.png"},
		{"name": "blackorchid.png"},
		{"name": "blizzard.png"},
		{"name": "blu_stripes.png"},
		{"name": "bo_play_pattern.png"},
		{"name": "brickwall.png"},
		{"name": "bright_squares.png"},
		{"name": "brillant.png"},
		{"name": "broken_noise.png"},
		{"name": "brushed_alu.png"},
		{"name": "brushed_alu_dark.png"},
		{"name": "burried.png"},
		{"name": "candyhole.png"},
		{"name": "carbon_fibre.png"},
		{"name": "carbon_fibre_big.png"},
		{"name": "carbon_fibre_v2.png"},
		{"name": "cardboard.png"},
		{"name": "cardboard_1.png"},
		{"name": "cardboard_flat.png"},
		{"name": "cartographer.png"},
		{"name": "checkered_pattern.png"},
		{"name": "chruch.png"},
		{"name": "circles.png"},
		{"name": "classy_fabric.png"},
		{"name": "clean_textile.png"},
		{"name": "climpek.png"},
		{"name": "cloth_alike.png"},
		{"name": "concrete_wall.png"},
		{"name": "concrete_wall_2.png"},
		{"name": "concrete_wall_3.png"},
		{"name": "connect.png"},
		{"name": "cork_1.png"},
		{"name": "corrugation.png"},
		{"name": "cracks_1.png"},
		{"name": "cream_dust.png"},
		{"name": "cream_pixels.png"},
		{"name": "creampaper.png"},
		{"name": "crisp_paper_ruffles.png"},
		{"name": "crissXcross.png"},
		{"name": "cross_scratches.png"},
		{"name": "crossed_stripes.png"},
		{"name": "crosses.png"},
		{"name": "cubes.png"},
		{"name": "cutcube.png"},
		{"name": "daimond_eyes.png"},
		{"name": "dark_Tire.png"},
		{"name": "dark_brick_wall.png"},
		{"name": "dark_circles.png"},
		{"name": "dark_dotted.png"},
		{"name": "dark_dotted2.png"},
		{"name": "dark_exa.png"},
		{"name": "dark_fish_skin.png"},
		{"name": "dark_geometric.png"},
		{"name": "dark_leather.png"},
		{"name": "dark_matter.png"},
		{"name": "dark_mosaic.png"},
		{"name": "dark_stripes.png"},
		{"name": "dark_wall.png"},
		{"name": "dark_wood.png"},
		{"name": "darkdenim3.png"},
		{"name": "darth_stripe.png"},
		{"name": "debut_dark.png"},
		{"name": "debut_light.png"},
		{"name": "denim.png"},
		{"name": "diagmonds.png"},
		{"name": "diagonal-noise.png"},
		{"name": "diagonal_striped_brick.png"},
		{"name": "diagonal_waves.png"},
		{"name": "diagonales_decalees.png"},
		{"name": "diamond_upholstery.png"},
		{"name": "diamonds.png"},
		{"name": "dimension.png"},
		{"name": "dirty_old_shirt.png"},
		{"name": "double_lined.png"},
		{"name": "dust.png"},
		{"name": "dvsup.png"},
		{"name": "ecailles.png"},
		{"name": "egg_shell.png"},
		{"name": "elastoplast.png"},
		{"name": "elegant_grid.png"},
		{"name": "embossed_paper.png"},
		{"name": "escheresque.png"},
		{"name": "escheresque_ste.png"},
		{"name": "exclusive_paper.png"},
		{"name": "extra_clean_paper.png"},
		{"name": "fabric_1.png"},
		{"name": "fabric_of_squares_gray.png"},
		{"name": "fabric_plaid.png"},
		{"name": "fake_brick.png"},
		{"name": "fake_luxury.png"},
		{"name": "fancy_deboss.png"},
		{"name": "farmer.png"},
		{"name": "felt.png"},
		{"name": "first_aid_kit.png"},
		{"name": "flowers.png"},
		{"name": "flowertrail.png"},
		{"name": "foggy_birds.png"},
		{"name": "foil.png"},
		{"name": "frenchstucco.png"},
		{"name": "furley_bg.png"},
		{"name": "geometry.png"},
		{"name": "gold_scale.png"},
		{"name": "gplaypattern.png"},
		{"name": "gradient_squares.png"},
		{"name": "graphy.png"},
		{"name": "gray_jean.png"},
		{"name": "gray_sand.png"},
		{"name": "green-fibers.png"},
		{"name": "green_dust_scratch.png"},
		{"name": "green_gobbler.png"},
		{"name": "grey.png"},
		{"name": "grey_sandbag.png"},
		{"name": "grey_wash_wall.png"},
		{"name": "greyfloral.png"},
		{"name": "greyzz.png"},
		{"name": "grid.png"},
		{"name": "grid_noise.png"},
		{"name": "gridme.png"},
		{"name": "grilled.png"},
		{"name": "groovepaper.png"},
		{"name": "grunge_wall.png"},
		{"name": "gun_metal.png"},
		{"name": "handmadepaper.png"},
		{"name": "hexabump.png"},
		{"name": "hexellence.png"},
		{"name": "hixs_pattern_evolution.png"},
		{"name": "hoffman.png"},
		{"name": "honey_im_subtle.png"},
		{"name": "husk.png"},
		{"name": "ice_age.png"},
		{"name": "inflicted.png"},
		{"name": "irongrip.png"},
		{"name": "kindajean.png"},
		{"name": "knitted-netting.png"},
		{"name": "knitting250px.png"},
		{"name": "kuji.png"},
		{"name": "large_leather.png"},
		{"name": "leather_1.png"},
		{"name": "lghtmesh.png"},
		{"name": "light_alu.png"},
		{"name": "light_checkered_tiles.png"},
		{"name": "light_grey_floral_motif.png"},
		{"name": "light_honeycomb.png"},
		{"name": "light_noise_diagonal.png"},
		{"name": "light_toast.png"},
		{"name": "light_wool.png"},
		{"name": "lightpaperfibers.png"},
		{"name": "lil_fiber.png"},
		{"name": "lined_paper.png"},
		{"name": "linedpaper.png"},
		{"name": "linen.png"},
		{"name": "little_pluses.png"},
		{"name": "little_triangles.png"},
		{"name": "littleknobs.png"},
		{"name": "low_contrast_linen.png"},
		{"name": "lyonnette.png"},
		{"name": "merely_cubed.png"},
		{"name": "micro_carbon.png"},
		{"name": "mirrored_squares.png"},
		{"name": "mochaGrunge.png"},
		{"name": "mooning.png"},
		{"name": "moulin.png"},
		{"name": "nami.png"},
		{"name": "nasty_fabric.png"},
		{"name": "natural_paper.png"},
		{"name": "navy_blue.png"},
		{"name": "nistri.png"},
		{"name": "noise_lines.png"},
		{"name": "noise_pattern_with_crosslines.png"},
		{"name": "noisy.png"},
		{"name": "noisy_grid.png"},
		{"name": "noisy_net.png"},
		{"name": "norwegian_rose.png"},
		{"name": "office.png"},
		{"name": "old_mathematics.png"},
		{"name": "old_wall.png"},
		{"name": "otis_redding.png"},
		{"name": "outlets.png"},
		{"name": "p1.png"},
		{"name": "p2.png"},
		{"name": "p4.png"},
		{"name": "p5.png"},
		{"name": "p6.png"},
		{"name": "padded.png"},
		{"name": "paper.png"},
		{"name": "paper_1.png"},
		{"name": "paper_2.png"},
		{"name": "paper_3.png"},
		{"name": "paper_fibers.png"},
		{"name": "paven.png"},
		{"name": "perforated_white_leather.png"},
		{"name": "pineapplecut.png"},
		{"name": "pinstripe.png"},
		{"name": "pinstriped_suit.png"},
		{"name": "pixel_weave.png"},
		{"name": "plaid.png"},
		{"name": "polaroid.png"},
		{"name": "polonez_car.png"},
		{"name": "polyester_lite.png"},
		{"name": "pool_table.png"},
		{"name": "project_papper.png"},
		{"name": "ps_neutral.png"},
		{"name": "psychedelic_pattern.png"},
		{"name": "purty_wood.png"},
		{"name": "pw_maze_black.png"},
		{"name": "pw_maze_white.png"},
		{"name": "pw_pattern.png"},
		{"name": "px_by_Gre3g.png"},
		{"name": "pyramid.png"},
		{"name": "quilt.png"},
		{"name": "random_grey_variations.png"},
		{"name": "ravenna.png"},
		{"name": "real_cf.png"},
		{"name": "rebel.png"},
		{"name": "redox_01.png"},
		{"name": "redox_02.png"},
		{"name": "reticular_tissue.png"},
		{"name": "retina_wood.png"},
		{"name": "retro_intro.png"},
		{"name": "ricepaper.png"},
		{"name": "ricepaper2.png"},
		{"name": "rip_jobs.png"},
		{"name": "robots.png"},
		{"name": "rockywall.png"},
		{"name": "rough_diagonal.png"},
		{"name": "roughcloth.png"},
		{"name": "rubber_grip.png"},
		{"name": "satinweave.png"},
		{"name": "scribble_light.png"},
		{"name": "shattered.png"},
		{"name": "shinecaro.png"},
		{"name": "shinedotted.png"},
		{"name": "shl.png"},
		{"name": "silver_scales.png"},
		{"name": "simple_dashed.png"},
		{"name": "skelatal_weave.png"},
		{"name": "skewed_print.png"},
		{"name": "skin_side_up.png"},
		{"name": "slash_it.png"},
		{"name": "small-crackle-bright.png"},
		{"name": "small_tiles.png"},
		{"name": "smooth_wall.png"},
		{"name": "sneaker_mesh_fabric.png"},
		{"name": "snow.png"},
		{"name": "soft_circle_scales.png"},
		{"name": "soft_kill.png"},
		{"name": "soft_pad.png"},
		{"name": "soft_wallpaper.png"},
		{"name": "solid.png"},
		{"name": "squairy_light.png"},
		{"name": "square_bg.png"},
		{"name": "squares.png"},
		{"name": "stacked_circles.png"},
		{"name": "starring.png"},
		{"name": "stitched_wool.png"},
		{"name": "strange_bullseyes.png"},
		{"name": "straws.png"},
		{"name": "stressed_linen.png"},
		{"name": "striped_lens.png"},
		{"name": "struckaxiom.png"},
		{"name": "stucco.png"},
		{"name": "subtle_carbon.png"},
		{"name": "subtle_dots.png"},
		{"name": "subtle_freckles.png"},
		{"name": "subtle_grunge.png"},
		{"name": "subtle_orange_emboss.png"},
		{"name": "subtle_stripes.png"},
		{"name": "subtle_surface.png"},
		{"name": "subtle_white_feathers.png"},
		{"name": "subtle_zebra_3d.png"},
		{"name": "subtlenet2.png"},
		{"name": "swirl.png"},
		{"name": "tactile_noise.png"},
		{"name": "tapestry_pattern.png"},
		{"name": "tasky_pattern.png"},
		{"name": "tex2res1.png"},
		{"name": "tex2res2.png"},
		{"name": "tex2res3.png"},
		{"name": "tex2res4.png"},
		{"name": "tex2res5.png"},
		{"name": "textured_paper.png"},
		{"name": "textured_stripes.png"},
		{"name": "texturetastic_gray.png"},
		{"name": "ticks.png"},
		{"name": "tileable_wood_texture.png"},
		{"name": "tiny_grid.png"},
		{"name": "triangles.png"},
		{"name": "triangles_pattern.png"},
		{"name": "triangular.png"},
		{"name": "tweed.png"},
		{"name": "twinkle_twinkle.png"},
		{"name": "txture.png"},
		{"name": "type.png"},
		{"name": "use_your_illusion.png"},
		{"name": "vaio_hard_edge.png"},
		{"name": "vertical_cloth.png"},
		{"name": "vichy.png"},
		{"name": "vintage_speckles.png"},
		{"name": "wall4.png"},
		{"name": "washi.png"},
		{"name": "wavecut.png"},
		{"name": "wavegrid.png"},
		{"name": "weave.png"},
		{"name": "white_bed_sheet.png"},
		{"name": "white_brick_wall.png"},
		{"name": "white_carbon.png"},
		{"name": "white_carbonfiber.png"},
		{"name": "white_leather.png"},
		{"name": "white_paperboard.png"},
		{"name": "white_plaster.png"},
		{"name": "white_sand.png"},
		{"name": "white_texture.png"},
		{"name": "white_tiles.png"},
		{"name": "white_wall.png"},
		{"name": "white_wall2.png"},
		{"name": "white_wall_hash.png"},
		{"name": "white_wave.png"},
		{"name": "whitediamond.png"},
		{"name": "whitey.png"},
		{"name": "wide_rectangles.png"},
		{"name": "wild_oliva.png"},
		{"name": "witewall_3.png"},
		{"name": "wood_pattern.png"},
		{"name": "worn_dots.png"},
		{"name": "woven.png"},
		{"name": "xv.png"},
		{"name": "zigzag.png"},
		{"name": "wood_1.jpg"}
	];

	var patternsDataSource = new kendo.data.DataSource({
		data: patterns,
		pageSize: 6
	});

	$("#patternsPager").kendoPager({
		dataSource: patternsDataSource,
		buttonCount: 5
	});

	$("#patternsList").kendoListView({
		dataSource: patternsDataSource,
		template: kendo.template('<div class="pattern" data-pattern="${name}" style="background: url(\'' + THEME + 'images/patterns/${name}\') repeat"></div>'),
		selectable: "single",
		change: function () {
			App.getWeby().getBackground().setPattern(this.select().attr("data-pattern")).render();
		}
	});

	var _applyBackgroundMode = function (mode) {
		App.getWeby().getBackground().setImageMode(mode).render();
		App.getWeby().getBackground().widgetDrag();
	};

	/**
	 * WIDGET SETTINGS
	 */

	$('#weby-toolbar-wrapper .widget').click(function () {
		if (_activeWidget == null) {
			return;
		}

		var $this = $(this);
		var css = {
			top: $this.offset().top + $this.height() + 10 + 'px',
			left: $this.offset().left + 'px'
		};
		_widgetSettings.css(css);
		if (_widgetSettings.css('display') == 'none') {
			_widgetSettings.show();
			_activeWidget.hideTools();
			_colorPicker.value(_colorPicker.value());
		} else {
			_widgetSettings.hide();
			_activeWidget.showTools();
		}
	});

	_colorPicker = $("#widget-color").kendoFlatColorPicker({
		value: "#ffffff",
		opacity: true,
		preview: true,
		change: function (e) {
			_activeWidget.setColor(e.value);
		}
	}).data("kendoFlatColorPicker");

	_opacitySlider = $("#widget-opacity").kendoSlider({
		min: 0,
		max: 100,
		showButtons: false,
		slide: function (e) {
			_activeWidget.setOpacity(e.value / 100);
		}
	}).data("kendoSlider");

	_radiusSlider = $("#widget-radius").kendoSlider({
		min: 0,
		max: 20,
		showButtons: false,
		slide: function (e) {
			_activeWidget.setRadius(e.value);
		}
	}).data("kendoSlider");

	_widthSlider = $("#widget-width").kendoSlider({
		min: 0,
		max: 50,
		showButtons: false,
		slide: function (e) {
			_activeWidget.setPadding(e.value);
		}
	}).data("kendoSlider");

	_shadowDistanceSlider = $("#widget-shadow-distance").kendoSlider({
		min: 0,
		max: 50,
		showButtons: false,
		slide: function (e) {
			_activeWidget.setShadowDistance(e.value);
		}
	}).data("kendoSlider");

	_shadowSpreadSlider = $("#widget-shadow-spread").kendoSlider({
		min: 0,
		max: 50,
		showButtons: false,
		slide: function (e) {
			_activeWidget.setShadowSpread(e.value);
		}
	}).data("kendoSlider");

	$("#file").kendoUpload({
		multiple: false,
		async: {
			saveUrl: WEB + "editor/upload-image/?weby=" + App.getWeby().getId(),
			autoUpload: true
		},
		showFileList: false,
		success: function (e) {
			// Array with information about the uploaded files
			if (e.operation == "upload") {
				App.getWeby().getBackground().setImage(e.response.url).setImageMode('repeat').render();
				App.getWeby().getBackground().widgetDrag();
			}
		},
		select: function (e) {
			if (e.files[0].size > 2097152) {
				alert("Please select a file smaller than 2MB.");
				e.preventDefault();
			}
		}
	});

	/**
	 * IMAGE MODES
	 */
	$('#background-settings-limit').click(function () {
		_applyBackgroundMode('limit');
	});

	$('#background-settings-aligned').click(function () {
		_applyBackgroundMode('aligned');
	});

	$('#background-settings-repeat').click(function () {
		_applyBackgroundMode('repeat');
	});

	$('#background-settings-scale').click(function () {
		_applyBackgroundMode('scale');
	});

	$('#background-settings-fixed').click(function () {
		_applyBackgroundMode('fixed');
	});

	$('#background-settings table button').click(function () {
		App.getWeby().getBackground().setImageAlign($(this).attr("data-align")).render();
	});

	/**
	 * CANVAS SIZE
	 */

	$('#background-size-apply').click(function(){
		var width = parseInt($('#canvas-width').val());
		var height = parseInt($('#canvas-height').val());
		App.getWeby().getBackground().applyCanvasSize(width, height);
	});


	/**
	 * EVENTS
	 */

	this.widgetClick = function () {
		_widgetSettings.hide();
		_activeWidget.showTools();
	}

	this.widgetDrag = function (data) {
		App.getWeby().getBackground().widgetDrag(data);
	}

	this.webyLoaded = function () {
		// Do something when Weby is loaded
	}

	this.widgetActivated = function (widget) {
		_activeWidget = widget;
		$('#weby-toolbar-wrapper a.tool-icon').removeClass('disabled');
		// Get widget settings
		var settings = _activeWidget.getFrameSettings();
		_colorPicker.value(settings.color);
		_radiusSlider.value(settings.radius);
		_opacitySlider.value(parseFloat(settings.opacity) * 100);
		_widthSlider.value(settings.padding);
		_shadowDistanceSlider.value(parseInt(settings.shadowY));
		_shadowSpreadSlider.value(parseInt(settings.shadowSpread));
	}

	this.widgetDeactivated = function () {
		_activeWidget = null;
		_widgetSettings.hide();
		$('#weby-toolbar-wrapper a.tool-icon:not(".background")').addClass('disabled');
	}
}