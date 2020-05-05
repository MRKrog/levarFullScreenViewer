console.log('File loading...');

let levarViewer;
let hashID;

class LevarViewer {
  constructor() {
    this.name = 'Levar App';
		this.iframeStyle = '';
  	this.iframeId = 'LevarViewer';
		this.variantId = null;
		this.hashitem = null;
  	this.theme = '';
		this.vidList = [];
		this.userAgent = window.navigator.userAgent;
		this.viewer = document.documentElement;
		this.levarFrame = null;
  }

	drawIframe() {
		// this.levarFrame = null;
		// this.levarFrame = document.createElement('iframe');
		// this.levarFrame.setAttribute('src', `https://d31qwy1wuvutay.cloudfront.net/index.html?hash=${this.hashitem}`);
		// this.levarFrame.setAttribute('id', `${this.iframeId}`);
		// this.levarFrame.setAttribute('style', 'width:100%; height:100%; z-index: 999999; border:none; margin:0; padding:0; overflow:hidden; position: fixed; top: 0px; right: 0px; left: 0px; bottom: 0px;');
  	// this.levarFrame.setAttribute('allowFullScreen', true)

		// document.body.appendChild(this.levarFrame);


	  _open3dViewer(this.levarFrame);
		//   levarFrame.focus();

		// this.levarFrame.onload = function() {
		//   window.addEventListener("message", function(e) {
		// 	exitLevarViewer();
		// });
		// }
	}
};

function exitLevarViewer() {
	console.log('in delete newish>>>>>>>');
	let iframeID = document.getElementById('LevarViewer');
	// console.log("This is the iframe", iframeID);
	// console.log("This is levar viewer", levarViewer);
	iframeID.parentNode.removeChild(iframeID);
	window.removeEventListener("message", exitLevarViewer, true);
};



function _open3dViewer() {
    var iframe;

    iframe = _createIframe();
    document.body.appendChild(iframe);
    iframe.contentWindow.focus();
    _enterFullScreen(iframe);
    setTimeout(function() {
        if (!_isFullScreen(iframe)) {
          console.warn("Fullscreen failed");
        }
    window.addEventListener("message", exitLevarViewer, true)
    }, 100)
}

function _canEnterFullScreen(elem) {
  elem = elem || document.documentElement;
  return (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) && (elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen)
}

function _isFullScreen(elem) {
  return (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement) === elem
}

function _createIframe(key) {
    _deleteIframe();
    var url = `https://d31qwy1wuvutay.cloudfront.net/index.html?hash=${this.hashitem}`;


    var iframeStr = `<iframe id="${levarViewer.iframeId}" src="${url}" width="100%" height="100%" frameborder="0" title="3D Model Viewer" allowtransparency="true" style="width:100%; height:100%; z-index: 999999; border:none; margin:0; padding:0; overflow:hidden; position: fixed; top: 0px; right: 0px; left: 0px; bottom: 0px;"></iframe>`;
    var template = document.createElement("div");
    template.innerHTML = iframeStr;
    var iframe = template.firstChild;

    return iframe
}

function _deleteIframe() {
    var iframe = document.getElementById(levarViewer.iframeId);
    if (!iframe) {
        return
    }
    // if (iframe.loading_timeout) {
    //     clearTimeout(iframe.loading_timeout)
    // }
    iframe.parentNode.removeChild(iframe);
    // document.body.style.overflow = seek.state.initialBodyOverflow;
    // window.removeEventListener("onorientationchange", _calcVH, true);
    window.removeEventListener("message", exitLevarViewer, true)
}


function _enterFullScreen(elem) {
    elem = elem || document.documentElement;
    try {
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen()
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen()
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen()
        }
    } catch (err) {
        console.warn("Failed to enter fullscreen")
    }
}

//     function fullScreen(elem) {
// 		elem = elem || document.documentElement;
// 			if (elem.requestFullscreen) {
// 				elem.requestFullscreen()
// 			} else if (elem.webkitRequestFullscreen) {
// 				elem.webkitRequestFullscreen()
// 			} else if (elem.mozRequestFullScreen) {
// 				elem.mozRequestFullScreen()
// 			} else if (elem.msRequestFullscreen) {
// 				elem.msRequestFullscreen()
// 			}
//     }
//     fullScreen(levarFrame);
//     levarFrame.contentWindow.focus();
//     levarFrame.onload = function() {
//       window.addEventListener("message", function(e) {
//           exitLevarViewer();
//       });
//     }
// 	}
// };

// const exitLevarViewer = () => {
// 	console.log('in delete newish>>>>>>>');
// 	let iframeID = document.getElementById('LevarViewer');
// 	// var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
// 	// (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
// 	// (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
// 	// (document.msFullscreenElement && document.msFullscreenElement !== null);
// 	// if (!isInFullScreen) return
// 	// console.log("iframebitch", iframe)
// 	// document.mozCancelFullScreen();
//     // if (document.exitFullscreen) document.exitFullscreen();
//     // else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//     // else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
// 	// else if (document.msExitFullscreen) document.msExitFullscreen();
// 	iframeID.parentNode.removeChild(iframeID);
// 	window.removeEventListener("message", exitLevarViewer, true);
// };

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

const setTheme = (themeGrabber) => {
	let currentTheme;
	let useThisLocation;
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
		case 'Flex-nourish - Speed Optimization(1.27)':
			currentTheme = "product_name title";
			useThisLocation = 'afterend';
			break;
		default:
			console.log('Theme not found for this customer');
	};
	console.log("currentTheme", currentTheme);
	console.log("where in html to go", useThisLocation);
	return {currentTheme, useThisLocation}
};

let startSequence = async () => {
  levarViewer = new LevarViewer();
  levarViewer.variantId = ShopifyAnalytics.meta.selectedVariantId;
  levarViewer.theme = Shopify.theme.name;
  console.log('levarViewer', levarViewer);
  const {currentTheme, useThisLocation} = setTheme(levarViewer.theme);
  const productStatus = await fetchVarId();
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
    iframeBtn.insertAdjacentHTML(useThisLocation, viewInARButton);
    console.log('success');
  } else {
    console.log('nothing to see here');
  }
};

window.addEventListener('load', startSequence());
