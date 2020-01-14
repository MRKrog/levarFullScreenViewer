class LevarViewer {
  constructor() {
    this.name = 'Levar App';
		this.iframeStyle = '';
		this.variantID = null;
		this.vidList = [];
		this.userAgent = window.navigator.userAgent;
		this.viewer = document.documentElement
  }

  launchIframe() {
    console.log("Launching Iframe");
  }

	drawIframe() {
		let levarFrame = document.createElement('iframe');

		levarFrame.setAttribute('src', `http://localhost:3001/?varid=31230426054690`);
		// levarFrame.setAttribute('src', `https://shopifydependencies.s3.amazonaws.com/index.html?varid=${this.variantID}`);
		levarFrame.setAttribute('id', 'LeverViewer');
		levarFrame.setAttribute('style', 'width:100vw; height:100vh; z-index: 999; position: fixed; top: 0px; right: 0px; left: 0px; bottom: 0px;');
		document.body.appendChild(levarFrame);
		this.viewer.requestFullscreen()
	}

}

let levarViewer = new LevarViewer();


// var drawIframe = function(e) {
// 	console.log('e', e);
// 	// window.location.href = '#openModal';
// 	// var target = document.getElementById('targetDiv');
// 	// let levarFrame = document.createElement('iframe');
//
// 	newFrame.setAttribute('src', `https://shopifydependencies.s3.amazonaws.com/index.html?varid=${levarViewer.variantID}`);
// 	// newFrame.setAttribute('src', `https://shopifydependencies.s3.amazonaws.com/index.html?varid=${ShopifyAnalytics.meta.selectedVariantId}`);
// 	newFrame.setAttribute('id', 'levariframe');
// 	// newFrame.setAttribute('data-variant', ShopifyAnalytics.meta.selectedVariantId);
// 	newFrame.setAttribute('style', `height:58vh; width:48.5vw; margin-top:10px;`);
//
// 	document.body.appendChild(levarFrame);
// 	return false;
// };



// <iframe id="SeekWebArIframe" src="https://view.seekxr.com/4e95d33a1f6b4d9091a5ff0c25348664/nike_high_top/viewer.html" width="100%" height="100%" frameborder="0" title="3D Model Viewer" allowtransparency="true" data-key="nike_high_top" style="width: 100vw; height: 828px; position: fixed; z-index: 999; top: 0px; bottom: 0px; left: 0px; right: 0px;"></iframe>

// var _enterFullScreen = function(elem) {
	 // console.log('in full screen');
    // elem = elem || document.documentElement;
    // try {
    //     if (elem.requestFullscreen) {
    //         elem.requestFullscreen()
    //     } else if (elem.webkitRequestFullscreen) {
    //         elem.webkitRequestFullscreen()
    //     } else if (elem.mozRequestFullScreen) {
    //         elem.mozRequestFullScreen()
    //     } else if (elem.msRequestFullscreen) {
    //         elem.msRequestFullscreen()
    //     }
    // } catch (err) {
    //     console.warn("Failed to enter fullscreen")
    // }
// }


(window.onload = function() {

	levarViewer.variantID = 31230426054690

	var viewInARButton = `
		<a onclick="levarViewer.drawIframe()" data-levar="${levarViewer.variantID}">
			<img id="hitter"
		     src="https://shopifydependencies.s3.amazonaws.com/buttons/ARKIT_glyph1.svg"
		     width="100px"
		     height="87px"
		     align="middle">
		</a>`

	var xb = document.getElementsByClassName('product-main-image')[0];
	xb.insertAdjacentHTML('beforeend', viewInARButton);

})();


// var drawIframe = function(e) {
// 	console.log('e', e);
// 	window.location.href = '#openModal';
// 	var target = document.getElementById('targetDiv');
// 	var newFrame = document.createElement('iframe');
// 	newFrame.setAttribute('src', `https://shopifydependencies.s3.amazonaws.com/index.html?varid=${levarViewer.variantID}`);
// 	// newFrame.setAttribute('src', `https://shopifydependencies.s3.amazonaws.com/index.html?varid=${ShopifyAnalytics.meta.selectedVariantId}`);
// 	newFrame.setAttribute('id', 'levariframe');
// 	// newFrame.setAttribute('data-variant', ShopifyAnalytics.meta.selectedVariantId);
// 	newFrame.setAttribute('style', `height:58vh; width:48.5vw; margin-top:10px;`);
// 	target.appendChild(newFrame);
// 	return false;
// };

// var getOuttaHere = function() {
// 	var theIframe = document.getElementById('levariframe');
// 	theIframe.remove();
// };
//
// function _setUpSimple3dViewer(links) {
//     links.forEach(function(link) {
//         var key = link.getAttribute("data-seek");
//         link.href = getModelPageURL(key);
//         if (link.getAttribute("data-seek-ar-only")) {
//             link.href += "&viewer_options=viewAR";
//             link.setAttribute("target", "_blank")
//         } else {
//             link.addEventListener("click", function(e) {
//                 e.preventDefault();
//                 _open3dViewer(key)
//             })
//         }
//     })
// }





//
// var windowHeight = window.innerHeight;
// var windowWidth = window.innerWidth;
//
// console.log(windowHeight,windowWidth, "size");


//
// <div id="openModal" class="levarDialog">
//    <div>
//       <a href="#close" title="Close" class="close" onclick="getOuttaHere()">X</a>
//       <div id="targetDiv"></div>
//    </div>
// </div>
