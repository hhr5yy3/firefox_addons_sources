const ea_rules_zh = {
    "EA-R1": {
        "content": "SVG 语法错误",
        "explanation": "SVG 元素的语法不正确。缺少 role-attribute 或 title/desc 元素。",
        "tip": "检查 SVG 的角色或标题/描述元素。"
    },
    "EA-R2": {
        "content": "<svg> 缺少可访问文本",
        "explanation": "具有 \"img \"角色的 <svg> 元素需要一个可访问的名称，以便屏幕阅读器用户了解其内容和目的。",
        "tip": "为 <svg> 创建标题属性、标题/描述元素或 aria 属性。"
    },
    "EA-R3": {
        "content": "<svg> 替代文本非常短（<5 个字符）",
        "explanation": "SVG 可访问文本非常短（<5 个字符），可能无法充分描述图形。",
        "tip": "检查可访问文本是否充分描述了 SVG。"
    },
    "EA-R4": {
        "content": "<svg> 替代文本很长（>150 个字符）",
        "explanation": "SVG 替代文本非常长（>150 个字符），有可能被概括。许多盲人借助盲文显示器阅读文本。盲文显示器至少可以输出 40 个字符，但最多只能输出 80 个字符。",
        "tip": "总结描述要点。"
    },
    "EA-R5": {
        "content": "可访问的 <svg> 有点长（>80 个字符）",
        "explanation": "SVG 替代文本有点长（大于 80 个字符），有可能被概括。许多盲人借助盲文显示器阅读文本。盲文显示器至少可以输出 40 个字符，但最多只能输出 80 个字符。",
        "tip": "总结描述要点。"
    },
    "EA-R6": {
        "content": "图片缺少替代文字",
        "explanation": "图片（<img> 或 role=\"img\"）需要一个替代文本，以便屏幕阅读器用户了解图片的内容和目的。title 属性并非总能被可靠识别。",
        "tip": "使用 alt-、aria-label- 或 aria-labelledby- 属性添加有意义的替代文本。装饰性图片可使用空 alt 属性。"
    },
    "EA-R7": {
        "content": "作为外链的多余 alt 文本",
        "explanation": "图片的替代文本与所附链接相同。在相邻文本中重复链接或图片的备选文本是不必要的，而且会让屏幕阅读器用户读两遍而产生混淆。",
        "tip": "删除图片的 alt 文本，因为它不包含任何附加信息。在图片中使用空 alt 属性 alt=\"\"。"
    },
    "EA-R8": {
        "content": "链接图片中缺少备选文本",
        "explanation": "由于链接本身不包含文本，因此图片必须有替代文本，以便屏幕阅读器识别链接的内容和目的。标题属性并不能满足所有屏幕阅读器的要求。",
        "tip": "为链接或链接图片添加有意义的替代文本。"
    },
    "EA-R9": {
        "content": "图像替代文本非常短（<5 个字符）",
        "explanation": "图片的备选文本应以有意义的方式描述其内容。",
        "tip": "检查替代文本是否充分描述了图像。"
    },
    "EA-R10": {
        "content": "图像替代文字很长（>150 个字符）",
        "explanation": "该图像的备选文本非常长（超过 150 个字符），有可能被概括。许多盲人借助盲文显示器阅读文本。盲文显示器至少可以输出 40 个字符，但最多只能输出 80 个字符。",
        "tip": "总结描述的精髓。"
    },
    "EA-R11": {
        "content": "图像替代文字有点长（>80 个字符）",
        "explanation": "替代文本有点长（大于 80 个字符），可能会被概括。许多盲人借助盲文显示器阅读文本。盲文显示器至少可以输出 40 个字符，但最多只能输出 80 个字符。",
        "tip": "总结描述的精髓。"
    },
    "EA-R12": {
        "content": "链接必须有无障碍文本",
        "explanation": "链接要求链接文本能被屏幕阅读器理解并正确输出。链接文本应清楚地解释读者点击该链接将获得哪些信息。",
        "tip": "使用描述链接目的和目标的内部文本或 ARIA 属性，添加有意义的链接文本。对于屏幕阅读器来说，链接文本也不得隐藏（例如，使用 display: none 或 aria-hidden=\"true\"）。"
    },
    "EA-R13": {
        "content": "空链接",
        "explanation": "此链接没有内容和目标（href-attribute）。",
        "tip": "删除空链接。"
    },
    "EA-R14": {
        "content": "链接可访问文本为 URL",
        "explanation": "链接文本应该有意义，并描述链接的目的和目标。屏幕阅读器用户应能轻松决定是否要跟踪链接。",
        "tip": "请务必使用能说明链接目的和目标的描述。链接文本也不得对屏幕阅读器隐藏（例如，使用 display: none 或 aria-hidden=\"true\"）。"
    },
    "EA-R15": {
        "content": "链接文本过长（>150 个字符）",
        "explanation": "该链接的可访问文本非常长（>150 个字符），有可能被概括。许多盲人借助盲文显示器阅读文本。盲文显示器至少可以输出 40 个字符，但最多只能输出 80 个字符。",
        "tip": "确保使用有意义和紧凑的文本。"
    },
    "EA-R16": {
        "content": "<object> 缺少可访问名称",
        "explanation": "<object> 元素可以包含多媒体内容（音频、视频等），并且必须有一个屏幕阅读器可访问的名称。如果没有文本替代，屏幕阅读器用户就无法知道对象的内容。",
        "tip": "使用标题或 aria-label 和 aria-labelledby 等 aria 属性为 <object> 添加一个可访问的名称。"
    },
    "EA-R17": {
        "content": "检测到音频",
        "explanation": "检查音频中是否传达了信息（例如通过解说员的声音）。如果是，则需要进行转录。",
        "tip": "检查音频文件是否需要转录。如果需要，请提供替代方案，例如文本转录。"
    },
    "EA-R18": {
        "content": "检测到视频",
        "explanation": "检查视频是否需要媒体替代或字幕。如果视频没有字幕，聋人用户只能有限地获取或无法获取其中包含的信息。同样，盲人用户也无法使用无声视频文件（没有声音）。他们也需要完整的媒体替代（文本、替代音轨或音频文件）。",
        "tip": "检查视频是否需要媒体替代或字幕，并在必要时提供。"
    },
    "EA-R19": {
        "content": "检测到多个 H1 标题",
        "explanation": "页面的标题结构应具有逻辑性，如有可能，应从 H1 标题开始。H1 标题确定页面最重要的部分。",
        "tip": "如果可能，只使用一个 H1 标题。其他标题可使用 H2、H3 等。"
    },
    "EA-R20": {
        "content": "缺少 H1 标题",
        "explanation": "要么没有 H1 标题，要么它被屏幕阅读器隐藏了。检查 H1 标题是否存在并可见，因为它是标题结构（h1-h6）中第一个也是最重要的元素。<h1> 元素应位于主要内容的开头，以便屏幕阅读器用户使用键盘快捷键直接导航到主要内容。",
        "tip": "如果可能，一定要创建一个可见的 <h1> 标题来描述页面内容。"
    },
    "EA-R21": {
        "content": "按标题顺序跳转",
        "explanation": "页面的标题结构应合理有序，标题级别只能增加一级。避免跳跃，例如从 H2 跳到 H4。",
        "tip": "标题顺序尽量不要跳跃。"
    },
    "EA-R22": {
        "content": "列表项 <li> 不是列表的一部分",
        "explanation": "有效的列表必须始终以 <ul> 或 <ol> 元素为框架。否则，屏幕阅读器将无法正确将列表元素检测为列表。通过角色属性注意 <ul> 或 <ol> 父元素的可能角色。",
        "tip": "使用 <ul> 或 <ol> 父元素建立正确的列表。如果已经设置了 <ul> 或 <ol> 元素，请通过角色属性注意可能的角色。"
    },
    "EA-R23": {
        "content": "文本对比度不足",
        "explanation": "确保所有文字元素的前景文字与背景颜色之间有足够的色彩对比。最小对比度取决于文字大小，较大的文字（>18pt）为 3:1 或 4.5:1。",
        "tip": "增加对比度，如使用更深/更浅的字体或背景颜色。"
    },
    "EA-R24": {
        "content": "SVG 对比度不足",
        "explanation": "SVG 的视觉呈现必须保持最低 3:1 的对比度，这样才能让人很好地感知它们。",
        "tip": "增加 SVG 的对比度。"
    },
    "EA-R25": {
        "content": "手动检查对比度",
        "explanation": "检测到对比度非常低。有时这表明使用了背景图像或渐变。请手动检查对比度。",
        "tip": "增加对比度，例如使用较深/较浅的字体或背景颜色。确保背景图像上的文字有足够的对比度，较小的文字为 4.5:1，较大的文字为 3:1。"
    },
    "EA-R26": {
        "content": "页面没有标题",
        "explanation": "网页标题对于描述网页的主题或目的非常重要。它可以让网站访问者快速分类或查找内容。",
        "tip": "为页面添加描述性的 <title> 元素。"
    },
    "EA-R27": {
        "content": "页面标题很短",
        "explanation": "网页标题对于描述网页的主题或目的非常重要。它可以让网站访问者快速分类或查找内容。",
        "tip": "检查标题是否充分描述了页面。"
    },
    "EA-R28": {
        "content": "<iframe> 没有可访问的名称",
        "explanation": "<iframe> 的可访问名称对于描述其主题或目的非常重要。屏幕阅读器用户可以访问页面上所有框架的标题列表。但是，如果标记缺乏标题属性，特别是对于残疾用户来说，浏览 <frame> 和 <iframe> 元素就会变得困难和混乱。",
        "tip": "为 <iframe> 添加描述性标题属性。或者，您也可以添加 aria-label 或 aria-labelledby 等 aria 属性。"
    },
    "EA-R29": {
        "content": "网站语言缺失",
        "explanation": "要使屏幕阅读器或浏览器的语音输出正常工作，必须指定页面的语言。屏幕阅读器会根据不同语言的发音和特点，为该语言使用不同的声音库。必须指定一种语言并确保其有效，这样网站文本才能正确发音。",
        "tip": "将 lang-attribute 添加到页面的 HTML 元素中。"
    },
    "EA-R30": {
        "content": "页面语言不正确",
        "explanation": "要使屏幕阅读器或浏览器的语音输出正常工作，必须正确指定页面的语言。否则，例如语音输出的发音就会不正确。",
        "tip": "检查 HTML 元素中的语言是否与实际页面语言相同。"
    },
    "EA-R31": {
        "content": "检测到的缩写",
        "explanation": "缩略语并非人人都能理解，因此应在文本中或通过 <abbr> 等 HTML 元素加以解释。",
        "tip": "检查缩写是否已经标注。如果没有，请添加全文或使用 <abbr> 等特殊 HTML 元素。"
    },
    "EA-R32": {
        "content": "ID 属性值必须是唯一的",
        "explanation": "ID 是网页元素的唯一标识符，因此不得重复。重复的 ID 会导致元素被屏幕阅读器跳过。从 2023 年起，除非导致其他 WCAG 标准失效，否则这不再是 WCAG 的要求。",
        "tip": "重命名 ID，使其在页面上只使用一次。"
    },
    "EA-R33": {
        "content": "图像按钮缺少可访问名称",
        "explanation": "图形输入（<input type=\"image\">）需要替代文本，以便屏幕阅读器能反映其目的。",
        "tip": "添加一个有意义的 alt 或 ARIA 属性（ria-label 或 aria-labelledby），描述该图片的内容和目的。"
    },
    "EA-R34": {
        "content": "不建议使用重置按钮",
        "explanation": "不建议使用重置按钮，因为它们很容易被误击。",
        "tip": "如果可能，请移除重置按钮。"
    },
    "EA-R35": {
        "content": "表格字段缺少可访问名称",
        "explanation": "表单字段需要一个可访问的名称，以便屏幕阅读器能反映其用途。这包括 <input> 和 <select> 元素或具有 \"复选框\"、\"列表框\"、\"搜索框\"、\"旋转按钮 \"或 \"文本框 \"等角色的元素。",
        "tip": "为 <input> 或 <select> 元素创建适当的 <label>。您还可以为具有角色的元素使用 aria-label 等 aria 属性。标签应描述该表单域的用途。使用 <label> 时，请使用与唯一输入 id 匹配的 for-attribute。"
    },
    "EA-R36": {
        "content": "<button> 缺少可访问名称",
        "explanation": "类型=\"按钮 \"的 <button> 或 <input> 需要一个可访问的名称，以便屏幕阅读器能反映其用途。",
        "tip": "在按钮元素的内容中插入一段文字，或使用 aria-label 或 aria-labelledby 等 aria 属性来描述按钮的用途。"
    },
    "EA-R38": {
        "content": "<area> 缺少替代文本",
        "explanation": "区域元素标识图像地图中可用于定义可点击区域的区域。因此，这些元素需要一个可访问的名称，以便屏幕阅读器能够反映其用途。",
        "tip": "为区域元素添加替代文本，例如通过 alt 属性或 aira-labels 添加。"
    },
    "EA-R39": {
        "content": "身体被咏叹调隐藏",
        "explanation": "body 元素包含属性 aria-hidden：\"true\"，因此屏幕阅读器无法访问该页面。",
        "tip": "移除 body 元素的 aria-hidden 属性。"
    },
    "EA-R40": {
        "content": "<select> 缺少可访问名称",
        "explanation": "<select> 元素必须有一个可访问的名称，以便屏幕阅读器用户识别其用途。",
        "tip": "使用 <label> 元素或 aria 属性描述选择列表的目的。"
    },
    "EA-R41": {
        "content": "重复的 accesskey 属性",
        "explanation": "accesskey 属性可用于指定键盘上的一个字符，用户可按该字符直接跳转到元素。这里不允许重复赋值，否则会导致意想不到的行为。",
        "tip": "更改访问键属性，使其对页面而言是唯一的。"
    },
    "EA-R42": {
        "content": "空 <th> 元素",
        "explanation": "表格中的表头 <th> 元素描述了相应列的含义。如果没有可见文本，视力正常的用户和屏幕阅读器用户都不清楚该行或列的目的。",
        "tip": "插入可见文本内容，描述此列中的数据。"
    },
    "EA-R43": {
        "content": "标题不得为空",
        "explanation": "此标题不含文字，但屏幕阅读器可以读取。",
        "tip": "为标题添加文字或删除标题。"
    },
    "EA-R44": {
        "content": "标题缺少可访问名称",
        "explanation": "该规则检查每个标题是否有一个非空的可访问名称，屏幕阅读器是否能看到。屏幕阅读器会通知用户是否存在标题标记。如果标题为空或文本无法访问，就会使用户感到困惑，甚至无法访问页面结构信息。",
        "tip": "检查标题是否有任何内容。也可以使用 aria-hidden=\"true\" 或 display=\"none\" 隐藏内容。"
    },
    "EA-R45": {
        "content": "段落行高不足",
        "explanation": "段落 (<p>) 的行高小于 1.5。这会影响文本的可读性。",
        "tip": "将段落的行高至少增加到 1.5"
    },
    "EA-R46": {
        "content": "样式属性中的 !important 字母间距",
        "explanation": "本规则检查样式属性是否用于防止通过使用 !important 来调整字母间距，除非它至少是字体大小的 0.12 倍。在样式属性中使用 !important 可以防止这种样式被覆盖。",
        "tip": "如果可能，不要在样式属性中使用 ! important，或者确保字母间距至少是字体大小的 0.12 倍。"
    },
    "EA-R47": {
        "content": "样式属性中的 !important 字间距",
        "explanation": "本规则检查样式属性是否用于防止通过使用 !important 来调整字间距，除非它至少是字体大小的 0.16 倍。在样式属性中使用 !important 可以防止这种样式被覆盖。",
        "tip": "如果可能，不要在样式属性中使用 ! important，或者确保字间距至少是字体大小的 0.16 倍。"
    },
    "EA-R48": {
        "content": "样式属性中的线高",
        "explanation": "本规则检查样式属性是否用于防止通过使用 !important 来调整行高，除非行高至少是字体大小的 1.5 倍。在样式属性中使用 !important 可以防止该样式被覆盖。",
        "tip": "如果可能，不要在样式属性中使用 ! important，或者确保行高至少是字体大小的 1.5 倍。"
    },
    "EA-R49": {
        "content": "<audio> 或 <video> 元素自动播放音频",
        "explanation": "自动播放的音频或视频不能有超过 3 秒钟的音频，或需要音频控制机制来停止或静音。",
        "tip": "不要自动播放音频，或确保有停止或静音的控制机制。"
    },
    "EA-R50": {
        "content": "检测到无效语言属性",
        "explanation": "<html> 元素中的 lang 属性必须是符合 BCP 47 标准的有效语言代码，如 \"de \"或 \"en-us\"。",
        "tip": "确保将有效的语言代码设置为 <html> 元素的 lang 属性。"
    },
    "EA-R51": {
        "content": "语言和 xml:lang 属性不匹配",
        "explanation": "非嵌入式 HTML 页面 <html> 元素上的 lang 和 xml:lang 属性需要有相同的主要语言子标记。",
        "tip": "确保 <html> 元素上的 lang 和 xml:lang 属性相匹配。"
    },
    "EA-R52": {
        "content": "具有相同可访问名称的 <Iframe> 元素",
        "explanation": "应避免使用具有相同可访问名称的 <iframe> 元素，或至少嵌入相同的资源或同等资源。使用相同的可访问名称可能会误导屏幕阅读器用户。",
        "tip": "为每个框架使用唯一的标题属性，或确保具有相同可访问名称的 <iframe> 元素指向相同的资源。"
    },
    "EA-R53": {
        "content": "<iframe> 的 tabindex 为负数",
        "explanation": "带有负 tabindex 属性的 <iframe> 元素不得包含交互式元素。如果将 <iframe> 元素的 tabindex 属性值设置为-1 或其他负数，就无法将焦点移动到 <iframe> 元素的浏览上下文中。",
        "tip": "如果 <iframe> 包含可聚焦元素，则移除负 tabindex。"
    },
    "EA-R54": {
        "content": "元视窗可防止缩放",
        "explanation": "使用 <meta name=\"viewport\"> 元素会限制用户的缩放能力，尤其是在移动设备上。缩放是移动网页上一种常见的、预期的 \"允许 \"行为，因此禁用缩放会影响移动用户的体验，尤其是对部分视力和低视力用户而言。",
        "tip": "删除 user-scalable 和 maximum-scale 属性。否则，请确保 content 属性没有将 user-scalable 设置为 \"否\"，且 maximum-scale 属性至少为 2。"
    },
    "EA-R55": {
        "content": "表头没有指定数据单元格",
        "explanation": "该规则检查表格元素中的每个表头 <th> 是否分配了单元格 <td>。如果表格没有正确标记，就有可能造成屏幕阅读器输出混乱或不准确。",
        "tip": "删除没有指定单元格的表头单元格，或为表头指定单元格。"
    },
    "EA-R56": {
        "content": "未定义的 ARIA 属性",
        "explanation": "该规则检查指定的每个 aria-* 属性是否在 <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA 1.1</a> 中定义。屏幕阅读器无法识别无效或拼写错误的 aria 属性。",
        "tip": "检查 aria 属性是否拼写错误并在 <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA-specifications</a> 中指定。确保只使用有效的 aria 属性。"
    },
    "EA-R57": {
        "content": "不支持 ARIA 状态或属性",
        "explanation": "此规则检查 <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria/\">WAI-ARIA</a> 状态或属性是否允许在其上指定的元素使用。ARIA 状态或属性应符合官方规范，否则可能会被辅助技术忽略或错误解释。",
        "tip": "删除未指定的 WAI-ARIA 状态或属性，或将其修正为允许值。"
    },
    "EA-R58": {
        "content": "无效的 ARIA 状态或属性值",
        "explanation": "此规则检查 <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA 状态或属性</a>的值是否允许在其上指定的元素使用。ARIA 状态或属性必须符合官方规范，否则辅助技术用户无法访问。",
        "tip": "删除状态或属性的未指定 ARIA 值，或将其更正为正确值。"
    },
    "EA-R59": {
        "content": "自动完成属性无效",
        "explanation": "本规则适用于任何带有自动完成属性值的 HTML <input>、<select> 和 <textarea> 元素。自动完成属性需要一个正确的值才能被浏览器和屏幕阅读器识别。",
        "tip": "确保支持 <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete\">自动完成值</a>。"
    },
    "EA-R60": {
        "content": "未为数据单元格指定标题单元格",
        "explanation": "该规则检查表格元素中的每个表头 <th> 是否分配了单元格 <td>。",
        "tip": "如果可能，在每个数据单元格 <td> 中添加一个标题单元格 <th>。"
    },
    "EA-R61": {
        "content": "页面没有标题",
        "explanation": "该文档没有任何标题元素。标题可以增加网站的结构，帮助屏幕阅读器用户浏览和理解网站内容。",
        "tip": "检查是否可以添加标题，以增加网站的结构。确保使用标签 <h1>-<h6> 或 role=\"heading\" 正确标记所有标题文本。"
    },
    "EA-R62": {
        "content": "呈现元素有可聚焦的后代",
        "explanation": "该规则检查具有使其子元素呈现的角色的元素是否包含可聚焦元素，如链接、按钮或输入。此类元素包括 <button>、复选框或 <img>。辅助技术无法正确检测到这些元素的子元素，并会创建一个空的制表符。",
        "tip": "不要将可聚焦元素添加为具有角色的元素的子元素，因为角色会使其子元素具有呈现性，例如 <button> 或 role=\"checkbox\"。"
    },
    "EA-R63": {
        "content": "装饰元件接触到辅助技术",
        "explanation": "该规则检查标记为装饰性的元素是否不包含在辅助功能树中，或者是否具有展示作用。标记为装饰性的元素会使辅助技术无法识别，但使其成为可聚焦的元素则会使其暴露出来。此外，有些元素（如 <nav>）如果拥有一个可访问的名称（如通过 aria-label 获得），就不能具有装饰作用。这种冲突应该避免。",
        "tip": "检查是否需要将元素标记为装饰性元素，或使用 aria-hidden=\"true\" 或 role=\"presentation\" 等辅助技术将其隐藏。在这种情况下，还应删除所有 aria 标签属性。"
    },
    "EA-R64": {
        "content": "缺少所需儿童的容器",
        "explanation": "某些具有明确语义角色的元素需要至少有一个必要的自有元素。例如，具有 \"list \"角色的元素需要拥有具有 \"listitem \"角色的元素。如果达不到这一要求，元素本身就会失效。",
        "tip": "检查是否正确使用了元素角色，或确保包含了所需的子节点。"
    },
    "EA-R65": {
        "content": "元素缺少必要的父元素",
        "explanation": "一些具有明确语义角色的元素需要有一个特定的父元素。例如，具有 \"listitem \"角色的元素需要一个具有 \"list \"角色的父节点。如果达不到这一要求，元素本身就会失效。",
        "tip": "检查是否正确使用了元素角色，或确保使用了所需的父节点和角色。"
    },
    "EA-R66": {
        "content": "Aria 隐藏元素具有可聚焦内容",
        "explanation": "在元素中添加 aria-hidden=\"true \"后，元素本身及其所有后代都会被隐藏起来，不对辅助技术开放。将其暴露在顺序焦点导航中可能会给辅助技术用户造成困惑，因为该元素可以被触及，但它应该是隐藏的。",
        "tip": "检查辅助技术是否需要隐藏该元素，如果需要，则将其从顺序聚焦导航中移除。"
    },
    "EA-R67": {
        "content": "字体非常小",
        "explanation": "该规则检查字体大小是否大于 9 像素。小字体不易阅读，应尽量避免使用。",
        "tip": "检查字体大小是否可以增加到至少 10px。一般来说，普通文本的字体大小建议为 16px 或更大。"
    },
    "EA-R68": {
        "content": "组缺少可访问名称",
        "explanation": "对相关的表单控件进行分组可以让所有用户更容易理解表单，因为相关控件更容易识别。为了让辅助技术能正确识别一个组的目的，它需要一个可访问的名称，例如使用 <legend> 来命名 <fieldset> 或使用 aria 属性来命名角色为 \"组 \"或 \"菜单栏 \"的元素。",
        "tip": "使用 aria-label 或 <fieldset> 的 <legend> 等 aria-attributes 属性，确保每个组都有一个可访问的名称。"
    },
    "EA-R69": {
        "content": "单元格引用的标题属性缺少单元格",
        "explanation": "<a target=\"_blank\" href=\"https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/H43\">页眉属性</a>指定表格单元格相关的一个或多个页眉单元格。它仅用于屏幕阅读器。该规则检查单元格上的 headers 属性是否指向同一表格元素中的相应单元格。如果表格没有正确标记，就有可能导致屏幕阅读器输出混乱或不准确。",
        "tip": "检查同一张表中是否有另一个单元格具有标题属性值的 id。否则，要么删除标题属性，要么创建一个具有此 id 的相应单元格。"
    },
    "EA-R70": {
        "content": "标记为装饰性的元素暴露在外",
        "explanation": "该规则检查标记为装饰性的元素是否不包含在辅助功能树中，或者是否具有展示作用。标记为装饰性的元素会使辅助技术无法识别，但使其成为可聚焦元素或添加 ARIA 属性则会使其暴露出来。应避免这种冲突。",
        "tip": "检查是否需要将元素标记为装饰性元素，或使用 aria-hidden=\"true\" 或 role=\"presentation\" 等辅助技术将其隐藏。"
    },
    "EA-R71": {
        "content": "检测到 lang 属性无效的元素",
        "explanation": "可以使用 lang 属性将网站的部分内容标记为与网站其他内容不同的语言。这些元素的 lang 属性也必须是有效的语言代码，并符合 BCP 47 标准，如 \"de \"或 \"en-us\"。",
        "tip": "确保将有效的语言代码设置为元素的 lang 属性。"
    },
    "EA-R72": {
        "content": "链接与周围文字无法区分",
        "explanation": "该规则检查内嵌链接是否能与周围的文本区分开来，而不是仅靠颜色。例如，可以通过文本下划线或使用边框来突出链接。悬停和聚焦状态也会被检查。",
        "tip": "确保链接与周围文字的区别不仅仅是颜色。悬停或聚焦链接时也要检查这一点。"
    },
    "EA-R73": {
        "content": "菜单项缺少可访问名称",
        "explanation": "该规则检查每个具有 menuitem 角色的元素是否具有非空的可访问名称。menuitem 角色表示该元素是菜单或菜单栏所包含的一组选项中的一个选项。",
        "tip": "使用元素内容或 aria 属性添加可访问名称。"
    },
    "EA-R74": {
        "content": "页面方向受限",
        "explanation": "此规则可检查页面内容是否未使用 CSS 变换属性限制为横向或纵向。使用横向或纵向方向媒体功能的元素如果被固定为某一旋转方向，则在移动设备上可能无法旋转。",
        "tip": "从纵向模式切换到横向模式时，确保网站上的所有元素都能正确旋转。"
    },
    "EA-R75": {
        "content": "段落全为斜体",
        "explanation": "使用斜体文字突出重要内容固然不错，但应避免在较长的文字段落中使用斜体文字。特别是对于有阅读障碍的人来说，斜体文字可能更难阅读。",
        "tip": "避免使用大段斜体文字，仅用于突出重要内容。"
    },
    "EA-R76": {
        "content": "段落全部大写",
        "explanation": "使用大写文字突出重要内容固然不错，但应避免在较长的文字段落中使用大写文字。特别是对于有阅读障碍的人来说，大写文字可能更难阅读。屏幕阅读器也可能会单独读出每个字母。",
        "tip": "避免使用大段大写文字，仅用于突出重要内容。"
    },
    "EA-R77": {
        "content": "段落文字有理有据",
        "explanation": "有某些认知障碍的人在阅读左对齐和右对齐的文本时会遇到困难。完全对齐的文本中单词之间的间距不均匀，会导致阅读困难，在某些情况下甚至无法阅读。",
        "tip": "避免在较长的文本段落中使用对齐文本对齐方式。"
    },
    "EA-R78": {
        "content": "内容不包括在地标区域内",
        "explanation": "<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html\">地标</a>以编程方式标识页面的各个部分。最佳做法是将页面上的所有内容都包含在地标中，这样，依赖地标从一个版块导航到另一个版块的屏幕阅读器用户就不会丢失内容。例如页眉、导航、页脚或主内容。建议使用 &lt;nav&gt; 等本地 HTML5 地标，而不是使用 role=\"nav\" 等 ARIA 角色。",
        "tip": "将所有文本元素添加到现有地标或创建新地标。您可以在此处找到<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/HTML5.html\">HTML地标概览</a>。"
    },
    "EA-R79": {
        "content": "<meta> 元素有刷新延迟",
        "explanation": "该规则检查 <meta> 元素是否用于延迟重定向或刷新。因为用户并不期望页面会自动刷新，这种刷新可能会让用户迷失方向。如果使用了刷新或重定向，那么 <meta> 元素的 content 属性必须为 0 或大于 72000（20 小时）。",
        "tip": "不要使用延迟刷新或重定向，也不要为用户提供调整计时器的功能。"
    },
    "EA-R80": {
        "content": "<meta> 元素有刷新延迟 (AAA)",
        "explanation": "该规则检查 <meta> 元素是否用于延迟重定向或刷新。如果使用了刷新或重定向，那么 <meta> 元素的 content 属性值必须毫无例外地为 0。",
        "tip": "不要使用延迟刷新或重定向，并将延迟设置为 0。"
    },
    "EA-R81": {
        "content": "区域缺少可访问名称",
        "explanation": "区域角色用于识别作者认为重要的文档区域。每个区域都需要一个可访问的名称，以便屏幕阅读器用户识别其内容和目的。",
        "tip": "使用 aria 属性为区域添加一个可访问的名称。"
    },
    "EA-R82": {
        "content": "元素角色无效",
        "explanation": "该规则根据 <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles\">WAI-ARIA 规范</a>检查每个角色属性是否具有有效值。还会检查已废弃的角色。",
        "tip": "检查角色属性是否有拼写错误，以及该角色是否存在于规范中。"
    },
    "EA-R83": {
        "content": "键盘无法访问可滚动元素",
        "explanation": "该规则检查可滚动元素是否可以通过键盘滚动。为确保有某个元素可以使用箭头键控制滚动位置，焦点必须位于可滚动区域上或该区域内。",
        "tip": "确保每个可滚动元素或其一个子元素都是可聚焦的。"
    },
    "EA-R84": {
        "content": "可见标签不是可访问名称的一部分",
        "explanation": "该规则检查按钮或链接等交互式元素是否将其完整的可见标签作为其可访问名称的一部分，例如在使用 aria-label 时。这对于使用语音输入来控制网站的用户尤为重要。否则，语音输入将无法被正确解释，也可能无法运行。可以使用 aria-describedby 添加不属于可见名称的其他上下文。",
        "tip": "确保整个可见标签（而不只是一部分）都包含在可访问名称中（例如用 aria-label 设置）。"
    },
    "EA-R85": {
        "content": "文本对比度不足（增强型）",
        "explanation": "这是最低对比度规则的 AAA 增强版。确保所有文字元素的前景文字与背景颜色之间有足够的颜色对比。最小增强对比度取决于文字大小，较大的文字为 7:1 或 4.5:1。",
        "tip": "增加对比度，例如使用更深/更浅的字体或背景颜色。工具下仪表板中的<a target=\"_blank\" href=\"https://dashboard.eye-able.com/tools/contrast-check\">Eye-Able对比度检查器</a>可提供帮助。"
    },
    "EA-R86": {
        "content": "ARIA 表元素缺少可访问名称",
        "explanation": "表是在定义范围内显示数值的图形。具有 \"表 \"角色的元素必须有一个可访问的名称，以便屏幕阅读器用户识别其内容和目的。",
        "tip": "使用标题、ria-label 或 aria-labelledby 属性为仪表添加一个可访问的名称。"
    },
    "EA-R87": {
        "content": "ARIA Progressbar 缺少可访问名称",
        "explanation": "进度条可显示耗时较长的任务的进度状态。具有 \"进度条 \"角色的元素必须有一个可访问的名称，以便屏幕阅读器用户识别其内容和目的。",
        "tip": "使用 title、ria-label 或 aria-labelledby 属性为进度条添加一个可访问的名称。"
    },
    "EA-R88": {
        "content": "缺少咏叹调-盲文等值",
        "explanation": "该检查可确保 aria-braillelabel 和 aria-brailleroledescription 内容与非盲文内容对应。在没有相应标签或角色描述的情况下使用时，ARIA 规定忽略这些属性。",
        "tip": "确保为上述 aria 属性提供非盲文等效属性。这可以是 aria-label 或 aria-roledescription 属性。"
    },
    "EA-R89": {
        "content": "ARIA 按钮、链接或菜单项缺少可访问名称",
        "explanation": "至关重要的是，每个 ARIA 按钮（role=\"button\"）、链接（role=\"link\"）和菜单项（role=\"menuitem\"）都要有一个辅助技术可以读取的名称。",
        "tip": "确保每个 ARIA 按钮、链接或菜单项都有一个描述性和可访问的名称。可以使用内部文本、非空的 aria-label 或 aria-labelledby 属性。"
    },
    "EA-R90": {
        "content": "角色缺少所需属性",
        "explanation": "该规则检查具有明确角色的元素是否也指定了该角色所需的所有状态和属性。如果省略了必填属性，则不会向屏幕阅读器用户传达元素的状态。",
        "tip": "添加缺失的必要 ARIA 属性。有关所需属性的更多信息，请查阅 <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#states_and_properties\">ARIA 规范</a>。"
    },
    "EA-R91": {
        "content": "ARIA 工具提示缺少可访问名称",
        "explanation": "每个 ARIA 工具提示元素（role=\"tooltip\"）都必须有一个可访问的名称，向辅助技术用户描述其目的或功能。",
        "tip": "确保每个 ARIA 工具提示都有一个清晰且具有描述性的名称。可以使用可见内部文本或 aria-label 和 aria-labelledby 等属性来设置。"
    },
    "EA-R92": {
        "content": "<blink> 元素已被弃用",
        "explanation": "<blink> 元素会使元素内的任何文本以预定的速度闪烁。用户不能中断，也不能作为首选项禁用。因此，使用闪烁的内容不符合成功标准，因为闪烁会持续三秒以上。",
        "tip": "删除网页中的任何 <blink> 元素。"
    },
    "EA-R93": {
        "content": "缺少绕过重复区块的页面",
        "explanation": "提供跳过重复内容的方法有助于用户更有效地浏览网站。如果页面既没有内部跳转链接，也没有标题或地标区域，则此规则失效。",
        "tip": "使用<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/\">适当的地标元素</a>，如&lt;nav&gt;、&lt;main&gt;、&lt;footer&gt;、<a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">标题</a>或<a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">内部跳转链接</a>，可以帮助用户更有效地浏览网站。"
    },
    "EA-R94": {
        "content": "不正确的 <dl> 元素结构",
        "explanation": "定义列表 (<dl>) 包含一组术语（使用 <dt> 元素）和描述（使用 <dd> 元素），例如用于显示词汇表。定义列表只允许包含顺序正确的 <dt>、<dd>、<template>、<script> 或 <div> 元素。",
        "tip": "检查定义列表是否只包含 <dt>、<div> 和 <dd> 元素。此外，确保它们的排序正确，<dt> 应总是排在 <dd> 元素之前。"
    },
    "EA-R95": {
        "content": "<dt> 或 <dd> 元素不包含 <dl>",
        "explanation": "描述项 <dt> 和描述细节 <dd> 元素必须由定义列表 <dl> 元素封装，否则定义列表无效。否则，辅助技术可能无法正确识别定义列表。",
        "tip": "确保 <dt> 或 <dd> 的父元素是定义列表 <dl> 或作为 <dl> 子元素的 <div> 。"
    },
    "EA-R96": {
        "content": "表格字段有多个标签",
        "explanation": "每个表单字段只能有一个相关的 <标签>。否则，不同辅助技术和浏览器组合解释标签的方式就会不一致。标签通过 <label> 的 for 属性和表单字段的 id 属性与表单字段相连。",
        "tip": "确保每个表单字段只有一个关联的 <label>。使用表单字段的 id 查找连接的标签。"
    },
    "EA-R98": {
        "content": "ARIA ID 属性值必须唯一",
        "explanation": "ID 是网页元素的唯一标识符，因此不得重复。这对 ARIA 元素尤为重要，因为 ID 用于附加可访问的名称或描述。重复的 ID 是常见的验证错误，可能会破坏标签的可访问性。",
        "tip": "重命名 ID，使其在页面上只使用一次。确保检查 ARIA 元素是否有效。"
    },
    "EA-R99": {
        "content": "列表必须只包含 <li> 元素",
        "explanation": "列表（<ul> 或 <ol>）需要有正确的结构，以便辅助技术可读和正确发布。列表必须只包含 <li>、<script> 或 <template> 作为直接子节点。列表项本身可以包含其他元素。",
        "tip": "确保您的列表节点（<ul> 或 <ol>）只有列表项 (<li>) 作为直接子节点。"
    },
    "EA-R101": {
        "content": "避免使用 <marquee> 元素",
        "explanation": "<marquee> 元素创建的滚动文本难以阅读和点击。<marquee> 元素已被弃用，它可能会导致可访问性和可用性问题，尤其是因为它很难暂停。",
        "tip": "用现代 CSS 动画或其他技术取代 <marquee> 元素。"
    },
    "EA-R102": {
        "content": "避免使用服务器端图像映射",
        "explanation": "键盘用户无法访问服务器端图像地图，他们必须使用鼠标点击才能访问链接内容。这就使得仅使用键盘导航的用户无法访问图像。此外，服务器端图像地图的交互式区域无法提供文本替代，而客户端图像地图则可以做到这一点。",
        "tip": "使用客户端图像地图或其他互动元素，提高无障碍访问能力。"
    },
    "EA-R104": {
        "content": "触摸目标太小",
        "explanation": "触摸目标必须有足够的大小和间距，以便于激活，而不会无意中激活相邻的目标。触摸目标的大小必须至少为 24 x 24 CSS 像素，或与下一个目标的距离为 24px。大尺寸的触摸目标有助于防止用户出错，并确保移动用户获得更好的体验。此规则取决于视口大小和滚动位置。",
        "tip": "确保触摸目标的大小至少为 24 x 24 CSS 像素，或与下一个目标的距离为 24px。如果有其他控件可以提供满足最小尺寸要求的基本功能，则属于例外情况。"
    },
    "EA-R105": {
        "content": "确保角色属性值适当",
        "explanation": "不恰当的角色值会让辅助技术用户感到困惑，或导致元素被忽略。",
        "tip": "验证角色属性是否有适合给定元素的值。"
    },
    "EA-R106": {
        "content": "ARIA 对话框缺少可访问名称",
        "explanation": "屏幕阅读器用户无法理解没有可访问名称的 ARIA 对话框（角色=\"dialog \"或角色=\"alertdialog \"的元素）的目的。可访问名称为对话框提供了上下文，使屏幕阅读器用户能够理解其目的和功能。",
        "tip": "确保 ARIA 对话框有一个可访问的名称。为此请使用 aria-label 或 aria-labelledby 属性。"
    },
    "EA-R107": {
        "content": "确保正确使用 role=\"text\"",
        "explanation": "role=\"text\" 应用于没有可聚焦后代的元素，以避免屏幕阅读器用户在导航时遇到困难。",
        "tip": "对于没有可聚焦子元素的元素，请使用 role=\"text\"。"
    },
    "EA-R108": {
        "content": "ARIA 树状项缺少可访问名称",
        "explanation": "树（角色=\"tree\"）是具有父节点和子节点的分层列表，可以展开和折叠。树状项（role=\"treeitem\"）是树中的一个节点。如果没有可访问的名称，屏幕阅读器就无法确定树状项的用途。",
        "tip": "使用内部文本、ria-label 或 aria-labelledby 为 treeitem 指定一个描述性名称。"
    },
    "EA-R110": {
        "content": "表单元素缺少可见标签",
        "explanation": "可见标签可为视力正常的用户提供清晰的上下文，从而提高表单的可访问性。仅仅依靠隐藏标签、标题或 aria-describedby 可能会有局限性。标题和 aria-describedby 属性可提供提示等附加信息。由于提示在无障碍 API 中的显示方式与标签不同，这可能会给辅助技术带来问题。",
        "tip": "提供清晰可见的标签。最好使用 <label> 元素。如果不可能，也可以使用 aria-label 或 aria-labelledby。"
    },
    "EA-R111": {
        "content": "横幅地标不在顶层",
        "explanation": "通过 <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">地标</a>，使用屏幕阅读器的盲人用户可以跳转到网页的各个部分。横幅作用（作用=\"横幅\"）用于定义全局网站标题，例如搜索功能、全局导航或标语。如果横幅地标不是顶级地标（包含在另一个地标中），它就不能有效地定义布局的预定标题部分。",
        "tip": "确保每个横幅地标不包含在另一个地标中。"
    },
    "EA-R112": {
        "content": "补充性地标不在最高级别",
        "explanation": "通过<a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">地标</a>，使用屏幕阅读器的盲人用户可以跳转到网页的各个部分。补充内容（如&lt;旁白&gt;或角色=\"补充\"）是对文档或页面主要内容的补充。当补充内容出现在页面顶层时，屏幕阅读器用户可以选择跳过补充内容。如果在其他地标中嵌入 &lt;aside&gt; 元素，则无法使用此选项。",
        "tip": "确保每个互补地标 (&lt;aside&gt; 或 role=\"complementary\") 不包含在另一个地标中。"
    },
    "EA-R113": {
        "content": "Contentinfo 地标不在顶层",
        "explanation": "通过 <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">地标</a>，使用屏幕阅读器的盲人用户可以跳转到网页的各个部分。contentinfo 角色（role=\"contentinfo\"）定义了页脚，包含版权信息、导航链接和隐私声明等信息。将其放置在另一个地标中会妨碍盲人屏幕阅读器用户快速找到并导航到页脚。",
        "tip": "确保 contentinfo 地标（role=\"contentinfo\"）不包含在其他地标中。"
    },
    "EA-R114": {
        "content": "主要地标不在顶层",
        "explanation": "通过 <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">地标</a>，使用屏幕阅读器的盲人用户可以跳转到网页的各个部分。主地标 (main role=\"main\"&gt;) 用于指示文档的主要内容。最佳做法是确保主地标不包含在其他地标中。",
        "tip": "确保主地标 (&lt;main role=\"main\"&gt;) 不包含在其他地标中。"
    },
    "EA-R115": {
        "content": "存在不止一个标语地标",
        "explanation": "通过 <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">地标</a>，使用屏幕阅读器的盲人用户可以跳转到网页的各个部分。多个横幅地标可能会混淆屏幕阅读器的导航，使其更难辨别主要标题或介绍性内容。",
        "tip": "确保每个 HTML 页面只有一个横幅标记。决定要保留哪个横幅标记，并删除所有其他横幅标记。"
    },
    "EA-R116": {
        "content": "存在一个以上的 contentinfo 地标",
        "explanation": "通过 <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">地标</a>，使用屏幕阅读器的盲人用户可以跳转到网页的各个部分。多个 contentinfo 地标（role=\"contentinfo\"）会暗示多个页脚区域，从而使辅助技术用户感到困惑。",
        "tip": "确保每个 HTML 页面只有一个 contentinfo 地标。决定要保留哪个 contentinfo 地标，并删除所有其他地标。"
    },
    "EA-R117": {
        "content": "存在不止一个主要地标",
        "explanation": "通过 <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">地标</a>，使用屏幕阅读器的盲人用户可以跳转到网页的各个部分。主地标（&lt;main role=\"main\"&gt;）的作用是指示文档的主要内容。多个主地标会使用户难以识别核心内容区域。",
        "tip": "将页面限制为一个主要地标 (&lt;main角色=\"main\"&gt;)，以明确显示主要内容。删除重复的主地标。"
    },
    "EA-R118": {
        "content": "主要地标缺失",
        "explanation": "通过<a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">地标</a>，使用屏幕阅读器的盲人用户可以跳转到网页的各个部分。这些部分之外的内容很难找到，其目的也可能不明确。主地标（&lt;main role=\"main\"&gt;）为辅助技术用户提供了一种快速导航到主要内容的方法。",
        "tip": "在网站上添加一个主地标（<main>），并在其中包含页面的主要内容。"
    },
    "EA-R119": {
        "content": "地标并非独一无二",
        "explanation": "独特的地标有助于用户区分不同的内容部分。重复的地标会让用户感到困惑，难以导航到所需的内容。有些地标（如 <header> 或 <footer> ）每个页面只能存在一次，而其他地标（如 <nav> 或 <section>）则需要有唯一的可访问名称（如来自 aria-label 或 aria-labelledby）。",
        "tip": "确保地标具有唯一的角色或角色/标签/标题组合。例如，更改标签，使该区域独一无二。"
    },
    "EA-R120": {
        "content": "表格中的范围属性不正确",
        "explanation": "表格中的 scope 属性可帮助辅助技术用户理解表头和数据单元格之间的关系。scope 属性只能用于表头 <th>，其值必须为 \"col \"或 \"row\"。",
        "tip": "确保 scope 属性仅用于表头 <th>，且值为 \"col \"或 \"row\"。"
    },
    "EA-R121": {
        "content": "页面缺少跳转链接",
        "explanation": "跳过链接在页面顶部提供一个链接，用户激活后可跳转到主要内容区域的开头。否则，键盘和屏幕阅读器用户必须浏览一长串导航链接和其他元素，才能到达主要内容。典型的跳转链接是使用带锚链接（如 #main-content）的链接 \"跳转到内容\"。建议在用户使用键盘导航到该链接之前，将其隐藏起来。",
        "tip": "为页面的主要内容添加跳过链接。如果已经有跳过链接，请确保可以用键盘输入。"
    },
    "EA-R122": {
        "content": "确保制表符索引值为 0 或负数",
        "explanation": "使用大于 0 的 tabindex 值会破坏自然的制表符顺序，给键盘和辅助技术用户造成导航困难。",
        "tip": "将 tabindex 值设置为 0 或不设置，以实现自然制表顺序。对可编程聚焦的元素使用负值。"
    },
    "EA-R123": {
        "content": "表格的标题和摘要相同",
        "explanation": "在表格的 <caption> 元素和摘要属性中使用相同的文本是多余的，可能会造成混淆。<caption> 元素用作屏幕标题，而摘要属性则被屏幕阅读器用来获取表格的目的摘要。",
        "tip": "确保 <caption> 文本与表格的摘要属性不同，以避免混淆。"
    },
    "EA-R124": {
        "content": "目标不同的相同链接",
        "explanation": "具有相同可访问名称的链接应具有相同的功能/目标，以防止混淆。链接描述可以让用户将每个链接与网页上指向其他目的地的链接区分开来，并帮助用户决定是否要跟踪该链接。",
        "tip": "避免使用具有相同描述（如来自内部文本、alt 或 aria 属性）但指向不同 URL 的链接。提供描述链接目的和目标的链接文本。"
    },
    "EA-R125": {
        "content": "请确保您的网站语言正确无误",
        "explanation": "隐藏的语言与网站上的所有元素都不兼容。如果这些元素被赋予了独特的语言属性，就会产生影响。这就意味着，对语言文字的理解也会受到影响。",
        "tip": "请注意，网站上的所有其他闪光灯都必须使用正确的灯光属性。"
    }
};