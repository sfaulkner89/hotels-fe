import { gql } from "@apollo/client";

export const STATE_ADD = gql(`
mutation addState($name: String!) {
    addState(name: $name) {
        id
    }
}
`);
