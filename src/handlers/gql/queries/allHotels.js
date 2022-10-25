import { gql } from "@apollo/client";

export const HOTELS_QUERY = gql(`
{
  hotels {
    id,
    name,
    firstStay,
    lastStay,
    lat,
    lng,
    stays {
      id,
      date,
      notes,
      rating,
      price
    },
    city {
        name
        state {
          name
        }
    }
  }
}`);
