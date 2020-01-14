var vidList = [];
var iframeStyle;
var variantID;
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
console.log(windowHeight,windowWidth, "size");
// ****************************************************************************************************************************//
// ******************************************* Button Shit ********************************************************************//
// ****************************************************************************************************************************//
// Self invoking button draw function
(window.onload = function() {

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



	const url = 'https://shopifydependencies.s3.amazonaws.com/req/vidHash.json';
	//var deviceStyle = 'height:58vh; width:48.5vw; margin-top:10px;';

	fetch(url)
	.then(  
		function(response) {  
		if (response.status !== 200) {  
			console.warn('Looks like there was a problem. Status Code: ' + 
			response.status);  
			return;  
		}
		// Examine the text in the response  
		response.json().then(function(data) {  
			
			for (let i = 0; i < data.length; i++) {
			variant = data[i].variantID;
			vidList.push(variant);
			}    
		}); 
		}  
	)  
	.catch(function(err) {  
		console.error('Fetch Error -', err);  
	});


	const detectDevice = () => {
		console.log("In device type")
		
		if (isSafariiOS) {
			return 'isSafariiOS';
		} else if (isMacOS) {
			return 'isMacOS';

		} else if (isChromeiOS) {
			return 'isChromeiOS';
			
		} else if (isFirefoxiOS) {
			return 'isFirefoxiOS';
			
		} else if (isInstagramiOS) {
			return 'isInstagramiOS';
			
		} else if (isSnapchatiOS) {
			return 'isSnapchatiOS';
			
		} else if (isFaceBookiOS) {
			return 'isFaceBookiOS';
			
		} else if (isChromeAPK) {
			return 'isChromeAPK';
			
		} else if (isMainlineAPK) {
			return 'isMainlineAPK';
			
		} else if (isInstagramAPK) {
			return 'isInstagramAPK';
			
		} else if (isSnapchatAPK) {
			return 'isSnapchatAPK';
			
		} else if (isFacebookAPK) {
			return 'isFacebookAPK';
			
		}else if (webGLStatus == 1) {
			return 'webGLStatus1';
			
		} else if (webGLStatus <= 0) {
			console.log("nope");
			return;
		};
		
	};

	const deviceType = detectDevice();
	console.log("THis is the device hoe ass bitch", deviceType);

	// 	Iframe Style settings
	var getDeviceFrameStyle = function(deviceType){
		var deviceFrameStyle;
		switch(deviceType){
			// IOS Highend
			case 'isSafariiOS':
				deviceFrameStyle = 'height:85vh; width:100vw; margin-top:10px;';
				break;
			case 'isMacOS':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			case 'isChromeiOS':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			case 'isFirefoxiOS':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			// IOS social
			case 'isInstagramiOS':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			case 'isSnapchatiOS':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			case 'isFaceBookiOS':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			// Android High end
			case 'isChromeAPK':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			case 'isMainlineAPK':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			// Android Socials
			case 'isInstagramAPK':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			case 'isSnapchatAPK':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			case 'isFacebookAPK':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			// Other
			case 'isMagicLeapHelio':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			case 'isLinuxNotLeap':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			case 'webGLStatus1':
				deviceFrameStyle = 'height:58vh; width:48.5vw; margin-top:10px;';
				break;
			default:
				console.log('Shadow Intensity Setting not found');
		};
		return deviceFrameStyle;
	};



	// 	Iframe Style settings
	var getDeviceModalStyle = function(deviceType){
		var deviceModalStyle;
		switch(deviceType){
			// IOS Highend
			case 'isSafariiOS':
				deviceModalStyle = 'width: 100vw; height: 99vh;';
				break;
			case 'isMacOS':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			case 'isChromeiOS':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			case 'isFirefoxiOS':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			// IOS social
			case 'isInstagramiOS':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			case 'isSnapchatiOS':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			case 'isFaceBookiOS':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			// Android High end
			case 'isChromeAPK':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			case 'isMainlineAPK':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			// Android Socials
			case 'isInstagramAPK':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			case 'isSnapchatAPK':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			case 'isFacebookAPK':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			// Other
			case 'isMagicLeapHelio':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			case 'isLinuxNotLeap':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			case 'webGLStatus1':
				deviceModalStyle = 'width: 50vw; height: 60vh;';
				break;
			default:
				console.log('Shadow Intensity Setting not found');
		};
		return deviceModalStyle;
	};

	
	var modalStyle = getDeviceModalStyle(deviceType);
	iframeStyle = getDeviceFrameStyle(deviceType);
	variantID = ShopifyAnalytics.meta.selectedVariantId;
	if(variantID){
	console.log(variantID,vidList);}
	var themeGrabber = Shopify.theme.name;
	// Define Button links



	var viewInARButton = `<style> .levarDialog {    position: fixed;    font-family: Arial, Helvetica, sans-serif;    top: 0;    right: 0;    bottom: 0;    left: 0;    background: rgba(0,0,0,0.8);    z-index: 99999;    opacity:0;    -webkit-transition: opacity 400ms ease-in;    -moz-transition: opacity 400ms ease-in;    transition: opacity 400ms ease-in;    pointer-events: none;}.levarDialog:target {    opacity:1;    pointer-events: auto;}.levarDialog > div {    ${modalStyle}    position: relative;    margin: 10% auto;    padding: 5px 20px 13px 20px;    border-radius: 10px;    background: #fff;    background: -moz-linear-gradient(#fff, #999);    background: -webkit-linear-gradient(#fff, #999);    background: -o-linear-gradient(#fff, #999);}.close {    background: #606061;    color: #FFFFFF;    line-height: 25px;    position: absolute;    right: -12px;    text-align: center;    top: -10px;    width: 24px;    text-decoration: none;    font-weight: bold;    -webkit-border-radius: 12px;    -moz-border-radius: 12px;    border-radius: 12px;    -moz-box-shadow: 1px 1px 3px #000;    -webkit-box-shadow: 1px 1px 3px #000;    box-shadow: 1px 1px 3px #000;}.close:hover { background: #00d9ff; }</style> <img id="hitter" src="https://shopifydependencies.s3.amazonaws.com/buttons/ARKIT_glyph1.svg" onclick="drawIframe()" width="100px" height="87px" align="middle"> <div id="openModal" class="levarDialog"> <div> <a href="#close" title="Close" class="close" onclick="getOuttaHere()">X</a> <div id="targetDiv"></div></div></div>`;
		
	var viewIn3DButton = `<style> .levarDialog {    position: fixed;    font-family: Arial, Helvetica, sans-serif;    top: 0;    right: 0;    bottom: 0;    left: 0;    background: rgba(0,0,0,0.8);    z-index: 99999;    opacity:0;    -webkit-transition: opacity 400ms ease-in;    -moz-transition: opacity 400ms ease-in;    transition: opacity 400ms ease-in;    pointer-events: none;}.levarDialog:target {    opacity:1;    pointer-events: auto;}.levarDialog > div {    ${modalStyle}    position: relative;    margin: 10% auto;    padding: 5px 20px 13px 20px;    border-radius: 10px;    background: #fff;    background: -moz-linear-gradient(#fff, #999);    background: -webkit-linear-gradient(#fff, #999);    background: -o-linear-gradient(#fff, #999);}.close {    background: #606061;    color: #FFFFFF;    line-height: 25px;    position: absolute;    right: -12px;    text-align: center;    top: -10px;    width: 24px;    text-decoration: none;    font-weight: bold;    -webkit-border-radius: 12px;    -moz-border-radius: 12px;    border-radius: 12px;    -moz-box-shadow: 1px 1px 3px #000;    -webkit-box-shadow: 1px 1px 3px #000;    box-shadow: 1px 1px 3px #000;}.close:hover { background: #00d9ff; }</style> <img id="hitter" src="https://shopifydependencies.s3.amazonaws.com/buttons/ARKIT_glyph1.svg" onclick="drawIframe()" width="100px" height="87px" align="middle"> <div id="openModal" class="levarDialog"> <div> <a href="#close" title="Close" class="close" onclick="getOuttaHere()">X</a> <div id="targetDiv"></div></div></div>`;
		
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
	if (vidList.includes(variantID) > -1){
		console.log("yes its in the list");
		drawbutton();
	}else{
		console.log("It is not in the list");
		return;
	};

})();

var drawIframe = function() {
	window.location.href = '#openModal';
	var target = document.getElementById('targetDiv');
	var newFrame = document.createElement('iframe');
	// newFrame.setAttribute('src', `https://shopifydependencies.s3.amazonaws.com/index.html`);
	newFrame.setAttribute('src', `https://shopifydependencies.s3.amazonaws.com/index.html?varid=${ShopifyAnalytics.meta.selectedVariantId}`);
	newFrame.setAttribute('id', 'levariframe');
	newFrame.setAttribute('data-variant', ShopifyAnalytics.meta.selectedVariantId);
	newFrame.setAttribute('style', `${iframeStyle}`);
	target.appendChild(newFrame);
	return false;
};

//width: 50vw;    height: 60vh;
var getOuttaHere = function() {
var theIframe = document.getElementById('levariframe');
theIframe.remove();
};