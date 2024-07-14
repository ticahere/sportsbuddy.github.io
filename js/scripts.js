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
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    //play video
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Try to play the video on load
        video.play().catch(error => {
            console.log('Autoplay was prevented:', error);
        });
        
        // Ensure the video plays when in view or on user interaction
        video.addEventListener('click', function() {
            video.play();
        });
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
document.querySelector('form').addEventListener('submit', function(event) {
    var emailInput = document.getElementById('emailAddress');
    var successMessage = document.getElementById('submitSuccessMessage');
    var errorMessage = document.getElementById('submitErrorMessage');
    var emailError = document.getElementById('emailError');

    if (!emailInput.checkValidity()) {
        emailError.style.display = 'block';
        event.preventDefault();
    } else {
        emailError.style.display = 'none';
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        setTimeout(function() {
            emailInput.value = '';
            successMessage.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }
});
