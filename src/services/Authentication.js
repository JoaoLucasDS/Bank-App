import API from "./API";

export async function login(data) {
    try {
        const response = await API.post("/login", data);
        
        return { 
            status: "sucess", data: response.data.token 
        };
    } catch (error) {
        return error.message;
    }
}

export async function authenticated() {
    try {
        const response = await API.get("/authenticated");

        return { 
            status: "sucess", data: response.data 
        };
    } catch (error) {
        return error.message;
    }
}

