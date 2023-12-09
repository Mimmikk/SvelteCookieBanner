<script>

    const cookieEnabled = true;
    $: showCookieModal = true;
	
    onMount(() => {
		const showCookie = localStorage.getItem('showCookieModal');
		if (showCookie !== null) showCookieModal = JSON.parse(showCookie);
		else showCookieModal = true;
	});
</script>

{#if showCookieModal && cookieEnabled}
<div class="cookieContainer">
    <div class="contentContainer">
        <span class="cookieText">This website uses <a href="privacy-policy">analytics and cookies</a> to improve content delivery.</span>
        <div
            class="closeButton"
            role="button"
            tabindex="0"
            on:keypress={() => {
                showCookieModal = false;
                localStorage.setItem('showCookieModal', 'false');
            }}
            on:click={() => {
                showCookieModal = false;
                localStorage.setItem('showCookieModal', 'false');
            }}
        >
            &#10005;
        </div>
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
    justify-content: center; /* Centers the content horizontally */
    align-items: center; /* Aligns content vertically */
    z-index: 9999;
    font-size: 14px;
    }

.contentContainer {
    display: inline-flex; /* Keeps text and close button inline */
    align-items: center;
    }

.cookieText {
    margin-right: 10px; /* Space between text and close button */
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
    background-color: #ff69b4; /* Lighter red on hover for the close button */
    color: #D4EDFF;
    }

.cookieContainer a {
    color: #aaa6a7; /* Light grey color for links */
    text-decoration: none; /* No underline by default */
    margin: 0 5px; /* Margin on the sides of links */
    background: none; /* No background color for links */
    cursor: pointer; /* Pointer cursor for clickable items */
    }

.cookieContainer a:hover {
    color: #ff69b4; /* Pink color on hover for links */
    }
</style>