import { gql } from "@apollo/client";

export const HOTEL_ADD = gql(`
mutation addHotel(
    $name: String!, 
    $cityId: Int!, 
    $rating: Float, 
    $price: Float, 
    $lat: Float, 
    $lng: Float, 
    $notes: String,
    $firstStay: String
    ) {
    addHotel(
        name: $name, 
        cityId: $cityId, 
        rating: $rating, 
        price: $price, 
        lat: $lat, 
        lng: $lng, 
        notes: $notes,
        firstStay: $firstStay
        ) {
        id
    }
}`);
