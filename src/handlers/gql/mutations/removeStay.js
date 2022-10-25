import { gql } from "@apollo/client";

export const STAY_REMOVE = gql(`
mutation removeStay ($stayId: Int!, $hotelId: Int!) {
        removeStay (stayId: $stayId, hotelId: $hotelId) {
            id
        }
    }`);
