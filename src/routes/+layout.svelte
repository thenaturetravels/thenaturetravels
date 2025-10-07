<script>
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  import '../app.css';

  onMount(() => {
    theme.init();
  });
</script>

<svelte:head>
  <title>Nature Travels - Best Travel Site for Southern India & Vizag Travel Packages</title>
  <meta name="description" content="Discover the best travel experiences with Nature Travels. Explore Southern India, Vizag travel packages, adventure tours, cultural experiences, and seasonal destinations." />
  <meta name="keywords" content="best travel site, vizag travel, southern india travel, nature travels, adventure tours, cultural experiences, travel packages, seasonal destinations, araku valley, borra caves, rk beach, kailasagiri, best travel agency, affordable travel packages" />
  <meta property="og:title" content="Nature Travels - Best Travel Site for Southern India" />
  <meta property="og:description" content="Your trusted travel partner for unforgettable journeys in Southern India and Vizag." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</svelte:head>

<div class="app">
  <slot />
</div>