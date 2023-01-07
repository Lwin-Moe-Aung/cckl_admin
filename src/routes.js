import { Route, Routes, Navigate } from "react-router-dom";
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import {
  DashboardAppPage, 
  UserPage, 
  CategoryPage, 
  BlogPage, 
  LoginPage, 
  Page404, 
  WelcomePage, 
  AddNewUserPage, 
  EditUserPage, 
  AddNewCategoryPage,
  EditCategoryPage,
  AddNewBlogPage,
  ViewBlogPage
} from './pages';
import { RequireAuth } from "./components/require-auth";
// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      <Route  path = "/" element={<WelcomePage />}/>
      <Route  path = "/login" element={<LoginPage />}/>
      {/* <Route  path = "/register" element={<Register />}/> */}
      <Route path = "/dashboard" element={<DashboardLayout />} >
        {/* <Route element={<Navigate to="/dashboard/app"/>}/> */}
        <Route element={<RequireAuth />}>
          <Route path="app" element={<DashboardAppPage />} />
          {/* users */}
          <Route path="users" element={<UserPage />} />
          <Route path="users/create" element={<AddNewUserPage />} />
          <Route path="users/edit/:id" element={<EditUserPage />} />
          {/* categories */}
          <Route path="categories" element={<CategoryPage />} />
          <Route path="categories/create" element={<AddNewCategoryPage />} />
          <Route path="categories/edit/:id" element={<EditCategoryPage />} />

          {/* blog */}
          <Route path="blogs" element={<BlogPage />} />
          <Route path="blogs/create" element={<AddNewBlogPage />} />
          <Route path="blogs/:slug" element={<ViewBlogPage />} />

        </Route>
      </Route>
      <Route element={<SimpleLayout />} >
        {/* <Route element={<Navigate to="/dashboard/app" />}/> */}
        <Route path="404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404"/>} />
      </Route>
    </Routes>
);
}
