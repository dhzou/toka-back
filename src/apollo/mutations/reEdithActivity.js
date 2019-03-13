import gql from 'graphql-tag';

export default gql`
mutation reEdithActivity(
  $id: ID!, 
  $title: String = "",
  $subTitle: String = "",
  $info: String = "", 
  $imgUrl: String = "", 
  $type: Int, 
  $startTime: Date = "",
  $endTime: Date = "",
  $isHot: Int = 0,
  $statementRules: String = "",
  $awardRules: String = ""
) {
  reEdithActivity(
    id: $id, 
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
