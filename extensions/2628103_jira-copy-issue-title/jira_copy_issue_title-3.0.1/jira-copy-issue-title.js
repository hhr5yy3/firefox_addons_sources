(() => {
  "use strict";
  class Clipboard {
    static async copy(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        return false;
      }
    }
  }

  class Jira {
    static Page = class {
      static get exists() {
        return (
          document
            .querySelector("meta[name=application-name]")
            ?.getAttribute("data-name") === "jira"
        );
      }
    };

    static Layout = class {
      static get current() {
        const availableLayouts = [
          this.DetailView,
          this.OldView,
          this.CloudView,
        ];
        return availableLayouts.find((layout) => layout.exists) || null;
      }

      static CloudView = class {
        static name = "Cloud View Layout";

        static get exists() {
          return !!window.location.origin?.includes("atlassian.net");
        }

        static get issue() {
          const issueKey =
            document.querySelector(
              "div[data-testid='issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container'] li>a>span"
            )?.textContent || "";
          const issueSummary =
            document.querySelector(
              "h1[data-testid='issue.views.issue-base.foundation.summary.heading']"
            )?.textContent || "";
          const issueUrl =
            document.querySelector(
              "div[data-testid='issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container'] li>a"
            )?.href || "";
          return issueKey
            ? new Jira.Issue(issueKey, issueSummary, issueUrl)
            : null;
        }

        static get buttonContainer() {
          return document.querySelector(
            "div[data-testid='issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container']"
          );
        }

        static renderButton(button) {
          this.buttonContainer.appendChild(button);
        }
      };

      static OldView = class {
        static name = "Old View Layout";

        static get exists() {
          return !!document.getElementById("issue-content");
        }

        static get issue() {
          const issueKey =
            document
              .getElementById("key-val")
              ?.getAttribute("data-issue-key") || "";
          const issueSummary =
            document.getElementById("summary-val")?.textContent || "";
          const issueUrl = document.getElementById("key-val")?.href || "";

          return issueKey
            ? new Jira.Issue(issueKey, issueSummary, issueUrl)
            : null;
        }

        static get buttonContainer() {
          return document.getElementById("key-val");
        }

        static renderButton(button) {
          DOM.insertAfter(button, this.buttonContainer);
        }
      };

      static DetailView = class {
        static name = "Detail View Layout";

        static get exists() {
          return !!document.getElementById("ghx-detail-issue");
        }

        static get issue() {
          const issueKey =
            document
              .getElementById("ghx-detail-issue")
              ?.getAttribute("data-issuekey") || "";
          const issueSummary =
            document.getElementById("summary-val")?.textContent || "";
          const issueUrl =
            document.querySelector("#issuekey-val > a")?.href || "";

          return issueKey
            ? new Jira.Issue(issueKey, issueSummary, issueUrl)
            : null;
        }

        static get buttonContainer() {
          return document.getElementById("issuekey-val");
        }

        static renderButton(button) {
          DOM.insertAfter(button, this.buttonContainer);
        }
      };
    };

    static Button = class {
      static create({ id, text, onClick }) {
        const buttonHtml = `<button class="copy-issue aui-button aui-button-compact" 
                             style="margin-left: 5px">
                             <span class="aui-icon aui-icon-small 
                                          aui-iconfont-copy-clipboard"></span>${
                                            text ? "&nbsp;" : ""
                                          }
                             </button>`;
        const button = DOM.fromHtml(buttonHtml);
        button.id = id;
        button.insertAdjacentText("beforeend", text);
        button.addEventListener("click", onClick);
        return button;
      }

      static exists(id) {
        return !!document.getElementById(id);
      }
    };

    static ButtonGroup = class {
      static exists(className) {
        return !!document.querySelector(`button.${className}`);
      }
    };

    static Issue = class {
      constructor(key, summary, url) {
        this.key = key;
        this.summary = summary;
        this.url = url;
      }

      format(template) {
        const replacements = {
          "<key>": this.key,
          "<title>": this.summary,
          "<url>": this.url,
        };

        let formattedText = template;
        formattedText = formattedText.replace(
          /<\w+>/g,
          (key) => replacements[key] || key
        );

        return formattedText;
      }

      async copyToClipboard(template) {
        if (this.summary) {
          const issueText = this.format(template);
          if (await Clipboard.copy(issueText)) {
            window.postMessage({
              type: "jira_success_copied_to_clipboard",
              options: { title: "Copied to clipboard", body: issueText },
            });
          }
        }
      }
    };

    static Notifications = class {
      static setup(action) {
        DOM.injectScript(
          browser.runtime.getURL("jira-notifications.js"),
          "body"
        );

        browser.runtime.onMessage.addListener(
          (request, sender, sendResponse) => {
            if (request.message === "jira_copy_to_clipboard") {
              action();
            }
          }
        );
      }
    };
  }

  class Observer {
    static defaultOptions = {
      target: document,
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      },
    };

    static start({ condition, action, options }) {
      const handler = Utils.throttle(1000, () => {
        if (condition()) action();
      });

      const _options = { ...this.defaultOptions, ...options };
      const observer = new MutationObserver(handler);
      observer.observe(_options.target, _options.config);
      return observer;
    }
  }

  class App {
    static async start() {
      if (!Jira.Page.exists) return;
      const buttonSettings = await loadSettings();

      const copyIssueToClipboard = (evt) => {
        const item =
          buttonSettings.find(
            (item) => item.id === +evt?.currentTarget.id.match(/(\d+)/)[0]
          ) ?? buttonSettings[0];
        Jira.Layout.current?.issue?.copyToClipboard(item.issueTemplate);
      };

      Jira.Notifications.setup(copyIssueToClipboard);

      const observerSeup = {
        condition: () =>
          !Jira.ButtonGroup.exists("copy-issue") &&
          !!Jira.Layout.current?.buttonContainer &&
          !!Jira.Layout.current?.issue?.summary,

        action: () => {
          for (const item of buttonSettings) {
            const button = Jira.Button.create({
              id: `copy-issue-button-${item.id}`,
              text: item.buttonTitle,
              onClick: copyIssueToClipboard,
            });

            Jira.Layout.current.renderButton(button);
          }
        },
      };

      Observer.start(observerSeup);
    }
  }

  App.start();
})();
