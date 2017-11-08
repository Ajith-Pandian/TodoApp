import Api from "./Api";

const BASE_URL = "http://10.0.2.2:8000";
const authUrl = phoneNum => `${BASE_URL}/phone/?phone=${phoneNum}`;
const otpCheckUrl = (phoneNum, otp) =>
  `${BASE_URL}/otpverify/?phone=${phoneNum}&otp=${otp}`;
const dashboardUrl = type => `${BASE_URL}/dashboard/?type=${type}`;
const dashboardUrlWithPage = (type, page) =>
  `${BASE_URL}/dashboard/?type=${type}&page=${page}`;
const getProfileUrl = `${BASE_URL}/profile/`;
const registerUrl = `${BASE_URL}/register/`;
const createTaskUrl = `${BASE_URL}/createtask/`;
const acceptTaskUrl = `${BASE_URL}/accepttask/`;
const activitiesUrlWithPage = page => `${BASE_URL}/activity?page=${page}`;
const deviceIdUpdateUrl = `${BASE_URL}/device_id/`;

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
  static getProfile(token) {
    return Api.get(getProfileUrl, token).then(res => {
      console.log(res);
      return res;
    });
  }
  static getWeeklyTasks(token) {
    return Api.get(dashboardUrl("week"), token).then(res => {
      console.log(res);
      return res;
    });
  }
  static getLaterTasks(page = 1, token) {
    return Api.get(dashboardUrlWithPage("all", page), token).then(res => {
      console.log(res);
      return res;
    });
  }
  static register(user) {
    return Api.post(registerUrl, null, user).then(res => {
      console.log(res);
      return res;
    });
  }
  static createTask(task, token) {
    return Api.post(createTaskUrl, token, task).then(res => {
      console.log(res);
      return res;
    });
  }
  static acceptTask(task, token) {
    return Api.post(acceptTaskUrl, token, task).then(res => {
      console.log(res);
      return res;
    });
  }
  static getActivities(page = 1, token) {
    return Api.get(activitiesUrlWithPage(page), token).then(res => {
      console.log(res);
      return res;
    });
  }
  static updateDeviceId(device_id, token) {
    return Api.post(deviceIdUpdateUrl, token, { device_id }).then(res => {
      console.log(res);
      return res;
    });
  }
}
