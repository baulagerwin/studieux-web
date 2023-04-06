import http from "./httpService";
import baseURL from "./baseURL";
import NotebookDto from "../dtos/NotebookDto";

export interface NotebookPutDto {
  id: string;
  data: NotebookDto;
}

let url = "/notebooks";

class NotebookService {
  public async post(data: NotebookDto) {
    const { data: notebook } = await http.post(baseURL + url, data);
    return notebook;
  }

  public async get(queryString: string) {
    const { data } = await http.get(baseURL + url + "?" + queryString);
    return data;
  }

  public async getNotebook(id: string) {
    const { data } = await http.get(baseURL + url + "/" + id);
    return data;
  }

  public async put(notebookDto: NotebookPutDto) {
    const { data: notebook } = await http.put(
      baseURL + url + "/" + notebookDto.id,
      notebookDto.data
    );
    return notebook;
  }

  public async delete(id: string) {
    const { data } = await http.delete(baseURL + url + "/" + id);
    return data;
  }
}

export default new NotebookService();
