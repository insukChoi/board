package board.controller.web;

import board.daoimpl.BoardDaoService;
import board.vo.Board;
import common.comm.CommandMap;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
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

    @RequestMapping("/list")
    public ModelAndView list(
            @RequestParam(value = "PAGE_NO", required = false) Object tmpPageNo,
            @RequestParam(value = "PAGE_SZ", required = false) Object tmpPageSz,
            @RequestParam(value = "SEARCH_TEXT", required = false) String serachText,
            @CookieValue(value="PAGE_SIZE", defaultValue="15") String cookie) throws Exception
    {
        logger.info("index ....");

        // 페이징 처리
        Object pageNo = tmpPageNo;
        Object pageSz = tmpPageSz;
        if(pageNo != null && pageSz != null) {
            tmpPageSz = Integer.parseInt((String)pageNo) * Integer.parseInt((String)pageSz);
            tmpPageNo = 1 + ((Integer.parseInt((String)pageNo) - 1) * Integer.parseInt((String)pageSz));
        }

        CommandMap commandMap = new CommandMap();
        commandMap.put("PAGE_NO" , tmpPageNo == null ? "1"    : tmpPageNo);
        commandMap.put("PAGE_SZ" , tmpPageSz == null ? cookie : tmpPageSz);
        commandMap.put("SEARCH_TEXT" , serachText);

        // 게시글 목록 조회
        List<Board> boardList = boardDaoService.getBoards(commandMap.getMap());

        // 총 카운트 조회
        int count = boardDaoService.countPosting(commandMap.getMap());

        ModelAndView result = new ModelAndView();
        result.addObject("RESULT", boardList);
        result.addObject("COUNT", count);
        result.addObject("PAGE_NO", pageNo);
        result.addObject("SEARCH_TEXT", serachText);
        result.setViewName("view/board_list_view");
        return result;
    }

    @RequestMapping("/newPosting")
    public String newPosting(Model model) throws Exception
    {
        logger.info("newPosting ....");
        return "view/board_write_view";
    }

    @RequestMapping("/modyPosting")
    public ModelAndView modyPosting(@RequestParam(value="BOARD_NO", defaultValue = "") String boardNo) throws Exception
    {
        logger.info("modyPosting ...." + boardNo);

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
