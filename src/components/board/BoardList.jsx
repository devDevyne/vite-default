import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoardList } from '../../services/boardapi';
import "./board.css";


const BoardList = () => {

    const [boardList, setBoardList] = useState([]);
    const navigate = useNavigate();

    // 게시물 목록을 조회해 상태를 업데이트
    const fetchBoardList = async () => {
        try {
            // API를 호출해 데이터를 받아옴
            const response = await getBoardList();
            setBoardList(response.data);
        } catch (error) {
            //TODO: alert 
            console.error("게시물 목록을 가져오는 중 에러 발생:", error);
        }
    }

    // 게시물 상세정보 페이지로 이동
    const goToBoardDetail = (bbs_id) => {
        navigate(`/boardDetail?bbs_id=${bbs_id}`);
    } 
    
    // 게시물 등록 페이지로 이동 
    const goToRegister = () => {
        navigate('/boardRegister');
    }
    
    useEffect(() => {
        fetchBoardList();
    }, []); // 의존성 배열을 비워둬 처음 렌더링 시에만 실행됨. 

    return (
        <div className="board-list-container">
            <div className='board-header'>
                <h2>게시판</h2>
                <button className='register-btn' onClick={()=>goToRegister()}>등록</button>
            </div>
            <table className="board-table">
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.length > 0 ? (
                        // 배열에 항목이 있으면 map 함수로 각 항목을 <tr>로 변환
                        boardList.map((board, index) => (
                            <tr key={board.bbs_id}>
                                <td>{boardList.length - index}</td>
                                <td onClick={ () => goToBoardDetail(board.bbs_id)} 
                                    className='text-left' style={{ cursor: 'pointer' }}>
                                    {board.title}
                                </td>
                                <td>{board.writer}</td>
                                <td>{board.mod_date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">게시물이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

}
export default BoardList;