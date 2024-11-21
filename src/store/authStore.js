import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import {jwtDecode} from "jwt-decode";

const useAuthStore = create(
    persist(
        (set, get) => ({
            token: null,
            user:null,
        
            setToken: (token) => {
                localStorage.setItem("token", token);
                const decoded = jwtDecode(token);
                set({ token, email: decoded.email, name: decoded.name, id:decoded.id });
            },
        
            logout: () => {              
                localStorage.removeItem("token");
                set({ token: null, user: null });
            },
        
            isAuthenticated: () => {
                return {
                    isAuth: !!get().token,
                    user: get().email,
                    name: get().name,
                    id: get().id,
                    token: get().token,
                }
            } ,
        
        }),
        {
          name: 'auth-storage', 
          storage: createJSONStorage(() => sessionStorage), 
        },
    )
   );

export default useAuthStore
