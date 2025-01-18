const ea_rules_pt = {
    "EA-R1": {
        "content": "Sintaxe SVG incorrecta",
        "explanation": "A sintaxe do elemento SVG não está correcta. Falta-lhe o atributo role-attribute ou o elemento title/desc.",
        "tip": "Verificar a função ou o elemento title/desc do SVG."
    },
    "EA-R2": {
        "content": "<svg> texto acessível em falta",
        "explanation": "Os elementos <svg> com a função \"img\" necessitam de um nome acessível para que os utilizadores de leitores de ecrã possam compreender o seu conteúdo e objetivo.",
        "tip": "Crie um atributo title, um elemento title/desc ou atributos aria para o <svg>."
    },
    "EA-R3": {
        "content": "O texto alternativo <svg> é muito curto (<5 caracteres)",
        "explanation": "O texto acessível em SVG é muito curto (<5 caracteres) e pode não descrever suficientemente o gráfico.",
        "tip": "Verificar se o texto acessível descreve suficientemente o SVG."
    },
    "EA-R4": {
        "content": "O texto alternativo <svg> é muito longo (>150 caracteres)",
        "explanation": "O texto alternativo SVG é muito longo (>150 caracteres) e pode ser potencialmente resumido. Muitas pessoas cegas lêem textos com a ajuda de um ecrã Braille. Um ecrã Braille pode produzir pelo menos 40 caracteres, mas apenas um máximo de 80 caracteres.",
        "tip": "Resumir a descrição ao essencial."
    },
    "EA-R5": {
        "content": "<svg> acessível é um pouco longo (>80 caracteres)",
        "explanation": "O texto alternativo SVG é um pouco longo (>80 caracteres) e pode ser resumido. Muitas pessoas cegas lêem textos com a ajuda de um ecrã Braille. Um ecrã Braille pode produzir pelo menos 40 caracteres, mas apenas um máximo de 80 caracteres.",
        "tip": "Resumir a descrição ao essencial."
    },
    "EA-R6": {
        "content": "Imagem sem texto alternativo",
        "explanation": "As imagens (<img> ou role=\"img\") necessitam de um texto alternativo para que os utilizadores de leitores de ecrã possam compreender o conteúdo e a finalidade da imagem. O atributo title nem sempre é reconhecido de forma fiável.",
        "tip": "Adicione texto alternativo significativo utilizando os atributos alt-, aria-label- ou aria-labelledby-. Pode ser utilizado um atributo alt vazio para imagens decorativas."
    },
    "EA-R7": {
        "content": "Texto alternativo redundante como a ligação envolvente",
        "explanation": "A imagem tem o mesmo texto alternativo que a hiperligação que a envolve. A repetição do texto alternativo para uma ligação ou imagem no texto adjacente é desnecessária e pode confundir os utilizadores de leitores de ecrã ao lê-lo duas vezes.",
        "tip": "Remova o texto alt da imagem, uma vez que não contém qualquer informação adicional. Em vez disso, utilize um atributo alt vazio, alt=\"\", para a imagem."
    },
    "EA-R8": {
        "content": "Texto alternativo em falta na imagem ligada",
        "explanation": "Uma vez que a ligação em si não contém texto, a imagem deve ter um texto alternativo para que os leitores de ecrã possam identificar o conteúdo e a finalidade da ligação. Um atributo de título não é suficiente para todos os leitores de ecrã.",
        "tip": "Adicionar um texto alternativo significativo para a ligação ou para a imagem ligada."
    },
    "EA-R9": {
        "content": "O texto alternativo da imagem é muito curto (<5 caracteres)",
        "explanation": "O texto alternativo de uma imagem deve descrever o seu conteúdo de forma significativa.",
        "tip": "Verificar se o texto alternativo descreve corretamente a imagem."
    },
    "EA-R10": {
        "content": "O texto alternativo da imagem é muito longo (>150 caracteres)",
        "explanation": "O texto alternativo desta imagem é muito longo (>150 caracteres) e pode eventualmente ser resumido. Muitas pessoas cegas lêem textos com a ajuda de um ecrã Braille. Um ecrã Braille pode mostrar pelo menos 40 caracteres, mas apenas um máximo de 80 caracteres.",
        "tip": "Resumir a descrição à sua essência."
    },
    "EA-R11": {
        "content": "O texto alternativo da imagem é um pouco longo (>80 caracteres)",
        "explanation": "O texto alternativo é um pouco longo (>80 caracteres) e pode eventualmente ser resumido. Muitas pessoas cegas lêem textos com a ajuda de um ecrã Braille. Um ecrã Braille pode mostrar pelo menos 40 caracteres, mas apenas um máximo de 80 caracteres.",
        "tip": "Resumir a descrição à sua essência."
    },
    "EA-R12": {
        "content": "As ligações devem ter um texto acessível",
        "explanation": "As hiperligações requerem um texto de hiperligação que seja compreensível e corretamente reproduzido pelos leitores de ecrã. O texto da hiperligação deve explicar claramente a informação que o leitor obterá ao clicar nessa hiperligação.",
        "tip": "Adicionar um texto de ligação significativo utilizando um texto interno ou atributos ARIA que descrevam o objetivo e o destino da ligação. O texto da ligação também não deve ser ocultado aos leitores de ecrã (por exemplo, com display: none ou aria-hidden=\"true\")."
    },
    "EA-R13": {
        "content": "Ligação vazia",
        "explanation": "Esta ligação não tem conteúdo nem destino (atributo href).",
        "tip": "Remover ligações vazias."
    },
    "EA-R14": {
        "content": "O texto acessível por ligação é um URL",
        "explanation": "Os textos das ligações devem ser significativos e descrever o objetivo e o alvo da ligação. Os utilizadores de leitores de ecrã devem poder decidir facilmente se querem seguir uma ligação.",
        "tip": "Certifique-se de que utiliza descrições que descrevem o objetivo e o destino das ligações. O texto da ligação também não deve ser ocultado aos leitores de ecrã (por exemplo, com display: none ou aria-hidden=\"true\")."
    },
    "EA-R15": {
        "content": "O texto da hiperligação é muito longo (>150 caracteres)",
        "explanation": "O texto acessível desta hiperligação é muito longo (>150 caracteres) e pode potencialmente ser resumido. Muitas pessoas cegas lêem textos com a ajuda de um ecrã Braille. Um ecrã Braille pode mostrar pelo menos 40 caracteres, mas apenas um máximo de 80 caracteres.",
        "tip": "Certifique-se de que utiliza textos significativos e compactos."
    },
    "EA-R16": {
        "content": "<objeto> nome acessível em falta",
        "explanation": "Os elementos <objeto> podem conter conteúdos multimédia (áudio, vídeo, etc.) e devem ter um nome acessível aos leitores de ecrã. Os utilizadores de leitores de ecrã não podem conhecer o conteúdo do objeto sem uma alternativa de texto.",
        "tip": "Adicione um nome acessível ao <object> utilizando um título ou atributos aria como aria-label e aria-labelledby."
    },
    "EA-R17": {
        "content": "Áudio detectado",
        "explanation": "Verificar se a informação é transmitida no áudio (por exemplo, através de uma voz de comentário). Em caso afirmativo, é necessária uma transcrição.",
        "tip": "Verificar se é necessária uma transcrição para o ficheiro áudio. Se for esse o caso, apresentar uma alternativa, por exemplo, através de uma transcrição de texto."
    },
    "EA-R18": {
        "content": "Vídeo detectado",
        "explanation": "Verifique se o vídeo necessita de uma legenda ou de uma alternativa multimédia. Se um vídeo não tiver legendas, os utilizadores surdos terão um acesso limitado ou nulo à informação nele contida. Do mesmo modo, os ficheiros de vídeo silenciosos (sem voz) não estão disponíveis para os utilizadores cegos. Estes também necessitam de uma alternativa multimédia completa (texto, faixa áudio alternativa ou ficheiro áudio).",
        "tip": "Verifique se o vídeo necessita de uma legenda ou de uma alternativa multimédia e forneça-a, se necessário."
    },
    "EA-R19": {
        "content": "Detectados vários cabeçalhos H1",
        "explanation": "A estrutura do título da página deve ser estruturada de forma lógica e, se possível, começar com o título H1. O título H1 identifica as partes mais importantes da página.",
        "tip": "Se possível, utilize apenas um título H1. Estruture outros títulos com H2, H3, etc."
    },
    "EA-R20": {
        "content": "Título H1 em falta",
        "explanation": "O cabeçalho H1 não existe ou está oculto para os leitores de ecrã. Verifique se o cabeçalho H1 existe e está visível, pois serve como o primeiro e mais importante elemento da estrutura de cabeçalhos (h1-h6). O elemento <h1> deve estar no início do conteúdo principal, permitindo aos utilizadores de leitores de ecrã navegar diretamente para o conteúdo principal utilizando atalhos de teclado.",
        "tip": "Se possível, crie sempre um título <h1> visível que descreva o conteúdo da página."
    },
    "EA-R21": {
        "content": "Saltar na ordem do cabeçalho",
        "explanation": "A estrutura dos títulos da página deve ser organizada de forma lógica e os níveis dos títulos só devem aumentar um nível. Evite saltos, por exemplo, de H2 para H4.",
        "tip": "Tentar não saltar na ordem do cabeçalho."
    },
    "EA-R22": {
        "content": "Um item de lista <li> não faz parte de uma lista",
        "explanation": "Uma lista válida deve ser sempre enquadrada por um elemento <ul> ou <ol>. Caso contrário, os elementos da lista não serão corretamente detectados como uma lista pelo leitor de ecrã. Tenha em atenção as possíveis funções dos elementos pai <ul> ou <ol> através do atributo role.",
        "tip": "Construa uma lista correta com um elemento pai <ul> ou <ol>. Se já tiver definido um elemento <ul> ou <ol>, preste atenção às possíveis funções através do atributo role."
    },
    "EA-R23": {
        "content": "Contraste de texto insuficiente",
        "explanation": "Certifique-se de que todos os elementos de texto têm um contraste de cor suficiente entre o texto em primeiro plano e a cor de fundo por trás dele. O contraste mínimo depende do tamanho do texto e é de 3:1 ou 4,5:1 para texto de maior escala (>18pt).",
        "tip": "Aumentar o contraste, por exemplo, com um tipo de letra ou cor de fundo mais escuro/claro."
    },
    "EA-R24": {
        "content": "Contraste SVG insuficiente",
        "explanation": "A representação visual dos SVGs deve manter um rácio de contraste mínimo de 3:1 para que sejam bem percepcionados.",
        "tip": "Aumentar o contraste do SVG."
    },
    "EA-R25": {
        "content": "Verificar o contraste manualmente",
        "explanation": "Foi detectado um contraste muito baixo. Por vezes, isto indica a utilização de imagens de fundo ou gradientes. Verifique o contraste manualmente.",
        "tip": "Aumente o contraste, por exemplo, com um tipo de letra mais escuro/claro ou uma cor de fundo. Certifique-se de que o texto sobre imagens de fundo tem um contraste suficiente de 4,5:1 para texto mais pequeno e de 3:1 para texto maior."
    },
    "EA-R26": {
        "content": "A página não tem título",
        "explanation": "O título da página é importante para descrever o assunto ou o objetivo da página. Permite aos visitantes do seu sítio Web classificar ou encontrar rapidamente o seu conteúdo.",
        "tip": "Adicione um elemento <title> descritivo à página."
    },
    "EA-R27": {
        "content": "O título da página é muito curto",
        "explanation": "O título da página é importante para descrever o assunto ou o objetivo da página. Permite aos visitantes do seu sítio Web classificar ou encontrar rapidamente o seu conteúdo.",
        "tip": "Verificar se o título descreve corretamente a página."
    },
    "EA-R28": {
        "content": "<iframe> não tem um nome acessível",
        "explanation": "O nome acessível de um <iframe> é importante para descrever o seu tópico ou objetivo. Os utilizadores de leitores de ecrã podem aceder a uma lista de títulos para todas as molduras de uma página. No entanto, a navegação através dos elementos <frame> e <iframe> pode tornar-se difícil e confusa se a marcação não tiver um atributo de título, especialmente para utilizadores com deficiências.",
        "tip": "Adicione um atributo de título descritivo ao <iframe>. Em alternativa, pode adicionar um atributo aria como aria-label ou aria-labelledby."
    },
    "EA-R29": {
        "content": "Falta o idioma do sítio Web",
        "explanation": "Para que a saída de voz dos leitores de ecrã ou do navegador funcione corretamente, a língua da página deve ser especificada. Os leitores de ecrã utilizam diferentes bibliotecas de som para diferentes línguas, com base na pronúncia e nas características dessa língua. É importante especificar uma língua e garantir que é válida para que o texto do sítio Web seja pronunciado corretamente.",
        "tip": "Adicione o atributo lang-attribute ao elemento HTML da sua página."
    },
    "EA-R30": {
        "content": "Idioma incorreto da página",
        "explanation": "Para que a saída de voz dos leitores de ecrã ou do browser funcione corretamente, a língua da página tem de ser especificada corretamente. Caso contrário, por exemplo, a pronúncia de uma saída de voz é incorrecta.",
        "tip": "Verifique se o idioma no elemento HTML é igual ao idioma atual da página."
    },
    "EA-R31": {
        "content": "Abreviatura detectada",
        "explanation": "As abreviaturas nem sempre são compreensíveis para toda a gente e devem ser explicadas no texto ou através de elementos HTML como <abbr>.",
        "tip": "Verificar se a abreviatura já está identificada. Caso contrário, adicione o texto completo ou utilize elementos HTML especiais como <abbr>."
    },
    "EA-R32": {
        "content": "O valor do atributo ID deve ser único",
        "explanation": "Um ID é um identificador único para os elementos da página Web e, por conseguinte, não deve ser duplicado. A existência de IDs duplicados pode levar a que os elementos sejam ignorados pelos leitores de ecrã. A partir de 2023, isto deixará de ser um requisito das WCAG, a não ser que conduza a uma falha de outro critério das WCAG.",
        "tip": "Renomeie o ID para que ele seja usado apenas uma vez na página."
    },
    "EA-R33": {
        "content": "Botão de imagem sem nome acessível",
        "explanation": "Uma entrada gráfica (<input type=\"image\">) requer texto alternativo para que os leitores de ecrã possam refletir a sua finalidade.",
        "tip": "Adicione um atributo alt ou ARIA significativo (aria-label ou aria-labelledby) que descreva o conteúdo e o objetivo desta imagem."
    },
    "EA-R34": {
        "content": "O botão de reposição não é recomendado",
        "explanation": "A utilização de botões de reposição não é recomendada, uma vez que podem ser facilmente accionados por engano.",
        "tip": "Se possível, retire o botão de reinicialização."
    },
    "EA-R35": {
        "content": "Campo de formulário sem nome acessível",
        "explanation": "Um campo de formulário necessita de um nome acessível para que os leitores de ecrã possam refletir a sua finalidade. Isto inclui elementos <input> e <select> ou elementos com uma função de \"caixa de verificação\", \"caixa de listagem\", \"caixa de pesquisa\", \"botão de rotação\" ou \"caixa de texto\", entre outras funções.",
        "tip": "Crie um <label> apropriado para elementos <input> ou <select>. Você também pode usar atributos aria como aria-label para elementos com uma função. O rótulo deve descrever a finalidade deste campo de formulário. Ao usar um <label>, use um atributo for que corresponda ao id da entrada exclusiva."
    },
    "EA-R36": {
        "content": "<button> nome acessível em falta",
        "explanation": "Um <button> ou um <input> com type=\"button\" precisa de um nome acessível para que os leitores de ecrã possam refletir o seu objetivo.",
        "tip": "Insira um texto no conteúdo do elemento do botão ou utilize atributos aria como aria-label ou aria-labelledby para descrever o seu objetivo."
    },
    "EA-R38": {
        "content": "<area> texto alternativo em falta",
        "explanation": "Os elementos de área identificam áreas dentro de um mapa de imagens que podem ser utilizadas para definir áreas clicáveis. Por conseguinte, estes elementos necessitam de um nome acessível para que os leitores de ecrã possam refletir a sua finalidade.",
        "tip": "Adicionar um texto alternativo ao elemento de área, por exemplo, através do atributo alt ou aira-labels."
    },
    "EA-R39": {
        "content": "O corpo está oculto por aria",
        "explanation": "O elemento body contém o atributo aria-hidden: \"true\", pelo que a página não é acessível aos leitores de ecrã.",
        "tip": "Remove o atributo aria-hidden do elemento body."
    },
    "EA-R40": {
        "content": "<select> nome acessível em falta",
        "explanation": "Os elementos <select> devem ter um nome acessível para que os utilizadores de leitores de ecrã possam identificar a sua finalidade.",
        "tip": "Descreva o objetivo da lista de seleção com um elemento <label> ou atributos aria."
    },
    "EA-R41": {
        "content": "Atributo accesskey duplicado",
        "explanation": "O atributo accesskey pode ser utilizado para especificar um carácter do teclado que o utilizador pode premir para saltar diretamente para os elementos. Uma atribuição duplicada não é permitida aqui e conduz a um comportamento inesperado.",
        "tip": "Altere o atributo de chave de acesso para que seja exclusivo da página."
    },
    "EA-R42": {
        "content": "Elemento <th> vazio",
        "explanation": "O elemento <th> do cabeçalho de uma tabela descreve o significado da respectiva coluna. Sem texto visível, o objetivo da linha ou coluna não é claro tanto para os utilizadores com visão como para os utilizadores de leitores de ecrã.",
        "tip": "Insira um conteúdo de texto visível que descreva os dados desta coluna."
    },
    "EA-R43": {
        "content": "Os títulos não devem estar vazios",
        "explanation": "Este cabeçalho não contém texto, mas pode ser acedido por leitores de ecrã.",
        "tip": "Adicione um texto ao título ou remova-o."
    },
    "EA-R44": {
        "content": "Nome acessível em falta no cabeçalho",
        "explanation": "Esta regra verifica se cada título tem um nome acessível não vazio e se é visível para os leitores de ecrã. Os leitores de ecrã notificam os utilizadores da presença de uma etiqueta de título. Se o título estiver vazio ou o texto for inacessível, isso pode confundir os utilizadores ou mesmo impedi-los de aceder a informações sobre a estrutura da página.",
        "tip": "Verifica se o cabeçalho tem algum conteúdo. O conteúdo também pode ser ocultado utilizando aria-hidden=\"true\" ou display=\"none\"."
    },
    "EA-R45": {
        "content": "O parágrafo tem uma altura de linha insuficiente",
        "explanation": "A altura da linha do parágrafo (<p>) é inferior a 1,5. Isto pode afetar a legibilidade do texto.",
        "tip": "Aumentar a altura da linha do parágrafo para, pelo menos, 1,5"
    },
    "EA-R46": {
        "content": "!important espaçamento entre letras no atributo de estilo",
        "explanation": "Esta regra verifica se o atributo de estilo não é utilizado para impedir o ajuste do espaçamento entre letras utilizando !important, exceto se for pelo menos 0,12 vezes o tamanho do tipo de letra. A utilização de !important nos atributos de estilo impede que este estilo seja substituído.",
        "tip": "Se possível, não utilize !important no atributo style ou certifique-se de que o espaçamento entre letras é, pelo menos, 0,12 vezes superior ao tamanho do tipo de letra."
    },
    "EA-R47": {
        "content": "!important espaçamento entre palavras no atributo de estilo",
        "explanation": "Esta regra verifica se o atributo de estilo não é utilizado para impedir o ajuste do espaçamento entre palavras através da utilização de !important, exceto se for pelo menos 0,16 vezes o tamanho do tipo de letra. A utilização de !important nos atributos de estilo impede que este estilo seja substituído.",
        "tip": "Se possível, não utilize !important no atributo de estilo ou certifique-se de que o espaçamento entre palavras é, pelo menos, 0,16 vezes o tamanho do tipo de letra."
    },
    "EA-R48": {
        "content": "!important line-height no atributo de estilo",
        "explanation": "Esta regra verifica se o atributo de estilo não é utilizado para impedir o ajuste da altura da linha através da utilização de !important, exceto se for pelo menos 1,5 vezes o tamanho do tipo de letra. A utilização de !important nos atributos de estilo impede que este estilo seja substituído.",
        "tip": "Se possível, não utilize !important no atributo style ou certifique-se de que a altura da linha é, pelo menos, 1,5 vezes superior ao tamanho do tipo de letra."
    },
    "EA-R49": {
        "content": "O elemento <audio> ou <video> reproduz automaticamente o áudio",
        "explanation": "O áudio ou vídeo reproduzido automaticamente não pode ter um áudio que dure mais de 3 segundos ou necessitar de um mecanismo de controlo de áudio para o parar ou silenciar.",
        "tip": "Não reproduza áudio automaticamente ou certifique-se de que existe um mecanismo de controlo para parar ou silenciar o som."
    },
    "EA-R50": {
        "content": "Atributo lang inválido detectado",
        "explanation": "O atributo lang no elemento <html> deve ser um código de idioma válido e estar em conformidade com a norma BCP 47, por exemplo, \"de\" ou \"en-us\".",
        "tip": "Certifique-se de que um código de idioma válido é definido como o atributo lang do elemento <html>."
    },
    "EA-R51": {
        "content": "Os atributos Lang e xml:lang não correspondem",
        "explanation": "Os atributos lang e xml:lang no elemento <html> de uma página HTML não incorporada precisam de ter a mesma subtag de idioma principal.",
        "tip": "Certifique-se de que os atributos lang e xml:lang no elemento <html> coincidem."
    },
    "EA-R52": {
        "content": "Elementos <Iframe> com nomes acessíveis idênticos",
        "explanation": "Os elementos <iframe> com nomes acessíveis idênticos devem ser evitados ou, pelo menos, incorporar o mesmo recurso ou recursos equivalentes. A utilização do mesmo nome acessível pode induzir em erro os utilizadores de leitores de ecrã.",
        "tip": "Utilize atributos de título únicos para cada quadro ou certifique-se de que os elementos <iframe> com nomes acessíveis idênticos conduzem ao mesmo recurso."
    },
    "EA-R53": {
        "content": "<iframe> tem tabindex negativo",
        "explanation": "Os elementos <iframe> com um atributo tabindex negativo não devem conter elementos interactivos. Ao definir o valor do atributo tabindex de um elemento <iframe> como -1 ou algum outro número negativo, torna-se impossível mover o foco para o contexto de navegação do elemento <iframe>.",
        "tip": "Remove o tabindex negativo se o <iframe> contiver elementos focalizáveis."
    },
    "EA-R54": {
        "content": "Meta viewport impede o zoom",
        "explanation": "A utilização de elementos <meta name=\"viewport\"> pode limitar a capacidade de zoom do utilizador, especialmente em dispositivos móveis. O zoom é um comportamento \"permitido\" comum e esperado nas páginas Web móveis, pelo que a sua desativação prejudica a experiência do utilizador móvel, especialmente para os utilizadores com visão parcial e baixa visão.",
        "tip": "Remova os atributos user-scalable e maximum-scale. Caso contrário, certifique-se de que o atributo content não define user-scalable como \"no\" e que a propriedade maximum-scale é, pelo menos, 2."
    },
    "EA-R55": {
        "content": "Nenhuma célula de dados atribuída ao cabeçalho da tabela",
        "explanation": "Essa regra verifica se cada cabeçalho de tabela <th> tem células atribuídas <td> em um elemento de tabela. Se as tabelas não estiverem corretamente marcadas, isto cria a possibilidade de uma saída de leitor de ecrã confusa ou imprecisa.",
        "tip": "Remover as células do cabeçalho da tabela que não têm células atribuídas ou atribuir células ao cabeçalho."
    },
    "EA-R56": {
        "content": "Atributo ARIA indefinido",
        "explanation": "Esta regra verifica se cada atributo aria-* especificado está definido em <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA 1.1</a>. Os atributos aria inválidos ou mal escritos não são reconhecidos pelos leitores de ecrã.",
        "tip": "Verifique se o atributo aria não está mal escrito e especificado no <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA-specifications</a>. Certifique-se de que utiliza apenas atributos aria válidos."
    },
    "EA-R57": {
        "content": "Estado ou propriedade ARIA não suportado",
        "explanation": "Esta regra verifica se os estados ou propriedades <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria/\">WAI-ARIA</a> são permitidos para o elemento em que estão especificados. Os estados ou propriedades ARIA devem estar de acordo com a especificação oficial ou podem ser ignorados ou interpretados incorretamente por tecnologias de assistência.",
        "tip": "Remover estados ou propriedades WAI-ARIA não especificados ou corrigi-los para um valor permitido."
    },
    "EA-R58": {
        "content": "Estado ARIA ou valor de propriedade inválido",
        "explanation": "Esta regra verifica se o valor de <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">estados ou propriedades ARIA</a> são permitidos para o elemento em que estão especificados. Os estados ou propriedades ARIA têm de estar de acordo com a especificação oficial ou não são acessíveis aos utilizadores de tecnologia de assistência.",
        "tip": "Remover valores ARIA não especificados de estados ou propriedades ou corrigi-los para o valor correto."
    },
    "EA-R59": {
        "content": "O atributo de preenchimento automático é inválido",
        "explanation": "Esta regra aplica-se a qualquer elemento HTML <input>, <select> e <textarea> com um valor de atributo autocomplete. O atributo autocompletar necessita de um valor correto para ser reconhecido pelo browser e pelos leitores de ecrã.",
        "tip": "Certifique-se de que <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete\">o valor do preenchimento automático</a> é suportado."
    },
    "EA-R60": {
        "content": "Nenhuma célula de cabeçalho atribuída a células de dados",
        "explanation": "Esta regra verifica se cada cabeçalho de tabela <th> tem células atribuídas <td> num elemento de tabela.",
        "tip": "Se possível, adicione uma célula de cabeçalho <th> a cada célula de dados <td>."
    },
    "EA-R61": {
        "content": "A página não tem título",
        "explanation": "O documento não tem qualquer elemento de cabeçalho. Os cabeçalhos conferem estrutura a um sítio Web e ajudam os utilizadores de leitores de ecrã a navegar e a compreender o seu conteúdo.",
        "tip": "Verificar se é possível adicionar cabeçalhos para estruturar o sítio Web. Certifique-se de que marca corretamente todos os textos dos títulos utilizando as etiquetas <h1>-<h6> ou com role=\"heading\"."
    },
    "EA-R62": {
        "content": "O elemento de apresentação tem descendentes focalizáveis",
        "explanation": "Esta regra verifica se os elementos com uma função que torna os seus filhos apresentáveis não contêm elementos focáveis, por exemplo, uma ligação, um botão ou um input. Estes elementos são, por exemplo, <button>, caixa de verificação ou <img>. Os filhos destes elementos não são detectados corretamente pelas tecnologias de assistência e criam uma paragem de separador vazia.",
        "tip": "Não adicione elementos focalizáveis como filhos de elementos com uma função que torne os seus filhos apresentáveis, por exemplo, um <button> ou role=\"checkbox\"."
    },
    "EA-R63": {
        "content": "O elemento decorativo está exposto a tecnologias de assistência",
        "explanation": "Esta regra verifica se os elementos marcados como decorativos não estão incluídos na árvore de acessibilidade ou se têm uma função de apresentação. Marcar um elemento como decorativo esconde-o das tecnologias de assistência, mas torná-lo focável expõe-no. Além disso, alguns elementos como <nav> não podem ter um papel decorativo se possuírem um nome acessível, por exemplo, através de um rótulo aria. Este conflito deve ser evitado.",
        "tip": "Verificar se o elemento precisa de ser marcado como decorativo ou ocultá-lo das tecnologias de apoio, por exemplo, utilizando aria-hidden=\"true\" ou role=\"presentation\". Neste caso, remova também todos os atributos aria label."
    },
    "EA-R64": {
        "content": "Contentor sem crianças necessárias",
        "explanation": "Alguns elementos com uma função semântica explícita precisam de ter, pelo menos, um dos seus elementos proprietários obrigatórios. Por exemplo, um elemento com a função \"lista\" precisa de possuir elementos com a função \"listitem\". O não cumprimento deste requisito pode tornar o próprio elemento inválido.",
        "tip": "Verifique se a função do elemento foi utilizada corretamente ou certifique-se de que inclui os nós filhos necessários."
    },
    "EA-R65": {
        "content": "Elemento sem pai obrigatório",
        "explanation": "Alguns elementos com uma função semântica explícita precisam de ter um elemento pai específico. Por exemplo, um elemento com a função \"listitem\" precisa de um nó pai com a função \"list\". O não cumprimento deste requisito torna o próprio elemento inválido.",
        "tip": "Verifique se a função do elemento foi utilizada corretamente ou certifique-se de que utiliza o nó pai e a função necessários."
    },
    "EA-R66": {
        "content": "O elemento Aria-hidden tem um conteúdo que pode ser focado",
        "explanation": "Ao adicionar aria-hidden=\"true\" a um elemento, o próprio elemento e todos os seus descendentes ficam ocultos das tecnologias de apoio. A sua exposição à navegação sequencial pode causar confusão aos utilizadores de tecnologias de apoio, porque o elemento pode ser alcançado, mas deveria estar oculto.",
        "tip": "Verifique se o elemento precisa de ser ocultado da tecnologia de assistência e, em caso afirmativo, remova-o da navegação sequencial."
    },
    "EA-R67": {
        "content": "O tamanho da letra é muito pequeno",
        "explanation": "Esta regra verifica se os tamanhos de letra são superiores a 9 pixéis. Os tamanhos de letra pequenos não são fáceis de ler e devem ser evitados, se possível.",
        "tip": "Verifique se o tamanho do tipo de letra pode ser aumentado para, pelo menos, 10px. Em geral, recomenda-se um tamanho de letra de 16px ou superior para texto normal."
    },
    "EA-R68": {
        "content": "O grupo não tem um nome acessível",
        "explanation": "O agrupamento de controlos de formulários relacionados torna os formulários mais compreensíveis para todos os utilizadores, uma vez que os controlos relacionados são mais fáceis de identificar. Para que as tecnologias de assistência possam identificar corretamente o objetivo de um grupo, este necessita de um nome acessível, por exemplo, utilizando uma <legenda> para um <conjunto de campos> ou atributos aria para elementos com função=\"grupo\" ou \"barra de menus\".",
        "tip": "Certifique-se de que cada grupo tem um nome acessível utilizando atributos aria como aria-label ou <legend> para um <fieldset>."
    },
    "EA-R69": {
        "content": "Atributo Headers das referências de células em falta",
        "explanation": "O atributo <a target=\"_blank\" href=\"https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/H43\">headers</a> especifica uma ou mais células de cabeçalho com as quais uma célula de tabela está relacionada. É utilizado apenas por leitores de ecrã. Esta regra verifica se o atributo headers numa célula se refere a uma célula correspondente no mesmo elemento de tabela. Se as tabelas não estiverem corretamente marcadas, isto cria a possibilidade de uma saída de leitor de ecrã confusa ou imprecisa.",
        "tip": "Verifica se existe outra célula com o id do valor do atributo headers na mesma tabela. Caso contrário, elimina o atributo headers ou cria uma célula correspondente com este id."
    },
    "EA-R70": {
        "content": "O elemento marcado como decorativo está exposto",
        "explanation": "Esta regra verifica se os elementos marcados como decorativos não estão incluídos na árvore de acessibilidade ou se têm uma função de apresentação. Marcar um elemento como decorativo esconde-o das tecnologias de assistência, mas torná-lo focalizável ou adicionar atributos ARIA pode expô-lo. Este conflito deve ser evitado.",
        "tip": "Verificar se o elemento precisa de ser marcado como decorativo ou ocultá-lo das tecnologias de apoio, por exemplo, utilizando aria-hidden=\"true\" ou role=\"presentation\"."
    },
    "EA-R71": {
        "content": "Elemento com atributo lang inválido detectado",
        "explanation": "As partes de um sítio Web podem ser marcadas como estando numa língua diferente da do resto do sítio Web utilizando o atributo lang. O atributo lang destes elementos deve também ser um código de língua válido e estar em conformidade com a norma BCP 47, por exemplo, \"de\" ou \"en-us\".",
        "tip": "Certifique-se de que um código de idioma válido é definido como o atributo lang do elemento."
    },
    "EA-R72": {
        "content": "A ligação não se distingue do texto circundante",
        "explanation": "Esta regra verifica se as hiperligações em linha se distinguem do texto circundante através de uma diferença que não se baseia apenas na cor. As hiperligações podem ser destacadas, por exemplo, sublinhando o texto ou utilizando um contorno. Os estados de foco e de pairar também são verificados.",
        "tip": "Certifique-se de que a hiperligação se distingue do texto circundante não apenas pela cor. Verifique também quando passar o rato sobre a ligação ou a focar."
    },
    "EA-R73": {
        "content": "Nome acessível em falta no item de menu",
        "explanation": "Esta regra verifica se cada elemento com uma função menuitem tem um nome acessível não vazio. A função menuitem indica que o elemento é uma opção num conjunto de escolhas contidas num menu ou barra de menus.",
        "tip": "Adicionar um nome acessível utilizando o conteúdo do elemento ou utilizando atributos aria."
    },
    "EA-R74": {
        "content": "A orientação da página é limitada",
        "explanation": "Esta regra verifica se o conteúdo da página não está restrito à orientação paisagem ou retrato utilizando a propriedade de transformação CSS. Os elementos que são fixados a uma determinada rotação, utilizando a caraterística orientation media com um valor de paisagem ou retrato, podem não rodar em dispositivos móveis.",
        "tip": "Certifique-se de que todos os elementos do sítio Web rodam corretamente quando muda do modo retrato para o modo paisagem."
    },
    "EA-R75": {
        "content": "O parágrafo está todo em itálico",
        "explanation": "Embora seja bom utilizar o texto em itálico para realçar conteúdos importantes, evite utilizá-lo em parágrafos mais longos. Especialmente para pessoas com dislexia, o texto em itálico pode ser mais difícil de ler.",
        "tip": "Evite grandes quantidades de texto em itálico e utilize-o apenas para realçar conteúdos importantes."
    },
    "EA-R76": {
        "content": "O parágrafo é todo em maiúsculas",
        "explanation": "Embora a utilização de texto em maiúsculas para realçar conteúdos importantes possa ser boa, evite utilizar texto em maiúsculas em parágrafos de texto mais longos. Especialmente para pessoas com dislexia, o texto em maiúsculas pode ser mais difícil de ler. Os leitores de ecrã também podem ler cada letra individualmente.",
        "tip": "Evite grandes quantidades de texto em maiúsculas e utilize-as apenas para realçar conteúdos importantes."
    },
    "EA-R77": {
        "content": "Os parágrafos do texto são justificados",
        "explanation": "As pessoas com determinadas deficiências cognitivas têm problemas em ler texto justificado à esquerda e à direita. O espaçamento desigual entre palavras num texto totalmente justificado pode dificultar a leitura e, nalguns casos, torná-la impossível.",
        "tip": "Evite utilizar um alinhamento de texto justificado em parágrafos de texto mais longos."
    },
    "EA-R78": {
        "content": "O conteúdo não está incluído numa região de referência",
        "explanation": "<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html\">Os marcos</a> identificam programaticamente as secções de uma página. É uma prática recomendada incluir todo o conteúdo da página nos pontos de referência, para que os utilizadores de leitores de ecrã que dependem deles para navegar de uma secção para outra não percam a noção do conteúdo. Exemplos de regiões são cabeçalho, navegação, rodapé ou principal. Os pontos de referência HTML5 nativos, como &lt;nav&gt;, são recomendados em vez de utilizar funções ARIA, como role=\"nav\".",
        "tip": "Adicione todos os elementos de texto aos pontos de referência existentes ou crie novos pontos de referência. Pode encontrar uma visão geral dos <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/HTML5.html\">marcos HTML aqui</a>."
    },
    "EA-R79": {
        "content": "O elemento <meta> tem um atraso na atualização",
        "explanation": "Esta regra verifica se o elemento <meta> não é usado para redirecionamento ou atualização atrasada. Como os utilizadores não esperam que uma página seja actualizada automaticamente, essa atualização pode ser desorientadora. Se for utilizado um refrescamento ou redireccionamento, então o atributo content do elemento <meta> tem de ser 0 ou superior a 72000 (20 horas).",
        "tip": "Não utilize actualizações atrasadas, não redireccione nem forneça uma funcionalidade para o utilizador ajustar o temporizador."
    },
    "EA-R80": {
        "content": "O elemento <meta> tem um atraso de atualização (AAA)",
        "explanation": "Esta regra verifica se o elemento <meta> não é usado para redirecionamento ou atualização atrasada. Se for utilizado um refresh ou redireccionamento, então o valor do atributo content do elemento <meta> tem de ser 0, sem exceção.",
        "tip": "Não utilize actualizações atrasadas ou redireccionamentos e defina o atraso para 0."
    },
    "EA-R81": {
        "content": "Região sem nome acessível",
        "explanation": "A função de região é utilizada para identificar as áreas do documento que o autor considera significativas. Cada região necessita de um nome acessível para que os utilizadores de leitores de ecrã possam identificar o seu conteúdo e objetivo.",
        "tip": "Adicione um nome acessível à região utilizando atributos aria."
    },
    "EA-R82": {
        "content": "O elemento tem uma função inválida",
        "explanation": "Esta regra verifica se cada atributo de função tem um valor válido de acordo com as <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles\">especificaçõesWAI-ARIA</a>. As funções obsoletas também são verificadas.",
        "tip": "Verificar o atributo de função quanto a erros ortográficos e se a função existe na especificação."
    },
    "EA-R83": {
        "content": "O elemento deslocável não é acessível pelo teclado",
        "explanation": "Esta regra verifica se os elementos percorríveis podem ser percorridos pelo teclado. Para garantir que existe um elemento a partir do qual as teclas de setas podem ser utilizadas para controlar a posição de deslocação, o foco deve estar numa região deslocável.",
        "tip": "Certifique-se de que todos os elementos de deslocação ou um dos seus elementos filhos são focáveis."
    },
    "EA-R84": {
        "content": "A etiqueta visível não faz parte do nome acessível",
        "explanation": "Esta regra verifica se os elementos interactivos, como botões ou ligações, têm a sua etiqueta visível completa como parte do seu nome acessível, por exemplo, ao utilizar aria-label. Isto é especialmente importante para os utilizadores que utilizam a entrada de voz para controlar o sítio Web. Caso contrário, a entrada de voz não pode ser interpretada corretamente e pode não funcionar. O contexto adicional que não faz parte do nome visível pode ser adicionado utilizando aria-describedby.",
        "tip": "Certifique-se de que todo o rótulo visível (e não apenas uma parte) é incluído no nome acessível (definido com, por exemplo, aria-label)."
    },
    "EA-R85": {
        "content": "Contraste de texto insuficiente (melhorado)",
        "explanation": "Esta é uma melhoria AAA da regra do contraste mínimo. Certifique-se de que todos os elementos de texto têm um contraste de cor suficiente entre o texto em primeiro plano e a cor de fundo por trás dele. O contraste mínimo melhorado depende do tamanho do texto e é de 7:1 ou 4,5:1 para textos maiores.",
        "tip": "Aumente o contraste, por exemplo, com um tipo de letra mais escuro/claro ou uma cor de fundo. A ajuda é fornecida pelo <a target=\"_blank\" href=\"https://dashboard.eye-able.com/tools/contrast-check\">verificador de contraste do Eye-Able</a> no Painel de Controlo em Ferramentas."
    },
    "EA-R86": {
        "content": "Falta o nome acessível do elemento ARIA Meter",
        "explanation": "Um contador é uma apresentação gráfica de um valor numérico dentro de um intervalo definido. Um elemento com a função \"contador\" deve ter um nome acessível para que os utilizadores de leitores de ecrã possam identificar o seu conteúdo e finalidade.",
        "tip": "Adicionar um nome acessível ao contador utilizando um atributo title, aria-label ou aria-labelledby."
    },
    "EA-R87": {
        "content": "Falta um nome acessível na barra de progresso ARIA",
        "explanation": "Uma barra de progresso indica o estado de avanço das tarefas que demoram muito tempo. Um elemento com a função \"barra de progresso\" deve ter um nome acessível para que os utilizadores de leitores de ecrã possam identificar o seu conteúdo e objetivo.",
        "tip": "Adicione um nome acessível à barra de progresso utilizando um atributo title, aria-label ou aria-labelledby."
    },
    "EA-R88": {
        "content": "Equivalente aria-braille em falta",
        "explanation": "Esta verificação garante que existe um equivalente não braille para o conteúdo de aria-braillelabel e aria-brailleroledescription. Quando utilizados sem uma etiqueta ou descrição de função correspondente, a ARIA diz para ignorar estes atributos.",
        "tip": "Certifique-se de que fornece um equivalente não braille para os atributos aria mencionados. Poderá ser um atributo aria-label ou aria-roledescription."
    },
    "EA-R89": {
        "content": "Botão, ligação ou item de menu ARIA sem nome acessível",
        "explanation": "É crucial que todos os botões ARIA (role=\"button\"), ligações (role=\"link\") e itens de menu (role=\"menuitem\") tenham um nome que possa ser lido pelas tecnologias de apoio.",
        "tip": "Certifique-se de que cada botão, ligação ou item de menu ARIA tem um nome descritivo e acessível. Pode utilizar um texto interno, um atributo aria-label ou aria-labelledby não vazio."
    },
    "EA-R90": {
        "content": "Função sem atributos necessários",
        "explanation": "Esta regra verifica se os elementos que têm uma função explícita também especificam todos os estados e propriedades necessários para essa função. O estado do elemento não é comunicado aos utilizadores de leitores de ecrã se um atributo obrigatório for omitido.",
        "tip": "Adicione os atributos ARIA necessários em falta. Para obter mais informações sobre os atributos necessários, consulte a <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#states_and_properties\">especificação ARIA</a>."
    },
    "EA-R91": {
        "content": "Dica de ferramenta ARIA sem nome acessível",
        "explanation": "Cada elemento ARIA tooltip (role=\"tooltip\") deve ter um nome acessível que descreva o seu objetivo ou função para os utilizadores de tecnologias de apoio.",
        "tip": "Certifique-se de que cada dica de ferramenta ARIA tem um nome claro e descritivo. Isto pode ser definido utilizando um texto interior visível ou atributos como aria-label e aria-labelledby."
    },
    "EA-R92": {
        "content": "O elemento <blink> está obsoleto",
        "explanation": "O elemento <blink> faz com que qualquer texto dentro do elemento pisque a uma taxa predeterminada. Isto não pode ser interrompido pelo utilizador, nem pode ser desativado como uma preferência. Por conseguinte, os conteúdos que utilizam a intermitência não cumprem o critério de êxito, porque a intermitência pode continuar durante mais de três segundos.",
        "tip": "Remova todos os elementos <blink> da sua página web."
    },
    "EA-R93": {
        "content": "Página sem meios para contornar blocos repetidos",
        "explanation": "Fornecer formas de saltar conteúdos repetitivos ajuda os utilizadores a navegar no site de forma mais eficaz. Esta regra falha se a página não tiver uma ligação interna para saltar, um título ou uma região de referência.",
        "tip": "A utilização de <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/\">elementos de referência apropriados</a> como &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;, <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">headings</a> ou <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">internal skip links</a> pode ajudar os utilizadores a navegar no sítio de forma mais eficaz."
    },
    "EA-R94": {
        "content": "Estrutura incorrecta do elemento <dl>",
        "explanation": "Uma lista de definições (<dl>) inclui uma lista de grupos de termos (utilizando elementos <dt>) e descrições (utilizando elementos <dd>), por exemplo, para apresentar um glossário. Uma lista de definições só pode conter elementos <dt>, <dd>, <template>, <script> ou <div> numa ordem correcta.",
        "tip": "Verifique se a sua lista de definições contém apenas elementos <dt>, <div> e <dd>. Além disso, verifique se eles estão ordenados corretamente, <dt> deve sempre vir antes dos elementos <dd>."
    },
    "EA-R95": {
        "content": "O elemento <dt> ou <dd> não contém <dl>",
        "explanation": "Os elementos termo de descrição <dt> e detalhes de descrição <dd> têm sempre de ser envolvidos por um elemento de lista de definições <dl> ou a lista de definições é inválida. Caso contrário, as tecnologias de assistência podem não ser capazes de reconhecer corretamente a lista de definições.",
        "tip": "Certifique-se de que o elemento pai de <dt> ou <dd> seja uma lista de definição <dl> ou um <div> que seja filho de um <dl>."
    },
    "EA-R96": {
        "content": "O campo de formulário tem várias etiquetas",
        "explanation": "Cada campo de formulário deve ter apenas um <label> associado. Caso contrário, existem inconsistências na forma como diferentes tecnologias de assistência e combinações de browsers interpretam a etiqueta. As etiquetas são ligadas a campos de formulário utilizando o atributo for na <label> e o atributo id no campo de formulário.",
        "tip": "Certifique-se de que cada campo de formulário tenha apenas um <label> associado. Use o id do campo de formulário para procurar rótulos conectados."
    },
    "EA-R98": {
        "content": "O valor do atributo ARIA ID deve ser único",
        "explanation": "Um ID é um identificador único para os elementos da página Web e, por conseguinte, não deve ser duplicado. Isto é especialmente importante para os elementos ARIA, uma vez que o ID é utilizado para anexar nomes ou descrições acessíveis. As IDs duplicadas são erros de validação comuns que podem comprometer a acessibilidade das etiquetas.",
        "tip": "Renomeie o ID para que ele seja usado apenas uma vez na página. Certifique-se de que os seus elementos ARIA permanecem válidos."
    },
    "EA-R99": {
        "content": "As listas devem conter apenas elementos <li>",
        "explanation": "As listas (<ul> ou <ol>) têm de ser corretamente estruturadas para serem legíveis e corretamente anunciadas pelas tecnologias de assistência. Uma lista só deve conter <li>, <script> ou <template> como nós filhos directos. Os próprios itens da lista podem conter outros elementos.",
        "tip": "Certifique-se de que o nó da lista (<ul> ou <ol>) tenha apenas itens de lista (<li>) como nós filhos diretos."
    },
    "EA-R101": {
        "content": "Evitar a utilização de elementos <marquee>",
        "explanation": "O elemento <marquee> cria texto de rolagem que é difícil de ler e clicar. O elemento <marquee> está obsoleto e pode causar problemas de acessibilidade e usabilidade, especialmente porque é difícil de pausar.",
        "tip": "Substitua os elementos <marquee> por animações CSS modernas ou outras técnicas."
    },
    "EA-R102": {
        "content": "Evitar a utilização de mapas de imagem do lado do servidor",
        "explanation": "Os mapas de imagens do lado do servidor não são acessíveis a utilizadores de teclado, que têm de utilizar cliques do rato para aceder ao conteúdo ligado. Isto torna a imagem inacessível para aqueles que navegam apenas com um teclado. Além disso, não podem ser fornecidas alternativas de texto para as zonas interactivas de um mapa de imagens do lado do servidor, como pode ser feito com mapas de imagens do lado do cliente.",
        "tip": "Utilize mapas de imagens do lado do cliente ou outros elementos interactivos para uma melhor acessibilidade."
    },
    "EA-R104": {
        "content": "O alvo de toque é demasiado pequeno",
        "explanation": "Os alvos tácteis devem ter tamanho e espaçamento suficientes para serem facilmente activados sem ativar involuntariamente um alvo adjacente. Os alvos tácteis devem ter, pelo menos, 24 x 24 píxeis CSS ou ter uma distância de 24 píxeis até ao alvo seguinte. Os alvos tácteis grandes ajudam a evitar erros do utilizador e garantem uma melhor experiência para os utilizadores móveis. Esta regra depende do tamanho da janela de visualização e da posição de deslocação.",
        "tip": "Certifique-se de que o alvo tátil tem, pelo menos, 24 x 24 píxeis CSS de tamanho ou tem uma distância de 24 px até ao alvo seguinte. Existe uma exceção se existir outro controlo que possa fornecer a funcionalidade subjacente e que cumpra o tamanho mínimo."
    },
    "EA-R105": {
        "content": "Garantir valores adequados para o atributo de função",
        "explanation": "Valores de função inadequados podem confundir os utilizadores de tecnologia de assistência ou fazer com que os elementos sejam ignorados.",
        "tip": "Valida se o atributo role tem um valor adequado para o elemento dado."
    },
    "EA-R106": {
        "content": "Nome acessível em falta na caixa de diálogo ARIA",
        "explanation": "Os utilizadores de leitores de ecrã não conseguem compreender o objetivo das caixas de diálogo ARIA (elementos com função=\"dialog\" ou função=\"alertdialog\") que não tenham um nome acessível. Um nome acessível fornece contexto à caixa de diálogo, permitindo aos utilizadores de leitores de ecrã compreender o seu objetivo e função.",
        "tip": "Certifique-se de que a caixa de diálogo ARIA tem um nome acessível. Para o efeito, utilize os atributos aria-label ou aria-labelledby."
    },
    "EA-R107": {
        "content": "Assegurar a utilização correcta de role=\"text\"",
        "explanation": "O role=\"text\" deve ser utilizado em elementos sem descendentes focáveis para evitar desafios de navegação para os utilizadores de leitores de ecrã.",
        "tip": "Utilizar role=\"text\" para elementos sem elementos filhos focáveis."
    },
    "EA-R108": {
        "content": "Nome acessível em falta no treeitem ARIA",
        "explanation": "Uma árvore (role=\"tree\") é uma lista hierárquica com nós pais e filhos que podem ser expandidos e recolhidos. Um treeitem (role=\"treeitem\") é um nó numa árvore. Sem um nome acessível, os leitores de ecrã não conseguem determinar o objetivo do treeitem.",
        "tip": "Atribuir um nome descritivo ao treeitem utilizando um texto interno, um aria-label ou aria-labelledby."
    },
    "EA-R110": {
        "content": "Elemento de formulário sem etiqueta visível",
        "explanation": "As etiquetas visíveis melhoram a acessibilidade do formulário, fornecendo um contexto claro aos utilizadores com visão. Confiar apenas em etiquetas ocultas, título ou aria-describedby pode ser limitador. Os atributos title e aria-describedby fornecem informações adicionais como dicas. Como as dicas são apresentadas de forma diferente das etiquetas para as API de acessibilidade, isto pode causar problemas com as tecnologias de assistência.",
        "tip": "Fornecer uma etiqueta visível e clara. O ideal é usar um elemento <label>. Se não for possível, também pode ser usado aria-label ou aria-labelledby."
    },
    "EA-R111": {
        "content": "O marco do banner não está no nível superior",
        "explanation": "Com <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, os utilizadores cegos que utilizam um leitor de ecrã têm a possibilidade de saltar para secções de uma página Web. A função de banner (role=\"banner\") destina-se a definir um cabeçalho global do sítio, por exemplo, uma função de pesquisa, a navegação global ou um slogan. Se a marca de banner não for uma marca de nível superior (e estiver contida noutra marca), não define efetivamente a parte do cabeçalho predeterminada do esquema.",
        "tip": "Certifique-se de que cada marco de faixa não está contido noutro marco."
    },
    "EA-R112": {
        "content": "O marco complementar não se encontra ao mais alto nível",
        "explanation": "Com <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, os utilizadores cegos que utilizam um leitor de ecrã têm a possibilidade de saltar para secções de uma página Web. O conteúdo complementar como &lt;aside&gt; ou role=\"complementary\" complementa o conteúdo principal de um documento ou página. Os utilizadores de leitores de ecrã têm a opção de ignorar o conteúdo complementar quando este aparece no nível superior da página. Esta opção não está disponível se incorporar um elemento &lt;aside&gt; noutro marco.",
        "tip": "Certifique-se de que cada marco complementar (&lt;aside&gt; ou role=\"complementary\") não está contido noutro marco."
    },
    "EA-R113": {
        "content": "Contentinfo landmark não está no nível superior",
        "explanation": "Com <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, os utilizadores cegos que utilizam um leitor de ecrã têm a possibilidade de saltar para secções de uma página Web. A função contentinfo (role=\"contentinfo\") define um rodapé, contendo informações como informações de direitos de autor, ligações de navegação e declarações de privacidade. Colocá-lo dentro de outro marco pode impedir que os utilizadores cegos de leitores de ecrã encontrem e naveguem rapidamente para o rodapé.",
        "tip": "Certifique-se de que o marco contentinfo (role=\"contentinfo\") não está contido noutro marco."
    },
    "EA-R114": {
        "content": "O marco principal não está no nível superior",
        "explanation": "Com <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, os utilizadores cegos que utilizam um leitor de ecrã têm a possibilidade de saltar para secções de uma página Web. A função da marca principal (&lt;main role=\"main\"&gt;) é utilizada para indicar o conteúdo principal de um documento. É uma prática recomendada garantir que a marca principal não esteja contida noutra marca.",
        "tip": "Certifique-se de que a marca principal (&lt;main role=\"main\"&gt;) não está contida noutra marca."
    },
    "EA-R115": {
        "content": "Existe mais do que um marco de bandeira",
        "explanation": "Com <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, os utilizadores cegos que utilizam um leitor de ecrã têm a possibilidade de saltar para secções de uma página Web. A existência de várias marcas de banner pode confundir a navegação do leitor de ecrã, tornando mais difícil discernir o cabeçalho principal ou o conteúdo introdutório.",
        "tip": "Certifique-se de que cada página HTML tem apenas um marco de banner. Decida qual o marco de banner que pretende manter e remova todos os outros marcos de banner."
    },
    "EA-R116": {
        "content": "Existe mais do que uma referência contentinfo",
        "explanation": "Com <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marcas de terra</a>, os utilizadores cegos que utilizam um leitor de ecrã têm a possibilidade de saltar para secções de uma página Web. As marcas de conteúdo múltiplas (role=\"contentinfo\") podem confundir os utilizadores de tecnologia de assistência, sugerindo várias regiões de rodapé.",
        "tip": "Certifique-se de que cada página HTML tem apenas um marco de contentinfo. Decida qual o marco de contentinfo que pretende manter e remova todos os outros marcos."
    },
    "EA-R117": {
        "content": "Existe mais do que um marco principal",
        "explanation": "Com <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, os utilizadores cegos que utilizam um leitor de ecrã têm a possibilidade de saltar para secções de uma página Web. A função do marco principal (&lt;main role=\"main\"&gt;) é utilizada para indicar o conteúdo principal de um documento. A existência de vários pontos de referência principais pode dificultar a identificação da área de conteúdo principal pelos utilizadores.",
        "tip": "Limite a sua página a um marco principal (&lt;main role=\"main\"&gt;) para indicar claramente o conteúdo principal. Remover pontos de referência principais duplicados."
    },
    "EA-R118": {
        "content": "Falta o marco principal",
        "explanation": "Com <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, os utilizadores cegos que utilizam um leitor de ecrã têm a possibilidade de saltar para secções de uma página Web. O conteúdo fora destas secções é difícil de encontrar e o seu objetivo pode não ser claro. Um marco principal (&lt;main role=\"main\"&gt;) fornece uma forma rápida para os utilizadores de tecnologia de assistência navegarem para o conteúdo principal.",
        "tip": "Adicione uma marca principal (<main>) ao seu sítio Web e inclua nela o conteúdo principal da sua página."
    },
    "EA-R119": {
        "content": "O marco não é único",
        "explanation": "Os pontos de referência únicos ajudam os utilizadores a distinguir entre diferentes secções de conteúdo. Os pontos de referência duplicados podem confundir os utilizadores e dificultar a navegação para o conteúdo pretendido. Alguns pontos de referência, como <cabeçalho> ou <rodapé>, só podem existir uma vez por página, enquanto outros, como <nav> ou <secção>, precisam de ter nomes acessíveis únicos (por exemplo, de aria-label ou aria-labelledby).",
        "tip": "Certifique-se de que o marco tem uma função única ou uma combinação de função/rótulo/título. Por exemplo, altere o rótulo para tornar a região única."
    },
    "EA-R120": {
        "content": "O atributo Scope na tabela está incorreto",
        "explanation": "O atributo scope nas tabelas ajuda os utilizadores de tecnologias de apoio a compreender a relação entre os cabeçalhos e as células de dados. O atributo scope só pode ser utilizado em cabeçalhos de tabelas <th> e deve ter o valor \"col\" ou \"row\".",
        "tip": "Certifique-se de que o atributo scope é utilizado apenas em cabeçalhos de tabelas <th> e que o valor é \"col\" ou \"row\"."
    },
    "EA-R121": {
        "content": "A página não tem uma ligação de salto",
        "explanation": "As ligações de saltar fornecem uma ligação no topo da página que, quando activada, salta o utilizador para o início da área de conteúdo principal. Caso contrário, os utilizadores de teclado e de leitores de ecrã têm de navegar por uma longa lista de ligações de navegação e outros elementos antes de chegarem ao conteúdo principal. Uma ligação de salto típica é \"saltar para o conteúdo\" utilizando uma ligação com uma ligação âncora (por exemplo, #conteúdoprincipal). Recomenda-se que a ligação esteja oculta até que o utilizador navegue até ela com um teclado.",
        "tip": "Adicione uma hiperligação para saltar o conteúdo principal da página. Se já tiver uma ligação para saltar, certifique-se de que pode ser acedida com o teclado."
    },
    "EA-R122": {
        "content": "Assegurar que os valores do índice de tabulação são 0 ou negativos",
        "explanation": "A utilização de valores de índice de separadores superiores a 0 pode perturbar a ordem natural dos separadores, causando dificuldades de navegação aos utilizadores de teclado e de tecnologias de apoio.",
        "tip": "Defina os valores tabindex para 0 ou deixe-os por definir para uma ordem de tabulação natural. Utilize valores negativos para elementos programáveis."
    },
    "EA-R123": {
        "content": "O quadro tem um título e um resumo idênticos",
        "explanation": "Ter o mesmo texto no elemento <caption> de uma tabela e no seu atributo de resumo é redundante e pode ser potencialmente confuso. O elemento <caption> é utilizado como um título no ecrã, enquanto o atributo de resumo é utilizado pelos leitores de ecrã para aceder a um resumo do objetivo da tabela.",
        "tip": "Certifique-se de que o texto da <caption> é diferente do atributo de resumo da tabela para evitar confusão."
    },
    "EA-R124": {
        "content": "Ligações idênticas com objectivos diferentes",
        "explanation": "As ligações com o mesmo nome acessível devem ter a mesma funcionalidade/objetivo para evitar confusões. A descrição da ligação permite ao utilizador distinguir cada ligação das ligações na página Web que conduzem a outros destinos e ajuda o utilizador a decidir se deve seguir a ligação.",
        "tip": "Evite ter ligações com descrições idênticas (por exemplo, a partir de texto interno, atributos alt ou aria) que direccionem para URLs diferentes. Forneça um texto de ligação que descreva o objetivo e o destino da ligação."
    },
    "EA-R125": {
        "content": "Certificar-se de que a língua do sítio está corretamente identificada",
        "explanation": "A língua de fundo não passa por todos os elementos da página. Dies ist erlaubt, wenn diese Elemente durch ein eigenes lang-Attribut korrekt ausgezeichnet werden. A seguir, é possível, por exemplo, a utilização de uma língua estrangeira.",
        "tip": "Certifique-se de que todas as outras peças da página têm o atributo de linguagem correto."
    }
};