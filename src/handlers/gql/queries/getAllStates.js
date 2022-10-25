import { gql } from "@apollo/client";

export const ALL_STATES = gql(`
{
  states {
    name,
    id
  }
}`);
