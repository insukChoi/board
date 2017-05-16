<%@page contentType="text/html;charset=utf-8"%>

<script type="text/javascript">

    $(document).ready(function(){

        $("#addBoard").on("click", function(e){
            e.preventDefault();

            // 게시글 쓰기 화면으로 이동
            var boardSubmit = new common.board.BoardSubmit();
            boardSubmit.setUrl("/newPosting.do");
            boardSubmit.submit();
        });
    });

</script>


<!-- lnb box -->
<div class="lnb_box">
    <!-- lnb top -->
    <div class="lnb_top">
        <!-- user view -->
        <div class="user_view">
            <div class="user_r_side">
                <p class="icon_user"><strong>최인석</strong> 님</p>
            </div>
        </div>
        <!-- //user view -->
    </div>
    <!-- //lnb top -->

    <div class="gohome">
        <a id="addBoard" href="#none">게시글 등록</a>
    </div>

    <!-- lnb_cont -->
    <div class="lnb_cont">
        <dl>
            <dt class="on"><h2><a href="#none">자유게시판</a></h2></dt><!-- 활성화클래스 on -->
            <dd>
                <ul>
                    <li class="on"><a href="/list.do">게시판</a></li><!-- 활성화클래스 on -->
                </ul>
            </dd>
        </dl>
        <%--            <dl>
                        <dt><h2><a href="#none">공지사항2</a></h2></dt>
                        <dd>
                            <ul>
                                <li><a href="#none">공지사항2-1</a></li>
                                <li><a href="#none">공지사항2-2</a></li>
                                <li><a href="#none">공지사항2-3</a></li>
                            </ul>
                        </dd>
                    </dl>--%>
    </div>
    <!-- //lnb_cont -->
</div>
<!-- //lnb box -->