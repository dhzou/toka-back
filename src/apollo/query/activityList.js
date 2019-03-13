import gql from 'graphql-tag';

export default gql`
query activityList($type: Int = 0, $pageNo: Int = 1, $pageSize: Int = 20) {
  activityList(type: $type, pageNo: $pageNo, pageSize: $pageSize) {
    currentPageNo
    total
    hasMore
    rows {
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
}
`;
