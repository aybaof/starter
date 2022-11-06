import { HttpClient } from "../HttpClient";

export class UserPostClient extends HttpClient {
    constructor(_baseURL, _headers) {
        super({
            _baseURL,
            _headers
        })

        this._baseURL = this._baseURL + "userPost/"
    }

    get userPost() {
        return {
            newPost: (form) => this._formData("", form),
            getPost: (id_post) => this.get(`?id_post=${id_post}`),
            deletePost: (post) => this.delete("", post),
            likePost: (post) => this.put("", post)
        }
    }
}

const authClient = new UserPostClient();

export const UserPostApi = authClient.userPost;