class ResultData {
    constructor() {
        if (window.resultDataInstance) {
            return window.resultDataInstance;
        }
        window.resultDataInstance = this;
        
        this.translationDictionary = {};
        this.observer = null;
        this.initialized = false;
        this.init();
    }

    async init() {
        if (this.initialized) {
            return;
        }

        await this.loadDictionary();
        this.setupResultsetObserver();
        
        // 검색 버튼 클릭 감지
        const searchButton = document.querySelector('.search-btn');
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                setTimeout(() => {
                    this.waitForResults();
                }, 500);
            });
        }

        // 정렬 헤더 클릭 감지 추가
        const resultset = document.querySelector('.resultset');
        if (resultset) {
            resultset.addEventListener('click', (event) => {
                // 정렬 가능한 헤더를 클릭했을 때
                if (event.target.closest('.sortable')) {
                    setTimeout(() => {
                        this.waitForResults();
                    }, 500);
                }
            });
        }

        this.initialized = true;
    }

    async loadDictionary() {
        try {
            const response = await fetch("https://raw.githubusercontent.com/RG-dev190/POE2TradeKRDict/main/data/dict.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const rawDictionary = await response.json();
            
            // 숫자 키와 비문자열 값 제거
            this.translationDictionary = Object.fromEntries(
                Object.entries(rawDictionary)
                    .filter(([key, value]) => {
                        // 키가 숫자로만 이루어져 있는지 확인
                        const isNumericKey = /^\d+$/.test(key);
                        // 값이 문자열인지 확인
                        const isStringValue = typeof value === 'string';
                        return !isNumericKey && isStringValue;
                    })
            );
            
            //console.log("Translation dictionary loaded and filtered");
        } catch (error) {
            //console.error("Failed to load dictionary:", error);
        }
    }

    setupResultsetObserver() {
        // results와 resultset 컨테이너를 모두 관찰
        const resultsContainer = document.querySelector('.results');
        const resultsetContainer = document.querySelector('.resultset');

        if (resultsContainer || resultsetContainer) {
            if (this.observer) {
                this.observer.disconnect();
            }
            if (resultsContainer) {
                this.observeResults(resultsContainer);
            }
            if (resultsetContainer) {
                this.observeResults(resultsetContainer);
            }
        } else {
            // 컨테이너들이 로드될 때까지 대기
            this.waitForResults(resultsNode => {
                if (this.observer) {
                    this.observer.disconnect();
                }
                const resultsContainer = document.querySelector('.results');
                const resultsetContainer = document.querySelector('.resultset');
                
                if (resultsContainer) {
                    this.observeResults(resultsContainer);
                }
                if (resultsetContainer) {
                    this.observeResults(resultsetContainer);
                }
            });
        }
    }

    observeResults(targetNode) {
        if (!this.observer) {
            let debounceTimer;
            this.observer = new MutationObserver((mutations) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    // 모든 결과 항목 확인
                    const contentElements = document.querySelectorAll(".itemBoxContent .content");
                    contentElements.forEach(content => {
                        if (!content.dataset.translated) {
                            this.translateContent(content);
                            content.dataset.translated = 'true';
                        }
                    });

                    // itemPopupAdditional 요소들도 번역
                    const additionalStats = document.querySelectorAll('.itemPopupAdditional');
                    additionalStats.forEach(stats => {
                        const content = stats.previousElementSibling.querySelector('.content');
                        if (content && !content.dataset.translated) {
                            this.translateContent(content);
                        }
                    });
                }, 100);
            });
        }

        this.observer.observe(targetNode, { 
            childList: true, 
            subtree: true,
            attributes: true,
            characterData: true,
            attributeOldValue: true,
            characterDataOldValue: true
        });
    }

    waitForResults(callback, interval = 200, maxAttempts = 50) {
        let attempts = 0;
        const intervalId = setInterval(() => {
            const resultsNode = document.querySelector(".results");
            if (resultsNode) {
                clearInterval(intervalId);
                callback(resultsNode);
                this.initialized = true;
            } else if (attempts >= maxAttempts) {
                clearInterval(intervalId);
            }
            attempts++;
        }, interval);
    }

    translateContent(content) {
        if (content.dataset.translated) {
            return;
        }

        // 기본 아이템 속성 번역
        const propertyTranslations = {
            'Physical Damage': '물리 피해',
            'Fire Damage': '화염 피해',
            'Cold Damage': '냉기 피해',
            'Lightning Damage': '번개 피해',
            'Chaos Damage': '카오스 피해',
            'Elemental Damage': '원소 피해',
            'Critical Hit Chance': '치명타 확률',
            'Attacks per Second': '초당 공격 횟수',
            'Armour': '방어도',
            'Spirit': '정신력',
            'Reload Time': '재장전 시간',
            'Evasion Rating': '회피',
            'Energy Shield': '에너지 보호막',
            'Charm Slots': '호신부 슬롯',
            'Waystone Tier': '경로석 등급',
            'Waystone Drop Chance': '경로석 출현 확률',
            'Area Level': '지역 레벨',
            'Number of Trials': '시련 수',
            'Block chance': '막기 확률',
            'Quality': '퀄리티'
        };

        // 아이템 타입 번역 추가
        const itemTypeTranslations = {
            'Bow': '활',
            'Claw': '클로',
            'Dagger': '단검',
            'Staff': '지팡이',
            'Wand': '마법봉',
            'One Hand Sword': '한손검',
            'One Hand Axe': '한손 도끼',
            'One Hand Mace': '한손 철퇴',
            'Two Hand Sword': '양손검',
            'Two Hand Axe': '양손 도끼',
            'Two Hand Mace': '양손 철퇴',
            'Spear': '창',
            'Flail': '도리깨',
            'Warstaff': '육척봉',
            'Quarterstaff': '육척봉',
            'Crossbow': '석궁',
            'Sceptre': '셉터',
            'Rod': '낚싯대',
            'Shield': '방패',
            'Buckler': '버클러',
            'Focus': '집중구',
            'Helmet': '투구',
            'Body Armour': '갑옷',
            'Gloves': '장갑',
            'Boots': '장화',
            'Quiver': '화살통',
            'Belt': '허리띠',
            'Ring': '반지',
            'Amulet': '목걸이',
            'Jewel': '주얼,',
            'Flask': '플라스크',
            'Relic': '유물',
            'Tablet': '서판',
            'Expedition Logbook': '탐험 일지',
            'Charm': '호신부'
        };

        // 아이템 타입 번역
        const itemTypeElement = content.querySelector('.property span.lc span');
        if (itemTypeElement) {
            const itemType = itemTypeElement.textContent;
            if (itemTypeTranslations[itemType]) {
                itemTypeElement.textContent = itemTypeTranslations[itemType];
            }
        }

        // 아이템 속성 번역
        const properties = content.querySelectorAll('.property span.lc');
        properties.forEach(propertySpan => {
            // 일반 속성 번역 (무기, 방어구 등)
            const propertyLabel = propertySpan.querySelector('span:first-child');
            if (propertyLabel) {
                const originalText = propertyLabel.textContent.trim().replace(/:\s*$/, '');  // 콜론과 공백 제거
                if (propertyTranslations[originalText]) {
                    propertyLabel.textContent = propertyTranslations[originalText] + ': ';  // 콜론과 공백 추가
                }
            }

            // data-field 속성이 있는 경우 특별 처리
            if (propertySpan.classList.contains('s')) {
                const labelSpan = propertySpan.querySelector('span:first-child');
                if (labelSpan) {
                    const originalText = labelSpan.textContent.trim().replace(/:\s*$/, '');  // 콜론과 공백 제거
                    if (propertyTranslations[originalText]) {
                        labelSpan.textContent = propertyTranslations[originalText] + ': ';  // 콜론과 공백 추가
                    }
                }
            }

            // 특라스크 관련 특수 패턴 번역
            const specialPatterns = [
                {
                    regex: /^Recovers (\d+) (Life|Mana) over ([\d.]+) Seconds$/,
                    replace: (match, amount, type, seconds) => {
                        const typeTranslation = type === 'Life' ? '생명력' : '마나';
                        if (propertySpan.querySelector('.colourDefault') || propertySpan.querySelector('.colourAugmented')) {
                            const amountSpan = propertySpan.querySelector('.colourDefault, .colourAugmented');
                            const secondsSpan = propertySpan.querySelectorAll('.colourDefault, .colourAugmented')[1];
                            if (amountSpan && secondsSpan) {
                                propertySpan.innerHTML = `${secondsSpan.outerHTML}초 동안 ${amountSpan.outerHTML} ${typeTranslation} 회복`;
                            }
                        } else {
                            propertySpan.textContent = `${seconds}초 동안 ${amount} ${typeTranslation} 회복`;
                        }
                        return null;
                    }
                },
                {
                    regex: /^Consumes (\d+) of (\d+) Charges on use$/,
                    replace: (match, use, total) => {
                        if (propertySpan.querySelector('.colourDefault') || propertySpan.querySelector('.colourAugmented')) {
                            const useSpan = propertySpan.querySelector('.colourDefault, .colourAugmented');
                            const totalSpan = propertySpan.querySelectorAll('.colourDefault, .colourAugmented')[1];
                            if (useSpan && totalSpan) {
                                propertySpan.innerHTML = `사용 시 충전 ${totalSpan.outerHTML} 중 ${useSpan.outerHTML} 소모`;
                            }
                        } else {
                            propertySpan.textContent = `사용 시 충전 ${total} 중 ${use} 소모`;
                        }
                        return null;
                    }
                },
                {
                    regex: /^Currently has (\d+) Charges$/,
                    replace: (match, charges) => {
                        if (propertySpan.querySelector('.colourDefault')) {
                            const chargeSpan = propertySpan.querySelector('.colourDefault');
                            propertySpan.innerHTML = `현재 충전량: ${chargeSpan.outerHTML}`;
                        } else {
                            propertySpan.textContent = `현재 충전량: ${charges}`;
                        }
                        return null;
                    }
                }
            ];

            // 특수 패턴 매칭 시도
            const fullText = propertySpan.textContent.trim();
            for (const pattern of specialPatterns) {
                const match = fullText.match(pattern.regex);
                if (match) {
                    pattern.replace(...match);
                    break;
                }
            }
        });

        // 아이템 레벨 번역
        const itemLevel = content.querySelector('.itemLevel span.lc');
        if (itemLevel && itemLevel.textContent.startsWith('Item Level: ')) {
            const level = itemLevel.querySelector('.colourDefault').textContent;
            itemLevel.firstChild.textContent = itemLevel.firstChild.textContent.replace('Item Level: ', '아이템 레벨: ');
        }

        // 요구사항 번역
        const requirements = content.querySelector('.requirements span.lc');
        if (requirements) {
            // 기본 텍스트 번역
            const reqText = requirements.innerHTML;
            let newText = reqText.replace('Requires ', '요구 사항: ')
                               .replace('Level ', '레벨 ');
            requirements.innerHTML = newText;

            // data-field 기준으로 능력치 번역
            const statTranslations = {
                'str': '힘',
                'dex': '민첩',
                'int': '지능'
            };

            // 모든 능력치 span 찾기
            const statSpans = requirements.querySelectorAll('span.s');
            statSpans.forEach(span => {
                const dataField = span.getAttribute('data-field');
                if (statTranslations[dataField]) {
                    // 마지막 span 태그 아서 번역
                    const lastSpan = span.querySelector('span:last-child');
                    if (lastSpan && ['Str', 'Dex', 'Int'].includes(lastSpan.textContent)) {
                        lastSpan.textContent = statTranslations[dataField];
                    }
                }
            });
        }

        // 기존 번역 로직 유지
        // 스킬 부여 텍스트 특별 처리
        const skillNodes = content.querySelectorAll('.skill span.s');
        skillNodes.forEach(skillNode => {
            const spans = skillNode.querySelectorAll('span');
            if (spans.length >= 2) {
                // 모든 span의 텍스트를 합쳐서 전체 텍스트 생성
                const fullText = Array.from(spans)
                    .map(span => span.textContent)
                    .join('')
                    .trim();

                // 숫자를 #으로 변환
                let processedText = fullText;
                const levelMatch = fullText.match(/Level (\d+)/);
                
                if (levelMatch) {
                    processedText = fullText.replace(/Level \d+/, 'Level #');
                }
                
                //console.log('Skill Original:', fullText);
                //console.log('Skill Processed:', processedText);

                const key = Object.keys(this.translationDictionary)
                    .find(k => k === processedText);

                if (key) {
                    let translated = this.translationDictionary[key];
                    
                    if (levelMatch && levelMatch[1]) {
                        translated = translated.replace('#', levelMatch[1]);
                    }
                    
                    // 마지막 span에 번역된 텍스트 적용
                    spans[spans.length - 1].textContent = translated;
                    // 첫 번째 span은 비움
                    spans[0].textContent = '';
                }
            }
        });

        // 기존의 다른 텍스트 번역 처리
        const walker = document.createTreeWalker(
            content,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            const originalText = node.textContent.trim();
            if (!originalText) continue;

            // 스킬 부여 패턴을 먼저 처리
            let processedText = originalText
                .replace(/^\+/, '')
                .replace(/Grants Skill: Level \d+/g, 'Grants Skill: Level #')  // 전체 패턴 매칭
                .replace(/[+-]?\d+(?:\.\d+)?%/g, '#%')
                .replace(/[+-]?\d+(?:\.\d+)?(?!%)/g, '#')
                .replace(/\[\d+—\d+\]/g, '[#—#]')
                .replace(/\[\d+—\d+ to \d+—\d+\]/g, '[#—# to #—#]');

            // 디버깅을 위해 로그 추가
            //console.log('Original:', originalText);
            //console.log('Processed:', processedText);

            // 딕셔너리에서 매칭되는 키 찾기
            const key = Object.keys(this.translationDictionary)
                .find(k => k === processedText);

            if (key) {
                let translated = this.translationDictionary[key];
                // 원본 텍스트에서 숫자 추출 (% 포함)
                const numbers = originalText.match(/[+-]?\d+(?:\.\d+)?%?/g) || [];
                numbers.forEach(num => {
                    // 번역된 텍스트의 # 를 원본 숫자로 교체
                    translated = translated.replace('#', num.replace(/%$/, ''));
                });
                node.textContent = node.textContent.replace(originalText, translated);
            }
        }

        // Unidentified 상태 번역 (unmet 클래스 내부)
        const unmetSpan = content.querySelector('.unmet span.s, .unmet span.lc');
        if (unmetSpan) {
            // Tier 는 경우 저 처리
            const tierMatch = unmetSpan.textContent.match(/Unidentified \(Tier (\d+)\)/);
            if (tierMatch) {
                unmetSpan.textContent = `미확인 (${tierMatch[1]}등급)`;
            } 
            // 일반 Unidentified 처리
            else if (unmetSpan.textContent === 'Unidentified') {
                unmetSpan.textContent = '미확인';
            }
            // Corrupted 처리
            else if (unmetSpan.textContent === 'Corrupted') {
                unmetSpan.textContent = '타락';
            }
        }

        // Mirrored 상태 번역 (augmented 클래스 내부)
        const augmentedSpan = content.querySelector('.augmented span.lc');
        if (augmentedSpan && augmentedSpan.textContent === 'Mirrored') {
            augmentedSpan.textContent = '복제된';
        }

        // itemPopupAdditional 번역 (DPS 등)
        const itemPopupContainer = content.closest('.itemPopupContainer');
        if (itemPopupContainer) {
            const additionalStats = itemPopupContainer.nextElementSibling;
            if (additionalStats && additionalStats.classList.contains('itemPopupAdditional')) {
                const statTranslations = {
                    'Armour': '방어도',
                    'Evasion': '회피',
                    'Energy Shield': '에너지 보호막',
                    'Ward': '보호막',
                    'Physical DPS': '물리 DPS',
                    'Elemental DPS': '원소 DPS'
                };

                const statSpans = additionalStats.querySelectorAll('span.lc.s');
                statSpans.forEach(span => {
                    const textNodes = Array.from(span.childNodes).filter(node => 
                        node.nodeType === Node.TEXT_NODE && node.textContent.trim()
                    );
                    
                    if (textNodes.length > 0) {
                        const originalText = textNodes[0].textContent.trim();
                        const translatedText = statTranslations[originalText];
                        if (translatedText) {
                            textNodes[0].textContent = translatedText;
                        }
                    }
                });
            }
        }

        content.dataset.translated = 'true';
    }

    translateText(text) {
        if (!text || typeof text !== 'string') {
            return text;
        }

        // 숫자를 시 토큰으로 저장
        const numbers = [];
        const textWithTokens = text.replace(/[+-]?\d+\.?\d*%?/g, match => {
            numbers.push(match);
            return '#';
        });

        const orderedKeys = Object.keys(this.translationDictionary)
            .filter(key => typeof key === 'string' && !(/^\d+$/.test(key)))
            .sort((a, b) => b.length - a.length);

        for (const key of orderedKeys) {
            const value = this.translationDictionary[key];
            try {
                if (typeof value !== 'string') {
                    continue;
                }

                const pattern = key
                    .replace(/([.+^=!:${}()|\[\]\/\\])/g, "\\$1")
                    .replace(/#/g, "[+-]?\\d+(?:\\.\\d+)?%?");

                const regex = new RegExp(pattern);
                if (regex.test(textWithTokens)) {
                    // 번역된 텍스트에 원래 숫자를 다시 삽입
                    let translated = value;
                    numbers.forEach(num => {
                        translated = translated.replace('#', num);
                    });
                    return translated;
                }
            } catch (err) {
                console.debug(`Translation error for "${text}" with key "${key}":`, err);
            }
        }

        // 디버깅을 위한 로그
        //console.log(`No translation found for: "${text}"`);
        return text;
    }

    isValidRegexKey(key) {
        try {
            new RegExp(
                key
                    .replace(/#/g, "([+-]?\\d+(?:[.,]\\d+)?)")
                    .replace(/\[(.*?)\|(.*?)\]/g, "(?:$1|$2)")
                    .replace(/[\[\]]/g, "\\$&")
            );
            return true;
        } catch (err) {
            return false;
        }
    }

    onURLChange(newURL) {
        if (newURL.includes("pathofexile.com/trade2/search/poe2")) {
            this.cleanup();
            
            // 결과가 로드될 때까지 대기 후 observer 설정
            const waitForResults = () => {
                const resultset = document.querySelector(".resultset");
                const results = document.querySelectorAll(".itemBoxContent .content");
                
                if (resultset && results.length > 0) {
                    this.observeResults(resultset);
                    
                    // 이미 있는 결과들 번역
                    results.forEach(content => {
                        if (!content.dataset.translated) {
                            this.translateContent(content);
                        }
                    });
                } else {
                    setTimeout(waitForResults, 100);
                }
            };

            // 약간의 지연 후 시작 (URL 변경 완료 대기)
            setTimeout(waitForResults, 500);
        }
    }

    cleanup() {
        if (this.observer) {
            //console.log("Cleaning up previous observer");
            this.observer.disconnect();
            this.observer = null;
        }
    }

    // 결과 대기 함수 별도 메서드로 분리
    waitForResults() {
        const resultset = document.querySelector(".resultset");
        const results = document.querySelectorAll(".itemBoxContent .content");
        
        if (resultset && results.length > 0) {
            this.observeResults(resultset);
            
            results.forEach(content => {
                if (!content.dataset.translated) {
                    this.translateContent(content);
                }
            });
        } else {
            setTimeout(() => this.waitForResults(), 100);
        }
    }
}

window.ResultData = ResultData;
window.dispatchEvent(new Event('ResultDataLoaded'));



