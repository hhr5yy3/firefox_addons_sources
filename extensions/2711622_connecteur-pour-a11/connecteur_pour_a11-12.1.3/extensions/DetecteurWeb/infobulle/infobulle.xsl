<?xml version="1.0" encoding="UTF-8" ?>
<!--Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. --><!-- Copyright 2024 Druide informatique inc. --><!-- auto-generated file -->


<xsl:stylesheet
				version="1.0"
				xmlns="http://www.w3.org/1999/xhtml"
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output
				method="xml"
				encoding="UTF-8"
				omit-xml-declaration="yes"/>

	<xsl:strip-space elements="*" />
	<xsl:preserve-space elements="ligne" />
	<xsl:variable name="plateforme" select="/*/@plateforme" />
	<xsl:variable name="prononciation_est_api" select="/*/prononciation/@est_api"/>

	<xsl:template name="img_chevron_detail">
		<xsl:param name="couleur_principal" select="'#1f66b1'"/>
		<svg
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:cc="http://creativecommons.org/ns#"
		xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
		xmlns:svg="http://www.w3.org/2000/svg"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
		xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
		class="svg_box chevron"
		width="65"
		height="55"
		viewBox="0 0 50 60"
		id="svg3336"
		version="1.1"
		inkscape:version="0.91 r13725"
		sodipodi:docname="chevronexterne_inkspape.svg">
		<defs
			id="defs3338" />
		<sodipodi:namedview
			pagecolor="#ffffff"
			bordercolor="#666666"
			borderopacity="1.0"
			inkscape:pageopacity="0.0"
			inkscape:pageshadow="2"
			inkscape:zoom="2.8284271"
			inkscape:cx="-3.1191947"
			inkscape:cy="84.285714"
			inkscape:document-units="px"
			inkscape:current-layer="layer1"
			showgrid="false"
			inkscape:window-width="1920"
			inkscape:window-height="1112"
			inkscape:window-x="1280"
			inkscape:window-y="1"
			inkscape:window-maximized="1" />
		<g
			inkscape:label="Calque 1"
			inkscape:groupmode="layer">
			<polyline
			class="texte"
			points="41,40 61,65 41,90"
			id="polyline3468"
			style="fill:none;stroke:{$couleur_principal};stroke-width:15"
			transform="matrix(1.0294598,0,0,1.0294598,-43.235084,-36.551212)" />
			<polyline
			class="texte"
			points="71,40 91,65 71,90"
			id="polyline3470"
			style="fill:none;stroke:{$couleur_principal};stroke-width:15"
			transform="matrix(1.0294598,0,0,1.0294598,-43.235084,-36.551212)" />
		</g>
		</svg>
	</xsl:template>

	<xsl:template match="*">
		<xsl:element name="{local-name()}">
			<xsl:apply-templates select="@* | node()" />
		</xsl:element>
	</xsl:template>

	<xsl:template match="@*">
		<xsl:attribute name="{local-name()}">
			<xsl:value-of select="."/>
		</xsl:attribute>
	</xsl:template>

	<xsl:template name="nnbsp">
		<span style="white-space:nowrap"> </span>
	</xsl:template>

	<xsl:template match="nnbsp">
		<xsl:call-template name="nnbsp"/>
	</xsl:template>

	<xsl:template match="/">
		<div id="contenu">
			<xsl:apply-templates/>
		</div>
	</xsl:template>

	<xsl:template match="infobulle">
		<xsl:choose>
		<xsl:when test="@reformulation">
				<xsl:attribute name="class">contenu-reformulation</xsl:attribute>
		</xsl:when>
		<xsl:when test="@reformulation-bloc">
				<xsl:attribute name="class">contenu-reformulation bloc</xsl:attribute>
		</xsl:when>
		<xsl:when test="@reformulation-bloc-mix">
				<xsl:attribute name="class">contenu-reformulation bloc-mix</xsl:attribute>
		</xsl:when>
		<xsl:when test="@reformulation-detection">
				<xsl:attribute name="class">contenu-reformulation detection</xsl:attribute>
		</xsl:when>
		<xsl:when test="@reformulation-detection-mix">
				<xsl:attribute name="class">contenu-reformulation detection-mix</xsl:attribute>
		</xsl:when>
		<xsl:otherwise></xsl:otherwise>
		</xsl:choose>
		<xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="graphie">
		<div class="graphie">
			<span class="texte">
				<xsl:apply-templates/>
			</span>
		</div>
	</xsl:template>

	<xsl:template match="ligne[@icone='oui']" priority="2">
		<div class="ligne">
			<span class="texte">
				<xsl:apply-templates/>
			</span>
		</div>
	</xsl:template>

	<xsl:template match="ligne[@indentation='oui']" priority="2">
		<div class="indentation">
			<span class="texte">
				<xsl:apply-templates/>
			</span>
		</div>
	</xsl:template>

	<xsl:template match="ligne[@mot_ignore='oui']" priority="2">
		<div class="ligne_mot_ignore">
			<span class="texte">
				<xsl:apply-templates/>
			</span>
		</div>
	</xsl:template>

	<xsl:template match="ligne">
		<div>
			<span class="texte">
				<xsl:apply-templates/>
			</span>
		</div>
	</xsl:template>

	<xsl:template match="ligne/text()[preceding-sibling::liste_def_courte or preceding-sibling::liste_faux_amis]">
		<div class="texte_ligne">
			<span class="texte">
				<xsl:value-of select="."/>
			</span>
		</div>
	</xsl:template>

	<xsl:template match="titre[@perso='oui']" priority="2">
		<span class="titre_perso">
			<xsl:apply-templates/>
		</span>
	</xsl:template>

	<xsl:template match="titre">
		<span class="inactif">
			<xsl:apply-templates/>
		</span>
	</xsl:template>

	<xsl:template match="lien_dico">
		<a>
			<xsl:attribute name="class">dictionnaires</xsl:attribute>
			<xsl:choose>
				<xsl:when test="@fragment">
					<xsl:attribute name="href">#</xsl:attribute>
					<xsl:attribute name="onclick">executerAntiinfobulle(event, 'afficherDicosSelonFragment', {'fragment': '<xsl:value-of select="@fragment"/>', 'idMot': '<xsl:value-of select="@idMot"/>', 'idMotFlexion': '<xsl:value-of select="@idMotFlexion"/>', 'ouvrage': '<xsl:value-of select="@ouvrage"/>'});</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="href">#</xsl:attribute>
					<xsl:attribute name="onclick">executerAntiinfobulle(event, 'afficherDicosSelonMotCourant', {'langue': '<xsl:value-of select="@langue"/>', 'ouvrage': '<xsl:value-of select="@ouvrage"/>'});</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:apply-templates/>
		</a>
	</xsl:template>

	<xsl:template match="lien_guide">
		<a>
			<xsl:attribute name="class">article</xsl:attribute>
			<xsl:attribute name="href">#</xsl:attribute>
			<xsl:attribute name="onclick">executerAntiinfobulle(event, 'afficherGuides', {'langue': '<xsl:value-of select="@langue"/>', 'idArticle': '<xsl:value-of select="@idArticle"/>'});</xsl:attribute>
			<xsl:apply-templates/>
		</a>
	</xsl:template>

	<xsl:template match="lien_reglage">
		<a>
			<xsl:attribute name="class">lien_reglage</xsl:attribute>
			<xsl:attribute name="href">#</xsl:attribute>
			<xsl:choose>
				<xsl:when test="@reglage">
					<xsl:attribute name="onclick">executerAntiinfobulle(event, 'afficherReglages', {'langue': '<xsl:value-of select="@langue"/>', 'reglage': '<xsl:value-of select="@reglage"/>'});</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="onclick">executerAntiinfobulle(event, 'afficherReglages', {'langue': '<xsl:value-of select="@langue"/>', 'idPanneau': '<xsl:value-of select="@idPanneau"/>'});</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:apply-templates/>
		</a>
	</xsl:template>

	<xsl:template match="lien_alerte_perso">
		<a>
			<xsl:attribute name="class">lien_reglage</xsl:attribute>
			<xsl:attribute name="href">#</xsl:attribute>
			<xsl:attribute name="onclick">executerAntiinfobulle(event, 'afficherAlertesPerso', {'identAlerte': '<xsl:value-of select="@identAlerte"/>', 'identDico': '<xsl:value-of select="@identDico"/>'});</xsl:attribute>
			<xsl:apply-templates/>
		</a>
	</xsl:template>

	<xsl:template match="separateur_guide">
		<span class="article"> – </span>
	</xsl:template>

	<xsl:template match="separateur_dico">
		<span class="dictionnaires"> – </span>
	</xsl:template>

	<xsl:template match="separateur_perso">
		<span class="titre_perso"> – </span>
	</xsl:template>

	<xsl:template match="separateur_inactif">
		<span class="inactif"> – </span>
	</xsl:template>

	<xsl:template match="lien_mot">
		<a class="lien_mot">
			<xsl:attribute name="href">#</xsl:attribute>
			<xsl:attribute name="onclick">executerAntiinfobulle(event, 'afficherDicosSelonFragment', {'fragment': '<xsl:value-of select="@id"/>', 'idMot': '<xsl:value-of select="@idMot"/>', 'idMotFlexion': '<xsl:value-of select="@idMotFlexion"/>', 'ouvrage': 'definitions'});</xsl:attribute>
			<xsl:apply-templates/>
		</a>
	</xsl:template>

	<xsl:template match="rupture">
		<span>
			<xsl:attribute name="style">color:#d04437;</xsl:attribute>
			<xsl:apply-templates/>
		</span>
	</xsl:template>

	<xsl:template match="lien_rupture">
		<a>
			<xsl:attribute name="class">article chevron_detail</xsl:attribute>
			<xsl:attribute name="href">#</xsl:attribute>
			<xsl:attribute name="onclick">executerAntiinfobulle(event, 'afficherGuides', {'langue': '<xsl:value-of select="@langue"/>', 'idArticle': '<xsl:value-of select="@idArticle"/>'});</xsl:attribute>
			<xsl:apply-templates />
				<xsl:call-template name="img_chevron_detail">
					<xsl:with-param name="couleur_principal" select="'#D98C00'"/>
				</xsl:call-template>
		</a>
	</xsl:template>

	<xsl:template match="liste[@type='marque']">
		<span class="marque">
			<xsl:apply-templates /><xsl:text> –</xsl:text>
		</span>
	</xsl:template>

	<xsl:template match="marque">
		<span class="{@type}">
			<xsl:apply-templates />
		</span>
		<xsl:if test="following-sibling::node()[position()=1 and name()='marque']">, </xsl:if>
	</xsl:template>

	<xsl:template match="font">
		<span>
			<xsl:attribute name="style">color:<xsl:value-of select="@color" /></xsl:attribute>
			<xsl:apply-templates/>
		</span>
	</xsl:template>

	<xsl:template match="def_courte | faux_ami | impropre">
		<xsl:variable name="nom_noeud" select="name(.)" />
		<xsl:apply-templates/>
		<xsl:choose>
			<xsl:when test="ancestor::alerte_cooc"></xsl:when>
			<xsl:when test="count(following-sibling::node()[name()=$nom_noeud])&gt;1">, </xsl:when>
			<xsl:when test="count(following-sibling::node()[name()=$nom_noeud])=1"> ou </xsl:when>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="liste_def_courte | liste_faux_amis | liste_impropre">
		<ul>
			<xsl:choose>
			<xsl:when test="(name(.) = 'liste_def_courte' and count(def_courte)>0) or (name(.) = 'liste_faux_amis' and count(faux_ami)>0) or (name(.) = 'liste_impropre' and count(impropre)>0)">
				<xsl:apply-templates/>
			</xsl:when>
			<xsl:otherwise>
				<li><span class="texte"><xsl:apply-templates/></span></li>
			</xsl:otherwise>
			</xsl:choose>
		</ul>
	</xsl:template>

	<xsl:template match="liste_faux_amis//faux_ami | liste_impropre//impropre | liste_def_courte//def_courte" priority="2">
		<li>
			<span class="texte">
				<xsl:apply-templates/>
			</span>
		</li>
	</xsl:template>

	<xsl:template match="contexte"><span class="note_contexte"> (<xsl:apply-templates/>)</span></xsl:template>

	<xsl:template match="equiv"><span class="note_equiv"><xsl:apply-templates/></span></xsl:template>

	<xsl:template match="ex"><span class="note_exemple"> (<span class="contenu_note_exemple"><xsl:apply-templates/></span>)</span></xsl:template>

	<xsl:template match="pas-ex"><span class="pas_note_exemple"><xsl:apply-templates/></span></xsl:template>

	<xsl:template match="phon-libre">«<xsl:call-template name="nnbsp"/><span class="note_phon_libre"><xsl:apply-templates/></span><xsl:call-template name="nnbsp"/>»</xsl:template>
	<xsl:template match="sens"><span class="note_sens"><xsl:apply-templates/></span></xsl:template>

	<xsl:template match="expr"><span class="note_expr"><xsl:apply-templates/></span></xsl:template>
	<xsl:template match="expr-ref"><span class="note_exprref"><xsl:apply-templates/></span></xsl:template> 
	<xsl:template match="expr-second"><span class="note_exprsecond"><xsl:apply-templates/></span></xsl:template>

	<xsl:template match="critiquay"><span class="note_critiquay"><xsl:apply-templates/></span></xsl:template>
	<xsl:template match="anglic"><span class="note_anglic"><xsl:apply-templates/></span></xsl:template>
	<xsl:template match="etym"><span class="note_etym"><xsl:apply-templates/></span></xsl:template>
	<xsl:template match="car"><span class="note_car"><xsl:apply-templates/></span></xsl:template>

		<xsl:template match="contenu_long">
		<span>
			<div class="contenu_long" style="display: none;">
				<span class="texte"><xsl:apply-templates/></span>
			</div>
			<a>
				<xsl:attribute name="texte-montrer"><xsl:value-of select="@texte-montrer" /></xsl:attribute>
				<xsl:attribute name="texte-cacher"><xsl:value-of select="@texte-cacher" /></xsl:attribute>
				<xsl:attribute name="class">devoilement fermay</xsl:attribute>
				<xsl:attribute name="href">#</xsl:attribute>
				<xsl:attribute name="onclick">executerAntiinfobulle(event, 'devoiler', {'noeud': this});</xsl:attribute>

				<xsl:value-of select="@texte-montrer" />
			</a>
		</span>
	</xsl:template>

	<xsl:template match="phon">
		<xsl:choose>
			<xsl:when test="@phon_maison=1 and $prononciation_est_api=0">
				<span>[<xsl:apply-templates/>]</span>
			</xsl:when>
			<xsl:when test="@phon_maison=0 and $prononciation_est_api=1">
				<span>[<xsl:apply-templates/>]</span>
			</xsl:when>
			<xsl:when test="not(@phon_maison)">
				<span>[<xsl:apply-templates/>]</span>
			</xsl:when>
			<xsl:otherwise>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="section_exemples">
		<div class="section_exemples">
			<ul class="liste_exemples">
				<xsl:apply-templates />
			</ul>
		</div>
	</xsl:template>

	<xsl:template match="texte_exemple">
		<li>
			<xsl:choose>
				<xsl:when test="@type='negatif'">
					<span class="puce_exemple">
						<svg id="b" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 130 125"><path d="M65,7.5c-30.3757,0-55,24.6243-55,55s24.6243,55,55,55,55-24.6243,55-55S95.3757,7.5,65,7.5ZM91.9218,82.3826c1.9411,1.941,1.9411,5.0881,0,7.0292s-5.0881,1.9411-7.0292,0l-19.9114-19.9114-19.8876,19.8876c-1.941,1.941-5.0882,1.941-7.0292,0s-1.9411-5.0882,0-7.0292l19.8876-19.8876-19.8876-19.8876c-1.9411-1.941-1.9411-5.0882,0-7.0292,1.941-1.9411,5.0881-1.9411,7.0292,0l19.8876,19.8876,19.9114-19.9114c1.941-1.9411,5.0882-1.9411,7.0292,0,1.9411,1.941,1.9411,5.0881,0,7.0292l-19.9114,19.9114,19.9114,19.9114Z" fill="#b3b3b3" stroke-width="0"/></svg>
					</span>
				</xsl:when>
				<xsl:when test="@type='positif'">
					<span class="puce_exemple">
						<svg id="a" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 130 125"><path d="M64.1735,8.8166c-30.3757,0-55,24.6243-55,55s24.6243,55,55,55,55-24.6243,55-55S94.5491,8.8166,64.1735,8.8166ZM95.5843,47.0059c-7.2414,5.9247-13.1586,11.842-19.0731,19.0706-5.5723,6.9653-10.7144,14.8499-14.4669,22.355-1.0329,2.0659-2.9314,3.4897-5.3323,3.4897-1.9194,0-4.4216-1.6682-5.277-3.3889-1.6163-2.6938-3.2554-4.8793-7.0932-9.6912-2.5978-2.5978-8.8135-8.1122-12.2513-10.8742-2.5392-2.5392-2.9105-6.0402-.7655-8.6619,2.0799-2.5421,5.895-2.7962,8.7725-.8676.1223.1019,4.6573,3.8278,6.0963,5.0467,1.0921.925,2.0724,1.7786,2.9761,2.5957,1.9579,1.7703,3.5217,3.3387,4.6099,4.6541l.2763.2839c.2872.3026.6215.6755,1.1306,1.2488.441.4874.8237.8765,1.1769,1.1855l.4284.3408,1.5002-2.5721c2.2778-3.7631,4.7122-7.2974,7.2841-10.5399l2.6169-3.1428c3.9689-4.8508,10.6954-11.5947,20.1965-20.2566.2184-.199.4516-.3813.6974-.5452,2.6927-1.795,6.3307-1.0674,8.2193,1.7863,1.6223,3.2446.8679,6.7653-1.7221,8.4833Z" fill="#b3b3b3" stroke-width="0"/></svg>
					</span>
				</xsl:when>
			</xsl:choose>
			<span class="texte_exemple">
				<xsl:apply-templates />
			</span>
		</li>
	</xsl:template>

		<xsl:template match="texte_reformulation">
		<span>
			<xsl:choose>
				<xsl:when test="@ajout">
					<xsl:attribute name="class"><xsl:value-of select="name(@ajout)"/></xsl:attribute>
				</xsl:when>
				<xsl:when test="@suppression">
					<xsl:attribute name="class"><xsl:value-of select="name(@suppression)"/></xsl:attribute>
				</xsl:when>
				<xsl:when test="@grisay">
					<xsl:attribute name="class"><xsl:value-of select="name(@grisay)"/></xsl:attribute>
				</xsl:when>
				<xsl:when test="@grisay-barray">
					<xsl:attribute name="class"><xsl:value-of select="name(@grisay-barray)"/></xsl:attribute>
				</xsl:when>
				<xsl:when test="@statistique">
					<xsl:attribute name="class"><xsl:value-of select="name(@statistique)"/></xsl:attribute>
				</xsl:when>
			</xsl:choose>
			<xsl:apply-templates />
		</span>
	</xsl:template>

		<xsl:template match="demande_reformulation">
		<div class="reformulation-infobulle chargement">
			<div class="reformulation-contenu">
				<div class="ligne_chargement"><xsl:comment></xsl:comment></div>
				<div class="ligne_chargement"><xsl:comment></xsl:comment></div>
				<div class="ligne_chargement"><xsl:comment></xsl:comment></div>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="lien_audio">
		<a class="lien_prononciation">
			<xsl:attribute name="href">#</xsl:attribute>
			<xsl:attribute name="onclick">executerAntiinfobulle(event, 'jouerPrononciation', {'urlFichier': '<xsl:value-of select="."/>'});</xsl:attribute>
			<xsl:call-template name="icone_prononciation"/>
		</a>
	</xsl:template>

	<xsl:template name="icone_prononciation">
		<svg class="icone_prononciation" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet">
			<g id="prononciation16x16" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<g id="Group" transform="translate(1.000000, 1.000000)">
					<g id="Group-2" transform="translate(10.000000, 2.000000)">
						<rect id="Rectangle" x="0" y="2" width="1" height="6" rx="0.5"></rect>
						<rect id="Rectangle" x="2.04081633" y="0" width="1" height="10" rx="0.5"></rect>
						<rect id="Rectangle" x="4.08163265" y="3" width="1" height="4" rx="0.5"></rect>
					</g>
					<path d="M0,4.79609143 L0,9.20390857 C2.00262548e-17,9.36743535 0.132564648,9.5 0.296091429,9.5 L3.5,9.5 L3.5,9.5 L7.49454031,13.4945403 C7.61017121,13.6101712 7.79764593,13.6101712 7.91327683,13.4945403 C7.96880474,13.4390124 8,13.3637004 8,13.2851721 L8,0.714827943 C8,0.551301162 7.86743535,0.418736514 7.70390857,0.418736514 C7.62538024,0.418736514 7.55006823,0.449931771 7.49454031,0.505459686 L3.5,4.5 L3.5,4.5 L0.296091429,4.5 C0.132564648,4.5 -1.86559709e-16,4.63256465 0,4.79609143 Z" id="Path-2" stroke-width="0.9" stroke-linejoin="round" fill-rule="nonzero"></path>
				</g>
			</g>
		</svg>
	</xsl:template>

	</xsl:stylesheet>
