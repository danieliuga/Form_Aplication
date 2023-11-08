import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($user: String!, $name: String!, $surname: String!, $country: String!, $dni: String!) {
    createUser(user: $user, name: $name, surname: $surname, country: $country, dni: $dni) {
      user
      name
      surname
      country
      dni
    }
  }
`;

