// Ben Cully
// October 2019
// Property of Fifthwall .inc

var vidList = ['30721105985585','30721116110897','30721123483697','30721127350321','30721135771697','30721149534257','30721149567025'];

// ****************************************************************************************************************************//
// ******************************************* Button Shit ********************************************************************//
// ****************************************************************************************************************************//
// Self invoking button draw function
(window.onload = function(){

// Device detection
var isSafariiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('OS 13') > -1 &&
    navigator.userAgent.indexOf('CriOS') === -1 &&
    navigator.userAgent.indexOf('Instagram') === -1 &&
    navigator.userAgent.indexOf('Snapchat') === -1 &&
    navigator.userAgent.indexOf('FxiOS') === -1 &&
	navigator.userAgent.indexOf('FBIOS') === -1;

var isMacOS = /Macintosh/i.test(navigator.userAgent) &&
	navigator.userAgent.indexOf('OS X') > -1;

var isChromeiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('CriOS') > -1;

var isInstagramiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Instagram') > -1;

var isSnapchatiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Snapchat') > -1;

var isFirefoxiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('FxiOS') > -1;

var isFaceBookiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('FBIOS') > -1;

var isChromeAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Chrome') > -1 &&
    navigator.userAgent.indexOf('Instagram') === -1 &&
    navigator.userAgent.indexOf('Snapchat') === -1 &&
    navigator.userAgent.indexOf('FBAV') === -1;

var isMainlineAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Instagram') === -1 &&
    navigator.userAgent.indexOf('Snapchat') === -1 &&
    navigator.userAgent.indexOf('FBAV') === -1;

var isInstagramAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Instagram') > -1;

var isSnapchatAPK = /Android/i.test(navigator.userAgent) &&
	navigator.userAgent.indexOf('Snapchat') > -1;

var isMagicLeapHelio = /X11/i.test(navigator.userAgent) &&
  navigator.userAgent.indexOf('Is Helio') > -1;

var isLinuxNotLeap = /X11/i.test(navigator.userAgent) &&
  navigator.userAgent.indexOf("Is Linux Not Leap") === -1;

var isFacebookAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('FBAV') > -1;

var webGLStatus = webGLFD();



function webGLFD() {
    if (!!window.WebGLRenderingContext) {
    var canvas = document.createElement("canvas"),
        names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
        context = false;

    for (var i in names) {
        try {
        context = canvas.getContext(names[i]);
        if (context && typeof context.getParameter === "function") {
            return 1;
        }
        } catch (e) {}
    }
    return 0;
    }
    return -1;
}


var variantID = ShopifyAnalytics.meta.selectedVariantId;
var viewInARButton = '<img src="https://shopifydependencies.s3.amazonaws.com/buttons/ARKIT_glyph1.svg" onclick="RUN()" width="100px" height="87px" align="middle"></img>';
var viewIn3DButton = '<img src="https://shopifydependencies.s3.amazonaws.com/buttons/ARKIT_glyph1.svg" onclick="RUN()" width="150px" height="130px" align="middle"></img>';
var notSupported = '<p>AR and 3D are not supported on your potato</p>';
var themeGrabber = Shopify.theme.name;
var setTheme = function(themeGrabber){
	var themebitch;
	switch(themeGrabber){
		// IOS Highend
		case 'Debut':
			themebitch = "grid__item product-single__photos medium-up--one-half";
			break;
		case 'Venture':
			themebitch = "photos__item photos__item--main";
			break;
		case 'launchpad-star':
			themebitch = "grid__item large--one-half";
			break;
		case 'Simple':
			themebitch = "product-single__photos";
			break;
		case 'Narrative':
			themebitch = "product__image-container";
			break;
		case 'Brooklyn':
			themebitch = "product-single__photo--flex-wrapper";
			break;
		case 'Supply':
			themebitch = "product-photo-container";
			break;
		case 'Minimal':
			themebitch = "grid__item post-large--one-half";
			break;
		case 'Prestige':
			themebitch = "Product__SlideItem Product__SlideItem--image Carousel__Cell is-selected";
			break;
		case 'impulse':
			themebitch = "starting-slide slick-slide slick-current slick-active";
			break;
		case 'Streamline-v0.0.3':
			themebitch = "product__slide starting-slide";
			break;
		case 'venue':
			themebitch = "product-single__photo__item";
			break;
		case 'icon':
			themebitch = "product_image product-main-image selected aos-init aos-animate";
			break;
		case 'testament':
			themebitch = "product-main-image selected";
			break;
		default:
			console.log('Theme not found');
	};
	return themebitch;
};


var useClass = setTheme(themeGrabber);
var whereInTheHTML = "beforeend";
// Platform Specific Buttons
var drawbutton = function(){

	if (isSafariiOS) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isMacOS) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isChromeiOS) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isFirefoxiOS) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isInstagramiOS) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isSnapchatiOS) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isFaceBookiOS) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isChromeAPK) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isMainlineAPK) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isInstagramAPK) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isSnapchatAPK) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	} else if (isFacebookAPK) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewInARButton);
	}else if (webGLStatus == 1) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, viewIn3DButton);
	} else if (webGLStatus <= 0) {
		var xb = document.getElementsByClassName(useClass)[0];
		xb.insertAdjacentHTML(whereInTheHTML, notSupported);
	}
};
// Check the ID so you dont draw buttons for products without assets

