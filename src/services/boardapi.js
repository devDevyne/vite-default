import axiosInstance from "../utils/axiosInstance";

// 게시물 리스트 조회
export const getBoardList = async () => {
  try {
    // axios를 사용해 GET 방식으로 API에 요청을 보냅니다.
    const response = await axiosInstance.get("/board/list");
    // 요청 성공 시, 서버가 보낸 실제 데이터(response.data)를 반환합니다.
    return response.data;
  } catch (error) {
    // 에러를 다시 throw하여 호출한 쪽에서 처리할 수 있도록 합니다.
    throw error;
  }
};


/**
 * 게시물 상세정보 조회 
 * @param bbs_id 
 */
export const getBoardDetail = async (bbs_id) => {
  try {
    const response = await axiosInstance.get("/board/detail?bbs_id=" + bbs_id);
    return response.data;
  } catch (error) {
    throw error; 
  }
  
}


/**
 * 게시물 등록
 * @param boardInfo 
 */
export const insBoardInfo = async (boardInfo) => {
  
  try {
    const response = await axiosInstance.post("/board/insert", boardInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * 게시물 수정/삭제
 * @param type
 * @param boardInfo
 */
export const udtBoardInfo = async (boardInfo) => {

  try {
    const response = await axiosInstance.put("/board/update", boardInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
  
}