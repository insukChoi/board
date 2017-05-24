package board.controller.web;

import board.daoimpl.ReplyDaoService;
import board.vo.Reply;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by admin on 2017-05-22.
 */
@Controller
public class ReplyController {
    @Autowired
    private ReplyDaoService replyDaoService;


    protected Logger logger = Logger.getLogger(this.getClass());

    @ResponseBody
    @RequestMapping("/replyList.do")
    public  List<Reply> replyList(
            @RequestParam(value = "BOARD_NO") String boardNo,
            HttpServletResponse response) throws Exception
    {
        logger.info("replyList ....");

        // 댓글 목록 조회
        List<Reply> replyList = replyDaoService.getReplys(boardNo);
        return replyList;
    }

    @ResponseBody
    @RequestMapping("/addReply.do")
    public void addReply(
            @RequestParam(value = "BOARD_NO") String boardNo,
            @RequestParam(value = "whoPosted",required = false) String userId,
            @RequestParam(value = "commtCntn") String commtCntn,
            HttpServletResponse response) throws Exception
    {
        Reply reply = new Reply();
        reply.setBoardNum   (   boardNo     );
        reply.setUserId     (   userId      );
        reply.setContent    (   commtCntn   );
        // 댓글 추가
        replyDaoService.insertReply(reply);
    }

    @ResponseBody
    @RequestMapping("/removeReply.do")
    public void removeReply(
            @RequestParam(value = "TEMP_REPLY_NO") String replyNum,
            HttpServletResponse response) throws Exception
    {
       logger.info("replyNum = " + replyNum);
        // 댓글 삭제
        replyDaoService.deleteReply(replyNum);
    }

    @ResponseBody
    @RequestMapping("/modifyReply.do")
    public void modifyReply(
            @RequestParam(value = "TEMP_REPLY_NO") String replyNum,
            @RequestParam(value = "TEMP_REPLY_CONT") String replyContent,
            HttpServletResponse response) throws Exception
    {
        logger.info("replyNum = " + replyNum);
        logger.info("replyContent = " + replyContent);

        Reply reply = new Reply();
        reply.setNum        (   replyNum        );
        reply.setContent    (   replyContent    );
        // 댓글 삭제
        replyDaoService.updateReply(reply);
    }




}
