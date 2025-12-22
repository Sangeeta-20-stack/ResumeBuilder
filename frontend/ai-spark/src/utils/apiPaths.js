export const BASE_URL="https://cv-spark-backend.onrender.com";

//util/apiPaths.js
export const API_PATHS={
    AUTH:{
        REGISTER:"/api/auth/register",   //sign up
        LOGIN:"/api/auth/login",   //login
        GET_PROFILE:"/api/auth/profile",  //get looged-in user details
    },

    RESUME:{
        CREATE:"/api/resume", //create resume : POST
        GET_ALL:"/api/resume", // GET: get all resumes of logged in user
        GET_BY_ID:(id) => `/api/resume/${id}`,  //GET : get a specific resume
        UPDATE:(id) =>`/api/resume/${id}`,    //PUT: update a resume
        DELETE:(id) => `/api/resume/${id}`,  // DELETE: delete a resume
        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`, //PUT: upload thumbnail and resume profile image
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image",
    },

};
