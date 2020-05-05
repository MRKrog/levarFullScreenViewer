(function levarShopifyScript() {
  console.log("Running levar Shopify Script.");

  // For Development change to === // proudction !==
  if (window.location.href.indexOf("/products/") === -1) {

    var levarPlugin = {
      id: 'LEVAR_VIEWER',
      hashItem: '',
      variantID: 31398937886754, //ShopifyAnalytics.meta.selectedVariantId
      start: function() {
        console.log('Starting levAR Viewer...');
        let levarFrame = document.createElement('iframe');
        levarFrame.setAttribute('src', `https://d31qwy1wuvutay.cloudfront.net/index.html?hash=${levarPlugin.hashItem}&origin=shopify`);
        levarFrame.setAttribute('id', `${levarPlugin.id}`);
        levarFrame.setAttribute('style', `width:100%; height:100%; z-index: 999999; border:none; margin:0; padding:0; overflow:hidden; position: fixed; top: 0px; right: 0px; left: 0px; bottom: 0px; overflow:hidden;`);
        levarFrame.setAttribute('allowFullScreen', true);
        document.body.appendChild(levarFrame);

        function fullScreen(element) {
         if(element.requestFullScreen) {
           element.requestFullScreen();
         } else if(element.webkitRequestFullScreen ) {
           element.webkitRequestFullScreen();
         } else if(element.mozRequestFullScreen) {
           element.mozRequestFullScreen();
         } else if(element.msRequestFullscreen) {
           element.msRequestFullscreen();
         }
        }

        fullScreen(levarFrame);
        levarFrame.focus();

        levarFrame.onload = function() {
         window.addEventListener("message", levarPlugin.exit);
        };
      },
      exit: function() {
        var iframe = document.getElementById(levarPlugin.id);
        if (!iframe) { return };

        if (document.fullscreenElement) document.exitFullscreen();
        else if (document.webkitFullscreenElement) document.webkitExitFullscreen();
        else if (document.mozFullScreenElement) document.mozCancelFullScreen();
        else if (document.msFullscreenElement) document.msExitFullscreen();
        iframe.parentNode.removeChild(iframe);
      },
      closeBar: function () {
        var levarBar = document.getElementById("levar-bar");
        levarBar.setAttribute('style', "display: none;");
      }
    };

    fetch('https://d31qwy1wuvutay.cloudfront.net/req/vidHash.json')
      .then(response => response.json())
      .then(vidHash => {

        var productExists = false;

        for (let i = 0; i < vidHash.length; i++) {
          if(levarPlugin.variantID == vidHash[i].variantID){
            levarPlugin.hashItem = vidHash[i].hash;
            productExists = true;
          }
        }

        if(productExists) {

          function createLevarCTA() {

            var levarContainer = document.createElement("div");
            levarContainer.setAttribute('class', 'levar-cta');
            levarContainer.setAttribute('id', 'levar-bar');

            var levarLeft = document.createElement("div");
            levarLeft.setAttribute('class', 'levar-left');

            var ctaLogo = document.createElement("img");
            ctaLogo.src = 'https://shopifydependencies.s3.amazonaws.com/buttons/3dlogo.png';
            ctaLogo.setAttribute('id', 'cta-logo');

            var levarCopy = document.createElement("span");
            levarCopy.setAttribute('id', 'levar-copy');
            levarCopy.innerText = "Preview this product in Augmented Reality";

            var levarRight = document.createElement("div");
            levarRight.setAttribute('class', 'levar-right');

            var viewButtonAR = document.createElement("a");
            viewButtonAR.setAttribute('id', 'view-button');
            viewButtonAR.innerText = "View in AR";

            var closeButton = document.createElement("a");
            closeButton.setAttribute('id', 'close-button');

            levarLeft.append(ctaLogo);
            levarLeft.append(levarCopy);

            levarRight.append(viewButtonAR);
            levarRight.append(closeButton);

            levarContainer.append(levarLeft);
            levarContainer.append(levarRight);

            var levarStyle = `
              .levar-cta {
                box-sizing: border-box;
                position: fixed;
                bottom: 0px;
                left: 0px;
                padding: 15px 25px;
                width: 100%;
                background: #f1f1f1;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                box-shadow: rgba(56, 128, 255, 0.5) 0px 4px 8px 0px, rgba(56, 128, 255, 0.59) 0px 6px 20px 0px;
              }
              .levar-left, .levar-right {
                display: flex;
                align-items: center;
                flex: 1;
              }
              .levar-right {
                justify-content: flex-end;
              }

              #cta-logo {
                width: 40px;
                height: 40px;
              }

              #levar-copy {
                color: #5f5f5f;
                padding-left: 1em;
                font-size: 1.1rem;
              }

              #view-button {
                font-family: inherit;
                font-size: 1.1rem;
                padding: 5px 18px;
                color: #fff;
                border-radius: 3px;
                cursor: pointer;
                background-color: #006eff;
                transition: 0.4s ease;
                text-decoration: none;
                text-transform: uppercase;
                margin-right: 1.5em;
              }
              #view-button:hover {
                transform: translateY(-2px);
                box-shadow: 1px 1px 1px 0 rgba(33, 15, 243, 0.2), -1px 2px 8px 0 rgba(56, 128, 255, 0.59);
                -webkit-box-shadow: 1px 1px 1px 0 rgba(33, 15, 243, 0.2), -1px 2px 8px 0 rgba(56, 128, 255, 0.59);
                -moz-box-shadow: 1px 1px 1px 0 rgba(33, 15, 243, 0.2), -1px 2px 8px 0 rgba(56, 128, 255, 0.59);
              }

              #close-button {
                width: 30px;
                height: 25px;
                position: relative;
                cursor: pointer;
                transition: all .5s ease;
              }
              #close-button:hover {
                opacity: .5;
              }
              #close-button:before, #close-button:after {
                position: absolute;
                left: 10px;
                content: ' ';
                height: 25px;
                width: 2px;
                background-color: #949494;
              }
              #close-button:before {
                transform: rotate(45deg);
              }
              #close-button:after {
                transform: rotate(-45deg);
              }

              .levar-cta > * {
                opacity: 0;
              }
              .levar-cta {
                overflow: hidden;
              }
              .levar-cta > * {
                transform: translateY(-30px);
              }
              .levar-cta::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: #2196f3;
                z-index: 99999;
                transform: scaleX(0);
              }
              .levar-loaded .levar-cta::after {
                animation: scaleIn 1.3s ease-in 0.2s forwards;
              }
              .levar-loaded .levar-cta > * {
                animation: fadeIn 1s ease-in 0.7s forwards, slideIn 0.8s ease-in 0.9s forwards;
              }
              @keyframes fadeIn {
                60% {
                  opacity: 0;
                }
                100% {
                  opacity: 1;
                }
              }
              @keyframes scaleIn {
                100% {
                  transform: scaleX(1);
                }
              }
              @keyframes slideIn {
                100% {
                  transform: translateY(0);
                }
              }
              @media (max-width: 700px) {
                #close-button, .levar-left {
                  display: none;
                }
              }`;

            closeButton.onclick = function() {
              levarPlugin.closeBar();
            };

            viewButtonAR.onclick = function() {
              levarPlugin.start();
            };

            var style = document.createElement("style");
            style.appendChild(document.createTextNode(levarStyle));

            document.getElementsByTagName("head")[0].appendChild(style);
            document.getElementsByTagName("body")[0].appendChild(levarContainer);
          }

          createLevarCTA();
        }
      })

    window.addEventListener("load", () => {
      document.querySelector("body").classList.add("levar-loaded");
    });
  }; // End if Product Page
})();
