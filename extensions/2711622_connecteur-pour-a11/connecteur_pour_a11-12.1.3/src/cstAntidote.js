//*****
// Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite.
// Copyright 2021 Druide informatique inc.
//*****

//RevoirAChaqueAnnee

const cstNomIdAntidote = [
	"",		//
	"12",  	//cstIdAntidoteBureau
	"Web" 	//cstIdAntidoteWeb
];


const cstUrlBeta = "https://www.antidote.info/fr/antidote-plus/beta/observation";
const cstUrlPathCorrecteurFr = "correcteur";
const cstUrlPathCorrecteurEn = "corrector";
const cstUrlPathDictionnaires = "dictionnaires";
const cstUrlPathGuides = "guides";
const cstUrlPathReglagesLinguistiques = "reglages_linguistiques"; //tex-1555
const cstUrlPathDonneesPersonelles = "dictionnaires_personnels"; //tex-1555

const cstUrlSeparateur = "/";
const cstVersionUriAntidoteWeb = "v1";
const cstMessageEnregistreFureteurAWeb = 'enregistreFureteurAWeb';
const cstParamUriTexteurNatif = "texteurNatif=1";
const cstVersionIATMaxUriAntidoteWeb = "versionIATMax=";
const cstVersionIATMinUriAntidoteWeb = "versionIATMin=";
const cstContexteSafari = "&contexte=connecteur-safari";

const cstRoleConnecteur = 'PluginFureteur';
const cstVersionIATMin = '1.0';
const cstVersionIATMax = '1.2';
const cstVersionPontAAMin = '2.0';
const cstVersionPontAAMax = '2.0';
const cstVersionPontAA = {
	'produit' : { 
		'11' : {
			'min' : '1.0',
			'max' : '2.0'
		},
		'12' : {
			'min' : '3.0',
			'max' : '3.0' 
		}
	},
	'fn' : {
		'AEC' : {'min':'3.0','max':'3.0'}
	},
	'support':['2.0','3.0']
};

const cstVersionPontRetrocompatible = "1.0";
const cstSeparateurVersion = '.';
const cstDebutJsonEntetePaquet = '{"_dib83';

const cstRegExUrlDebut = '[?|&]';
const cstRegExUrlEgal = '=';
const cstRegExUrlGroupe = '([^&;]+?)(&|#|;|$)';
const cstRegExUrlPourcent20 = '%20';

const cstIdAntidoteWebSolo = 3;
const cstIdAntidoteWeb = 2;
const cstIdAntidoteBureau = 1;
const cstIdAntidoteWebAConfirmer = -2;
const cstSourceScriptAWeb = 'scriptAweb';//script injecté dans une page d'AWeb
const cstSourceScriptPage = 'scriptPage';//script injecté dans la page
const cstTypeMessageReponse = 'reponse';
const cstTypeMessageRequete = 'requete';
const cstTypeMessageRequeteAgentConnectix = 'requeteAgentConnectix';
const cstTypeMessageRequeteAntiOups = 'requeteAntiOups';
const cstTypeMessageRequeteAntidote = 'requeteAntidote';

const cstFormatTexteInconnu = 0;
const cstFormatTexteMarkdown = 2;

const cstAttributNomExpediteur = "nomExpediteur";
const cstMessageLanceOutilAntidote = "lanceOutilAntidote"; 
const cstMessageLanceOutil = 'LanceOutil';
const cstMessageReglageAgentConnectix = 'reglageAgentConnectix';
const cstMessageChangeTypeAppAntidote = 'changeTypeAppAntidote';
const cstMessageFaireActivation = 'FaireActivation';
const fichierConfigMenu = "ConfigurationMenuAntidote11"; //RevoirAChaqueEdition
const cstSeparateurDsFichierConfigMenu = "/";

const cstSeparateurPourSignet = "#";
const cstCaractereLigneSuivante = "\n";

const cstCategorieCorrecteur = "Correcteur";
const cstCategorieDictionnaires = "Dictionnaires";
const cstCategorieGuides = "Guides";

const chaineCommandeC  ="C";
const chaineCommandeC0 ="C0";
const chaineCommandeC1 ="C1";
const chaineCommandeD  ="D";
const chaineCommandeD0 ="D0";
const chaineCommandeD1 ="D1";
const chaineCommandeD2 ="D2";
const chaineCommandeD3 ="D3";
const chaineCommandeD5 ="D5";
const chaineCommandeD6 ="D6";
const chaineCommandeD8 ="D8";
const chaineCommandeD10 ="D10";
const chaineCommandeD11 ="D11";
const chaineCommandeD13 ="D13";
const chaineCommandeD14 ="D14";
const chaineCommandeG  = "G";
const chaineCommandeG0 = "G0";
const chaineCommandeG1 = "G1";
const chaineCommandeG2 = "G2";
const chaineCommandeG3 = "G3";
const chaineCommandeG4 = "G4";
const chaineCommandeG5 = "G5";
const chaineCommandeG6 = "G6";
const chaineCommandeG7 = "G7";
const chaineCommandeG8 = "G8";
const chaineCommandeG9 = "G9";
const chaineCommandeG10 = "G10";
const chaineCommandeG11 = "G11";
const chaineCommandeG13 = "G13";


