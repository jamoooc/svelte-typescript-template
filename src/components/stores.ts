import { writable } from 'svelte/store';

export const loading = writable(false);
export const toggleMobileNav = writable(false);
export const adminAuthenticated = writable(true);
export const csrfToken = writable('');
