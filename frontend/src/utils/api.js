import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
}); 


//Add a request interceptor
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({resolve, reject});
                })
                .then((token) => {
                    originalRequest.headers.Authorization = 'Bearer' + token;
                    return axios(originalRequest);
                })
                .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');
            try {
                const { data } = await axios.post('http://localhost:5000/api/auth/refresh', {refreshToken});
                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
                originalRequest.headers.Authorization = 'Bearer' + data.token;
                processQueue(null, data.token);
                return axios(originalRequest);
            } catch {
                processQueue(error, null);

                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
        }
    }
    return Promise.reject(error);
    }
);

export default apiClient;