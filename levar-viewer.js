console.log('File loading...');
let levarViewer;

class LevarViewer {
  constructor() {
    this.name = 'Levar App';
		this.iframeStyle = '';
    this.iframeId = 'LevarViewer';
		this.variantId = null;
		this.vidList = [];
		this.userAgent = window.navigator.userAgent;
		this.viewer = document.documentElement
  }

	drawIframe() {
		let levarFrame = document.createElement('iframe');
		levarFrame.setAttribute('src', `https://shopifydependencies.s3.amazonaws.com/index.html?varid=${this.variantId}`);
		levarFrame.setAttribute('id', `${this.iframeId}`);
		levarFrame.setAttribute('style', 'width:100vw; height:100vh; z-index: 999; position: fixed; top: 0px; right: 0px; left: 0px; bottom: 0px;');
		document.body.appendChild(levarFrame);
    this.viewer.requestFullscreen();

    levarFrame.onload = function() {
      window.addEventListener("message", function(e) {
          exitLevarViewer()
      });
    }
	}
};

function exitLevarViewer() {
  console.log('in delete>>>>>>>');
  var iframe = document.getElementById(levarViewer.iframeId);
  if (!iframe) return
  iframe.parentNode.removeChild(iframe);
  document.exitFullscreen();
};

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
  console.log('levarViewer', levarViewer);
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
    let iframeBtn = document.getElementsByClassName('grid__item product-single__photos medium-up--one-half')[0];
    iframeBtn.insertAdjacentHTML('beforeend', viewInARButton);
    console.log('success');
  } else {
    console.log('nothing to see here');
  }
};

window.addEventListener('load', startSequence());
