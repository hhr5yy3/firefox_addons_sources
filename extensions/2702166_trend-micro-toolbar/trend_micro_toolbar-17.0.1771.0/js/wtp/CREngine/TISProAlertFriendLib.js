function TSNSInsertAlertICON(objResult) {
    try{
        if (IsInSNSWallAndMalicious(objResult)){
            var objInsertNode = FindInsertPositionNode(objResult);
            if (objInsertNode &&
                objInsertNode.previousSibling &&
                objInsertNode.previousSibling.className == 'TSRSpan'){
                //Inserted
                return;
            }
            
            var shareFriendSpanIcon = document.createElement("DIV");
            shareFriendSpanIcon.id = 'TAlertWindowID';
            TMExt_$(shareFriendSpanIcon).css({
                    'cursor':           'pointer',
                    'margin':           '5px 0px 7px 0px',
                    'height':           '42px',
                    'width':            '314px',
                    'border':           'solid 1px',
                    'border-color':     '#bfbfbf',
                    'background-color': '#f2f2f2'
            });
            shareFriendSpanIcon.className = 'TSRSpan';
    
            var strAlertMsg = g_oToolTipString.ShareToFriend.ShareMsg;
            var imgSrc = TSREscapeURL(g_oImgDefine.ShareIcon);
            var strContent = [
                '<table>',
                    '<tbody>',
                        '<tr>',
                            '<td id=\'TUMSAlertMsgID\'>',
                            '<div>',
                                strAlertMsg,
                            '</div>',
                            '</td>',
                            '<td id=\'TUMSAlertMsgIconID\'>',
                            '<img src=\'' + imgSrc + '\'>',
                            '</td>',
                        '</tr>',
                    '</tbody>',
                '</table>'
            ];
            shareFriendSpanIcon.innerHTML = strContent.join('');
            
            var textArea = TMExt_$(shareFriendSpanIcon).find('#TUMSAlertMsgID')
           textArea.css({
                'color':        '#3F44D4',
                'width':        '230px',
                'height':       '35px',
                'font-size':    '12px',
                'text-align':   'left',
                'text-decoration': 'underline'
            });
            
            textArea.find('DIV').css({
                'margin-left':  '5px'
            });
            
            var imgArea = TMExt_$(shareFriendSpanIcon).find('#TUMSAlertMsgIconID'); 
            imgArea.css({
                'width':            '64px',
                'height':           '22px',
                'margin':           '0',
                'padding':          '0',
                'background-color': 'transparent'
            });
            
            shareFriendSpanIcon.onclick = function(){TShareToFriendHandler(objResult);}

            //All
            objInsertNode.parentNode.insertBefore(shareFriendSpanIcon, objInsertNode);
        }
    }catch(e){
        if (e.number && e.description) {
            //IE
            var err_msg = 'catch err:[\n';
            err_msg += 'Facility Code: ' + (e.number >> 16 & 0x1FFF) + '\n';
            err_msg += 'Number: ' + (e.number & 0xFFFF) + '\n';
            err_msg += 'Description: ' + e.description + '\n';
            TMExt_debug(err_msg);
        }else {
            //chrome & FireFox
            TMExt_debug(e);
        }
    }
}

function FindInsertPositionNode(objResult) {
    var node = TMExt_$(objResult.FindInsertNode());
    var form = node;
    var count = 0, max_iteration = 50;
    
    //home page
    while (!form.hasClass('_5pcr')) {
        form = form.parent();
        if (form.hasClass("UFIList")) {
            //if content is in Comment, don't do alert it.
            break;
        }
        if (++count == max_iteration) {
            break;
        }
    }
    
    //profile page
    if (form.length == 0) {
        form = node;
        count = 0;
        while (form[0].tagName.toUpperCase() != 'LI'){
            form = form.parent();
            if (++count == max_iteration){
                break;
            }
        }
    }

    var final_node = form.find('form');
    if (objResult.HomePage == 0){
        final_node = final_node.parent();
    }
    objResult.formTag = final_node;

    return final_node[0];
}

