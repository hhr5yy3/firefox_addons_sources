const ea_rules_fr = {
    "EA-R1": {
        "content": "Syntaxe SVG incorrecte",
        "explanation": "La syntaxe de l'élément SVG n'est pas correcte. Il manque l'attribut role-attribute ou l'élément title/desc.",
        "tip": "Vérifier le rôle du SVG ou l'élément title/desc."
    },
    "EA-R2": {
        "content": "<svg> texte accessible manquant",
        "explanation": "Les éléments <svg> ayant le rôle \"img\" ont besoin d'un nom accessible pour que les utilisateurs de lecteurs d'écran puissent comprendre leur contenu et leur fonction.",
        "tip": "Créer un attribut title, un élément title/desc ou des attributs aria pour le <svg>."
    },
    "EA-R3": {
        "content": "Le texte alternatif <svg>est très court (<5 caractères)",
        "explanation": "Le texte accessible du SVG est très court (<5 caractères) et peut ne pas décrire suffisamment le graphique.",
        "tip": "Vérifiez si le texte accessible décrit suffisamment le SVG."
    },
    "EA-R4": {
        "content": "Le texte alternatif <svg>est très long (>150 caractères)",
        "explanation": "Le texte alternatif SVG est très long (>150 caractères) et peut potentiellement être résumé. De nombreuses personnes aveugles lisent des textes à l'aide d'un afficheur braille. Un afficheur braille peut produire au moins 40 caractères, mais seulement un maximum de 80 caractères.",
        "tip": "Résumez la description à l'essentiel."
    },
    "EA-R5": {
        "content": "<svg> accessible est un peu long (>80 caractères)",
        "explanation": "Le texte alternatif SVG est quelque peu long (>80 caractères) et peut potentiellement être résumé. De nombreux aveugles lisent des textes à l'aide d'un afficheur braille. Un afficheur braille peut produire au moins 40 caractères, mais seulement un maximum de 80 caractères.",
        "tip": "Résumez la description à l'essentiel."
    },
    "EA-R6": {
        "content": "Image sans texte alternatif",
        "explanation": "Les images (<img> ou role=\"img\") doivent être accompagnées d'un texte alternatif afin que les utilisateurs de lecteurs d'écran puissent comprendre le contenu et l'objectif de l'image. L'attribut title n'est pas toujours reconnu de manière fiable.",
        "tip": "Ajoutez un texte alternatif significatif à l'aide des attributs alt-, aria-label- ou aria-labelledby-. Un attribut alt vide peut être utilisé pour les images décoratives."
    },
    "EA-R7": {
        "content": "Texte alternatif redondant dans le lien qui l'entoure",
        "explanation": "L'image a le même texte alternatif que le lien qui l'entoure. Il est inutile de répéter le texte alternatif d'un lien ou d'une image dans le texte adjacent, car cela peut perturber les utilisateurs de lecteurs d'écran qui le lisent deux fois.",
        "tip": "Supprimez le texte alt de l'image car il ne contient aucune information supplémentaire. Utilisez plutôt un attribut alt vide, alt=\"\", pour l'image."
    },
    "EA-R8": {
        "content": "Texte alternatif manquant dans l'image liée",
        "explanation": "Étant donné que le lien lui-même ne contient pas de texte, l'image doit être accompagnée d'un texte alternatif afin que les lecteurs d'écran puissent identifier le contenu et l'objectif du lien. Un attribut title n'est pas suffisant pour tous les lecteurs d'écran.",
        "tip": "Ajoutez un texte alternatif significatif pour le lien ou l'image liée."
    },
    "EA-R9": {
        "content": "Le texte alternatif de l'image est très court (<5 caractères)",
        "explanation": "Le texte alternatif d'une image doit décrire son contenu de manière significative.",
        "tip": "Vérifiez que le texte alternatif décrit correctement l'image."
    },
    "EA-R10": {
        "content": "Le texte alternatif de l'image est très long (>150 caractères)",
        "explanation": "Le texte alternatif de cette image est très long (>150 caractères) et peut éventuellement être résumé. De nombreuses personnes aveugles lisent des textes à l'aide d'un afficheur braille. Un afficheur braille peut produire au moins 40 caractères, mais seulement un maximum de 80 caractères.",
        "tip": "Résumez la description à l'essentiel."
    },
    "EA-R11": {
        "content": "Le texte alternatif de l'image est un peu long (>80 caractères)",
        "explanation": "Le texte alternatif est un peu long (>80 caractères) et peut éventuellement être résumé. De nombreux aveugles lisent des textes à l'aide d'un afficheur braille. Un afficheur braille peut produire au moins 40 caractères, mais seulement un maximum de 80 caractères.",
        "tip": "Résumez la description à l'essentiel."
    },
    "EA-R12": {
        "content": "Les liens doivent avoir un texte accessible",
        "explanation": "Les liens nécessitent un texte compréhensible et correctement restitué par les lecteurs d'écran. Le texte du lien doit expliquer clairement les informations que le lecteur obtiendra en cliquant sur ce lien.",
        "tip": "Ajoutez un texte de lien significatif en utilisant un texte intérieur ou des attributs ARIA qui décrivent l'objet et la cible du lien. Le texte du lien ne doit pas non plus être caché aux lecteurs d'écran (par exemple avec display : none ou aria-hidden=\"true\")."
    },
    "EA-R13": {
        "content": "Lien vide",
        "explanation": "Ce lien n'a pas de contenu ni de cible (href-attribute).",
        "tip": "Supprimer les liens vides."
    },
    "EA-R14": {
        "content": "Le texte accessible par un lien est une URL",
        "explanation": "Les textes des liens doivent être significatifs et décrire l'objet et la cible du lien. Les utilisateurs de lecteurs d'écran doivent pouvoir décider facilement s'ils veulent suivre un lien.",
        "tip": "Veillez à utiliser des descriptions qui décrivent l'objectif et la cible du lien. Le texte du lien ne doit pas non plus être caché aux lecteurs d'écran (par exemple avec display : none ou aria-hidden=\"true\")."
    },
    "EA-R15": {
        "content": "Le texte du lien est très long (>150 caractères)",
        "explanation": "Le texte accessible de ce lien est très long (>150 caractères) et peut potentiellement être résumé. De nombreuses personnes aveugles lisent des textes à l'aide d'un afficheur braille. Un afficheur braille peut produire au moins 40 caractères, mais seulement 80 caractères au maximum.",
        "tip": "Veillez à utiliser des textes significatifs et compacts."
    },
    "EA-R16": {
        "content": "<objet> nom accessible manquant",
        "explanation": "Les éléments <object> peuvent contenir du contenu multimédia (audio, vidéo, etc.) et doivent avoir un nom accessible aux lecteurs d'écran. Les utilisateurs de lecteurs d'écran ne peuvent pas connaître le contenu de l'objet sans une alternative textuelle.",
        "tip": "Ajoutez un nom accessible à l'<objet> en utilisant un titre ou des attributs aria tels que aria-label et aria-labelledby."
    },
    "EA-R17": {
        "content": "Audio détecté",
        "explanation": "Vérifiez si l'information est transmise dans l'audio (par exemple, par une voix de commentaire). Si c'est le cas, une transcription est nécessaire.",
        "tip": "Vérifiez si une transcription est nécessaire pour le fichier audio. Si c'est le cas, proposez une alternative, par exemple une transcription textuelle."
    },
    "EA-R18": {
        "content": "Vidéo détectée",
        "explanation": "Vérifiez si la vidéo nécessite un média alternatif ou un sous-titrage. Si une vidéo n'est pas sous-titrée, les utilisateurs sourds n'auront qu'un accès limité, voire aucun accès, aux informations qu'elle contient. De même, les fichiers vidéo muets (sans voix) ne sont pas disponibles pour les utilisateurs aveugles. Ils ont également besoin d'une alternative média complète (texte, piste audio alternative ou fichier audio).",
        "tip": "Vérifiez si une alternative médiatique ou un sous-titrage est nécessaire avec la vidéo et fournissez-le si nécessaire."
    },
    "EA-R19": {
        "content": "Plusieurs titres H1 détectés",
        "explanation": "La structure des titres de la page doit être logique et, si possible, commencer par le titre H1. Le titre H1 identifie les parties les plus importantes de la page.",
        "tip": "Si possible, n'utilisez qu'un seul titre H1. Structurez les autres rubriques avec des titres H2, H3, etc."
    },
    "EA-R20": {
        "content": "Titre H1 manquant",
        "explanation": "Soit il n'y a pas de titre H1, soit il est caché aux lecteurs d'écran. Vérifiez si le titre H1 existe et s'il est visible, car il constitue le premier et le plus important élément de la structure des titres (h1-h6). L'élément <h1> doit se trouver au début du contenu principal, ce qui permet aux utilisateurs de lecteurs d'écran de naviguer directement vers le contenu principal à l'aide de raccourcis clavier.",
        "tip": "Si possible, créez toujours un titre <h1> visible qui décrit le contenu de la page."
    },
    "EA-R21": {
        "content": "Sauter dans l'ordre de l'intitulé",
        "explanation": "La structure des titres de la page doit être organisée de manière logique et les niveaux de titres ne doivent augmenter que d'une unité. Évitez les sauts, par exemple de H2 à H4.",
        "tip": "Essayez de ne pas sauter dans l'ordre des rubriques."
    },
    "EA-R22": {
        "content": "Un élément de liste <li> ne fait pas partie d'une liste",
        "explanation": "Une liste valide doit toujours être encadrée par un élément <ul> ou <ol>. Dans le cas contraire, les éléments de la liste ne seront pas correctement détectés comme une liste par le lecteur d'écran. Faites attention aux rôles possibles des éléments parents <ul> ou <ol> par le biais de l'attribut role.",
        "tip": "Construisez une liste correcte avec un élément parent <ul> ou <ol>. Si vous avez déjà défini un élément <ul> ou <ol>, faites attention aux rôles possibles grâce à l'attribut role."
    },
    "EA-R23": {
        "content": "Contraste insuffisant du texte",
        "explanation": "Veillez à ce que tous les éléments textuels présentent un contraste de couleur suffisant entre le texte au premier plan et la couleur d'arrière-plan. Le contraste minimum dépend de la taille du texte et est de 3:1 ou 4,5:1 pour les textes de grande taille (>18pt).",
        "tip": "Augmentez le contraste, par exemple en utilisant une police ou une couleur de fond plus foncée/plus claire."
    },
    "EA-R24": {
        "content": "Contraste SVG insuffisant",
        "explanation": "La représentation visuelle des SVG doit maintenir un rapport de contraste minimum de 3:1 pour qu'ils soient bien perçus.",
        "tip": "Augmenter le contraste du SVG."
    },
    "EA-R25": {
        "content": "Vérifier le contraste manuellement",
        "explanation": "Un contraste très faible a été détecté. Cela indique parfois l'utilisation d'images d'arrière-plan ou de dégradés. Veuillez vérifier le contraste manuellement.",
        "tip": "Augmentez le contraste, par exemple avec une police ou une couleur d'arrière-plan plus foncée/plus claire. Veillez à ce que le texte sur les images d'arrière-plan présente un contraste suffisant de 4,5:1 pour les textes de petite taille et de 3:1 pour les textes de grande taille."
    },
    "EA-R26": {
        "content": "La page n'a pas de titre",
        "explanation": "Le titre de la page est important pour décrire le sujet ou l'objectif de la page. Il permet aux visiteurs de votre site web de classer ou de trouver rapidement votre contenu.",
        "tip": "Ajoutez un élément <title> descriptif à la page."
    },
    "EA-R27": {
        "content": "Le titre de la page est très court",
        "explanation": "Le titre de la page est important pour décrire le sujet ou l'objectif de la page. Il permet aux visiteurs de votre site web de classer ou de trouver rapidement votre contenu.",
        "tip": "Vérifiez que le titre décrit correctement la page."
    },
    "EA-R28": {
        "content": "<iframe> n'a pas de nom accessible",
        "explanation": "Le nom accessible d'une <iframe> est important pour décrire son sujet ou son objectif. Les utilisateurs de lecteurs d'écran peuvent accéder à une liste de titres pour tous les cadres d'une page. Toutefois, la navigation dans les éléments <frame> et <iframe> peut s'avérer difficile et déroutante si le balisage ne comporte pas d'attribut title, en particulier pour les utilisateurs handicapés.",
        "tip": "Ajoutez un attribut de titre descriptif à la <iframe>. Vous pouvez également ajouter un attribut aria comme aria-label ou aria-labelledby."
    },
    "EA-R29": {
        "content": "Langue du site web manquante",
        "explanation": "Pour que la sortie vocale des lecteurs d'écran ou du navigateur fonctionne correctement, la langue de la page doit être spécifiée. Les lecteurs d'écran utilisent différentes bibliothèques de sons pour différentes langues, en fonction de la prononciation et des caractéristiques de cette langue. Il est important de spécifier une langue et de s'assurer qu'elle est valide afin que le texte du site web soit prononcé correctement.",
        "tip": "Ajoutez l'attribut lang-attribute à l'élément HTML de votre page."
    },
    "EA-R30": {
        "content": "Langue de la page incorrecte",
        "explanation": "Pour que la synthèse vocale des lecteurs d'écran ou du navigateur fonctionne correctement, la langue de la page doit être spécifiée correctement. Dans le cas contraire, la prononciation d'une sortie vocale est par exemple incorrecte.",
        "tip": "Vérifiez que la langue de l'élément HTML correspond à la langue de la page."
    },
    "EA-R31": {
        "content": "Abréviation détecté",
        "explanation": "Les abréviations ne sont pas toujours compréhensibles pour tout le monde et doivent être expliquées dans le texte ou au moyen d'éléments HTML tels que <abbr>.",
        "tip": "Vérifiez si l'abréviation est déjà étiquetée. Si ce n'est pas le cas, ajoutez le texte complet ou utilisez des éléments HTML spéciaux tels que <abbr>."
    },
    "EA-R32": {
        "content": "La valeur de l'attribut ID doit être unique",
        "explanation": "Un identifiant est un identifiant unique pour les éléments de la page web et ne doit donc pas être dupliqué. Le fait d'avoir des identifiants en double peut conduire les lecteurs d'écran à ignorer certains éléments. À partir de 2023, il ne s'agit plus d'une exigence des WCAG, à moins que cela ne conduise à l'échec d'un autre critère des WCAG.",
        "tip": "Renommez l'identifiant pour qu'il ne soit utilisé qu'une seule fois sur la page."
    },
    "EA-R33": {
        "content": "Le nom accessible du bouton de l'image manque",
        "explanation": "Une entrée graphique (<input type=\"image\">) nécessite un texte alternatif pour que les lecteurs d'écran puissent refléter son objectif.",
        "tip": "Ajoutez un attribut alt ou ARIA significatif (aria-label ou aria-labelledby) qui décrit le contenu et l'objectif de cette image."
    },
    "EA-R34": {
        "content": "Le bouton de réinitialisation n'est pas recommandé",
        "explanation": "L'utilisation de boutons de réinitialisation n'est pas recommandée, car ils peuvent facilement être cliqués par erreur.",
        "tip": "Retirez le bouton de réinitialisation si possible."
    },
    "EA-R35": {
        "content": "Nom accessible manquant dans un champ de formulaire",
        "explanation": "Un champ de formulaire doit avoir un nom accessible pour que les lecteurs d'écran puissent refléter sa fonction. Il s'agit notamment des éléments <input> et <select> ou des éléments ayant un rôle de \"checkbox\", \"listbox\", \"searchbox\", \"spinbutton\" ou \"textbox\", entre autres.",
        "tip": "Créez un <label> approprié pour les éléments <input> ou <select>. Vous pouvez également utiliser des attributs aria tels que aria-label pour les éléments ayant un rôle. L'étiquette doit décrire l'objectif de ce champ de formulaire. Lorsque vous utilisez un <label>, utilisez un attribut for- qui correspond à l'identifiant unique de l'entrée."
    },
    "EA-R36": {
        "content": "<button> nom accessible manquant",
        "explanation": "Un <button> ou une <input> de type=\"button\" doit avoir un nom accessible pour que les lecteurs d'écran puissent refléter sa fonction.",
        "tip": "Insérez un texte dans le contenu de l'élément button ou utilisez des attributs aria tels que aria-label ou aria-labelledby pour décrire sa fonction."
    },
    "EA-R38": {
        "content": "<area> texte alternatif manquant",
        "explanation": "Les éléments de zone identifient les zones d'une carte-image qui peuvent être utilisées pour définir des zones cliquables. Ils ont donc besoin d'un nom accessible pour que les lecteurs d'écran puissent refléter leur objectif.",
        "tip": "Ajouter un texte alternatif à l'élément area, par exemple via l'attribut alt ou aira-labels."
    },
    "EA-R39": {
        "content": "Le corps est caché dans l'aria",
        "explanation": "L'élément body contient l'attribut aria-hidden : \"true\" et la page n'est donc pas accessible aux lecteurs d'écran.",
        "tip": "Supprime l'attribut aria-hidden de l'élément body."
    },
    "EA-R40": {
        "content": "<select> nom accessible manquant",
        "explanation": "Les éléments <select> doivent avoir un nom accessible afin que les utilisateurs de lecteurs d'écran puissent identifier leur fonction.",
        "tip": "Décrivez l'objectif de la liste de sélection à l'aide d'un élément <label> ou d'attributs aria."
    },
    "EA-R41": {
        "content": "Duplication de l'attribut accesskey",
        "explanation": "L'attribut accesskey peut être utilisé pour spécifier un caractère du clavier sur lequel l'utilisateur peut appuyer pour accéder directement aux éléments. Une affectation en double n'est pas autorisée ici et entraîne un comportement inattendu.",
        "tip": "Modifiez l'attribut de la clé d'accès de manière à ce qu'il soit unique pour la page."
    },
    "EA-R42": {
        "content": "Élément <th> vide",
        "explanation": "L'élément tête de tableau <th> dans un tableau décrit la signification de la colonne correspondante. Sans texte visible, l'objectif de la ligne ou de la colonne n'est pas clair pour les utilisateurs voyants et les utilisateurs de lecteurs d'écran.",
        "tip": "Insérer un contenu textuel visible qui décrit les données de cette colonne."
    },
    "EA-R43": {
        "content": "Les titres ne doivent pas être vides",
        "explanation": "Cette rubrique ne contient pas de texte mais peut être consultée par les lecteurs d'écran.",
        "tip": "Ajoutez un texte à l'en-tête ou supprimez-le."
    },
    "EA-R44": {
        "content": "Nom accessible manquant dans l'en-tête",
        "explanation": "Cette règle vérifie que chaque titre a un nom accessible non vide et qu'il est visible pour les lecteurs d'écran. Les lecteurs d'écran informent les utilisateurs de la présence d'une balise d'en-tête. Si l'en-tête est vide ou si le texte est inaccessible, les utilisateurs risquent d'être désorientés, voire de ne pas pouvoir accéder aux informations relatives à la structure de la page.",
        "tip": "Vérifie si l'en-tête a un contenu. Le contenu peut également être caché en utilisant aria-hidden=\"true\" ou display=\"none\"."
    },
    "EA-R45": {
        "content": "Le paragraphe a une hauteur de ligne insuffisante",
        "explanation": "La hauteur de ligne du paragraphe (<p>) est inférieure à 1,5. Cela peut nuire à la lisibilité du texte.",
        "tip": "Augmenter la hauteur de ligne du paragraphe à au moins 1,5"
    },
    "EA-R46": {
        "content": "!important espacement des lettres dans l'attribut de style",
        "explanation": "Cette règle vérifie que l'attribut de style n'est pas utilisé pour empêcher l'ajustement de l'espacement des lettres en utilisant !important, sauf s'il est au moins 0,12 fois supérieur à la taille de la police. L'utilisation de !important dans les attributs de style empêche l'écrasement de ce style.",
        "tip": "Si possible, n'utilisez pas !important dans l'attribut de style ou veillez à ce que l'espacement des lettres soit au moins égal à 0,12 fois la taille de la police."
    },
    "EA-R47": {
        "content": "!important espacement des mots dans l'attribut de style",
        "explanation": "Cette règle vérifie que l'attribut de style n'est pas utilisé pour empêcher l'ajustement de l'espacement des mots en utilisant !important, sauf s'il est au moins 0,16 fois supérieur à la taille de la police. L'utilisation de !important dans les attributs de style empêche l'écrasement de ce style.",
        "tip": "Si possible, n'utilisez pas !important dans l'attribut de style ou veillez à ce que l'espacement des mots soit au moins égal à 0,16 fois la taille de la police."
    },
    "EA-R48": {
        "content": "!important hauteur de ligne dans l'attribut de style",
        "explanation": "Cette règle vérifie que l'attribut de style n'est pas utilisé pour empêcher l'ajustement de la hauteur des lignes en utilisant !important, sauf s'il est au moins 1,5 fois supérieur à la taille de la police. L'utilisation de !important dans les attributs de style empêche l'écrasement de ce style.",
        "tip": "Si possible, n'utilisez pas !important dans l'attribut de style ou veillez à ce que l'épaisseur des lignes soit au moins égale à 1,5 fois la taille de la police."
    },
    "EA-R49": {
        "content": "L'élément <audio> ou <video> joue automatiquement le son.",
        "explanation": "Les séquences audio ou vidéo diffusées automatiquement ne peuvent pas durer plus de 3 secondes ou nécessiter un mécanisme de contrôle audio pour les arrêter ou les mettre en sourdine.",
        "tip": "Ne jouez pas automatiquement le son ou assurez-vous qu'il existe un mécanisme de contrôle pour l'arrêter ou le mettre en sourdine."
    },
    "EA-R50": {
        "content": "Attribut lang non valide détecté",
        "explanation": "L'attribut lang de l'élément <html> doit être un code de langue valide et conforme à la norme BCP 47, par exemple \"de\" ou \"en-us\".",
        "tip": "Assurez-vous qu'un code de langue valide est défini dans l'attribut lang de l'élément <html>."
    },
    "EA-R51": {
        "content": "Les attributs Lang et xml:lang ne correspondent pas",
        "explanation": "Les attributs lang et xml:lang de l'élément <html> d'une page HTML non incorporée doivent avoir la même sous-étiquette de langue primaire.",
        "tip": "Assurez-vous que les attributs lang et xml:lang de l'élément <html> correspondent."
    },
    "EA-R52": {
        "content": "Éléments <Iframe> avec des noms accessibles identiques",
        "explanation": "Les éléments <iframe> ayant des noms accessibles identiques devraient être évités ou au moins intégrer la même ressource ou des ressources équivalentes. L'utilisation du même nom accessible peut induire en erreur les utilisateurs de lecteurs d'écran.",
        "tip": "Utilisez des attributs de titre uniques pour chaque cadre ou assurez-vous que les éléments <iframe> avec des noms accessibles identiques conduisent à la même ressource."
    },
    "EA-R53": {
        "content": "<iframe> a un tabindex négatif",
        "explanation": "Les éléments <iframe> dont l'attribut tabindex est négatif ne doivent pas contenir d'éléments interactifs. En fixant la valeur de l'attribut tabindex d'un élément <iframe> à -1 ou à un autre nombre négatif, il devient impossible de déplacer le focus dans le contexte de navigation de l'élément <iframe>.",
        "tip": "Supprime l'indice de tabulation négatif si la <iframe> contient des éléments focalisables."
    },
    "EA-R54": {
        "content": "La fenêtre méta empêche le zoom",
        "explanation": "L'utilisation d'éléments <meta name=\"viewport\"> peut limiter la capacité de l'utilisateur à zoomer, en particulier sur les appareils mobiles. Le zoom est un comportement \"autorisé\" courant et attendu sur les pages web mobiles. Le fait de le désactiver nuit donc à l'expérience de l'utilisateur mobile, en particulier pour les utilisateurs malvoyants ou ayant une vision partielle.",
        "tip": "Supprimez les attributs user-scalable et maximum-scale. Sinon, assurez-vous que l'attribut content ne définit pas user-scalable sur \"no\" et que la propriété maximum-scale est au moins égale à 2."
    },
    "EA-R55": {
        "content": "Aucune cellule de données n'est affectée à l'en-tête du tableau",
        "explanation": "Cette règle vérifie que chaque en-tête de tableau <th> est associé à des cellules <td> dans un élément de tableau. Si les tableaux ne sont pas correctement balisés, les lecteurs d'écran risquent d'obtenir des résultats confus ou inexacts.",
        "tip": "Supprimez les cellules d'en-tête de tableau qui n'ont pas de cellules affectées ou affectez des cellules à l'en-tête."
    },
    "EA-R56": {
        "content": "Attribut ARIA non défini",
        "explanation": "Cette règle vérifie que chaque attribut aria-* spécifié est défini dans <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA 1.1</a>. Les attributs aria invalides ou mal orthographiés ne sont pas reconnus par les lecteurs d'écran.",
        "tip": "Vérifiez que l'attribut aria n'est pas mal orthographié et qu'il est spécifié dans le document <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA-specifications</a>. Veillez à n'utiliser que des attributs aria valides."
    },
    "EA-R57": {
        "content": "État ou propriété ARIA non pris en charge",
        "explanation": "Cette règle vérifie que les états ou propriétés <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria/\">WAI-ARIA</a> sont autorisés pour l'élément sur lequel ils sont spécifiés. Les états ou propriétés ARIA doivent être conformes à la spécification officielle, faute de quoi ils risquent d'être ignorés ou interprétés de manière incorrecte par les technologies d'assistance.",
        "tip": "Supprimer les états ou propriétés WAI-ARIA non spécifiés ou les corriger par une valeur autorisée."
    },
    "EA-R58": {
        "content": "État ou valeur de propriété ARIA non valide",
        "explanation": "Cette règle vérifie que la valeur des <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">états ou propriétés ARIA</a> est autorisée pour l'élément sur lequel elle est spécifiée. Les états ou propriétés ARIA doivent être conformes à la spécification officielle, faute de quoi ils ne sont pas accessibles aux utilisateurs de technologies d'assistance.",
        "tip": "Supprimer les valeurs ARIA non spécifiées des états ou des propriétés ou les remplacer par la valeur correcte."
    },
    "EA-R59": {
        "content": "L'attribut de l'autocomplétion n'est pas valide",
        "explanation": "Cette règle s'applique à tout élément HTML <input>, <select> et <textarea> avec une valeur d'attribut autocomplete. L'attribut autocomplete doit avoir une valeur correcte pour être reconnu par le navigateur et les lecteurs d'écran.",
        "tip": "Assurez-vous que <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete\">la valeur de l'autocomplétion</a> est prise en charge."
    },
    "EA-R60": {
        "content": "Aucune cellule d'en-tête n'est affectée aux cellules de données",
        "explanation": "Cette règle vérifie que chaque en-tête de tableau <th> est associé à des cellules <td> dans un élément de tableau.",
        "tip": "Ajoutez une cellule d'en-tête <th> à chaque cellule de données <td> si possible."
    },
    "EA-R61": {
        "content": "La page n'a pas de titre",
        "explanation": "Le document ne contient aucun élément de titre. Les titres ajoutent une structure à un site web et aident les utilisateurs de lecteurs d'écran à naviguer et à comprendre son contenu.",
        "tip": "Vérifiez s'il est possible d'ajouter des titres pour structurer le site web. Veillez à marquer correctement tous les textes d'en-tête en utilisant les balises <h1>-<h6> ou avec role=\"heading\"."
    },
    "EA-R62": {
        "content": "L'élément de présentation a des descendants focalisables",
        "explanation": "Cette règle vérifie que les éléments dont le rôle rend les enfants présentables ne contiennent pas d'éléments focalisables, par exemple un lien, un bouton ou une entrée. Ces éléments sont par exemple <button>, checkbox ou <img>. Les enfants de ces éléments ne sont pas détectés correctement par les technologies d'assistance et créent un taquet de tabulation vide.",
        "tip": "N'ajoutez pas d'éléments focalisables en tant qu'enfants d'éléments ayant un rôle qui rend ses enfants présentables, par exemple un <button> ou un role=\"checkbox\"."
    },
    "EA-R63": {
        "content": "L'élément décoratif est exposé aux technologies d'assistance",
        "explanation": "Cette règle vérifie que les éléments marqués comme décoratifs ne sont pas inclus dans l'arbre d'accessibilité ou qu'ils ont un rôle de présentation. Le fait de marquer un élément comme décoratif le cache aux technologies d'assistance, mais le fait de le rendre focalisable l'expose. Par ailleurs, certains éléments comme <nav> ne peuvent pas avoir un rôle décoratif s'ils possèdent un nom accessible, par exemple par un aria-label. Ce conflit doit être évité.",
        "tip": "Vérifiez si l'élément doit être marqué comme décoratif ou s'il doit être masqué par les technologies d'assistance, par exemple en utilisant aria-hidden=\"true\" ou role=\"presentation\". Dans ce cas, supprimez également tous les attributs aria label."
    },
    "EA-R64": {
        "content": "Conteneur manquant d'enfants requis",
        "explanation": "Certains éléments ayant un rôle sémantique explicite doivent avoir au moins un de leurs éléments propriétaires. Par exemple, un élément ayant le rôle \"list\" doit posséder des éléments ayant le rôle \"listitem\". Si cette condition n'est pas remplie, l'élément lui-même peut devenir invalide.",
        "tip": "Vérifiez si le rôle de l'élément a été utilisé correctement ou assurez-vous d'inclure les nœuds enfants requis."
    },
    "EA-R65": {
        "content": "Élément manquant parent obligatoire",
        "explanation": "Certains éléments ayant un rôle sémantique explicite doivent avoir un élément parent spécifique. Par exemple, un élément ayant le rôle \"listitem\" doit avoir un nœud parent ayant le rôle \"list\". Si cette condition n'est pas remplie, l'élément lui-même n'est pas valide.",
        "tip": "Vérifiez si le rôle de l'élément a été correctement utilisé ou assurez-vous d'utiliser le nœud parent et le rôle requis."
    },
    "EA-R66": {
        "content": "L'élément Aria-hidden a un contenu focalisable",
        "explanation": "En ajoutant aria-hidden=\"true\" à un élément, l'élément lui-même et tous ses descendants sont cachés aux technologies d'assistance. L'exposition de l'élément à la navigation séquentielle peut être source de confusion pour les utilisateurs de technologies d'assistance, car l'élément est accessible alors qu'il devrait être caché.",
        "tip": "Vérifiez si l'élément doit être caché aux technologies d'assistance et, le cas échéant, supprimez-le de la navigation séquentielle. Pour la suppression de la navigation par onglets, ajoutez l'attribut tabindex=\"-1\", le style \"disabled:none\" ou l'attribut disabled."
    },
    "EA-R67": {
        "content": "La taille de la police est très petite",
        "explanation": "Cette règle vérifie que la taille des polices est supérieure à 9 pixels. Les polices de petite taille ne sont pas faciles à lire et doivent être évitées dans la mesure du possible.",
        "tip": "Vérifiez si la taille de la police peut être augmentée d'au moins 10 px. En général, une taille de police de 16 px ou plus est recommandée pour un texte normal."
    },
    "EA-R68": {
        "content": "Le groupe n'a pas de nom accessible",
        "explanation": "Le regroupement de contrôles de formulaires apparentés rend les formulaires plus compréhensibles pour tous les utilisateurs, car les contrôles apparentés sont plus faciles à identifier. Pour que les technologies d'assistance puissent identifier correctement l'objectif d'un groupe, il faut lui donner un nom accessible, par exemple en utilisant un <legend> pour un <fieldset> ou des attributs aria pour les éléments avec role=\"group\" ou \"menubar\".",
        "tip": "Veillez à ce que chaque groupe ait un nom accessible en utilisant des attributs aria comme aria-label ou un <legend> pour un <fieldset>."
    },
    "EA-R69": {
        "content": "L'attribut Headers des références de la cellule est manquant",
        "explanation": "L'attribut <a target=\"_blank\" href=\"https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/H43\">headers</a> spécifie une ou plusieurs cellules d'en-tête auxquelles une cellule de tableau est liée. Il n'est utilisé que par les lecteurs d'écran. Cette règle vérifie que l'attribut headers d'une cellule fait référence à une cellule correspondante dans le même élément de tableau. Si les tableaux ne sont pas correctement balisés, les lecteurs d'écran risquent d'obtenir des résultats confus ou inexacts.",
        "tip": "Vérifier s'il existe une autre cellule ayant l'identifiant de la valeur de l'attribut headers dans la même table. Dans le cas contraire, supprimer l'attribut headers ou créer une cellule correspondante avec cet identifiant."
    },
    "EA-R70": {
        "content": "L'élément marqué comme décoratif est exposé",
        "explanation": "Cette règle vérifie que les éléments marqués comme décoratifs ne sont pas inclus dans l'arbre d'accessibilité ou qu'ils ont un rôle de présentation. Le fait de marquer un élément comme décoratif le cache aux technologies d'assistance, mais le fait de le rendre focalisable ou d'ajouter des attributs ARIA peut l'exposer. Il convient d'éviter ce conflit.",
        "tip": "Vérifier si l'élément doit être marqué comme décoratif ou le cacher aux technologies d'assistance, par exemple en utilisant aria-hidden=\"true\" ou role=\"presentation\"."
    },
    "EA-R71": {
        "content": "Détection d'un élément dont l'attribut lang n'est pas valide",
        "explanation": "Les parties d'un site web peuvent être marquées comme étant dans une langue différente de celle du reste du site à l'aide de l'attribut lang. L'attribut lang de ces éléments doit également être un code de langue valide et conforme à la norme BCP 47, par exemple \"de\" ou \"en-us\".",
        "tip": "Assurez-vous qu'un code de langue valide est défini dans l'attribut lang de l'élément."
    },
    "EA-R72": {
        "content": "Le lien ne se distingue pas du texte environnant",
        "explanation": "Cette règle vérifie que les liens en ligne se distinguent du texte environnant par une différence qui ne repose pas uniquement sur la couleur. Les liens peuvent être mis en évidence, par exemple en soulignant le texte ou en utilisant une bordure. Les états de survol et de focalisation sont également vérifiés.",
        "tip": "Veillez à ce que le lien se distingue du texte environnant non seulement par sa couleur. Vérifiez également ce point lors du survol ou de la mise au point du lien."
    },
    "EA-R73": {
        "content": "Nom accessible manquant pour l'élément de menu",
        "explanation": "Cette règle vérifie que chaque élément ayant le rôle de menuitem a un nom accessible non vide. Le rôle menuitem indique que l'élément est une option dans un ensemble de choix contenus dans un menu ou une barre de menus.",
        "tip": "Ajouter un nom accessible en utilisant le contenu de l'élément ou en utilisant les attributs aria."
    },
    "EA-R74": {
        "content": "L'orientation de la page est limitée",
        "explanation": "Cette règle vérifie que le contenu de la page n'est pas limité à l'orientation paysage ou portrait à l'aide de la propriété CSS transform. Les éléments qui sont fixés à une certaine rotation, en utilisant la fonction média orientation avec une valeur de paysage ou de portrait, peuvent ne pas pivoter sur les appareils mobiles.",
        "tip": "Assurez-vous que tous les éléments du site web pivotent correctement lorsque vous passez du mode portrait au mode paysage."
    },
    "EA-R75": {
        "content": "Le paragraphe est en italique",
        "explanation": "S'il est bon d'utiliser le texte en italique pour mettre en évidence un contenu important, il faut éviter d'utiliser le texte en italique sur de longs paragraphes. Pour les personnes souffrant de dyslexie en particulier, le texte en italique peut être plus difficile à lire.",
        "tip": "Évitez les grandes masses de texte en italique et n'utilisez-le que pour mettre en évidence un contenu important."
    },
    "EA-R76": {
        "content": "Le paragraphe est en majuscules",
        "explanation": "S'il est bon d'utiliser les majuscules pour mettre en évidence un contenu important, il faut éviter de les utiliser dans les longs paragraphes. Les textes en majuscules sont en effet plus difficiles à lire, en particulier pour les personnes souffrant de dyslexie. Les lecteurs d'écran peuvent également lire chaque lettre individuellement.",
        "tip": "Évitez les gros blocs de texte en majuscules et n'utilisez-les que pour mettre en évidence un contenu important."
    },
    "EA-R77": {
        "content": "Les paragraphes de texte sont justifiés",
        "explanation": "Les personnes souffrant de certains handicaps cognitifs ont des difficultés à lire les textes justifiés à gauche et à droite. L'espacement inégal entre les mots dans un texte entièrement justifié peut rendre la lecture difficile et, dans certains cas, impossible.",
        "tip": "Évitez d'utiliser un alignement de texte justifié dans les longs paragraphes de texte."
    },
    "EA-R78": {
        "content": "Le contenu n'est pas inclus dans une région repère",
        "explanation": "<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html\">Landmarks</a> identifient de manière programmatique les sections d'une page. Une bonne pratique consiste à inclure tout le contenu de la page dans les points de repère, afin que les utilisateurs de lecteurs d'écran qui s'appuient sur eux pour naviguer d'une section à l'autre ne perdent pas la trace du contenu. L'en-tête, la barre de navigation, le pied de page ou la section principale sont des exemples de régions. Les repères HTML5 natifs tels que &lt;nav&gt ; sont recommandés plutôt que d'utiliser des rôles ARIA tels que role=\"nav\".",
        "tip": "Ajoutez tous les éléments de texte aux repères existants ou créez-en de nouveaux. Vous trouverez une vue d'ensemble des repères HTML ici</a>."
    },
    "EA-R79": {
        "content": "L'élément <meta> a un délai de rafraîchissement",
        "explanation": "Cette règle vérifie que l'élément <meta> n'est pas utilisé pour une redirection ou un rafraîchissement différé. Comme les utilisateurs ne s'attendent pas à ce qu'une page soit rafraîchie automatiquement, un tel rafraîchissement peut les désorienter. Si un rafraîchissement ou une redirection est utilisé, l'attribut content de l'élément <meta> doit être soit 0, soit supérieur à 72000 (20 heures).",
        "tip": "N'utilisez pas d'actualisation différée, ne redirigez pas l'utilisateur et ne lui donnez pas la possibilité de régler le délai."
    },
    "EA-R80": {
        "content": "L'élément <meta> a un délai de rafraîchissement (AAA)",
        "explanation": "Cette règle vérifie que l'élément <meta> n'est pas utilisé pour une redirection ou un rafraîchissement différé. Si un rafraîchissement ou une redirection est utilisé, la valeur de l'attribut content de l'élément <meta> doit être 0 sans exception.",
        "tip": "N'utilisez pas de rafraîchissement différé ou de redirection et fixez le délai à 0."
    },
    "EA-R81": {
        "content": "Nom accessible manquant pour la région",
        "explanation": "Le rôle de région est utilisé pour identifier les zones du document que l'auteur juge importantes. Chaque région doit porter un nom accessible afin que les utilisateurs de lecteurs d'écran puissent en identifier le contenu et l'objectif.",
        "tip": "Ajouter un nom accessible à la région en utilisant les attributs aria."
    },
    "EA-R82": {
        "content": "Le rôle de l'élément n'est pas valide",
        "explanation": "Cette règle vérifie que chaque attribut de rôle a une valeur valide conformément aux <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles\">spécificationsWAI-ARIA</a>. Les rôles obsolètes sont également vérifiés.",
        "tip": "Vérifiez que l'attribut du rôle ne comporte pas de fautes d'orthographe et que le rôle existe dans la spécification."
    },
    "EA-R83": {
        "content": "L'élément défilant n'est pas accessible au clavier",
        "explanation": "Cette règle vérifie que les éléments déroulables peuvent être défilés à l'aide du clavier. Pour s'assurer qu'il existe un élément à partir duquel les touches fléchées peuvent être utilisées pour contrôler la position de défilement, le curseur doit se trouver sur ou dans une région défilable.",
        "tip": "Veillez à ce que chaque élément défilant ou l'un de ses éléments enfants soit focalisable."
    },
    "EA-R84": {
        "content": "L'étiquette visible ne fait pas partie du nom accessible",
        "explanation": "Cette règle vérifie que les éléments interactifs tels que les boutons ou les liens ont leur étiquette visible complète en tant que partie de leur nom accessible, par exemple lors de l'utilisation de aria-label. Cette règle est particulièrement importante pour les utilisateurs qui utilisent la saisie vocale pour contrôler le site web. Dans le cas contraire, la saisie vocale ne peut pas être interprétée correctement et risque de ne pas fonctionner. Un contexte supplémentaire ne faisant pas partie du nom visible peut être ajouté à l'aide de aria-describedby.",
        "tip": "Veillez à ce que l'intégralité de l'étiquette visible (et pas seulement une partie) soit incluse dans le nom accessible (défini par exemple avec aria-label)."
    },
    "EA-R85": {
        "content": "Contraste du texte insuffisant (amélioré)",
        "explanation": "Il s'agit d'un renforcement AAA de la règle du contraste minimum. Veillez à ce que tous les éléments textuels présentent un contraste de couleur suffisant entre le texte de premier plan et la couleur d'arrière-plan. Le contraste minimal renforcé dépend de la taille du texte et est de 7:1 ou de 4,5:1 pour les textes de grande taille.",
        "tip": "Augmentez le contraste, par exemple en fonçant ou en éclaircissant la police ou la couleur d'arrière-plan. L'aide est fournie par le <a target=\"_blank\" href=\"https://dashboard.eye-able.com/tools/contrast-check\">contrast checker from Eye-Able</a> dans le tableau de bord sous Outils."
    },
    "EA-R86": {
        "content": "Nom accessible manquant pour l'élément ARIA Meter",
        "explanation": "Un compteur est un affichage graphique d'une valeur numérique dans une plage définie. Un élément ayant le rôle de \"compteur\" doit avoir un nom accessible afin que les utilisateurs de lecteurs d'écran puissent identifier son contenu et son objectif.",
        "tip": "Ajoutez un nom accessible au compteur à l'aide d'un attribut title, aria-label ou aria-labelledby."
    },
    "EA-R87": {
        "content": "Nom accessible manquant pour la barre de progression ARIA",
        "explanation": "Une barre de progression indique l'état d'avancement des tâches qui prennent beaucoup de temps. Un élément ayant le rôle de \"barre de progression\" doit avoir un nom accessible afin que les utilisateurs de lecteurs d'écran puissent identifier son contenu et son objectif.",
        "tip": "Ajouter un nom accessible à la barre de progression en utilisant un attribut title, aria-label ou aria-labelledby."
    },
    "EA-R88": {
        "content": "Absence d'équivalent aria-braille",
        "explanation": "Cette vérification permet de s'assurer qu'il existe un équivalent non braille pour les contenus aria-braillelabel et aria-brailleroledescription. Lorsqu'ils sont utilisés sans étiquette ou description de rôle correspondante, l'ARIA recommande d'ignorer ces attributs.",
        "tip": "Veillez à fournir un équivalent non braille pour les attributs aria mentionnés. Il peut s'agir d'un attribut aria-label ou aria-roledescription."
    },
    "EA-R89": {
        "content": "Nom accessible manquant pour un bouton, un lien ou un élément de menu ARIA",
        "explanation": "Il est essentiel que chaque bouton (role=\"button\"), lien (role=\"link\") et élément de menu (role=\"menuitem\") ARIA ait un nom lisible par les technologies d'assistance.",
        "tip": "Veillez à ce que chaque bouton, lien ou élément de menu ARIA porte un nom descriptif et accessible. Vous pouvez utiliser un texte intérieur, un attribut aria-label ou aria-labelledby non vide."
    },
    "EA-R90": {
        "content": "Rôle sans attributs requis",
        "explanation": "Cette règle vérifie que les éléments qui ont un rôle explicite spécifient également tous les états et propriétés requis pour ce rôle. L'état de l'élément n'est pas communiqué aux utilisateurs de lecteurs d'écran si un attribut obligatoire est omis.",
        "tip": "Ajoutez les attributs ARIA manquants. Pour plus d'informations sur les attributs requis, consultez la <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#states_and_properties\">spécification ARIA</a>."
    },
    "EA-R91": {
        "content": "Nom accessible manquant dans l'infobulle ARIA",
        "explanation": "Chaque élément d'infobulle ARIA (role=\"tooltip\") doit avoir un nom accessible qui décrit son objectif ou sa fonction pour les utilisateurs de technologies d'assistance.",
        "tip": "Veillez à ce que chaque info-bulle ARIA porte un nom clair et descriptif. Ce nom peut être défini à l'aide d'un texte intérieur visible ou d'attributs tels que aria-label et aria-labelledby."
    },
    "EA-R92": {
        "content": "L'élément <blink> est obsolète",
        "explanation": "L'élément <blink> fait clignoter tout texte à l'intérieur de l'élément à une vitesse prédéterminée. L'utilisateur ne peut pas interrompre ce clignotement, qui ne peut pas non plus être désactivé par préférence. Par conséquent, le contenu qui utilise l'élément <blink> ne remplit pas le critère de réussite car le clignotement peut durer plus de trois secondes.",
        "tip": "Supprimez tous les éléments <blink> de votre page web."
    },
    "EA-R93": {
        "content": "Page manquant de moyens pour contourner les blocs répétés",
        "explanation": "Le fait de proposer des moyens de sauter le contenu répétitif aide les utilisateurs à naviguer plus efficacement sur le site. Cette règle échoue si la page ne comporte ni lien de saut interne, ni titre, ni région repère.",
        "tip": "L'utilisation de <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/\">éléments de référence appropriés</a> tels que &lt;nav&gt ;, &lt;main&gt ;, &lt;footer&gt ;, <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">titres</a> ou <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">liens de saut internes</a> peut aider les utilisateurs à naviguer plus efficacement sur le site."
    },
    "EA-R94": {
        "content": "Structure incorrecte de l'élément <dl>.",
        "explanation": "Une liste de définitions (<dl>) contient une liste de groupes de termes (à l'aide d'éléments <dt>) et de descriptions (à l'aide d'éléments <dd>), par exemple pour afficher un glossaire. Une liste de définitions ne peut contenir que des éléments <dt>, <dd>, <template>, <script> ou <div> dans un ordre approprié.",
        "tip": "Vérifiez que votre liste de définitions ne contient que des éléments <dt>, <div> et <dd>. Veillez également à ce qu'ils soient correctement ordonnés : les éléments <dt> doivent toujours précéder les éléments <dd>."
    },
    "EA-R95": {
        "content": "L'élément <dt> ou <dd> ne contient pas d'élément <dl>.",
        "explanation": "Les éléments description term <dt> et description details <dd> doivent toujours être enveloppés par un élément definition list <dl> ou la liste de définition n'est pas valide. Dans le cas contraire, les technologies d'assistance pourraient ne pas être en mesure de reconnaître correctement la liste de définition.",
        "tip": "Assurez-vous que l'élément parent de <dt> ou <dd> est une liste de définition <dl> ou un <div> qui est un enfant d'un <dl>."
    },
    "EA-R96": {
        "content": "Le champ du formulaire a plusieurs étiquettes",
        "explanation": "Chaque champ de formulaire ne doit avoir qu'un seul <label> associé. Sinon, il y a des incohérences dans la façon dont les différentes technologies d'assistance et combinaisons de navigateurs interprètent l'étiquette. Les étiquettes sont reliées aux champs de formulaire à l'aide de l'attribut for du <label> et de l'attribut id du champ de formulaire.",
        "tip": "Veillez à ce que chaque champ de formulaire n'ait qu'un seul <label> associé. Utilisez l'identifiant du champ de formulaire pour rechercher les étiquettes connectées."
    },
    "EA-R98": {
        "content": "La valeur de l'attribut ARIA ID doit être unique",
        "explanation": "L'identifiant est un identifiant unique pour les éléments de la page web et ne doit donc pas être dupliqué. C'est particulièrement important pour les éléments ARIA, car l'identifiant est utilisé pour attacher des noms ou des descriptions accessibles. Les identifiants dupliqués sont des erreurs de validation courantes qui peuvent compromettre l'accessibilité des étiquettes.",
        "tip": "Renommez l'identifiant de manière à ce qu'il ne soit utilisé qu'une seule fois sur la page. Vérifiez que vos éléments ARIA restent valides."
    },
    "EA-R99": {
        "content": "Les listes ne doivent contenir que des éléments <li>.",
        "explanation": "Les listes (<ul> ou <ol>) doivent être correctement structurées pour être lisibles et annoncées correctement par les technologies d'assistance. Une liste ne doit contenir que des <li>, <script> ou <template> comme nœuds enfants directs. Les éléments de la liste eux-mêmes peuvent contenir d'autres éléments.",
        "tip": "Assurez-vous que votre nœud de liste (<ul> ou <ol>) n'a que des éléments de liste (<li>) comme nœuds enfants directs."
    },
    "EA-R101": {
        "content": "Éviter d'utiliser des éléments <marquee>",
        "explanation": "L'élément <marquee> crée un texte défilant difficile à lire et sur lequel il est difficile de cliquer. L'élément <marquee> est déprécié et peut poser des problèmes d'accessibilité et de convivialité, notamment parce qu'il est difficile de faire une pause.",
        "tip": "Remplacer les éléments <marquee> par des animations CSS modernes ou d'autres techniques."
    },
    "EA-R102": {
        "content": "Éviter d'utiliser des cartes d'images côté serveur",
        "explanation": "Les cartes d'images côté serveur ne sont pas accessibles aux utilisateurs de clavier, qui doivent cliquer sur la souris pour accéder au contenu lié. L'image est donc inaccessible aux personnes qui naviguent uniquement à l'aide d'un clavier. En outre, il n'est pas possible de fournir des alternatives textuelles pour les zones interactives d'une carte d'image côté serveur, comme c'est le cas pour les cartes d'image côté client.",
        "tip": "Utilisez des cartes d'images côté client ou d'autres éléments interactifs pour améliorer l'accessibilité."
    },
    "EA-R104": {
        "content": "La cible tactile est trop petite",
        "explanation": "Les cibles tactiles doivent être suffisamment grandes et espacées pour pouvoir être activées facilement sans activer involontairement une cible adjacente. Les cibles tactiles doivent avoir une taille d'au moins 24 x 24 pixels CSS ou une distance de 24 px par rapport à la cible suivante. Les cibles tactiles de grande taille permettent d'éviter les erreurs d'utilisation et garantissent une meilleure expérience pour les utilisateurs mobiles. Cette règle dépend de la taille de la fenêtre de visualisation et de la position de défilement.",
        "tip": "Assurez-vous que votre cible tactile a une taille d'au moins 24 x 24 pixels CSS ou qu'elle se trouve à une distance de 24 px de la cible suivante. Il existe une exception si un autre contrôle peut fournir la fonctionnalité sous-jacente et respecter la taille minimale."
    },
    "EA-R105": {
        "content": "Assurer des valeurs appropriées pour l'attribut de rôle",
        "explanation": "Des valeurs de rôle inappropriées peuvent perturber les utilisateurs de technologies d'assistance ou faire en sorte que des éléments soient ignorés.",
        "tip": "Valide que l'attribut role a une valeur appropriée pour l'élément donné."
    },
    "EA-R106": {
        "content": "Nom accessible manquant dans le dialogue ARIA",
        "explanation": "Les utilisateurs de lecteurs d'écran ne peuvent pas comprendre l'objectif des dialogues ARIA (éléments avec role=\"dialog\" ou role=\"alertdialog\") qui n'ont pas de nom accessible. Un nom accessible fournit un contexte au dialogue, ce qui permet aux utilisateurs de lecteurs d'écran d'en comprendre l'objectif et la fonction.",
        "tip": "Veillez à ce que le dialogue ARIA ait un nom accessible. Utilisez pour cela les attributs aria-label ou aria-labelledby."
    },
    "EA-R107": {
        "content": "Veiller à l'utilisation correcte de role=\"text\"",
        "explanation": "Le rôle=\"text\" doit être utilisé sur les éléments qui n'ont pas de descendants focalisables afin d'éviter les problèmes de navigation pour les utilisateurs de lecteurs d'écran.",
        "tip": "Utilisez role=\"text\" pour les éléments qui n'ont pas d'éléments enfants focalisables."
    },
    "EA-R108": {
        "content": "Nom accessible manquant pour l'élément d'arbre ARIA",
        "explanation": "Un arbre (role=\"tree\") est une liste hiérarchique avec des nœuds parents et enfants qui peuvent être développés et réduits. Un élément d'arbre (role=\"treeitem\") est un nœud dans un arbre. Sans nom accessible, les lecteurs d'écran ne sont pas en mesure de déterminer la fonction de l'élément d'arbre.",
        "tip": "Attribuer un nom descriptif à l'élément d'arbre en utilisant un texte intérieur, un aria-label ou un aria-labelledby."
    },
    "EA-R110": {
        "content": "Élément de formulaire dont l'étiquette n'est pas visible",
        "explanation": "Les étiquettes visibles améliorent l'accessibilité des formulaires en fournissant un contexte clair aux utilisateurs voyants. S'appuyer uniquement sur les étiquettes cachées, le titre ou l'attribut aria-describedby peut s'avérer contraignant. Les attributs title et aria-describedby fournissent des informations supplémentaires telles que des indices. Comme les indices sont présentés différemment des étiquettes aux API d'accessibilité, cela peut poser des problèmes avec les technologies d'assistance.",
        "tip": "Fournissez une étiquette visible et claire. L'idéal est d'utiliser un élément <label>. Si ce n'est pas possible, on peut également utiliser aria-label ou aria-labelledby."
    },
    "EA-R111": {
        "content": "Le repère de la bannière n'est pas au niveau le plus élevé",
        "explanation": "Avec <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, les utilisateurs aveugles utilisant un lecteur d'écran ont la possibilité de sauter à des sections d'une page web. Le rôle de bannière (role=\"banner\") permet de définir un en-tête global du site, par exemple une fonction de recherche, la navigation globale ou un slogan. Si le repère de la bannière n'est pas un repère de premier niveau (et qu'il est contenu dans un autre repère), il ne définit pas efficacement la partie prédéterminée de l'en-tête de la mise en page.",
        "tip": "Veillez à ce que chaque point de repère de la bannière ne soit pas contenu dans un autre point de repère."
    },
    "EA-R112": {
        "content": "Le point de repère complémentaire n'est pas au plus haut niveau",
        "explanation": "Avec <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, les utilisateurs aveugles utilisant un lecteur d'écran ont la possibilité de sauter à des sections d'une page web. Le contenu complémentaire comme &lt;aside&gt ; ou role=\"complementary\" complète le contenu principal d'un document ou d'une page. Les utilisateurs de lecteurs d'écran ont la possibilité d'ignorer le contenu complémentaire lorsqu'il apparaît au niveau supérieur de la page. Cette option n'est pas disponible si vous intégrez un élément &lt;aside&gt ; dans un autre landmark.",
        "tip": "Assurez-vous que chaque repère complémentaire (&lt;aside&gt ; ou role=\"complementary\") n'est pas contenu dans un autre repère."
    },
    "EA-R113": {
        "content": "Le signet Contentinfo n'est pas au premier niveau",
        "explanation": "Avec <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, les utilisateurs aveugles utilisant un lecteur d'écran ont la possibilité de sauter à des sections d'une page web. Le rôle contentinfo (role=\"contentinfo\") définit un pied de page contenant des informations telles que les droits d'auteur, les liens de navigation et les déclarations de confidentialité. Le fait de le placer dans un autre repère peut empêcher les utilisateurs aveugles de lecteurs d'écran de trouver rapidement le pied de page et d'y naviguer.",
        "tip": "Assurez-vous que le repère contentinfo (role=\"contentinfo\") n'est pas contenu dans un autre repère."
    },
    "EA-R114": {
        "content": "Le point de repère principal n'est pas au niveau supérieur",
        "explanation": "Grâce à la fonction <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marque de repère</a>, les utilisateurs aveugles qui utilisent un lecteur d'écran ont la possibilité de sauter à des sections d'une page web. Le repère principal (&lt;main role=\"main\"&gt ;) est utilisé pour indiquer le contenu principal d'un document. Une bonne pratique consiste à s'assurer que le repère principal n'est pas contenu dans un autre repère.",
        "tip": "Assurez-vous que le repère principal (&lt;main role=\"main\"&gt ;) n'est pas contenu dans un autre repère."
    },
    "EA-R115": {
        "content": "Il existe plus d'un repère de bannière",
        "explanation": "Les utilisateurs aveugles qui se servent d'un lecteur d'écran ont la possibilité de sauter à des sections d'une page web grâce à des repères de type <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>. La présence de plusieurs points de repère dans les bannières peut perturber la navigation des lecteurs d'écran et rendre plus difficile la détection de l'en-tête principal ou du contenu d'introduction.",
        "tip": "Veillez à ce que chaque page HTML ne comporte qu'une seule bannière repère. Décidez du repère de bannière que vous souhaitez conserver et supprimez tous les autres repères de bannière."
    },
    "EA-R116": {
        "content": "Il existe plus d'un signet contentinfo",
        "explanation": "Grâce aux repères <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, les utilisateurs aveugles utilisant un lecteur d'écran ont la possibilité de sauter à des sections d'une page web. Des repères contentinfo multiples (role=\"contentinfo\") peuvent dérouter les utilisateurs de technologies d'assistance en suggérant plusieurs régions de pied de page.",
        "tip": "Assurez-vous que chaque page HTML ne comporte qu'un seul repère contentinfo. Déterminez le repère contentinfo que vous souhaitez conserver et supprimez tous les autres repères."
    },
    "EA-R117": {
        "content": "Il existe plus d'un point de repère principal",
        "explanation": "Grâce à la fonction <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marque de repère</a>, les utilisateurs aveugles qui utilisent un lecteur d'écran ont la possibilité de sauter à des sections d'une page web. Le repère principal (&lt;main role=\"main\"&gt ;) est utilisé pour indiquer le contenu principal d'un document. La présence de plusieurs points de repère principaux peut compliquer l'identification de la zone de contenu principale par les utilisateurs.",
        "tip": "Limitez votre page à un repère principal (&lt;main role=\"main\"&gt ;) pour indiquer clairement le contenu principal. Supprimez les repères principaux en double."
    },
    "EA-R118": {
        "content": "Le point de repère principal est manquant",
        "explanation": "Grâce à la fonction <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">marques de pays</a>, les utilisateurs aveugles utilisant un lecteur d'écran ont la possibilité de sauter à des sections d'une page web. Le contenu en dehors de ces sections est difficile à trouver et son objectif peut ne pas être clair. Un repère principal (&lt;main role=\"main\"&gt ;) permet aux utilisateurs de technologies d'assistance de naviguer rapidement vers le contenu principal.",
        "tip": "Ajoutez un point de repère principal (<main>) à votre site web et incluez-y le contenu principal de votre page."
    },
    "EA-R119": {
        "content": "Landmark n'est pas unique",
        "explanation": "Les points de repère uniques aident les utilisateurs à distinguer les différentes sections du contenu. Les points de repère dupliqués peuvent dérouter les utilisateurs et rendre difficile la navigation vers le contenu souhaité. Certains repères, comme <header> ou <footer>, ne peuvent exister qu'une seule fois par page, tandis que d'autres, comme <nav> ou <section>, doivent avoir des noms uniques et accessibles (par exemple aria-label ou aria-labelledby).",
        "tip": "Assurez-vous que le repère a un rôle unique ou une combinaison rôle/étiquette/titre. Par exemple, modifiez l'étiquette pour que la région soit unique."
    },
    "EA-R120": {
        "content": "L'attribut Scope du tableau est incorrect",
        "explanation": "L'attribut scope dans les tableaux aide les utilisateurs de technologies d'assistance à comprendre la relation entre les en-têtes et les cellules de données. L'attribut scope ne peut être utilisé que sur les en-têtes de tableau <th> et doit avoir la valeur \"col\" ou \"row\".",
        "tip": "Assurez-vous que l'attribut scope n'est utilisé que sur les en-têtes de tableau <th> et que la valeur est \"col\" ou \"row\"."
    },
    "EA-R121": {
        "content": "Il manque un lien de saut à la page",
        "explanation": "Les liens de saut fournissent un lien en haut de la page qui, lorsqu'il est activé, renvoie l'utilisateur au début de la zone de contenu principal. Sinon, les utilisateurs de claviers et de lecteurs d'écran doivent parcourir une longue liste de liens de navigation et d'autres éléments avant d'atteindre le contenu principal. Un lien de saut typique est \"passer au contenu\" en utilisant un lien avec un lien d'ancrage (par exemple #main-content). Il est recommandé de masquer le lien jusqu'à ce que l'utilisateur y accède à l'aide d'un clavier.",
        "tip": "Ajoutez un lien de saut vers le contenu principal de la page. Si vous disposez déjà d'un tel lien, assurez-vous qu'il est accessible au moyen du clavier."
    },
    "EA-R122": {
        "content": "S'assurer que les valeurs de l'indice de tabulation sont égales à 0 ou négatives",
        "explanation": "L'utilisation de valeurs de tabindex supérieures à 0 peut perturber l'ordre naturel des tabulations et entraîner des difficultés de navigation pour les utilisateurs de claviers et de technologies d'assistance.",
        "tip": "Fixer les valeurs de l'indice de tabulation à 0 ou ne pas les fixer pour obtenir un ordre de tabulation naturel. Utilisez des valeurs négatives pour les éléments focalisables par programme."
    },
    "EA-R123": {
        "content": "Le tableau a une légende et un résumé identiques",
        "explanation": "Le fait d'avoir le même texte dans l'élément <caption> d'un tableau et dans son attribut summary est redondant et peut prêter à confusion. L'élément <caption> est utilisé comme titre à l'écran, tandis que l'attribut summary est utilisé par les lecteurs d'écran pour accéder à un résumé de l'objectif du tableau.",
        "tip": "Veillez à ce que le texte <caption> soit différent de l'attribut summary du tableau afin d'éviter toute confusion."
    },
    "EA-R124": {
        "content": "Liens identiques avec des cibles différentes",
        "explanation": "Les liens portant le même nom accessible doivent avoir la même fonctionnalité/cible afin d'éviter toute confusion. La description du lien permet à l'utilisateur de distinguer chaque lien des liens de la page web qui mènent à d'autres destinations et l'aide à décider s'il doit suivre le lien.",
        "tip": "Évitez d'avoir des liens avec des descriptions identiques (par exemple, à partir du texte intérieur, des attributs alt ou aria) qui renvoient à des URL différents. Fournissez un texte de lien qui décrit l'objectif et la cible du lien."
    },
    "EA-R125": {
        "content": "Vérifiez que la langue du site est correctement définie.",
        "explanation": "L'orthographe de l'arrière-plan ne correspond pas à tous les éléments de la page. Cela est vrai si ces éléments sont dotés d'un attribut propre à la langue et s'ils sont correctement définis. Par exemple, l'interprétation d'une langue étrangère est incorrecte.",
        "tip": "Veillez à ce que toutes les autres couleurs de la page soient dotées de l'attribut le plus approprié."
    }
};