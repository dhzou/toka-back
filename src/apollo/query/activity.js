import gql from 'graphql-tag';

export default gql`
query activityDetail($id: Int!) {
  activityDetail(id: $id) {
    id
    title
    subTitle
    info
    type
    isHot
    imgUrl
    startTime
    endTime
    status
    createTime
    updateData
    awardRules
    statementRules
    overdue
  }
}
`;
