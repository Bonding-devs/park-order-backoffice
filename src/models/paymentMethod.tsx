export interface Card {
    brand: string;
    last4: string;
}

export interface PaymentMethod {
    id: string;
    card: Card;
}


export interface PaymentMethodResponse {
    data: PaymentMethod[];
    hasNextPage: boolean;
}