function IsInSNSWallAndMalicious(objResult) {
    var isMalicious = objResult.level == 3 || objResult.level == 4 || false;
    
    if (!isMalicious){
        return false;
    }
    
    var isMeetPattern = false;
    try {
        //Facebook Share
        if (/facebook\.com/.test(document.location)) {
            var node = TMExt_$(objResult.FindInsertNode());
            var form = node;
            var count = 0, max_iteration = 50;
            
            //home page
            objResult.HomePage = 1;
            
            while (!form.hasClass('_5pcr')) {
                form = form.parent();
                if (form.hasClass("UFIList")) {
                    //if content is in Comment, don't do alert it.
                    break;
                }
                if (++count == max_iteration) {
                    break;
                }
            }
            
            //profile page
            if (form.length == 0) {
                form = node;
                count = 0;
                while (form[0].tagName.toUpperCase() != 'LI'){
                    form = form.parent();
                    if (++count == max_iteration){
                        break;
                    }
                }
                objResult.HomePage = 0;
            }

            var comment = form.find("input[data-ft][type='button']");
            if (comment.length == 1) {
                TMExt_debug('Found comment of link:' + objResult.link);
                isMeetPattern = true;
                objResult.ShareComment = comment;
                objResult.ShareText = form;
            }
        }
    }catch (e) {
        TMExt_debug(e);
    }

    return isMeetPattern;
}

function TShareToFriendHandler(objResult) {
    if (!(objResult.ShareComment && objResult.ShareText))
        return;

    objResult.ShareComment.click();

    var TriggerKeyEvent = function(aText){
        try{
            //Chrome, IE9
            if (document.createEvent){
                var event = document.createEvent("KeyboardEvent");
                event.initKeyboardEvent("keydown", true, true, document.defaultView, true, true, true, false, 0, 90);
                aText[0].dispatchEvent(event);
            }
        }catch(e){}
        
        try{
            //IE7/8
            if (aText[0].fireEvent){
                aText[0].fireEvent("onkeydown");
            }
        }catch(e){}
            
        try{
            //Firefox
            if (document.createEvent){
                var event = document.createEvent("KeyboardEvent");
                event.initKeyEvent("keydown", true, true, null, true, true, true, false, 90, 0);
                aText[0].dispatchEvent(event);
            }
        }catch(e){}
    }

    var text = objResult.ShareText.find('TEXTAREA');
    if (text.length == 1) {
        var ShareString = g_oToolTipString.ShareToFriend.ShareString;
        //<----
        //In IE8 it should send twice to extend the height     
        //extend it's height
        TriggerKeyEvent(text);
        //---->
        
        //delay to make the text truly on the textarea
        setTimeout(function() {
                text.focus();
                text.val(''); //empty first
                text.val(ShareString);
                var inputTag = objResult.formTag.find('input[name=\'add_comment_text\']');
                inputTag.attr('value', ShareString);
                
                //extend it's height
                TriggerKeyEvent(text);
                
                //select it to highlight
                text.select();
            }, 500);
    }
}

