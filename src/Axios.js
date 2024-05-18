// import axios from "axios"
//  axios.defaults.baseURL = "http://localhost:5000";
// //axios.defaults.baseURL = "https://recipe-backend-jcxr.onrender.com/"
// axios.interceptors.request.use(
// 	(config) => {
// 		const token = localStorage.getItem("token")
// 		const auth = token ? `Bearer ${token}` : ""
// 		if (config.headers) {
// 			config.headers.Authorization = auth
// 		}
// 		return config
// 	},
// 	(error) => Promise.reject(error)
// )

// export default axios

import axios from "axios";

//axios.defaults.baseURL = "http://localhost:5000";
 axios.defaults.baseURL = "https://recipeappbackend4.onrender.com/";
// axios.defaults.baseURL = "https://recipe-backend-jcxr.onrender.com/";

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const auth = token ? `Bearer ${token}` : "";
        if (config.headers) {
            config.headers.Authorization = auth;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axios;
