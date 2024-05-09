# sveltecookiebanner
Cookie banner for SvelteKit. Script is disabled until user presses Accept, if declines - no script (as expected).

STRONGLY recommend creating your own stylization for this.

## Usage:

Copy `$lib/stores/consentStore.ts` into your own stores folder. This handles Local Storage file, this approach was due to my projects separating `<svelte:head>` and `$routes/+layout.svelte`. So if your project is similar, great! SvelteStores is the solution.

Copy the code from `$routes/+layout.svelte`. You obviously don't need all of it, there's a lot of placeholder styles left over from something else. Expand below to see.

<details>
Script part is required:
  
```svelte
<script>
	import { consentStore } from '$lib/stores/consentStore';

	let showBanner = false;
	$: showBanner = $consentStore === null;

	function handleConsent(decision) {
		consentStore.setConsent(decision);
	}
</script>
```

The actual banner:
```ts

 <div class="cookieContainer">
    <div class="contentContainer">
        <span class="cookieText">This website uses <a href="privacy-policy">analytics and cookies</a> to improve content delivery.</span>
		<button class="cookieAccept" type="button" on:click={() => handleConsent('accepted')} on:keypress={(e) => e.key === 'Enter' && handleConsent('accepted')}>Accept</button>
		<button class="cookieDecline" type="button" on:click={() => handleConsent('declined')} on:keypress={(e) => e.key === 'Enter' && handleConsent('declined')}>Decline</button>
    </div>
</div>
{/if}
```
The only parts really required for this, as you may want to change things is:
```ts
{#if showBanner}
		on:click={() => handleConsent('accepted')} on:keypress={(e) => e.key === 'Enter' && handleConsent('accepted')}
		on:click={() => handleConsent('declined')} on:keypress={(e) => e.key === 'Enter' && handleConsent('declined')}
{/if}
```
That means you can add this to whichever object suits you.
</details>


Finally, you'll want to actually add the scripts and other logic you want which might conflict with GDPR/Privacy. For example GA/GT4.

All parts are required. First `<script>`:
```ts
<script>
    import { consentStore } from '$lib/stores/consentStore';

    $: consented = $consentStore === 'accepted';
</script>
```

`<head>` tag:
```ts
<svelte:head>
    ....Your other config..
    {#if consented}
      <script>whatever scripts you have here</scripts>
      <script>and as many as you want</script>
    {/if}
</svelte:head>
```


And you're done!
