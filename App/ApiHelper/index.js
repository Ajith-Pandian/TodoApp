import Api from "./Api";
import { Platform } from "react-native";

//For Device
const BASE_URL = "http://192.168.31.73:8080";
//For Simulator & Emulator
// const BASE_URL =
//   Platform.OS === "ios" ? "http://localhost:8080" : "http://10.0.2.2:8080";
const authUrl = phoneNum => `${BASE_URL}/phone/?phone=${phoneNum}`;
const otpCheckUrl = (phoneNum, otp) =>
  `${BASE_URL}/otpverify/?phone=${phoneNum}&otp=${otp}`;
const dashboardUrl = type => `${BASE_URL}/dashboard/?type=${type}`;
const dashboardUrlWithPage = (type, page) =>
  `${BASE_URL}/dashboard/?type=${type}&page=${page}`;
const dashboardUrlWithSearch = term =>
  `${BASE_URL}/dashboard/?type=all&search=${term}`;
const profileUrl = `${BASE_URL}/profile/`;
const registerUrl = `${BASE_URL}/register/`;
const createTaskUrl = `${BASE_URL}/createtask/`;
const acceptTaskUrl = `${BASE_URL}/accepttask/`;
const completeTaskUrl = `${BASE_URL}/completetask/`;
const activitiesUrlWithPage = page => `${BASE_URL}/activity?page=${page}`;
const deviceIdUpdateUrl = `${BASE_URL}/deviceid/`;

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
    return Api.get(profileUrl, token).then(res => {
      console.log(res);
      return res;
    });
  }
  static updateProfile(token, user) {
    return Api.post(profileUrl, token, { ...user }).then(res => {
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
  static getNewTaks(page = 1, token) {
    return Api.get(dashboardUrlWithPage("new", page), token).then(res => {
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
  static searchTask(term, token) {
    return Api.get(dashboardUrlWithSearch(term), token).then(res => {
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
  static completeTask(task, token) {
    return Api.post(completeTaskUrl, token, task).then(res => {
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
    console.log("Update Device ID called");
    return Api.post(deviceIdUpdateUrl, token, { device_id }).then(res => {
      console.log(res);
      return res;
    });
  }
}
