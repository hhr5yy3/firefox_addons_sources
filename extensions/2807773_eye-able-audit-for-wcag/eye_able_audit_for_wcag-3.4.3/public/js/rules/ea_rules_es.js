const ea_rules_es = {
    "EA-R1": {
        "content": "Sintaxis SVG incorrecta",
        "explanation": "La sintaxis del elemento SVG no es correcta. Falta el atributo role o el elemento title/desc.",
        "tip": "Compruebe la función o el elemento title/desc del SVG."
    },
    "EA-R2": {
        "content": "<svg> falta texto accesible",
        "explanation": "Los elementos <svg> con el rol \"img\" necesitan un nombre accesible para que los usuarios de lectores de pantalla puedan entender su contenido y propósito.",
        "tip": "Crea un atributo title, un elemento title/desc o atributos aria para el <svg>."
    },
    "EA-R3": {
        "content": "El texto alternativo <svg> es muy corto (<5 caracteres)",
        "explanation": "El texto accesible del SVG es muy corto (<5 caracteres) y puede que no describa suficientemente el gráfico.",
        "tip": "Compruebe si el texto accesible describe suficientemente el SVG."
    },
    "EA-R4": {
        "content": "El texto alternativo <svg> es muy largo (>150 caracteres)",
        "explanation": "El texto alternativo SVG es muy largo (>150 caracteres) y puede resumirse. Muchas personas ciegas leen textos con la ayuda de un visor Braille. Un visor Braille puede emitir al menos 40 caracteres, pero sólo un máximo de 80.",
        "tip": "Resuma la descripción a lo esencial."
    },
    "EA-R5": {
        "content": "<svg> accesible es un poco largo (>80 caracteres)",
        "explanation": "Texto alternativo SVG algo largo (>80 caracteres) y potencialmente resumible. Muchas personas ciegas leen textos con la ayuda de un visor Braille. Un visor Braille puede emitir al menos 40 caracteres, pero sólo un máximo de 80.",
        "tip": "Resuma la descripción a lo esencial."
    },
    "EA-R6": {
        "content": "Falta texto alternativo en la imagen",
        "explanation": "Las imágenes (<img> o role=\"img\") necesitan un texto alternativo para que los usuarios de lectores de pantalla puedan comprender el contenido y la finalidad de la imagen. El atributo title no siempre se reconoce de forma fiable.",
        "tip": "Añade un texto alternativo significativo utilizando los atributos alt-, aria-label- o aria-labelledby-. Se puede utilizar un atributo alt vacío para las imágenes decorativas."
    },
    "EA-R7": {
        "content": "Texto alternativo redundante como enlace adjunto",
        "explanation": "La imagen tiene el mismo texto alternativo que el enlace adyacente. Repetir el texto alternativo de un enlace o imagen en el texto adyacente es innecesario y puede confundir a los usuarios de lectores de pantalla al leerlo dos veces.",
        "tip": "Elimine el texto alt de la imagen, ya que no contiene ninguna información adicional. En su lugar, utiliza un atributo alt vacío, alt=\"\", para la imagen."
    },
    "EA-R8": {
        "content": "Falta texto alternativo en imagen enlazada",
        "explanation": "Dado que el enlace en sí no contiene texto, la imagen debe tener un texto alternativo para que los lectores de pantalla puedan identificar el contenido y la finalidad del enlace. Un atributo title no es suficiente para todos los lectores de pantalla.",
        "tip": "Añada un texto alternativo significativo para el enlace o la imagen enlazada."
    },
    "EA-R9": {
        "content": "El texto alternativo de la imagen es muy corto (<5 caracteres)",
        "explanation": "El texto alternativo de una imagen debe describir su contenido de forma significativa.",
        "tip": "Compruebe que el texto alternativo describe adecuadamente la imagen."
    },
    "EA-R10": {
        "content": "El texto alternativo de la imagen es muy largo (>150 caracteres)",
        "explanation": "El texto alternativo de esta imagen es muy largo (>150 caracteres) y posiblemente pueda resumirse. Muchas personas ciegas leen textos con la ayuda de un visor Braille. Un visor Braille puede emitir al menos 40 caracteres, pero sólo un máximo de 80.",
        "tip": "Resuma la descripción a su esencia."
    },
    "EA-R11": {
        "content": "El texto alternativo de la imagen es un poco largo (>80 caracteres)",
        "explanation": "El texto alternativo es un poco largo (>80 caracteres) y posiblemente pueda resumirse. Muchas personas ciegas leen textos con la ayuda de un visualizador Braille. Un visor Braille puede emitir al menos 40 caracteres, pero sólo un máximo de 80.",
        "tip": "Resuma la descripción a su esencia."
    },
    "EA-R12": {
        "content": "Los enlaces deben tener texto accesible",
        "explanation": "Los enlaces requieren un texto que sea comprensible y reproducido correctamente por los lectores de pantalla. Un texto de enlace debe explicar claramente qué información obtendrá el lector al hacer clic en ese enlace.",
        "tip": "Añada un texto de enlace significativo utilizando un texto interior o atributos ARIA que describan la finalidad y el destino del enlace. El texto del enlace tampoco debe quedar oculto para los lectores de pantalla (por ejemplo, con display: none o aria-hidden=\"true\")."
    },
    "EA-R13": {
        "content": "Enlace vacío",
        "explanation": "Este enlace no tiene contenido ni destino (atributo href).",
        "tip": "Eliminar enlaces vacíos."
    },
    "EA-R14": {
        "content": "El texto accesible del enlace es una URL",
        "explanation": "Los textos de los enlaces deben ser significativos y describir la finalidad y el objetivo del enlace. Los usuarios de lectores de pantalla deben poder decidir fácilmente si quieren seguir un enlace.",
        "tip": "Asegúrese de utilizar descripciones que describan la finalidad y el objetivo del enlace. El texto del enlace tampoco debe quedar oculto para los lectores de pantalla (por ejemplo, con display: none o aria-hidden=\"true\")."
    },
    "EA-R15": {
        "content": "El texto del enlace es muy largo (>150 caracteres)",
        "explanation": "El texto accesible de este enlace es muy largo (>150 caracteres) y potencialmente puede resumirse. Muchas personas ciegas leen textos con la ayuda de un visor Braille. Un visor Braille puede emitir al menos 40 caracteres, pero sólo un máximo de 80.",
        "tip": "Asegúrese de utilizar textos significativos y compactos."
    },
    "EA-R16": {
        "content": "<objeto> falta nombre accesible",
        "explanation": "Los elementos <object> pueden contener contenidos multimedia (audio, vídeo, etc.) y deben tener un nombre accesible para los lectores de pantalla. Los usuarios de lectores de pantalla no pueden conocer el contenido del objeto sin una alternativa textual.",
        "tip": "Añade un nombre accesible al <object> utilizando un título o atributos aria como aria-label y aria-labelledby."
    },
    "EA-R17": {
        "content": "Audio detectado",
        "explanation": "Compruebe si la información se transmite en el audio (por ejemplo, mediante una voz de comentario). Si es así, es necesaria una transcripción.",
        "tip": "Compruebe si es necesaria una transcripción para el archivo de audio. Si es así, ofrezca una alternativa, por ejemplo, mediante una transcripción de texto."
    },
    "EA-R18": {
        "content": "Vídeo detectado",
        "explanation": "Comprueba si el vídeo requiere una alternativa multimedia o un subtítulo. Si un vídeo no está subtitulado, los usuarios sordos tendrán un acceso limitado o nulo a la información que contiene. Del mismo modo, los archivos de vídeo mudo (sin voz) no están disponibles para los usuarios ciegos. También necesitan una alternativa multimedia completa (texto, pista de audio alternativa o archivo de audio).",
        "tip": "Comprueba si se necesita una alternativa multimedia o un subtítulo con el vídeo y proporciónalo si es necesario."
    },
    "EA-R19": {
        "content": "Detectados varios títulos H1",
        "explanation": "La estructura de encabezados de la página debe estar estructurada de forma lógica y, a ser posible, comenzar con el encabezado H1. El encabezamiento H1 identifica las partes más importantes de la página.",
        "tip": "Si es posible, utilice sólo un encabezamiento H1. Estructure otros títulos con H2, H3, etc."
    },
    "EA-R20": {
        "content": "Falta el encabezamiento H1",
        "explanation": "O no hay encabezamiento H1, o está oculto para los lectores de pantalla. Compruebe si el encabezado H1 existe y es visible, ya que sirve como primer y más importante elemento de la estructura de encabezados (h1-h6). El elemento <h1> debe estar al principio del contenido principal, permitiendo a los usuarios de lectores de pantalla navegar directamente al contenido principal utilizando atajos de teclado.",
        "tip": "Si es posible, cree siempre un encabezado <h1> visible que describa el contenido de la página."
    },
    "EA-R21": {
        "content": "Saltar en el orden de encabezamiento",
        "explanation": "La estructura de encabezados de la página debe estar organizada de forma lógica y los niveles de encabezado sólo deben aumentar de uno en uno. Evite los saltos, por ejemplo de H2 a H4.",
        "tip": "Intenta no saltar en el orden de las rúbricas."
    },
    "EA-R22": {
        "content": "Un elemento de lista <li> no forma parte de una lista",
        "explanation": "Una lista válida siempre debe estar enmarcada por un elemento <ul> o <ol>. De lo contrario, los elementos de lista no serán detectados correctamente como lista por el lector de pantalla. Ten cuidado con los posibles roles de los elementos padre <ul> o <ol> a través del atributo role.",
        "tip": "Construya una lista correcta con un elemento padre <ul> o <ol>. Si ya ha configurado un elemento <ul> o <ol>, tenga cuidado con los posibles roles a través del atributo role."
    },
    "EA-R23": {
        "content": "Contraste de texto insuficiente",
        "explanation": "Asegúrese de que todos los elementos de texto tengan suficiente contraste de color entre el texto en primer plano y el color de fondo detrás de él. El contraste mínimo depende del tamaño del texto y es de 3:1 o 4,5:1 para textos de mayor tamaño (>18pt).",
        "tip": "Aumente el contraste, por ejemplo, con un tipo de letra o un color de fondo más oscuro o más claro."
    },
    "EA-R24": {
        "content": "Contraste SVG insuficiente",
        "explanation": "La representación visual de los SVG debe mantener una relación de contraste mínima de 3:1 para que se perciban bien.",
        "tip": "Aumente el contraste del SVG."
    },
    "EA-R25": {
        "content": "Comprobar el contraste manualmente",
        "explanation": "Se ha detectado un contraste muy bajo. A veces esto indica el uso de imágenes de fondo o degradados. Compruebe el contraste manualmente.",
        "tip": "Aumente el contraste, por ejemplo, con un tipo de letra o un color de fondo más oscuro o más claro. Asegúrate de que el texto sobre imágenes de fondo tenga un contraste suficiente de 4,5:1 para el texto más pequeño y de 3:1 para el texto más grande."
    },
    "EA-R26": {
        "content": "Página sin título",
        "explanation": "El título de la página es importante para describir el tema o el propósito de la página. Permite a los visitantes de su sitio web clasificar o encontrar rápidamente su contenido.",
        "tip": "Añade un elemento <title> descriptivo a la página."
    },
    "EA-R27": {
        "content": "El título de la página es muy corto",
        "explanation": "El título de la página es importante para describir el tema o el propósito de la página. Permite a los visitantes de su sitio web clasificar o encontrar rápidamente su contenido.",
        "tip": "Compruebe que el título describe adecuadamente la página."
    },
    "EA-R28": {
        "content": "<iframe> no tiene nombre accesible",
        "explanation": "El nombre accesible de un <iframe> es importante para describir su tema o propósito. Los usuarios de lectores de pantalla pueden acceder a una lista de títulos de todos los marcos de una página. Sin embargo, navegar por los elementos <frame> y <iframe> puede resultar difícil y confuso si el marcado carece de atributo title, sobre todo para los usuarios con discapacidad.",
        "tip": "Añade un atributo title descriptivo al <iframe>. También puedes añadir un atributo aria como aria-label o aria-labelledby."
    },
    "EA-R29": {
        "content": "Falta el idioma del sitio web",
        "explanation": "Para que la salida de voz de los lectores de pantalla o del navegador funcione correctamente, debe especificarse el idioma de la página. Los lectores de pantalla utilizan diferentes bibliotecas de sonidos para los distintos idiomas, en función de la pronunciación y las características de ese idioma. Es importante especificar un idioma y asegurarse de que es válido para que el texto del sitio web se pronuncie correctamente.",
        "tip": "Añada el atributo lang al elemento HTML de su página."
    },
    "EA-R30": {
        "content": "Idioma de página incorrecto",
        "explanation": "Para que la salida de voz de los lectores de pantalla o del navegador funcione correctamente, el idioma de la página debe especificarse correctamente. De lo contrario, por ejemplo, la pronunciación de una salida de voz será incorrecta.",
        "tip": "Compruebe que el idioma del elemento HTML es igual al idioma real de la página."
    },
    "EA-R31": {
        "content": "Abreviatura detectada",
        "explanation": "Las abreviaturas no siempre son comprensibles para todo el mundo y deben explicarse en el texto o mediante elementos HTML como <abbr>.",
        "tip": "Compruebe si la abreviatura ya está etiquetada. Si no es así, añada el texto completo o utilice elementos HTML especiales como <abbr>."
    },
    "EA-R32": {
        "content": "El valor del atributo ID debe ser único",
        "explanation": "Un ID es un identificador único para los elementos de la página web y, por tanto, no debe estar duplicado. Los ID duplicados pueden hacer que los lectores de pantalla omitan elementos. A partir de 2023, este ya no es un requisito de las WCAG, a menos que provoque el incumplimiento de otro criterio de las WCAG.",
        "tip": "Cambie el nombre del ID para que sólo se utilice una vez en la página."
    },
    "EA-R33": {
        "content": "Botón de imagen sin nombre accesible",
        "explanation": "Una entrada gráfica (<input type=\"image\">) requiere texto alternativo para que los lectores de pantalla puedan reflejar su propósito.",
        "tip": "Añada un atributo alt o ARIA significativo (aria-label o aria-labelledby) que describa el contenido y la finalidad de esta imagen."
    },
    "EA-R34": {
        "content": "No se recomienda el botón de reinicio",
        "explanation": "No se recomienda el uso de botones de reinicio, ya que pueden pulsarse fácilmente por error.",
        "tip": "Si es posible, retire el botón de reinicio."
    },
    "EA-R35": {
        "content": "Falta el nombre accesible del campo del formulario",
        "explanation": "Un campo de formulario necesita un nombre accesible para que los lectores de pantalla puedan reflejar su propósito. Esto incluye elementos <input> y <select> o elementos con un rol de \"checkbox\", \"listbox\", \"searchbox\", \"spinbutton\" o \"textbox\" entre otros roles.",
        "tip": "Cree una <label> adecuada para los elementos <input> o <select>. También puede utilizar atributos aria como aria-label para elementos con una función. La etiqueta debe describir el propósito de este campo de formulario. Cuando utilices una <label> utiliza un atributo for que coincida con el id de la entrada única."
    },
    "EA-R36": {
        "content": "<button> falta el nombre accesible",
        "explanation": "Un <button> o un <input> con type=\"button\" necesita un nombre accesible para que los lectores de pantalla puedan reflejar su propósito.",
        "tip": "Inserte un texto en el contenido del elemento botón o utilice atributos aria como aria-label o aria-labelledby para describir su propósito."
    },
    "EA-R38": {
        "content": "<area> falta texto alternativo",
        "explanation": "Los elementos de área identifican zonas dentro de un mapa de imagen que pueden utilizarse para definir áreas sobre las que se puede hacer clic. Por lo tanto, necesitan un nombre accesible para que los lectores de pantalla puedan reflejar su propósito.",
        "tip": "Añade un texto alternativo al elemento área, por ejemplo, mediante el atributo alt o aira-labels."
    },
    "EA-R39": {
        "content": "El cuerpo está oculto",
        "explanation": "El elemento body contiene el atributo aria-hidden: \"true\", por lo que la página no es accesible para lectores de pantalla.",
        "tip": "Elimina el atributo aria-hidden del elemento body."
    },
    "EA-R40": {
        "content": "<select> falta el nombre accesible",
        "explanation": "Los elementos <select> deben tener un nombre accesible para que los usuarios de lectores de pantalla puedan identificar su propósito.",
        "tip": "Describa el propósito de la lista de selección con un elemento <label> o atributos aria."
    },
    "EA-R41": {
        "content": "Atributo accesskey duplicado",
        "explanation": "El atributo accesskey puede utilizarse para especificar un carácter del teclado que el usuario puede pulsar para saltar directamente a los elementos. Una asignación duplicada no está permitida aquí y conduce a un comportamiento inesperado.",
        "tip": "Cambie el atributo de clave de acceso para que sea exclusivo de la página."
    },
    "EA-R42": {
        "content": "Elemento <th> vacío",
        "explanation": "El elemento <th> de la cabecera de una tabla describe el significado de la columna correspondiente. Sin texto visible, el propósito de la fila o columna no queda claro ni para los usuarios videntes ni para los lectores de pantalla.",
        "tip": "Inserte un contenido de texto visible que describa los datos de esta columna."
    },
    "EA-R43": {
        "content": "Los títulos no deben estar vacíos",
        "explanation": "Este encabezamiento no contiene texto pero puede ser alcanzado por lectores de pantalla.",
        "tip": "Añada un texto al encabezamiento o elimínelo."
    },
    "EA-R44": {
        "content": "Falta el nombre accesible del encabezamiento",
        "explanation": "Esta regla comprueba que cada encabezado tenga un nombre accesible no vacío y sea visible para los lectores de pantalla. Los lectores de pantalla notifican a los usuarios la presencia de una etiqueta de encabezamiento. Si el encabezamiento está vacío o el texto es inaccesible, esto podría confundir a los usuarios o incluso impedirles acceder a información sobre la estructura de la página.",
        "tip": "Comprueba si el encabezado tiene algún contenido. El contenido también puede ocultarse mediante aria-hidden=\"true\" o display=\"none\"."
    },
    "EA-R45": {
        "content": "La altura de línea del párrafo es insuficiente",
        "explanation": "La altura de línea del párrafo (<p>) es inferior a 1,5. Esto puede afectar a la legibilidad del texto.",
        "tip": "Aumente la altura de línea del párrafo a 1,5 como mínimo."
    },
    "EA-R46": {
        "content": "!important espaciado entre letras en el atributo style",
        "explanation": "Esta regla comprueba que no se utilice el atributo style para evitar que se ajuste el espaciado entre letras mediante !important, excepto si es al menos 0,12 veces el tamaño de la fuente. El uso de !important en los atributos de estilo impide que se sobrescriba este estilo.",
        "tip": "Si es posible, no utilice !important en el atributo de estilo o asegúrese de que el espaciado entre letras es al menos 0,12 veces el tamaño de la fuente."
    },
    "EA-R47": {
        "content": "!important espaciado entre palabras en el atributo style",
        "explanation": "Esta regla comprueba que no se utilice el atributo style para evitar el ajuste del espaciado entre palabras mediante !important, excepto si es al menos 0,16 veces el tamaño de la fuente. El uso de !important en los atributos de estilo impide que se sobrescriba este estilo.",
        "tip": "Si es posible, no utilice !important en el atributo de estilo o asegúrese de que el espaciado entre palabras es al menos 0,16 veces el tamaño de la fuente."
    },
    "EA-R48": {
        "content": "!important line-height en el atributo style",
        "explanation": "Esta regla comprueba que no se utilice el atributo style para evitar el ajuste de la altura de línea mediante !important, excepto si es al menos 1,5 veces el tamaño de la fuente. El uso de !important en los atributos de estilo impide que se sobrescriba este estilo.",
        "tip": "Si es posible, no utilice !important en el atributo style o asegúrese de que la altura de línea es al menos 1,5 veces el tamaño de la fuente."
    },
    "EA-R49": {
        "content": "El elemento <audio> o <video> reproduce automáticamente el audio",
        "explanation": "El audio o vídeo que se reproduce automáticamente no puede tener un audio que dure más de 3 segundos o necesite un mecanismo de control de audio para detenerlo o silenciarlo.",
        "tip": "No reproduzcas automáticamente el audio o asegúrate de que existe un mecanismo de control para detenerlo o silenciarlo."
    },
    "EA-R50": {
        "content": "Atributo lang no válido detectado",
        "explanation": "El atributo lang del elemento <html> debe ser un código de idioma válido y conforme a la norma BCP 47, por ejemplo \"de\" o \"en-us\".",
        "tip": "Asegúrese de que se establece un código de idioma válido como atributo lang del elemento <html>."
    },
    "EA-R51": {
        "content": "Los atributos Lang y xml:lang no coinciden",
        "explanation": "Los atributos lang y xml:lang del elemento <html> de una página HTML no incrustada deben tener la misma subetiqueta de idioma principal.",
        "tip": "Asegúrese de que los atributos lang y xml:lang del elemento <html> coinciden."
    },
    "EA-R52": {
        "content": "Elementos <Iframe> con nombres accesibles idénticos",
        "explanation": "Deben evitarse los elementos <iframe> con nombres accesibles idénticos o, al menos, incrustar el mismo recurso o recursos equivalentes. Utilizar el mismo nombre accesible puede inducir a error a los usuarios de lectores de pantalla.",
        "tip": "Utilice atributos de título únicos para cada marco o asegúrese de que los elementos <iframe> con nombres accesibles idénticos conducen al mismo recurso."
    },
    "EA-R53": {
        "content": "<iframe> tiene tabindex negativo",
        "explanation": "Los elementos <iframe> con un atributo tabindex negativo no deben contener elementos interactivos. Al establecer el valor del atributo tabindex de un elemento <iframe> en -1 o algún otro número negativo, resulta imposible mover el foco al contexto de navegación del elemento <iframe>.",
        "tip": "Elimina el tabindex negativo si el <iframe> contiene elementos enfocables."
    },
    "EA-R54": {
        "content": "Meta viewport impide el zoom",
        "explanation": "El uso de elementos <meta name=\"viewport\"> puede limitar la capacidad de zoom del usuario, especialmente en dispositivos móviles. El zoom es un comportamiento \"permitido\" común y esperado en las páginas web para móviles, por lo que desactivarlo resta valor a la experiencia del usuario móvil, especialmente para los usuarios con visión parcial y baja visión.",
        "tip": "Elimine los atributos user-scalable y maximum-scale. De lo contrario, asegúrate de que el atributo content no establece user-scalable como \"no\" y de que la propiedad maximum-scale es al menos 2."
    },
    "EA-R55": {
        "content": "No hay celdas de datos asignadas a la cabecera de la tabla",
        "explanation": "Esta regla comprueba que cada encabezado de tabla <th> tenga asignadas celdas <td> en un elemento de tabla. Si las tablas no se marcan correctamente, se puede producir una salida confusa o imprecisa del lector de pantalla.",
        "tip": "Elimine las celdas del encabezado de la tabla que no tengan celdas asignadas o asigne celdas al encabezado."
    },
    "EA-R56": {
        "content": "Atributo ARIA no definido",
        "explanation": "Esta regla comprueba que cada atributo aria-* especificado esté definido en <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA 1.1</a>. Los atributos aria no válidos o mal escritos no son reconocidos por los lectores de pantalla.",
        "tip": "Compruebe que el atributo aria no esté mal escrito y especificado en <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA-specifications</a>. Asegúrate de utilizar solo atributos aria válidos."
    },
    "EA-R57": {
        "content": "Estado o propiedad ARIA no compatible",
        "explanation": "Esta regla comprueba que los estados o propiedades <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria/\">WAI-ARIA</a> estén permitidos para el elemento en el que se especifican. Los estados o propiedades ARIA deben estar de acuerdo con la especificación oficial o pueden ser ignorados o interpretados incorrectamente por las tecnologías de asistencia.",
        "tip": "Eliminar estados o propiedades WAI-ARIA no especificados o corregirlos a un valor permitido."
    },
    "EA-R58": {
        "content": "Estado ARIA o valor de propiedad no válidos",
        "explanation": "Esta regla comprueba que el valor de <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">Estados o propiedades ARIA</a> esté permitido para el elemento en el que se especifican. Los estados o propiedades ARIA deben ser conformes a la especificación oficial o no serán accesibles para los usuarios de tecnologías de asistencia.",
        "tip": "Eliminar valores ARIA no especificados de estados o propiedades o corregirlos al valor correcto."
    },
    "EA-R59": {
        "content": "El atributo Autocompletar no es válido",
        "explanation": "Esta regla se aplica a cualquier elemento HTML <input>, <select> y <textarea> con un valor de atributo de autocompletar. El atributo autocompletar necesita un valor correcto para ser reconocido por el navegador y los lectores de pantalla.",
        "tip": "Asegúrese de que <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete\">el valor de autocompletar</a> es compatible."
    },
    "EA-R60": {
        "content": "Ninguna celda de encabezamiento asignada a celdas de datos",
        "explanation": "Esta regla comprueba que cada cabecera de tabla <th> tenga asignadas celdas <td> en un elemento de tabla.",
        "tip": "Añada una celda de encabezado <th> a cada celda de datos <td> si es posible."
    },
    "EA-R61": {
        "content": "Página sin título",
        "explanation": "El documento no contiene ningún elemento de encabezamiento. Los encabezados estructuran un sitio web y ayudan a los usuarios de lectores de pantalla a navegar y comprender su contenido.",
        "tip": "Compruebe si se pueden añadir encabezados para estructurar el sitio web. Asegúrese de marcar correctamente todos los encabezados con las etiquetas <h1>-<h6> o con role=\"heading\"."
    },
    "EA-R62": {
        "content": "El elemento de presentación tiene descendientes enfocables",
        "explanation": "Esta regla comprueba que los elementos con un rol que hace que sus hijos sean presentacionales no contengan elementos enfocables, por ejemplo, un enlace, un botón o una entrada. Tales elementos son, por ejemplo, <button>, checkbox o <img>. Los hijos de estos elementos no son detectados correctamente por las tecnologías de asistencia y crean un tabulador vacío.",
        "tip": "No añadas elementos enfocables como hijos de elementos con un rol que haga a sus hijos presentables, por ejemplo, un <button> o role=\"checkbox\"."
    },
    "EA-R63": {
        "content": "El elemento decorativo está expuesto a las tecnologías de asistencia",
        "explanation": "Esta regla comprueba que los elementos marcados como decorativos no estén incluidos en el árbol de accesibilidad o tengan una función de presentación. Marcar un elemento como decorativo lo oculta de las tecnologías de asistencia, pero hacerlo enfocable lo expone. Además, algunos elementos como <nav> no pueden tener un papel decorativo si poseen un nombre accesible, por ejemplo, mediante una etiqueta aria. Este conflicto debe evitarse.",
        "tip": "Compruebe si es necesario marcar el elemento como decorativo u ocultarlo de las tecnologías de asistencia, por ejemplo, utilizando aria-hidden=\"true\" o role=\"presentation\". En este caso, elimine también todos los atributos aria label."
    },
    "EA-R64": {
        "content": "Contenedor que falta niños necesarios",
        "explanation": "Algunos elementos con un rol semántico explícito necesitan tener al menos uno de sus elementos propietarios requeridos. Por ejemplo, un elemento con la función \"lista\" debe poseer elementos con la función \"listitem\". El incumplimiento de este requisito puede invalidar el propio elemento.",
        "tip": "Compruebe si la función del elemento se ha utilizado correctamente o asegúrese de incluir los nodos hijos necesarios."
    },
    "EA-R65": {
        "content": "Elemento que falta",
        "explanation": "Algunos elementos con un rol semántico explícito necesitan tener un elemento padre específico. Por ejemplo, un elemento con el rol \"listitem\" necesita un nodo padre con el rol \"list\". Si no cumple este requisito, el elemento no será válido.",
        "tip": "Compruebe si el rol del elemento se ha utilizado correctamente o asegúrese de utilizar el nodo padre y el rol requeridos."
    },
    "EA-R66": {
        "content": "El elemento Aria oculto tiene contenido enfocable",
        "explanation": "Al añadir aria-hidden=\"true\" a un elemento, el propio elemento y todos sus descendientes quedan ocultos para las tecnologías de asistencia. Exponerlo a la navegación de enfoque secuencial puede causar confusión a los usuarios de tecnologías de asistencia porque se puede llegar al elemento, pero debería estar oculto.",
        "tip": "Compruebe si el elemento debe ocultarse a la tecnología de asistencia y, en caso afirmativo, elimínelo de la navegación de enfoque secuencial. Para eliminar la navegación por pestañas, añada el atributo tabindex=\"-1\", el estilo \"disabled:none\" o el atributo disabled."
    },
    "EA-R67": {
        "content": "Tamaño de letra muy pequeño",
        "explanation": "Esta regla comprueba que el tamaño de las fuentes sea superior a 9 píxeles. Los tamaños de fuente pequeños no son fáciles de leer y deben evitarse en la medida de lo posible.",
        "tip": "Compruebe si el tamaño de la fuente puede aumentarse al menos 10px. En general, se recomienda un tamaño de fuente de 16px o superior para el texto normal."
    },
    "EA-R68": {
        "content": "Falta el nombre accesible del grupo",
        "explanation": "Agrupar controles de formulario relacionados hace que los formularios sean más comprensibles para todos los usuarios, ya que los controles relacionados son más fáciles de identificar. Para que las tecnologías de asistencia puedan identificar correctamente el propósito de un grupo, éste necesita un nombre accesible, por ejemplo, utilizando una <legend> para un <fieldset> o atributos aria para elementos con rol=\"grupo\" o \"menubar\".",
        "tip": "Asegúrate de que cada grupo tiene un nombre accesible usando aria-attributes como aria-label o un <legend> para un <fieldset>."
    },
    "EA-R69": {
        "content": "Falta el atributo Headers de la celda de referencia",
        "explanation": "El atributo <a target=\"_blank\" href=\"https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/H43\">headers</a> especifica una o más celdas de encabezado con las que está relacionada una celda de tabla. Sólo lo utilizan los lectores de pantalla. Esta regla comprueba que el atributo headers de una celda haga referencia a una celda correspondiente del mismo elemento de tabla. Si las tablas no se marcan correctamente, el lector de pantalla puede generar resultados confusos o imprecisos.",
        "tip": "Comprueba si hay otra celda que tenga el id del valor del atributo headers en la misma tabla. En caso contrario, elimine el atributo headers o cree una celda correspondiente con este id."
    },
    "EA-R70": {
        "content": "El elemento marcado como decorativo está expuesto",
        "explanation": "Esta regla comprueba que los elementos marcados como decorativos no estén incluidos en el árbol de accesibilidad o tengan una función de presentación. Marcar un elemento como decorativo lo oculta de las tecnologías de asistencia, pero hacerlo enfocable o añadirle atributos ARIA puede exponerlo. Este conflicto debe evitarse.",
        "tip": "Compruebe si el elemento debe marcarse como decorativo u ocultarlo a las tecnologías de asistencia, por ejemplo, utilizando aria-hidden=\"true\" o role=\"presentation\"."
    },
    "EA-R71": {
        "content": "Elemento con atributo lang inválido detectado",
        "explanation": "Las partes de un sitio web pueden marcarse como en un idioma distinto al del resto del sitio web mediante el atributo lang. El atributo lang de estos elementos también debe ser un código de idioma válido y conforme a la norma BCP 47, por ejemplo \"de\" o \"en-us\".",
        "tip": "Asegúrese de que el atributo lang del elemento contiene un código de idioma válido."
    },
    "EA-R72": {
        "content": "El enlace no se distingue del texto circundante",
        "explanation": "Esta regla comprueba que los enlaces en línea se distinguen del texto circundante por una diferencia no basada únicamente en el color. Los enlaces pueden resaltarse, por ejemplo, subrayando el texto o utilizando un borde. También se comprueban los estados Hover y Focus.",
        "tip": "Asegúrese de que el enlace se distingue del texto circundante no sólo por el color. Compruébelo también al pasar el ratón por el enlace o al enfocarlo."
    },
    "EA-R73": {
        "content": "Menuitem missing accessible name",
        "explanation": "Esta regla comprueba que cada elemento con un rol menuitem tenga un nombre accesible no vacío. La función menuitem indica que el elemento es una opción de un conjunto de opciones contenidas en un menú o barra de menús.",
        "tip": "Añade un nombre accesible utilizando el contenido del elemento o mediante atributos aria."
    },
    "EA-R74": {
        "content": "La orientación de la página está restringida",
        "explanation": "Esta regla comprueba que el contenido de la página no esté restringido a la orientación horizontal o vertical mediante la propiedad de transformación de CSS. Los elementos que se fijan a una determinada rotación, utilizando la función de medios de orientación con un valor de horizontal o vertical, pueden fallar al rotar en dispositivos móviles.",
        "tip": "Asegúrese de que todos los elementos del sitio web giran correctamente al pasar del modo vertical al horizontal."
    },
    "EA-R75": {
        "content": "El párrafo está en cursiva",
        "explanation": "Aunque es bueno utilizar la cursiva para resaltar contenidos importantes, evite hacerlo en párrafos largos. Especialmente para las personas con dislexia, el texto en cursiva puede resultar más difícil de leer.",
        "tip": "Evite los trozos grandes de texto en cursiva y utilícela sólo para resaltar el contenido importante."
    },
    "EA-R76": {
        "content": "El párrafo está todo en mayúsculas",
        "explanation": "Aunque utilizar mayúsculas para resaltar contenido importante puede ser bueno, evite hacerlo en párrafos más largos. Especialmente para las personas con dislexia, el texto en mayúsculas puede resultar más difícil de leer. Los lectores de pantalla también pueden leer cada letra por separado.",
        "tip": "Evite los grandes trozos de texto en mayúsculas y utilícelas sólo para resaltar el contenido importante."
    },
    "EA-R77": {
        "content": "Los párrafos de texto están justificados",
        "explanation": "Las personas con ciertas discapacidades cognitivas tienen problemas para leer textos justificados tanto a la izquierda como a la derecha. El espaciado desigual entre palabras en un texto totalmente justificado puede dificultar la lectura y, en algunos casos, hacerla imposible.",
        "tip": "Evite utilizar una alineación de texto justificada en los párrafos de texto más largos."
    },
    "EA-R78": {
        "content": "El contenido no está incluido en una región emblemática",
        "explanation": "<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html\">Los puntos de referencia</a> identifican mediante programación las secciones de una página. Es una buena práctica incluir todo el contenido de la página en landmarks, para que los usuarios de lectores de pantalla que confían en ellos para navegar de una sección a otra no pierdan el rastro del contenido. Ejemplos de regiones son header, nav, footer o main. Se recomienda utilizar puntos de referencia HTML5 nativos, como &lt;nav&gt;, en lugar de roles ARIA, como role=\"nav\".",
        "tip": "Añade todos los elementos de texto a los puntos de referencia existentes o crea otros nuevos. Puedes encontrar una descripción general de <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/HTML5.html\">Hitos HTML aquí</a>."
    },
    "EA-R79": {
        "content": "El elemento <meta> tiene retardo de actualización",
        "explanation": "Esta regla comprueba que el elemento <meta> no se utiliza para redireccionar o refrescar de forma retardada. Dado que los usuarios no esperan que una página se actualice automáticamente, este tipo de actualización puede desorientarles. Si se utiliza una actualización o redirección, el atributo content del elemento <meta> debe ser 0 o superior a 72000 (20 horas).",
        "tip": "No utilices refrescos retardados ni redirecciones ni ofrezcas una funcionalidad para que el usuario ajuste el temporizador."
    },
    "EA-R80": {
        "content": "El elemento <meta> tiene retardo de actualización (AAA)",
        "explanation": "Esta regla comprueba que el elemento <meta> no se utiliza para una redirección o actualización retardada. Si se utiliza una actualización o redirección, el valor del atributo de contenido del elemento <meta> debe ser 0 sin excepción.",
        "tip": "No utilices refrescos retardados o redirecciones y establece el retardo en 0."
    },
    "EA-R81": {
        "content": "Falta el nombre accesible de la región",
        "explanation": "La función de región se utiliza para identificar las áreas del documento que el autor considera significativas. Cada región necesita un nombre accesible para que los usuarios de lectores de pantalla puedan identificar su contenido y propósito.",
        "tip": "Añade un nombre accesible a la región utilizando atributos aria."
    },
    "EA-R82": {
        "content": "El elemento tiene un rol inválido",
        "explanation": "Esta regla comprueba que cada atributo de rol tenga un valor válido según las especificaciones <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles\">WAI-ARIA</a>. También se comprueban los roles obsoletos.",
        "tip": "Compruebe si hay errores ortográficos en el atributo de rol y si el rol existe en la especificación."
    },
    "EA-R83": {
        "content": "El elemento desplazable no es accesible desde el teclado",
        "explanation": "Esta regla comprueba que los elementos desplazables se puedan desplazar mediante el teclado. Para asegurarse de que hay algún elemento desde el que se pueden utilizar las teclas de flecha para controlar la posición de desplazamiento, el foco debe estar sobre o en una región desplazable.",
        "tip": "Asegúrese de que cada elemento desplazable o uno de sus elementos hijos es enfocable."
    },
    "EA-R84": {
        "content": "La etiqueta visible no forma parte del nombre accesible",
        "explanation": "Esta regla comprueba que elementos interactivos como botones o enlaces tengan su etiqueta visible completa como parte de su nombre accesible, por ejemplo, cuando se utiliza aria-label. Esto es especialmente importante para los usuarios que utilizan la voz para controlar el sitio web. De lo contrario, la voz no se interpretará correctamente y podría no funcionar. El contexto adicional que no forma parte del nombre visible puede añadirse utilizando aria-describedby.",
        "tip": "Asegúrese de que toda la etiqueta visible (no sólo una parte) se incluye en el nombre accesible (establecido con, por ejemplo, aria-label)."
    },
    "EA-R85": {
        "content": "Contraste de texto insuficiente (mejorado)",
        "explanation": "Se trata de una mejora de la regla del contraste mínimo. Asegúrese de que todos los elementos de texto tengan suficiente contraste de color entre el texto en primer plano y el color de fondo detrás de él. El contraste mínimo mejorado depende del tamaño del texto y es de 7:1 o de 4,5:1 para textos más grandes.",
        "tip": "Aumente el contraste, por ejemplo, con una fuente o un color de fondo más oscuro/claro. La ayuda la proporciona el <a target=\"_blank\" href=\"https://dashboard.eye-able.com/tools/contrast-check\">comprobador de contraste de Eye-Able</a> en el Panel de control, en Herramientas."
    },
    "EA-R86": {
        "content": "ARIA Meter-element falta nombre accesible",
        "explanation": "Un contador es una visualización gráfica de un valor numérico dentro de un rango definido. Un elemento con la función \"medidor\" debe tener un nombre accesible para que los usuarios de lectores de pantalla puedan identificar su contenido y finalidad.",
        "tip": "Añade un nombre accesible al medidor mediante un atributo title, aria-label o aria-labelledby."
    },
    "EA-R87": {
        "content": "ARIA Progressbar falta el nombre accesible",
        "explanation": "Una barra de progreso indica el estado de avance de las tareas que llevan mucho tiempo. Un elemento con la función \"barra de progreso\" debe tener un nombre accesible para que los usuarios de lectores de pantalla puedan identificar su contenido y finalidad.",
        "tip": "Añade un nombre accesible a la barra de progreso mediante un atributo title, aria-label o aria-labelledby."
    },
    "EA-R88": {
        "content": "Falta el equivalente aria-braille",
        "explanation": "Esta comprobación garantiza que existe un equivalente no braille para los contenidos aria-braillelabel y aria-brailleroledescription. Cuando se utilizan sin una etiqueta o descripción de función correspondiente, ARIA dice que se ignoren estos atributos.",
        "tip": "Asegúrese de proporcionar un equivalente no braille para los atributos aria mencionados. Podría ser un atributo aria-label o aria-roledescription."
    },
    "EA-R89": {
        "content": "Botón, enlace o elemento de menú ARIA sin nombre accesible",
        "explanation": "Es fundamental que todos los botones ARIA (role=\"button\"), enlaces (role=\"link\") y elementos de menú (role=\"menuitem\") tengan un nombre legible para las tecnologías de asistencia.",
        "tip": "Asegúrese de que cada botón, enlace o elemento de menú ARIA tenga un nombre descriptivo y accesible. Puede utilizar un texto interior o un atributo aria-label o aria-labelledby no vacío."
    },
    "EA-R90": {
        "content": "Faltan atributos necesarios para la función",
        "explanation": "Esta regla comprueba que los elementos que tienen un rol explícito también especifican todos los estados y propiedades requeridos para ese rol. El estado del elemento no se comunica a los usuarios de lectores de pantalla si se omite un atributo requerido.",
        "tip": "Añada los atributos ARIA necesarios que faltan. Para obtener más información sobre los atributos necesarios, consulte <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#states_and_properties\">Especificación ARIA</a>."
    },
    "EA-R91": {
        "content": "ARIA tooltip falta nombre accesible",
        "explanation": "Cada elemento ARIA tooltip (role=\"tooltip\") debe tener un nombre accesible que describa su propósito o función para los usuarios de tecnologías de apoyo.",
        "tip": "Asegúrese de que cada información sobre herramientas ARIA tenga un nombre claro y descriptivo. Para ello puede utilizarse un texto interior visible o atributos como aria-label y aria-labelledby."
    },
    "EA-R92": {
        "content": "El elemento <blink> está obsoleto",
        "explanation": "El elemento <blink> hace que cualquier texto dentro del elemento parpadee a una velocidad predeterminada. Esto no puede ser interrumpido por el usuario, ni puede ser desactivado como preferencia. Por lo tanto, el contenido que utiliza el parpadeo no cumple el Criterio de Éxito porque el parpadeo puede continuar durante más de tres segundos.",
        "tip": "Elimine cualquier elemento <blink> de su página web."
    },
    "EA-R93": {
        "content": "La falta de páginas permite eludir los bloques repetidos",
        "explanation": "Proporcionar formas de saltarse contenido repetitivo ayuda a los usuarios a navegar por el sitio de forma más eficaz. Esta regla falla si la página no tiene ni un enlace de salto interno, ni un encabezado, ni una región de referencia.",
        "tip": "Utilizar <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/\">elementos de referencia adecuados</a> como &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;, <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">encabezados</a> o <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">enlaces de salto interno</a> puede ayudar a los usuarios a navegar por el sitio con mayor eficacia."
    },
    "EA-R94": {
        "content": "Estructura incorrecta del elemento <dl>",
        "explanation": "Una lista de definiciones (<dl>) encierra una lista de grupos de términos (mediante elementos <dt>) y descripciones (mediante elementos <dd>) para, por ejemplo, mostrar un glosario. Una lista de definiciones sólo puede contener elementos <dt>, <dd>, <template>, <script> o <div> en el orden correcto.",
        "tip": "Compruebe que su lista de definiciones contiene sólo elementos <dt>, <div> y <dd>. Además, asegúrese de que están ordenados correctamente, <dt> siempre debe preceder a los elementos <dd>."
    },
    "EA-R95": {
        "content": "Los elementos <dt> o <dd> no contienen <dl>.",
        "explanation": "El término de descripción <dt> y los detalles de descripción <dd> deben ir siempre acompañados de un elemento de lista de definiciones <dl> o la lista de definiciones no será válida. De lo contrario, las tecnologías de asistencia podrían no reconocer correctamente la lista de definiciones.",
        "tip": "Asegúrese de que el elemento padre de <dt> o <dd> es una lista de definición <dl> o un <div> que es hijo de un <dl>."
    },
    "EA-R96": {
        "content": "El campo del formulario tiene varias etiquetas",
        "explanation": "Cada campo de formulario debe tener sólo una <label> asociada. De lo contrario, se producen incoherencias en la forma en que las distintas tecnologías de asistencia y combinaciones de navegadores interpretan la etiqueta. Las etiquetas se conectan a los campos de formulario mediante el atributo for de <label> y el atributo id del campo de formulario.",
        "tip": "Asegúrese de que cada campo de formulario tiene sólo una <label> asociada. Utilice el id del campo de formulario para buscar etiquetas conectadas."
    },
    "EA-R98": {
        "content": "El valor del atributo ARIA ID debe ser único",
        "explanation": "Un ID es un identificador único para los elementos de la página web y, por tanto, no debe duplicarse. Esto es especialmente importante con los elementos ARIA, ya que el id se utiliza para adjuntar nombres o descripciones accesibles. Los ID duplicados son errores de validación comunes que pueden romper la accesibilidad de las etiquetas.",
        "tip": "Cambie el nombre del ID para que sólo se utilice una vez en la página. Asegúrese de que los elementos ARIA siguen siendo válidos."
    },
    "EA-R99": {
        "content": "Las listas sólo deben contener elementos <li",
        "explanation": "Las listas (<ul> o <ol>) deben estar correctamente estructuradas para ser legibles y anunciadas correctamente por la tecnología de asistencia. Una lista sólo debe contener <li>, <script> o <template> como nodos hijos directos. Los propios elementos de la lista pueden contener otros elementos.",
        "tip": "Asegúrese de que su nodo de lista (<ul> o <ol>) sólo tiene elementos de lista (<li>) como nodos hijos directos."
    },
    "EA-R101": {
        "content": "Evitar el uso de elementos <marquee",
        "explanation": "El elemento <marquee> crea texto desplazable que es difícil de leer y de pulsar. El elemento <marquee> está obsoleto y puede causar problemas de accesibilidad y usabilidad, sobre todo porque es difícil de pausar.",
        "tip": "Sustituya los elementos <marquee> por animaciones CSS modernas u otras técnicas."
    },
    "EA-R102": {
        "content": "Evitar el uso de mapas de imagen en el servidor",
        "explanation": "Los mapas de imágenes del servidor no son accesibles para los usuarios con teclado, que deben utilizar clics del ratón para acceder al contenido vinculado. Esto hace que la imagen sea inaccesible para quienes navegan únicamente con el teclado. Además, no se pueden ofrecer alternativas de texto para las zonas interactivas de un mapa de imagen del servidor, como sí se puede hacer con los mapas de imagen del cliente.",
        "tip": "Utilice mapas de imágenes del lado del cliente u otros elementos interactivos para mejorar la accesibilidad."
    },
    "EA-R104": {
        "content": "El objetivo táctil es demasiado pequeño",
        "explanation": "Los objetivos táctiles deben tener un tamaño y una separación suficientes para que puedan activarse fácilmente sin activar involuntariamente un objetivo adyacente. Los objetivos táctiles deben tener un tamaño mínimo de 24 x 24 píxeles CSS o una distancia de 24px hasta el siguiente objetivo. Los objetivos táctiles grandes ayudan a evitar errores del usuario y garantizan una mejor experiencia para los usuarios móviles. Esta regla depende del tamaño de la ventana gráfica y de la posición de desplazamiento.",
        "tip": "Asegúrate de que tu objetivo táctil tiene un tamaño mínimo de 24 x 24 píxeles CSS o una distancia de 24px hasta el siguiente objetivo. Existe una excepción si hay otro control que pueda proporcionar la funcionalidad subyacente que cumpla el tamaño mínimo."
    },
    "EA-R105": {
        "content": "Garantizar valores adecuados para el atributo de función",
        "explanation": "Unos valores de rol inadecuados pueden confundir a los usuarios de tecnologías de apoyo o hacer que se ignoren elementos.",
        "tip": "Valida que el atributo role tiene un valor adecuado para el elemento dado."
    },
    "EA-R106": {
        "content": "Falta un nombre accesible en el diálogo ARIA",
        "explanation": "Los usuarios de lectores de pantalla no pueden comprender la finalidad de los diálogos ARIA (elementos con role=\"dialog\" o role=\"alertdialog\") que no tienen un nombre accesible. Un nombre accesible proporciona contexto al diálogo, lo que permite a los usuarios de lectores de pantalla comprender su propósito y función.",
        "tip": "Asegúrese de que el diálogo ARIA tiene un nombre accesible. Utilice para ello los atributos aria-label o aria-labelledby."
    },
    "EA-R107": {
        "content": "Garantizar el uso correcto de role=\"text\"",
        "explanation": "El role=\"text\" debe utilizarse en elementos sin descendientes enfocables para evitar problemas de navegación a los usuarios de lectores de pantalla.",
        "tip": "Utilice role=\"text\" para elementos sin elementos hijos enfocables."
    },
    "EA-R108": {
        "content": "ARIA treeitem falta nombre accesible",
        "explanation": "Un árbol (role=\"tree\") es una lista jerárquica con nodos padre e hijo que puede expandirse y colapsarse. Un elemento de árbol (role=\"treeitem\") es un nodo de un árbol. Sin un nombre accesible, los lectores de pantalla no pueden determinar el propósito del elemento de árbol.",
        "tip": "Asigne un nombre descriptivo al treeitem utilizando un texto interno, un aria-label o un aria-labelledby."
    },
    "EA-R110": {
        "content": "Elemento de formulario sin etiqueta visible",
        "explanation": "Las etiquetas visibles mejoran la accesibilidad de los formularios al proporcionar un contexto claro para los usuarios videntes. Confiar únicamente en las etiquetas ocultas, el título o aria-describedby puede ser limitante. Los atributos title y aria-describedby proporcionan información adicional, como sugerencias. Dado que las sugerencias se presentan de forma diferente a las etiquetas para las API de accesibilidad, esto puede causar problemas con las tecnologías de asistencia.",
        "tip": "Proporcione una etiqueta visible y clara. Lo ideal es utilizar un elemento <label>. Si no es posible, también se puede utilizar aria-label o aria-labelledby."
    },
    "EA-R111": {
        "content": "El banner no está en el nivel superior",
        "explanation": "Con <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marcas</a>, los usuarios ciegos que utilicen un lector de pantalla tienen la posibilidad de saltar a las secciones de una página web. El rol banner (role=\"banner\") sirve para definir un encabezado global del sitio, por ejemplo, una función de búsqueda, la navegación global o un eslogan. Si el hito banner no es un hito de nivel superior (y está contenido dentro de otro hito), no define efectivamente la parte de cabecera predeterminada del diseño.",
        "tip": "Asegúrese de que cada hito de la pancarta no esté contenido dentro de otro hito."
    },
    "EA-R112": {
        "content": "El hito complementario no está al máximo nivel",
        "explanation": "Con <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marcas</a>, los usuarios ciegos que utilicen un lector de pantalla tienen la posibilidad de saltar a secciones de una página web. El contenido complementario como &lt;aside&gt; o role=\"complementary\" complementa el contenido principal de un documento o página. Los usuarios de lectores de pantalla tienen la opción de saltarse el contenido complementario cuando aparece en el nivel superior de la página. Esta opción no está disponible si incrusta un elemento &lt;aside&gt; en otro landmark.",
        "tip": "Asegúrese de que cada punto de referencia complementario (&lt;aside&gt; o role=\"complementary\") no esté contenido dentro de otro punto de referencia."
    },
    "EA-R113": {
        "content": "El punto de referencia Contentinfo no está en el nivel superior",
        "explanation": "Con <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">pie de página</a>, los usuarios ciegos que utilicen un lector de pantalla tienen la posibilidad de saltar a las secciones de una página web. La función contentinfo (role=\"contentinfo\") define un pie de página que contiene información sobre derechos de autor, enlaces de navegación y declaraciones de privacidad. Colocarlo dentro de otro hito puede impedir que los usuarios ciegos de lectores de pantalla encuentren rápidamente el pie de página y naveguen hasta él.",
        "tip": "Asegúrese de que el punto de referencia contentinfo (role=\"contentinfo\") no está contenido en otro punto de referencia."
    },
    "EA-R114": {
        "content": "El hito principal no está en el nivel superior",
        "explanation": "Con <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">hitos</a>, los usuarios ciegos que utilizan un lector de pantalla tienen la posibilidad de saltar a secciones de una página web. El hito principal (&lt;main role=\"main\"&gt;) se utiliza para indicar el contenido principal de un documento. Es una buena práctica asegurarse de que el hito principal no está contenido dentro de otro hito.",
        "tip": "Asegúrese de que el hito principal (&lt;main role=\"main\"&gt;) no está contenido dentro de otro hito."
    },
    "EA-R115": {
        "content": "Existe más de un banner de referencia",
        "explanation": "Con <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marcadores</a>, los usuarios ciegos que utilizan un lector de pantalla tienen la posibilidad de saltar a secciones de una página web. Tener varios puntos de referencia en el banner puede confundir la navegación del lector de pantalla, haciendo más difícil discernir el encabezado principal o el contenido introductorio.",
        "tip": "Asegúrese de que cada página HTML sólo tiene un banner de referencia. Decida qué banner de referencia desea conservar y elimine todos los demás banners de referencia."
    },
    "EA-R116": {
        "content": "Existe más de un punto de referencia contentinfo",
        "explanation": "Con <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, los usuarios ciegos que utilicen un lector de pantalla tienen la posibilidad de saltar a secciones de una página web. Varios puntos de referencia contentinfo (role=\"contentinfo\") pueden confundir a los usuarios de tecnología de asistencia al sugerir varias regiones de pie de página.",
        "tip": "Asegúrese de que cada página HTML tiene sólo un punto de referencia contentinfo. Decida qué hito contentinfo desea conservar y elimine todos los demás hitos."
    },
    "EA-R117": {
        "content": "Existe más de un hito principal",
        "explanation": "Con <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">hitos</a>, los usuarios ciegos que utilizan un lector de pantalla tienen la posibilidad de saltar a secciones de una página web. El hito principal (&lt;main role=\"main\"&gt;) se utiliza para indicar el contenido principal de un documento. La existencia de varios hitos principales puede dificultar a los usuarios la identificación del área de contenido principal.",
        "tip": "Limite su página a un hito principal (&lt;main role=\"main\"&gt;) para indicar claramente el contenido principal. Elimine los puntos de referencia principales duplicados."
    },
    "EA-R118": {
        "content": "Falta el hito principal",
        "explanation": "Con <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marcas</a>, los usuarios ciegos que utilizan un lector de pantalla tienen la posibilidad de saltar a secciones de una página web. El contenido fuera de estas secciones es difícil de encontrar y su propósito puede no estar claro. Un hito principal (&lt;main role=\"main\"&gt;) ofrece a los usuarios de tecnologías de apoyo una forma rápida de navegar hasta el contenido principal.",
        "tip": "Añada un hito principal (<main>) a su sitio web e incluya en él el contenido principal de su página."
    },
    "EA-R119": {
        "content": "Landmark no es único",
        "explanation": "Los puntos de referencia únicos ayudan a los usuarios a distinguir entre distintas secciones de contenido. Los puntos de referencia duplicados pueden confundir a los usuarios y dificultar la navegación hacia el contenido deseado. Algunos puntos de referencia, como <header> o <footer>, solo pueden existir una vez por página, mientras que otros, como <nav> o <section>, deben tener nombres accesibles únicos (por ejemplo, de aria-label o aria-labelledby).",
        "tip": "Asegúrese de que el punto de referencia tiene una función única o una combinación de función/etiqueta/título. Por ejemplo, cambia la etiqueta para que la región sea única."
    },
    "EA-R120": {
        "content": "El atributo Scope de la tabla es incorrecto",
        "explanation": "El atributo scope en las tablas ayuda a los usuarios de tecnologías de apoyo a comprender la relación entre los encabezados y las celdas de datos. El atributo scope solo puede utilizarse en los encabezados de tabla <th> y debe tener el valor \"col\" o \"row\".",
        "tip": "Asegúrate de que el atributo scope sólo se utiliza en los encabezados de tabla <th> y que el valor es \"col\" o \"row\"."
    },
    "EA-R121": {
        "content": "Falta un enlace de salto en la página",
        "explanation": "Los enlaces de salto ofrecen un enlace en la parte superior de la página que, al activarse, salta al principio de la zona de contenido principal. De lo contrario, los usuarios de teclados y lectores de pantalla deben navegar por una larga lista de enlaces de navegación y otros elementos antes de llegar al contenido principal. Un enlace de salto típico es \"saltar al contenido\" mediante un enlace con anclaje (por ejemplo, #main-content). Se recomienda que el enlace esté oculto hasta que el usuario navegue hasta él con un teclado.",
        "tip": "Añada un enlace de salto al contenido principal de la página. Si ya tienes un enlace de salto, asegúrate de que se puede acceder a él con el teclado."
    },
    "EA-R122": {
        "content": "Asegúrese de que los valores de tabindex son 0 o negativos",
        "explanation": "Utilizar valores de tabindex superiores a 0 puede alterar el orden natural de tabulación y causar dificultades de navegación a los usuarios de teclados y tecnologías de asistencia.",
        "tip": "Establezca los valores de tabindex en 0 o déjelos sin establecer para un orden de tabulación natural. Utilice valores negativos para los elementos enfocables mediante programación."
    },
    "EA-R123": {
        "content": "La tabla tiene el mismo título y resumen",
        "explanation": "Tener el mismo texto en el elemento <caption> de una tabla y en su atributo summary es redundante y puede resultar confuso. El elemento <caption> se utiliza como título en pantalla, mientras que el atributo summary es utilizado por los lectores de pantalla para acceder a un resumen del propósito de la tabla.",
        "tip": "Asegúrate de que el texto <caption> es diferente del atributo summary de la tabla para evitar confusiones."
    },
    "EA-R124": {
        "content": "Enlaces idénticos con objetivos diferentes",
        "explanation": "Los enlaces con el mismo nombre accesible deben tener la misma funcionalidad/destino para evitar confusiones. La descripción del enlace permite al usuario distinguir cada enlace de los enlaces de la página web que conducen a otros destinos y le ayuda a decidir si sigue el enlace.",
        "tip": "Evite tener enlaces con descripciones idénticas (por ejemplo, de texto interior, atributos alt o aria) que dirijan a URL diferentes. Proporcione un texto de enlace que describa la finalidad y el objetivo del enlace."
    },
    "EA-R125": {
        "content": "Compruebe que el idioma de la página es correcto",
        "explanation": "El idioma no se adapta a todos los elementos de la página. Esto se debe a que estos elementos se distinguen por su propio idioma. Andernfalls ist beispielsweise die Aussprache einer Sprachausgabe inkorrekt.",
        "tip": "Asegúrese de que todas las demás imágenes de la página tienen los atributos lingüísticos adecuados."
    }
};