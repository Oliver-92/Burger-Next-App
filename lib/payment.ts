import { OrderStatus } from "@/lib/types";

/**
 * Simulates a payment gateway response with a delay and specific probabilities.
 * 70% → "paid"
 * 20% → "failed"
 * 10% → "pending"
 */
export async function simulatePaymentResult(): Promise<OrderStatus> {
    // Generate a random delay between 2 and 3 seconds
    const delay = Math.floor(Math.random() * (3000 - 2000 + 1) + 2000);
    
    await new Promise((resolve) => setTimeout(resolve, delay));

    const random = Math.random();

    if (random < 0.7) {
        return "paid";
    } else if (random < 0.9) {
        return "failed";
    } else {
        return "pending";
    }
}
