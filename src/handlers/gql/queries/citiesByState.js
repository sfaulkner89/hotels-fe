import { gql } from "@apollo/client";

export const CITIES_BY_STATE = gql(`
query state($stateId: Int){
    state(stateId: $stateId) {
      cities {
        name
        id
      }
    }
  }`);
