import http from "./httpService";
import baseURL from "./baseURL";
import TopicDto from "../components/topics/dto/TopicDto";

export interface TopicPutDto {
  id: string;
  data: TopicDto;
}

let url = "/topics";

class TopicService {
  public async post(data: TopicDto) {
    const { data: topic } = await http.post(baseURL + url, data);
    return topic;
  }

  public async get(queryString: string) {
    const { data } = await http.get(baseURL + url + "?" + queryString);
    return data;
  }

  public async getTopic(id: string) {
    const { data } = await http.get(baseURL + url + "/" + id);
    return data;
  }

  public async put(topicDto: TopicPutDto) {
    const { data: topic } = await http.put(
      baseURL + url + "/" + topicDto.id,
      topicDto.data
    );
    return topic;
  }

  public async delete(id: string) {
    const { data } = await http.delete(baseURL + url + "/" + id);
    return data;
  }
}

export default new TopicService();
