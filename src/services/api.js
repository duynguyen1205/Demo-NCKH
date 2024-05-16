import axios from "../utils/axios-customize";
import qs from "query-string";

// gọi tất cả api ở đây


// get user information
export const getUserInformation = (params) => {
  return axios.get(`api/user/infor?${qs.stringify(params)}`);
};

//register email
export const registerEmail = (email) => {
  return axios.post("/api/account/register-email", email);
};

//register account
export const registerAccount = (account) => {
  return axios.post("/api/account/register-account", account);
};

//login account
export const loginAccount = (account) => {
  return axios.post("/api/account/login", account);
};

// get all user except dean
export const getAllUser = (param) => {
  return axios.get(`/api/user/add-to-topic?${qs.stringify(param)}`);
};

// get all user except dean
export const getAllUserWithoutCreator = (param) => {
  return axios.get(`/api/user/add-to-council?${qs.stringify(param)}`);
};

// get all user for admin
export const getAllUserAdmin = () => {
  return axios.get("api/user/all");
};

// get category
export const getAllCategory = () => {
  return axios.get("/api/category");
};

// get file type
export const getFileType = (param) => {
  return axios.get(`api/filetype?${qs.stringify(param)}`);
};

// register project
export const getTopicReviewerAPI = (param) => {
  return axios.get(
    `/api/topic/pre-topic-waiting-reviewer?${qs.stringify(param)}`
  );
};
export const createMemberDecision = (param) => {
  return axios.post("/api/memberreview/make-decision", param);
};
// upload file return link and name
export const uploadFile = (file) => {
  const bodyFormData = new FormData();
  bodyFormData.append("formFile", file);
  return axios({
    method: "post",
    url: "/api/file/single-DO",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// create a new topic
export const createTopicAPI = (data) => {
  return axios({
    method: "post",
    url: "/api/topic/create",
    data: { ...data },
    headers: {
      "Content-Type": "application/json",
    },
  });
};
//  get topic for dean
export const getTopicForDean = (param) => {
  return axios.get(`/api/topic/topic-for-dean?${qs.stringify(param)}`);
};

// dean make decision
export const createDeanMakeDecesion = (param) => {
  return axios.post("/api/topic/dean-make-decision", param);
};

//dean view history decision
export const viewDeanDecesion = (param) => {
  return axios.get(`api/topic/topic-decided-by-dean?${qs.stringify(param)}`);
};

// get topic waiting for member approval
export const getTopicForMemberApproval = () => {
  return axios.get("/api/topic/pre-topic-waiting-review-formation");
};

// MemberReview topic
export const memberReviewAPI = (data) => {
  return axios.post("/api/memberreview/add-reviewer", data);
};

// get topic waiting for member approval
export const getTopicForCouncil = () => {
  return axios.get("api/topic/early-topic-waiting-configure-conference");
};

//get topic member has already reviewed
export const getReviewedByMember = (param) => {
  return axios.get(
    `api/topic/topic-reviewed-for-member?${qs.stringify(param)}`
  );
};

// get members has review topics
export const getMembersHasReview = (param) => {
  return axios.get(
    `api/memberreview/member-review-of-topic?${qs.stringify(param)}`
  );
};

// create council
export const councilConfigEarly = (data) => {
  return axios.post("/api/review/config-early", data);
};

// getDetail topic
export const getTopicDetailAPI = (param) => {
  return axios.get(`/api/topic/detail?${qs.stringify(param)}`);
};

// get topic waiting for member review approval
export const getTopicWaitingMember = () => {
  return axios.get("api/topic/pre-topic-waiting-review-for-staff");
};

//get topic waiting for upload results after meeting
export const getTopicUploadDoc = () => {
  return axios.get("api/topic/all-topic-waiting-upload-meeting-minutes");
};

//get topic waiting for upload contract
export const getTopicUploadContract = (param) => {
  return axios.get(
    `api/topic/early-topic-waiting-upload-contract?${qs.stringify(param)}`
  );
};

// upload contract result for topic
export const uploadResult = (data) => {
  return axios.post("/api/review/update-early-meeting-result", data);
};

// upload contract contract for topic
export const uploadContract = (data) => {
  return axios.post("/api/contract/upload-early-contract", data);
};

// track topic history
export const trackReseach = (param) => {
  return axios.get(`api/topic/process?${qs.stringify(param)}`);
};

// get topic by userId
export const getTopicByUserId = (param) => {
  return axios.get(`api/topic/topic-for-user?${qs.stringify(param)}`);
};

//  get topic for council meeting
export const getTopicForCouncilMeeting = (param) => {
  return axios.get(
    `/api/topic/ongoing-topic-for-council?${qs.stringify(param)}`
  );
};

// get topic waiting for resubmit
export const getTopicWaitingResubmit = () => {
  return axios.get("api/topic/early-topic-waiting-resubmit");
};

// reset deadline for resubmit
export const setResubmitTime = (data) => {
  return axios.post("api/review/edit-deadline-for-early-review", data);
};

// get topic on-going
export const getTopicOngoing = () => {
  return axios.get("api/topic/active-topic");
};

// get info meeting
export const getInforMeetingForCouncil = (param) => {
  return axios.get(`api/topic/meeting-infor?${qs.stringify(param)}`);
};

// get reviewcouncil and member documents
export const getReviewDocuments = (param) => {
  return axios.get(`api/topic/all-review-documents?${qs.stringify(param)}`);
};

// upload Resubmit Document For Leader
export const uploadResubmit = (data) => {
  return axios.post("/api/document/resubmit-early-document", data);
};

// chairman approve
export const chairmanApprove = (data) => {
  return axios.post("api/topic/chairman-approve", data);
};

//chairman reject
export const chairmanReject = (data) => {
  return axios.post("api/topic/chairman-reject", data);
};

// done early term report
export const moveToMiddleReport = (param) => {
  return axios.post(`api/topic/move-to-middle-term?${qs.stringify(param)}`);
};

// get contract type
export const getContractType = (param) => {
  return axios.get(`api/contracttype?${qs.stringify(param)}`);
};
// get topic done for council
export const getReviewDocumentsDone = (param) => {
  return axios.get(
    `api/topic/topic-has-been-resolved-for-council?${qs.stringify(param)}`
  );
};
// mid-term report

// get topic mid-term report
export const getMidTermReport = () => {
  return axios.get("api/topic/middle-topic-waiting-configure-conference");
};

// get topic mid-term watiing make schedule
export const getMidTermReportWait = (param) => {
  return axios.get("api/topic/middle-topic-waiting-make-schedule");
};

// make deadline submit documents
export const makeDeadlineSubmit = (data) => {
  return axios.post("api/review/make-middle-review-schedule", data);
};

// submit documents mid-term
export const submitDocumentsMidterm = (data) => {
  return axios.post("api/document/supplementation-middle-document", data);
};

// create mid-term council
export const councilConfigMidterm = (data) => {
  return axios.post("api/review/config-middle", data);
};

// staff upload report
export const uploadReportMidTerm = (data) => {
  return axios.post("api/review/create-evaluate", data);
};

// get document had upload report
export const getDocumentMidTerm = (param) => {
  return axios.get(`api/contract/uploaded-contract?${qs.stringify(param)}`);
};

// get all department
export const getAllDepartment = () => {
  return axios.get("/api/Department/all");
};

// upload infor user
export const uploadInforUser = (data) => {
  return axios.post("api/user/register-user-infor", data);
};

//move to final term
export const moveToFinalTerm = (param) => {
  return axios.post(`api/topic/move-to-final-term?${qs.stringify(param)}`);
};

// get topic final term

export const getFinalTerm = () => {
  return axios.get("api/topic/final-topic-waiting-make-schedule");
};

// get topic final term waiting council
export const getFinalTermReport = () => {
  return axios.get("api/topic/final-topic-waiting-configure-conference");
};

// make deadline submit documents
export const makeDeadlineFinalSubmit = (data) => {
  return axios.post("api/review/make-final-review-schedule", data);
};

// submit documents final-term
export const submitDocumentsFinalterm = (data) => {
  return axios.post("api/document/supplementation-final-document", data);
};

// create final-term council
export const councilConfigFinalterm = (data) => {
  return axios.post("api/review/config-final", data);
};

// upload final-term contract
export const uploadResultFinal = (data) => {
  return axios.post("/api/review/update-final-meeting-result", data);
};

// resubmit final-term document
export const resubmitFinalDocument = (data) => {
  return axios.post("/api/review/resubmit-final-document", data);
};

// get topics has submit file money
export const getTopicHasSubmitFileMoney = () => {
  return axios.get("/api/topic/final-topic-waiting-censorship-remuneration");
};

//get topic has submit file money detais
export const getTopicHasSubmitFileMoneyDetail = (param) => {
  return axios.get(`/api/remuneration?${qs.stringify(param)}`);
};

// leader submit file
export const postLeaderSubmitFile = (data) => {
  return axios.post("/api/remuneration/submit", data);
};

// staff submit decision file
export const staffSubmitDecisionFile = (data) => {
  return axios.post("/api/remuneration/censorship", data);
};

//upload final contract file
export const uploadFinalContract = (data) => {
  return axios.post("api/contract/upload-ending-contract", data);
};

//admin assign dean
export const assignDeanByAdmin = (data) => {
  return axios.post("/api/user/assign-dean", data);
};

//admin create department
export const assignDepartmentByAdmin = (data) => {
  return axios.post("/api/Department/create", data);
};

//admin create department
export const updateDepartmentByAdmin = (data) => {
  return axios.put("/api/Department/update", data);
};

//admin add holiday
export const assignHoliday = (data) => {
  return axios.post("/api/holiday", data);
};

// get all holiday
export const getAllHoliday = (data) => {
  return axios.get("/api/holiday", data);
};

// admin get account inactive
export const getAccountInactive = () => {
  return axios.get("/api/account/inactive-emails");
};

//admin upload file
export const uploadFileAdmin = (file) => {
  const bodyFormData = new FormData();
  bodyFormData.append("formFile", file);
  return axios({
    method: "post",
    url: "/api/file/convert-excel-to-user",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Admin create account inactive
export const createAccountAdminEmail = (data) => {
  return axios.put("/api/account/provide-account", data);
};

// Admin create account inactive
export const createAccountAdmin = (data) => {
  return axios.post("/api/user/create-users", data);
};

//users change password
export const changePassword = (data) => {
  return axios.put("/api/account/change-password", data);
};

// leader get notifications
export const getNotifications = (param) => {
  return axios.get(`/api/notify?${qs.stringify(param)}`);
};

// leader get all members
export const getAllMembersByLeader = (param) => {
  return axios.get(`/api/topic/participant?${qs.stringify(param)}`);
}

//user get all articles 
export const getAllArticle = (param) => {
  return axios.get(`/api/article?${qs.stringify(param)}`);
}

//user create a new article 
export const createArticle = (data) => {
  return axios.post("/api/article/create",data);
}

//user update a article 
export const updateArticle = (data) => {
  return axios.put("/api/article/update",data);
}