/*
 * "This work is created by NimbusWeb and is copyrighted by NimbusWeb. (c) 2017 NimbusWeb.
 * You may not replicate, copy, distribute, or otherwise create derivative works of the copyrighted
 * material without prior written permission from NimbusWeb.
 *
 * Certain parts of this work contain code licensed under the MIT License.
 * https://www.webrtc-experiment.com/licence/ THE SOFTWARE IS PROVIDED "AS IS",
 * WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * */
/**
 - author: hasesanches
 - date: 04.07.16
 - http://hase.su
 **/

window.slackShare = {
    data: null,
    login: function () {
        if (!localStorage.slackToken) chrome.runtime.sendMessage({operation: 'oauth_slack'});
    },
    logout: function () {
        localStorage.slackToken = null;
        window.nimbus_core.setOption('slackToken', localStorage.slackToken);
        slackShare.data = null;
        $('#nsc_done_slack').css('display', 'none');
        localStorage.slackPanel = false;

        nimbusShare.server.user.authState(function (res) {
            if (res.errorCode === 0 && res.body && res.body.authorized) {
                $('#nsc_send').data('type', 'nimbus').trigger('change-type');
            } else {
                $('#nsc_send').data('type', '').trigger('change-type');
            }
        });
    },
    setView: function (data) {
        if (!data.channels || !data.users) {
            return;
        }
        let $channel = $('#nsc_slack_channel');
        let $user = $('#nsc_slack_user');
        $channel.find('li').remove();
        data.channels.sort(function (a, b) {
            if (a.name < b.name) {
                return 1;
            }
            if (a.name > b.name) {
                return -1;
            }
            return 0;
        });
        for (let chanlen = data.channels.length; chanlen--;) {
            $channel.append(
                $('<li>').append(
                    $('<a>').attr({
                        'href': '#',
                        //'title':   data.channels[chanlen].name,
                        'data-id': data.channels[chanlen].id
                    }).on('click', function (e) {
                        chrome.runtime.sendMessage({
                            operation: 'set_option',
                            key: 'slackChannel',
                            value: $(this).data('id')
                        });
                        $('#nsc_slack_list_group').find('li').removeClass('nsc-aside-list-selected');
                        $(this).closest('li').addClass('nsc-aside-list-selected');
                        return false;
                    }).text(data.channels[chanlen].name)
                ).append(
                    $('<span>').attr({
                        'class': 'nsc-icon nsc-fast-send',
                        'title': chrome.i18n.getMessage("tooltipUploadTo") + ' ' + data.channels[chanlen].name,
                        'data-id': data.channels[chanlen].id
                    }).on('click', function (e) {
                        $('#nsc_send').data('channel', $(this).data('id')).trigger('click');
                    })
                )
            );
        }

        $user.find('li').remove();
        data.users.sort(function (a, b) {
            if (a.name < b.name) {
                return 1;
            }
            if (a.name > b.name) {
                return -1;
            }
            return 0;
        });
        for (let uselen = data.users.length; uselen--;) {
            $user.append(
                $('<li>').append(
                    $('<a>').attr({
                        'href': '#',
                        'title': data.users[uselen].name,
                        'data-id': data.users[uselen].id
                    }).on('click', function (e) {
                        chrome.runtime.sendMessage({
                            operation: 'set_option',
                            key: 'slackChannel',
                            value: $(this).data('id')
                        });
                        $('#nsc_slack_list_group').find('li').removeClass('nsc-aside-list-selected');
                        $(this).closest('li').addClass('nsc-aside-list-selected');
                        return false;
                    }).text(data.users[uselen].name)
                ).append(
                    $('<span>').attr({
                        'class': 'nsc-icon nsc-fast-send',
                        'title': chrome.i18n.getMessage("tooltipUploadTo") + ' ' + data.users[uselen].name,
                        'data-id': data.users[uselen].id
                    }).on('click', function (e) {
                        $('#nsc_send').data('channel', $(this).data('id')).trigger('click');
                    })
                )
            );
        }
        if (localStorage.slackChannel !== undefined) {
            $('#nsc_slack_list_group').find('[data-id=' + localStorage.slackChannel + ']').closest('li').addClass('nsc-aside-list-selected');
        } else {
            $('#nsc_slack_list_group').find('li:eq(0)').addClass('nsc-aside-list-selected');
        }

        $('#nsc_slack_team_name').text(data.oauth.team_name);
    },
    sendScreenshot: function (file, channel) {
        let comment = $('#nsc_comment').val();
        let fd = new FormData();

        if (channel) {
            comment = comment.match(/([\s|\S]+)?\n\n-----------------([\s|\S]+)/) ? comment.match(/([\s|\S]+)?\n\n-----------------([\s|\S]+)/)[2] : '';
        }

        fd.append("token", slackShare.data.oauth.access_token);
        fd.append("file", file, nimbus_screen.getFileName('format'));
        fd.append("filename", 'Directly uploaded via Nimbus Capture for Chrome ' + nimbus_screen.getFileName('format'));
        fd.append("initial_comment", comment);
        fd.append("channels", channel || $('#nsc_slack_list_group .nsc-aside-list-selected a').data('id'));

        $('#nsc_loading_upload_file').addClass('visible');
        $('#nsc_message_view_uploads, #nsc_message_view_uploads_dropbox, #nsc_linked').removeClass('visible');
        $.ajax({
            type: 'POST',
            url: 'https://slack.com/api/files.upload',
            data: fd,
            processData: false,
            contentType: false,
            success: function (data) {
                $('#nsc_loading_upload_file').removeClass('visible');
                if (!data.ok) {
                    $.ambiance({message: 'error upload to slack', type: 'error', timeout: 5});
                } else {
                    //nimbus_screen.tracker.send(nimbus_screen.SLACK_UPLOAD);
                    $.ambiance({message: 'Upload has completed', timeout: 5});
                }
            }
        });
    },
    init: function () {
        if (slackShare.data) {
            slackShare.setView(slackShare.data);
        }
    }
};
