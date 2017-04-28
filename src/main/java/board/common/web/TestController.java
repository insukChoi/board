package board.common.web;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by insuk on 2017. 4. 15..
 */
@Controller
public class TestController {

    protected Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping("/list.do")
    public String Index(Model model) throws Exception
    {
        logger.info("index ....");
        return "view/board_list_view";
    }



}
