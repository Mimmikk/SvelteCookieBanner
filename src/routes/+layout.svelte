<script>
    import Consentbanner from '$lib/components/consentBanner.svelte';
    import { consentStore } from '$lib/stores/consentStore';

    // Analytics
    $: analyticsConsented = $consentStore.analytics === 'accepted';
    
    // Third Party
    $: thirdPartyConsented = $consentStore.thirdParty === 'accepted';
    
    // Any status (for Required items)
    $: anyConsented = analyticsConsented || thirdPartyConsented;
</script>

<svelte:head>
    <!-- Regular: -->
    <script>always loaded script here</script>
    <!-- Load as long as there's any consent status (e.g. required, useful for legalities) -->
    {#if anyConsented}
        <script>script for users who accepted something</script>
    {:else}
        <script>alternative script for users who declined everything</script>
    {/if}
    {#if analyticsConsented}
      <!-- Analytics scripts -->
      <script>analytics scripts here</script>
    {/if}
    {#if thirdPartyConsented}
      <!-- Third party scripts -->
      <script>third party scripts here</script>
    {/if}
</svelte:head>

<Consentbanner />