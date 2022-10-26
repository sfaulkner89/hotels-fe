import { gql } from "@apollo/client";

export const STAY_REMOVE = gql(`
mutation removeStay ($stayId: String!, $hotelId: Int!) {
        removeStay (stayId: $stayId, hotelId: $hotelId) {
            id
        }
    }`);
