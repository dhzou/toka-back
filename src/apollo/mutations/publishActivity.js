import gql from 'graphql-tag';

export default gql`
mutation publishActivity(
  $title: String!,
  $subTitle: String = "",
  $info: String = "", 
  $imgUrl: String!, 
  $type: Int = 0, 
  $startTime: Date = "",
  $endTime: Date = "",
  $isHot: Int = 0,
  $statementRules: String = "",
  $awardRules: String = ""
) {
  publishActivity(
    title: $title, 
    subTitle: $subTitle, 
    info: $info,
    imgUrl: $imgUrl,  
    type: $type,
    startTime: $startTime,
    endTime: $endTime,
    isHot: $isHot,
    statementRules: $statementRules,
    awardRules: $awardRules
  ) {
    code
    msg
  }
}
`;
