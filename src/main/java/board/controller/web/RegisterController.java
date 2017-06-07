package board.controller.web;

import board.daoimpl.BoardDaoService;
import board.vo.Board;
import common.comm.CommandMap;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Date;
import java.util.List;

/**
 * Created by admin on 2017-05-15.
 */
@Controller
public class RegisterController {

    @Autowired
    private BoardDaoService boardDaoService;

    protected Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/register")
    public ModelAndView register(CommandMap commandMap, RedirectAttributes redirectAttributes) throws Exception
    {
        logger.info("register ....");
        ModelAndView result = new ModelAndView("redirect:/list.do");
        boardDaoService.insertBoard(commandMap.getMap());

        redirectAttributes.addFlashAttribute("PROCESS_CODE","C");
        return result;
    }
}
