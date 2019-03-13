import gql from 'graphql-tag';

export default gql`
query ChannelsListQuery {
  workList(type: 1) {
    total,
    totalPages,
    currentPageNo,
    pageSize,
    hasMore,
    rows {
      id, 
      userId,
      title,
      subTitle,
      info,
      type,
      recommendMark,
    },
  }
}
`;
