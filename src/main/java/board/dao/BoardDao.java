package board.dao;

import board.vo.Board;

import java.util.ArrayList;

/**
 * Created by admin on 2017-05-02.
 */
public interface BoardDao {
    ArrayList<Board> getBoards();

    void insertBoard(Board member);

    void updateBoard(String name);

    void deleteBoard(String name);

}
