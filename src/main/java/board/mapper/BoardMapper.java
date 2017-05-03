package board.mapper;

import board.pojo.Board;

import java.util.ArrayList;

/**
 * Created by admin on 2017-05-02.
 */
public interface BoardMapper {
    ArrayList<Board> getBoards();

    void insertBoard(Board member);

    void updateBoard(String name);

    void deleteBoard(String name);

}