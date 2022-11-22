import API from "./API";

export async function openAccount(data) {
    try {
        const response = await API.post("/openFirstCheckingAccount", data);
        
        return { status: "sucess", data: response.data };
    } catch (error) {
        return error.message;
    }
}

export async function getTransactions(initialDate,finalDate) {
    try {
        const response = await API.post("/transactions", {

            initial_date: initialDate,
            final_date: finalDate,

        });
        
        return { status: "sucess", data: response.data };
    } catch (error) {
        return error.message;
    }
}

export async function makeTransference(data) {
    try {
        await API.post("/transference", data);

        return "sucess";
    } catch (error) {
        return error.message;
    }
}

export async function getBalance() {
    try {
        const response = await API.get("/consultBalance");
        
        return { status: "sucess", data: response.data.message };
    } catch (error) {
        return error.message;
    }
}

export async function userLogout() {
    try {
        await API.post("/logout");

        return "sucess";
    } catch (error) {
        return error.message;
    }
}



