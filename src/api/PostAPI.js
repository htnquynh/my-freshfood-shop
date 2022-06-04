import api from "./api";
const endpoint = "/post";
export default {
  get() {
    return api.get(`${endpoint}`);
  },
  getById(id) {
    return api.get(`${endpoint}/${id}`);
  },
  comment(id, comment, config) {
    return api.patch(`${endpoint}/${id}/comment`, comment, config);
  },
  like(id, userLike, config) {
    return api.patch(`${endpoint}/${id}/like`, userLike, config);
  },
};