if (vidList.indexOf(variantID) > -1){
	drawbutton();
}else{
	return;
};

})();

// ****************************************************************************************************************************//
// ************************************* Model Viewer Shit ********************************************************************//
// ****************************************************************************************************************************//
function RUN(){

// Device detection
var isSafariiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('OS 13') > -1 &&
    navigator.userAgent.indexOf('CriOS') === -1 &&
    navigator.userAgent.indexOf('Instagram') === -1 &&
    navigator.userAgent.indexOf('Snapchat') === -1 &&
    navigator.userAgent.indexOf('FxiOS') === -1 &&
	navigator.userAgent.indexOf('FBIOS') === -1;

var isMacOS = /Macintosh/i.test(navigator.userAgent) &&
	navigator.userAgent.indexOf('OS X') > -1;

var isChromeiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('CriOS') > -1;

var isInstagramiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Instagram') > -1;

var isSnapchatiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Snapchat') > -1;

var isFirefoxiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('FxiOS') > -1;

var isFaceBookiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('FBIOS') > -1;

var isChromeAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Chrome') > -1 &&
    navigator.userAgent.indexOf('Instagram') === -1 &&
    navigator.userAgent.indexOf('Snapchat') === -1 &&
    navigator.userAgent.indexOf('FBAV') === -1;

var isMainlineAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Instagram') === -1 &&
    navigator.userAgent.indexOf('Snapchat') === -1 &&
    navigator.userAgent.indexOf('FBAV') === -1;

var isInstagramAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Instagram') > -1;

var isSnapchatAPK = /Android/i.test(navigator.userAgent) &&
	navigator.userAgent.indexOf('Snapchat') > -1;

var isMagicLeapHelio = /X11/i.test(navigator.userAgent) &&
  navigator.userAgent.indexOf('IS Helio') > -1;

var isLinuxNotLeap = /X11/i.test(navigator.userAgent) &&
  navigator.userAgent.indexOf("Is Linux Not Leap") === -1;

var isFacebookAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('FBAV') > -1;

var webGLStatus = webGLFD();



function webGLFD() {
    if (!!window.WebGLRenderingContext) {
    var canvas = document.createElement("canvas"),
        names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
        context = false;

    for (var i in names) {
        try {
        context = canvas.getContext(names[i]);
        if (context && typeof context.getParameter === "function") {
            return 1;
        }
        } catch (e) {}
    }
    return 0;
    }
    return -1;
}

// Grab variant ID
var variantID = ShopifyAnalytics.meta.selectedVariantId;


// ****************************************************************************************************************************//
// ******************************************************* Settings ***********************************************************//
// ****************************************************************************************************************************//

// Grab the GLB
var getSrcGLB = function(id, deviceType){
	var srcImage;
	switch(id){
			// Awaybag
		case (vidList[0]):
			srcImage = "https://shopifydependencies.s3.amazonaws.com/ar/product3.glb";
			break;
			// Tesla Tire
		case (vidList[1]):
			srcImage = "https://shopifydependencies.s3.amazonaws.com/ar/product4.glb";
			break;
			// Watch Band
		case (vidList[2]):
			srcImage = "https://shopifydependencies.s3.amazonaws.com/ar/product5.glb";
			break;
			// Keen Uneek Exo
		case (vidList[3]):
			srcImage = "https://shopifydependencies.s3.amazonaws.com/ar/product6.glb";
			break;
			// Savini Black Di Forza
		case (vidList[4]):
			srcImage = "https://shopifydependencies.s3.amazonaws.com/ar/product7.glb";
			break;
			// Ultra motorsports Hinter Van Dually Front
		case (vidList[5]):
			srcImage = "https://shopifydependencies.s3.amazonaws.com/ar/product8.glb";
			break;
			// Ultra motorsports Hunter Van Dually Rear
		case (vidList[6]):
			srcImage = "https://shopifydependencies.s3.amazonaws.com/ar/product9.glb";
			break;
			// Nothing
		default:
			srcImage = "";
			console.log('GLB not found');
   };
	return srcImage;
};


// Grab the IOS model
var getIOSImage = function(id, deviceType){
	var iosImage;
	switch(id){
			// Awaybag
		case (vidList[0]):
			iosImage = "https://shopifydependencies.s3.amazonaws.com/ar/product3.usdz";
			break;
			// Tesla Tire
		case (vidList[1]):
			iosImage = "https://shopifydependencies.s3.amazonaws.com/ar/product4.usdz";
			break;
			// Watch Band
		case (vidList[2]):
			iosImage = "https://shopifydependencies.s3.amazonaws.com/ar/product5.usdz";
			break;
			// Keen Uneek Exo
		case (vidList[3]):
			iosImage = "https://shopifydependencies.s3.amazonaws.com/ar/product6.usdz";
			break;
			// Savini Black Di Forza
		case (vidList[4]):
			iosImage = "https://shopifydependencies.s3.amazonaws.com/ar/product7.usdz";
			break;
			// Ultra motorsports Hinter Van Dually Front
		case (vidList[5]):
			iosImage = "https://shopifydependencies.s3.amazonaws.com/ar/product8.usdz";
			break;
			// Ultra motorsports Hunter Van Dually Rear
		case (vidList[6]):
			iosImage = "https://shopifydependencies.s3.amazonaws.com/ar/product9.usdz";
			break;
			// Nothing
		default:
			iosImage = "";
			console.log('USDZ not found');
   };
	return iosImage;
};

// 	Shadow intensity setting
var getShadowIntensity = function(deviceType){
	var shadowInensity;
	switch(deviceType){
		// IOS Highend
		case 'isSafariiOS':
			shadowInensity = 1;
			break;
		case 'isMacOS':
			shadowInensity = 1;
			break;
		case 'isChromeiOS':
			shadowInensity = 1;
			break;
		case 'isFirefoxiOS':
			shadowInensity = 1;
			break;
		// IOS social
		case 'isInstagramiOS':
			shadowInensity = 0;
			break;
		case 'isSnapchatiOS':
			shadowInensity = 0;
			break;
		case 'isFaceBookiOS':
			shadowInensity = 0;
			break;
		// Android High end
		case 'isChromeAPK':
			shadowInensity = 1;
			break;
		case 'isMainlineAPK':
			shadowInensity = 1;
			break;
		// Android Socials
		case 'isInstagramAPK':
			shadowInensity = 0;
			break;
		case 'isSnapchatAPK':
			shadowInensity = 0;
			break;
		case 'isFacebookAPK':
			shadowIntesity = 0;
			break;
		// Other
		case 'isMagicLeapHelio':
			shadowInensity = 1;
			break;
		case 'isLinuxNotLeap':
			shadowInensity = 1;
			break;
		case 'webGLStatus1':
			shadowInensity = 1;
			break;
		default:
			console.log('Shadow Intensity Setting not found');
	};
	return shadowInensity;
};
// Exp Permi
var getExperimentalPmrem = function(deviceType){
	var exp;
	switch(deviceType){
		// IOS Highend
		case 'isSafariiOS':
			exp = "experimental-pmrem";
			break;
		case 'isMacOS':
			exp = "experimental-pmrem";
			break;
		case 'isChromeiOS':
			exp = "experimental-pmrem";
			break;
		case 'isFirefoxiOS':
			exp = "experimental-pmrem";
			break;
		// Android High end
		case 'isChromeAPK':
			exp = "experimental-pmrem";
			break;
		case 'isMainlineAPK':
			exp = "experimental-pmrem";
			break;
		// Other
		case 'isMagicLeapHelio':
			exp = "experimental-pmrem";
			break;
		case 'isLinuxNotLeap':
			exp = "experimental-pmrem";
			break;
		default:
			console.log('Shadow Intensity Setting not found');
	};
	return exp;
};


// AR
var getAR = function(deviceType){
	var ARsetting;
	switch(deviceType){
		// IOS Highend
		case 'isSafariiOS':
			ARsetting = "AR";
			break;
		case 'isMacOS':
			ARsetting = "AR";
			break;
		// Android High end
		case 'isChromeAPK':
			ARsetting = "AR";
			break;
		case 'isMainlineAPK':
			ARsetting = "AR";
			break;
		// Android Socials
		case 'isInstagramAPK':
			ARsetting = "AR";
			break;
		case 'isSnapchatAPK':
			ARsetting = "AR";
			break;
		case 'isFacebookAPK':
			ARsetting = "AR";
			break;
		// Other
		case 'isMagicLeapHelio':
			ARsetting = "AR";
			break;
		case 'isLinuxNotLeap':
			ARsetting = "AR";
			break;
		case 'webGLStatus1':
			ARsetting = "";
			break;
		default:
			console.log('Shadow Intensity Setting not found');
	};
	console.log("LOOK AT ME",ARsetting);
	return ARsetting;
};

// Quick Look Browser
var getQLB = function(deviceType){
	var qlb;
	switch(deviceType){
		// IOS High end
		case 'isSafariiOS':
			qlb = "safari";
			break;
		case 'isMacOS':
			qlb = "safari";
			break;
		case 'isChromeiOS':
			qlb = "";
			break;
		case 'isFirefoxiOS':
			qlb = "";
			break;
		// IOS social
		case 'isFaceBookiOS':
			qlb = "";
			break;
		case 'isInstagramiOS':
			qlb = "";
			break;
		case 'isSnapchatiOS':
			qlb = "";
			break;
		// Android High End
		case 'isChromeAPK':
			qlb = "";
			break;
		case 'isMainlineAPK':
			qlb = "";
			break;
		// Android Social
		case 'isInstagramAPK':
			qlb = "";
			break;
		case 'isSnapchatAPK':
			qlb = "";
			break;
		case 'isFacebookAPK':
			qlb = "";
			break;
		// Other
		case 'isMagicLeapHelio':
			qlb = "";
			break;
		case 'isLinuxNotLeap':
			qlb = "";
			break;
		case 'webGLStatus1':
			qlb = "";
			break;
		default:
			console.log('Enviorment Image not found');
	};
	return qlb;
};

// Alt Text Model Specific

// Enviornment Image
var getEnviornmentImage = function(deviceType){
	var evImage;
	switch(deviceType){
		// IOS High end
		case 'isSafariiOS':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment.hdr";
			break;
		case 'isMacOS':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment.hdr";
			break;
		case 'isChromeiOS':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment.hdr";
			break;
		case 'isFirefoxiOS':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment.hdr";
			break;
		// IOS social
		case 'isFaceBookiOS':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment_Legacy.png";
			break;
		case 'isInstagramiOS':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment_Legacy.png";
			break;
		case 'isSnapchatiOS':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment_Legacy.png";
			break;
		// Android High End
		case 'isChromeAPK':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment.hdr";
			break;
		case 'isMainlineAPK':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment.hdr";
			break;
		// Android Social
		case 'isInstagramAPK':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment_Legacy.png";
			break;
		case 'isSnapchatAPK':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment_Legacy.png";
			break;
		case 'isFacebookAPK':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment_Legacy.png";
			break;
		// Other
		case 'isMagicLeapHelio':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment.hdr";
			break;
		case 'isLinuxNotLeap':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment.hdr";
			break;
		case 'webGLStatus1':
			evImage = "https://shopifydependencies.s3.amazonaws.com/req/SHADE_Matte_Environment_Legacy.png";
			break;
		default:
			console.log('Enviorment Image not found');
	};
	return evImage;
};

// Exposure
var getExposure = function(deviceType){
	var exposure;
	switch(deviceType){
		// IOS Highend
		case 'isSafariiOS':
			exposure = "1";
			break;
		case 'isMacOS':
			exposure = "1";
			break;
		case 'isChromeiOS':
			exposure = "1";
			break;
		case 'isFirefoxiOS':
			exposure = "1";
			break;
		// IOS social
		case 'isInstagramiOS':
			exposure = "0";
			break;
		case 'isSnapchatiOS':
			exposure = "0";
			break;
		case 'isFaceBookiOS':
			exposure = "0";
			break;
		// Android High end
		case 'isChromeAPK':
			exposure = "1";
			break;
		case 'isMainlineAPK':
			exposure = "1";
			break;
		// Android Socials
		case 'isInstagramAPK':
			exposure = "0";
			break;
		case 'isSnapchatAPK':
			exposure = "0";
			break;
		case 'isFacebookAPK':
			exposure = "0";
			break;
		// Other
		case 'isMagicLeapHelio':
			exposure = "1";
			break;
		case 'isLinuxNotLeap':
			exposure = "1";
			break;
		case 'webGLStatus1':
			exposure = "1";
			break;
		default:

			console.log('Exposure Setting not found');
	};
	return exposure;
};

// Auto Rotate
var getAutoRotate = function(deviceType){
	var rotate;
	switch(deviceType){
		// IOS Highend
		case 'isSafariiOS':
			rotate = "auto-rotate";
			break;
		case 'isMacOS':
			rotate = "auto-rotate";
			break;
		case 'isChromeiOS':
			rotate = "auto-rotate";
			break;
		case 'isFirefoxiOS':
			rotate = "auto-rotate";
			break;
		// IOS social
		case 'isInstagramiOS':
			rotate = "";
			break;
		case 'isSnapchatiOS':
			rotate = "";
			break;
		case 'isFaceBookiOS':
			rotate = "";
			break;
		// Android High end
		case 'isChromeAPK':
			rotate = "auto-rotate";
			break;
		case 'isMainlineAPK':
			rotate = "auto-rotate";
			break;
		// Android Socials
		case 'isInstagramAPK':
			rotate = "";
			break;
		case 'isSnapchatAPK':
			rotate = "";
			break;
		case 'isFacebookAPK':
			rotate = "";
			break;
		// Other
		case 'isMagicLeapHelio':
			rotate = "auto-rotate";
			break;
		case 'isLinuxNotLeap':
			rotate = "auto-rotate";
			break;
		case 'webGLStatus1':
			rotate = "";
			break;
		default:

			console.log('Exposure Setting not found');
	};
	return rotate;
};

// Magical Leap BITCCHHHHHH
var getTheMagic = function(deviceType){
	var magic;
	switch(deviceType){
		// IOS Highend
		case 'isSafariiOS':
			magic = "";
			break;
		case 'isMacOS':
			magic = "";
			break;
		case 'isChromeiOS':
			magic = "";
			break;
		case 'isFirefoxiOS':
			magic = "";
			break;
		// IOS social
		case 'isInstagramiOS':
			magic = "";
			break;
		case 'isSnapchatiOS':
			magic = "";
			break;
		case 'isFaceBookiOS':
			magic = "";
			break;
		// Android High end
		case 'isChromeAPK':
			magic = "";
			break;
		case 'isMainlineAPK':
			magic = "";
			break;
		// Android Socials
		case 'isInstagramAPK':
			magic = "";
			break;
		case 'isSnapchatAPK':
			magic = "";
			break;
		case 'isFacebookAPK':
			magic = "";
			break;
		// Other
		case 'isMagicLeapHelio':
			magic = "magic-leap";
			break;
		case 'isLinuxNotLeap':
			magic = "";
			break;
		case 'webGLStatus1':
			magic = "";
			break;
		default:

			console.log('Exposure Setting not found');
	};
	return magic;
};
// Still needs settings

// Camera Controls
// Poster
// Pre-Load

// Build function for the settings
var checkId = function(id, deviceType) {
	console.log('in checkid', id);

	var image;
	console.log(deviceType);

	var srcImageGLB = getSrcGLB(id, deviceType);
	var iosImage = getIOSImage(id, deviceType);
	var backgroundImage = "https://shopifydependencies.s3.amazonaws.com/req/ShadeBackground.jpg";
	var envImg = getEnviornmentImage(deviceType);
	var altText = "Hello From Earth and LevAR";
	var experimentPmrem = getExperimentalPmrem(deviceType);
	var shadowIntensity = getShadowIntensity(deviceType);
	var defPreLoad = "preload";
	var cameraControls = "camera-controls";
	var autoRotate = getAutoRotate(deviceType);
	var exposureValue = getExposure(deviceType);
	var usesAR = getAR(deviceType);
	var magicalLeap = getTheMagic(deviceType);
	var qlbrowser = getQLB(deviceType);
	var posterType = "https://shopifydependencies.s3.amazonaws.com/req/lazyloader.png";
	var styleSet = "width: 100%; height: 400px";


	// function return for environment image same as above
	image = `<div id="ARcard"><model-viewer src="${srcImageGLB}" ios-src="${iosImage}" background-image="${backgroundImage}" environment-image="${envImg}" alt="${altText}" ${experimentPmrem} shadow-intensity="${shadowIntensity}" ${defPreLoad} ${cameraControls} ${autoRotate} ${magicalLeap} quick-look-browsers="${qlbrowser}" exposure="${exposureValue}" ${usesAR} poster="${posterType}" style="${styleSet}"></model-viewer></div>`;
		return image;
};

// ****************************************************************************************************************************//
// ******************************************************* SHADE PACK *********************************************************//
// ****************************************************************************************************************************//


var themeGrabber = Shopify.theme.name;

var useClass = setTheme(themeGrabber);


var pack = function(vID){
	console.log(vID)

	if (isSafariiOS) {
		var imageToInsert = checkId(vID, 'isSafariiOS')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isMacOS) {
		var imageToInsert = checkId(vID, 'isMacOS')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isChromeiOS) {
		var imageToInsert = checkId(vID, 'isChromeiOS')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isFirefoxiOS) {
		var imageToInsert = checkId(vID, 'isFirefoxiOS')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isInstagramiOS) {
		var imageToInsert = checkId(vID, 'isInstagramiOS')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isSnapchatiOS) {
		var imageToInsert = checkId(vID, 'isSnapchatiOS')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isFaceBookiOS) {
		var imageToInsert = checkId(vID, 'isFaceBookiOS')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isChromeAPK) {
		var imageToInsert = checkId(vID, 'isChromeAPK')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isMainlineAPK) {
		var imageToInsert = checkId(vID, 'isMainlineAPK')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isInstagramAPK) {
		var imageToInsert = checkId(vID, 'isInstagramAPK')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isSnapchatAPK) {
		var imageToInsert = checkId(vID, 'isSnapchatAPK')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	} else if (isFacebookAPK) {
		var imageToInsert = checkId(vID, 'isFacebookAPK')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;
	}
	else if (webGLStatus == 1) {
		var imageToInsert = checkId(vID, 'webGLStatus1')
	document.getElementsByClassName(useClass)[0].innerHTML = imageToInsert;

	} else if (webGLStatus <= 0) {
	console.log("Sorry you have a shit browser get good scrub");
	}

};


// Check for AR assett
if (vidList.indexOf(variantID) > -1){
	pack(variantID);
}else{
	return;
};


};




// HELLO FROM EARTH
