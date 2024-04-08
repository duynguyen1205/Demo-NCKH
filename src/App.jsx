import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import Register from "./pages/register/index.jsx";
import FirstInfo from "./pages/firstInfo/index.jsx";

import "antd/dist/reset.css";
import LayoutStaff from "./components/staff/LayoutStaff.jsx";
import StaffPage from "./pages/staff/index.jsx";
import Project from "./pages/projectMangerStaff/index.jsx";
import AddMemberApprove from "./components/staff/project/AddMemberAprove.jsx";
import UploadDoc from "./pages/uploads/index.jsx";
import LayoutUser from "./components/user/LayoutUser.jsx";
import ProjectUser from "./pages/projectMangerUser/index.jsx";
import UserPage from "./pages/user/index.jsx";
import ProjectUserReview from "./pages/projectMangerUserReview/index.jsx";
import TrackProject from "./components/user/project/TrackProject.jsx";
import TrackProjectStaff from "./components/staff/project/TrackProject.jsx";
import ProjectForTrack from "./components/user/project/ProjectForTrack.jsx";
import ResubmitProject from "./components/user/project/ResubmitProject.jsx";
import ProjectResubmit from "./components/user/project/ProjectResubmit.jsx";
import ProjectForTrackStaff from "./components/staff/project/ProjectForTrackStaff.jsx";
import MidtermProject from "./pages/projectMangerStaff/midterm.jsx";
const Layout = () => {
  return <>Main Page</>;
};
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/first-information",
      element: <FirstInfo/>,
    },
    {
      path: "/staff",
      element: <LayoutStaff />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <StaffPage />,
        },
        {
          path: "earlyterm",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <Project />,
            },
            {
              path: "add-member/:projectId",
              element: <AddMemberApprove />,
            },
            {
              path: "add-council/:projectId",
              element: <AddMemberApprove />,
            },
          ],
        },
        {
          path: "midterm",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <MidtermProject />,
            },
            {
              path: "add-council/:projectId",
              element: <AddMemberApprove />,
            },
          ],
        },
        {
          path: "finaltearm",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <Project />,
            },
            {
              path: "add-council/:projectId",
              element: <AddMemberApprove />,
            },
          ],
        },
        {
          path: "upload-document",
          element: <UploadDoc />,
        },
        {
          path: "track",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <ProjectForTrackStaff />,
            },
            {
              path: "track-topic/:projectId",
              element: <TrackProjectStaff />,
            },
          ],
        },
        {
          path: "profile",
          element: <>Thông tin cá nhân</>,
        },
      ],
    },
    {
      path: "/user",
      element: <LayoutUser />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <UserPage />,
        },
        {
          path: "manager-review",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <ProjectUserReview />,
            },
          ],
        },
        {
          path: "manager",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <ProjectUser />,
            },
          ],
        },
        {
          path: "track",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <ProjectForTrack />,
            },
            {
              path: "track-topic/:projectId",
              element: <TrackProject />,
            },
          ],
        },
        {
          path: "review",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <ProjectResubmit />,
            },
            {
              path: "review-topic/:projectId",
              element: <ResubmitProject />,
            },
          ],
        },
        {
          path: "profile",
          element: <>Thông tin cá nhân</>,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
