package board.controller.web;

import board.daoimpl.BoardDaoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Created by admin on 2017-05-15.
 */
@Controller
public class ModyfyController {

    @Autowired
    private BoardDaoService boardDaoService;

    protected Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/deletePost.do")
    public ModelAndView deletePost(
            @RequestParam(value="BOARD_NO", defaultValue = "") String boardNo,
            RedirectAttributes redirectAttributes) throws Exception
    {
        logger.info("deletePost ....");
        ModelAndView result = new ModelAndView("redirect:/list.do");
        boardDaoService.deleteBoard(boardNo);

        redirectAttributes.addFlashAttribute("PROCESS_CODE","D");
        return result;
    }

}
