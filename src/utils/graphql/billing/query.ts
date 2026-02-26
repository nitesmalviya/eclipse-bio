import { gql } from "graphql-request";

export const GET_PAYMENT_HISTORY_QUERY = gql`
query GetPaymentHistory($input: GetTransactionsInput) {
  getPaymentHistory(input: $input) {
    success
    message
    payments {
      id
      number
      date
      amount
      currency
      status
      description
      type
      pdfUrl
      hostedUrl
    }
    total
    page
    limit
    totalPages
  }
}
`;