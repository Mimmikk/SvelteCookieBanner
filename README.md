# sveltecookiebanner
Cookie-consent banner for SvelteKit. Script is disabled until user presses Accept, if declines - no script (as expected).\
STRONGLY recommend creating your own style for this.

## Implementation
#### consentStore
Copy `$lib/stores/consentStore.ts` into your selected stores folder. This handles all scripting around localStorage and injecting of a localStorage item, which looks like this:
```json
{
  "consentState": {
    "analytics": "$STATE",
    "thirdParty": "$STATE",
    "expiry": "$DATE"
  }
}
```
You'll now be able to make a judgement based on `consentState` in the user's localStorage.
#### consentBanner
Select your preferred version, there are 2 premade versions:

- TailwindCSS `consentBannertwcss.svelte`
- CSS `consentBannercss.svelte`

There's also one barebones that only shows the required parts for easy implementation into an already existing version, `consentBanner.svelte`.\
This is requires some input on your part, but is very useful to see how the implementation works.

If you wish to not use preferences, I suggest viewing the previous versions. You can also simply remove the related code.

#### +layout
There are multiple ways to add the banner to your `+layout.svelte` depending on what you're trying to achieve.\
If you're simply wanting a consent banner that doesn't apply any scripts, see the example in `$routes/+layout.banneronly.svelte`.

However, if you're looking to actually implement scripting, cookies, etc. after a decision has been made by the user, see the example(s) in `$routes/+layout.svelte`.\
These are particularly useful as they natively support third party requirements such as Google Consent Mode. For an example of this, check out `$routes/+layout.gconsent.svelte`.\
For this feature, simply adjust what you require according to the various `consentStatus` states.