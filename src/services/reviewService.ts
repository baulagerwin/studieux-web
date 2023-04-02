import http from "./httpService";
import baseURL from "./baseURL";

let url = "/review";

class ReviewService {
  public async get(id: string, queryString: string) {
    const { data } = await http.get(
      baseURL + url + "/" + id + "?" + queryString
    );

    return data;
  }
}

export default new ReviewService();
