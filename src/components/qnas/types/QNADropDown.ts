export default interface QNADropDown {
  topic: string;
  onTopic: React.Dispatch<React.SetStateAction<string>>;
  isTopicOpen: boolean;
  onTopicOpen: React.Dispatch<React.SetStateAction<boolean>>;
}