package board.dao;

import board.vo.Board;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created by admin on 2017-05-02.
 */
public interface BoardDao {

    Board getBoard(String num);

    ArrayList<Board> getBoards(Map<String, Object> map);

    int countPosting();

    void insertBoard(Map<String, Object> map);

    void updateBoard(String num);

    void deleteBoard(String num);

    void incleaseViewCnt(String num); /* 조회수 증가 */

}
