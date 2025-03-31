// Sample content data
const contentData = [
    {
        id: 1,
        title: "Stranger Things",
        type: "TV Show",
        genre: "Sci-Fi",
        poster: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d",
        year: 2016,
        rating: "TV-14",
        seasons: 4,
        description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
        cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder",
        match: 97
    },
    {
        id: 2,
        title: "The Witcher",
        type: "TV Show",
        genre: "Fantasy",
        poster: "https://images.unsplash.com/photo-1634224145156-5e5a7e5c5b1f",
        year: 2019,
        rating: "TV-MA",
        seasons: 2,
        description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
        cast: "Henry Cavill, Anya Chalotra, Freya Allan",
        match: 89
    },
    {
        id: 3,
        title: "Squid Game",
        type: "TV Show",
        genre: "Thriller",
        poster: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d",
        year: 2021,
        rating: "TV-MA",
        seasons: 1,
        description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
        cast: "Lee Jung-jae, Park Hae-soo, Wi Ha-joon",
        match: 95
    },
    {
        id: 4,
        title: "Money Heist",
        type: "TV Show",
        genre: "Crime",
        poster: "https://images.unsplash.com/photo-1634224145156-5e5a7e5c5b1f",
        year: 2017,
        rating: "TV-MA",
        seasons: 5,
        description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
        cast: "Úrsula Corberó, Álvaro Morte, Itziar Ituño",
        match: 93
    },
    {
        id: 5,
        title: "The Queen's Gambit",
        type: "TV Show",
        genre: "Drama",
        poster: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d",
        year: 2020,
        rating: "TV-MA",
        seasons: 1,
        description: "In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to stardom while grappling with addiction.",
        cast: "Anya Taylor-Joy, Bill Camp, Moses Ingram",
        match: 96
    }
];

// DOM Elements
const contentGrid = document.getElementById('content-grid');
const similarContent = document.getElementById('similar-content');
const watchlistBtn = document.getElementById('watchlist-btn');

// Get content by ID
function getContentById(id) {
    return contentData.find(item => item.id === parseInt(id));
}

// Get similar content (exclude current item)
function getSimilarContent(currentId) {
    return contentData.filter(item => item.id !== parseInt(currentId)).slice(0, 4);
}

// Render content grid
function renderContent() {
    if (contentGrid) {
        contentGrid.innerHTML = contentData.map(item => `
            <div class="content-card transition-all duration-300 cursor-pointer" data-id="${item.id}">
                <img src="${item.poster}" alt="${item.title}" 
                     class="w-full h-auto rounded-lg object-cover"
                     onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Not+Available'">
                <div class="mt-2">
                    <h3 class="font-semibold truncate">${item.title}</h3>
                    <div class="flex justify-between text-sm text-gray-400">
                        <span>${item.year}</span>
                        <span>${item.rating}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Render similar content
function renderSimilarContent(currentId) {
    if (similarContent) {
        const similar = getSimilarContent(currentId);
        similarContent.innerHTML = similar.map(item => `
            <div class="content-card transition-all duration-300 cursor-pointer" data-id="${item.id}">
                <img src="${item.poster}" alt="${item.title}" 
                     class="w-full h-auto rounded-lg object-cover"
                     onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Not+Available'">
                <div class="mt-2">
                    <h3 class="font-semibold truncate">${item.title}</h3>
                    <div class="flex justify-between text-sm text-gray-400">
                        <span>${item.year}</span>
                        <span>${item.rating}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Watchlist functionality
function toggleWatchlist(id) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const index = watchlist.indexOf(id);
    
    if (index === -1) {
        watchlist.push(id);
        if (watchlistBtn) {
            watchlistBtn.innerHTML = '<i class="fas fa-check"></i> My List';
            watchlistBtn.classList.remove('bg-gray-600');
            watchlistBtn.classList.add('bg-green-600');
        }
    } else {
        watchlist.splice(index, 1);
        if (watchlistBtn) {
            watchlistBtn.innerHTML = '<i class="fas fa-plus"></i> My List';
            watchlistBtn.classList.remove('bg-green-600');
            watchlistBtn.classList.add('bg-gray-600');
        }
    }
    
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

// Check if item is in watchlist
function isInWatchlist(id) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    return watchlist.includes(id);
}

// Render watchlist content
function renderWatchlist() {
    const watchlistContent = document.getElementById('watchlist-content');
    const emptyWatchlist = document.getElementById('empty-watchlist');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    if (watchlist.length === 0) {
        if (watchlistContent) watchlistContent.classList.add('hidden');
        if (emptyWatchlist) emptyWatchlist.classList.remove('hidden');
        return;
    }
    
    if (emptyWatchlist) emptyWatchlist.classList.add('hidden');
    if (watchlistContent) {
        watchlistContent.classList.remove('hidden');
        watchlistContent.innerHTML = watchlist.map(id => {
            const item = getContentById(id);
            if (!item) return '';
            return `
                <div class="content-card group relative transition-all duration-300 cursor-pointer" data-id="${item.id}">
                    <img src="${item.poster}" alt="${item.title}" 
                         class="w-full h-auto rounded-lg object-cover"
                         onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Not+Available'">
                    <div class="mt-2">
                        <h3 class="font-semibold truncate">${item.title}</h3>
                        <div class="flex justify-between text-sm text-gray-400">
                            <span>${item.year}</span>
                            <span>${item.rating}</span>
                        </div>
                    </div>
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div class="text-center p-4">
                            <h3 class="text-xl font-bold mb-2">${item.title}</h3>
                            <div class="flex justify-center gap-2 mb-2">
                                <span class="text-sm">${item.genre}</span>
                                <span class="text-sm">${item.type}</span>
                            </div>
                            <div class="flex justify-center gap-4">
                                <button class="bg-red-600 hover:bg-red-700 p-2 rounded-full">
                                    <i class="fas fa-play"></i>
                                </button>
                                <button class="bg-gray-600 hover:bg-gray-700 p-2 rounded-full">
                                    <i class="fas fa-info-circle"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderContent();
    
    // Handle content card clicks
    document.querySelectorAll('.content-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            window.location.href = `detail.html?id=${id}`;
        });
    });

    // Handle detail page functionality
    if (window.location.pathname.includes('detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const content = getContentById(id);
        
        if (content && watchlistBtn) {
            // Set watchlist button state
            if (isInWatchlist(content.id)) {
                watchlistBtn.innerHTML = '<i class="fas fa-check"></i> My List';
                watchlistBtn.classList.remove('bg-gray-600');
                watchlistBtn.classList.add('bg-green-600');
            }
            
            // Add watchlist button click handler
            watchlistBtn.addEventListener('click', () => {
                toggleWatchlist(content.id);
            });
            
            // Render similar content
            renderSimilarContent(id);
        }
    }

    // Handle watchlist page functionality
    if (window.location.pathname.includes('watchlist.html')) {
        renderWatchlist();
        
        // Handle clicks on watchlist items
        document.querySelectorAll('#watchlist-content .content-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                window.location.href = `detail.html?id=${id}`;
            });
        });
    }
});