/*********Share Feature*******
    showToolTip : function(retLevel){
        var that = this;
        var btn = TMExt_$("#UMS");
        btn.hide();
        //facebook
        if (/facebook\.com/.test(document.location)){
            if (retLevel == 3 || retLevel == 4){
                btn.show();
                btn.unbind();
                btn.click(function(){
                        var form = that.getCurrentTarget();
                        var count = 0;
                        while (form.attr("class") != "mainWrapper"){
                            form = form.parent();
                            if (++count == 50){
                                return;
                            }
                        }
                        var comment = form.find("input[data-ft='{\"type\":24}']");
                        TMExt_debug('comment length=' + comment.length);
                        if (comment.length == 1){
                            comment.click();
                            var text = form.find("TEXTAREA");
                            TMExt_debug("text length=" + text.length);
                            if (text.length == 1){
                                text.focus();
                                text.val(""); //empty first
                                text.val("The link [" + that.getLastNode() + "] may be dangerous. From TrendMicro");

                                //post - not work
                            }
                        }
                    }
                );
            }else{
                btn.hide();
            }
        }else if (/twitter.com/.test(document.location)){
            //twitter
            btn.show();
            btn.unbind();
            btn.click(function(){
                var form = that.getCurrentTarget();
                var count = 0;
                while (form.attr("class") != "tweet-content"){
                    form = form.parent();
                    if (++count == 50){
                        return;
                    }
                }
                var reply = form.find('a[title="Reply"] span');
                TMExt_debug('a[title="Reply"] span length=' + reply.length);
    
                if (reply.length == 1){
                    reply.click();
                    var text = TMExt_$('textarea[dir="ltr"]');
                    TMExt_debug('textarea[dir="ltr"] length=' + text.length);
                    if (text.length != 0){
                        var lastText = TMExt_$(text[text.length - 1]);
                        var at = lastText.val();
                        var msg = "The link [" + that.getLastNode() + "] may be dangerous. From TrendMicro";
                        lastText.val(at + msg);
                        
                        //post - not work
                        var post = TMExt_$('div[class="twttr-dialog-content"]');
                        while (post.children().attr("tagName")){
                            post = post.children().last();
                        }
                        post.click();
                    }
                }
            });
        }else if (/myspace.com/.test(document.location)){
            //myspace
            if (retLevel == 3 || retLevel == 4){
                btn.show();
                btn.unbind();
                btn.click(function(){
                    var form = that.getCurrentTarget();
                    var count = 0;
                    while (form.attr("tagName") != "LI"){
                        form = form.parent();
                        if (++count == 50){
                            return;
                        }
                    }

                    var comment = form.find("a[id] span");
                    TMExt_debug('a[id] span length ' + comment.length);
                    if (comment.length == 1){
                        comment.click();
                        var commentContainer = form.children().last();
                        var s = commentContainer.attr("class").split(" ");
                        if (s[s.length - 1] == "hidden"){
                            s.pop();
                            commentContainer.attr("class", s.join(" "));
                        }
                        var text = form.find('div[class="smartEdit"]');
                        TMExt_debug('div[class="smartEdit"] length=' + text.length);
                        if (text.length == 1){
                            text.focus();
                            text.html(""); //empty first
                            text.html("The link [" + that.getLastNode() + "] may be dangerous. From TrendMicro");
                            
                            //post - work
                            //var post = text.next();
                            //post.click();
                        }
                    }
                });
            }else{
                btn.hide();
            }
        }else if (/weibo.com/.test(document.location)){
            //sina weibo - not work
            if (true || retLevel == 3 || retLevel == 4){
                btn.show();
                btn.unbind();
                btn.click(function(){
                    var form = that.getCurrentTarget();
                    var count = 0;
                    while (form.attr("class") != "content"){
                        form = form.parent();
                        if (++count == 50){
                            return;
                        }
                    }
                    
                    var comment = form.find('a[action-type="feed_list_comment"]');
                    TMExt_debug('a[action-type="feed_list_comment"] length=' + comment.length);
                    if (comment.length == 1){
                        comment.click();
                        //not work
                    }
                });
            }else{
                btn.hide();
            }
        }else if (/plus.google.com/.test(document.location)){
            //Google+
            if (retLevel == 3 || retLevel == 4){
                btn.show();
                btn.unbind();
                btn.click(function(){
                    var form = that.getCurrentTarget();
                    var count = 0;
                    while (!form.attr("tabindex")){
                        form = form.parent();
                        if (++count == 50){
                            return;
                        }
                    }
                    var comment = form.find('div[class="dl"]');
                    TMExt_debug('div[class="dl"] length=' + comment.length);
                    if (comment.length == 1){
                        comment = comment.children().first();
                        while (comment.text() != "Comment"){
                            comment = comment.next();
                        }
                        comment.click();
                        
                        var frame = form.find('iframe[frameborder]');
                        TMExt_debug('iframe[frameborder] length=' + frame.length);
                        if (frame.length == 1){
                            var text = TMExt_$(frame[0].contentWindow.document.body);
                            text.html(""); //empty first
                            text.html("The link [" + that.getLastNode() + "] may be dangerous. From TrendMicro");
                        
                            //post - notwork
                            //var post = form.find('div[role="button"]').first();
                            //TMExt_debug('div[role="button"] length=' + post.length);
                            //if (post.length == 1){
                            //    setTimeout(function(){
                            //        post.click();
                            //    }, 2000);
                            //}
                        }
                    }
                });
            }else{
                btn.hide();
            }
        }else if (/linkedin.com/.test(document.location)){
            //linkedin
            if (true || retLevel == 3 || retLevel == 4){
                btn.show();
                btn.unbind();
                btn.click(function(){
                    var form = that.getCurrentTarget();
                    var count = 0;
                    while (form.attr("tagName") != "LI"){
                        form = form.parent();
                        if (++count == 50){
                            return;
                        }
                    }
                    
                    var comment = form.find('li[class="feed-comment"] a[class="focus-comment-form"]');
                    TMExt_debug('li[class="feed-comment"] a[class="focus-comment-form"] length=' + comment.length);
                    if (comment.length == 1){
                        comment.click();
                    }
                });
            }else{
                btn.hide();
            }
        }else if (/TEMPLATE.TEMPLATE.COM/.test(document.location)){
            //TEMPLATE
            if (true || retLevel == 3 || retLevel == 4){
                btn.show();
                btn.unbind();
                btn.click(function(){
                    var form = that.getCurrentTarget();
                    var count = 0;
                    while (form.attr("") != ""){
                        form = form.parent();
                        if (++count == 50){
                            return;
                        }
                    }
                });
            }else{
                btn.hide();
            }
        }
        this.getToolTip().slideDown();
    },
*********Share Feature*******/