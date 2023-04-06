import http from "./httpService";
import baseURL from "./baseURL";
import QNADto from "../dtos/QNADto";

export interface QNAPutDto {
  id: string;
  data: QNADto;
}

let url = "/qnas";

class QNAService {
  public async post(data: QNADto) {
    const { data: notebook } = await http.post(baseURL + url, data);
    return notebook;
  }

  public async get(queryString: string) {
    const { data } = await http.get(baseURL + url + "?" + queryString);
    return data;
  }

  public async getQNA(id: string) {
    const { data } = await http.get(baseURL + url + "/" + id);
    return data;
  }

  public async put(qnaPutDto: QNAPutDto) {
    const { data: qna } = await http.put(
      baseURL + url + "/" + qnaPutDto.id,
      qnaPutDto.data
    );
    return qna;
  }

  public async delete(id: string) {
    const { data } = await http.delete(baseURL + url + "/" + id);
    return data;
  }
}

export default new QNAService();
