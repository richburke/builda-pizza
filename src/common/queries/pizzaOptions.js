import gql from 'graphql-tag';

export default gql`
  {
    pizzaSizes {
      name,
      basePrice,
      maxToppings,
      toppings {
        topping {
          name,
          price
        }
        defaultSelected
      }
    }
  }
`;
