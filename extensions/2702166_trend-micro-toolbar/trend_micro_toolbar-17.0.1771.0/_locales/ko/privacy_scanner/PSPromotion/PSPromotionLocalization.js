var g_oPrivacyScannerString = {
    ScanButtonText: "개인 정보 확인",
    WelcomeString: {
        Head : {
            FACEBOOK:    "누군가가 귀하께서 Facebook에 공유한 것을 보는게 염려되십니까?",
            TWITTER:     "누군가가 귀하께서 X에 공유한 것을 보는 게 염려되십니까?",
            GOOGLEPLUS:  "누군가가 귀하께서 Google+에 공유한 것을 보는게 염려되십니까?",
            LINKEDIN:    "누군가가 귀하께서 LinkedIn에 공유한 것을 보는게 염려되십니까?"
        },
        Content:         "Trend Micro 개인정보 보호를 실행하여 귀하께서 공유하고 싶은 것만 원하는 분들과 공유할 수 있습니다.",
        LearnMore:       "자세히 보기",
        AskLater:        "다시 표시하지 않음"
    }
};

/*
    We will use another promotion dialog when enable auto-scan.
    Currently Facebook/X/LinkedIn will enable this feature.
*/
var g_oPrivacyScannerString_autoScan = {
    ScanButtonText: "검색 결과 참조",
    WelcomeString: {
        Head : {
            SeveralConcern: "%d개 개인 정보 문제가 발견됨",
            OneConcern: "%d개 개인 정보 문제가 발견됨"
        },
        Content: {
            FACEBOOK : "Facebook 개인 정보 설정의 개선을 시작하려면 아래 단추를 클릭하십시오.",
            TWITTER : "X 개인 정보 설정의 개선을 시작하려면 아래 단추를 클릭하십시오.",
            GOOGLEPLUS : "Google+ 개인 정보 설정의 개선을 시작하려면 아래 단추를 클릭하십시오.",
            LINKEDIN : "LinkedIn 개인 정보 설정의 개선을 시작하려면 아래 단추를 클릭하십시오."
        },
        LearnMore: "자세히 보기",
        AskLater: "다시 표시하지 않음"
    }
};
