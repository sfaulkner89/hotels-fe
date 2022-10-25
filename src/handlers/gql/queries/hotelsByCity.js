import { gql } from "@apollo/client";

export const HOTELS_BY_CITY = gql(`
query city($cityId: Int!) {
    city(cityId: $cityId) {
        hotels {
            name
            id
        }
    }
}
`);
