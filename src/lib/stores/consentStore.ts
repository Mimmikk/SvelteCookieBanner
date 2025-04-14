import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export type ConsentValue = 'accepted' | 'declined';

export interface ConsentState {
    analytics: ConsentValue;
    thirdParty: ConsentValue;
    expiry: string;
}

function createConsentStore() {
    const defaultState: ConsentState = {
        analytics: 'declined',
        thirdParty: 'declined',
        expiry: new Date(0).toISOString()
    };
    
    const { subscribe, set, update } = writable<ConsentState>(defaultState);

    if (browser) {
        // Initialize from localStorage
        const consentString = localStorage.getItem('consentState');
        if (consentString) {
            try {
                const savedState = JSON.parse(consentString);
                const expiry = new Date(savedState.expiry);
                
                if (new Date() <= expiry) {
                    set(savedState);
                }
            } catch (e) {
                // Fallback to default
            }
        }
    }

    return {
        subscribe,
        acceptAll: () => {
            const now = new Date();
            const expiry = new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000)); // 14 days
            
            const newState: ConsentState = {
                analytics: 'accepted',
                thirdParty: 'accepted',
                expiry: expiry.toISOString()
            };
            
            if (browser) {
                localStorage.setItem('consentState', JSON.stringify(newState));
            }
            
            set(newState);
        },
        declineAll: () => {
            const now = new Date();
            const expiry = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days
            
            const newState: ConsentState = {
                analytics: 'declined',
                thirdParty: 'declined',
                expiry: expiry.toISOString()
            };
            
            if (browser) {
                localStorage.setItem('consentState', JSON.stringify(newState));
            }
            
            set(newState);
        },
        savePreferences: (analytics: boolean, thirdParty: boolean) => {
            const now = new Date();
            const expiry = new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000)); // 14 days
            
            const newState: ConsentState = {
                analytics: analytics ? 'accepted' : 'declined',
                thirdParty: thirdParty ? 'accepted' : 'declined',
                expiry: expiry.toISOString()
            };
            
            if (browser) {
                localStorage.setItem('consentState', JSON.stringify(newState));
            }
            
            set(newState);
        },
        hasValidConsent: () => {
            if (!browser) return false;
            
            const consentString = localStorage.getItem('consentState');
            if (!consentString) return false;
            
            try {
                const savedState = JSON.parse(consentString);
                return new Date() <= new Date(savedState.expiry);
            } catch (e) {
                return false;
            }
        }
    };
}

export const consentStore = createConsentStore();