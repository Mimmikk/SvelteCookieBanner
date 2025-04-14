<script lang="ts">
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
    <section class="fixed max-w-2xl p-4 mx-auto bg-white border border-gray-200 md:gap-x-4 left-12 bottom-16 varsbg md:flex md:items-center dark:border-gray-700 rounded-2xl z-[99] cookieBanner">
      <div class="flex items-center gap-x-4">
        <span class="inline-flex p-2 text-blue-500 rounded-lg shrink-0 dark:bg-gray-800 bg-blue-100/80">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.9803 8.5468C17.5123 8.69458 17.0197 8.7931 16.5271 8.7931C14.2118 8.76847 12.3399 6.89655 12.3153 4.58128C12.3153 4.13793 12.3892 3.69458 12.537 3.27586C11.9951 2.68473 11.6995 1.92118 11.6995 1.13301C11.6995 0.812808 11.7488 0.492611 11.8473 0.172414C11.2315 0.0738918 10.6158 0 10 0C4.48276 0 0 4.48276 0 10C0 15.5172 4.48276 20 10 20C15.5172 20 20 15.5172 20 10C20 9.77833 20 9.55665 19.9754 9.33498C19.2611 9.26108 18.5468 8.99015 17.9803 8.5468ZM4.58128 7.31527C6.30542 7.31527 6.30542 10.0246 4.58128 10.0246C2.85714 10.0246 2.61084 7.31527 4.58128 7.31527ZM6.05912 15.7635C4.08867 15.7635 4.08867 12.8079 6.05912 12.8079C8.02956 12.8079 8.02956 15.7635 6.05912 15.7635ZM9.01478 1.33005C10.7389 1.33005 10.7389 4.28571 9.01478 4.28571C7.29064 4.28571 7.04434 1.33005 9.01478 1.33005ZM10.2463 8.84237C11.7241 8.84237 11.7241 10.8128 10.2463 10.8128C8.76848 10.8128 9.01478 8.84237 10.2463 8.84237ZM11.9704 16.9458C10.4926 16.9458 10.4926 14.9754 11.9704 14.9754C13.4483 14.9754 13.202 16.9458 11.9704 16.9458ZM16.6503 13.1034C15.4187 13.1034 15.4187 11.133 16.6503 11.133C17.8818 11.133 17.8818 13.1034 16.6503 13.1034Z" fill="currentColor"/>
            </svg>
        </span>
        <p class="text-sm text-gray-600 dark:text-gray-300">We utilize cookies and analytics to provide you with the best possible experience.<br /><a href="/cookie-policy" class="text-teal-500 hover:underline">Cookie Policy</a>. </p>
      </div>
      <div class="flex items-center mt-6 gap-x-4 shrink-0 lg:mt-0">
        <button class="text-xs underline transition-colors duration-300 dark:text-white hover:text-[#65c7bc] hover:bg-transparent focus:outline-none" id="cookieSettingsBtn" on:click={openSettings}>
          Preferences
        </button>
        <button class="text-xs font-medium bg-gray-800 rounded-lg text-white px-4 py-2.5 transition-colors focus:outline-none hover:bg-[#65c7bc]" on:click={declineAll}>
          Decline
        </button>
        <button class="text-xs font-medium bg-gray-800 rounded-lg text-white px-4 py-2.5 transition-colors focus:outline-none hover:bg-[#65c7bc]" on:click={acceptAll}>
          Accept
        </button>
      </div>
    </section>
  {/if}
  
  {#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99] cookieSettings">
    <div class="varsbg p-4 rounded-lg">
      <h2 class="text-lg">Cookie Settings</h2>
      <div class="flex flex-col">
        <div class="form-control w-72">
          <label class="cursor-pointer label">
            <span class="label-text">Strictly Necessary</span> 
            <input type="checkbox" class="toggle toggle-success" checked disabled />
          </label>
          <p class="pl-1.5 text-xs font-thin">We utilize essential cookies and storage technologies required for this website.<br />For further details, please refer to our <a href="/cookie-policy" class="text-purple-500 hover:underline">Cookie Policy</a>.</p>
        </div>
        <div class="form-control w-72">
            <label class="cursor-pointer label">
              <span class="label-text">Analytics</span> 
              <input type="checkbox" class="toggle toggle-success" id="consentAnalyticsSettings" bind:checked={analytics} />
            </label>
            <p class="pl-1.5 text-xs font-thin">Our analytics tools may involve third-party services that use cookies. <br />For further details, please refer to our <a href="/cookie-policy" class="text-purple-500 hover:underline">Analytics Policy and Information Page</a></p>
          </div>
          <div class="form-control w-72">
            <label class="cursor-pointer label">
              <span class="label-text">Other Third Party</span> 
              <input type="checkbox" class="toggle toggle-success" id="consentThirdPartySettings" bind:checked={thirdParty} />
            </label>
            <p class="pl-1.5 text-xs font-thin">Third-party cookies may be set by other platforms utilized by this website to optimize content delivery. <br />For further details, please refer to our <a href="/cookie-policy" class="text-purple-500 hover:underline">Cookie Policy</a>
            </p>
          </div> 
      </div>
        <div class="flex justify-center items-center gap-x-4 mt-6">
          <button class="text-xs font-medium bg-gray-800 rounded-lg text-white px-4 py-2.5 transition-colors focus:outline-none" on:click={closeSettings}>Cancel</button>
          <button class="text-xs font-medium bg-gray-800 rounded-lg text-white px-4 py-2.5 transition-colors focus:outline-none" on:click={saveSettings}>Save Choices</button>
        </div>
    </div>
  </div>
  {/if}