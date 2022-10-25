import { gql } from "@apollo/client";

export const HOTELS_BY_STATE = gql(`
query hotelsByState($state: String!) {
    stateByName(state: $state) {
        cities {
            hotels {
                id,
                name,
                firstStay,
                lastStay,
                lat,
                lng,
                city {
                    name
                    state {
                        name
                    }
                }
                stays {
                id,
                date,
                notes,
                rating,
                price
                }
            }    
        }
    }
}`);
