import axios from "../utils/axios-customize";
import qs from "query-string";

// gọi tất cả api ở đây

// authenticated

//register email
export const registerEmail = (email) => {
  return axios.post(
    `/api/account/register-email?${qs.stringify(email)}`
  );
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
  return axios.get(`/api/user/users?${qs.stringify(param)}`);
};

// get all user except dean
export const getAllUserWithoutCreator = (param) => {
  return axios.get(
    `/api/user/users-not-participating-topic?${qs.stringify(param)}`
  );
};

// get category
export const getAllCategory = () => {
  return axios.get("/api/category");
};

// get file type
export const getFileType = () => {
  return axios.get("api/filetype");
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
    url: "/api/uploadfile/single-DO",
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
  return axios.get("api/topic/early-topic-waiting-council-formation");
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
  return axios.post("/api/review/update-meeting-result", data);
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
  return axios.post("/api/attachment/create", data);
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
export const getMidTermReport = (param) => {
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

// submit documents
export const submitDocumentsMidterm = (data) => {
  return axios.post("api/document/create-middle-document", data);
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
