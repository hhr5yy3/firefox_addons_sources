//File for set login buttons style

window.quickLoginStyles = {
    "www.amocrm.ru": {
        styles: {
            a: 'color:white;',
            wrapper: 'font-size:12px'
        },
        classLists: {
            button: ['form_auth__button_create-new']
        }
    },
    "my.life-pos.ru": {
        styles: {
            button: `
                background: #244a9a;
                border: none;
                outline: none;
                border-radius: 4px;
                width: 320px;
                height: 36px;
                font-family: Roboto;
                font-size: 14px;
                font-weight: 400;
                color: #fff;
                text-decoration: none solid #fff;
                line-height: 36px;
                letter-spacing: 1px;
                text-transform: uppercase;
                text-align: center;`
        }
    },
    "smsc.ru": {
        styles: {
            wrapper: `font-size: 14px;`,
            button: `
                min-width: 230px;
                width: 100%;
                background: initial;`
        }
    },
    "id.tinkoff.ru": {
        styles: {
            select: `width:400px;`,
            button: `
                min-width: 230px;
                width:400px;`
        },
        classLists: {
            button: ['ui-button']
        }
    },
    "wizzair.com": {
        classLists: {
            button: ['base-button', 'base-button--medium', 'base-button--primary']
        }
    },
    "www.ryanair.com": {
        classLists: {
            button: ['auth-submit__button', 'ry-button--full', 'ry-button--flat-yellow']
        }
    },
    "partner.intui.travel": {
        classLists: {
            button: ['button-01']
        }
    },
    "interlux.by": {
        styles: {
            wrapper: `position: absolute;left: 30%;top: 15%;`}
    },
    "easytour.club": {
        styles: {
            select: `border: solid 1px;`,
            button: `
                border: solid 1px;;`
        }
    },
    "openru.ru": {
        styles: {
            wrapper: `min-width: 100%;`
        }
    },
    "education.fstravel.com": {
        classLists: {
            button: ['button']
        }
    },
    "fstravel.com": {
        donNotChangeSiteForm: true,
        formSelector: ".popup-auth-new form",
        userNameSelector: "input#email",
    },
    "agentb2b.fstravel.com": {
        classLists: {
            button: ['new-button__primary']
        },
        userNameSelector: 'input[type="login"], input[type="text"]',
        passwordSelector: 'input[type="password"]',
    },
    "www.i-travel.com.ua": {
        donNotChangeSiteForm: true,
        styles: {
            button: `line-height: 24px;padding:8px;font-size:14px;`,
            wrapper: `padding:0;`
        }
    },
    "online.adriatic-travel.com.ua": {
        donNotChangeSiteForm: true,
        styles: {
            wrapper: `padding:0;`
        },
        formSelector: "#loginbox"
    },
    "tangotravel.com.ua": {
        donNotChangeSiteForm: true,
        styles: {
            wrapper: `margin:0 10% 0 10%;width:100%`
        },
        classLists: {
            button: ['button', 'background-blue']
        },
        userNameSelector: "input#login",
        isQuickLoginAsyncFormAction: true
    },
    "www.cruclub.ru": {
        isQuickLoginAsyncFormAction: false,
        donNotChangeSiteForm: true,
        styles: {
            wrapper: 'position: fixed;top:20px; right: 20px;'
        }

    },
    "gettransfer.com": {
        formSelector: "#loginbox"
    },
    "62.80.167.250": {
        formSelector: "div#Login",
        userNameSelector: "input#c_login",
        loginButtonSelector: 'input#cmdLogin',
        styles: {
            wrapper: `position:absolute;top:60px;right:0`
        },
    },
    "floriantravel.com": {
        isQuickLoginAsyncFormAction: true,
        userNameSelector: "#loginModal input#textToLogin",
        formSelector: "#loginModal .loginFormNew",
        loginButtonSelector: "#loginModal #buttonLogin button",
        styles: {
            button: `background: #4E8FF5;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 100px;
            border: none;
            color: #FFF;
            width: 300px;
            padding: 5px 0px;`,
            a: `color: white;`,
            label: `color: white;`
        }
    },
    "master.tour-platform.ru": {
        isQuickLoginAsyncFormAction: true,
        loginButtonSelector: ".login-btn"
    } ,
    "petrotour.ru": {
        isQuickLoginAsyncFormAction: true,
        formSelector: ".popup_visible .auth-agent__form",
        userNameSelector: '.popup_visible [name="login1"]',
        passwordSelector: '.popup_visible [name="password"]',
        loginButtonSelector: ".popup_visible button.auth-agent__button"
    },
    "vand.ru": {
        donNotChangeSiteForm: true,
        isQuickLoginAsyncFormAction: true,
        loginButtonSelector: "#modal-login .btn-login",
        formSelector: "#modal-login",
        styles: {
            wrapper: 'max-width: 300px;margin:auto; background-color:rgb(33 104 93)'
        },
    },
    "www.321.by": {
        donNotChangeSiteForm: true,
        isQuickLoginAsyncFormAction: true,
        loginButtonSelector: "#authButton a",
        formSelector: ".loginTab.tabAuth",
    },
    "www.goglobal.travel": {
        isQuickLoginAsyncFormAction: true,
        styles: {
            wrapper: ` position: absolute;top: 90px;right: 0px;font-size: 16px;background-color: rgb(184 134 11);`
        } ,
        loginButtonSelector: "#ImageButtonLogin",
    },
    "travel-bs.ru": {
        isQuickLoginAsyncFormAction: true,
        styles: {
            wrapper: `margin: 0 0 0 0`
        }
    },
    "book.r-express.ru": {
        isQuickLoginAsyncFormAction: true,
        donNotChangeSiteForm: true,
        loginButtonSelector: ".login__button",
        formSelector: ".login__wrap .login",
        userNameSelector: '.login__input[type="text"]',
        passwordSelector: '.login__input[type="password"]',
        classLists: {
            button: ['login__button']
        },
        styles: {
            wrapper: `max-width: 600px;`
        }
    },
    "aviator.pegast.su": {
        styles: {
            wrapper: `min-width: 260px;`
        }
    },
    "www.uiscom.ru": {
        loginButtonSelector: '.b-auth__button',
        styles: {
            button: `width: 100%;
                    background-color: #00a;
                    color: #fff0e6;
                    padding: 12px;
                    border-radius: 30px;
                    cursor:pointer;`
        }
    },
    "agency.clickvoyage.ru": {
        loginButtonSelector: 'input[value="Войти"]',
        formSelector: "#dialog-confirm",
        userNameSelector: 'input[name="checkEmail"]',
        passwordSelector: 'input[name="checkPwd"]',
        styles: {
            button: `    color: #fff;
                         height: 34px;
                         text-align: center;
                         border: medium none white;
                         border-radius: 3px;
                         background: rgb(70, 70, 70) none repeat scroll 0px 0px;
                         width: 297px;
                         color: #ffffff !important;
                         font-size: 18px !important;
                         cursor: pointer;`,
            wrapper: 'margin: 6px; backdrop-filter: blur(30px); min-width:100%',
            select: 'width: 50%'
        }
    },
    "avia-new.fstravel.com": {
        styles: {
            button: `    
            background-color: rgb(255, 225, 0);
            font-family: "Open Sans";
            border-radius: 4px;
            border: none;
            outline: none;
            line-height: 25px;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            padding: 8px 30.5px;
            cursor: pointer;
            position: relative;`
        }
    },
    "maldives-bonus.com": {
        classLists: {
            button: ['btn', 'btn--primary', 'custom-window__button']
        },
        donNotChangeSiteForm: true,
        styles: {
            wrapper: 'color:black'
        }
    },
    "www.maldives-bonus.com": {
        classLists: {
            button: ['btn', 'btn--primary', 'custom-window__button']
        },
        donNotChangeSiteForm: true,
        styles: {
            wrapper: 'color:black'
        }
    },
    "ti2.alfastrah.ru": {
        loginButtonSelector: '#button-1015-btnEl',
        isQuickLoginAsyncFormAction: true,
        formSelector: ".x-window",
        userNameSelector: 'input#__lform-inputEl',
        passwordSelector: 'input#__pform-inputEl',
        styles: {
            wrapper: 'position:fixed;bottom:100px;left:43%;background-color:white',
        }
    },
    "ti3.alfastrah.ru": {
        loginButtonSelector: 'button[type="submit"]',
        isQuickLoginAsyncFormAction: true,
        formSelector: "#login_form",
        userNameSelector: 'input[name="login"]',
        passwordSelector: 'input[name="password"]'
    },
    "www.ankor.ru": {
        loginButtonSelector: 'button[name="ss"]',
        formSelector: "[action=\"http://online.ankor.ru/auth.aspx\"]",
        userNameSelector: 'input#login',
        passwordSelector: 'input#password',
    },
    "breeze.ru": {
        styles: {
            wrapper: 'left: 276px; bottom: 80px;width: 240px; background-color: burlywood;position: relative;',
        }
    },
    "kareliagid.ru": {
        classLists: {
            button: ['btn', 'btn-primary']
        }
    },
    "doninturflot.com": {
        loginButtonSelector: '.bxmaker-authuserphone-login-btn',
        formSelector: ".bxmaker-authuserphone-login",
        userNameSelector: '.bxmaker-authuserphone-login-row input',
        passwordSelector: 'input[name="password_sms_code"]',
        isQuickLoginAsyncFormAction: true,
        styles: {
            button: `    min-width: 112px;
                          margin: 0 auto;
                          font-size: 15px;
                          font-weight: bold;
                          width: auto;
                          text-align: center;
                          display: inline-block;
                          padding: 7px 20px;
                          cursor: pointer;
                          background-color: #338eef;
                          border: 1px solid;
                          color: #ffffff;
                          background-position: center center;
                          background-repeat: no-repeat;
                          border-radius: 5px;
                          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;`
        }
    },
    "online.cts-tours.com": {
        loginButtonSelector: '#BtnLogin',
        formSelector: "#UpdatePanel1",
        userNameSelector: 'input#txtUserCode',
        passwordSelector: 'input#txtPass',
        classLists: {
            button: ['btn']
        }
    },
    "efrito.com": {
        classLists: {
            button: ['btn']
        },
        styles: {
            a: `    font-size: 0.75em;
                        text-decoration: underline;
                        color: #fff;
                        opacity: 0.75;`
        }
    },
    "api.ilvestour.co.th": {
        isQuickLoginAsyncFormAction: true,
        classLists: {
            button: ['btn', 'btn-success']
        }
    },
    "bountybali.com": {
        styles: {
            button: `width: initial`
        },
        isQuickLoginAsyncFormAction: true,
        userNameSelector: '[name="post_password"]',
        passwordSelector: '[name="post_password"]',
    },
    "online.cip-service.com": {
        formSelector: "#flashhoz",
        loginButtonSelector: '#btnLogin',
        userNameSelector: 'input#txtUserName',
        passwordSelector: 'input#txtPassword',
        classLists: {
            button: ['inputButtons']
        }
    },
    "online.btbtours.com": {
        formSelector: "form.form-signin",
        loginButtonSelector: '[data-sln-id="slnBtn_loginButton"]',
        userNameSelector: 'input#user',
        passwordSelector: 'input#password',
        donNotChangeSiteForm: true
    },
    "www.allinclusivecrm.com": {
        formSelector: "#js-auth-login-form",
        userNameSelector: '#js-auth-login-form [name="LoginForm[email]"]',
        passwordSelector: '#js-auth-login-form [name="LoginForm[password]"]',
        isQuickLoginAsyncFormAction: true,
        styles: {
            wrapper: "width:100%",
        },
        classLists: {
            button: ['btn', 'btn-primary', 'btn-block']
        }
    },
    "online.quinta.ru": {
        styles: {
            wrapper: "color:black;",
            button: "background-color: var(--primary-color); color: var(--white-color); padding: 10px 48px; font-size: 16px; margin-bottom: 4px;"
        },
        donNotChangeSiteForm: true
    },
    "lk.paylate.ru": {
        styles: {
            select: '   max-width: 290px;',
            button: `  background-color: rgb(255 66 110);
                        max-width: 290px;
                        border-radius: 24px;
                        border-style: none;
                        box-sizing: border-box;
                        color: #FFFFFF;
                        cursor: pointer;
                        display: inline-block;
                        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
                        font-size: 14px;
                        font-weight: 500;
                        height: 40px;
                        line-height: 20px;
                        list-style: none;
                        margin: 0;
                        outline: none;
                        padding: 10px 16px;
                        position: relative;
                        text-align: center;
                        text-decoration: none;
                        transition: color 100ms;
                        vertical-align: baseline;
                        user-select: none;
                        touch-action: manipulation;`
        },
        donNotChangeSiteForm: true
    },
    "online.ritz-tour.ru": {
        classLists: {
            button: ['btn', 'btn-primary']
        },
        styles: {
            wrapper: 'max-width: 290px; margin-left: 180px;',
            button: `padding: 0 12px `

        },
        donNotChangeSiteForm: true
    },
    "b2b.crystaltourism.vn": {
        classLists: {
            button: ['btn', 'btn-primary', 'samo-butt', 'btn-primary']
        }
    },
    "online.chinatravel.ru": {
        styles: {
            wrapper: `max-width: 250px;margin-left: 38%;`
        },
        classLists: {
            button: ['button', 'button--primary']
        }
    },
    "agent.tpg.ua": {
        formSelector: "#header_agent .is-open.t_drop-block.t_login-drop",
        userNameSelector: '#header_agent [name="username"]',
        passwordSelector: '#header_agent  [name="password"]',
        donNotChangeSiteForm: true,
        isQuickLoginAsyncFormAction: true
    },
    "agent.razlet.kg": {
        styles: {
            select: `border: 2px solid #bdbdbd;
                    border-radius: 10px;`
        },
        classLists: {
            button: ['button', 'button--small', 'button--bg_second-color']
        }
    },
    "www.flypgs.com": {
        userNameSelector: '#user-phone',
        passwordSelector: '#user-password',
        loginButtonSelector: '#submit-login-form',
        styles: {
            button: `   width: 100%;
                        background-color: #fdc33c;
                        color: inherit;
                        font-weight: inherit;
                        font-size: inherit;
                        border-radius: 8px;
                        border: none;
                        padding: 8px 0;
                        cursor: pointer;`
        },

    },
    "bookit.kg": {
        formSelector: '.user-login-form',
        userNameSelector: '[placeholder="123-456-789"]',
        passwordSelector: '[placeholder="1PGPES"]',
        classLists: {
            button: ['bi-btn', 'bi-btn-primary']
        },
        donNotChangeSiteForm: true,
        isQuickLoginAsyncFormAction: true,
        notHideInputs: true

    },
    "reservations.airarabia.com": {
        loginButtonSelector: '#btnLogin',
        userNameSelector: 'input#username_txt',
        passwordSelector: 'input#j_password',
        classLists: {
            button: ['loginButton']
        },
        styles: {
            wrapper: 'zoom:0.9',

        },
    },
    "book.robinson-travel.md": {
        classLists: {
            button: ['btn', 'btn-primary']
        }
    },
    "online.pandatur.md" :{
        loginButtonSelector: 'button.btn-primary.btn.btn-lg',
        classLists: {
            button: ['btn', 'btn-secondary']
        }
    },
    "x.novapress.com": {
        donNotChangeSiteForm: true,
        loginButtonSelector: '.xFormItem button',
        classLists: {
            button: ['xButton', 'xButton--primary', 'xButton--accent', 'xButton--size-l']
        }
    },
    "www.s7.ru": {
        classLists: {
            button: ['DS__Button__root','DS__Button__theme_b2c','DS__Button__size_large', 'DS__Button__block']
        }
    },
    "vk.com": {
        formSelector: '#index_login, form.vkc__EnterPasswordNoUserInfo__content',
        userNameSelector: '#index_email',
        passwordSelector: 'inpunt[data-undefined="null"]',
        loginButtonSelector: '.VkIdForm__signInButton',
        classLists: {
            button: ['FlatButton', 'FlatButton--primary', 'FlatButton--size-m']
        }
    },
    "id.vk.com": {
        formSelector: 'form.vkc__EnterPasswordNoUserInfo__content',
        userNameSelector: 'inpunt[data-undefined="null"]',
        passwordSelector: 'input[name="password"]',
        loginButtonSelector: 'button[type="submit"]',
        classLists: {
            button: ['vkuiButton', 'vkuiButton--sz-l']
        },
        isQuickLoginAsyncFormAction: true,
        notHideInputs: true
    },
    "gesh.ru": {
        classLists: {
            button: ['btn', 'btn-success']
        }
    },
    "rgs.virtusystems.ru": {
        formSelector: '#LoginTo'
    },
    "airastana.com": {
        formSelector: '[id*="NomadClub_NomadLoginPanel"] .nomad-club-box',
        donNotChangeSiteForm: true,
        classLists: {
            button: ['btn', 'btn-gold']
        },
        styles: {
            select: 'color:black;'
        },
        isQuickLoginAsyncFormAction: true,
        notHideInputs: true
    },
    "www.aeroflot.ru": {
        classLists: {
            button: ['main-module__button', 'main-module__button--lg']
        }
    },
    "agency.viasun.ru": {
        donNotChangeSiteForm: true,
        styles: {
            wrapper: 'max-width:250px;'
        },
    },
    "online.eline-tour.com.ua": {
        loginButtonSelector: 'button.btn.btn-primary.btn-lg',
        classLists: {
            button: ['btn', 'btn-primary']
        },
    },
    "bron.turmarketnn.com": {
        isQuickLoginAsyncFormAction: true,
        donNotChangeSiteForm: true,
        classLists: {
            button: ['btn', 'btn-primary']
        }
    },
    "erc.partners": {
        classLists: {
            button: ['btn', 'btn-primary']
        }
    },
    "crm.kareliagid.ru": {
        classLists: {
            button: ['btn', 'btn_primary']
        }
    },
    "lm.tourvisor.ru": {
        classLists: {
            button: ['button-component', 'button', 'button-contained', 'primary']
        },
    },
    "tour-ethno.ru": {
        formSelector: 'body .inner-content .all',
        userNameSelector: '#login',
        passwordSelector: '#password',
        loginButtonSelector: '.btn.btn-primary[tabindex]',
        classLists: {
            button: ['btn', 'btn-primary']
        }
    },
    "infoflot.com": {
        matchAllHostnames: true,
        userNameSelector: '[name="login"]',
        donNotChangeSiteForm: true,
        loginButtonSelector: 'button[class*="form__submit"]',
        styles: {
            button: `
                    background-color: var(--accent-brand-blue);
                    color: var(--text-white);
                    min-width: 159px;
                    min-height: 48px;
                    height: 48px;
                    padding: 14px 20px;
                    font: var(--typo-button-l);
                    letter-spacing: -.01em;
            `
        },
    },
    "online.travelhub.by": {
        classLists: {
            button: ['btn', 'submit-btn']
        },
        donNotChangeSiteForm: true,
        isQuickLoginAsyncFormAction: true,
    },
    "online.i-travel.com.ua": {
        donNotChangeSiteForm: true,
        formSelector: '#loginbox',
    },
    "b2b.globaldmc.ru": {
        userNameSelector: '#user',
        passwordSelector: '#password',
        donNotChangeSiteForm: true,
    },
    "fit-exp.com": {
        formSelector: '.login__wrap .login',
        userNameSelector: '.login__input[type="text"]',
        passwordSelector: '.login__input[type="password"]',
        loginButtonSelector: '.login__button',
        donNotChangeSiteForm: true,
    },
    "newb2b.fstravel.com": {
        formSelector: '.signin-form',
        userNameSelector: 'input[type="text"]',
        passwordSelector: '.MuiInputBase-adornedEnd input',
        loginButtonSelector: 'button.MuiButton-containedPrimary:not(.qq-quick-login-btn)',
        donNotChangeSiteForm: true,
        classLists: {button: ['MuiButton-contained', 'MuiButtonBase-root', 'MuiButton-root', 'MuiButton-containedPrimary']}
    },
    "turbox.rdbx24.ru": {
        isQuickLoginAsyncFormAction: true
    } ,
    "group.uralairlines.ru": {
        donNotChangeSiteForm: true
    },
    "promo.smartagent.online": {
        userNameSelector: '#type',
        passwordSelector: '#password'
    },
    "b2b.tovtour.by": {
        formSelector: '.loginForm__form',
        loginButtonSelector: '[data-bind="click: login"], [name="ctl00$generalContent$LoginControl$btnLogin"]'
    },
    "xn----7sbaalrb2cl7afpc.xn--p1ai": {
        formSelector: '.authorization-form',
        userNameSelector: 'input.login-agency',
        passwordSelector: 'input.password-agency',
        loginButtonSelector: 'button.btn-authorization'
    },
    "academsletat.getcourse.ru": {
        loginButtonSelector: 'form button.btn-success'
    },
    "travelata.ru": {
        styles: {
            wrapper: 'position:relative;background-color: white;'
        }
    },
    "pac.lms.mirapolis.ru": {
        donNotChangeSiteForm: true
    },
    "cruises.fstravel.com": {
        userNameSelector: '[class*="AuthModal_input"] input',
        passwordSelector: 'input[type="password"]',
    },
    "www.coronatours.ru": {
        donNotChangeSiteForm: true,
        styles: {
            wrapper: 'color:black;max-width:200px',
            a: 'color:initial'
        }
    },
    "ya-to.ru": {
        donNotChangeSiteForm: true,
        classLists: {
            button: ['btn-darkgreen25']
        },
        styles: {
            wrapper: 'margin:0;width: 246px;background: #b6da5e;position: absolute;top: 210px;right: 7px;border-radius: 6px;box-shadow: 2px 8px 5px #0807074a;max-width: 246px;'
        }
    },
    "fdoc.ru": {
        donNotChangeSiteForm: true,
        formSelector: 'section[class*="form"]',
    },
    "agent.intercity.by": {
        donNotChangeSiteForm: true,
        classLists: {
            button: ['btn_stl']
        },
    },
    "partners.clubmed.com": {
        styles: {
            button: 'border: 1px solid black; padding 4px',
            select: 'border: 1px solid black'
        }
    },
    "intourist.ru": {
        formSelector: '.ntk__register__wrap',
        loginButtonSelector: '.ntk__register_btn_go button',
        userNameSelector: 'input[name="lgn"]',
        passwordSelector: 'input[name="pwd"]',
        classLists: {
            button: ['btn_go']
        }
    },
    "agency.travadm.org": {
        classLists: {
            button: ['ui-button']
        },
        donNotChangeSiteForm: true,
        styles: {
            button: 'color: #fff;background-color: #ec933d;border-radius: 12px;padding:6px;font-weight:bold;font-size:14px',
            select: 'border: 1px solid black;padding:4px;border-radius:8px;',
            wrapper: 'font-size:12px'
        }
    },
    "my.bestdoctor.ru": {
        userNameSelector: '#phoneNumber'
    },
    "anex.agency": {
        styles: {
            wrapper: 'font-size: 14px;display: block;margin: 0;padding-left: 0;',
            select: 'font-size: 14px;padding: 2px;'
        }
    },
    "zarplata.ru": {
        matchAllHostnames: true
    },
    "uae.kazunion.com": {
        userNameSelector: '#username',
        passwordSelector: '#password',
    },
    "tury.magput.ru": {
        formSelector: '.form-signin',
        loginButtonSelector: 'button[type="submit"]',
        userNameSelector: '#login',
        passwordSelector: '#inputPassword',
    },
    "vodohod.com": {
        formSelector: '#authorize_form_modal',
        loginButtonSelector: 'button[type="submit"]',
        userNameSelector: 'input[name="login"]',
        passwordSelector: 'input[name="password"]',
        styles: {
            select: "color: black;border: 1px solid black;padding: 4px;border"
        },
        classLists: {
            button: ['btn', 'btn--fill', 'btn--small','btn--red']
        }
    },
    "piter.teletrain.ru": {
        formSelector: '#loginform',
        loginButtonSelector: '[type="submit"]',
        userNameSelector: '[name="login"]',
        passwordSelector: '[name="pass"]',
    },
    "www.delfin-tour.ru": {
        formSelector: 'form.login-form',
        loginButtonSelector: '.btn-primary[type="submit"]',
        userNameSelector: 'input[name="lg-login"]',
        passwordSelector: 'input[name="lg-pass"]'
    },
    "sprintauth.flydubai.com": {
        formSelector: 'form.login_form',
        loginButtonSelector: '.login_form_submit_btn',
        userNameSelector: 'input#username',
        passwordSelector: 'input#passwordWrap'
    },
    "online.sibalt.ru": {
        donNotChangeSiteForm: true,
        styles: {
            wrapper: 'margin-left: 30px'
        }
    },
    "www.ecotour.by": {
        formSelector: '#loginModal .scenario-realization'
    }
}

/*
        formSelector: '',
        loginButtonSelector: '',
        userNameSelector: '',
        passwordSelector: '',
        classLists: {
            button: []
        },

        styles: {
            select: '',
            wrapper: '',
            a: '',
            button: ''
        },
        isQuickLoginAsyncFormAction: true,
        notHideInputs: true,
        donNotChangeSiteForm: true,
        matchAllHostnames: false,


* */
