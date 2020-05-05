(function holonextShopifyPluginIIFE() {
  console.log("holonext-shopify javascript plugin has executed.");

  // run only in product details page

  // ON_DEVELOPMENT_SET: if (window.location.href.indexOf("/products/") === -1) {
  if (window.location.href.indexOf("/products/") !== -1) {
    //   set initial variables
    var BASE_URL = "https://holonext.azurewebsites.net";
    var TARGET_API = "/api/v1/scene/checkModel";
    var HOLONEXT_CONTAINER_ID = "holonext-shopify-plugin-container";
    var HOLONEXT_VIEW_AR_BUTTON_ID = "holonext-shopify-plugin-view-ar-button";
    var HOLONEXT_LOGO_IMG_ID = "holonext-shopify-plugin-logo";
    var HOLONEXT_TEXT_ID = "holonext-shopify-plugin-text";
    var HOLONEXT_CLOSE_BUTTON_ID = "holonext-shopify-plugin-close-button";
    var HOLONEXT_LOGO_IMG_SRC =
      "https://holonext.azurewebsites.net/public/images/holonextlogo.png";
    var HOLONEXT_TEXT_INNER_TEXT =
      "Holonext AR preview is available for this product!";
    var HOLONEXT_VIEW_AR_BUTTON_INNER_TEXT = "View in AR Mode";
    var HOLONEXT_VIEW_AR_BUTTON_TITLE = "View in AR";
    var HOLONEXT_CLOSE_BUTTON_TITLE = "Close";

    var CURRENT_LOCATION_HREF =
      encodeURIComponent(window.location.href) || "unavailable";

    // check if this url has available public model on holonext
    // ON_DEVELOPMENT_SET: fetch(TARGET_API)
    fetch(BASE_URL + TARGET_API + "?loc=" + CURRENT_LOCATION_HREF)
      .then(response => response.json())
      .then(response => {
        // console.log({ response });

        if (response.body) {

          window.hideHolonextContainer = function() {
            var holonextContainerToHide = document.getElementById(
              HOLONEXT_CONTAINER_ID
            );
            if (holonextContainerToHide) {
              holonextContainerToHide.style.display = "none";
            }
          };

          function supportsAnchorRelAR() {
            return document.createElement("a").relList.supports("ar");
          }

          function createElements() {
            // CONTAINER
            var holonextContainer = document.createElement("div");

            holonextContainer.id = HOLONEXT_CONTAINER_ID;

            holonextContainer.style.position = "fixed";
            holonextContainer.style.left = "0";
            holonextContainer.style.bottom = "0";
            holonextContainer.style.right = "0";
            holonextContainer.style.height = "80px";
            holonextContainer.style.display = "flex";
            holonextContainer.style.flexDirection = "row";
            holonextContainer.style.alignItems = "center";
            holonextContainer.style.justifyContent = "center";
            holonextContainer.style.background = "white";
            holonextContainer.style.boxShadow =
              "0 4px 8px 0 rgba(56, 128, 255, 0.5), 0 6px 20px 0 rgba(56, 128, 255, 0.59)";

            // LOGO
            var holonextLogo = document.createElement("img");

            holonextLogo.id = HOLONEXT_LOGO_IMG_ID;
            holonextLogo.src = HOLONEXT_LOGO_IMG_SRC;

            holonextLogo.style.width = "28px";
            holonextLogo.style.height = "28px";
            holonextLogo.style.margin = "14px";

            holonextContainer.append(holonextLogo);

            // TEXT
            var holonextText = document.createElement("p");

            holonextText.id = HOLONEXT_TEXT_ID;
            holonextText.innerText = HOLONEXT_TEXT_INNER_TEXT;

            holonextText.style.width = "60%";
            holonextText.style.margin = "5px";

            holonextContainer.append(holonextText);

            // VIEW IN AR BUTTON
            var holonextArViewButton = document.createElement("a");

            holonextArViewButton.id = HOLONEXT_VIEW_AR_BUTTON_ID;
            holonextArViewButton.innerText = HOLONEXT_VIEW_AR_BUTTON_INNER_TEXT;
            holonextArViewButton.title = HOLONEXT_VIEW_AR_BUTTON_TITLE;

            // if apple quick look
            if (supportsAnchorRelAR() && response.body.usdzModel) {
              holonextArViewButton.rel = "ar";
              holonextArViewButton.href = response.body.usdzModel;
            } else {
              holonextArViewButton.rel = "noopener noreferrer";
              holonextArViewButton.href = response.body.modelViewer;
              holonextArViewButton.target = "_blank";
            }

            holonextContainer.append(holonextArViewButton);

            // CLOSE BUTTON
            var holonextCloseButton = document.createElement("a");

            holonextCloseButton.href = "#";
            holonextCloseButton.id = HOLONEXT_CLOSE_BUTTON_ID;
            holonextCloseButton.title = HOLONEXT_CLOSE_BUTTON_TITLE;

            holonextContainer.append(holonextCloseButton);

            holonextCloseButton.onclick = function() {
              window.hideHolonextContainer();
            };

            // inject some css
            var css = `#${HOLONEXT_CLOSE_BUTTON_ID} {
                position: absolute;
                right: 0;
                top: 15%;
                width: 50px;
                height: 100%;
                padding: 10px;
                opacity: 0.3;
              }
              #${HOLONEXT_CLOSE_BUTTON_ID}:hover {
                opacity: 1;
              }
              #${HOLONEXT_CLOSE_BUTTON_ID}:before, #${HOLONEXT_CLOSE_BUTTON_ID}:after {
                position: absolute;
                left: 15px;
                content: ' ';
                height: 28px;
                width: 2px;
                background-color: #333;
              }
              #${HOLONEXT_CLOSE_BUTTON_ID}:before {
                transform: rotate(45deg);
              }
              #${HOLONEXT_CLOSE_BUTTON_ID}:after {
                transform: rotate(-45deg);
              }
              @media (max-width: 750px) {
                #${HOLONEXT_TEXT_ID} {
                  display: none;
                }
              }
              #${HOLONEXT_VIEW_AR_BUTTON_ID} {
                background-color: #3880ff;
                border: none;
                color: white;
                padding: 9px 18px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                transition: 0.4s ease;
                border-radius: 2px;
              }
              #${HOLONEXT_VIEW_AR_BUTTON_ID}:hover {
                transform: translateY(-3px);
                box-shadow:    0 4px 8px 0 rgba(56, 128, 255, 0.5), 0 6px 20px 0 rgba(56, 128, 255, 0.59);
                -webkit-box-shadow: 0 4px 8px 0 rgba(56, 128, 255, 0.5), 0 6px 20px 0 rgba(56, 128, 255, 0.59);  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
                -moz-box-shadow:    0 4px 8px 0 rgba(56, 128, 255, 0.5), 0 6px 20px 0 rgba(56, 128, 255, 0.59);
              }
              #${HOLONEXT_CONTAINER_ID} {
                font-family: "Work Sans",sans-serif;
                color: #3d4246;
                font-style: normal;
                line-height: 1.3;
                -webkit-font-smoothing: antialiased;
                z-index: 999;
                -webkit-box-shadow: 0 4px 8px 0 rgba(56, 128, 255, 0.5), 0 6px 20px 0 rgba(56, 128, 255, 0.59);  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
                -moz-box-shadow:    0 4px 8px 0 rgba(56, 128, 255, 0.5), 0 6px 20px 0 rgba(56, 128, 255, 0.59);
              }
              `;
            // TODO    move all styles to here
            var style = document.createElement("style");

            if (style.styleSheet) {
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }

            document.getElementsByTagName("head")[0].appendChild(style);

            // append overall container to body
            document
              .getElementsByTagName("body")[0]
              .appendChild(holonextContainer);
          }

          // prepare elements and append to page
          createElements();
        }
      });
  }
})();
