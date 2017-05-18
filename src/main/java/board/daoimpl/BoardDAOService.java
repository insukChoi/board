package board.daoimpl;

import board.dao.BoardDao;
import board.mapper.BoardMapper;
import board.vo.Board;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created by admin on 2017-05-02.
 */
@Repository
public class BoardDaoService implements BoardDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public Board getBoard(String num) {
        Board board = new Board();

        BoardMapper boardMapper = sqlSession.getMapper(BoardMapper.class);
        board = boardMapper.getBoard(num);

        return board;
    }

    @Override
    public ArrayList<Board> getBoards(Map<String, Object> map) {
        ArrayList<Board> result = new ArrayList<Board>();

        BoardMapper boardMapper = sqlSession.getMapper(BoardMapper.class);
        result = boardMapper.getBoards(map);

        return result;
    }

    @Override
    public int countPosting() {
        int count = 0;

        BoardMapper boardMapper = sqlSession.getMapper(BoardMapper.class);
        count = boardMapper.countPosting();

        return count;
    }

    @Override
    public void insertBoard(Map<String, Object> map) {
        BoardMapper boardMapper = sqlSession.getMapper(BoardMapper.class);
        boardMapper.insertBoard(map);
    }

    @Override
    public void updateBoard(Map<String, Object> map) {
        BoardMapper boardMapper = sqlSession.getMapper(BoardMapper.class);
        boardMapper.updateBoard(map);
    }

    @Override
    public void deleteBoard(String num) {
        BoardMapper boardMapper = sqlSession.getMapper(BoardMapper.class);
        boardMapper.deleteBoard(num);
    }

    @Override
    public void incleaseViewCnt(String num) {
        BoardMapper boardMapper = sqlSession.getMapper(BoardMapper.class);
        boardMapper.incleaseViewCnt(num);
    }


}
