package board.controller.web;

import board.daoimpl.BoardDaoService;
import common.comm.CommandMap;
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

    @RequestMapping("/deletePost")
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

    @RequestMapping("/modify")
    public ModelAndView modify(
            @RequestParam("BOARD_NO") String boardNo,
            @RequestParam("TITLE") String title,
            @RequestParam("CONTENT") String content,
            RedirectAttributes redirectAttributes) throws Exception
    {
        logger.info("modify ....");

        ModelAndView result = new ModelAndView("redirect:/modyPosting.do?BOARD_NO="+boardNo);

        CommandMap commandMap = new CommandMap();
        commandMap.put("NUM", boardNo);
        commandMap.put("TITLE", title);
        commandMap.put("CONTENT", content);
        boardDaoService.updateBoard(commandMap.getMap());

        redirectAttributes.addFlashAttribute("PROCESS_CODE","U");
        return result;
    }


}
