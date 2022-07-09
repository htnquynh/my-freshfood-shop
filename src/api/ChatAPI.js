import api from './api';
const endpoint = '/chat';
export default {
  get(user_id) {
    return api.get(`${endpoint}/${user_id}`);
  },
}