import { gql } from "@apollo/client";

export const STAY_ADD = gql(`
mutation addStay(
    $hotelId: Int!, 
    $date: String, 
    $notes: String, 
    $rating: Float,
    $price: Float) {
        addStay(hotelId: $hotelId, date:$date, notes: $notes, rating: $rating, price: $price) {
            hotelId
        }
    }`);