const chaineCommandeR0 = "R0";  //Reglages
const chaineCommandeP0 = "P0";  //Donnees persos
//
const cstAntidoteOui = "oui";
const configMenuDefaut = {
"fr":[
	"1/oui/Correcteur/Antidote - Correcteur/Correcteur//non//C0/",
	"1/oui/Dictionnaires/Antidote - Dictionnaires/Dictionnaires//non//D0/",
	"1/oui/Guides/Antidote - Guides/Guides//non//G0/",
	"2/non/Définitions/Antidote - Définitions/Dictionnaire de définitions/Dictionnaires/non//D1/",
	"2/non/Synonymes/Antidote - Synonymes/Dictionnaire de synonymes/Dictionnaires/non//D2/",
	"2/non/Antonymes/Antidote - Antonymes/Dictionnaire de antonymes/Dictionnaires/non//D3/",
	"2/non/Cooccurrences/Antidote - Cooccurrences/Dictionnaire de cooccurrences/Dictionnaires/non//D5/",
	"2/non/Champ lexical/Antidote - Champ lexical/Dictionnaire de champs lexicaux/Dictionnaires/non//D13/",
	"2/non/Famille/Antidote - Famille/Dictionnaire de familles/Dictionnaires/non//D6/",
	"2/non/Conjugaison/Antidote - Conjugaison/Dictionnaire de conjugaison/Dictionnaires/non//D10/",
	"2/non/Rimes/Antidote - Rimes/Dictionnaire de rimes/Dictionnaires/non//D14/",
	"2/non/Citations/Antidote - Citations/Dictionnaire de citations/Dictionnaires/non//D8/",
	"2/non/Historique/Antidote - Historique/Dictionnaire historique/Dictionnaires/non//D11/",
	"2/non/Orthographe/Antidote - Orthographe/Guide d’orthographe/Guides/non//G1/",
	"2/non/Lexique/Antidote - Lexique/Guide du lexique/Guides/non//G2/",
	"2/non/Grammaire/Antidote - Grammaire/Guide de grammaire/Guides/non//G3/",
	"2/non/Syntaxe/Antidote - Syntaxe/Guide de syntaxe/Guides/non//G4/",
	"2/non/Ponctuation/Antidote - Ponctuation/Guide de ponctuation/Guides/non//G5/",
	"2/non/Style/Antidote - Style/Guide de style/Guides/non//G6/",
	"2/non/Rédaction/Antidote - Rédaction/Guide de rédaction/Guides/non//G7/",
	"2/non/Typographie/Antidote - Typographie/Guide de typographie/Guides/non//G8/",
	"2/non/Phonétique/Antidote - Phonétique/Guide de phonétique/Guides/non//G13/",
	"2/non/Historique/Antidote - Historique/Guide historique/Guides/non//G11/",
	"2/non/Points de langue/Antidote - Points de langue/Guide des points de langue/Guides/non//G9/"
],
"en":[
	"1/oui/Corrector/Antidote - Corrector/Corrector//non//C0/",
	"1/oui/Dictionaries/Antidote - Dictionaries/Dictionaries//non//D0/",
	"1/oui/Guides/Antidote - Guides/Guides//non//G0/",
	"2/non/Definitions/Antidote - Definitions/Dictionary of definitions/Dictionnaires/non//D1/",
	"2/non/Synonyms/Antidote - Synonyms/Dictionary of synonyms/Dictionnaires/non//D2/",
	"2/non/Antonyms/Antidote - Antonyms/Dictionary of antonyms/Dictionnaires/non//D3/",
	"2/non/Combinations/Antidote - Combinations/Dictionary of combinations/Dictionnaires/non//D5/",
	"2/non/Semantic field/Antidote - Semantic field/Dictionary of semantic fields/Dictionnaires/non//D13/",
	"2/non/Family/Antidote - Family/Dictionary of families/Dictionnaires/non//D6/",
	"2/non/Conjugation/Antidote - Conjugation/Dictionary of conjugations/Dictionnaires/non//D10/",
	"2/non/Rhymes/Antidote - Rhymes/Dictionary of rhymes/Dictionnaires/non//D14/",
	"2/non/Quotations/Antidote - Quotations/Dictionary of quotations/Dictionnaires/non//D8/",
	"2/non/History/Antidote - History/Historical dictionary/Dictionnaires/non//D11/",
	"2/non/Spelling/Antidote - Spelling/Spelling guide/Guides/non//G1/",
	"2/non/Lexicon/Antidote - Lexicon/Lexicon guide/Guides/non//G2/",
	"2/non/Grammar/Antidote - Grammar/Grammar guide/Guides/non//G3/",
	"2/non/Syntax/Antidote - Syntax/Syntax guide/Guides/non//G4/",
	"2/non/Punctuation/Antidote - Punctuation/Punctuation guide/Guides/non//G5/",
	"2/non/Style/Antidote - Style/Style guide/Guides/non//G6/",
	"2/non/Business Writing/Antidote - Business Writing/Business Writing guide/Guides/non//G7/",
	"2/non/Typography/Antidote - Typography/Typography guide/Guides/non//G8/",
	"2/non/Phonetics/Antidote - Phonetics/Phonetics guide/Guides/non//G13/",
	"2/non/History/Antidote - History/Historical guide/Guides/non//G11/",
	"2/non/Language Matters/Antidote - Language Matters/Language Matters guide/Guides/non//G9/"
]
}; 

const cstTypeAgentTexteur = {	
	AgentTexteurGen : 0,
	AgentTexteurStd : 1,
	AgentTexteurGoogleDocs : 2,
	AgentTexteurForm : 3,
	AgentTexteurGrav : 4
};

const cstSorteCorrection = {	
	sorteCorrectionAucune : 0,
	sorteCorrigeTout : 1,
	sorteCorrigeSelection :2 ,
	sorteCorrigeApartirDe : 3
};

//Langues
const cstIsoLangueFrancais = 'fr';
const cstIsoLangueAnglais = 'en';
const cstIsoLangueAnglaisCanada = 'en_CA';
const cstIsoLangueAnglaisEtatsUnis = 'en_US';

const cstLangues = {	
	INVALIDE : 0,
	SYSTEME : 1,
	FRANCAIS : 2,
	ANGLAIS_CANADA : 3,
	ANGLAIS_ETATSUNIS : 4
};

const cstIndexLangues = {	
	FRANCAIS : 0,
	ANGLAIS_CANADA : 1,
	ANGLAIS_ETATSUNIS : 2
};

const cstOutilSearch = "search";
const cstOutilRechercher = "rechercher";

const cstUriCorrecteur = [cstUrlPathCorrecteurFr, cstUrlPathCorrecteurEn];

const cstUriDictionnaires = {
	"D1":[ "definitions", "definitions"],
	"D2":[ "synonymes", "synonyms"],
	"D3":[ "antonymes", "antonyms"],
	"D5":[ "cooccurrences", "combinations"],
	"D13":[ "champLexical", "semanticField"],
	"D10":[ "conjugaison", "conjugation"],
	"D6":[ "famille", "family"],
	"D8":[ "citations", "quotations"],
	"D11":[ "historique", "history"],
	"D14":[ "rimes" , "rhymes"]
};

