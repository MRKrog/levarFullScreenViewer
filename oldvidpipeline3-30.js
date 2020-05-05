let hashID;

class LevarViewerClass {
  constructor() {
    this.name = 'Levar App';
		this.iframeStyle = '';
    	this.iframeId = 'LevarViewer';
		this.variantId = null;
		this.hashitem = null;
    	this.theme = '';
		this.vidList = [];
		this.userAgent = window.navigator.userAgent;
		this.viewer = document.documentElement
  }

	drawIframe() {
		let levarFrame = document.createElement('iframe');
		levarFrame.setAttribute('src', `https://d31qwy1wuvutay.cloudfront.net/index.html?hash=${this.hashitem}&origin=shopify`);
		levarFrame.setAttribute('id', `${this.iframeId}`);
		levarFrame.setAttribute('style', 'width:100%; height:100%; z-index: 999999; border:none; margin:0; padding:0; overflow:hidden; position: fixed; top: 0px; right: 0px; left: 0px; bottom: 0px; overflow:hidden;');
    	levarFrame.setAttribute('allowFullScreen', true);
		document.body.appendChild(levarFrame);

    function fullScreen(element) {
	try{
      if(element.requestFullScreen) {
        element.requestFullScreen();
      } else if(element.webkitRequestFullScreen ) {
        element.webkitRequestFullScreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
	  } else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	  }
	} catch(error) {
		console.log("Could not enter fullscreen:", error)
	}
    }

    fullScreen(levarFrame);
    levarFrame.focus();


	var exo = function(e){
		try {
			console.log("In try of event listener"),
			exitLevarViewer(),
			window.removeEventListener("message", exo, false);
		} catch(error) {
			console.log("In catch of event listener",error)
		} finally {
			console.log("in finally of event listener"), exitLevarViewer();
		}
	};



    levarFrame.onload = function() {
      window.addEventListener("message", exo);
	};
	}

	removeMyEars() {
		console.log("Attempting to remove the listener");
		try{window.removeEventListener("message", listenup, false);} catch(error) {console.log("remove listener did not work", error)}

	};
};








const exitLevarViewer = () => {
  console.log('in delete newish>>>>>>>');
  var iframe = document.getElementById(levarViewer.iframeId);

  if (!iframe) { return };

  iframe.parentNode.removeChild(iframe);

  try{
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
  } catch(error) {
	  console.log("Had trouble exiting fullscreen in exitlevarviewer function:", error)
  }
};



const fetchVarId = async () => {
  const url = 'https://d31qwy1wuvutay.cloudfront.net/req/vidHash.json';
  try {
    const response = await fetch(url)
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      if(levarViewer.variantId == data[i].variantID){
		hashID = data[i].hash;
		console.log("this is the hash", hashID)
		console.log('product exists');

        return true
      }
    }
    console.log('product doesnt exist');
    return false
  } catch(e) {
    console.log(e);
  }
};



const setTheme = async (themeGrabber) => {
	let currentTheme;
	let useThisLocation;
	console.log("theme grabber man", themeGrabber);
	switch(themeGrabber){
		// IOS Highend
		case 'Debut':
			currentTheme = "grid__item product-single__photos medium-up--one-half";
			useThisLocation = 'beforeend';
			break;
		case 'Venture':
			currentTheme = "photos__item photos__item--main";
			useThisLocation = 'beforeend';
			break;
		case 'launchpad-star':
			currentTheme = "grid__item large--one-half";
			useThisLocation = 'beforeend';
			break;
		case 'Simple':
			currentTheme = "product-single__photos";
			useThisLocation = 'beforeend';
			break;
		case 'Narrative':
			currentTheme = "product__image-container";
			useThisLocation = 'beforeend';
			break;
		case 'Brooklyn':
			currentTheme = "product-single__photo--flex-wrapper";
			useThisLocation = 'beforeend';
			break;
		case 'Supply':
			currentTheme = "product-photo-container";
			useThisLocation = 'beforeend';
			break;
		case 'Minimal':
			currentTheme = "grid__item post-large--one-half";
			useThisLocation = 'beforeend';
			break;
		case 'Prestige':
			currentTheme = "Product__SlideItem Product__SlideItem--image Carousel__Cell is-selected";
			useThisLocation = 'beforeend';
			break;
		case 'impulse':
			currentTheme = "starting-slide slick-slide slick-current slick-active";
			useThisLocation = 'beforeend';
			break;
		case 'Streamline-v0.0.3':
			currentTheme = "product__slide starting-slide";
			useThisLocation = 'beforeend';
			break;
		case 'venue':
			currentTheme = "product-single__photo__item";
			useThisLocation = 'beforeend';
			break;
		case 'icon':
			currentTheme = "product_image product-main-image selected aos-init aos-animate";
			useThisLocation = 'beforeend';
			break;
		case 'testament':
			currentTheme = "product-main-image selected";
			useThisLocation = 'beforeend';
			break;
		case 'Muck-Prod':
			currentTheme = "product-main-image selected";
			useThisLocation = 'beforeend';
			break;
		case 'Production':
			currentTheme = "product-main-image selected";
			useThisLocation = 'beforeend';
			break;
		case 'Flex-nourish - WholeSale Page(Mar-11)':
			currentTheme = "product-gallery__main flickity-enabled is-draggable flickity-resize";
			useThisLocation = 'beforeend';
			break;
		case 'Boundless':
			currentTheme = "grid__item large-up--two-twelfths large-up--push-two-twelfths medium-up--three-twelfths medium-up--push-one-twelfth";
			useThisLocation = 'beforeend';
			break;
		default:
			console.log('Theme not found for this customer');
	};
	console.log("currentTheme", currentTheme);
	console.log("where in html to go", useThisLocation);
	return {currentTheme, useThisLocation};
};


let startSequence = async () => {
  levarViewer = new LevarViewerClass();
  levarViewer.variantId = ShopifyAnalytics.meta.selectedVariantId;
  levarViewer.theme = Shopify.theme.name;
  console.log('levarViewer', levarViewer);
  let {currentTheme, useThisLocation} = await setTheme(levarViewer.theme);
  console.log("current theme and use location",currentTheme, useThisLocation);
  let productStatus = await fetchVarId();
  levarViewer.hashitem = hashID;
	let viewInARButton = `
		<a onclick="levarViewer.drawIframe()" style="cursor: pointer;">
			<img id="hitter"
		     src="https://d31qwy1wuvutay.cloudfront.net/buttons/ARKIT_glyph1.svg"
		     width="100px"
		     height="87px"
		     align="middle">
		</a>`;
  if(productStatus) {
	let iframeBtn = document.getElementsByClassName(currentTheme)[0];
	console.log("iframebuttonlogbitch", iframeBtn);
    iframeBtn.insertAdjacentHTML(useThisLocation, viewInARButton);
    console.log('success');
  } else {
    console.log('nothing to see here');
  }
};


window.addEventListener('load', startSequence());
