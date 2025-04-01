import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

const useAuthStore = create()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,
      isHydrated: false,

      setHydrated: () => set({ isHydrated: true }),

      login: async ({ username, email, password }) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Login failed');
          }

          set({
            accessToken: data.data.access,
            refreshToken: data.data.refresh,
            loading: false,
          });
          
          return data;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            loading: false 
          });
          throw error;
        }
      },

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
        });
        localStorage.removeItem('auth-storage');
      },

      refreshAuth: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          get().logout();
          throw new Error('No refresh token available');
        }

        set({ loading: true });
        try {
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to refresh token');
          }

          set({
            accessToken: data.data.access,
            refreshToken: data.data.refresh || refreshToken,
            loading: false,
          });
          
          return data.data.access;
        } catch (error) {
          set({ loading: false });
          get().logout();
          throw error;
        }
      },

      checkAuth: async () => {
        const { accessToken, refreshAuth } = get();
        
        if (!accessToken) return false;

        try {
          const decoded = jwtDecode(accessToken);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            const newToken = await refreshAuth();
            return !!newToken;
          }
          
          return true;
        } catch (error) {
          console.error('Token validation failed:', error);
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

export default useAuthStore;