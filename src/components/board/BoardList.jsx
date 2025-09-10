import { useState } from 'react';
import "./board.css";

const BoardList = () => {

    return(
        <div className="board-list-container">
            <h2>게시판</h2>
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
                    {/* 게시물 리스트 데이터가 위치할 곳 */}
                </tbody>
            </table>
        </div>
    );
    
}
export default BoardList;