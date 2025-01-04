import { Route, Routes } from "react-router-dom";
import routes from './routes';
import Layout from "./layout/Layout";
import HomePage from "./pages/home/Home";
import P404NotFoundPage from "./pages/p404";
import LoginPage from "./pages/login/Login";
import SchoolCalendarHomePage from "./pages/school/calendar/SchoolCalendarHome";



function App() {
  return (
    <div className="app">
      <main className="main">
        <Routes>
          <Route path={routes.LOGIN} element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={< P404NotFoundPage />} />
            <Route path={routes.SCHOOL_CALENDAR} element={<SchoolCalendarHomePage />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
