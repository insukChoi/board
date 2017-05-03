package board.common.error;

import org.apache.log4j.Logger;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by admin on 2017-05-03.
 */
public class errorController {

    protected Logger logger = Logger.getLogger(this.getClass());

    @RequestMapping(value = "/error404", method = RequestMethod.GET)
    public String error404(Model model) throws Exception
    {
        logger.warn("404 error occurred...");

        return "view/404_error_view";
    }

    @RequestMapping(value = "/error403", method = RequestMethod.GET)
    public String error403(Model model) throws Exception
    {
        logger.warn("403 error occurred");

        return "view/404_error_view";
    }


}
