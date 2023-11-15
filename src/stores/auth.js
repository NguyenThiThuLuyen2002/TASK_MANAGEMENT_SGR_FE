    import axios from "axios";
    import { defineStore } from 'pinia'
    export const useAuthStore = defineStore({
        id: 'auth',
        bearToken: '',
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
                    const { data: respData } = await axios.post('http://54.196.242.13/auth/login',
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
            },
            getBearerToken() {
                const jwt = localStorage.getItem('accessToken');
                if (jwt && jwt.startsWith('"') && jwt.endsWith('"')) {
                  const cleanedJwt = jwt.substring(1, jwt.length - 1);
                  return "Bearer " + cleanedJwt;
                }
                return '';
              },
        }
    });

