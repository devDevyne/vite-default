import BoardListPage from "../pages/BoardListPage";
import BoardDetailPage from "../pages/BoardDetailPage";
import BoardFormPage from "../pages/BoardFormPage";

// 배열로 경로 규칙 정의 
export const routeList = [
    { path: "/", element: <BoardListPage />}, 
    { path: "/boardList", element: <BoardListPage />}, 
    { path: "/boardDetail", element: <BoardDetailPage />}, 
    { path: "/boardRegister", element: <BoardFormPage />},
    { path: "/boardUpdate/:bbs_id", element: <BoardFormPage />},
];
