package board.dao;

import board.vo.Reply;

import java.util.ArrayList;

/**
 * Created by admin on 2017-05-22.
 */
public interface ReplyDao {

    ArrayList<Reply> getReplys(String boardNum);

    void insertReply(Reply reply);

    void updateReply(Reply reply);

    void deleteReply(String num);

}
