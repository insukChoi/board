package board.mapper;

import board.vo.Reply;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created by admin on 2017-05-22.
 */
public interface ReplyMapper {
    ArrayList<Reply> getReplys(String boardNum);

    void insertReply(Reply reply);

    void updateReply(Reply reply);

    void deleteReply(String num);

}
