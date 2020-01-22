console.log('File loading...');
let levarViewer;

class LevarViewer {
  constructor() {
    this.name = 'Levar App';
		this.iframeStyle = '';
    this.iframeId = 'LevarViewer';
		this.variantId = null;
    this.theme = '';
		this.vidList = [];
		this.userAgent = window.navigator.userAgent;
		this.viewer = document.documentElement
  }

	drawIframe() {
		let levarFrame = document.createElement('iframe');
		levarFrame.setAttribute('src', `https://shopifydependencies.s3.amazonaws.com/index.html?varid=${this.variantId}`);
		levarFrame.setAttribute('id', `${this.iframeId}`);
		levarFrame.setAttribute('style', 'width:100%; height:100%; z-index: 999999; border:none; margin:0; padding:0; overflow:hidden; position: fixed; top: 0px; right: 0px; left: 0px; bottom: 0px;');
    levarFrame.setAttribute('allowFullScreen', '')
		document.body.appendChild(levarFrame);

    function fullScreen(element) {
      // "" = document.body.style.overflow
      if(element.requestFullScreen) {
        element.requestFullScreen();
      } else if(element.webkitRequestFullScreen ) {
        element.webkitRequestFullScreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      }
    }

    fullScreen(levarFrame);


    levarFrame.onload = function() {
      
      levarFrame.contentWindow.focus();
      window.addEventListener("message", function(e) {
          exitLevarViewer();
      });
    }
	}
};

const exitLevarViewer = () => {
  console.log('in delete newish>>>>>>>');
  var iframe = document.getElementById(levarViewer.iframeId);
  if (!iframe) return
  iframe.parentNode.removeChild(iframe);
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
};

// function exitLevarViewer() {
//   console.log('in delete new>>>>>>>');
//   var iframe = document.getElementById(levarViewer.iframeId);
//   // if (!iframe) return
//   iframe.parentNode.removeChild(iframe);
//   document.exitFullscreen();
// };

const fetchVarId = async () => {
  const url = 'https://shopifydependencies.s3.amazonaws.com/req/vidHash.json';
  try {
    const response = await fetch(url)
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      if(levarViewer.variantId == data[i].variantID){
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

let startSequence = async () => {
  levarViewer = new LevarViewer();
  levarViewer.variantId = ShopifyAnalytics.meta.selectedVariantId
  levarViewer.theme = Shopify.theme.name;
  console.log('levarViewer', levarViewer);
  const usersTheme = setTheme(levarViewer.theme)
  const productStatus = await fetchVarId();
	let viewInARButton = `
		<a onclick="levarViewer.drawIframe()" style="cursor: pointer;">
			<img id="hitter"
		     src="https://shopifydependencies.s3.amazonaws.com/buttons/ARKIT_glyph1.svg"
		     width="100px"
		     height="87px"
		     align="middle">
		</a>`;
  if(productStatus) {
    let iframeBtn = document.getElementsByClassName(usersTheme)[0];
    iframeBtn.insertAdjacentHTML('beforeend', viewInARButton);
    console.log('success');
  } else {
    console.log('nothing to see here');
  }
};

const setTheme = (themeGrabber) => {
	let currentTheme;
	switch(themeGrabber){
		// IOS Highend
		case 'Debut':
			currentTheme = "grid__item product-single__photos medium-up--one-half";
			break;
		case 'Venture':
			currentTheme = "photos__item photos__item--main";
			break;
		case 'launchpad-star':
			currentTheme = "grid__item large--one-half";
			break;
		case 'Simple':
			currentTheme = "product-single__photos";
			break;
		case 'Narrative':
			currentTheme = "product__image-container";
			break;
		case 'Brooklyn':
			currentTheme = "product-single__photo--flex-wrapper";
			break;
		case 'Supply':
			currentTheme = "product-photo-container";
			break;
		case 'Minimal':
			currentTheme = "grid__item post-large--one-half";
			break;
		case 'Prestige':
			currentTheme = "Product__SlideItem Product__SlideItem--image Carousel__Cell is-selected";
			break;
		case 'impulse':
			currentTheme = "starting-slide slick-slide slick-current slick-active";
			break;
		case 'Streamline-v0.0.3':
			currentTheme = "product__slide starting-slide";
			break;
		case 'venue':
			currentTheme = "product-single__photo__item";
			break;
		case 'icon':
			currentTheme = "product_image product-main-image selected aos-init aos-animate";
			break;
		case 'testament':
			currentTheme = "product-main-image selected";
			break;
		default:
			console.log('Theme not found');
	};
	return currentTheme;
};


window.addEventListener('load', startSequence());
