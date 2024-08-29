// Load all blog previews dynamically with a responsive layout
function loadBlogPreviews(lang, cat=null, limit=null) {
    fetch(`lang/blog_preview_${lang}.json`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('blog-container');
            container.innerHTML = ''; // Clear the container

            // Helper function to generate HTML for each blog post
            function generateBlogHTML(item) {
                const leftColClass = item.category === "press" ? "col-lg-6" : "col-lg-4";
                const rightColClass = item.category === "press" ? "col-lg-6" : "col-lg-8";
            
                const articleHref = item.articleID ? `href="article.html?article=${item.articleID}"` : `href="${item.link}" target="_blank"`;

                return `
                <div id="${item.id}" class="blog-preview-wrapper mb-4"> <!-- Added wrapper div -->
                    <div class="card px-4 pt-3 blog-preview" data-category="${item.category}">
                        <div class="card-body">
                            <div class="mb-4">
                                <div class="row">
                                    <div class="col-7 d-flex"><p class="article-tag ${item.category}-tag">${item.tag}</p></div>
                                    <div class="col-5 d-flex justify-content-end"><p class="time-tag">${item.date}</p></div>
                                </div>
                                <h2 class="mb-3"><b>${item.title}</b></h2>
                                <p class="author-tag">${item.author}</p>
                            </div>
                            <div class="row flex justify-content-between">
                                <div class="${leftColClass} col-sm-12">
                                    <img src="${item.image}" class="card-img-top rounded-img" alt="...">
                                </div>
                                <div class="${rightColClass} col-sm-12 p-4">
                                    <p class="mb-0">
                                        ${item.content} <br/><br/>
                                        ${item.blockquote ? `<blockquote>${item.blockquote}</blockquote>` : ''}
                                    </p>
                                    <div class="text-end mt-5">
                                        <a class="btn btn-outline-primary" ${articleHref} data-translate="btn-article">Full Article</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            }

            // Combine all categories into a single array
            const allItems = [...data.press, ...data.articles, ...data.caseStudies];

            // Sort previews by ID in decreasing order (optional, depending on your need)
            allItems.sort((a, b) => {
                const idA = parseInt(a.id);
                const idB = parseInt(b.id);
                return idB - idA; // Sort in descending order
            });

            // Load and display the specified number of items based on the limit
            allItems.forEach((item, index) => {
                var count = 0;
                if (limit === null || count < limit) {
                    if (cat === null || cat==item.category){
                        container.innerHTML += generateBlogHTML(item);
                        count++;
                    } 
                }
            });

            attachFilterListeners();

            // Apply filter based on URL parameter if present
            const initialFilter = getQueryParam('filter');
            if (initialFilter) {
                filterBlogPreviews(initialFilter);
                document.querySelector(`.filter-btn[data-filter="${initialFilter}"]`).classList.add('active');
            }
        })
        .catch(error => console.error('Error loading content:', error));
}



// Function to filter blog previews based on category
function filterBlogPreviews(category) {
    const previews = document.querySelectorAll('.blog-preview');
    let matches = 0;

    previews.forEach(preview => {
        const parentDiv = preview.closest('.blog-preview-wrapper'); // Get the parent wrapper div
        if (category === 'all' || preview.dataset.category === category) {
            parentDiv.style.display = 'block'; // Show the matching previews
            matches++;
        } else {
            parentDiv.style.display = 'none'; // Hide the non-matching previews
        }
    });

    // Show or hide the "No results found" message
    const noResultsMessage = document.getElementById('no-results-message');
    if (matches === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }

    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
}

// Function to attach event listeners to filter buttons
function attachFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-filter');
            filterBlogPreviews(category);
            // Update the URL without reloading the page
            const newUrl = `${window.location.pathname}?filter=${category}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        });
    });
}
