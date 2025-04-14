<script>
    import Consentbanner from '$lib/components/consentBanner.svelte';
    import { consentStore } from '$lib/stores/consentStore';
    import { onMount } from 'svelte';

    // Analytics
    $: analyticsConsented = $consentStore.analytics === 'ACCEPTED';
    
    // Third Party
    $: thirdPartyConsented = $consentStore.thirdParty === 'ACCEPTED';
    
    // Google Consent Mode
    onMount(() => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'granted'
        });
    });

    // Google Consent update on consentStatus
    $: {
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push(function() {
                gtag('consent', 'update', {
                    'analytics_storage': analyticsConsented ? 'granted' : 'denied',
                    'ad_storage': thirdPartyConsented ? 'granted' : 'denied',
                    'functionality_storage': analyticsConsented || thirdPartyConsented ? 'granted' : 'denied',
                    'personalization_storage': thirdPartyConsented ? 'granted' : 'denied'
                });
            });
        }
    }
</script>

<!-- Google Tag Manager here -->
<svelte:head>
    <!-- Other scripts -->
</svelte:head>

<Consentbanner />