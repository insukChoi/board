package board.common.web;

import board.daoimpl.BoardDAOService;
import board.pojo.Board;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * Created by insuk on 2017. 4. 15..
 */
@Controller
public class ListController {

    @Autowired
    private BoardDAOService boardDAOService;

    protected Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list.do")
    public ModelAndView Index(Model model) throws Exception
    {
        logger.info("index ....");
        ModelAndView result = new ModelAndView();
        List<Board> boardList = boardDAOService.getBoards();
        result.addObject("result", boardList);
        result.setViewName("view/board_list_view");
        return result;
    }



}
