import ITopic from "../../topics/model/ITopic";

export default interface QNA {
  _id: string;
  topic: ITopic;
  question: string;
  answer: string;
}
