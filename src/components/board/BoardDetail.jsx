import { useLocation, useNavigate } from "react-router-dom";
import { getBoardDetail } from "../../services/boardapi";
import { useEffect, useState } from "react";

const BoardDetail = () => {

    const location = useLocation();
    const navigate = useNavigate();
    // 쿼리파라미터에서 bbs_id 추출
    const queryParams = new URLSearchParams(location.search);
    const bbs_id = queryParams.get('bbs_id');

    const [boardDetail, setBoardDetail] = useState({
        bbs_id: bbs_id,
        title: '',
        content: '',
        writer: '',
        reg_date: '',
        mod_date: '',
        use_yn: ''
    });

    useEffect(() => {
        fetchBoardDetail(bbs_id);
    }, []);

    const fetchBoardDetail = async (bbs_id) => {
        try {
            // API를 호출해 데이터를 받아옴 
            const response = await getBoardDetail(bbs_id);
            setBoardDetail(response.data);
        } catch (error) {
            //TODO: alert 
            console.error("게시물 상세정보를 가져오는 중 에러 발생:", error);
        }
    }

    // 수정 페이지로 이동
    const goToUpdateBoardPage = () => {
        if(bbs_id) {
            navigate(`/boardUpdate/${bbs_id}`)
        }
    }
    
    // 목록 페이지로 이동
    const goToBoardListPage = () => {
        navigate('/boardList');
    }

    return (
        <div className="board-detail-container">
            <header className="post-header">
                <h1 className="post-title">{boardDetail.title}</h1>
                <div className="post-meta">
                    <span className="post-author">작성자: {boardDetail.writer}</span>
                    <span className="post-dates">
                        <span>등록일: {boardDetail.reg_date}</span>
                        <span>수정일: {boardDetail.mod_date}</span>
                    </span>
                </div>
            </header>

            <hr className="divider"/>

            <div className="post-content">
                <p>
                    {boardDetail.content}
                </p>
            </div>

            <div className="post-actions">
                <button className="edit-btn" style={{ marginRight: '10px' }} onClick={()=>goToUpdateBoardPage()}>수정</button>
                <button className="list-btn" onClick={() => goToBoardListPage()}>목록</button>
            </div>
        </div>
    );
}
export default BoardDetail;