<script>
	import { consentStore } from '$lib/stores/consentStore';

	let showBanner = false;
	$: showBanner = $consentStore === null;

	function handleConsent(decision) {
		consentStore.setConsent(decision);
	}
</script>

{#if showBanner}
<div class="cookieContainer">
    <div class="contentContainer">
        <span class="cookieText">This website uses <a href="privacy-policy">analytics and cookies</a> to improve content delivery.</span>
		<button class="cookieAccept" type="button" on:click={() => handleConsent('accepted')} on:keypress={(e) => e.key === 'Enter' && handleConsent('accepted')}>Accept</button>
		<button class="cookieDecline" type="button" on:click={() => handleConsent('declined')} on:keypress={(e) => e.key === 'Enter' && handleConsent('declined')}>Decline</button>
    </div>
</div>
{/if}


<style>

.cookieContainer {
    background-color: #111111;
    color: #D4EDFF;
    width: 100%;
    padding: 5px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    font-size: 14px;
    }

.contentContainer {
    display: inline-flex;
    align-items: center;
    }

.cookieText {
    margin-right: 10px;
    }

.closeButton {
    cursor: pointer;
    color: #ff69b4;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    margin: 0;
    border: none;
    transition: background-color 0.3s;
    }

.closeButton:hover {
    background-color: #ff69b4;
    color: #D4EDFF;
    }

.cookieContainer a {
    color: #aaa6a7;
    text-decoration: none; 
    margin: 0 5px;
    background: none;
    cursor: pointer;
    }

.cookieContainer a:hover {
    color: #ff69b4;
    }
</style>
