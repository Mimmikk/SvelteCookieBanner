import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

type ConsentStatus = 'accepted' | 'declined' | null;

interface ConsentInfo {
    status: ConsentStatus;
    expiry: string;
}

function createConsentStore(): {
    subscribe: Writable<ConsentStatus>['subscribe'];
    setConsent: (consent: ConsentStatus) => void;
} {
    const { subscribe, set } = writable<ConsentStatus>(null);

    if (browser) {
        const initialize = (): void => {
            const consentString = localStorage.getItem('gdpr-consent');
            if (consentString) {
                const { status, expiry }: ConsentInfo = JSON.parse(consentString);
                if (new Date() > new Date(expiry)) {
                    set(null);
                } else {
                    set(status);
                }
            } else {
                set(null);
            }
        };

        initialize();
    }

    return {
        subscribe,
        setConsent: (consent: ConsentStatus): void => {
            if (!browser) return; // Ignore in SSR

            const now = new Date();
            const expiry = new Date(now.getTime() + (consent === 'accepted' ? 14256000 : 259200) * 1000);
            const consentInfo: ConsentInfo = { status: consent, expiry: expiry.toISOString() };
            localStorage.setItem('gdpr-consent', JSON.stringify(consentInfo));
            set(consent);
        }
    };
}

export const consentStore = createConsentStore();
