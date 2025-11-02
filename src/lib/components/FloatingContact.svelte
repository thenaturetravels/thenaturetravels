<script>
    let isOpen = false;
    
    // Direct phone numbers - no JSON dependency
    const contactData = {
        phone: '+919030905443', // Your phone number
        whatsapp: '917702991358' // Your WhatsApp number
    };
    
    function toggleMenu(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        isOpen = !isOpen;
    }
    
    function makeCall(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        const cleanPhone = contactData.phone.replace(/[^\d+]/g, '');
        window.open(`tel:${cleanPhone}`);
        isOpen = false;
    }
    
    function openWhatsApp(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        const cleanWhatsApp = contactData.whatsapp.replace(/\D/g, '');
        const message = 'Hello, I would like to get more information about your travel services.';
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${cleanWhatsApp}?text=${encodedMessage}`, '_blank');
        isOpen = false;
    }
    
    // Close menu when clicking outside
    function handleClickOutside(event) {
        if (!event.target.closest('.floating-contact')) {
            isOpen = false;
        }
    }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="floating-contact">
    <!-- Main Chat Button -->
    <button 
        class="floating-contact__main-btn {isOpen ? 'floating-contact__main-btn--active' : ''}"
        on:click={toggleMenu}
        aria-label="{isOpen ? 'Close contact menu' : 'Open contact menu'}"
        aria-expanded={isOpen}
    >
        {#if isOpen}
            <i class="fas fa-times"></i>
        {:else}
            <i class="fas fa-comment"></i>
        {/if}
    </button>

    <!-- Contact Options -->
    <div class="floating-contact__options {isOpen ? 'floating-contact__options--visible' : ''}">
        <!-- WhatsApp Button -->
        <button 
            class="floating-contact__option floating-contact__option--whatsapp"
            on:click={openWhatsApp}
            aria-label="Contact via WhatsApp"
        >
            <i class="fab fa-whatsapp"></i>
            <span class="floating-contact__tooltip">WhatsApp</span>
        </button>

        <!-- Call Button -->
        <button 
            class="floating-contact__option floating-contact__option--call"
            on:click={makeCall}
            aria-label="Make a phone call"
        >
            <i class="fas fa-phone"></i>
            <span class="floating-contact__tooltip">Call Us</span>
        </button>
    </div>
</div>

<style>
    .floating-contact {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
    }

    .floating-contact__main-btn {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--primary);
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(42, 157, 143, 0.4);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        z-index: 10;
    }

    .floating-contact__main-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 25px rgba(42, 157, 143, 0.6);
    }

    .floating-contact__main-btn--active {
        transform: rotate(180deg);
        background: linear-gradient(135deg, #E76F51, #E9C46A);
    }

    .floating-contact__main-btn--active:hover {
        transform: rotate(135deg) scale(1.1);
    }

    .floating-contact__options {
        position: absolute;
        bottom: 70px;
        right: 0;
        display: flex;
        flex-direction: column;
        gap: 15px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .floating-contact__options--visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .floating-contact__option {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
    }

    .floating-contact__option:hover {
        transform: scale(1.15);
    }

    .floating-contact__option--whatsapp {
        background: #25D366;
    }

    .floating-contact__option--call {
        background: #2A9D8F;
    }

    .floating-contact__tooltip {
        position: absolute;
        right: 60px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        pointer-events: none;
    }

    .floating-contact__tooltip::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -5px;
        transform: translateY(-50%);
        border-left: 5px solid rgba(0, 0, 0, 0.8);
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
    }

    .floating-contact__option:hover .floating-contact__tooltip {
        opacity: 1;
        visibility: visible;
    }

    /* Animation delays for staggered appearance */
    .floating-contact__options--visible .floating-contact__option:nth-child(1) {
        transition-delay: 0.1s;
    }

    .floating-contact__options--visible .floating-contact__option:nth-child(2) {
        transition-delay: 0.2s;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .floating-contact {
            bottom: 20px;
            right: 20px;
        }

        .floating-contact__main-btn {
            width: 55px;
            height: 55px;
            font-size: 1.3rem;
        }

        .floating-contact__option {
            width: 45px;
            height: 45px;
            font-size: 1.1rem;
        }

        .floating-contact__tooltip {
            font-size: 0.7rem;
            padding: 4px 8px;
        }
    }

    @media (max-width: 480px) {
        .floating-contact {
            bottom: 15px;
            right: 15px;
        }

        .floating-contact__main-btn {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
        }

        .floating-contact__option {
            width: 42px;
            height: 42px;
            font-size: 1rem;
        }
    }

    /* Accessibility */
    .floating-contact__main-btn:focus,
    .floating-contact__option:focus {
        outline: 3px solid rgba(42, 157, 143, 0.5);
        outline-offset: 2px;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .floating-contact__main-btn,
        .floating-contact__options,
        .floating-contact__option,
        .floating-contact__tooltip {
            transition: none;
        }
    }
</style>