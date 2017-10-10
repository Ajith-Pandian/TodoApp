import Api from "./Api";

const BASE_URL = "http://192.168.0.7:8000";
const authUrl = phoneNum => `${BASE_URL}/phone/?phone=${phoneNum}`;
const otpCheckUrl = (phoneNum, otp) =>
  `${BASE_URL}/otpverify/?phone=${phoneNum}&otp=${otp}`;
const dashboardUrl = (type, page) =>
  `${BASE_URL}/dashboard/?type=${type}&page=${page}`;
const getProfileUrl = `${BASE_URL}/profile/`;
const registerUrl = `${BASE_URL}/register/`;
const createTaskUrl = `${BASE_URL}/createtask/`;
const acceptTaskUrl = `${BASE_URL}/accepttask/`;
const token = ""; //accessToken
export default class ApiHelper {
  static authenticate(phoneNum) {
    return Api.get(authUrl(phoneNum)).then(res => {
      console.log(res);
      return res;
    });
  }
  static checkOtp(phoneNum, otp) {
    return Api.get(otpCheckUrl(phoneNum, otp)).then(res => {
      console.log(res);
      return res;
    });
  }
  static getProfile() {
    return Api.get(getProfileUrl, token).then(res => {
      console.log(res);
      return res;
    });
  }
  static getDashboard(type = "all", page = 1) {
    return Api.get(dashboardUrl(type, page), token).then(res => {
      console.log(res);
      return res;
    });
  }
  static register(user) {
    return Api.post(registerUrl, user).then(res => {
      console.log(res);
      return res;
    });
  }
  static createTask(task) {
    return Api.post(createTaskUrl, token, task).then(res => {
      console.log(res);
      return res;
    });
  }
  static acceptTask(task) {
    return Api.post(acceptTaskUrl, token, task).then(res => {
      console.log(res);
      return res;
    });
  }
}
