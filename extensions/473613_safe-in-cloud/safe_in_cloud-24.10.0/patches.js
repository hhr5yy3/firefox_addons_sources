const PATCHES = [{
        href: "https:\/\/link\.alfabank\.ru\/webclient\/pages",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "isc_1H"
                },

                passwordInput: {
                    id: "isc_1N"
                }
            }
        }
    },

    {
        href: "https:\/\/secure\.bankofamerica\.com\/login\/sign-in\/signOnV2Screen\.go",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "enterID-input"
                },

                passwordInput: {
                    id: "tlpvt-passcode-input"
                }
            }
        }
    },

    {
        href: "https:\/\/ebok\.chsm\.com\.pl\/apex\/f",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "P102_USERNAME"
                },

                passwordInput: {
                    id: "P102_PASSWORD"
                }
            }
        }
    },

    {
        href: "https:\/\/banking\.ing\.at\/online-banking\/wicket\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "number"
                },

                passwordInput: {
                    id: "pin"
                }
            }
        }
    },

    {
        href: "https:\/\/interprev\.careview\.pt\/ext\/login\.asp",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "utilizador"
                }
            }
        }
    },

    {
        href: "https:\/\/platform\.newzoo\.com\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "user_name"
                },

                passwordInput: {
                    name: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.tinkoff\.ru\/payments\/card-to-card",
        cardForm: {
            inputs: {
                numberInput: {
                    name: "cardNumber"
                }
            }
        }
    },

    {
        href: "https:\/\/esrv\.topcard\.ch\/cop\/",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "uccTopForm:j_id2064081995_1_390f08cd:j_id2064081995_1_390f08cd"
                }
            }
        }
    },

    {
        href: "https:\/\/ukraine-express\.com\/.*\/registration-selector\.html",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "search_pakage_field2"
                },

                passwordInput: {
                    id: "search_pakage_field3"
                }
            }
        }
    },

    {
        href: "https:\/\/appleid\.apple\.com\/auth\/authorize",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "account_name_text_field"
                },

                passwordInput: {
                    id: "password_text_field"
                }
            }
        }
    },

    {
        href: "https:\/\/online\.raiffeisen\.ru\/login\/restore",
        cardForm: {
            inputs: {
                numberInput: {
                    type: "text"
                },

                expMonthInput: {
                    placeholder: "ММ"
                },

                expYearInput: {
                    placeholder: "ГГ"
                },

                cscInput: {
                    id: "RcFormControl-0"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.alza\.cz\/Registration\.htm",
        registrationForm: {
            inputs: {
                emailInput: {
                    id: "edth1EmailLogin"
                },

                passwordInput: {
                    id: "edth1Password"
                },

                confirmPasswordInput: {
                    id: "edth1PasswordConfirm"
                },

                telInput: {
                    id: "ctl00_ctl00_cpcm_cpc_ud2_phoneCountryBasicPhoneValidator_inpTelNumber"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.nexi\.it\/login-titolari\.html",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "user-name"
                },

                passwordInput: {
                    id: "user-password"
                }
            }
        }
    },

    {
        href: "https:\/\/tmcad\.totalaoc\.com\/Login\/Login\.aspx",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "UserName"
                },

                passwordInput: {
                    id: "Password"
                }
            }
        }
    },

    {
        href: "https:\/\/accounts\.shopify\.com\/store-login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "shop_domain"
                }
            }
        }
    },

    {
        href: "https:\/\/clientes\.lucera\.es\/acceso\/usuario",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "neon-input-0"
                }
            }
        }
    },

    {
        href: "https:\/\/b2b\.dab-bank\.de\/smartbroker",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "zugangsnummer"
                },

                passwordInput: {
                    id: "identifier"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.selfpointonline\.it",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "user-name"
                },

                passwordInput: {
                    id: "user-password"
                }
            }
        }
    },

    {
        href: "https:\/\/account\.htcvive\.com",
        loginForm: {
            inputs: {
                usernameInput: {
                    type: "text"
                },

                passwordInput: {
                    type: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.royalcaribbean\.com\/account\/signin",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "mat-input-0"
                },

                passwordInput: {
                    id: "Password"
                }
            }
        }
    },

    {
        href: "https:\/\/app\.asperion\.nl\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "user"
                },

                passwordInput: {
                    id: "pw"
                }
            }
        }
    },

    {
        href: "https:\/\/bn\.aliorbank\.pl\/hades\/do\/Login",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "p_alias"
                }
            }
        }
    },

    {
        href: "https:\/\/ib\.summitbank\.com\.pk\/ib\/login\.do",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "pan"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.energir\.com\/fr\/residentiel\/espace-client\/cybercompte\/connexion",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "Username"
                },

                passwordInput: {
                    id: "Password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.nexi\.it\/login-aziende\.html",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "user-name"
                },

                passwordInput: {
                    id: "user-password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.telmore\.dk\/mit-telmore\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "userName"
                },

                passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/shop\.biotechusa\.hu\/account\/login",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "CustomerEmail"
                },

                passwordInput: {
                    id: "CustomerPassword"
                }
            }
        }
    },

    {
        href: "https:\/\/shop\.snapon\.com\/sign-in",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "emailField-input"
                },

                passwordInput: {
                    id: "password-input"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.thesource\.ca\/fr-ca\/login",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "j_username"
                },

                passwordInput: {
                    id: "j_password"
                }
            }
        },

        registrationForm: {
            inputs: {
                emailInput: {
                    id: "registerEmail"
                },

                newPasswordInput: {
                    id: "password"
                },

                confirmPasswordInput: {
                    id: "registerCheckPwd"
                }
            }
        }
    },

    {
        href: "https:\/\/cas\.foxitsoftware\.com\/cas\/login",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "username"
                },

                passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "http:\/\/uploaded\.net\/#login",
        loginForm: {
            inputs: {
                usernameInput: {
                    "data-value": "Account-ID"
                },

                passwordInput: {
                    "data-value": "Password"
                }
            }
        }
    },

    {
        href: "https:\/\/pt\.khanacademy\.org",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "identifier-field"
                },

                passwordInput: {
                    id: "uid-labeled-text-field-0-wb-id-field"
                }
            }
        }
    },

    {
        href: "http:\/\/netrack\.entreposageherger\.com\/herger\/st\/login\.asp",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "noclient"
                },

                passwordInput: {
                    name: "passe"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.flatex\.de",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "uname_app"
                },

                passwordInput: {
                    id: "password_app"
                }
            }
        }
    },

    {
        href: "https:\/\/inspira\.un\.org\/psp\/PUNA1J",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "userid"
                },

                passwordInput: {
                    id: "pwd"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.amazon\.com\/gp\/buy\/payselect\/handlers\/display\.html",
        cardForm: {
            inputs: {
                nameInput: {
                    name: "ppw-accountHolderName"
                },

                numberInput: {
                    name: "addCreditCardNumber"
                },

                expMonthInput: {
                    name: "ppw-expirationDate_month"
                },

                expYearInput: {
                    name: "ppw-expirationDate_year"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.thomann\.de\/intl\/.*\/checkout\.html",
        cardForm: {
            inputs: {
                nameInput: {
                    name: "ccinhaber"
                },

                numberInput: {
                    name: "ccnr"
                },

                expMonthInput: {
                    id: "paymentCCValidMnth"
                },

                expYearInput: {
                    id: "paymentCCValidYear"
                },

                cscInput: {
                    name: "ccpz"
                }
            }
        },

        loginForm: {
            inputs: {
                emailInput: {
                    name: "emailaddress"
                },

                telInput: {
                    name: "telephonenumber"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.otpbankdirekt\.hu\/webshop\/do",
        cardForm: {
            inputs: {
                numberInput: {
                    id: "inditoKartya"
                },

                nameInput: {
                    name: "kartyaraIrtNev"
                },

                expMonthInput: {
                    name: "lejaratHo2"
                },

                expYearInput: {
                    name: "lejaratEv2"
                },

                cscInput: {
                    name: "cvc2cvv2"
                }
            }
        }
    },

    {
        href: "https:\/\/tanss\.onlineradiologie\.de\/index\.php",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "loginName"
                },

                passwordInput: {
                    id: "loginPW"
                },

                passcodeInput: {
                    id: "tokenPW"
                }
            }
        }
    },

    {
        href: "https:\/\/.*\.zoom\.us\/account\/billing\/buy_subscription",
        cardForm: {
            inputs: {
                numberInput: {
                    id: "input-creditCardHolderName"
                },

                nameInput: {
                    id: "input-creditCardNumber"
                },

                expMonthInput: {
                    id: "input-creditCardExpirationMonth"
                },

                expYearInput: {
                    id: "input-creditCardExpirationYear"
                },

                cscInput: {
                    id: "input-cardSecurityCode"
                }
            }
        }
    },

    {
        href: "https:\/\/webvpn\.tsinghua\.edu\.cn\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "user_name"
                },

                passwordInput: {
                    name: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.vueling\.com\/[a-z][a-z]\/?$",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "user"
                },

                passwordInput: {
                    id: "passwd"
                }
            }
        }
    },

    {
        href: "https:\/\/bitso\.com\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "client_id"
                },

                passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.luminusfinancial\.com\/Personal\/OnlineBanking\/Accounts\/",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "acctnum"
                },

                passwordInput: {
                    id: "pac"
                }
            }
        }
    },

    {
        href: "https:\/\/pica\.cineca\.it\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "_username"
                },

                passwordInput: {
                    id: "_password"
                }
            }
        }
    },

    {
        href: "https:\/\/barmerid\.id\.bconnect\.barmer\.de\/auth",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "inp-username"
                },

                passwordInput: {
                    id: "inp-password-input"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.dns-shop\.ru\/",
        registrationForm: {
            inputs: {
                usernameInput: {
                    type: "text",
                    autocomplete: "off"
                }
            }
        },

        loginForm: {
            inputs: {
                usernameInput: {
                    type: "text",
                    autocomplete: "username",
                },

                passwordInput: {
                    autocomplete: "current-password"
                }
            }
        }
    },

    {
        href: "https:\/\/myhome\.show\/sign-up",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "ion-input-0"
                }
            }
        }
    },

    {
        href: "https:\/\/myhome\.show\/",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "ion-input-0"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.amazon\.com\/cpe\/yourpayments\/wallet",
        cardForm: {
            inputs: {
                numberInput: {
                    name: "addCreditCardNumber"
                },

                nameInput: {
                    name: "ppw-accountHolderName"
                },

                expMonthInput: {
                    name: "ppw-expirationDate_month"
                },

                expYearInput: {
                    name: "ppw-expirationDate_year"
                }
            }
        }
    },

    {
        href: "https:\/\/id\.lepida\.it\/lepidaid\/loginareaprivata",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "usernameEnclosure:username"
                },

                passwordInput: {
                    name: "passwordEnclosure:password"
                }
            }
        }
    },

    {
        href: "https:\/\/members\.stevejlarsen\.com\/study\/5d77922c\/login",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "email"
                },

                passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.instarem\.com\/signin",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "email-input"
                },

                passwordInput: {
                    id: "password-input"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.my\.commbank\.com\.au\/netbank\/Logon\/Logon\.aspx",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "txtMyClientNumber_field"
                },

                passwordInput: {
                    id: "txtMyPassword_field"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.usaa\.com\/my\/logon",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "memberId"
                },

                passwordInput: {
                    name: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/enstroga\.de\/portal\/anmeldung",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "login_new_login"
                },

                passwordInput: {
                    id: "login_new_pass"
                }
            }
        }
    },

    {
        href: "https:\/\/online\.novikom\.ru\/#\/registration",
        cardForm: {
            inputs: {
                numberInput: {
                    name: "FakeFieldCardNumberOrAccount"
                }
            }
        }
    },

    {
        href: "https:\/\/ibank\.nbg\.gr\/identity\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    type: "text"
                }
            }
        }
    },

    {
        href: "https:\/\/onsitego\.com\/request-a-service\/login",
        loginForm: {
            inputs: {
                emailInput: {
                    type: "text"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.topcashback\.com\/logon",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "txtEmail"
                },
				passwordInput: {
                    id: "ctl00_GeckoOneColPrimary_Login_txtPassword"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.olg\.ca\/.*\/home\.html",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "loginUsername_login-modal"
                },
				passwordInput: {
                    id: "loginPassword_login-modal"
                }
            }
        }
    },

    {
        href: "https:\/\/goonline\.bnpparibas\.pl\/#!\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    type: "text"
                }
            }
        }
    },

    {
        href: "https:\/\/login\.iqoption\.com\/.*\/login",
        loginForm: {
            inputs: {
                emailInput: {
                    name: "identifier"
                },
				passwordInput: {
                    name: "password"
                }
            }
        }
    },

    {
        href: "http:\/\/webcenter\.flexcoat\.com\.br\/WebCenter_Inst\/login\.jsp",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "username"
                },
				passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.beallsflorida\.com\/",
        loginForm: {
            inputs: {
                emailInput: {
                    name: "logonId"
                },
				passwordInput: {
                    name: "logonPassword"
                }
            }
        }
    },

    {
        href: "https:\/\/register\.ccopyright\.com\.cn\/login\.html",
        loginForm: {
            inputs: {
                usernameInput: {
                    type: "text"
                },
				passwordInput: {
                    type: "password"
                }
            }
        }
    },
	
	{
        href: "https:\/\/auth-prd\.pontoslivelo\.com\.br\/livelo-login",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "fake-username"
                },

                passwordInput: {
                    id: "password"
                }
            }
        },

        registrationForm: {
            inputs: {
                emailInput: {
                    id: "fake-username-2"
                }
            }
        }
    },

    {
        href: "https:\/\/lkm\.esplus\.ru\/auth\/",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "phone_email"
                },
				passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.familytreedna\.com\/sign-in",
        loginForm: {
            inputs: {
				usernameInput: {
                    name: "kitNumber"
                },
				passwordInput: {
                    name: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.suntrust\.com\/",
        loginForm: {
            inputs: {
				usernameInput: {
                    id: "userID"
                },
				passwordInput: {
                    id: "sign-on-herosignon-OLB-password"
                }
            }
        }
    },

    {
        href: "https:\/\/bk\.web\.shinseibank\.com",
        loginForm: {
            inputs: {
				usernameInput: {
                    name: "nationalId"
                },
				passwordInput: {
                    name: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/login\.anz\.com\/internetbanking",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "customerRegistrationNumber"
                },
				passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/carrinho\.casasbahia\.com\.br\/Checkout",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "CpfCnpj"
                }
            }
        }
    },

    {
        href: "https:\/\/github\.com\/.*settings/billing/payment",
        cardForm: {
            inputs: {
                numberInput: {
                    id: "input-creditCardNumber"
                },

                expMonthInput: {
                    id: "input-creditCardExpirationMonth"
                },

                expYearInput: {
                    id: "input-creditCardExpirationYear"
                },

                cscInput: {
                    id: "input-cardSecurityCode"
                }
            }
        }
    },

    {
        href: "https:\/\/smceasyinvest\.com",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "txtClientId"
                },
				passwordInput: {
                    id: "txtClientPwd"
                }
            }
        }
    },

    {
        href: "https:\/\/nordwest\.meine\.aok\.de",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "loginform-username"
                },
				passwordInput: {
                    id: "loginform-password"
                }
            }
        }
    },

    {
        href: "https:\/\/sso\.acesso\.gov\.br\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "accountId"
                }
            }
        }
    },

    {
        href: "https:\/\/jallogin\.jal\.co\.jp\/contents\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "LA_input-number-01"
                },
				passwordInput: {
                    id: "LA_input-password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.bedbathandbeyond\.com\/store\/account\/Login",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "signin-email"
                },
				passwordInput: {
                    id: "signin-password"
                }
            }
        }
    },

    {
        href: "https:\/\/members\.ahm\.com\.au",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "username"
                },
				passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/digital\.bankaust\.com\.au\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "MemberNumber"
                },
				passwordInput: {
                    id: "Password"
                }
            }
        }
    },


    {
        href: "https:\/\/sparen\.leaseplanbank\.de\/login\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "account-name"
                },
				passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/particulares\.bancosantander\.es\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "mat-input-0"
                }
            }
        }
    },


    {
        href: "https:\/\/www3\.senearthco\.com",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "log_email"
                },
				passwordInput: {
                    id: "log_password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.oracle\.com\/cloud\/sign-in\.html",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "cloudAccountName"
                }
            }
        }
    },

    {
        href: "https:\/\/meine\.enbw\.com\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "Benutzername"
                },
				passwordInput: {
                    id: "Passwort"
                }
            }
        }
    },

    {
        href: "https:\/\/portal\.medibuddy\.in",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "username"
                },
				passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/mabanque\.fortuneo\.fr",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "LOGIN"
                },
				passwordInput: {
                    name: "PASSWD"
                }
            }
        }
    },

    {
        href: "https:\/\/bpinetempresas\.bancobpi\.pt\/SIGNON\/signon\.asp",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "CustomerCode"
                },
				passwordInput: {
                    id: "Password"
                }
            }
        }
    },

    {
        href: "https:\/\/danbooru\.donmai\.us\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "session_name"
                },
				passwordInput: {
                    id: "session_password"
                }
            }
        }
    },

    {
        href: "https:\/\/order\.yodobashi\.com\/yc\/login\/index\.html",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "memberId"
                },
				passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.banking4you\.it",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "passCrypt"
                },
				passwordInput: {
                    id: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.rindchen\.de\/mein-konto",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "co-login-user"
                },
				passwordInput: {
                    id: "co-login-pass"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.sparkasse-moosburg\.de",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "IwqRJwrYNDyTZTPV"
                },
				passwordInput: {
                    id: "iXYujvrTjTQrUSwm"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.huobi\.com\/.*\/login",
        loginForm: {
            inputs: {
                emailInput: {
                    type: "text",
                    autocomplete: "new-password"
                },
				passwordInput: {
                    name: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/app\.turn-klubb\.de\/#\/login",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "email"
                },
				passwordInput: {
                    id: "current-password"
                }
            }
        }
    },

    {
        href: "https:\/\/discount-drugmart\.com\/account\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "username-page"
                },
				passwordInput: {
                    id: "password-page"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.singaporeair\.com",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "userEmailKfPpsClub"
                },
				passwordInput: {
                    id: "userPasswordKfPpsClub"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.ebike-connect\.com\/login",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "login__email"
                },
				passwordInput: {
                    id: "login__password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.massageenvy\.com\/scheduling\/css\/profile\/login",
        loginForm: {
            inputs: {
                emailInput: {
                    name: "email"
                },
				passwordInput: {
                    name: "password"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.ruralvia\.com",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "mzmJubhykvBkPRx"
                },
				passwordInput: {
                    id: "fbErsfsNlBUfXiy"
                }
            }
        }
    },

    {
        href: "https:\/\/www\.library\.ntpc\.gov\.tw",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "loginUsername"
                },
				passwordInput: {
                    id: "loginPassword"
                }
            }
        }
    },

    {
        href: "https:\/\/exsila\.ch\/einloggen",
        loginForm: {
            inputs: {
                emailInput: {
                    id: "PH_PublicOnly_loginBox1_tb_nickname"
                },
				passwordInput: {
                    id: "PH_PublicOnly_loginBox1_tb_password"
                }
            }
        }
    },

    {
        href: "https:\/\/oauth\.airmiles\.ca\/login",
        loginForm: {
            inputs: {
                usernameInput: {
                    id: "collectorNumber"
                },
				passwordInput: {
                    id: "pin"
                }
            }
        }
    },

    {
        href: "https:\/\/webdesk\.passgo\.cloud\/webdesk\/wd",
        loginForm: {
            inputs: {
                usernameInput: {
                    name: "urania"
                },
				passwordInput: {
                    name: "pasifae"
                }
            }
        }
    }

];