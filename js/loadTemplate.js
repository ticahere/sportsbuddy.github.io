document.addEventListener('DOMContentLoaded', function() {
    const headPromise = fetch('head.html').then(response => response.text()).then(data => {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = data;
        const templateContent = tempContainer.querySelector('template').content;
        document.head.appendChild(document.importNode(templateContent, true));
    });

    const headerPromise = fetch('header.html').then(response => response.text()).then(data => {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = data;
        const templateContent = tempContainer.querySelector('template').content;
        document.body.insertBefore(document.importNode(templateContent, true), document.body.firstChild);
    });

    const footerPromise = fetch('footer.html').then(response => response.text()).then(data => {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = data;
        const templateContent = tempContainer.querySelector('template').content;
        document.body.appendChild(document.importNode(templateContent, true));
    });

    // Parallel fetch of head, header, and footer
    Promise.all([headPromise, headerPromise, footerPromise]).catch(error => {
        console.error('Error loading templates:', error);
    });
    
});


function loadSocialShareButtons(postUrl, postTitle, twitterHandle) {
    const socialShareElement = document.getElementById('BlogSocialShare');
    if (!socialShareElement) {
        console.error('Element with id "BlogSocialShare" not found.');
        return;
    }
    socialShareElement.innerHTML = `
    Share
        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}&via=${twitterHandle}" target="_blank"><img src="images/X_logo.jpg"></a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}" target="_blank"><img src="images/LinkedIn.svg"></a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}" target="_blank"><img src="images/Facebook.svg"></a>
        <a href="https://www.instagram.com/sportsbuddyai/" target="_blank"><img src="images/Instagram.svg"></a>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .social-share {
            text-align: end;
            margin-top: 30px;
            margin-right:50px;
        }
        .social-share a {
            display: inline-block;
            padding: 10px;
            text-decoration: none;
            border-radius: 5px;
            color: #333;
            font-weight: bold;
        }
        .social-share a:hover {
            background-color: #e0e0e0;
        }
        .social-share img {
            width: 1.5rem;
        }
    `;

    document.head.appendChild(style);
    socialShareElement.className = 'social-share';
}