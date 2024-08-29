/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', (event) => {
            const dropdownToggle = event.target.closest('.dropdown-toggle');
            if (!dropdownToggle && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Dropdown functionality for hover on larger screens
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');

    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 992) {
                const menu = this.querySelector('.dropdown-menu');
                menu.classList.add('show');
                this.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
            }
        });

        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 992) {
                const menu = this.querySelector('.dropdown-menu');
                menu.classList.remove('show');
                this.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
        });

        // Add click event listener for mobile view
        dropdown.querySelector('.dropdown-toggle').addEventListener('click', function (event) {
            if (window.innerWidth < 992) {
                event.preventDefault();
                const menu = this.nextElementSibling;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                menu.classList.toggle('show', isExpanded);
                this.setAttribute('aria-expanded', !isExpanded);

                // Stop the click event from bubbling up to the navbar toggler
                event.stopPropagation();
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.nav-item.dropdown')) {
            dropdowns.forEach(function (dropdown) {
                const menu = dropdown.querySelector('.dropdown-menu');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                menu.classList.remove('show');
                toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });
});



// email
var submitted = false;

function showSuccessMessage() {
    var successMessage = document.getElementById('submitSuccessMessage');
    var errorMessage = document.getElementById('submitErrorMessage');
    var emailInput = document.getElementById('emailAddress');

    if (submitted) {
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        emailInput.value = '';
        submitted = false;
    }
}

document.querySelectorAll('.image-row img').forEach(img => {
    img.addEventListener('click', () => {
        // Toggle the enlarged class on the clicked image
        img.classList.toggle('enlarged');
    });

    img.addEventListener('mouseleave', () => {
        // Remove the enlarged class when the mouse leaves the image
        img.classList.remove('enlarged');
    });
});

// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
