import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getBoardDetail } from "../../services/boardapi";

const BoardForm = () => {

    const { bbs_id } = useParams(); 

    const [boardInfo, setBoardInfo] = useState({
        bbs_id: bbs_id,
        title: '',
        content: '',
        writer: '',
        reg_date: '',
        mod_date: '',
        use_yn: ''
    });

    const [currentDate] = useState(new Date().toLocaleDateString());

    useEffect( () => {
        fetchBoardDetail(bbs_id);
    }, []);

    console.log(boardInfo);
    
    const fetchBoardDetail = async (bbs_id) => {
        try {
            const response = await getBoardDetail(bbs_id);
            setBoardInfo(response.data);
        } catch (error) {
            console.error("게시물 상세정보를 가져오는 중 에러 발생:", error);
        }
    }

    return(
        <div className="board-form-container">
            <h2>게시물 {bbs_id != null ? '수정' : '등록'}</h2>
            
            <div className="form-group">
                <label htmlFor="title">제목 : </label>
                <input 
                    type="text"
                    id="title"
                    name="title"
                    value={boardInfo.title}
                />
            </div>

            <div className="form-group">
                <label htmlFor="writer">작성자 : </label>
                <input
                    type="text"
                    id="writer"
                    name="writer"
                    value={boardInfo.writer}
                />
            </div>
            
            <div className="form-group">
                <label>등록일</label>
                <span className="display-date">{currentDate}</span>
            </div>

            <div className="form-group">
                <label htmlFor="content">내용</label>
                <textarea
                    id="content"
                    name="content"
                    rows="15"
                    value={boardInfo.content}
                    placeholder="내용을 입력하세요"
                ></textarea>
            </div>

            <div className="form-actions">
                <button type="button" className="submit-btn">저장하기</button>
                <button type="button" className="cancel-btn">취소</button>
            </div>
            
        </div>
    );
}
export default BoardForm;