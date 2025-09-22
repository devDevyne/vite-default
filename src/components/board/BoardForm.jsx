import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getBoardDetail, insBoardInfo, udtBoardInfo } from "../../services/boardapi";

const BoardForm = () => {

    const { bbs_id } = useParams(); 
    const navigate = useNavigate();

    const [boardInfo, setBoardInfo] = useState({
        bbs_id: bbs_id,
        title: '',
        content: '',
        writer: '',
        reg_date: '',
        mod_date: '',
        use_yn: 'Y'
    });

    useEffect( () => {
        if(bbs_id) {
            fetchBoardDetail(bbs_id);
        }
    }, []);

    const fetchBoardDetail = async (bbs_id) => {
        try {
            const response = await getBoardDetail(bbs_id);
            setBoardInfo(response.data);
        } catch (error) {
            console.error("게시물 상세정보를 가져오는 중 에러 발생:", error);
        }
    }

    // 모든 input onChage 에서 state 업데이트
    const handleInputChange = (e) => {
        // 1. 이벤트가 발생한 요소의 name과 value를 추출
        const { name, value } = e.target;

        // 2. state 업데이트 
        setBoardInfo(prevInfo => ({
            // 기존 boardInfo 객체 복사 (...)
            ...prevInfo,
            // 현재 변경된 name에 해당되는 키의 값만 새로운 value로 덮어쓰기 
            [name]: value
        }));
    }

    // 글 저장 or 삭제하기 
    const saveBoardInfo = async (type) => {
        // type === 'S' : 글 저장
        // type === 'D' : 글 삭제 

        if(type === 'S') {
            if(bbs_id) {
                if(confirm("글을 수정하시겠습니까?")) {
                    // 수정 
                    try {
                        const response = await udtBoardInfo(boardInfo);
                        alert('게시물이 성공적으로 수정되었습니다.');
                        navigate(`/boardDetail?bbs_id=${bbs_id}`);
                    } catch (error) {
                        console.error("수정 중 오류 발생:", error);
                        alert('수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
                    }
                }
            }else {
                if(confirm("글을 등록하시겠습니까?")) {
                    // 등록 
                    try {
                        const response = await insBoardInfo(boardInfo);
                        alert('게시물이 성공적으로 등록되었습니다.');
                        navigate("/boardList");
                    } catch (error) {
                        console.error("등록 중 오류 발생:", error);
                        alert('등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
                    }
                }
            }
            
        }else if(type === 'D') {
            if(confirm("글을 삭제하시겠습니까?")) {
                try {
                    // state 변경 함수가 비동기로 동작하기에 새로운 객체를 만들어 전달
                    // 전달 후 state 업데이트
                    const boardToDelete = { ...boardInfo, use_yn: 'N' };
                    const response = await udtBoardInfo(boardToDelete);
                    setBoardInfo(boardToDelete);
                    alert('게시물이 삭제되었습니다.')
                    navigate("/boardList");
                } catch (error) {
                    console.error("삭제 중 오류 발생:", error);
                    alert('삭제 중 오류가 발생했습니다. 다시 시도해 주세요.');
                }
            }

        }
    }
    
    // 글 취소 -> 목록으로 이동
    const goToBoardListPage = () => {
        if(confirm("글 저장을 취소하시겠습니까?")) {
            navigate('/boardList');
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
                    onChange={handleInputChange}
                    placeholder="제목"
                />
            </div>

            <div className="form-group">
                <label htmlFor="writer">작성자 : </label>
                <input
                    type="text"
                    id="writer"
                    name="writer"
                    value={boardInfo.writer}
                    onChange={handleInputChange}
                    placeholder="작성자"
                />
            </div>
            
            {/* <div className="form-group">
                <label>등록일</label>
                <span className="display-date">{currentDate}</span>
            </div> */}

            <div className="form-group">
                <label htmlFor="content">내용</label>
                <textarea
                    id="content"
                    name="content"
                    rows="15"
                    value={boardInfo.content}
                    placeholder="내용을 입력하세요"
                    onChange={handleInputChange}
                ></textarea>
            </div>

            <div className="form-actions">
                <button type="button" className="submit-btn" onClick={() => saveBoardInfo("S")}>저장하기</button>
                {bbs_id != null && (
                    <button type="button" className="delete-btn" onClick={() => saveBoardInfo("D")}>삭제하기</button>
                )}
                <button type="button" className="cancel-btn" onClick={() => goToBoardListPage()}>취소</button>
            </div>
            
        </div>
    );
}
export default BoardForm;