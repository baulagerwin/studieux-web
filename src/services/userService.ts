import UserDto from "../components/user/dto/UserDto";
import http from "./httpService";
import baseURL from "./baseURL";

let url = "/users";

class UserService {
  public async signUp(data: UserDto): Promise<string> {
    const { data: user } = await http.post(baseURL + url, data);
    return user;
  }
}

export default new UserService();
