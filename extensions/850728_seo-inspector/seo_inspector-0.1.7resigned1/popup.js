var data = {};
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "scrapePage"}, function(resp) {
        if (resp === undefined)
        {
            $('#seo-content').html('<p>Please reload the page and then re-open this popup. :)</p>');
        }
        data = resp;
        /* ... */
        add_title_data(data);
        add_h1_data(data);
        add_meta_data(data);

        set_html_tag_status(data);
        set_meta_field_status(data);
        load_meta_data_settings();
        load_html_tag_settings();
        load_highlight_settings();
    });
});

function add_meta_data(data) {
    var meta_count = 0;
    if (data.meta.description !== undefined && data.meta.description.length > 0) 
    {
        meta_count++;
    }

    if (data.meta.keywords !== undefined && data.meta.keywords.length > 0) 
    {
        meta_count++;
    }

    if (data.meta.author !== undefined && data.meta.author.length > 0) 
    {
        meta_count++;
    }

    if (data.meta.viewport !== undefined && data.meta.viewport.length > 0) 
    {
        meta_count++;
    }
    $('#meta-count').html(meta_count);
    $('#meta-list').append('<h5>Description: <span id="description-required-tag"></span> </h5><li class="list-group-item">' + data.meta.description + '</li>')
    $('#meta-list').append('<h5>Keywords: <span id="keywords-required-tag"></span> </h5><li class="list-group-item">' + data.meta.keywords + '</li>')
    $('#meta-list').append('<h5>Author: <span id="author-required-tag"></span> </h5><li class="list-group-item">' + data.meta.author + '</li>')
    $('#meta-list').append('<h5>Viewport: <span id="viewport-required-tag"></span> </h5><li class="list-group-item">' + data.meta.viewport + '</li>')
}

function set_meta_field_status(data)
{
    chrome.storage.local.get('meta-fields-required', function (result) {
        var meta_fields_required_set = result['meta-fields-required'] !== undefined;
        $('#meta-li').removeClass('list-group-item-danger');
        $('#meta-li').addClass('list-group-item-success');
        if (meta_fields_required_set && result['meta-fields-required']['description-required'] && (data.meta.description === undefined || data.meta.description.length === 0)) 
        {
            $('#meta-li').addClass('list-group-item-danger');
            $('#description-required-tag').html('(required)');
        }
        else
        {
            $('#description-required-tag').html('');
        }
    
        if (meta_fields_required_set && result['meta-fields-required']['keywords-required'] && (data.meta.keywords === undefined || data.meta.keywords.length === 0)) 
        {
            $('#meta-li').addClass('list-group-item-danger');
            $('#keywords-required-tag').html('(required)');
        }
        else
        {
            $('#keywords-required-tag').html('');
        }
    
        if (meta_fields_required_set && result['meta-fields-required']['author-required'] && (data.meta.author === undefined || data.meta.author.length === 0)) 
        {
            $('#meta-li').addClass('list-group-item-danger');
            $('#author-required-tag').html('(required)');
        }
        else
        {
            $('#author-required-tag').html('');
        }
    
        if (meta_fields_required_set && result['meta-fields-required']['viewport-required'] && (data.meta.viewport === undefined || data.meta.viewport.length === 0))
        {
            $('#meta-li').addClass('list-group-item-danger');
            $('#viewport-required-tag').html('(required)');
        }
        else
        {
            $('#viewport-required-tag').html('');
        }
    });
}

function add_title_data(data) {
    var title_count = (data.title.text !== undefined && data.title.text.length > 0) ? 1 : 0;
    $('#title-count').html(title_count);
    if (title_count !== 1)
    {
        $('#title-li').addClass('list-group-item-danger');
    }
    else
    {
        $('#title-li').addClass('list-group-item-success');
    }
    $('#title-list').append('<li class="list-group-item">' + data.title.text + '</li>')
}

function add_h1_data(data) {
    $('#h1-count').html(data.h1.count);
    if (data.h1.count !== 1)
    {
        $('#h1-tags-li').addClass('list-group-item-danger');
    }
    else
    {
        $('#h1-tags-li').addClass('list-group-item-success');
    }
    $.each(data.h1.list, function(item, value) {
        if (value.trim().length === 0)
        {
            value = '{h1 is empty. It may be an image or a hidden element.}'
        }
        $('#h1-list').append('<li class="list-group-item">' + value + '</li>')
    })

}

