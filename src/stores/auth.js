import axios from "axios";
import { defineStore } from 'pinia'
export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || {
            
        },
    }),
    getters: {
        token(state) {
            return state.user?.token || ''
        },
    },
    actions: {
        async login(username, password) {
            try {
                const { data: respData } = await axios.post('http://localhost:8001/auth/login',
                    {
                        username: username,
                        password: password,
                    });
                this.user = respData;
                localStorage.setItem('user', JSON.stringify(respData));
                return respData;
            }
            catch (e) {
                console.log(e);
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
        }
    }
});

