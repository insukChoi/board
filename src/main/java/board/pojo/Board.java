package board.pojo;

/**
 * Created by admin on 2017-05-02.
 */
public class Board {
    private String num;
    private String user_id;
    private String title;
    private String content;
    private String regDate;
    private String viewCnt;

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public String getViewCnt() {
        return viewCnt;
    }

    public void setViewCnt(String viewCnt) {
        this.viewCnt = viewCnt;
    }
}

