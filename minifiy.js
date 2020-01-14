(function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }
    return r
})()({
    1: [function(require, module, exports) {
        (function(global) {
            "use strict";

            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj
                    }
                } else {
                    _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
                    }
                }
                return _typeof(obj)
            }
            var sentryUrl = "https://sentry.seekxr.com/api/11/store/?sentry_key=f4790fe3864143ea9ebeba634d305369&sentry_version=7";

            function _deprecate(fn, msg) {
                return function() {
                    var warning = "This Seek SDK API is deprecated. ";
                    if (msg) {
                        warning += msg
                    }
                    console.warn(warning);
                    return fn.apply(null, arguments)
                }
            }

            function _reportError(error) {
                var timestamp = Math.floor((new Date).getTime() / 1e3);
                var payload = {
                    level: "error",
                    timestamp: timestamp,
                    exception: {
                        values: [{
                            type: error.name,
                            value: error.stack,
                            module: "seek.js"
                        }]
                    },
                    request: {
                        url: window.location.href
                    }
                };
                var xhr = new XMLHttpRequest;
                xhr.open("POST", sentryUrl, true);
                xhr.send(JSON.stringify(payload))
            }

            function _catchError(fn) {
                return function() {
                    try {
                        return fn.apply(null, arguments)
                    } catch (e) {
                        _reportError(e);
                        console.error("Caught seek.js error", e)
                    }
                }
            }

            try {
                global.seek = {
                    config: {
                        viewHost: "https://view.seekxr.com",
                        analyticsHost: "https://analytics.seekxr.com",
                        icon: "https://s3.amazonaws.com/models.seekxr.com/_PlayerAssets/seek-logo.svg",
                        token: "",
                        iframeName: "SeekWebArIframe",
                        iframeStyle: "width: 100vw; height:100vh;",
                        iframeHostElement: null,
                        debug: false,
                        viewer: "",
                        feedbackModalEnabled: false,
                        overlayEnabled: true,
                        viewerOptions: [],
                        noARFlag: "#noARViewer",
                        noARFlagGoogle: "#noGoogleViewer"
                    },
                    state: {
                        ua: window.navigator.userAgent,
                        scriptEl: document.currentScript,
                        initialized: false,
                        iframeLoaded: false,
                        initialBodyOverflow: "",
                        listeners: {},
                        platform: _getPlatform(),
                        sessionId: _getSessionId(),
                        referrer: window.location.href,
                        viewer_options: _getQueryParameterByName("viewer_options") || "",
                        no_app: _getQueryParameterByName("no_app") !== null
                    },
                    init: _catchError(init),
                    bindLinks: _catchError(bindLinks),
                    checkKey: _catchError(checkKey),
                    view: _catchError(view),
                    inject3dViewer: _catchError(inject3dViewer),
                    injectSearchData: _catchError(injectSearchData),
                    addEventListener: addEventListener,
                    removeEventListener: removeEventListener,
                    getARUnsupportedMessage: _catchError(getARUnsupportedMessage),
                    getModelPageURL: _catchError(getModelPageURL),
                    open: _deprecate(view, "Use seek.view instead"),
                    setupIconCss: setupIconCss,
                    fixAnchorStyle: fixAnchorStyle
                };
                Object.defineProperty(seek, "token", {
                    get: function get() {
                        return seek.config.token
                    },
                    set: function set(value) {
                        seek.config.token = value
                    }
                });
                Object.defineProperty(seek, "icon", {
                    get: function get() {
                        return seek.config.icon
                    },
                    set: function set(value) {
                        seek.config.icon = value
                    }
                });
                document.addEventListener("DOMContentLoaded", function() {
                    if (!seek.state.initialized) {
                        seek.init()
                    }
                });
                if (window.NodeList && !NodeList.prototype.forEach) {
                    NodeList.prototype.forEach = Array.prototype.forEach
                }
            } catch (e) {
                _reportError(e);
                console.error("Seek.js failed to load", e)
            }

            function init(config_or_token) {
                if (!!config_or_token) {
                    if (typeof config_or_token === "string") {
                        seek.config.token = config_or_token
                    } else if (_typeof(config_or_token) === "object") {
                        for (var k in config_or_token) {
                            if (config_or_token.hasOwnProperty(k)) {
                                seek.config[k] = config_or_token[k]
                            }
                        }
                    }
                }
                if (!seek.config.token) {
                    seek.config.token = _getToken()
                }
                if (!seek.config.viewer) {
                    if (seek.state.platform.os === "iOS" && seek.state.platform.osVersion >= 12.2 && (seek.state.platform.browser === "Safari" || seek.state.platform.browser === "Chrome")) {
                        seek.config.viewer = "quicklook"
                    } else if (seek.state.platform.os === "iPadOS") {
                        seek.config.viewer = "quicklook"
                    } else if (seek.state.platform.os === "Android" && seek.state.platform.osVersion >= 7) {
                        seek.config.viewer = "arcore"
                    } else {
                        seek.config.viewer = "webgl"
                    }
                }
                if (seek.config.icon) {
                    seek.setupIconCss()
                }
                if (seek.config.debug) {
                    alert(JSON.stringify(seek.state))
                }
                if (!seek.state.initialized) {
                    _addListeners()
                }
                seek.state.initialized = true;
                seek.bindLinks()
            }

            function addEventListener(event, cb) {
                if (!seek.state.listeners[event]) {
                    seek.state.listeners[event] = []
                }
                seek.state.listeners[event].push(cb)
            }

            function removeEventListener(event, cb) {
                var listeners = seek.state.listeners[event] || [];
                if (!cb || listeners.indexOf(cb) === -1) {
                    console.warn("Unable to remove callback");
                    return
                }
                listeners.splice(listeners.indexOf(cb), 1)
            }

            function _sendEvent(event, data) {
                if (seek.state.listeners[event]) {
                    seek.state.listeners[event].forEach(function(listener) {
                        listener(data)
                    })
                }
            }

            function _addListeners() {
                window.onbeforeunload = function() {
                    var iframe = document.getElementById(seek.config.iframeName);
                    if (iframe) {
                        _sendAnalyticsEvent(iframe.getAttribute("data-key"), "Closed", "webgl")
                    }
                };
                var fullscreenChange = function fullscreenChange(e) {
                    var iframe = document.getElementById(seek.config.iframeName);
                    if (!_isFullScreen(iframe)) {
                        _deleteIframe()
                    }
                };
                document.addEventListener("webkitfullscreenchange", fullscreenChange);
                document.addEventListener("mozfullscreenchange", fullscreenChange);
                document.addEventListener("fullscreenchange", fullscreenChange);
                window.addEventListener("message", function(event) {
                    var iframe = document.getElementById(seek.config.iframeName);
                    var key = iframe && iframe.getAttribute("data-key");
                    _sendEvent(event.data, key)
                }, false);
                seek.addEventListener("closeSeekViewer", function(key) {
                    _deleteIframe()
                });
                seek.addEventListener("modelLoaded", function(key) {
                    _sendAnalyticsEvent(key, "Downloaded", "webgl")
                });
                seek.addEventListener("loadedSeekViewer", function() {
                    seek.state.iframeLoaded = true
                })
            }

            function setupIconCss(icon_url) {
                if (!icon_url) {
                    icon_url = seek.config.icon
                }
                var style = document.createElement("style");
                style.innerHTML = "a.seekview_icon:after { " + 'content: ""; ' + "width: 32px; " + "height: 32px; " + "position: absolute; " + "display: block; " + "top: 5px; " + "right: 5px; " + "border-radius: 32px; " + "background-color: #fffc; " + "box-shadow: 0px 0px 10px #3334; " + "background-image: url(" + icon_url + "); " + "background-size: cover; " + "background-position: center; " + "}";
                document.body.appendChild(style)
            }

            function fixAnchorStyle(link) {
                link.style.position = "relative";
                link.style.display = "inline-block"
            }

            function _deleteIframe() {
                var iframe = document.getElementById(seek.config.iframeName);
                if (!iframe) {
                    return
                }
                _sendAnalyticsEvent(iframe.getAttribute("data-key"), "Closed", "webgl");
                if (iframe.loading_timeout) {
                    clearTimeout(iframe.loading_timeout)
                }
                iframe.parentNode.removeChild(iframe);
                document.body.style.overflow = seek.state.initialBodyOverflow;
                window.removeEventListener("onorientationchange", _calcVH, true);
                window.removeEventListener("resize", _calcVH, true)
            }

            function _createIframe(key, viewer_options) {
                _deleteIframe();
                _sendAnalyticsEvent(key, "Launched", "webgl");
                var options = "?";
                if (viewer_options && viewer_options.length) {
                    options += viewer_options.join("&")
                }
                if (seek.config.viewerOptions.length) {
                    options += seek.config.viewerOptions.join("&")
                }
                var url = _getViewerURL(key);
                if (options !== "?") {
                    url += options
                }
                var iframeStr = '<iframe id="' + seek.config.iframeName + '" src="' + url + '" ' + 'width="100%" height="100%" frameborder="0" title="3D Model Viewer"' + 'allowtransparency="true"' + 'data-key="' + key + '"></iframe>';
                var template = document.createElement("div");
                template.innerHTML = iframeStr;
                var iframe = template.firstChild;
                seek.state.iframeLoaded = false;
                iframe.loading_timeout = setTimeout(function() {
                    iframe.loading_timeout = null;
                    _deleteIframe();
                    console.error("Loading iframe timed out")
                }, 1e4);
                iframe.onload = function() {
                    setTimeout(function() {
                        if (!seek.state.iframeLoaded) {
                            _deleteIframe();
                            console.error("Error loading iframe")
                        }
                    }, 500);
                    clearTimeout(iframe.loading_timeout);
                    iframe.loading_timeout = null
                };
                if (seek.state.platform.os === "iOS") {
                    iframe.style.width = getComputedStyle(iframe).width;
                    iframe.style.height = getComputedStyle(iframe).height;
                    iframe.setAttribute("scrolling", "no")
                }
                return iframe
            }

            function _calcVH() {
                var vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                document.getElementById(seek.config.iframeName).style.height = vH + "px"
            }

            function _overlayIframe(iframe) {
                var top_offset = document.documentElement.scrollTop;
                var style = seek.config.iframeStyle + ("position: fixed; z-index: 999; " + "top: " + top_offset + "; bottom: 0; left: 0; right: 0;");
                iframe.setAttribute("style", style);
                _calcVH();
                document.body.style.overflow = "hidden";
                window.addEventListener("onorientationchange", _calcVH, true);
                window.addEventListener("resize", _calcVH, true)
            }

            function _canEnterFullScreen(elem) {
                elem = elem || document.documentElement;
                return (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) && (elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen)
            }

            function _isFullScreen(elem) {
                return (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement) === elem
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

            function _getPlatform(ua) {
                ua = ua || window.navigator.userAgent;

                function getiOSVersion() {
                    var match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                        version;
                    if (match !== undefined && match !== null) {
                        version = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3] || 0, 10)];
                        return parseFloat(version.join("."))
                    }
                    return 0
                }

                function getAndroidVersion(ua) {
                    ua = ua.toLowerCase();
                    var match = ua.match(/android\s([0-9\.]*)/);
                    var stringVersion = match ? match[1] : undefined;
                    if (stringVersion === undefined) {
                        return 0
                    }
                    return parseFloat(stringVersion)
                }

                var osFamily = "Unknown";
                var osVersion = 0;

                if (!!ua.match(/iPad/i) || !!ua.match(/iPhone/i)) {
                    osFamily = "iOS";
                    osVersion = getiOSVersion()

                } else if (!!ua.match(/android/i)) {
                    osFamily = "Android";
                    osVersion = getAndroidVersion(ua)
                }

                if (osFamily === "Unknown" && ua.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
                    osFamily = "iPadOS";
                    osVersion = 13.1
                }

                var browserName = "Unknown";
                var isWebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua);

                if (isWebview) {
                    browserName = "Webview"
                } else if ((osFamily === "iOS" || osFamily === "iPadOS") && !!ua.match(/WebKit/i)) {
                    if (!!ua.match(/FxiOS/i)) {
                        browserName = "Firefox"
                    } else if (!!ua.match(/CriOS/i)) {
                        browserName = "Chrome"
                    } else if (!!ua.match(/EdgiOS/i)) {
                        browserName = "Edge"
                    } else if (!!ua.match(/OPiOS/i)) {
                        browserName = "Opera"
                    } else {
                        browserName = "Safari"
                    }
                }
                return {
                    os: osFamily,
                    osVersion: osVersion,
                    browser: browserName
                }
            }

            function _getToken() {
                var scriptEl = seek.state.scriptEl || document.querySelector('script[src$="seek.min.js"]');
                return scriptEl.getAttribute("data-token")
            }

            function _getSessionId() {
                var _crypto = window.crypto || window.msCrypto;

                function uuidv4() {
                    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(c) {
                        return (c ^ _crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                    })
                }
                try {
                    if (!sessionStorage.getItem("seekview_session_id")) {
                        sessionStorage.setItem("seekview_session_id", uuidv4())
                    }
                    return sessionStorage.getItem("seekview_session_id") || uuidv4()
                } catch (e) {
                    console.warn("sessionStorage disabled.");
                    return uuidv4()
                }
            }

            function _getQueryParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return "";
                return decodeURIComponent(results[2].replace(/\+/g, " "))
            }

            function _open3dViewer(key, options) {
                var iframe;
                seek.state.initialBodyOverflow = document.body.style.overflow;
                var hostElement = options && options.hostElement || seek.config.iframeHostElement;
                if (hostElement && (!options || !options.fullscreen)) {
                    iframe = _createIframe(key, options);
                    hostElement.appendChild(iframe);
                    iframe.contentWindow.focus();
                    return
                } else if (_canEnterFullScreen()) {
                    iframe = _createIframe(key);
                    document.body.appendChild(iframe);
                    iframe.contentWindow.focus();
                    _enterFullScreen(iframe);
                    setTimeout(function() {
                        if (!_isFullScreen(iframe)) {
                            console.warn("Fullscreen failed");
                            if (seek.config.overlayEnabled) {
                                _overlayIframe(iframe)
                            }
                        }
                    }, 100)
                } else if (seek.config.overlayEnabled) {
                    iframe = _createIframe(key);
                    document.body.appendChild(iframe);
                    iframe.contentWindow.focus();
                    _overlayIframe(iframe)
                } else {
                    window.open(getModelPageURL(key), "_blank")
                }
            }

            function _setUpSimple3dViewer(links) {
                links.forEach(function(link) {
                    var key = link.getAttribute("data-seek");
                    link.href = getModelPageURL(key);
                    if (link.getAttribute("data-seek-ar-only")) {
                        link.href += "&viewer_options=viewAR";
                        link.setAttribute("target", "_blank")
                    } else {
                        link.addEventListener("click", function(e) {
                            e.preventDefault();
                            _open3dViewer(key)
                        })
                    }
                })
            }

            function _setUpIosArQuicklook(links) {
                links.forEach(function(link) {
                    var key = link.getAttribute("data-seek");
                    var quicklook_link = document.createElement("a");
                    link.setAttribute("href", getModelPageURL(key));
                    quicklook_link.setAttribute("href", _getModelURL(key, "usdz"));
                    quicklook_link.setAttribute("rel", "ar");
                    quicklook_link.appendChild(document.createElement("img"));
                    link.addEventListener("click", function(ev) {
                        ev.preventDefault();
                        _sendAnalyticsEvent(key, "Launched", "quicklook");
                        quicklook_link.click()
                    })
                })
            }

            function _setUpAndroidSeekView(links) {
                links.forEach(function(link) {
                    var key = link.getAttribute("data-seek");
                    link.setAttribute("href", getModelPageURL(key));
                    link.setAttribute("target", "_blank")
                })
            }

            function _viewAR(key, options) {
                if (!seek.state.initialized) {
                    seek.init()
                }
                if (seek.config.viewer === "quicklook") {
                    view(key)
                } else if (seek.config.viewer === "arcore") {
                    var failedToLaunch = false;
                    window.addEventListener("hashchange", function() {
                        if (window.location.hash.indexOf(seek.config.noARFlag) !== -1) {
                            window.history.replaceState("", document.title, window.location.href.replace(seek.config.noARFlag, ""));
                            failedToLaunch = true;
                            _sendEvent("viewARFailed", {
                                key: key,
                                error: getARUnsupportedMessage(true)
                            })
                        }
                    }, {
                        once: true
                    });
                    window.open(_getARCoreURL(key), "_self");
                    setTimeout(function() {
                        if (!failedToLaunch) {
                            _sendAnalyticsEvent(key, "Launched", "arcore")
                        }
                    }, 400)
                } else {
                    _sendEvent("viewARFailed", {
                        key: key,
                        error: getARUnsupportedMessage()
                    });
                    return getARUnsupportedMessage()
                }
            }

            function _launchAndroidExperience(key) {
                var failedToLaunch = false;
                window.addEventListener("hashchange", function() {
                    if (window.location.hash.indexOf(seek.config.noARFlagGoogle) !== -1) {
                        window.history.replaceState("", document.title, window.location.href.replace(seek.config.noARFlagGoogle, ""));
                        failedToLaunch = true;
                        _open3dViewer(key)
                    }
                }, {
                    once: true
                });
                window.open(_getGoogleViewerURL(key), "_self");
                setTimeout(function() {
                    if (!failedToLaunch) {
                        _sendAnalyticsEvent(key, "Launched", "arcore")
                    }
                }, 500)
            }

            function _setupAndroidArCore(links) {
                links.forEach(function(link) {
                    var key = link.getAttribute("data-seek");
                    link.setAttribute("href", getModelPageURL(key));
                    link.setAttribute("target", "_blank");
                    link.addEventListener("click", function(event) {
                        event.preventDefault();
                        _launchAndroidExperience(key)
                    })
                })
            }

            function injectSearchData(links) {
                var injectedKeys = [];
                links.forEach(function(link) {
                    var key = link.getAttribute("data-seek");
                    var modelName = link.getAttribute("data-search-name") || key;
                    var modelThumbnail = link.getAttribute("data-search-thumbnail") || _getModelURL(key, "jpg");
                    if (injectedKeys.indexOf(key) > -1) {
                        return
                    }
                    injectedKeys.push(key);
                    var ld = document.createElement("script");
                    ld.type = "application/ld+json";
                    var data = {
                        "@context": "http://schema.org/",
                        "@type": "3DModel",
                        image: modelThumbnail,
                        name: modelName,
                        encoding: [{
                            "@type": "MediaObject",
                            contentUrl: _getModelURL(key, "glb"),
                            encodingFormat: "model/gltf-binary"
                        }, {
                            "@type": "MediaObject",
                            contentUrl: _getModelURL(key, "usdz"),
                            encodingFormat: "model/vnd.usdz+zip"
                        }]
                    };
                    ld.innerHTML = JSON.stringify(data);
                    document.body.appendChild(ld)
                })
            }

            function view(key, viewer, options) {
                if (!seek.state.initialized) {
                    seek.init()
                }
                viewer = viewer || seek.config.viewer;
                if (viewer === "ar") {
                    return _viewAR(key, options)
                }
                if (viewer === "webgl") {
                    _open3dViewer(key, options)
                } else if (viewer === "quicklook") {
                    var quicklook_link = document.createElement("a");
                    quicklook_link.setAttribute("href", _getModelURL(key, "usdz"));
                    quicklook_link.setAttribute("rel", "ar");
                    quicklook_link.appendChild(document.createElement("img"));
                    _sendAnalyticsEvent(key, "Launched", "quicklook");
                    quicklook_link.click()
                } else if (viewer === "arcore") {
                    _launchAndroidExperience(key, options)
                } else {
                    console.error("Invalid viewer configuration")
                }
            }

            function bindLinks(links) {
                if (!seek.state.initialized) {
                    seek.init()
                }
                if (!seek.config.token) {
                    console.error("Seek.js: Missing company token");
                    return
                }
                if (!links) {
                    links = document.querySelectorAll("[data-seek]:not([seek-loaded])")
                }
                if (seek.config.viewer === "webgl") {
                    _setUpSimple3dViewer(links)
                } else if (seek.config.viewer === "quicklook") {
                    _setUpIosArQuicklook(links)
                } else if (seek.config.viewer === "arcore") {
                    _setupAndroidArCore(links)
                } else {
                    console.error("Invalid viewer configuration")
                }

                links.forEach(function(link) {
                    link.setAttribute("seek-loaded", true);
                    if (seek.config.icon && link.getElementsByTagName("img").length) {
                        link.classList.add("seekview_icon");
                        seek.fixAnchorStyle(link)
                    }
                });
                return links
            }

            function checkKey(key, cb) {
                if (!seek.config.token) {
                    console.error("Seek.js: Missing company token");
                    return
                }
                var keyCheck = new XMLHttpRequest;
                keyCheck.open("HEAD", _getModelURL(key));
                keyCheck.addEventListener("load", function(res) {
                    if (keyCheck.status === 404 || keyCheck.status === 400) {
                        cb(false)
                    } else {
                        cb(true)
                    }
                });
                keyCheck.send()
            }

            function getARUnsupportedMessage(ar_failed) {
                if (!seek.state.initialized) {
                    seek.init()
                }
                if (!ar_failed && seek.config.viewer !== "webgl") {
                    return
                }
                var instructions = {
                    code: "UNKNOWN_ERROR",
                    message: "Unknown AR Compatibility Status. If you continue to see this message, please contact support.",
                    link: window.location.href
                };
                if (seek.state.platform.os === "iOS") {
                    if (seek.state.platform.osVersion < 12.3) {
                        instructions.code = "UPGRADE_OS";
                        instructions.message = "Upgrade to iOS 12.3 or later and open this page in Safari!";
                        instructions.link = "https://support.apple.com/ios/update"
                    } else if (seek.state.platform.browser !== "Safari" && seek.state.platform.browser !== "Chrome") {
                        instructions.code = "BROWSER_UNSUPPORTED";
                        instructions.message = "Open this page in Chrome or Safari!"
                    }
                } else if (seek.state.platform.os === "Android") {
                    if (true || _androidIsWhitelisted) {
                        if (seek.state.platform.osVersion < 7) {
                            instructions.code = "UPGRADE_OS";
                            instructions.message = "Upgrade to Android 7.0 (Oreo) or later!";
                            instructions.link = "https://support.google.com/android/answer/7680439"
                        } else {
                            instructions.code = "INSTALL_APP";
                            instructions.message = "Install ARCore! Compatible device required.";
                            instructions.link = "https://play.google.com/store/apps/details?id=com.google.ar.core"
                        }
                    } else if (seek.state.platform.osVersion < 7) {
                        instructions.code = "DEVICE_UNSUPPORTED";
                        instructions.message = "This device is not supported by ARCore.";
                        instructions.link = ""
                    }
                } else {
                    instructions.code = "OS_UNSUPPORTED";
                    instructions.message = "Visit this page on an ARCore compatible Android device, or an iOS device with iOS 12.3+"
                }
                return instructions
            }

            function inject3dViewer(key, hostElement, options) {
                if (!seek.state.initialized) {
                    seek.init()
                }
                var iframe = _createIframe(key, options);
                hostElement.appendChild(iframe);
                iframe.contentWindow.focus()
            }

            function _getModelURL(key, format) {
                var asset_hash = "final";
                if (key.indexOf("|") > 0) {
                    var parts = key.split("|");
                    key = parts[0];
                    asset_hash = parts[1]
                }
                format = format || "glb";
                return seek.config.viewHost + "/" + seek.config.token + "/" + key + "/" + asset_hash + "." + format
            }

            function getModelPageURL(key) {
                if (!seek.state.initialized) {
                    seek.init()
                }
                var asset_hash = null;
                if (key.indexOf("|") > 0) {
                    var parts = key.split("|");
                    key = parts[0];
                    asset_hash = parts[1]
                }
                var url = seek.config.viewHost + "/" + seek.config.token + "/" + key + ".html";
                url += "?referrer=" + encodeURIComponent(seek.state.referrer);
                if (asset_hash !== null) {
                    url += "&asset_hash=" + asset_hash
                }
                if (seek.config.viewerOptions) {
                    url += "&viewer_options=" + seek.config.viewerOptions.join(",")
                }
                return url
            }

            function _getARCoreURL(key) {
                var fallback_url = encodeURIComponent(window.location.href + seek.config.noARFlag);
                var url = _getModelURL(key);
                var parts = url.split("://");
                parts[0] = "intent";
                url = parts.join("://");
                url += "#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;";
                url += "S.browser_fallback_url=" + fallback_url + ";end;";
                return url
            }

            function _getGoogleViewerURL(key) {
                var fallback_url = encodeURIComponent(window.location.href + seek.config.noARFlagGoogle);
                var url = _getModelURL(key);
                var parts = url.split("://");
                parts[0] = "intent";
                url = parts.join("://");
                url += "#Intent;scheme=https;package=com.google.android.googlequicksearchbox;";
                url += "S.browser_fallback_url=" + fallback_url + ";end;";
                return url
            }

            function _getViewerURL(key) {
                var asset_hash = null;
                if (key.indexOf("|") > 0) {
                    var parts = key.split("|");
                    key = parts[0];
                    asset_hash = parts[1]
                }
                var url = seek.config.viewHost + "/" + seek.config.token + "/" + key + "/viewer.html";
                if (asset_hash !== null) {
                    url += "?asset_hash=" + asset_hash
                }
                return url
            }

            function _showFeedbackModal(key, viewer) {
                if (!seek.config.feedbackModalEnabled) {
                    return
                }
                var backdrop = document.createElement("div");
                var modal = document.createElement("div");
                document.body.appendChild(backdrop);
                document.body.appendChild(modal);

                function cleanup() {
                    document.body.removeChild(backdrop);
                    document.body.removeChild(modal);
                    if (viewer !== "webgl") {
                        _sendAnalyticsEvent(key, "Closed", viewer)
                    }
                }
                backdrop.style = "position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1040; background-color: #000; opacity: 0.5;";
                backdrop.addEventListener("click", function() {
                    cleanup()
                });
                modal.innerHTML = "<h1>Rate your 3D Experience</h1>";
                modal.style = "z-index: 1050; position: relative; margin: auto; width: 300px; height: 300px; box-shadow: 0 5px 15px rgba(0,0,0,.5); border: 1px solid rgba(0,0,0,.2); border-radius: 6px; outline: 0; background-color: #fff";
                var good = document.createElement("button");
                good.innerHTML = "Good!";
                modal.appendChild(good);
                good.addEventListener("click", function() {
                    cleanup()
                });
                var bad = document.createElement("button");
                bad.innerHTML = "Bad :(";
                modal.appendChild(bad);
                bad.addEventListener("click", function() {
                    _sendAnalyticsEvent(key, "sad", viewer);
                    cleanup()
                })
            }

            function _sendAnalyticsEvent(key, event, viewer) {
                var asset_hash = "final";
                if (key.indexOf("|") > 0) {
                    var parts = key.split("|");
                    key = parts[0];
                    asset_hash = parts[1]
                }
                var xhr = new XMLHttpRequest;
                xhr.open("POST", seek.config.analyticsHost + "/analytics/", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                var data = {
                    created_at: (new Date).toISOString(),
                    event_type: event,
                    session_id: seek.state.sessionId,
                    company_token: seek.config.token,
                    model_key: key,
                    asset_hash: asset_hash,
                    viewer: viewer || seek.config.viewer,
                    referrer: seek.state.referrer
                };
                xhr.send(JSON.stringify([data]))
            }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}]
}, {}, [1]);