const cstUriGuides = {
	"G1":[ "orthographe", "spelling"],
	"G2":[ "lexique", "lexicon"],
	"G3":[ "grammaire", "grammar"],
	"G4":[ "syntaxe", "syntax"],
	"G5":[ "ponctuation", "punctuation"],
	"G6":[ "style", "style"],
	"G7":[ "redaction", "businesswriting"],
	"G8":[ "typographie", "typography"],
	"G13":[ "phonetique", "phonetics"],
	"G11":[ "historique", "history"],
	"G9":[ "pointsdelangue", "languagematters"]
};

//Grav
const cstTypeMessageContentScript = "TypeContentScript";

//Contextes
const cstContexteEditionDsFenCorrecteur = "EditionDsFenCorrecteur";
const cstContexteCorrection = "Correction";

//Google Docs
const scriptsAntidoteGoogleDocs2015 = 'https://script.google.com/macros/s/AKfycbyhHr9-k74ojrhyxw7U6FfgSMi5mjgzji_0rhsq8mSmM0_dKlo/exec';
const scriptsAntidoteGoogleDocs2017 = 'https://script.google.com/macros/s/AKfycbz2aniNVwfTMGdlpkh2QlMPSpeUZSPCUHdPdgBdhQ_R98wp1pKg/exec'; //nouveau
const scriptsAntidoteGoogleDocs = scriptsAntidoteGoogleDocs2017;
const cstPageModuleComplemetaireURL = 'https://chrome.google.com/webstore/detail/foadlimcengoccckgfcimnchjdfjibbc';

// Office 365 online
const cstOnedriveURL = "https://onedrive.live.com/";

