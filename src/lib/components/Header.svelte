<script>
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  import siteData from '$lib/data/siteData.json';
  
  let mobileMenuOpen = false;
  let scrolled = false;
  
  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<header class:scrolled data-scrolled={scrolled} aria-label="Main navigation">
  <div class="container header-container">
    <div style="display:flex; align-items:center;">
      <div class="logo">
      <img 
        src="../The-nature-travels-logo.png" 
        alt="{siteData.company.name} Logo" 
        width="50" 
        height="50"
      />
      <p>The Nature Travels</p>
    </div>

    <!-- Mobile Menu Button -->

    </div>

    <!-- Desktop Navigation -->
    <nav class="desktop-nav" aria-label="Desktop navigation">
      <ul role="menubar">
        {#each siteData.navigation as item}
          <li role="none">
            <a href={item.href} role="menuitem" aria-label={`Navigate to ${item.name}`}>
              {item.name}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="header-buttons">
            <button 
            
        class="theme-toggle" 
        on:click={() => theme.toggle()}
        aria-label={$theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {#if $theme === 'light'}
          <i class="fas fa-moon" aria-hidden="true"></i>
        {:else}
          <i class="fas fa-sun" aria-hidden="true"></i>
        {/if}
      </button>

      <a 
        href="https://wa.me/917702991358" 
        class="whatsapp-icon" 
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
      </a>

          <button 
      class="mobile-menu-button"
      on:click={toggleMobileMenu}
      aria-expanded={mobileMenuOpen}
      aria-controls="mobile-menu"
      aria-label="Toggle mobile menu"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    </div>
  </div>

  <!-- Mobile Navigation -->
  {#if mobileMenuOpen}
    <div class="mobile-nav-overlay" on:click={closeMobileMenu}>
      <nav 
        id="mobile-menu" 
        class="mobile-nav" 
        aria-label="Mobile navigation"
        on:click|stopPropagation
      >
        <button 
          class="mobile-close-btn"
          on:click={closeMobileMenu}
          aria-label="Close mobile menu"
        >
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>

        <ul role="menubar">
          {#each siteData.navigation as item}
            <li role="none">
              <a 
                href={item.href} 
                role="menuitem"
                on:click={closeMobileMenu}
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  {/if}
</header>

<style>
  header {
    background: var(--primary);
    /* background: linear-gradient(135deg, #FF6B00, #FFD700, #00BFFF, #0074D9); */
     /* background: linear-gradient(to right, #FF6B00, #FFD700, #00BFFF); */
   /* background: linear-gradient(to bottom, #00BFFF, #0074D9, #0B132B); */
     padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: var(--shadow);
    transition: var(--transition);
  }
  
  header.scrolled {
    padding: 10px 0;
  }
  
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .logo img {
    height: 80px;
    width: 100px;
    margin-right: 10px;
  }
  
  /* .logo h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--dark);
  } */
  
  /* Desktop Navigation */
  .desktop-nav ul {
    display: flex;
    list-style: none;
  }
  
  .desktop-nav ul li {
    margin-left: 25px;
  }
  
  .desktop-nav ul li a {
    text-decoration: none;
    color: var(--dark);
    font-weight: 500;
    transition: var(--transition);
    padding: 8px 12px;
    border-radius: 4px;
  }
  
  .desktop-nav ul li a:hover,
  .desktop-nav ul li a:focus {
    color: var(--accent);
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .header-buttons {
    display: flex;
    align-items: center;
  }
  
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 20px;
    color: var(--dark);
    padding: 8px;
    border-radius: 50%;
    transition: var(--transition);
  }
  
  .theme-toggle:hover,
  .theme-toggle:focus {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
  
  .whatsapp-icon {
    font-size: 1.8rem;
    color: #25D366;
    transition: var(--transition);
    margin-right:20px;
  }
  
  .whatsapp-icon:hover,
  .whatsapp-icon:focus {
    transform: scale(1.1);
  }
  
  /* Mobile Menu Button */
  .mobile-menu-button {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .hamburger-line {
    width: 100%;
    height: 3px;
    background-color: var(--dark);
    border-radius: 2px;
    transition: var(--transition);
  }
  
  /* Mobile Navigation */
  .mobile-nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .mobile-nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100%;
    background: var(--primary);
    padding: 60px 20px 20px;
    transform: translateX(0);
    transition: transform 0.3s ease;
  }
  
  .mobile-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: var(--dark);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;
  }
  
  .mobile-nav ul {
    list-style: none;
  }
  
  .mobile-nav ul li {
    margin-bottom: 15px;
  }
  
  .mobile-nav ul li a {
    display: block;
    color: var(--dark);
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    padding: 12px 15px;
    border-radius: 4px;
    transition: var(--transition);
  }
  
  .mobile-nav ul li a:hover,
  .mobile-nav ul li a:focus {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--accent);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }
    
    .mobile-menu-button {
      display: flex;
    }
    
    .logo h1 {
      font-size: 1.5rem;
    }

.logo p{
font-size:10px;

}
  }

</style>

