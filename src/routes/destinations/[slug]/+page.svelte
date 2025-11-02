<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { error } from '@sveltejs/kit';
    
    let destination = null;
    let activeImage = 0;
    let activeSection = 'overview';
    
    onMount(async () => {
        try {
            const data = await import('$lib/data/siteData.json');
            const slug = $page.params.slug;
            destination = data.default.destinations[slug];
            
            if (!destination) {
                throw error(404, 'Destination not found');
            }
        } catch (err) {
            throw error(404, 'Destination not found');
        }
    });
    
    function nextImage() {
        activeImage = (activeImage + 1) % destination.gallery.length;
    }
    
    function prevImage() {
        activeImage = (activeImage - 1 + destination.gallery.length) % destination.gallery.length;
    }
    
    function setActiveSection(section) {
        activeSection = section;
    }
</script>

{#if destination}
    <!-- Hero Section -->
    <section class="destination-hero" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('{destination.heroImage}')">
        <div class="container">
            <div class="hero-content">
                <h1 class="destination-title">{destination.title}</h1>
                <p class="destination-description">{destination.description}</p>
                <div class="destination-meta">
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>{destination.location}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Best Time: {destination.bestTime}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>Duration: {destination.duration}</span>
                    </div>
                </div>
                <button class="cta-button" on:click={() => setActiveSection('itinerary')}>
                    <i class="fas fa-map-marked-alt"></i>
                    View Itinerary
                </button>
            </div>
        </div>
    </section>

    <!-- Navigation Tabs -->
    <section class="section-tabs">
        <div class="container">
            <nav class="destination-nav">
                <button 
                    class="nav-item {activeSection === 'overview' ? 'active' : ''}"
                    on:click={() => setActiveSection('overview')}
                >
                    <i class="fas fa-info-circle"></i>
                    Overview
                </button>
                <button 
                    class="nav-item {activeSection === 'itinerary' ? 'active' : ''}"
                    on:click={() => setActiveSection('itinerary')}
                >
                    <i class="fas fa-route"></i>
                    Itinerary
                </button>
                <button 
                    class="nav-item {activeSection === 'gallery' ? 'active' : ''}"
                    on:click={() => setActiveSection('gallery')}
                >
                    <i class="fas fa-images"></i>
                    Gallery
                </button>
                <button 
                    class="nav-item {activeSection === 'tips' ? 'active' : ''}"
                    on:click={() => setActiveSection('tips')}
                >
                    <i class="fas fa-lightbulb"></i>
                    Travel Tips
                </button>
            </nav>
        </div>
    </section>

    <!-- Overview Section -->
    {#if activeSection === 'overview'}
    <section class="section-overview">
        <div class="container">
            <div class="overview-grid">
                <div class="overview-content">
                    <h2>About {destination.title}</h2>
                    <p>{destination.description}</p>
                    
                    <div class="highlights-section">
                        <h3>Key Highlights</h3>
                        <div class="highlights-grid">
                            {#each destination.highlights as highlight}
                                <div class="highlight-card">
                                    <i class="fas fa-star"></i>
                                    <span>{highlight}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
                
                <div class="overview-sidebar">
                    <div class="info-card">
                        <h3>Quick Info</h3>
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <strong>Location</strong>
                                <span>{destination.location}</span>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-calendar-alt"></i>
                            <div>
                                <strong>Best Time to Visit</strong>
                                <span>{destination.bestTime}</span>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <strong>Recommended Duration</strong>
                                <span>{destination.duration}</span>
                            </div>
                        </div>
                        <button class="book-button">
                            <i class="fab fa-whatsapp"></i>
                            Book This Trip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/if}

<!-- Itinerary Section -->
{#if activeSection === 'itinerary'}
<section class="section-itinerary">
    <div class="container">
        <h2>Detailed Itinerary for {destination.title}</h2>
        <p class="itinerary-subtitle">Follow the connected journey through each day's activities</p>
        
        <div class="itinerary-days">
            {#each destination.itinerary as day, dayIndex}
                <div class="day-section">
                    <div class="day-header">
                        <div class="day-number">DAY {dayIndex + 1}</div>
                        <h3 class="day-title">{day.title}</h3>
                        <p class="day-description">{day.description}</p>
                    </div>
                    
                    <div class="timeline-vertical">
                        {#each day.timeline as point, pointIndex}
                            <div class="timeline-point {pointIndex === day.timeline.length - 1 ? 'last' : ''}">
                                <div class="point-connector">
                                    <div class="point-dot"></div>
                                    {#if pointIndex < day.timeline.length - 1}
                                        <div class="point-line"></div>
                                    {/if}
                                </div>
                                <div class="point-content">
                                    <div class="point-time">{point.time}</div>
                                    <h4 class="point-title">{point.title}</h4>
                                    <p class="point-description">{point.description}</p>
                                </div>
                            </div>
                        {/each}
                    </div>
                    
                    {#if dayIndex === 0}
                        <div class="day-image">
                            <img src={day.image} alt={day.title} />
                            <div class="image-caption">View</div>
                        </div>
                    {:else}
                        <div class="day-image">
                            <img src={day.image} alt={day.title} />
                            <div class="image-caption">Araku Valley Landscape</div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
        
        <!-- Package Details -->
        <div class="package-details">
            <div class="detail-section inclusions">
                <h3><i class="fas fa-check-circle"></i> Package Inclusions</h3>
                <ul>
                    {#each destination.inclusions as inclusion}
                        <li>{inclusion}</li>
                    {/each}
                </ul>
            </div>
            
            <div class="detail-section exclusions">
                <h3><i class="fas fa-times-circle"></i> Package Exclusions</h3>
                <ul>
                    {#each destination.exclusions as exclusion}
                        <li>{exclusion}</li>
                    {/each}
                </ul>
            </div>
        </div>
        
        <!-- Additional Information -->
        <div class="additional-info-grid">
            <div class="info-card activities">
                <h3><i class="fas fa-hiking"></i> Activities in {destination.title}</h3>
                <div class="activities-grid">
                    {#each destination.activities as activity}
                        <span class="activity-tag">{activity}</span>
                    {/each}
                </div>
            </div>
            
            <div class="info-card must-see">
                <h3><i class="fas fa-binoculars"></i> Must See Places</h3>
                <ul>
                    {#each destination.mustSeePlaces as place}
                        <li>{place}</li>
                    {/each}
                </ul>
            </div>
            
            <div class="info-card food">
                <h3><i class="fas fa-utensils"></i> Special Food to Try</h3>
                <div class="food-grid">
                    {#each destination.specialFood as food}
                        <span class="food-tag">{food}</span>
                    {/each}
                </div>
            </div>
            
            <div class="info-card travel">
                <h3><i class="fas fa-route"></i> How to Reach</h3>
                <ul>
                    {#each destination.howToReach as info}
                        <li>{info}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</section>
{/if}

    <!-- Gallery Section -->
    {#if activeSection === 'gallery'}
    <section class="section-gallery">
        <div class="container">
            <h2>{destination.title} Gallery</h2>
            
            <!-- Main Image Viewer -->
            <div class="gallery-viewer">
                <button class="gallery-nav prev" on:click={prevImage}>
                    <i class="fas fa-chevron-left"></i>
                </button>
                
                <div class="main-image">
                    <img src={destination.gallery[activeImage]} alt="Gallery image {activeImage + 1}" />
                </div>
                
                <button class="gallery-nav next" on:click={nextImage}>
                    <i class="fas fa-chevron-right"></i>
                </button>
                
                <div class="image-counter">
                    {activeImage + 1} / {destination.gallery.length}
                </div>
            </div>
            
            <!-- Thumbnail Grid -->
            <div class="thumbnail-grid">
                {#each destination.gallery as image, index}
                    <div 
                        class="thumbnail {index === activeImage ? 'active' : ''}" 
                        on:click={() => activeImage = index}
                    >
                        <img src={image} alt="Thumbnail {index + 1}" />
                    </div>
                {/each}
            </div>
        </div>
    </section>
    {/if}

    <!-- Travel Tips Section -->
    {#if activeSection === 'tips'}
    <section class="section-tips">
        <div class="container">
            <h2>Travel Tips for {destination.title}</h2>
            <div class="tips-grid">
                {#each destination.tips as tip, index}
                    <div class="tip-card">
                        <div class="tip-number">0{index + 1}</div>
                        <p>{tip}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>
    {/if}

    <!-- CTA Section -->
    <section class="section-cta">
        <div class="container">
            <div class="cta-content">
                <h2>Ready to Explore {destination.title}?</h2>
                <p>Book your unforgettable journey with Nature Travels and create memories that last a lifetime.</p>
                <div class="cta-buttons">
                    <a href="https://wa.me/917702991358" class="cta-button whatsapp" target="_blank">
                        <i class="fab fa-whatsapp"></i>
                        Book on WhatsApp
                    </a>
                    <a href="tel:+919030905443" class="cta-button call">
                        <i class="fas fa-phone"></i>
                        Call Us Now
                    </a>
                </div>
            </div>
        </div>
    </section>
{/if}

<style>
    /* Global Styles */
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    /* Hero Section */
    .destination-hero {
        height: 70vh;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        display: flex;
        align-items: center;
        color: white;
        position: relative;
    }

    .hero-content {
        max-width: 800px;
        text-align: center;
        margin: 0 auto;
    }

    .destination-title {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .destination-description {
        font-size: 1.3rem;
        margin-bottom: 2rem;
        opacity: 0.9;
        line-height: 1.6;
    }

    .destination-meta {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255,255,255,0.1);
        padding: 0.5rem 1rem;
        border-radius: 25px;
        backdrop-filter: blur(10px);
    }

    .meta-item i {
        color: #2A9D8F;
    }

    .cta-button {
        background: linear-gradient(135deg, #2A9D8F, #264653);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 30px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(42, 157, 143, 0.4);
    }

    /* Navigation Tabs */
    .section-tabs {
        background: #f8f9fa;
        padding: 1rem 0;
        position: sticky;
        top: 0;
        z-index: 100;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .destination-nav {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .nav-item {
        background: white;
        border: 2px solid #e9ecef;
        padding: 12px 24px;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    }

    .nav-item:hover {
        border-color: #2A9D8F;
        color: #2A9D8F;
    }

    .nav-item.active {
        background: #2A9D8F;
        color: white;
        border-color: #2A9D8F;
    }

    /* Overview Section */
    .section-overview {
        padding: 5rem 0;
        background: white;
    }

    .overview-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 3rem;
        align-items: start;
    }

    .overview-content h2 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: #264653;
    }

    .overview-content p {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 2rem;
        color: #6c757d;
    }

    .highlights-section h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #264653;
    }

    .highlights-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .highlight-card {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        color:#000;
    }

    .highlight-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .highlight-card i {
        color: #2A9D8F;
    }

    .overview-sidebar {
        position: sticky;
        top: 100px;
    }

    .info-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        border: 1px solid #e9ecef;
    }

    .info-card h3 {
        margin-bottom: 1.5rem;
        color: #264653;
        font-size: 1.3rem;
    }

    .info-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e9ecef;
    }

    .info-item i {
        color: #2A9D8F;
        margin-top: 0.2rem;
    }

    .info-item div {
        flex: 1;
    }

    .info-item strong {
        display: block;
        color: #264653;
        margin-bottom: 0.2rem;
    }

    .info-item span {
        color: #6c757d;
    }

    .book-button {
        width: 100%;
        background: #25D366;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .book-button:hover {
        background: #128C7E;
        transform: translateY(-2px);
    }

    /* Itinerary Section */
    .section-itinerary {
        padding: 5rem 0;
        background: #f8f9fa;
    }

    .section-itinerary h2 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 3rem;
        color: #264653;
    }

   /* Enhanced Itinerary Section */
.section-itinerary {
    padding: 5rem 0;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.itinerary-subtitle {
    text-align: center;
    color: #6c757d;
    font-size: 1.2rem;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.itinerary-days {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    max-width: 1000px;
    margin: 0 auto;
}

.day-section {
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    align-items: start;
}

.day-header {
    grid-column: 1 / -1;
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #e9ecef;
}

.day-number {
    background: linear-gradient(135deg, #2A9D8F, #264653);
    color: white;
    padding: 8px 20px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 1.1rem;
    display: inline-block;
    margin-bottom: 1rem;
}

.day-title {
    font-size: 2rem;
    color: #264653;
    margin-bottom: 0.5rem;
}

.day-description {
    color: #6c757d;
    font-size: 1.1rem;
    line-height: 1.6;
}

/* Vertical Timeline */
.timeline-vertical {
    position: relative;
}

.timeline-point {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
    position: relative;
}

.timeline-point.last {
    margin-bottom: 0;
}

.point-connector {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.point-dot {
    width: 16px;
    height: 16px;
    background: #2A9D8F;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 2px #2A9D8F;
    z-index: 2;
    flex-shrink: 0;
}

.point-line {
    width: 2px;
    flex: 1;
    background: #2A9D8F;
    opacity: 0.3;
    margin: 8px 0;
    min-height: 40px;
}

.point-content {
    flex: 1;
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 12px;
    border-left: 4px solid #2A9D8F;
    transition: all 0.3s ease;
}

.point-content:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(42, 157, 143, 0.2);
}

.point-time {
    background: #2A9D8F;
    color: white;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 0.5rem;
}

.point-title {
    font-size: 1.2rem;
    color: #264653;
    margin-bottom: 0.5rem;
}

.point-description {
    color: #6c757d;
    line-height: 1.5;
    margin: 0;
}

.day-image {
    position: sticky;
    top: 100px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.day-image img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.day-image:hover img {
    transform: scale(1.05);
}

.image-caption {
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 10px;
    text-align: center;
    font-size: 0.9rem;
}

/* Package Details */
.package-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 4rem 0;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    color:#000;
}

.detail-section {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.detail-section h3 {
    color: #264653;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.detail-section.inclusions h3 i {
    color: #2A9D8F;
}

.detail-section.exclusions h3 i {
    color: #E76F51;
}

.detail-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.detail-section li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #e9ecef;
    position: relative;
    padding-left: 1.5rem;
}

.detail-section.inclusions li:before {
    content: '✓';
    color: #2A9D8F;
    font-weight: bold;
    position: absolute;
    left: 0;
}

.detail-section.exclusions li:before {
    content: '✕';
    color: #E76F51;
    font-weight: bold;
    position: absolute;
    left: 0;
}

.detail-section li:last-child {
    border-bottom: none;
}

/* Additional Information Grid */
.additional-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
    color:#000;
}

.info-card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.info-card h3 {
    color: #264653;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.activities-grid, .food-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.activity-tag, .food-tag {
    background: #e3f2fd;
    color: #1976d2;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.food-tag {
    background: #f3e5f5;
    color: #7b1fa2;
}

.info-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.info-card li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #e9ecef;
    position: relative;
    padding-left: 1.2rem;
}

.info-card li:before {
    content: '•';
    color: #2A9D8F;
    font-weight: bold;
    position: absolute;
    left: 0;
}

.info-card li:last-child {
    border-bottom: none;
}

/* Responsive Design */
@media (max-width: 768px) {
    .day-section {
        grid-template-columns: 1fr;
    }
    
    .package-details {
        grid-template-columns: 1fr;
    }
    
    .additional-info-grid {
        grid-template-columns: 1fr;
    }
    
    .timeline-point {
        gap: 1rem;
    }
    
    .point-content {
        padding: 1rem;
    }
}

@media (max-width: 480px) {
    .day-section {
        padding: 1.5rem;
    }
    
    .day-title {
        font-size: 1.5rem;
    }
    
    .activities-grid, .food-grid {
        justify-content: center;
    }
}

    /* Gallery Section */
    .section-gallery {
        padding: 5rem 0;
        background: white;
    }

    .section-gallery h2 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 3rem;
        color: #264653;
    }

    .gallery-viewer {
        position: relative;
        max-width: 800px;
        margin: 0 auto 3rem;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    .main-image {
        height: 500px;
        overflow: hidden;
    }

    .main-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .gallery-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.9);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        color: #264653;
    }

    .gallery-nav:hover {
        background: white;
        transform: translateY(-50%) scale(1.1);
    }

    .gallery-nav.prev {
        left: 20px;
    }

    .gallery-nav.next {
        right: 20px;
    }

    .image-counter {
        position: absolute;
        bottom: 20px;
        right: 20px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 0.9rem;
    }

    .thumbnail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        max-width: 800px;
        margin: 0 auto;
    }

    .thumbnail {
        aspect-ratio: 1;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 3px solid transparent;
    }

    .thumbnail:hover {
        transform: scale(1.05);
    }

    .thumbnail.active {
        border-color: #2A9D8F;
    }

    .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Travel Tips Section */
    .section-tips {
        padding: 5rem 0;
        background: #f8f9fa;
    }

    .section-tips h2 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 3rem;
        color: #264653;
    }

    .tips-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 1000px;
        margin: 0 auto;
    }

    .tip-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        position: relative;
        transition: all 0.3s ease;
    }

    .tip-card:hover {
        transform: translateY(-5px);
    }

    .tip-number {
        position: absolute;
        top: -10px;
        left: -10px;
        background: #2A9D8F;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
    }

    .tip-card p {
        color: #6c757d;
        line-height: 1.6;
        margin: 0;
    }

    /* CTA Section */
    .section-cta {
        padding: 5rem 0;
        background: linear-gradient(135deg, #264653, #2A9D8F);
        color: white;
        text-align: center;
    }

    .cta-content h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .cta-content p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }

    .cta-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .cta-button.whatsapp {
        background: #25D366;
        color: white;
        text-decoration: none;
        padding: 15px 30px;
        border-radius: 30px;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    }

    .cta-button.call {
        background: white;
        color: #264653;
        text-decoration: none;
        padding: 15px 30px;
        border-radius: 30px;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .destination-title {
            font-size: 2.5rem;
        }
        
        .overview-grid {
            grid-template-columns: 1fr;
        }
        
        .timeline-item {
            justify-content: flex-start !important;
        }
        
        .timeline-content {
            flex-direction: column;
            gap: 1rem;
        }
        
        .timeline-marker {
            flex-direction: row;
        }
        
        .timeline-connector {
            width: 120px;
            height: 2px;
            margin: 0 10px;
        }
        
        .main-image {
            height: 300px;
        }
        
        .cta-buttons {
            flex-direction: column;
            align-items: center;
        }
    }

    @media (max-width: 480px) {
        .destination-title {
            font-size: 2rem;
        }
        
        .destination-meta {
            flex-direction: column;
            align-items: center;
        }
        
        .destination-nav {
            flex-direction: column;
        }
        
        .gallery-nav {
            width: 40px;
            height: 40px;
        }
    }
</style>