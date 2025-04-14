<script>
    import { onMount } from 'svelte';
    import { consentStore } from '$lib/stores/consentStore';
    
    // QOL: Hide banner until localStorage is checked
    let showBanner = false;
    let showModal = false;
    let analytics = false;
    let thirdParty = false;
    
    onMount(() => {
      const hasConsent = consentStore.hasValidConsent();
      showBanner = !hasConsent;
      
      // Subscribe consentStore
      consentStore.subscribe((state) => {
        analytics = state.analytics === 'accepted';
        thirdParty = state.thirdParty === 'accepted';
      });
    });
    
    function acceptAll() {
      consentStore.acceptAll();
      showBanner = false;
    }
    
    function declineAll() {
      consentStore.declineAll();
      showBanner = false;
    }
    
    function openSettings() {
      showModal = true;
    }
    
    function closeSettings() {
      showModal = false;
    }
    
    function saveSettings() {
      consentStore.savePreferences(analytics, thirdParty);
      showBanner = false;
      showModal = false;
    }
</script>

{#if showBanner}
    on:click={openSettings}

    on:click={declineAll}
    on:click={acceptAll}
{/if}

{#if showModal}
    bind:checked={analytics}
    bind:checked={thirdParty}

    on:click={closeSettings}
    on:click={saveSettings}
{/if}