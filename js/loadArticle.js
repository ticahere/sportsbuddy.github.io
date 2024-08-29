function loadArticle(article_name,lang) {
    fetch(`lang/blog/${article_name}_${lang}.json`)
    .then(response => response.json())
    .then(data => {
        // Set the title
        document.title = data.title;

        // Set the header background image
        document.querySelector('header.blog-post').style.backgroundImage = `url('${data.header.background_image}')`;

        // Set the header content
        const headingHTML = `<b class="post-heading-character">${data.header.heading.part1}</b><b>${data.header.heading.part2}</b>${data.header.heading.part3}`;
        document.querySelector('.post-heading').innerHTML = headingHTML;
        document.querySelector('.article-tag').textContent = data.header.tags.join(' • ');
        document.querySelector('.meta').textContent = data.header.date;

        // Set the article content
        const contentContainer = document.querySelector('article .container .article-container');
        contentContainer.innerHTML = `<p>${data.content.intro}</p>`;

        data.content.sections.forEach(section => {
            let sectionHTML = `<h2 class="section-heading">${section.heading}</h2>`;

            // Iterate through the keys of the section object in the order they are defined
            Object.keys(section).forEach(key => {
                if (key === 'subtitle') {
                    sectionHTML += `<h3 class="section-subtitle mt-5">${section.subtitle}</h3>`;
                }
                if (key === 'paragraphs') {
                    sectionHTML += section.paragraphs.map(p => `<p>${p}</p>`).join('');
                }

                if (key === 'paragraphs_2') {
                    sectionHTML += section.paragraphs_2.map(p => `<p>${p}</p>`).join('');
                }
                
                if (key === 'blockquote') {
                    sectionHTML += `<blockquote class="blockquote">${section.blockquote}</blockquote>`;
                }
                
                if (key === 'video') {
                    sectionHTML += `<video src="${section.video.src}" width="100%" controls></video>
                                    <span class="caption text-muted">${section.video.caption}</span>`;
                }
                // single full-width image
                if (key === 'image') { 
                    sectionHTML += `<div class="image-row row"><img src="${section.image}" class="img-fluid col-10" alt=""></div>`;
                }

                // multile images in a row
                if (key === 'images') { 
                    const imageHTML = section.images.map(img => `<div class="col-sm-12 col-lg-6"><img src="${img}" class="img-fluid" alt=""></div>`).join('');
                    sectionHTML += `<div class="image-row row">${imageHTML}</div>`;
                }
            });
            contentContainer.innerHTML += sectionHTML;
        });
        contentContainer.innerHTML += `<div id="BlogSocialShare"></div>`;
        // add social media share 
        loadSocialShareButtons(data.social.postURL, data.social.postTitle, "sportsbuddyai");
        // add more article buttn
        contentContainer.innerHTML +=  ` <div class="text-center mt-4">
            <a class="btn btn-primary btn-lg" href="/blog.html"><b>More Articles</b></a>
        </div>`;

    })
    .catch(error => console.error('Error loading article:', error));
}


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
            margin: 4rem 0px;
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
