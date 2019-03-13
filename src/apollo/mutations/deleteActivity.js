import gql from 'graphql-tag';

export default gql`
mutation deleteActivity($id:ID!) {
  deleteActivity(id: $id) {
    code
    msg
  }
}
`;