const REDIRECT_URL = "https://script.google.com/oauthcallback";
const CLIENT_ID = "393130107846-tvl7u9g36dcnb3t3u12esath35r58esj.apps.googleusercontent.com";
const SCOPES = ["https://www.googleapis.com/auth/documents"];
const AUTH_URL =`https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;
const VALIDATION_BASE_URL="https://www.googleapis.com/oauth2/v3/tokeninfo";

const cstNomAgentAntidote ="com.druide.agentconnectixconsole";
const nbCaractereMaxRequeteWS = 3000;//nombre de caractères maximal dans une requête WebSocket
const cstDelaiDebutDialoguePatience = 2000;//2 secondes
const cstDelaiFinDialoguePatience = 10000;//10 secondes

const separateurElement = "\r";
const separateurCleValeur = "\n";
const cstNomFonction = "nomFonction";
const cstDebut	= "debut";
const cstFin	= "fin";
const cstChaineOrig	= "chaineOrig";
const cstParamLgTexte = "longueurTexte";
const cstChaine	= "chaine";
const cstTitre = "titre";
const cstTexte = "texte";
const cstUrl = "url";
const cstTabCorr = "Corrections";
const cstChaineJSON = "ChaineJSON";
const cstReussi = 'reussi';
const cstEchec = 'echec';
const cstFctDonneTexte = "donneTexte";
const cstFctRemplaceIntervalle = "remplaceIntervalle";
const cstFctTest = "test";
const cstAffectationJson = ':';
const cstSeparateurElementJson = ',';
const cstAccoladeJsonOuvrante = '{';
const cstAccoladeJsonFermante = '}';
const cstAccoladeTabOuvrante = '[';
const cstAccoladeTabFermante = ']';
const cstGuillemet = '"';
const cstCmdGet	= "GET";
const cstCmdPost = "POST";
const cstContentType = "Content-Type";
const cstTextHtml 	= "text/html";
const cstGoogleDocsURL = "https://docs.google.com/document";
const cstRegFacebook = /.*\.facebook\.com\/.*/;
const cstRegMessenger = /.*\.messenger\.com\/.*/;
const cstRegWordPressBlockEditorURL =	 /\/wordpress.com\/block-editor\//;
const cstRegWordPressEditorURL = "https://wordpress.com/post/"; 
const cstRegWordPressMotCleEditableURL = /\/wp-admin\/post.php/;
const cstGoogleDocsURLRegEx = /.*docs\.google\.com.*\/document\/.*/;
const cstContientCaracteresPasBlancsRegEx = /\S/;
const cstGoogleDriveURL = "https://docs.google.com/";
//Google Docs
const cstNomNoeudDocEditor = 'docs-editor';
const cstNomNoeudKixAppview = 'kix-appview';
const cstXMLHTTPRequestEtatComplete = 4;
const cstXMLHTTPRequestReussi = 200;
const cstChercheEspaceInsecable = /\u00a0/g;
const cstEspace = '\u0020';
const cstCarBidon = '\u0007';
const cstEspaceZero = '\u200B';
const cstCarBidonRemplacable = '\u001d';
const cstChercheCarBidon = /\u0007/g;
const cstChercheEspaceZero = /\u200b/g;
const cstAboutRegEx = /about:*/;
const cstMozillaExtensionRegEx = /moz-extension:\/\/*/;
const cstChromeRegEx = /chrome:\/\/*/;
const cstChromeExtensionRegEx = /chrome-extension:\/\/*/;
const cstChromeStoreRegEx = /https:\/\/chromewebstore.google.com\/\/*/;
const cstEdgeRegEx = /edge:\/\/*/;
const cstEdgeStoreRegEx = /https:\/\/microsoftedge.microsoft.com\/\/*/;
const cstExtensionRegEx = /extension:\/\/*/;
const cstRegExAlphaNumerique = /^[A-Za-z0-9]+$/;
const cstRegExGenGuid = /[018]/g;
//Autres
const cstNomNoeudScript = 'script';
const cstNomNoeudSPAN = 'span';
const cstNomNoeudDiv = 'div';
const cstNomNoeudBR	= 'br';
const cstNomNoeudP = 'p';
const cstNomNoeudPre = 'pre';
const cstNomNoeudLI = 'li';
const cstNomNoeudDD = 'dd';
const cstNomNoeudDT = 'dt';
const cstNomNoeudUL = 'ul';
const cstNomNoeudDL = 'dl';
const cstNomNoeudOL = 'ol';
const cstNomNoeudH1 = 'h1';
const cstNomNoeudH2 = 'h2';
const cstNomNoeudH3 = 'h3';
const cstNomNoeudH4 = 'h4';
const cstNomNoeudH5 = 'h5';
const cstNomNoeudH6 = 'h6';
const cstNomNoeudGras = 'B';
const cstNomNoeudTable = 'table';
const cstNomNoeudTR = 'tr';
const cstNomNoeudTD = 'td';
const cstNomNoeudTH = 'th';
const cstNomNoeudStrong = 'STRONG';
const cstNomNoeudItalique = 'I';
const cstNomNoeudEmphase = 'EM';
const cstNomNoeudIndice = 'SUB';
const cstNomNoeudExposant = 'SUP';
const cstNomNoeudBarre = 'S';
const cstNomNoeudDel = 'DEL';
const cstNomNoeudBarreHTML4 = 'STRIKE';
const cstNomNoeudBody = 'body';
const cstNomNoeudIframe = 'iframe';
const cstNomNoeudFrame = 'frame';
const cstNomNoeudInput = 'input';
const cstNomNoeudTextArea = 'textarea';
const cstNomNoeudText = "#text";
const cstNomNoeudImg = 'img';
const cstNomNoeudBouton = 'button';
const cstNomNoeudLabel = 'label';
const cstChaineContenteditable = "contenteditable";
const cstZIndex = "z-index";
const cstObject = "object";

const cstBadgeAvertissement = "! ";

const cstDataXML ="data:text/xml";
const cstDataPNG ="data:image/png";

const cstRetourCharriot = '\r';
const cstNouvelleLigne = '\n';
const cstRetourCharriotNouvelleLigne = "\r\n";
const cstChaineParagraphe = "\r\n\r\n";
const cstChaineSautColonne = "\x0E";
const cstChaineSentence = "sentence";
const cstChaineWord = "word";
const cstChaineMove = "move";
const cstChaineForward = "forward";
const cstChaineExtend = "extend";
const cstChaineBackward = "backward";
const cstChaineStyle = 'style';
const cstChaineType = 'type';
const cstChaineHidden = 'hidden';
const cstChainePassword = 'password';
const cstChaineEmail = 'email';
const cstChaineValue = 'value';
const cstChaineName = 'name';
const cstChaineText = 'text';
const cstChaineSubject = 'subject';
const cstChaineClose = 'close';
const cstChaienCenter = 'center';
const cstChaineBackSlash = '\\';
const cstChaineAntidote = 'Antidote';
const cstChaineValeur = 'valeur';
const cstDoubleBackSlash = '\\\\';
const cstBackSlashGuillemet ='\\"';
const cstSeparateurSujet = '\f';

const cstRegexTraduction = /(\{\d\})/;
const cstMsg_Patience_Fmt_Html = "{1}<br><br>{2} : {3}";
const cstMsg_Patience_Fmt = "{1}\n\n{2} : {3}"; 
const cstMsg_Cross_Origin_Securuty_Fmt_Html = "{1} {2}<br><br>{3} : {4}";
const cstMsg_Cross_Origin_Securuty_Fmt = "{1} {2}\n\n{3} : {4}";
const cstMsg_Incognito = "<h2>{1}</h2>{2}";
const cstRegexMessageRecu = /(\u001D)/gm;
const cstRegexAntidoteWebApp = /https?:\/\/([a-z0-9]+[.])?antidote.app/g;
const cstRegexServiceDruide = /https?:\/\/([a-z0-9]+[.])?services.druide.com\/connexion\/externe/g;
const cstRegexPanneauOfficeAddin = /.*\/Panneau\/panneau\.html.*/;
const cstRegexAntiOupsOfficeAddin = /.*\/AntiOups\/page_antioups\.html.*/;
const cstRegexCourriel = /[^< ]+(?=>)/g;

const cstSeparateurDeMot = "\t\n\r.,;:-\'\"’« »(){}[]";

const cstClasseTitreDialogue = "druide-titredialogue";
const cstClasseMessageDialogue = "druide-messagedialogue";
const cstClasseImageDialogue = "druide-imagedialogue";

const cstMAO = true;
const cstAntidoteAPI = true;
const cstAntidoteAPIversion = "1.1.0"

const cstElementAPIValide = "element_api_valide";
const cstElementAPINonValide = "element_api_non_valide";
const cstElementAPINonDefini = "element_api_non_defini";

const kBitStyleItalique	= 1 << 0;
const kBitStyleGras		= 1 << 1;
const kBitStyleExposant	= 1 << 2;
const kBitStyleIndice	= 1 << 3;
const kBitStyleBarre	= 1 << 5;


function donneCheminAide(lApplication,laLangue,laPlateforme){
	const kPlateforme = {
		'mac' : 'mac',
		'win' : 'windows',
		'linux' : 'mac'
	}
	const kLiensAide = {
		"googlechrome" : {
			"fr":`https://www.antidote.info/fr/integrations/documentation/utilisation-avec-vos-logiciels/${kPlateforme[laPlateforme]}/12.0/google/chrome`,
			"en":`https://www.antidote.info/en/integrations/documentation/using-with-your-other-software/${kPlateforme[laPlateforme]}/12.0/google/chrome`
		},
		"firefox" : {
			"fr":`https://www.antidote.info/fr/integrations/documentation/utilisation-avec-vos-logiciels/${kPlateforme[laPlateforme]}/12.0/mozilla/firefox`,
			"en":`https://www.antidote.info/en/integrations/documentation/using-with-your-other-software/${kPlateforme[laPlateforme]}/12.0/mozilla/firefox`
		},
		"safari" : {
			"fr":"https://www.antidote.info/fr/integrations/documentation/utilisation-avec-vos-logiciels/mac/12.0/apple/safari",
			"en":"https://www.antidote.info/en/integrations/documentation/using-with-your-other-software/mac/12.0/apple/safari"
		},
		"edge" : {
			"fr":`https://www.antidote.info/fr/integrations/documentation/utilisation-avec-vos-logiciels/${kPlateforme[laPlateforme]}/12.0/microsoft/edge`,
			"en":`https://www.antidote.info/en/integrations/documentation/using-with-your-other-software/${kPlateforme[laPlateforme]}/12.0/microsoft/edge`
		},
		"opera" : {
			"fr":`https://www.antidote.info/fr/integrations/documentation/utilisation-avec-vos-logiciels/${kPlateforme[laPlateforme]}/12.0/autres/opera`,
			"en":`https://www.antidote.info/en/integrations/documentation/using-with-your-other-software/${kPlateforme[laPlateforme]}/12.0/others/opera`	
		},
		"thunderbird" : {
			"fr":`https://www.antidote.info/fr/integrations/documentation/utilisation-avec-vos-logiciels/${kPlateforme[laPlateforme]}/12.0/mozilla/thunderbird`,
			"en":`https://www.antidote.info/en/integrations/documentation/using-with-your-other-software/${kPlateforme[laPlateforme]}/12.0/mozilla/thunderbird`
		},
		"assistance" : {
			"fr":"https://www.antidote.info/fr/assistance",
			"en":"https://www.antidote.info/en/help-centre"
		},
	}

	return kLiensAide[lApplication][laLangue];
}
//*******************
// M E S S A G E S //
//*******************

