<script>
  import { onMount } from 'svelte';

  import Hero from '$lib/components/Hero.svelte';
  import Destinations from '$lib/components/Destinations.svelte';
  import AnimationSection from '$lib/components/AnimationSection.svelte';
  import Seasonal from '$lib/components/Seasonal.svelte';
  import Services from '$lib/components/Services.svelte';
  import Vizag from '$lib/components/Vizag.svelte';
  import Highlights from '$lib/components/Highlights.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import Newsletter from '$lib/components/Newsletter.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Partners from '$lib/components/Partners.svelte';
  import DoubleScrolling from '$lib/components/DoubleScrolling.svelte';
  
  let currentTheme = 'light';
  
  function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  }
  
  onMount(() => {
    // Initialize animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate').forEach(el => {
      observer.observe(el);
    });
  });
</script>

<svelte:head>
  <title>Nature Travels - Best Travel Site for Southern India & Vizag Travel Packages</title>
  <meta name="description" content="Discover the best travel experiences with Nature Travels. Explore Southern India, Vizag travel packages, adventure tours, cultural experiences, and seasonal destinations." />
  <meta name="keywords" content="best travel site, vizag travel, southern india travel, nature travels, adventure tours, cultural experiences, travel packages, seasonal destinations, araku valley, borra caves, rk beach, kailasagiri, best travel agency, affordable travel packages" />
  <link rel="canonical" href="https://naturetravels.com" />
</svelte:head>

<Hero />
<Destinations />
<AnimationSection />
<Seasonal />
<Highlights />
<Services />
<Vizag />

<Partners/>
<DoubleScrolling/>
<Testimonials />

<Newsletter />
<Contact />
<FAQ />


<style>
  *{
    padding:0;
    margin:0;
    box-sizing: border-box;
  }
</style>