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
    Promise.all([headPromise, headerPromise, footerPromise])
    .catch(error => {
        console.error('Error loading templates:', error);
    });
    
});

