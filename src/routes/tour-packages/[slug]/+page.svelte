<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { error } from '@sveltejs/kit';
    
    let destination = null;
    let selectedPackage = null;
    let showModal = false;
    
    onMount(async () => {
        try {
            const data = await import('$lib/data/siteData.json');
            const slug = $page.params.slug;
            destination = data.default.tourPackages[slug];
            
            if (!destination) {
                throw error(404, 'Destination not found');
            }
        } catch (err) {
            throw error(404, 'Destination not found');
        }
    });
    
    function openPackageModal(pkg) {
        selectedPackage = pkg;
        showModal = true;
    }
    
    function closePackageModal() {
        showModal = false;
        selectedPackage = null;
    }
    
    function openBookingModal() {
        if (selectedPackage) {
            showModal = false;
            // You can open a separate booking modal here or redirect to WhatsApp
            const message = `Hello, I want to book ${selectedPackage.title} package for ${selectedPackage.duration}. Please provide more details.`;
            window.open(`https://wa.me/917702991358?text=${encodeURIComponent(message)}`, '_blank');
        }
    }
</script>

{#if destination}
    <!-- Hero Section -->
    <section class="packages-hero" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('{destination.heroImage}')">
        <div class="container">
            <div class="hero-content">
                <h1>{destination.title}</h1>
                <p>{destination.description}</p>
            </div>
        </div>
    </section>

    <!-- Packages Grid Section -->
    <section class="packages-section">
        <div class="container">
            <h2>Available Packages</h2>
            <p class="section-subtitle">Choose the perfect package for your vacation</p>
            
            <div class="packages-grid">
                {#each destination.packages as pkg}
                    <div class="package-card">
                        <div class="package-badge">{pkg.discount}</div>
                        <div class="package-image">
                            <img src={pkg.image} alt={pkg.title} />
                        </div>
                        <div class="package-content">
                            <h3>{pkg.title}</h3>
                            <div class="package-duration">
                                <span><i class="fas fa-clock"></i> {pkg.duration}</span>
                                <span><i class="fas fa-moon"></i> {pkg.nights}</span>
                            </div>
                            <div class="package-highlights">
                                {#each pkg.highlights.slice(0, 3) as highlight}
                                    <span class="highlight-tag">{highlight}</span>
                                {/each}
                                {#if pkg.highlights.length > 3}
                                    <span class="highlight-tag more-tag">+{pkg.highlights.length - 3} more</span>
                                {/if}
                            </div>
                            <div class="package-price">
                                <span class="current-price">{pkg.price}</span>
                                <span class="original-price">{pkg.originalPrice}</span>
                                <span class="price-person">per person</span>
                            </div>
                            <button class="view-details-btn" on:click={() => openPackageModal(pkg)}>
                                <i class="fas fa-eye"></i>
                                View Details
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Package Details Modal -->
    {#if showModal && selectedPackage}
    <div class="modal-overlay" on:click={closePackageModal}>
        <div class="modal-content package-modal" on:click|stopPropagation>
            <button class="modal-close" on:click={closePackageModal}>
                <i class="fas fa-times"></i>
            </button>
            
            <!-- Modal Header -->
            <div class="modal-header">
                <div class="package-badge">{selectedPackage.discount}</div>
                <div class="modal-package-image">
                    <img src={selectedPackage.image} alt={selectedPackage.title} />
                </div>
                <div class="modal-package-basic">
                    <h2>{selectedPackage.title}</h2>
                    <div class="package-meta">
                        <span><i class="fas fa-clock"></i> {selectedPackage.duration}</span>
                        <span><i class="fas fa-moon"></i> {selectedPackage.nights}</span>
                    </div>
                    <div class="modal-price">
                        <span class="current-price">{selectedPackage.price}</span>
                        <span class="original-price">{selectedPackage.originalPrice}</span>
                        <span class="price-person">per person</span>
                    </div>
                </div>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <!-- Highlights -->
                <div class="modal-section">
                    <h3><i class="fas fa-star"></i> Package Highlights</h3>
                    <div class="highlights-grid">
                        {#each selectedPackage.highlights as highlight}
                            <div class="highlight-item">
                                <i class="fas fa-check-circle"></i>
                                <span>{highlight}</span>
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Itinerary -->
                <div class="modal-section">
                    <h3><i class="fas fa-route"></i> Itinerary</h3>
                    {#if selectedPackage.itinerary[0].time}
                        <!-- Day Trip Itinerary -->
                        <div class="timeline-modal">
                            {#each selectedPackage.itinerary as item}
                                <div class="timeline-item-modal">
                                    <div class="timeline-time">{item.time}</div>
                                    <div class="timeline-content">
                                        <div class="timeline-dot"></div>
                                        <div class="timeline-activity">{item.activity}</div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <!-- Multi-day Itinerary -->
                        <div class="day-itinerary-modal">
                            {#each selectedPackage.itinerary as day}
                                <div class="day-section-modal">
                                    <h4>{day.day}</h4>
                                    <ul>
                                        {#each day.activities as activity}
                                            <li>
                                                <i class="fas fa-circle"></i>
                                                {activity}
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>

                <!-- Inclusions & Exclusions -->
                <div class="inclusions-exclusions-grid">
                    <div class="modal-section">
                        <h3><i class="fas fa-check-circle"></i> What's Included</h3>
                        <ul class="inclusions-list">
                            {#each selectedPackage.inclusions as inclusion}
                                <li>
                                    <i class="fas fa-check"></i>
                                    {inclusion}
                                </li>
                            {/each}
                        </ul>
                    </div>

                    <div class="modal-section">
                        <h3><i class="fas fa-times-circle"></i> What's Not Included</h3>
                        <ul class="exclusions-list">
                            {#each selectedPackage.exclusions as exclusion}
                                <li>
                                    <i class="fas fa-times"></i>
                                    {exclusion}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
                <button class="book-now-modal-btn" on:click={openBookingModal}>
                    <i class="fab fa-whatsapp"></i>
                    Book Now on WhatsApp
                </button>
                <button class="call-now-btn" on:click={() => window.location.href = 'tel:+919030905443'}>
                    <i class="fas fa-phone"></i>
                    Call to Book
                </button>
            </div>
        </div>
    </div>
    {/if}
{/if}

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    /* Hero Section */
    .packages-hero {
        height: 50vh;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        color: white;
        position: relative;
    }

    .hero-content {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
    }

    .hero-content h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .hero-content p {
        font-size: 1.2rem;
        opacity: 0.9;
    }

    /* Packages Section */
    .packages-section {
        padding: 4rem 0;
        background: #f8f9fa;
    }

    .packages-section h2 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #264653;
    }

    .section-subtitle {
        text-align: center;
        color: #6c757d;
        margin-bottom: 3rem;
        font-size: 1.1rem;
    }

    .packages-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .package-card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
    }

    .package-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }

    .package-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #E76F51;
        color: white;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        z-index: 2;
    }

    .package-image {
        height: 200px;
        overflow: hidden;
    }

    .package-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .package-card:hover .package-image img {
        transform: scale(1.1);
    }

    .package-content {
        padding: 1.5rem;
    }

    .package-content h3 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: #264653;
    }

    .package-duration {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .package-duration span {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        color: #6c757d;
        font-size: 0.9rem;
    }

    .package-duration i {
        color: #2A9D8F;
    }

    .package-highlights {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .highlight-tag {
        background: #e3f2fd;
        color: #1976d2;
        padding: 4px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    .more-tag {
        background: #f0f0f0;
        color: #666;
    }

    .package-price {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .current-price {
        font-size: 1.5rem;
        font-weight: bold;
        color: #2A9D8F;
    }

    .original-price {
        font-size: 1rem;
        color: #6c757d;
        text-decoration: line-through;
    }

    .price-person {
        font-size: 0.8rem;
        color: #6c757d;
    }

    .view-details-btn {
        width: 100%;
        background: #2A9D8F;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .view-details-btn:hover {
        background: #264653;
        transform: translateY(-2px);
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
        backdrop-filter: blur(5px);
    }

    .package-modal {
        background: white;
        border-radius: 20px;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
    }

    .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(0,0,0,0.7);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }

    .modal-close:hover {
        background: rgba(0,0,0,0.9);
        transform: scale(1.1);
    }

    /* Modal Header */
    .modal-header {
        position: relative;
        border-radius: 20px 20px 0 0;
        overflow: hidden;
    }

    .modal-package-image {
        height: 250px;
        overflow: hidden;
    }

    .modal-package-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .modal-package-basic {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        color: white;
        padding: 2rem;
    }

    .modal-package-basic h2 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .package-meta {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1rem;
    }

    .package-meta span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
    }

    .modal-price {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .modal-price .current-price {
        font-size: 2rem;
        color: #ffd700;
        font-weight: bold;
    }

    .modal-price .original-price {
        font-size: 1.2rem;
        color: #ccc;
    }

    .modal-price .price-person {
        font-size: 0.9rem;
        color: #ccc;
    }

    /* Modal Body */
    .modal-body {
        padding: 2rem;
    }

    .modal-section {
        margin-bottom: 2.5rem;
    }

    .modal-section h3 {
        color: #264653;
        font-size: 1.3rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-bottom: 2px solid #2A9D8F;
        padding-bottom: 0.5rem;
    }

    .modal-section h3 i {
        color: #2A9D8F;
    }

    /* Highlights Grid */
    .highlights-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

    .highlight-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 0.8rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #2A9D8F;
    }

    .highlight-item i {
        color: #2A9D8F;
        font-size: 1.1rem;
    }

    .highlight-item span{
        color:#333;
    }

    /* Timeline for Modal */
    .timeline-modal {
        position: relative;
        padding-left: 2rem;
    }

    .timeline-item-modal {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        position: relative;
    }

    .timeline-time {
        background: #2A9D8F;
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        min-width: 80px;
        text-align: center;
        height: fit-content;
    }

    .timeline-content {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        flex: 1;
    }

    .timeline-dot {
        width: 12px;
        height: 12px;
        background: #2A9D8F;
        border-radius: 50%;
        margin-top: 6px;
        flex-shrink: 0;
    }

    .timeline-activity {
        color: #6c757d;
        line-height: 1.5;
        font-size: 1rem;
    }

    /* Multi-day Itinerary for Modal */
    .day-itinerary-modal {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .day-section-modal h4 {
        color: #264653;
        margin-bottom: 1rem;
        font-size: 1.2rem;
        background: #f8f9fa;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        border-left: 4px solid #2A9D8F;
    }

    .day-section-modal ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .day-section-modal li {
        padding: 0.8rem 0;
        color: #6c757d;
        display: flex;
        align-items: flex-start;
        gap: 0.8rem;
        border-bottom: 1px solid #f0f0f0;
    }

    .day-section-modal li:last-child {
        border-bottom: none;
    }

    .day-section-modal li i {
        color: #2A9D8F;
        font-size: 0.7rem;
        margin-top: 0.5rem;
    }

    /* Inclusions & Exclusions Grid */
    .inclusions-exclusions-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .inclusions-list, .exclusions-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .inclusions-list li, .exclusions-list li {
        padding: 0.8rem 0;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: flex-start;
        gap: 0.8rem;
        color:#333;
    }

    .inclusions-list li:last-child, .exclusions-list li:last-child {
        border-bottom: none;
    }

    .inclusions-list li i {
        color: #2A9D8F;
        margin-top: 0.2rem;
    }

    .exclusions-list li i {
        color: #E76F51;
        margin-top: 0.2rem;
    }

    /* Modal Footer */
    .modal-footer {
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 0 0 20px 20px;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .book-now-modal-btn, .call-now-btn {
        flex: 1;
        padding: 15px 20px;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        min-width: 200px;
    }

    .book-now-modal-btn {
        background: #25D366;
        color: white;
    }

    .book-now-modal-btn:hover {
        background: #128C7E;
        transform: translateY(-2px);
    }

    .call-now-btn {
        background: #2A9D8F;
        color: white;
    }

    .call-now-btn:hover {
        background: #264653;
        transform: translateY(-2px);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .packages-grid {
            grid-template-columns: 1fr;
        }
        
        .hero-content h1 {
            font-size: 2rem;
        }

        .package-modal {
            margin: 10px;
            max-height: 95vh;
        }

        .modal-package-basic h2 {
            font-size: 1.5rem;
        }

        .modal-price .current-price {
            font-size: 1.5rem;
        }

        .inclusions-exclusions-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .modal-footer {
            flex-direction: column;
        }

        .book-now-modal-btn, .call-now-btn {
            min-width: auto;
        }

        .highlights-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 480px) {
        .package-content {
            padding: 1rem;
        }
        
        .modal-body {
            padding: 1.5rem;
        }

        .modal-footer {
            padding: 1.5rem;
        }

        .package-meta {
            flex-direction: column;
            gap: 0.5rem;
        }

        .timeline-item-modal {
            flex-direction: column;
            gap: 0.5rem;
        }

        .timeline-time {
            align-self: flex-start;
        }
    }
</style>