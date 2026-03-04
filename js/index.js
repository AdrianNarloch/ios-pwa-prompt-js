const DISMISSED_STORAGE_KEY = "ios-pwa-prompt-dismissed";
const BODY_NO_SCROLL_CLASS = "noScroll";

const nodeElements = {
    mainBtn: document.querySelector('[data-action="open-pwa-prompt"]'),
    iosPwaPromptOverlay: document.querySelector("[data-pwa-overlay]"),
    iosPwaPromptContainer: document.querySelector("[data-pwa-container]"),
    iosPwaPromptBtn: document.querySelector('[data-action="close-pwa-prompt"]')
};

function safeGetFromStorage(key) {
    try {
        return window.localStorage.getItem(key);
    } catch (error) {
        return null;
    }
}

function safeSetInStorage(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch (error) {
        // Ignore storage failures (private mode, blocked storage).
    }
}

function isIosDevice() {
    const isAppleMobile = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    const isIpadOs = window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;
    return isAppleMobile || isIpadOs;
}

function isSafariBrowser() {
    const ua = window.navigator.userAgent;
    const hasSafari = /Safari/i.test(ua);
    const isExcluded = /CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|GSA/i.test(ua);
    return hasSafari && !isExcluded;
}

function isStandaloneMode() {
    const byNavigator = window.navigator.standalone === true;
    const byDisplayMode = window.matchMedia("(display-mode: standalone)").matches;
    return byNavigator || byDisplayMode;
}

function hasDismissedPrompt() {
    return safeGetFromStorage(DISMISSED_STORAGE_KEY) === "1";
}

function shouldShowPrompt() {
    return isIosDevice() && isSafariBrowser() && !isStandaloneMode() && !hasDismissedPrompt();
}

function openPrompt() {
    const { iosPwaPromptOverlay, iosPwaPromptContainer } = nodeElements;
    iosPwaPromptOverlay.classList.remove("ios-pwa-prompt__overlay--hidden");
    iosPwaPromptContainer.classList.remove("ios-pwa-prompt__container--hidden");
    iosPwaPromptOverlay.classList.add("ios-pwa-prompt__overlay--visible");
    iosPwaPromptContainer.classList.add("ios-pwa-prompt__container--visible");
    document.body.classList.add(BODY_NO_SCROLL_CLASS);
}

function closePrompt({ persistDismissal = false } = {}) {
    const { iosPwaPromptOverlay, iosPwaPromptContainer } = nodeElements;
    iosPwaPromptOverlay.classList.remove("ios-pwa-prompt__overlay--visible");
    iosPwaPromptContainer.classList.remove("ios-pwa-prompt__container--visible");
    iosPwaPromptOverlay.classList.add("ios-pwa-prompt__overlay--hidden");
    iosPwaPromptContainer.classList.add("ios-pwa-prompt__container--hidden");
    document.body.classList.remove(BODY_NO_SCROLL_CLASS);

    if (persistDismissal) {
        safeSetInStorage(DISMISSED_STORAGE_KEY, "1");
    }
}

function bindEvents() {
    const {
        mainBtn,
        iosPwaPromptOverlay,
        iosPwaPromptContainer,
        iosPwaPromptBtn
    } = nodeElements;

    if (!mainBtn || !iosPwaPromptOverlay || !iosPwaPromptContainer || !iosPwaPromptBtn) {
        return;
    }

    mainBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        openPrompt();
    });

    iosPwaPromptOverlay.addEventListener("click", function (event) {
        event.stopPropagation();
        closePrompt({ persistDismissal: true });
    });

    iosPwaPromptBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        closePrompt({ persistDismissal: true });
    });

    iosPwaPromptContainer.addEventListener("click", function (event) {
        event.stopPropagation();
    });
}

window.addEventListener("DOMContentLoaded", function () {
    bindEvents();

    if (!shouldShowPrompt()) {
        return;
    }

    window.setTimeout(function () {
        openPrompt();
    }, 1000);
});
