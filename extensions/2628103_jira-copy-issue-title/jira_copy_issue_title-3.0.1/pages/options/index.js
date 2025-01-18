const container = document.querySelector(".container");
const getCards = () => document.querySelectorAll(".card:not(#card-add)");

const createComponent = (builder) => (template) => (i) =>
  builder.setId(builder.fromHtml(template))(builder.Id(i));

const addCardTemplate = `
  <div class="card">
    <div class="settings-row">
      <h2>add</h2>
    </div>
  </div>`;

const cardTemplate = `
  <div class="card">
    <div class="close">&times;</div>
    <div class="settings-row">
      <label class="copy-issue-template" for="">Copy Template </label>
      <input class="copy-issue-template"
        placeholder="<key>: <title>"
        type="text"
      />
      <div class="info">
        <div class="info-row">
          <div class="info-col-key">&ltkey&gt</div>
          <div class="info-col-desc">issue key e.g. ABC-1234</div>
        </div>
        <div class="info-row">
          <div class="info-col-key">&lttitle&gt</div>
          <div class="info-col-desc">issue summary</div>
        </div>
        <div class="info-row">
          <div class="info-col-key">&lturl&gt</div>
          <div class="info-col-desc">current url</div>
        </div>
      </div>
    </div>
    <div class="settings-row">
      <label class="button-title" for="">Button Title</label
      ><input class="button-title" type="text" />
    </div>
  </div>
  `;

const Card = {
  Id: (i) => `card-${i}`,
  fromHtml: (template) => DOM.fromHtml(template),
  setId: (card) => (id) => ((card.id = id), card),
  setButtonTitleId: (card) =>
    (Card.controls(card).buttonTitle.id = "button-title-" + card.id),
  setButtonTitleLabelId: (card) =>
    Card.controls(card).buttonTitleLabel.setAttribute(
      "for",
      "button-title-" + card.id
    ),
  setIssueTemplateId: (card) =>
    (Card.controls(card).issueTemplate.id = "copy-issue-template-" + card.id),
  setIssueTemplateLabelId: (card) =>
    Card.controls(card).issueTemplateLabel.setAttribute(
      "for",
      "copy-issue-template-" + card.id
    ),
  makeClosable: (card) => (onClose) => {
    const closeElement = card.querySelector(".close");
    closeElement.addEventListener("click", (evt) =>
      onClose(evt.currentTarget.parentElement)
    );

    return card;
  },

  makeThrottleableInputs: (card) => (onInput) => (
    [...card.querySelectorAll("input[type=text]")].forEach((el) =>
      el.addEventListener("input", Utils.debounce(500, onInput))
    ),
    card
  ),

  makeTaggable: (card) => (input) => (onClick) => (
    [...card.getElementsByClassName("info-col-key")].forEach((el) => {
      el.addEventListener("click", (evt) =>
        DOM.typeInTextarea(evt.target.textContent, input)
      );
      el.addEventListener("click", Utils.debounce(500, onClick));
    }),
    card
  ),
  controls: (card) => ({
    get closeButton() {
      return card.querySelector(".close");
    },

    set closeButton(visible) {
      this.closeButton.style.display = visible ? "" : "none";
    },

    get buttonTitle() {
      return card.querySelector("input.button-title");
    },

    get buttonTitleLabel() {
      return card.querySelector("label.button-title");
    },

    get issueTemplate() {
      return card.querySelector("input.copy-issue-template");
    },

    get issueTemplateLabel() {
      return card.querySelector("label.copy-issue-template");
    },

    get id() {
      return card.id;
    },
  }),
};

const createAddCard = () => {
  const card = createComponent(Card)(addCardTemplate)("add");
  container.appendChild(card);
  return card;
};

const createRegularCard =
  ({ id, buttonTitle, issueTemplate }) =>
  (counter) =>
  (cardAdd) => {
    const cardId = id ? id : counter.id;
    counter.id = cardId + 1;
    const card = createComponent(Card)(cardTemplate)(cardId);
    Card.setButtonTitleId(card);
    Card.setButtonTitleLabelId(card);
    Card.setIssueTemplateId(card);
    Card.setIssueTemplateLabelId(card);
    const cardControls = Card.controls(card);
    const { buttonTitle: title, issueTemplate: template } = Card.controls(card);
    const { makeClosable, makeTaggable, makeThrottleableInputs } = Card;
    const onThrottleInput = () => saveSettings(cardSettings());

    const onCloseCard = (card) => {
      card.remove();
      setCardCloseVisibility();
      saveSettings(cardSettings());
    };
    makeClosable(card)(onCloseCard);
    title.value = buttonTitle;
    template.value = issueTemplate;

    makeTaggable(card)(template)(onThrottleInput);
    makeThrottleableInputs(card)(onThrottleInput);

    container.insertBefore(card, cardAdd);
    setCardCloseVisibility();
    cardAdd.scrollIntoView();

    return card;
  };

function setCardCloseVisibility() {
  const cards = getCards();
  Card.controls(cards[0]).closeButton = cards.length > 1;
}

function cardSettings() {
  return [...getCards()].map((card) => ({
    id: +card.id.match(/(\d+)/)[0],
    buttonTitle: Card.controls(card).buttonTitle.value,
    issueTemplate: Card.controls(card).issueTemplate.value,
  }));
}

(async () => {
  const counter = { id: 1 };
  const addCard = createAddCard();
  addCard?.addEventListener("click", () => {
    createRegularCard({
      buttonTitle: "",
      issueTemplate: "",
    })(counter)(addCard);

    saveSettings(cardSettings());
  });

  const cards = await loadSettings();
  cards.forEach((card) => createRegularCard(card)(counter)(addCard));
})();