const Tr = function (s,c){return s;}

//Activation
const cstMessageAntidoteInactif = Tr("Antidote n’est pas activé","");
const cstExplicationAntidoteInactif = Tr("Veuillez effectuer l’activation d’Antidote puis essayer à nouveau pour permettre la correction des courriels. (Anti-Oups!)","");

//Compatibilité
const cstMessageConnecteurIncompatible = Tr("Le Connecteur Antidote installé dans ce logiciel est incompatible avec l’application Antidote installée sur le disque dur.","");
const cstExplicationConnecteurIncompatible = Tr("Veuillez vous assurer d’utiliser la version la plus récente d’Antidote (menu Aide > Recherche de mise à jour), et que l’intégration dans votre logiciel est correctement effectuée (menu Aide > Utilisation dans vos logiciels).","");
const cstMessageAgentAntidoteIncompatible = Tr("L’Agent Antidote en exécution est incompatible.","");
const cstMessageAgentAntidoteIncompatibleConnectix = Tr("L’Agent Antidote en exécution est incompatible avec l’application Connectix.")
const cstExplicationAgentAntidoteIncompatible = cstExplicationConnecteurIncompatible;

//GoogleDoc
const cstMessageAlerteGoolgeDocs = Tr("Intégration d’Antidote dans Google Documents","");
const cstExplicationAlerteGoolgeDocs = Tr("Pour qu’Antidote puisse accéder à Google Documents, Google doit vous demander votre autorisation.","");
const cstExplicationAlerteInstallationGoolgeDocs = Tr("Pour qu’Antidote puisse accéder à Google Documents, vous devez installer le module complémentaire d’Antidote à partir du Chrome Web Store.","");
const cstMessageAlerteGoolgeDocsPasSupporte = Tr("Impossible de communiquer avec Antidote","");
const cstExplicationAlerteGoolgeDocsPasSupporte = Tr("Antidote s’intègre seulement à l’application «traitement de texte» de Google Documents.","");

//Anti-Oups!
const cstMessageAntiOupsPasAnalyse = Tr("L’Anti-Oups! n’a pas pu analyser votre courriel.","");
const cstQuestionEnvoi = Tr("Voulez-vous tout de même l’envoyer?","");		
const cstMessageAntiOupsInactif =  Tr("L’Anti-Oups! est inactif.","");
const cstQuestionEnvoi2 = Tr("Voulez-vous tout de même envoyer votre courriel?","");

//Mozilla
const cstExplicationErreurRequeteMozilla = Tr("Veuillez sauvegarder votre document, puis actualiser la page ou relancer l’application, avant de refaire la requête.","");
const cstExplicationErreurNonSupportMozilla = Tr("Cette application n’est pas prise en charge.","");
const cstExplicationExplicationNonSupportMozilla = Tr("Pour plus d’informations sur les applications prises en charge par Antidote, veuillez consulter","");
const cstCodeAppelAntidoteImpossibleFirefox = "6051";

//safari
const cstExplicationAppelAntidoteImpossibleSafari = Tr("L’exécution de la commande est annulée.","");
const cstSolution1AppelAntidoteImpossible = "<B>Solution 1 :</B>";
const cstSolution11AppelAntidoteImpossible = Tr("1. Pour rétablir la communication, veuillez lancer Antidote à partir du menu « Dock » puis essayer à nouveau.","");
const cstSolution2AppelAntidoteImpossible = "<B>Solution 2 :</B>";
const cstSolution22AppelAntidoteImpossible = Tr("2. Si la communication n’est pas rétablie, veuillez quitter Safari, relancer Safari puis essayer à nouveau.","");
const cstCodeAppelAntidoteImpossibleSafari = "6012";

//chrome
const cstExplicationAppelAntidoteImpossibleChrome = Tr("L’exécution de la commande est annulée. Veuillez essayer à nouveau.","");
const cstCodeAppelAntidoteImpossibleChrome = "6011";

const cstMessagePatiencePourCommunication = Tr("Veuillez patienter pendant que Google Chrome établit une communication avec Antidote.","");
const cstExplicationPatiencePourCommunication = "";

const cstPopupAntidoteCorrecteurGC = Tr("Correcteur d’Antidote","");
const cstPopupAntidoteDictGC = Tr("Dictionnaires d’Antidote","");
const cstPopupAntidoteGuidesGC = Tr("Guides d’Antidote","");
const cstOptionConfigExtGC = Tr("Réglages du Connecteur Antidote","");
const cstOptionConnecteurGC = Tr("Connecteur","");
const cstOptionMenuContextGC = Tr("Menu contextuel","");
const cstOptionMenuAntidoteGC = Tr("Menu « Antidote »","");
const cstOptionMenuCorrecteurGC = Tr("Menu « Correcteur »","");
const cstOptionMenuDictGC = Tr("Menu « Dictionnaires »","");
const cstOptionMenuGuidesGC = Tr("Menu « Guides »","");
const cstOptionAppliquerGC = Tr("Appliquer","");
const cstOptionRaccourciTitre = Tr("Raccourcis-clavier","");
const cstOptionRaccourciLabel = Tr("Activer les raccourcis-clavier","");
const cstOptionReinitTitre = Tr("Remettre les valeurs par défaut","");
const cstOptionReinitBouton = Tr("Remettre les valeurs par défaut","");

const cstBoutonsAntidote = Tr("Boutons d’Antidote","");