$('.expand-icon').on('click', function() {
    if ($(this).hasClass('glyphicon-plus'))
    {
        $(this).removeClass('glyphicon-plus');
        $(this).addClass('glyphicon-minus');
        $(this).closest('li').find('.item-list').show('normal');
    }
    else
    {
        $(this).removeClass('glyphicon-minus');
        $(this).addClass('glyphicon-plus');
        $(this).closest('li').find('.item-list').hide('normal');
    }
});

function set_html_tag_status(data)
{
    chrome.storage.local.get('html-tag-settings', function (result) {
        $('#h1-count').html(data.h1.count);
        $('#h1-tags-li').removeClass('list-group-item-danger');
        if (result['html-tag-settings'] !== undefined && result['html-tag-settings']['desired-h1-num'] !== 'any' && data.h1.count != result['html-tag-settings']['desired-h1-num'])
        {
            $('#h1-tags-li').addClass('list-group-item-danger');
            var comment = result['html-tag-settings']['h1-comment'] === undefined ? '' : result['html-tag-settings']['h1-comment'];
            if ($('#h1-comment-well').length === 1)
            {
                $('#h1-comment-well').html(comment);
            }
            else
            {
                $('#h1-list').before('<div class="item-list"><h5>Comment: </h5><div id="h1-comment-well" class="well" style="word-wrap: break-word;">'+comment+'</div><h5>h1 Tags: </h5></div>');
            }
        }
        else
        {
            $('#h1-comment-well').closest('.item-list').remove();
            $('#h1-tags-li').addClass('list-group-item-success');
        }
    });
}

function load_html_tag_settings()
{
    chrome.storage.local.get('html-tag-settings', function (result) {
        if (result['html-tag-settings'] !== undefined)
        {
            var comment = result['html-tag-settings']['h1-comment'] === undefined ? '' : result['html-tag-settings']['h1-comment'];
            $('#h1-comment').html(comment);
            $('#desired-h1-num').val(result['html-tag-settings']['desired-h1-num']);
        }
    });
}

function load_highlight_settings()
{
    chrome.storage.local.get('highlight-h1', function (result) {
        if (result['highlight-h1'] !== undefined)
        {
            var checked = result['highlight-h1'] === undefined ? false : result['highlight-h1'];
            $('#highlight-h1').prop('checked', checked);   
        }
    });
}

function load_meta_data_settings()
{
    chrome.storage.local.get('meta-fields-required', function (result) {
        var meta_fields_required_set = result['meta-fields-required'] !== undefined;
        if (meta_fields_required_set)
        {
            var checked = result['meta-fields-required']['description-required'] === undefined ? false : result['meta-fields-required']['description-required'];
            $('#description-required').prop('checked', checked);

            var checked = result['meta-fields-required']['keywords-required'] === undefined ? false : result['meta-fields-required']['keywords-required'];
            $('#keywords-required').prop('checked', checked);

            var checked = result['meta-fields-required']['author-required'] === undefined ? false : result['meta-fields-required']['author-required'];
            $('#author-required').prop('checked', checked);

            var checked = result['meta-fields-required']['viewport-required'] === undefined ? false : result['meta-fields-required']['viewport-required'];
            $('#viewport-required').prop('checked', checked);
        }
    });
}


$('#highlight-h1').on('change', function() {
    var checked = this.checked;
    chrome.storage.local.set({ 'highlight-h1': $('#highlight-h1').prop('checked') }, function() {});
})

/**
 * Save settings
 */
$('#save-settings-btn').on('click', function() {
    var settings = {
        'highlight-h1': $('#highlight-h1').prop('checked'),
        'html-tag-settings': {
            'h1-comment': $('#h1-comment').val(),
            'desired-h1-num': $('#desired-h1-num').val()
        },
        'meta-fields-required' : {
            'description-required': $('#description-required').prop('checked'),
            'keywords-required': $('#keywords-required').prop('checked'),
            'author-required': $('#author-required').prop('checked'),
            'viewport-required': $('#viewport-required').prop('checked'),
        }
    };
    chrome.storage.local.set(settings, function() {
        $('#h1-comment-well').html($('#h1-comment').val()); // update comment on other tab
        set_meta_field_status(data);
        set_html_tag_status(data);
        toastr.success('Settings saved!')
    });
});