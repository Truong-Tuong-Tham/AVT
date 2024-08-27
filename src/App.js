import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./page/login";
import RegisterPage from "./page/RegisTer";
import AuthTemplate from "./template/AuthTemPlate";
import HomeTemPlate from "./template/HomeTemPlate";
import HomePage from "./page/Home";
import DetailJob from "./page/DetailJob";
import DetailTemPlate from "./template/DetailTemPlate";
import ListJobsPage from "./page/ListJobPage";
import DetailJobPage from "./page/DetailPage";
import ProFilePage from "./page/ProFile";
import AdminTemPlate from "./template/AdminTemPlate";
import UserManagement from "./page/ADPAGE/Component/UserManagement";
import JobManagement from "./page/ADPAGE/Component/JobManagement";
import JobTypeManagement from "./page/ADPAGE/Component/JobTypeManagement";
import ServiceManagement from "./page/ADPAGE/Component/ServiceManagemen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthTemplate />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="" element={<HomeTemPlate />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/detail" element={<DetailTemPlate />}>
          <Route path="jobs/:idjob" element={<DetailJob />}></Route>
          <Route
            path="jobs/:idjob/listjobs/:idtype"
            element={<ListJobsPage />}
          ></Route>
          <Route
            path="jobs/detailjob/:idjob/:idtype"
            element={<DetailJobPage />}
          ></Route>
        </Route>
        <Route path="/profile/:iduser" element={<ProFilePage />}></Route>
        <Route path="/admin/:iduser" element={<AdminTemPlate />}>
          <Route path="UserManagement" element={<UserManagement />} />
          <Route path="JobManagement" element={<JobManagement />} />
          <Route path="JobTypeManagement" element={<JobTypeManagement />} />
          <Route path="ServiceManagement" element={<ServiceManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
