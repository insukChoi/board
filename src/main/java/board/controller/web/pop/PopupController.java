package board.controller.web.pop;

import board.daoimpl.BoardDaoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by admin on 2017-05-08.
 */
@Controller
public class PopupController {
    @Autowired
    private BoardDaoService boardDaoService;

    protected Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/detail_pop.do")
    public String detail_pop() throws Exception
    {
        logger.info("detail pop ....");
        return "/pop/detail_board_pop";
    }

}
