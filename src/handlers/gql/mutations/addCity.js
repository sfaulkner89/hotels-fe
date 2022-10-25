import { gql } from "@apollo/client";

export const CITY_ADD = gql(`
mutation addCity($name: String!, $stateId: Int!) {
    addCity(name: $name, stateId: $stateId) {
        id
    }
}`);