const cstExtensionPerimeeAvertissement = Tr("Avertissement","");
const cstExtensionPerimeeTitrePluriel = Tr("Anciens connecteurs détectés","");
const cstExtensionPerimeeTitre = Tr("Ancien connecteur détecté","");
const cstExtensionPerimeeMessage = Tr("Un ancien Connecteur Antidote a été détecté. Il est fortement conseillé de le supprimer.","");
const cstExtensionPerimeeMessage2 = Tr("Ancien connecteur à supprimer : ","");
const cstExtensionPerimeeMessagePluriel = Tr("D’anciens connecteurs d’Antidote ont été détectés. Il est fortement conseillé de les supprimer.","");
const cstExtensionPerimeeMessage2Pluriel = Tr("Ancien connecteur à supprimer : ","");
const cstExtensionPerimeeAutorisation = Tr("Quand vous cliquerez sur «Supprimer», Google Chrome vous demandera votre autorisation.","");
const cstExtensionPerimeeBouton = Tr("Supprimer","");


//messages généraux
const cstCodeErreur = Tr("Code d’erreur","");
const cstMessageAntidotePasMAJ = Tr("Antidote ne peut exécuter la requête.","");
const cstMessageAppelAntidoteImpossible = Tr("Impossible de communiquer avec Antidote","");
const cstExplicationAntidotePasMAJ = Tr("Ce connecteur requiert qu’une version d’Antidote plus récente soit installée.","");
const cstInfoAntidotePasMAJ = Tr("Pour plus d’informations sur les mises à jour d’Antidote, veuillez consulter","");
const cstDernierChoisi = Tr("Dernier choisi","dernier dictionnaire ou guide choisi");


//site
const cstSiteErreurSupportMozilla = "<a href='https://www.antidote.info' target='_blank'>https://www.antidote.info</a>";
const cstSiteAntidotePasMAJ  = "<a href='https://www.druide.com/maj.html' target='_blank'>https://www.druide.com/maj.html</a>";

//Automatisation
const cstMessageAccepteAutomatisationConnectix = Tr("Certaines applications doivent automatiser l’application « Connectix » pour interagir avec Antidote.","");
const cstExplicationAccepteAutomatisationConnectix  = Tr("Souhaitez-vous afficher la procédure permettant d’activer l’automatisation de l’application « Connectix »?","");

//anti-oups!
const cstNomBoutonAnnuler = Tr("Annuler","");
const cstNomBoutonPoursuivre = Tr("Poursuivre","");
const cstNomBoutonOui = Tr("Oui","");
const cstNomBoutonNon = Tr("Non","");
const cstNomBoutonPoursuivreEnvoi = Tr("Poursuivre l’envoi","");
const cstNomBoutonActiver = Tr("Activer","");
const cstNomBoutonCorriger = Tr("Corriger","");
const cstExplicationCorrectionImpossible = Tr("Il n’est pas possible de corriger votre courriel. (Anti-Oups!)","");
const cstMessagePatienceLanceAntidote = Tr("Lancement d’Antidote…","");
const cstExplicationPatienceLanceAntidote = Tr("(Anti-Oups!)","");
const cstAntiOups = Tr("Anti-Oups!","");
const cstMessageAntiOupsPJManquante = Tr("Il semble manquer un document à joindre.","");
const cstExplicationAntiOupsPJManquante = Tr("Votre message semble faire référence à une pièce jointe : « {1} ». (Anti-Oups!)", "L'argument est du texte");
const cstExplicationAntiOupsPJManquante_2 = "L’argument est du texte";
const cstMessageAntiOupsRecorrection = Tr("Le message a été modifié depuis sa correction","");
const cstExplicationAntiOupsRecorrection = Tr("Souhaitez-vous qu’Antidote le revérifie? (Anti-Oups!)","");
const cstMessageAgentAntidoteInaccessible = Tr("L’agent d’Antidote n’est pas disponible","");
const cstMessageLibLingPasChargee = Tr("L’initialisation de l’Anti-Oups! n’est pas terminée","");
const cstMessageAntidoteIntrouvable = Tr("L’application Antidote est introuvable","");
const cstMessageAucuneInterventionRequise = Tr("Aucune intervention requise","");
const cstMessageErreurDernierEnvoi = Tr("Une erreur avec l’Anti-Oups! s’est produite au dernier envoi de courriel.","");
const cstExplicationErreurDernierEnvoi = Tr("Souhaitez-vous désactiver l’Anti-Oups! jusqu’à la fermeture de votre courrielleur?","");
const cstCodeAppelAntidoteImpossibleThunderbird =  "6061";
const cstMessageConfigAntiOupsModifiay = Tr("La configuration de l’Anti-Oups! a été modifiée depuis la dernière utilisation","");
const cstMessageErreurLancementAntidote = Tr("Une anomalie a été observée au dernier lancement d’Antidote","");
const cstMessageVersionAntidoteIncompatible	= Tr("La version d’Antidote utilisée n’est pas compatible avec celle de l’Anti-Oups!","");
const cstExplicationDesactiveAntiOups = Tr("L’Anti-Oups! sera désactivé durant cette session.","");
const cstOptionTraiteSignatureLabel = Tr("Corriger la signature",""); 
const cstMessageAnalyse = Tr("Analyse…","");
const cstMessageEnvoi = Tr("Envoi du courriel","");
const cstMessageEnvoiMaintenant = Tr("Envoyer","");
const cstMessageEnvoiPlusTard = Tr("Envoyer plus tard","");
const cstThunderbirdOptionConnectix = Tr("Modifier l’option : application Connectix > Réglages / Options > Thunderbird > Avancé…","");

const cstChAntiOupsMessageInformationAnglaisInactif = Tr("L’Anti-Oups! pourrait vérifier l’anglais dans ce courriel","");
const cstChAntiOupsExplicationInformationAnglaisInactif	= Tr("Ce courriel contient de l’anglais (« {1} »). Ajoutez le Module Anglais à votre Antidote, et l’Anti-Oups! pourra analyser le texte anglais afin d’en vérifier l’orthographe et de signaler une éventuelle pièce jointe oubliée.","")
const cstChAntiOupsMessageInformationFrancaisInactif = Tr("L’Anti-Oups! pourrait vérifier le français dans ce courriel","")
const cstChAntiOupsExplicationInformationFrancaisInactif	= Tr("Ce courriel contient du français (« {1} »). Ajoutez le Module Français à votre Antidote, et l’Anti-Oups! pourra analyser le texte français afin d’en vérifier l’orthographe et de signaler une éventuelle pièce jointe oubliée.","")
const cstChBoutonNePlusAfficher	= Tr("Ne plus afficher","");
const cstChBoutonPlustard = Tr("Plus tard","");
const cstChBoutonEnSavoirPlus = Tr("En savoir plus…","");
const cstChAntiOupsAWebComm = Tr("Impossible de communiquer avec Antidote Web.","");
const cstChAntiOupsAWebVerif = Tr("Veuillez vérifier votre connexion internet.","");
const cstChAntiOupsAWebEchecAuth = Tr("Impossible de s’authentifier à Antidote Web.","");
const cstChAntiOupsAWebAuthNav = Tr("Veuillez lancer un navigateur et effectuer l’authentification sur antidote.app.","");
const cstChAntiOupsAWebErreur = Tr("Erreur inattendue de l’Anti-Oups!","");

