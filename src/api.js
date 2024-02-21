// api.js
const API_BASE_URL = "http://localhost:5000/api";

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
};

export const EMAIL_ENDPOINTS = {
  GET_EMAIL_BY_ID: (emailId) => `${API_BASE_URL}/email/${emailId}`,
  MARK_AS_READ: (emailId) => `${API_BASE_URL}/email/${emailId}/mark-as-read`,
  GET_PREV_EMAIL: (emailId) => `${API_BASE_URL}/email/prev/${emailId}`,
  GET_NEXT_EMAIL: (emailId) => `${API_BASE_URL}/email/next/${emailId}`,   
  MARK_AS_UNREAD: (emailId) =>
    `${API_BASE_URL}/email/${emailId}/mark-as-unread`,
  DELETE: (emailId) => `${API_BASE_URL}/email/delete/${emailId}`,
};

// TODO: look into this
export const USER_ENDPOINTS = {
  GET_MY_USERINFO_BY_TOKEN: `${API_BASE_URL}/users/me`,
  GET_MY_ORDINARY_INFO: `${API_BASE_URL}/users/my_ordinary_info`,
  GET_USERINFO_BY_ID: `${API_BASE_URL}/users/info_by_email`,
  SEARCH: `${API_BASE_URL}/users/search`,
  GET_USER_INFO_BY_EMAIL: `${API_BASE_URL}/users/info_by_email`
};

// TODO: look into this
export const MAILBOX_ENDPOINTS = {
  GET_MAILBOX_BY_USERID: `${API_BASE_URL}/mailbox`,
  GET_MAILBOX_BY_ID: `${API_BASE_URL}/mailbox/me`,
  GET_MY_INBOX: `${API_BASE_URL}/mailbox/myinbox`,
  GET_MY_UNREAD_INBOX: `${API_BASE_URL}/mailbox/myinbox/unread`,
  GET_MY_INBOX_COUNT: `${API_BASE_URL}/mailbox/myinbox/length`,
  GET_MY_INBOX_UNREAD_COUNT: `${API_BASE_URL}/mailbox/myinbox/unread_count`,
  GET_MY_SENT_MAILS: `${API_BASE_URL}/mailbox/mysent`,
  SEND:  `${API_BASE_URL}/mailbox/send`,
};
