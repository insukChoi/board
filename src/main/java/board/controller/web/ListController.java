package board.controller.web;

import board.daoimpl.BoardDaoService;
import board.vo.Board;
import common.comm.CommandMap;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by insuk on 2017. 4. 15..
 */
@Controller
public class ListController {

    @Autowired
    private BoardDaoService boardDaoService;

    protected Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list.do")
    public ModelAndView list(CommandMap commandMap, Model model) throws Exception
    {
        logger.info("index ....");

        // 페이징 처리
        Object pageNo = commandMap.get("PAGE_NO");
        Object pageSz = commandMap.get("PAGE_SZ");
        if(pageNo != null && pageSz != null) {
            pageNo = (Integer.parseInt((String)pageNo) - 1) * Integer.parseInt((String)pageSz);
        }
        commandMap.put("PAGE_NO" , pageNo);
        commandMap.put("PAGE_SZ" , pageSz);

        // 게시글 목록 조회
        List<Board> boardList = boardDaoService.getBoards(commandMap.getMap());

        // 총 카운트 조회
        int count = boardDaoService.countPosting();

        ModelAndView result = new ModelAndView();
        result.addObject("result", boardList);
        result.addObject("count", count);
        result.setViewName("view/board_list_view");
        return result;
    }

    @RequestMapping("/newPosting.do")
    public String newPosting(Model model) throws Exception
    {
        logger.info("newPosting ....");
        return "view/board_write_view";
    }

    @RequestMapping("/modyPosting.do")
    public ModelAndView modyPosting(@RequestParam(value="BOARD_NO", defaultValue = "") String boardNo) throws Exception
    {
        logger.info("modyPosting ....");

        // 조회 수 증가
        boardDaoService.incleaseViewCnt(boardNo);

        // 수정 페이지로 이동
        ModelAndView result = new ModelAndView();
        Board board = boardDaoService.getBoard(boardNo);
        result.addObject("BOARD", board);
        result.setViewName("view/board_mody_view");
        return result;
    }


}
