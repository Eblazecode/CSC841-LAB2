import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../features/dashboard/DashboardPage";
import StudentProfilePage from "../features/students/StudentProfilePage";
import StudentDetailPage from "../features/students/StudentDetailPage";
import CoursesPage from "../features/courses/CoursesPage";
import RegistrationPage from "../features/registration/RegistrationPage";
import NotFoundPage from "../features/dashboard/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "students/me", element: <StudentProfilePage /> },
      { path: "students/:studentId", element: <StudentDetailPage /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "registration", element: <RegistrationPage /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);
