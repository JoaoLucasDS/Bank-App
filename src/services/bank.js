import API from "./API";

export async function getStoresList() {
    try {
        const response = await API.get("/giftCardTypes");
        const stores = [];

        response.data.forEach((type) => {
            type.gift_cards.forEach((giftCard) => {
                stores.push(giftCard);
            });
        });

        return { 
            status: "sucess", data: stores 
        };

    } catch (error) {
        return error.message;
    }
}

export async function buyGiftCard(giftCardId, value) {
    try {
        const response = await API.post("/buyGiftCard", {
            
            gift_card_id: 1,
            value: 21,

        });

        return { status: "sucess", data: "response.data.message" };

    } catch (error) {
        return error.message;
    }
}

