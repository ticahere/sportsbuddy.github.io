// Function to update internal links with the current language parameter
function updateLinksWithLanguage(lang) {
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip updating if it's a hash link
        if (href && href.startsWith('#')) {
            return;
        }
        
        const url = new URL(link.href, window.location.origin);
        if (url.origin === window.location.origin) {  // Only modify internal links
            url.searchParams.set('lang', lang);
            link.href = url.toString();
        }
    });
}

// Function to get the current language from the URL or default to 'en'
function getLanguageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'en';
}

// Function to set the language and preserve other URL parameters
function setLanguage(lang) {
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set('lang', lang);  // Set or update the 'lang' parameter
    window.location.href = currentUrl.toString();  // Reload the page with the new URL
}

// Function to determine the current page based on the URL
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');  // Extract page name from URL
    return page || 'indexPage';  // Default to 'indexPage' if no specific page is found
}

// Function to apply translations to elements, including nested objects
function applyTranslation(element, translationData) {
    if (typeof translationData === 'string') {
        element.innerHTML = translationData;
    } else if (typeof translationData === 'object') {
        for (let key in translationData) {
            const childElement = element.querySelector(`[data-translate="${key}"], [data-dropdown="${key}"]`);
            if (childElement) {
                applyTranslation(childElement, translationData[key]);
            }
        }
    }
}

// Function to load content based on the selected language
function loadLanguageContent(lang) {
    const currentPage = getCurrentPage();  // Get the current page
    
    fetch(`lang/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            // Handle the header translation
            const headerData = data['header'];  // Get the header content
            if (headerData) {
                document.querySelectorAll('[data-translate]').forEach(elem => {
                    const key = elem.getAttribute('data-translate');
                    if (headerData[key]) {
                        applyTranslation(elem, headerData[key]);  // Use applyTranslation to handle nested objects
                    }
                });
            }
            // Handle the footer translation
            const footerData = data['footer'];  // Get the footer content
            if (footerData) {
                document.querySelectorAll('[data-translate]').forEach(elem => {
                    const key = elem.getAttribute('data-translate');
                    if (footerData[key]) {
                        applyTranslation(elem, footerData[key]);
                    }
                });
            }

             // Handle the specific page translation
            const pageData = data[currentPage];  // Get the content for the current page
            if (pageData) {
                document.querySelectorAll('[data-translate]').forEach(elem => {
                    const key = elem.getAttribute('data-translate');
                    if (pageData[key]) {
                        applyTranslation(elem, pageData[key]);  
                    }
                });
            }

            // Update links with the current language
            updateLinksWithLanguage(lang);
        });
}

// Function to handle hash links (e.g., #contact) correctly
function handleHashLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default behavior

            const hash = this.getAttribute('href'); // Get the hash value (e.g., #contact)
            if (hash && hash.startsWith('#')) {
                // Manually update the URL with the hash
                const currentUrl = new URL(window.location);
                currentUrl.hash = hash;

                // Update the URL without reloading the page
                history.pushState(null, '', currentUrl.toString());

                // Scroll to the element with the matching ID
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Initialize the language and hash links when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const lang = getLanguageFromUrl();
    loadLanguageContent(lang);
    
    // handleHashLinks();  // Attach hash link handlers
});