const cstConnexionReussie = Tr("Connexion réussie","");

const cstMessageIntegrationIncomplete = Tr("L’intégration d’Antidote à {1} est incomplète.");
const cstMessageIntegrationIncomleteSolution = Tr("Veuillez lancer Connectix pour compléter l’intégration.");
const cstMessageAgentNonDispo = Tr("L’Agent Antidote n’est pas disponible.");
const cstMessageAgentNonDispoSolution = Tr("Pour rétablir la communication, veuillez relancer Connectix 12, puis réessayer.");

const cstMessageContenuNonAccessible = Tr("Le contenu du courriel est inaccessible.");

//GoogleDoc
const cstNomBoutonContinuer = Tr("Continuer","");
const cstModuleGDocMessagePopup = Tr("Veuillez <a href='{1}' target='_blank'>installer ou activer</a> le module complémentaire d’Antidote pour Google Documents.",""); 
//const cstModuleGDocMessagePopupAide = "https://www.antidote.info/{1}/doc/a11/inst/googledocs/installation.html"; 
const cstModuleGDocMessagePopupAide = "https://www.antidote.info/{1}/doc/a11/inst/mac/installation.html?donnees=eyJ0ZXh0ZXVycyI6WyJHb29nbGVEb2N1bWVudHMiXX0=";
const cstModuleGDocNonChromeMessagePopup = Tr("Page non compatible avec ce connecteur. Veuillez utiliser Google Chrome ou Antidote Web.","");

//Office 365 online
const cstMessageOffice365Online = Tr("Office 365 Online n'est pas supporté par le Connecteur Antidote. Veuillez copier le texte dans Antidote ou utiliser \"Corriger la sélection\" dans Connectix pour corriger.","");

//MAO
const cstMAOErreur = Tr("Antidote a détecté des erreurs.","");
const cstMAOPJ = Tr("Pièce jointe possiblement manquante.","");
const cstMAOOk = Tr("Antidote n’a pas détecté d’erreur.","");
const cstMAOSupprimeBouton = Tr("Supprimer le bouton.","");

const cstOptionMAOTexte = Tr("Détection d’erreurs","");
const cstOptionAntidoteLab1 = Tr("Antidote Lab! vous permet d’essayer de nouvelles fonctionnalités en développement.","");
const cstOptionAntidoteLab2 = Tr("Vous pouvez envoyer vos commentaires à","");

//Cross-Origin
const cstMessageAlerteCrossOrigin = Tr("Impossible d’accéder au texte","");
const cstExplicationAlerteCrossOrigin = Tr("La section encadrée en rouge est protégée. Pour en corriger le texte, copiez-collez-le dans une nouvelle fenêtre de correction ou utilisez la fonction <u>Corriger la sélection</u> de Connectix.","");
const cstExplicationConsulteFAQ	= Tr("Pour plus d’information, voir l’élément «Questions…» du menu «Aide» d’Antidote.","");
const cstCodeCrossOrigin = "6100";
const cstMessageDomaineWordPress = cstMessageAlerteCrossOrigin;
const cstExplicationDomaineWordPress = Tr("Des sections de la page Web ne permettent pas l’accès au texte. L’édition de ces sections nécessite l’ouverture d’une autre page Web. Souhaitez-vous ouvrir une page Web pour faciliter l’édition de ces sections?","");

//
const cstMessageConfirmerAWeb = Tr("Antidote n’est pas accessible localement","");
const cstExplicationConfirmerAWeb = Tr("Désirez-vous envoyer le document à Antidote Web?","");
const cstExplicationBasculeVersAWeb = Tr("Le prochain appel enverra le document vers Antidote Web.","");
const cstCodeAppelAntidoteInaccessible = "6080";
const cstOui = Tr("Oui","");
const cstNon = Tr("Non","");

//
const cstMessageEchecLancementAC =  Tr("Antidote est présentement indisponible","");
const cstExplicationEchecLancementAC = Tr("Veuillez le lancer manuellement.","");
const cstCodeEchecLancementAC = "echecLancementAgentConnectix";

//Mode incognito - Firefox seulement
const cstMessageIncognitoTitre = Tr("Navigation privée","");
const cstMessageIncognitoSolution =  Tr("Veuillez utiliser le menu contextuel.","");

const cstAWebNonConnectay = Tr("Se connecter","");
const cstAntidoteNonActivay = Tr("Activer","");

//DetecteurWeb
const cstDWDetecteurWeb = Tr("Correction Express","");
const cstDWPoursuivreCorrection = Tr("Poursuivre dans Antidote","");
const cstDWSupprimer = Tr("Désactiver pour ce champ","");
const cstDWReactiver = Tr("Réactiver pour ce champ","");
const cstDWExclure = Tr("Désactiver pour ce site","");
const cstDWInclure = Tr("Réactiver pour ce site","");
const cstDWReglageSite =  Tr("Activer pour ce site","");
const cstDWErreur = Tr("Volet Langue : 1 détection","");
const cstDWErreurs = Tr("Volet Langue : {1} détections","");
const cstDWOK = Tr("Antidote n’a pas détecté d’erreur","");
const cstDWRegalges = Tr("Réglages linguistiques","");
const cstDWDonneesPersonnelles = Tr("Données personnelles","");
const cstDWLanceCorrecteur = Tr("Correcteur d’Antidote","");
const cstDWDictionnaire = Tr("Dictionnaires d’Antidote","");
const cstDWAWebNonConnectay = Tr("Se connecter à","");
const cstDWAlerte = Tr("Plus de détections sur Antidote","");
const cstDWAfficheDetections = Tr("Afficher les détections","");
const cstDWReactivation = Tr("Réactiver","");
const cstSoumettreUneObservation = Tr("Soumettre une observation","");
const cstDWAfficheAlertes = Tr("Afficher les alertes", "");
const cstDWMessageTexteTropLong = Tr("Texte trop long.","");
const cstDWInactif = Tr("Inactif","");
const cstDWReecrit = Tr("Réécrit","");

