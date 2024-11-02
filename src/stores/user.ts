import { defineStore } from 'pinia';

export const useUserStore = defineStore('main', {
    state: () => ({
        user: {
            name: "Edwin"
        }, // Initialize user as null or an object
    }),
    persist: true,
    // getters:
    actions: {
        setUser(userData) {
            this.user = userData; // Ensure this.user is defined
        },
    },
});