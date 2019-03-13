export const typeDefs = `

scalar Date
type WorkInfo {
  id: ID!
  userId: String
  title: String
  subTitle: String
  info: String
  type: Int
  recommendMark: Int
  imgUrl: String
  thumbImgUrl: String
  lookNum: Int
  likeNum: Int
  status: Int
  createTime: Date
  updateData: Date
}
type workList{
  total: Int!
  totalPages: Int!,
  currentPageNo: Int!,
  pageSize: Int!,
  hasMore: Boolean!,
  rows: [WorkInfo]
}
type Query {
  workList: workList
}
`;