//Reglages
const cstPopupAntidoteRegalge = Tr("Réglages du connecteur","");
const cstPopupAntidoteRegalgeBouton = Tr("Réglages","");
const cstReglagesMenuContextuelDescription = Tr("Veuillez choisir l’ouvrage qui apparaitra dans votre menu contextuel de ce navigateur.","");
const cstReglagesDetecteurWebDescription = Tr("Note: la Correction Express permet l’affichage des soulignés pour du volet <b>Langue</b> directement dans votre contexte d’écriture. Si vous utilisez Antidote Web, son accès (via Internet) est sécurisé.","");
const cstReglagesDecteurWebActivation = Tr("Activer la Correction Express","");
const cstReglagesDecteurWebDesactivation = Tr("Désactiver la Correction Express","");
const cstReglagesDetecteurWebListeExclusion = Tr("Aucune correction ne sera proposée pour les sites suivants :","");
const cstReglagesAntidoWebDescription = Tr("Lors d’un appel à Antidote Web, veuillez choisir le comportement désiré dans votre navigateur :","");
const cstReglagesAntiOupsDescription = Tr("Description Anti-Oups!: lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam nam voluptates in hic excepturi consectetur totam voluptatem asperiores, pariatur est error amet ducimus saepe beatae, aspernatur architecto maxime! Eligendi, ex!","");
const cstReglagesAideDescription = Tr("Pour plus d’informations, veuillez consulter le Guide d’utilisation, accessible depuis le menu Aide d’Antidote ou Connectix.","");
const cstReglagesLabDescription = Tr("Description Lab: lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam nam voluptates in hic excepturi consectetur totam voluptatem asperiores, pariatur est error amet ducimus saepe beatae, aspernatur architecto maxime! Eligendi, ex!","");
const cstReglagesAProposDescription = Tr(" ", "");
const cstReglagesCredit = Tr("Mentions légales", "");
const cstReglagesCreditDescription = Tr("Le Connecteur Antidote utilise des librairies provenant de tierces parties.", "");
const cstReglagesLab = "Lab!";
const cstReglagesAPropos = Tr("À propos","");
const cstReglagesAide = Tr("Aide","");
const cstReglagesDetecteurWeb = Tr("Correction Express","");
const cstReglagesAntidoWeb = Tr("Antidote Web","");
const cstOptionNouvelleFenetreAWeb = Tr("Ouvrir dans une nouvelle fenêtre","");
const cstOptionNouvelOngletAWeb = Tr("Ouvrir dans un nouvel onglet","");
const cstEtatConnectayAWeb = Tr("Antidote Web est connecté","");
const cstEtatDeconnectayAWeb = Tr("Antidote Web est déconnecté","");
const cstReglagesDWAntiOupsActivation = Tr("Activer l’Anti-Oups!","");
const cstReglagesDWAntiOupsDescription = Tr("Listes des sites","");
const cstReglagesDWAntiOupsAjout = Tr("Ajouter une adresse","");
const cstReglagesAvance = Tr("Avancé","");

//infobulle
const cstInfobulleCorriger = Tr("Corriger","");
const cstInfobulleRetablir = Tr("Rétablir","");
const cstInfobulleUniformiser = Tr("Uniformiser","");
const cstInfobulleSynonymes = Tr("Synonymes","");
const cstInfobulleSupprimer = Tr("Supprimer","");
const cstInfobulleAjouter = Tr("Ajouter","");
const cstInfobulleRemplacer = Tr("Remplacer","");
const cstInfobulleEditer = Tr("Éditer","");
const cstInfobulleReactiver = Tr("Réactiver","");
const cstInfobulleIgnorer = Tr("Ignorer","");
const cstInfobulleTaire = Tr("Taire","");
const cstInfobulleMotsProches = Tr("Mots proches","");
const cstInfobulleAjouterDicPerso = Tr("Ajouter le mot à un dictionnaire personnel","");
const cstInfobulleDetectPrecedente = Tr("Détection précédente","");
const cstInfobulleDetectSuivante = Tr("Détection suivante","");
const cstInfobulleAfficheArticle = Tr("Afficher l’article correspondant à cette détection","");
const cstInfobulleReformuler = Tr("Reformuler","");
const cstInfobulleCopier = Tr("Copier","");
const cstInfobulleInsertion = Tr("Insertion","");
const cstInfobulleTout = Tr("Tout","");

//Page installation / reglages
const cstInstallationTitre = Tr("Installation","");
const cstInstallationBienvenue = Tr("Bienvenue","");
const cstReglagesAntidoteDW = Tr("Utiliser Antidote selon les réglages","");
const cstUtiliser = Tr("Utiliser","");
const cstNomBoutonAller = Tr("Soumettre","");
const cstAConfirmer = Tr("À confirmer","");
const cstNonDisponible = Tr("non disponible","");
const cstOptionInvalide = Tr("Option invalide","");

//Page Mise à jour
const cstMajTitre = Tr("Le connecteur a été mis à jour.","");
const cstMajBienvenue = Tr("Mise à jour…","");

//Message erreur
const cstMessageRecharge = Tr("Le connecteur a besoin d’être rechargé","");
const cstBoutonRecharge = Tr("Recharger","");
const cstRechargePage = Tr("recharger la page","");

//Message beta
const cstTexteBeta = Tr("Bêta","");
const cstUrlAntidoteWeb = "https://antidote.app/";
const cstUrlAntidoteWebDomain = "antidote.app";
const cstUrlServicesDruideDomain = "services.druide.com";
const cstChaineNomFureteur = "MozillaWebExtension";
const cstMonFureteur = "AntidoteFirefox";
const cstNomProtocole = "AgentTexteurAntidote";

const cstTempsDeGeneration = "20241211 21:06::29";
