import axiosInstance from "../utils/axiosInstance";

// 게시물 리스트 조회
export const getBoardList = async () => {
  try {
    // axios를 사용해 GET 방식으로 API에 요청을 보냅니다.
    const response = await axiosInstance.get("/board/list");
    // 요청 성공 시, 서버가 보낸 실제 데이터(response.data)를 반환합니다.
    return response.data;
  } catch (error) {
    // 요청 과정에서 에러 발생 시 콘솔에 로그를 남기고,
    // 에러를 다시 throw하여 호출한 쪽에서 처리할 수 있도록 합니다.
    console.error("게시물 목록 조회 중 에러 발생:", error);
    throw error;
  }
};