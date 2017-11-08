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
const activitiesUrl = `${BASE_URL}/activity/`;
const deviceIdUpdateUrl = `${BASE_URL}/device_id/`;
const token =
  "eyJwaG9uZSI6ICIxMjM0NTY3ODkwIiwgInNhbHQiOiAiMWE2ZDU2IiwgImV4cGlyZXMiOiAxNTEwMDU0MTc4LjAyMjQyMn1OBInf6rPhsi3LHiPou_bF9ckgaQs2D6S4MpPVyYNS8A=="; //accessToken
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
  static getWeeklyTasks() {
    return Api.get(dashboardUrl("week"), token).then(res => {
      console.log(res);
      return res;
    });
  }
  static getLaterTasks(page = 1) {
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
  static getActivities() {
    return Api.get(activitiesUrl, token).then(res => {
      console.log(res);
      return res;
    });
  }
  static updateDeviceId(device_id) {
    return Api.post(deviceIdUpdateUrl, token, { device_id }).then(res => {
      console.log(res);
      return res;
    });
  }
}
