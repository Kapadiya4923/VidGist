import axios from "axios";

const API_Base = import.meta.env.VITE_API_BASE_URL;

export const validate_token = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token) return;

    try {
        const response = await axios.post(`${API_Base}/validate-token`, user, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        console.log(response)
        return response.data?.message
            
    } catch (error) {
        console.error("Error validating token:", error);
        return false
    }
}


export const login = async(email,password) => {
    try {
        console.log(email, password)
        const response = await axios.post(`${API_Base}/login`, { email:email, password:password }, {
            headers: { "Content-Type": "application/json" }
        });

        if (response.data.detail) {
            return false;
        } else {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            return true;
        }
        
    } catch (error) {
        console.error("Login failed:", error);
        return false;
    }
}




export const signup = async(username,email,password) => {
    try {

        const response = await axios.post(`${API_Base}/signup`, { username, email, password }, {
            headers: { "Content-Type": "application/json" }
        });

        if (response.data.detail) {
            return false
        } else {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log(response.data.user);
            return true
        }

        
    } catch (error) {
        console.error("Signup failed:", error);
        return false;
    }
}



export const summaryDetail = async (link) => {
    try {

        const response = await axios.post(`${API_Base}/summary`, { link }, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data

        
    } catch (error) {
        console.error("summary processin failed:", error);
        return response.data.detail
    }
}

export const summaryStatus = async(id)=>{
    try {

        const response = await axios.get(`${API_Base}/status/${id}`, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data

        
    } catch (error) {
        console.error("summary processin failed:", error);
        return response.data.detail
    }
}


export const chatbot = async (input,id) => {
    let que={"que":input}
    try{
        const response = await axios.post(`${API_Base}/chat/${id}`, que, {
            headers:{"Content-Type":"application/json"}
        });
         return response.data.answer
    } catch(error)
    {
        console.error("summary processin failed:", error);
    }

}