package board.mapper;

import board.vo.Board;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created by admin on 2017-05-02.
 */
public interface BoardMapper {

    Board getBoard(String num);

    ArrayList<Board> getBoards(Map<String, Object> map);

    int countPosting(Map<String, Object> map);

    void insertBoard(Map<String, Object> map);

    void updateBoard(Map<String, Object> map);

    void deleteBoard(String num);

    void incleaseViewCnt(String num); /* 조회수 증가 */

}
