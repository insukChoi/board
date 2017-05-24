package board.daoimpl;

import board.dao.ReplyDao;
import board.mapper.ReplyMapper;
import board.vo.Reply;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created by admin on 2017-05-22.
 */
@Repository
public class ReplyDaoService implements ReplyDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public ArrayList<Reply> getReplys(String boardNum) {
        ArrayList<Reply> result = new ArrayList<Reply>();

        ReplyMapper replyMapper = sqlSession.getMapper(ReplyMapper.class);
        result = replyMapper.getReplys(boardNum);

        return result;
    }

    @Override
    public void insertReply(Reply reply) {
        ReplyMapper replyMapper = sqlSession.getMapper(ReplyMapper.class);
        replyMapper.insertReply(reply);
    }

    @Override
    public void updateReply(Reply reply) {
        ReplyMapper replyMapper = sqlSession.getMapper(ReplyMapper.class);
        replyMapper.updateReply(reply);
    }

    @Override
    public void deleteReply(String num) {
        ReplyMapper replyMapper = sqlSession.getMapper(ReplyMapper.class);
        replyMapper.deleteReply(num);
    }
}
