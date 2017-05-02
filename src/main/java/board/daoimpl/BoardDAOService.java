package board.daoimpl;

import board.dao.BoardDao;
import board.mapper.BoardMapper;
import board.pojo.Board;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

/**
 * Created by admin on 2017-05-02.
 */
@Repository
public class BoardDAOService implements BoardDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public ArrayList<Board> getBoards() {
        ArrayList<Board> result = new ArrayList<Board>();

        BoardMapper boardMapper = sqlSession.getMapper(BoardMapper.class);
        result = boardMapper.getBoards();

        return result;
    }

    @Override
    public void insertBoard(Board member) {
        BoardMapper boardMapper = sqlSession.getMapper(BoardMapper.class);
        boardMapper.insertBoard(member);
    }

    @Override
    public void updateBoard(String name) {

    }

    @Override
    public void deleteBoard(String name) {
        BoardMapper boardMapper = sqlSession.getMapper(BoardMapper.class);
        boardMapper.deleteBoard(name);
    }
}
