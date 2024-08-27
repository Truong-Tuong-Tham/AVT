import { https } from "./urlConfig";

export const jobService = {
  getListJob: (TenCongViec) => {
    let uri = `/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${TenCongViec}`;
    return https.get(uri);
  },
  getTypeJob: () => {
    let uri = "/api/loai-cong-viec";
    return https.get(uri);
  },
  getMenuJob: () => {
    let uri = "/api/cong-viec/lay-menu-loai-cong-viec";
    return https.get(uri);
  },
  getJobWithID: (MaChiTietLoai) => {
    let uri = `/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${MaChiTietLoai}`;
    return https.get(uri);
  },
  postHireJob: (values) => {
    let uri = "/api/thue-cong-viec";
    return  https.post(uri, values);
    
  },
  getListComment: (MaCongViec) => {
    let uri = `/api/binh-luan/lay-binh-luan-theo-cong-viec/${MaCongViec}`;
    return https.get(uri);
  },
  postComment: (values) => {
    let uri = "/api/binh-luan";
    return https.post(uri, values);
  },
  getListHireJobs: () => {
    let uri = "/api/thue-cong-viec/lay-danh-sach-da-thue";
    return https.get(uri);
  },
getListJobs: () => {
  let uri = "/api/cong-viec";
  return https.get(uri);
},
putJob: (value,id) => {
  let uri = `/api/cong-viec/${id}`;
  return https.put(uri,value);
},
deleteJob: (id) => {
  let uri = `/api/cong-viec/${id}`;
  return https.delete(uri);
},
postJob: (values) => {
  let uri = "/api/cong-viec";
  return https.post(uri, values);
},
getJobWithID: (id) => {
  let uri = `/api/cong-viec/${id}`;
  return https.get(uri);
},
getPagination: (keyword) => {
  let uri = `/api/cong-viec/lay-cong-viec-trang`;
  return https.get(uri,keyword);
},
};
