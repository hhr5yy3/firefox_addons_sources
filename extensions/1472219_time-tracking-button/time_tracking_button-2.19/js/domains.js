var DOMAINS = [
  {
    "id": "airtable",
    "domain": "airtable.com",
    "name": "Airtable",
    "app_url": "https://airtable.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/airtable.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Card",
        "url": "",
        "project": "#appTopbar > div > div > div > div > div > div",
        "tasks": {
          "selector": "div.DetailViewWithActivityFeed:not(.template)",
          "name": {
            "selector": "> div h3",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_before": "> div  > div > div > div > div:nth-child(3)",
          "css": ".ttC{padding-top:12px}",
          "css_id": "ttAc"
        }
      },
      {
        "comment": "Track Project",
        "url": "",
        "project": "#appTopbar > div > div > div > div > div > div",
        "tasks": {
          "selector": "#appTopbar > div",
          "id": "url",
          "url": "url",
          "prepend_to": "> div.z1 > div.items-center",
          "css": ".ttC{padding-right: 0.5rem;}",
          "css_id": "ttAp"
        }
      }
    ],
    "components": [
      {
        "description": "panel button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<a id=\"ttTimesheet\" href=\"#\" data-action=\"modal\" target=\"_self\"><div class=\"relative flex items-center\" style=\"margin-right: 12px; margin-top: 0px;\"><div tabindex=\"0\" class=\"flex items-center pointer link-unquiet focus-visible-opaque quiet text-white focus-visible-current-color\" role=\"button\"><svg width=\"18\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-5 -5 100 100\" style=\" fill: #fff; \"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg><div class=\"flex items-baseline\"><span style=\"margin-left: 4px;\">TrackingTime</span></div></div></div></a>"
        },
        "anchor": "#appTopbar > div > div:nth-child(2) > div > div:last-child",
        "placement": "before"
      }
    ]
  },
  {
    "id": "anydo",
    "domain": "app.any.do",
    "name": "Any.do",
    "app_url": "https://app.any.do/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/anydo.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Task detail",
        "url": "",
        "project": ".BaseCard .TaskEditPaneDetails__content > .TaskEditPaneDetails__fullRow:nth-child(2) > div > span > button > span:nth-child(2)",
        "tasks": {
          "selector": ".BaseCard",
          "name": {
            "selector": ".TaskEditPaneDetails__taskTitle textarea",
            "attr": "value"
          },
          "id": "name",
          "url": "url",
          "prepend_to": "header > div > div",
          "css_id": "anydo_task",
          "css": ".ttC .ttB,.ttC .ttA{width:22px;height:22px;background-size:14px;}"
        }
      },
      {
        "comment": "Project",
        "url": "tasks/lists/*",
        "project": ".TasksToolBar__content .TasksToolBarTitle__preview",
        "tasks": {
          "selector": ".TasksToolBar__content .TasksToolBar__nav .TasksToolBar__controlGroup:last-child",
          "id": "name",
          "url": "url",
          "insert_before": "this",
          "css_id": "anydo_project",
          "css": ".ttC .ttB,.ttC .ttA{width:22px;height:22px;background-size:14px;}"
        }
      }
    ]
  },
  {
    "id": "asana",
    "domain": "app.asana.com",
    "name": "Asana",
    "app_url": "https://asana.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/asana.png",
    "sort": 1,
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Task detail v3",
        "url": "",
        "project": ".LegacyTaskProjects-projectList .LegacyTaskProjects-project:first-child .TokenizerPillBase-name, .TaskProjects ul li:first-child .TokenizerPillBase-name, .TaskProjects ul li:first-child .TokenizerPillBase-name .TaskProjectTokenPill-name",
        "project_alternate": ".TaskAncestry .TaskAncestry-ancestorProject:first-child",
        "tasks": {
          "selector": ".TaskPane",
          "name": {
            "selector": ".ObjectTitleInput-objectName .simpleTextarea, .CommentOnlyTaskTitleRow-name, .TitleInput textarea, .ReadOnlyTitleInput-name",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-task-id"
          },
          "url": "url",
          "insert_before": ".TaskPaneFields",
          "show_duration": true,
          "css_id": "task_detail_v3",
          "css": ".ttC{line-height:40px}"
        }
      }
    ],
    "components": [
      {
        "description": "nav bar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<div class=\"ContextMenuTarget-contextMenuEventListener\"><a id=\"ttTimesheet\" href=\"#\" data-action=\"modal\" target=\"_self\" class=\"ThemeableCardPresentation--isValid ThemeableCardPresentation ThemeableInteractiveCardPresentation--isNotSelected ThemeableInteractiveCardPresentation--isEnabled ThemeableInteractiveCardPresentation SidebarNavigationLinkCard SidebarItemRow SidebarTopNavLinks-notificationsButton BaseLink\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"NavIcon SidebarTopNavLinks-typeIcon HomeNavIcon\" viewBox=\"-5 -5 100 100\" style=\"margin-right:0\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg><div class=\"TypographyPresentation TypographyPresentation--colorNavigation TypographyPresentation--overflowTruncate TypographyPresentation--m SidebarNavigationLinkCard-label\" title=\"TrackingTime\">TrackingTime</div></a></div>"
        },
        "anchor": ".SidebarTopNavLinks",
        "placement": "append"
      },
      {
        "description": "tasks on project list",
        "enabled": true,
        "app_required": true,
        "type": "player",
        "url_pattern": "",
        "template": "player",
        "selector": ".SpreadsheetRow",
        "id": {
          "selector": ".SpreadsheetTaskName textarea.SpreadsheetTaskName-input",
          "attr": "id",
          "parser": {
            "split": "_",
            "pos": 2
          }
        },
        "anchor": ".SpreadsheetGridTaskNameCell",
        "placement": "append"
      },
      {
        "description": "tasks on project board",
        "enabled": true,
        "app_required": true,
        "type": "player",
        "url_pattern": "",
        "template": "mini_player",
        "selector": ".BoardCardLayout",
        "id": {
          "attr": "data-task-id"
        },
        "anchor": ".BoardCard-rightMetadata, .BoardCardWithCustomProperties-rightMetadata, .BoardCardLayout-assigneeDueDateActions",
        "placement": "append"
      },
      {
        "description": "tasks on my tasks",
        "enabled": true,
        "app_required": true,
        "type": "player",
        "url_pattern": "",
        "template": "player",
        "selector": ".MyTasksTaskRow",
        "id": {
          "selector": "this",
          "attr": "data-task-id"
        },
        "anchor": ".ItemRowTwoColumnStructure-right",
        "placement": "append"
      },
      {
        "description": "task detail",
        "enabled": true,
        "app_required": true,
        "type": "iframe",
        "iframe": "task_detail",
        "url_pattern": "",
        "selector": ".SingleTaskPaneSpreadsheet",
        "id": {
          "selector": "this",
          "attr": "data-task-id"
        },
        "anchor": ".SingleObjectTitleInput",
        "placement": "after"
      },
      {
        "description": "project header",
        "enabled": false,
        "app_required": true,
        "type": "project_detail",
        "url_pattern": "",
        "id": {
          "selector": ".NavigationLink:nth-child(1)",
          "attr": "href",
          "parser": {
            "split": "/",
            "pos": 4
          }
        },
        "selector": ".ProjectPageHeader",
        "anchor": ".TopbarPageHeaderStructure-titleRow",
        "placement": "append"
      }
    ]
  },
  {
    "id": "azendoo",
    "domain": "app.azendoo.com",
    "name": "Azendoo",
    "app_url": "https://app.azendoo.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/azendoo.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Task list item",
        "url": "",
        "project": ".sidemenu-item-text.u-text-overflow",
        "tasks": {
          "selector": ".tasks-list-item",
          "name": {
            "selector": ".tasks-list-item-content-label span",
            "attr": "text"
          },
          "id": "name",
          "url": "url",
          "append_to": ".tasks-list-item-extra",
          "css_id": "tli",
          "css": ".ttC{display:none;margin-left:10px;padding-left:10px;border-left:1px solid #f0f0f0;line-height:24px;}.tasks-list-item:hover .ttC{display:inline-block;}"
        }
      },
      {
        "comment": "Task card item",
        "url": "",
        "project": ".sidemenu-item-text.u-text-overflow",
        "tasks": {
          "selector": ".task-card-item",
          "name": {
            "selector": ".task-card-label",
            "attr": "text"
          },
          "id": "name",
          "url": "url",
          "append_to": ".task-card-list",
          "css_id": "tci",
          "css": ".ttC{line-height:23px;margin-left:10px;}"
        }
      }
    ]
  },
  {
    "id": "azureDevOps",
    "domain": "dev.azure.com",
    "name": "Azure DevOps",
    "app_url": "https://azure.microsoft.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/azure-devops.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Board item",
        "url": "",
        "project": "div.project-item span.text-ellipsis",
        "tasks": {
          "selector": ".work-item-view",
          "name": {
            "selector": "div.work-item-form-main-header div.work-item-control div.wrap > input",
            "attr": "value"
          },
          "id": "name",
          "url": "url",
          "prepend_to": ".work-item-form-toolbar-container .workitem-tool-bar .menu-bar",
          "css": ".ttC{margin:2px 5px;padding:0;}",
          "css_id": "azure-board-item"
        }
      },
      {
        "comment": "New Board item",
        "url": "",
        "project": "div.project-item span.text-ellipsis",
        "tasks": {
          "selector": ".work-item-form-header",
          "name": {
            "selector": ".work-item-title-textfield > input",
            "attr": "value"
          },
          "id": "name",
          "url": "url",
          "prepend_to": ".work-item-header-command-bar[role=\"menubar\"] > .work-item-header-command-bar",
          "css": ".ttC{margin:2px;}",
          "css_id": "azure-new-board-item"
        }
      }
    ],
    "components": [
      {
        "description": "nav bar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<div id=\"ttTimesheet\" class=\"hub-group-container flex-column flex-noshrink relative hub-group-only\"><a aria-label=\"TrackingTime\" class=\"hub-group navigation-element navigation-link focus-treatment flex-row flex-grow flex-center scroll-hidden relative bolt-link\" data-focuszone=\"focuszone-2\" href=\"#\" data-action=\"modal\" target=\"_self\" id=\"__bolt-ms-feed-package-hub-group-link\" tabindex=\"-1\"><span class=\"navigation-icon flex-row flex-center flex-noshrink justify-center\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"NavIcon SidebarTopNavLinks-typeIcon HomeNavIcon\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span><span class=\"navigation-text expanded-only text-ellipsis flex-grow\">TrackingTime</span></a></div>"
        },
        "style": {
          "id": "ttTimesheet",
          "css": "{id} .navigation-icon{width: 24px;margin: 0 12px;}"
        },
        "anchor": ".navigation-section",
        "placement": "append"
      }
    ]
  },
  {
    "id": "azureDevOpsVisualStudio",
    "domain": "*.visualstudio.com",
    "name": "Azure DevOps (visualstudio.com)",
    "app_url": "https://azure.microsoft.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/azure-devops.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Board item",
        "url": "",
        "project": "div.project-item span.text-ellipsis",
        "tasks": {
          "selector": ".work-item-view",
          "name": {
            "selector": "div.work-item-form-main-header div.work-item-control div.wrap > input",
            "attr": "value"
          },
          "id": "name",
          "url": "url",
          "prepend_to": ".work-item-form-toolbar-container .workitem-tool-bar .menu-bar",
          "css": ".ttC{margin:2px 5px;padding:0;}",
          "css_id": "azure-board-item"
        }
      },
      {
        "comment": "New Board item",
        "url": "",
        "project": "div.project-item span.text-ellipsis",
        "tasks": {
          "selector": ".work-item-form-header",
          "name": {
            "selector": ".work-item-title-textfield > input",
            "attr": "value"
          },
          "id": "name",
          "url": "url",
          "prepend_to": ".work-item-header-command-bar[role=\"menubar\"] > .work-item-header-command-bar",
          "css": ".ttC{margin:2px;}",
          "css_id": "azure-new-board-item"
        }
      }
    ],
    "components": [
      {
        "description": "nav bar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<div id=\"ttTimesheet\" class=\"hub-group-container flex-column flex-noshrink relative hub-group-only\"><a aria-label=\"TrackingTime\" class=\"hub-group navigation-element navigation-link focus-treatment flex-row flex-grow flex-center scroll-hidden relative bolt-link\" data-focuszone=\"focuszone-2\" href=\"#\" data-action=\"modal\" target=\"_self\" id=\"__bolt-ms-feed-package-hub-group-link\" tabindex=\"-1\"><span class=\"navigation-icon flex-row flex-center flex-noshrink justify-center\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"NavIcon SidebarTopNavLinks-typeIcon HomeNavIcon\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span><span class=\"navigation-text expanded-only text-ellipsis flex-grow\">TrackingTime</span></a></div>"
        },
        "style": {
          "id": "ttTimesheet",
          "css": "{id} .navigation-icon{width: 24px;margin: 0 12px;}"
        },
        "anchor": ".navigation-section",
        "placement": "append"
      }
    ]
  },
  {
    "id": "basecamp",
    "domain": "basecamp.com",
    "name": "Basecamp",
    "app": "basecamp2",
    "app_is_beta": true,
    "app_url": "https://basecamp.com/2",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/basecamp-2.png",
    "sort": 2,
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Project To-dos",
        "url": "*/projects/*",
        "project": ".project title",
        "tasks": {
          "selector": "ul .todo",
          "name": {
            "selector": ".wrapper .content a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": "this",
            "attr": "data-url",
            "prefix": "https://basecamp.com"
          },
          "append_to": ".wrapper .content",
          "css_id": "ptd",
          "css": ".ttC{vertical-align:top;margin-left:3px}.ttC .ttD{margin-right:3px}"
        }
      },
      {
        "comment": "Todolists To-dos",
        "url": "*/projects/*/todolists",
        "project": ".project > header > h1 > a",
        "tasks": {
          "selector": "ul .todo",
          "name": {
            "selector": ".wrapper .content a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": "this",
            "attr": "data-url",
            "prefix": "https://basecamp.com"
          },
          "append_to": ".wrapper .content",
          "css": ".ttC{vertical-align:top;margin-left:3px}.ttC .ttD{margin-right:3px}"
        }
      },
      {
        "comment": "Todolist To-dos",
        "url": "*/projects/*/todolists/*",
        "project": ".project > header > h1 > a",
        "tasks": {
          "selector": "ul .todo",
          "name": {
            "selector": ".wrapper .content a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": "this",
            "attr": "data-url",
            "prefix": "https://basecamp.com"
          },
          "append_to": ".wrapper .content",
          "css": ".ttC{vertical-align:top;margin-left:3px}.ttC .ttD{margin-right:3px}"
        }
      },
      {
        "comment": "To-do",
        "url": "*/projects/*/todos/*",
        "project": ".project > header > h1 > a",
        "project_alternate": ".reference_to_project a",
        "tasks": {
          "selector": "ul .todo",
          "name": {
            "selector": ".wrapper .content a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": "this",
            "attr": "data-url",
            "prefix": "https://basecamp.com"
          },
          "append_to": ".wrapper .content",
          "css": ".ttC{vertical-align:top;margin-left:3px}.ttC .ttD{margin-right:3px}"
        }
      },
      {
        "comment": "Me To-dos",
        "url": "*/people/*",
        "project": {
          "parent": ".todolist",
          "selector": "h3 a"
        },
        "tasks": {
          "selector": "ul .todo",
          "name": {
            "selector": ".wrapper .content a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": "this",
            "attr": "data-url",
            "prefix": "https://basecamp.com"
          },
          "append_to": ".wrapper .content",
          "css": ".ttC{vertical-align:top;margin-left:3px}.ttC .ttD{margin-right:3px}"
        }
      }
    ],
    "components": [
      {
        "description": "BC2: todos",
        "enabled": true,
        "app_required": true,
        "type": "player",
        "url_pattern": "/*/projects/:projectid,/*/projects/:projectid/todolists/:todolistid,/*/projects/*/todolists,/*/people/:userid",
        "template": "player",
        "selector": "ul.todos li.todo",
        "id": {
          "attr": "id",
          "parser": {
            "split": "todo_",
            "pos": "last"
          }
        },
        "anchor": ".wrapper .content",
        "placement": "append"
      },
      {
        "description": "BC2: project to-do",
        "enabled": true,
        "app_required": true,
        "type": "iframe",
        "iframe": "task_detail",
        "url_pattern": "*/projects/:projectid/todos/:id",
        "selector": "ul li.todo",
        "id": {
          "attr": "id",
          "parser": {
            "split": "todo_",
            "pos": "last"
          }
        },
        "anchor": "",
        "placement": "append"
      }
    ]
  },
  {
    "id": "basecamp3",
    "domain": "3.basecamp.com",
    "name": "Basecamp 3",
    "app": "basecamp3",
    "app_is_beta": true,
    "app_url": "https://basecamp.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/basecamp-3.png",
    "sort": 3,
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Project To-dos",
        "url": "*/buckets/*/todosets/*",
        "project": ".recording-breadcrumb__title .u-position-context a",
        "tasks": {
          "selector": ".todos .todo",
          "name": {
            "selector": ".checkbox__content > a:nth-child(1)",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": "this",
            "attr": "data-url",
            "prefix": "https://3.basecamp.com"
          },
          "insert_after": ".checkbox__content > a:nth-child(1)",
          "css_id": "b3_1",
          "css": ".ttC{vertical-align:top;margin-left:5px;padding-left:1px} @media (prefers-color-scheme: dark){ .ttC .ttB:hover {background-color: rgb(109, 109, 109)!important;} .ttC .ttA:hover {background-color: rgb(109, 109, 109) !important;}}"
        }
      },
      {
        "comment": "Todo list To-dos",
        "url": "*/buckets/*/todolists/*",
        "project": ".recording-breadcrumb__title .u-position-context a",
        "tasks": {
          "selector": ".todos .todo",
          "name": {
            "selector": ".checkbox__content > a:first-child",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": "this",
            "attr": "data-url",
            "prefix": "https://3.basecamp.com"
          },
          "append_to": ".checkbox__content > a:first-child",
          "css_id": "b3_2",
          "css": ".ttC{vertical-align:top; margin-left:5px;} @media (prefers-color-scheme: dark){ .ttC .ttB:hover {background-color: rgb(109, 109, 109)!important;} .ttC .ttA:hover {background-color: rgb(109, 109, 109) !important;}}"
        }
      },
      {
        "comment": "To-do",
        "url": "*/buckets/*/todos/*",
        "project": ".recording-breadcrumb__title .u-position-context a",
        "project_custom": "",
        "tasks": {
          "selector": ".todos .todo",
          "name": {
            "selector": ".checkbox__content a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": "this",
            "attr": "data-url",
            "prefix": "https://3.basecamp.com"
          },
          "append_to": ".checkbox__content",
          "css_id": "b3_3",
          "css": ".ttC{vertical-align:top} @media (prefers-color-scheme: dark){ .ttC .ttB:hover {background-color: rgb(109, 109, 109)!important;} .ttC .ttA:hover {background-color: rgb(109, 109, 109) !important;}}"
        }
      },
      {
        "comment": "Card table Cards",
        "url": "*/buckets/*/card_tables/*",
        "project": ".recording-breadcrumb__title .u-position-context a",
        "tasks": {
          "selector": ".kanban-content .kanban-card__wrap",
          "name": {
            "selector": ".kanban-card__title",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": ".kanban-card__link",
            "attr": "href",
            "prefix": "https://3.basecamp.com"
          },
          "append_to": ".kanban-card .kanban-card__link",
          "css_id": "b4_1",
          "css": ".ttC .ttB,.ttC .ttA {width: 22px;height: 22px;}{vertical-align:top; margin-left:5px;} @media (prefers-color-scheme: dark){ .ttC .ttB:hover {background-color: rgb(109, 109, 109)!important;} .ttC .ttA:hover {background-color: rgb(109, 109, 109) !important;}}"
        }
      },
      {
        "comment": "Card table Columns Cards",
        "url": "*/buckets/*/card_tables/columns/*",
        "project": ".recording-breadcrumb__title .u-position-context a",
        "tasks": {
          "selector": ".kanban-column .kanban-card__wrap",
          "name": {
            "selector": ".kanban-card__title",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": ".kanban-card__link",
            "attr": "href",
            "prefix": "https://3.basecamp.com"
          },
          "append_to": ".kanban-card .kanban-card__link",
          "css_id": "b4_2",
          "css": ".ttC .ttB,.ttC .ttA {width: 22px;height: 22px;}{vertical-align:top; margin-left:5px;} @media (prefers-color-scheme: dark){ .ttC .ttB:hover {background-color: rgb(109, 109, 109)!important;} .ttC .ttA:hover {background-color: rgb(109, 109, 109) !important;}}"
        }
      },
      {
        "comment": "Card",
        "url": "*/buckets/*/card_tables/cards/*",
        "project": ".recording-breadcrumb__title .u-position-context a",
        "project_custom": "",
        "tasks": {
          "selector": ".recordable",
          "name": {
            "selector": ".todo__title a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": {
            "selector": "this",
            "attr": "data-url",
            "prefix": "https://3.basecamp.com"
          },
          "append_to": ".checkbox__content",
          "css_id": "b4_3",
          "css": ".ttC{vertical-align:top} @media (prefers-color-scheme: dark){ .ttC .ttB:hover {background-color: rgb(109, 109, 109)!important;} .ttC .ttA:hover {background-color: rgb(109, 109, 109) !important;}}"
        }
      }
    ],
    "components": [
      {
        "description": "BC3: nav bar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<li id=\"ttTimesheet\" class=\"nav__item\"><a class=\"nav__link\" href=\"#\" data-action=\"modal\"><svg class=\"svg_logo\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-10 -10 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg> TrackingTime</a></li>"
        },
        "style": {
          "id": "ttTimesheet",
          "css": "{id} .nav__link{background-image: none!important;position: relative;} {id} .nav__link::before{background-image: none!important} .nav__link .svg_logo{fill: #283c46;} @media (prefers-color-scheme: dark){:root:not([data-color-scheme=\"light\"]) {id} .nav__link .svg_logo {fill: #d6d3d1!important}}"
        },
        "anchor": "#my_navigation .nav__main",
        "placement": "append"
      },
      {
        "description": "BC3: todosets & todolists",
        "enabled": true,
        "app_required": true,
        "type": "player",
        "url_pattern": "/*/todosets/:id,/*/todolists/:id",
        "template": "player",
        "selector": ".todo",
        "id": {
          "attr": "data-recording-id"
        },
        "anchor": ".checkbox__content > a:first-child",
        "placement": "append"
      },
      {
        "description": "BC3: task detail",
        "enabled": true,
        "app_required": true,
        "type": "iframe",
        "iframe": "task_detail",
        "url_pattern": "/*/todos/:id",
        "selector": ".recordable",
        "id": {
          "attr": "data-recording-id"
        },
        "anchor": ".todo__header",
        "placement": "after"
      },
      {
        "description": "BC3: project header",
        "enabled": false,
        "app_required": true,
        "type": "project_detail",
        "url_pattern": "/*/projects/:id",
        "id": {
          "attr": "data-project-id"
        },
        "selector": ".panel.panel--project",
        "anchor": ".project-header__name-text",
        "placement": "after"
      },
      {
        "description": "BC3: project breadcrumb header",
        "enabled": false,
        "app_required": true,
        "type": "project_detail",
        "url_pattern": "",
        "id": {
          "selector": ".recording-breadcrumb__title [data-target=\"breadcrumbs.link\"]",
          "attr": "href",
          "parser": {
            "split": "/projects/",
            "pos": "last"
          }
        },
        "selector": ".recording-breadcrumb",
        "anchor": ".recording-breadcrumb__title .recording-breadcrumb__children",
        "placement": "after"
      }
    ]
  },
  {
    "id": "bitbucket",
    "domain": "bitbucket.org",
    "name": "Bitbucket",
    "app_url": "https://bitbucket.org/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/bitbucket.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Repository as a Project - Source",
        "url": "*/*/src/*",
        "project": "[data-testid=\"ContextualNavigation\"] [role=\"group\"] >div:first-child [role=\"presentation\"] a div:nth-child(2) div",
        "tasks": {
          "selector": "body",
          "id": {
            "selector": "[data-testid=\"ContextualNavigation\"] [role=\"group\"] >div:first-child [role=\"presentation\"] a",
            "attr": "href"
          },
          "url": {
            "selector": "[data-testid=\"ContextualNavigation\"] [role=\"group\"] >div:first-child [role=\"presentation\"] a",
            "attr": "href",
            "prefix": "https://bitbucket.org"
          },
          "append_to": "header .sc-iGPElx.NgPUB",
          "css_id": "bp",
          "css": ".ttC{line-height:0;margin-left:10px;}"
        }
      },
      {
        "comment": "Repository as a Project - Old Breadcrumbs",
        "url": "",
        "project": "[data-testid=\"ContextualNavigation\"] [role=\"group\"] >div:first-child [role=\"presentation\"] a div:nth-child(2) div",
        "tasks": {
          "selector": "body",
          "id": {
            "selector": "[data-testid=\"ContextualNavigation\"] [role=\"group\"] >div:first-child [role=\"presentation\"] a",
            "attr": "href"
          },
          "url": "",
          "append_to": ".aui-nav.aui-nav-breadcrumbs li:nth-child(3)",
          "css_id": "bbo",
          "css": ".ttC{vertical-align: middle; margin-top: -4px; margin-left: 5px;}"
        }
      },
      {
        "comment": "Repository as a Project - New Breadcrumbs",
        "url": "",
        "project": "[data-testid=\"ContextualNavigation\"] [role=\"group\"] >div:first-child [role=\"presentation\"] a div:nth-child(2) div",
        "tasks": {
          "selector": "body",
          "id": {
            "selector": "[data-testid=\"ContextualNavigation\"] [role=\"group\"] >div:first-child [role=\"presentation\"] a",
            "attr": "href"
          },
          "url": {
            "selector": "[data-testid=\"ContextualNavigation\"] .css-79elbk a",
            "attr": "href",
            "prefix": "https://bitbucket.org"
          },
          "insert_after": "[data-testid=\"Content\"] ol > li:nth-child(3) a",
          "css_id": "bpbn",
          "css": ".ttC{margin-left:10px;height: 25px;}"
        }
      },
      {
        "comment": "Issue",
        "url": "*/*/issues/*/*",
        "project": ".aui-nav.aui-nav-breadcrumbs li:nth-child(2) a",
        "tasks": {
          "selector": "#issue-view",
          "name": {
            "selector": "#issue-title",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-id"
          },
          "url": "url",
          "append_to": "#issue-title",
          "css": "[data-project_name=Issues]{display:none}"
        }
      }
    ]
  },
  {
    "id": "favro",
    "domain": "favro.com",
    "name": "Favro",
    "app_url": "https://favro.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/favro.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Template.templateCardEditor",
        "url": "",
        "project": ".workspace-widgets .title .name .text",
        "tasks": {
          "selector": "[id='Template.templateCardEditor'] .cardeditor",
          "name": {
            "selector": ".card-details-title",
            "attr": "value"
          },
          "id": {
            "selector": "this",
            "attr": "id"
          },
          "url": "url",
          "append_to": ".cardeditor-topbar .buttons",
          "css_id": "fC",
          "css": ".ttC{margin-left:16px;}"
        }
      },
      {
        "comment": "Template.templateTimelineViewQuickEditCard",
        "url": "",
        "project": ".workspace-widgets .title .name .text",
        "tasks": {
          "selector": "[id='Template.templateTimelineViewQuickEditCard']",
          "name": {
            "selector": ".popup-field textarea",
            "attr": "value"
          },
          "id": {
            "selector": "[data-blockid]",
            "attr": "data-blockid"
          },
          "url": "url",
          "append_to": ".container>.popup-field:first-child .left",
          "css_id": "fT",
          "css": ".ttC{margin-left:16px;margin-top:3px;height:26px;}"
        }
      }
    ]
  },
  {
    "id": "freshdesk",
    "domain": "*.freshdesk.com",
    "name": "Freshdesk",
    "app_url": "https://freshdesk.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/freshdesk.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "tickets list",
        "url": "",
        "project_custom": "Freshdesk",
        "project_filter": {
          "split": ": ",
          "position": 1
        },
        "tasks": {
          "selector": "[data-test-ticket-content]:not(.list-content--inactive-data)",
          "name": {
            "selector": ".text--default a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-test-ticket-content"
          },
          "url": {
            "selector": "[data-test-link]",
            "attr": "href",
            "prefix": "origin"
          },
          "append_to": "[data-test-ticket-timestamp]",
          "css_id": "fdtl",
          "css": ".ttC{vertical-align:top}"
        }
      },
      {
        "comment": "ticket detail",
        "url": "*/tickets/*",
        "project_custom": "Freshdesk",
        "project_filter": {
          "split": ": ",
          "position": 1
        },
        "tasks": {
          "selector": ".app-main-wrapper",
          "name": {
            "selector": ".ticket-subject-heading",
            "attr": "text"
          },
          "id": {
            "selector": ".breadcrumb__item.active",
            "attr": "text"
          },
          "url": "url",
          "append_to": "#mainactionbar .page-actions__left",
          "css_id": "fdt",
          "css": ""
        }
      }
    ]
  },
  {
    "id": "gitlab",
    "domain": "gitlab.com",
    "name": "GitLab",
    "app_url": "https://gitlab.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/gitlab.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "issues detail",
        "url": "",
        "project": "#super-sidebar .contextual-nav .shortcuts-project > div:last-child",
        "project_alternate": ".nav-sidebar a .sidebar-context-title",
        "tasks": {
          "selector": "html",
          "name": {
            "selector": ".issue-details .title",
            "attr": "text"
          },
          "id": {
            "selector": "meta[property=\"og:url\"]",
            "attr": "content"
          },
          "url": {
            "selector": "meta[property=\"og:url\"]",
            "attr": "content"
          },
          "append_to": ".issue-details .awards",
          "css_id": "gid",
          "css": ".ttC{margin: 3px 8px 0px 0; border-radius: 3px; padding: 5px 10px;}"
        }
      }
    ]
  },
  {
    "id": "github",
    "domain": "github.com",
    "name": "Github",
    "app_url": "https://github.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/github.png",
    "sort": 5,
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Repository as a Proyect",
        "url": "",
        "project": "#js-repo-pjax-container [itemprop=\"name\"] a",
        "tasks": {
          "selector": "#js-repo-pjax-container [itemprop=\"name\"]",
          "name": "",
          "id": {
            "selector": "a",
            "attr": "href"
          },
          "url": {
            "selector": "a",
            "attr": "href",
            "prefix": "https://www.github.com"
          },
          "append_to": "this",
          "css_id": "r",
          "css": ".ttC{vertical-align:top;margin-left: 2px}"
        }
      },
      {
        "comment": "Issues",
        "url": "*/*/issues",
        "project": ".AppHeader-context-full nav ul li:last-child a span",
        "tasks": {
          "selector": ".js-issue-row",
          "name": {
            "selector": ".Link--primary",
            "attr": "text"
          },
          "id": {
            "selector": "[data-hovercard-type=\"issue\"]",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "url": {
            "selector": "[data-hovercard-type=\"issue\"]",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "append_to": ">div",
          "css_id": "i",
          "css": ".ttC{display:flex;margin:8px 16px;flex-shrink:0;}"
        }
      },
      {
        "comment": "Pinned Issues",
        "url": "*/*/issues",
        "project": ".AppHeader-context-full nav ul li:last-child a span",
        "tasks": {
          "selector": ".pinned-issue-item",
          "name": {
            "selector": ".Link--primary>span",
            "attr": "text"
          },
          "id": {
            "selector": ".Link--primary",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "url": {
            "selector": ".Link--primary",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "append_to": "span.mt-1",
          "css_id": "pi",
          "css": ".ttC{vertical-align:top;}.ttC .ttB,.ttC .ttA{width:20px;height:20px;background-size:16px;}.ttC.is_tracking .ttB,.ttC .ttA.is_tracking{background-size:12px;}"
        }
      },
      {
        "comment": "Issue detail",
        "url": "*/*/issues/*",
        "project": ".AppHeader-context-full nav ul li:last-child a span",
        "tasks": {
          "selector": "#js-repo-pjax-container",
          "name": {
            "selector": ".gh-header .gh-header-title .js-issue-title",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_before": ".gh-header-meta [data-hovercard-type=\"user\"]",
          "css_id": "id",
          "css": ".ttC{vertical-align:bottom;margin-right:8px;}"
        }
      },
      {
        "comment": "Issue detail on Project view",
        "url": "*/*/projects/*",
        "project": ".AppHeader-context-full nav ul li:last-child a span",
        "tasks": {
          "selector": ".js-project-card-details",
          "name": {
            "selector": " .js-issue-title",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": ".js-details-container .Details-content--shown",
          "css_id": "idp",
          "css": ".ttC{vertical-align:top}"
        }
      },
      {
        "comment": "Pull Requests",
        "url": "*/*/pulls",
        "project": ".AppHeader-context-full nav ul li:last-child a span",
        "tasks": {
          "selector": ".js-issue-row",
          "name": {
            "selector": ".Link--primary",
            "attr": "text"
          },
          "id": {
            "selector": "[data-hovercard-type=\"pull_request\"]",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "url": {
            "selector": "[data-hovercard-type=\"pull_request\"]",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "append_to": ">div",
          "css_id": "p",
          "css": ".ttC{display:flex;margin:8px 16px;flex-shrink:0;}"
        }
      },
      {
        "comment": "Pull Requests detail",
        "url": "*/*/pull/*",
        "project": ".AppHeader-context-full nav ul li:last-child a span",
        "tasks": {
          "selector": "#js-repo-pjax-container",
          "name": {
            "selector": ".gh-header .gh-header-title .js-issue-title",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_before": ".gh-header-meta [data-hovercard-type=\"user\"]",
          "css_id": "pd",
          "css": ".ttC{vertical-align:bottom;margin-right:8px;}"
        }
      },
      {
        "comment": "Pull Requests detail (commits, checks and files)",
        "url": "*/*/pull/*/commits",
        "project": ".AppHeader-context-full nav ul li:last-child a span",
        "tasks": {
          "selector": "#js-repo-pjax-container",
          "name": {
            "selector": ".gh-header .gh-header-title .js-issue-title",
            "attr": "text"
          },
          "id": {
            "selector": "nav>link:first-child",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "url": {
            "selector": "nav>link:first-child",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "insert_before": ".gh-header-meta [data-hovercard-type=\"user\"]",
          "css_id": "pd",
          "css": ".ttC{vertical-align:bottom;margin-right:8px;}"
        }
      },
      {
        "comment": "Pull Requests detail checks",
        "url": "*/*/pull/*/checks",
        "project": ".AppHeader-context-full nav ul li:last-child a span",
        "tasks": {
          "selector": "#js-repo-pjax-container",
          "name": {
            "selector": ".gh-header .gh-header-title .js-issue-title",
            "attr": "text"
          },
          "id": {
            "selector": "nav>a:first-child",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "url": {
            "selector": "nav>a:first-child",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "insert_before": ".gh-header-meta [data-hovercard-type=\"user\"]",
          "css_id": "pd",
          "css": ".ttC{vertical-align:bottom;margin-right:8px;}"
        }
      },
      {
        "comment": "Pull Requests detail files changed",
        "url": "*/*/pull/*/files",
        "project": ".AppHeader-context-full nav ul li:last-child a span",
        "tasks": {
          "selector": "#js-repo-pjax-container",
          "name": {
            "selector": ".gh-header .gh-header-title .js-issue-title",
            "attr": "text"
          },
          "id": {
            "selector": "nav>link:first-child",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "url": {
            "selector": "nav>link:first-child",
            "attr": "href",
            "prefix": "https://github.com"
          },
          "insert_before": ".gh-header-meta [data-hovercard-type=\"user\"]",
          "css_id": "pd",
          "css": ".ttC{vertical-align:bottom;margin-right:8px;}"
        }
      }
    ]
  },
  {
    "id": "ringcentral",
    "domain": "app.ringcentral.com",
    "name": "RingCentral",
    "app_url": "https://app.ringcentral.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/ringcentral.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Tasks",
        "url": "*/tasks/*",
        "project": "#home-wrapper header p",
        "tasks": {
          "selector": "[data-test-automation-class=\"task-cell\"]",
          "name": {
            "selector": "[data-test-automation-class=\"task-title\"] span",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-test-automation-value"
          },
          "url": "url",
          "append_to": "td:first-child>div",
          "css_id": "t",
          "css": ".ttC{margin: 0 0 10px 0;}"
        }
      }
    ]
  },
  {
    "id": "gmail",
    "domain": "mail.google.com",
    "name": "Gmail",
    "app_url": "https://mail.google.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/gmail.png",
    "settings": {
      "active": true,
      "allFrames": true
    },
    "rules": [
      {
        "comment": "escenario de gmail single",
        "url": "",
        "project_custom": "Gmail",
        "tasks": {
          "selector": ".ha",
          "name": {
            "selector": ".hP",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": "this",
          "css_id": "gmail"
        }
      },
      {
        "comment": "googletasks tiene que estar habilitado",
        "url": "",
        "project_custom": "Google Tasks",
        "tasks": {
          "selector": "[data-task-list-id] [role=\"listitem\"]",
          "name": {
            "selector": "[data-task-id]",
            "attr": "aria-label"
          },
          "id": {
            "selector": "[data-task-id]",
            "attr": "data-task-id"
          },
          "url": "",
          "prepend_to": "this",
          "css_id": "gtasks",
          "css": ".ttC{line-height:28px;position:absolute;right:1px;z-index:10000;}.ttC .ttB{width:20px;height:20px;}.ttC .ttA{display:none}"
        }
      }
    ]
  },
  {
    "id": "googletasks",
    "domain": "tasks.google.com",
    "name": "Google Tasks",
    "app_url": "https://mail.google.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/gtasks.png",
    "settings": {
      "active": true
    },
    "rules": []
  },
  {
    "id": "googlecalendar",
    "domain": "calendar.google.com",
    "name": "Google Calendar",
    "app_url": "https://calendar.google.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/google-calendar.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Schedule",
        "url": "",
        "project_custom": "Google Calendar",
        "tasks": {
          "selector": "[data-eventid][role=presentation]",
          "name": {
            "selector": "[role=button]",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-eventid"
          },
          "url": {
            "selector": "this",
            "attr": "data-eventid",
            "prefix": "https://calendar.google.com/?eid="
          },
          "append_to": "this",
          "css_id": "gcs",
          "css": ".dtaVuc.UflSff .ttC{opacity:0.38}.ttC{position:absolute;right:10px;}"
        }
      },
      {
        "comment": "Detail",
        "url": "",
        "project_custom": "Google Calendar",
        "tasks": {
          "selector": "[role=dialog] [data-eventid]:not([role=menu])",
          "name": {
            "selector": "[role=heading]",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-eventid"
          },
          "url": {
            "selector": "this",
            "attr": "data-eventid",
            "prefix": "https://calendar.google.com/?eid="
          },
          "insert_after": "[data-text] [role=heading]",
          "css_id": "gcsd",
          "css": ".ttC{position:absolute;right:17px;top:0;line-height:36px;}"
        }
      }
    ]
  },
  {
    "id": "drive",
    "domain": "docs.google.com",
    "name": "Google Docs",
    "app_url": "https://docs.google.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/gdocs.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Document",
        "url": "document/d/*/*",
        "project_custom": "Google Document",
        "tasks": {
          "selector": ".docs-title-widget",
          "name": {
            "selector": ".docs-title-input-label-inner",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": "this",
          "css_id": "gd",
          "css": ".ttC{vertical-align:top;height:24px;}"
        }
      },
      {
        "comment": "Spreadsheet",
        "url": "spreadsheets/d/*/*",
        "project_custom": "Google Spreadsheet",
        "tasks": {
          "selector": ".docs-title-widget",
          "name": {
            "selector": ".docs-title-input-label-inner",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": "this",
          "css_id": "gs",
          "css": ".ttC{vertical-align:top;height:24px;width:24px;padding-left:3px;margin-right:1px;}.ttC:hover{background-color:#f1f3f4;border-radius:4px;}"
        }
      },
      {
        "comment": "Presentation",
        "url": "presentation/d/*/*",
        "project_custom": "Google Presentation",
        "tasks": {
          "selector": ".docs-title-widget",
          "name": {
            "selector": ".docs-title-input-label-inner",
            "attr": "text"
          },
          "id": "href",
          "url": "",
          "append_to": "this",
          "css_id": "gp",
          "css": ".ttC{vertical-align:top;height:24px;width:24px;padding-left:3px;margin-right:1px;}.ttC:hover{background-color:#f1f3f4;border-radius:4px;}"
        }
      }
    ]
  },
  {
    "id": "googlekeep",
    "domain": "keep.google.com",
    "name": "Google Keep",
    "app_url": "https://keep.google.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/google-keep.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "tasks board",
        "url": "",
        "project_custom": "Google Keep",
        "tasks": {
          "selector": ".RNfche:not(.CmABtb)",
          "name": {
            "selector": ".IZ65Hb-YPqjbf.r4nke-YPqjbf[role=textbox]",
            "attr": "text"
          },
          "id": "name",
          "url": "url",
          "append_to": "this",
          "css_id": "k",
          "css": ".ttC{position:absolute;top:20px;left:-10px;width:25px;opacity:0;}.ttC .ttA {margin: 5px 0 0 0;} .RNfche:hover .ttC,.ttC.is_tracking{opacity:1;}"
        }
      }
    ]
  },
  {
    "id": "insightly",
    "domain": "*.insight.ly",
    "name": "Insightly",
    "app_url": "https://insight.ly/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/insightly.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "project details",
        "url": "Projects/Details/*",
        "project": "#content .title #entityname",
        "tasks": {
          "selector": "#content",
          "name": "",
          "id": "url",
          "url": "url",
          "append_to": ".title h1",
          "ccs_id": "1",
          "css": ".ttC{vertical-align:top;vertical-align:top;line-height:100%;}"
        }
      },
      {
        "comment": "tasks details",
        "url": "Tasks/TaskDetails/*",
        "project": ".property-table .info a[href*='/Projects/Details/']",
        "tasks": {
          "selector": "#content",
          "name": {
            "selector": ".title #entityname",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": ".title h1",
          "ccs_id": "2",
          "css": ".ttC{vertical-align:top;vertical-align:top;line-height:100%;}"
        }
      }
    ]
  },
  {
    "id": "insightly-crm",
    "domain": "*.insightly.com",
    "name": "Insightly CRM",
    "app_url": "https://www.insightly.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/insightly.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Details",
        "url": "",
        "project": "#main-container.details #field-render-RelatedTo .metadata-row-viewer .metadata-row-viewer-lookup>a",
        "tasks": {
          "selector": "#body-frame:not(.project):not(.opportunity):not(.email) #left-frame",
          "name": {
            "selector": ".metadata-page-render>section:first-of-type .metadata-row-render:nth-child(2) .metadata-row-viewer>div>div:first-child",
            "attr": "title"
          },
          "id": {
            "selector": "#left-tabs li:first-child a",
            "attr": "href"
          },
          "url": {
            "selector": "#left-tabs li:first-child a",
            "attr": "href",
            "prefix": "origin"
          },
          "append_to": "#left-tabs",
          "css_id": "de",
          "css": ".ttC{margin-right:10px;line-height:25px;padding:0 6px;}"
        }
      },
      {
        "comment": "Project and Opportunity Detail",
        "url": "",
        "project": "#main-container.details #entityname",
        "tasks": {
          "selector": "#body-frame.project #left-frame, #body-frame.opportunity #left-frame",
          "name": "",
          "id": {
            "selector": "#left-tabs li:first-child a",
            "attr": "href"
          },
          "url": {
            "selector": "#left-tabs li:first-child a",
            "attr": "href",
            "prefix": "origin"
          },
          "append_to": "#left-tabs",
          "css_id": "pde",
          "css": ".ttC{margin-right:10px;line-height:25px;padding:0 6px;}"
        }
      },
      {
        "comment": "Email Detail",
        "url": "",
        "project": "#main-container.details #field-render-RelatedTo .metadata-row-viewer .metadata-row-viewer-lookup>a",
        "tasks": {
          "selector": "#body-frame.email #left-frame",
          "name": {
            "selector": ".metadata-page-render>section:first-of-type .metadata-row-render:nth-child(1) .metadata-row-viewer>div>div:first-child",
            "attr": "title"
          },
          "id": {
            "selector": "#left-tabs li:first-child a",
            "attr": "href"
          },
          "url": {
            "selector": "#left-tabs li:first-child a",
            "attr": "href",
            "prefix": "origin"
          },
          "append_to": "#left-tabs",
          "css_id": "de",
          "css": ".ttC{margin-right:10px;line-height:25px;padding:0 6px;}"
        }
      }
    ]
  },
  {
    "id": "flow",
    "domain": "app.getflow.com",
    "name": "Flow",
    "app_url": "https://app.getflow.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/flow.svg",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Task detail",
        "url": "",
        "project": ".task-view .task-view-breadcrumbs a:first-child label",
        "tasks": {
          "selector": ".task-view",
          "name": {
            "selector": ".x-task-form-field-name textarea",
            "attr": "value"
          },
          "id": {
            "selector": ".task-view-header-controls.right a[href]",
            "attr": "href"
          },
          "url": {
            "selector": ".task-view-header-controls.right a[href]",
            "attr": "href"
          },
          "prepend_to": ".task-view-header-controls.right",
          "css_id": "ftd",
          "css": ".ttC{margin-right:10px;}"
        }
      },
      {
        "comment": "Tasks | Project List",
        "url": "",
        "project": {
          "parent": ".task-list-row-item",
          "selector": ".task-list-item-project-name"
        },
        "tasks": {
          "selector": ".task-list-row-item",
          "name": {
            "selector": ".task-list-row-item-text-task-name",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "href",
            "prefix": "https://app.getflow.com"
          },
          "url": {
            "selector": "this",
            "attr": "href",
            "prefix": "https://app.getflow.com"
          },
          "insert_before": ".task-list-row-item-segment-project",
          "css_id": "ftl",
          "css": ".ttC{margin-right:10px;line-height:42px;}"
        }
      },
      {
        "comment": "Project board",
        "url": "",
        "project": "#app-content .content-header-title label",
        "tasks": {
          "selector": ".task-list-row-item",
          "name": {
            "selector": ".task-list-row-item-text-task-name",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "href",
            "prefix": "https://app.getflow.com"
          },
          "url": {
            "selector": "this",
            "attr": "href",
            "prefix": "https://app.getflow.com"
          },
          "insert_before": ".task-list-item-menu-trigger",
          "css_id": "ftb",
          "css": ".ttC{margin-right:10px;}"
        }
      }
    ]
  },
  {
    "id": "atlassian",
    "domain": "*.atlassian.net",
    "name": "Jira Software",
    "app_url": "https://www.atlassian.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/jira.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Project",
        "url": "",
        "project": "[data-testid=\"ContextualNavigation\"] [data-navheader] [data-item-title=\"true\"]",
        "tasks": {
          "selector": "#jira #ak-main-content nav>ol>li>a[href^=\"/browse/\"]",
          "name": {
            "selector": "",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "href"
          },
          "url": {
            "selector": "this",
            "attr": "href",
            "prefix": "origin"
          },
          "append_to": "this",
          "css_id": "j_project",
          "css": ".ttC{margin-left:5px;}"
        }
      },
      {
        "comment": "Projects (/secure/RapidBoard.jspa?)",
        "url": "",
        "project": "[data-testid=\"ContextualNavigation\"] [role=\"presentation\"]:nth-child(1) button > div:nth-child(2) > div:nth-child(1)",
        "tasks": {
          "selector": "#breadcrumbs-container",
          "name": {
            "selector": "",
            "attr": "text"
          },
          "id": {
            "selector": "[class^=\"BreadcrumbsContainer\"] [class^=\"BreadcrumbsItem\"] a[href^=\"/browse/\"]",
            "attr": "href"
          },
          "url": {
            "selector": "[class^=\"BreadcrumbsContainer\"] [class^=\"BreadcrumbsItem\"] a[href^=\"/browse/\"]",
            "attr": "href",
            "prefix": "origin"
          },
          "append_to": "[class^=\"BreadcrumbsContainer\"]",
          "css_id": "j_project_old",
          "css": ".ttC{margin-left:5px;}"
        }
      },
      {
        "comment": "Issue detail /browse/",
        "url": "",
        "project": "[data-testid=\"ContextualNavigation\"] [data-navheader] [data-item-title=\"true\"]",
        "tasks": {
          "selector": "#jira [data-testid=\"Content\"]",
          "name": {
            "selector": "[data-test-id=\"issue.views.issue-base.foundation.summary.heading\"]",
            "attr": "text"
          },
          "id": {
            "selector": "#jira-issue-header [data-test-id=\"issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container\"] a[href^=\"/browse/\"]",
            "attr": "text"
          },
          "url": {
            "selector": "#jira-issue-header [data-test-id=\"issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container\"] a[href^=\"/browse/\"]",
            "attr": "href",
            "prefix": "origin"
          },
          "insert_after": "#jira-issue-header [data-test-id=\"issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container\"]",
          "css_id": "j_issue_browser"
        }
      },
      {
        "comment": "Issue detail /browse/ new-jira-issue-view",
        "url": "",
        "project": "[data-testid=\"ContextualNavigation\"] [data-navheader] [data-item-title=\"true\"]",
        "project_alternate": "#ak-project-view-navigation h1",
        "tasks": {
          "selector": "[data-testid*=\"issue.views.issue-details\"]",
          "name": {
            "selector": "[data-testid=\"issue.views.issue-base.foundation.summary.heading\"]",
            "attr": "text"
          },
          "id": {
            "selector": "#jira-issue-header [data-testid=\"issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container\"] a[href^=\"/browse/\"]",
            "attr": "text"
          },
          "url": {
            "selector": "#jira-issue-header [data-testid=\"issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container\"] a[href^=\"/browse/\"]",
            "attr": "href",
            "prefix": "origin"
          },
          "insert_after": "#jira-issue-header [data-testid=\"issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container\"]",
          "css_id": "j_issue_browser_new"
        }
      },
      {
        "comment": "Issue detail popup",
        "url": "",
        "project": "[data-testid=\"ContextualNavigation\"] [data-navheader] [data-item-title=\"true\"], #ak-project-view-navigation h1",
        "tasks": {
          "selector": "#jira [role=\"dialog\"]",
          "name": {
            "selector": "[data-testid=\"issue.views.issue-base.foundation.summary.heading\"]",
            "attr": "text"
          },
          "id": {
            "selector": "#jira-issue-header [data-testid=\"issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container\"] a[href^=\"/browse/\"]",
            "attr": "text"
          },
          "url": {
            "selector": "#jira-issue-header [data-testid=\"issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container\"] a[href^=\"/browse/\"]",
            "attr": "href",
            "prefix": "origin"
          },
          "insert_after": "#jira-issue-header [data-testid=\"issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container\"]",
          "css_id": "j_issue_pop"
        }
      },
      {
        "comment": "Issue detail /browse/*?oldIssueView=true | self .atlassian.com",
        "url": "",
        "project": "[data-testid=\"ContextualNavigation\"] [data-navheader] [data-item-title=\"true\"],#project-name-val",
        "tasks": {
          "selector": ".aui-page-header-main",
          "name": {
            "selector": "#summary-val",
            "attr": "text"
          },
          "id": {
            "selector": ".issue-link",
            "attr": "data-issue-key"
          },
          "url": {
            "selector": ".issue-link",
            "attr": "href",
            "prefix": "origin"
          },
          "append_to": ".issue-link",
          "css_id": "j_issue_old",
          "css": ".ttC{margin-left:5px;}"
        }
      }
    ]
  },
  {
    "id": "monday",
    "domain": "*.monday.com",
    "name": "Monday",
    "app_url": "https://monday.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/monday.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "pulse detail",
        "url": "boards/*/pulses/*",
        "project": "#board-header .board-header-main .board-name h1",
        "tasks": {
          "selector": "#slide-panel-container",
          "name": {
            "selector": ".pulse_title h2",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_after": ".title-wrapper",
          "css_id": "m",
          "css": ".ttC{height:100%;line-height:40px;}"
        }
      }
    ]
  },
  {
    "id": "outlook",
    "domain": "outlook.live.com",
    "name": "Outlook | Live",
    "app_url": "https://outlook.live.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/outlook.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "detalle de e-mail 2020",
        "url": "",
        "project_custom": "Outlook",
        "tasks": {
          "selector": "[role=main]",
          "name": {
            "selector": "[role=heading]>div>span",
            "attr": "text"
          },
          "id": "name",
          "url": "url",
          "append_to": "[role=heading]>div",
          "css_id": "outlook_live",
          "css": ".ttC{vertical-align:top;display:inline;top:-2px;}"
        }
      }
    ]
  },
  {
    "id": "outlook_office",
    "domain": "outlook.office.com",
    "name": "Outlook | Office",
    "app_url": "https://outlook.live.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/outlook.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "detalle de e-mail",
        "url": "",
        "project_custom": "Outlook",
        "tasks": {
          "selector": "[role=main]",
          "name": {
            "selector": "[role=heading]>div>span",
            "attr": "text"
          },
          "id": "name",
          "url": "url",
          "append_to": "[role=heading]>div",
          "css_id": "outlook_office",
          "css": ".ttC{vertical-align:top;display:inline;top:-2px;}"
        }
      }
    ]
  },
  {
    "id": "outlook_office_365",
    "domain": "outlook.office365.com",
    "name": "Outlook | Office 365",
    "app_url": "https://outlook.live.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/outlook.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "detalle de e-mail",
        "url": "",
        "project_custom": "Outlook",
        "tasks": {
          "selector": "[role=main]",
          "name": {
            "selector": "[role=heading]>div>span",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": "[role=heading]>div",
          "css_id": "outlook_365",
          "css": ".ttC{vertical-align:top;display:inline;top:-2px;}"
        }
      }
    ]
  },
  {
    "id": "podio",
    "domain": "podio.com",
    "name": "Podio",
    "app_url": "https://podio.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/podio.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Task detail",
        "url": "tasks/*",
        "project": ".field-reference .title",
        "tasks": {
          "selector": ".task-header",
          "name": {
            "selector": ".header-title",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": ".action-bar",
          "css": ".ttC{margin-top: 4px!important;}"
        }
      },
      {
        "comment": "Project detail",
        "url": "*/*/apps/projects/*/*",
        "project": ".breadcrumb .item-title",
        "tasks": {
          "selector": ".breadcrumb",
          "name": "",
          "id": "url",
          "url": "url",
          "append_to": "this"
        }
      },
      {
        "comment": "Task inside app project",
        "url": "*/*/apps/projects/*/*",
        "project": ".breadcrumb .item-title",
        "tasks": {
          "selector": ".task-list li",
          "name": {
            "selector": ".task-title",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-id",
            "prefix": "https://podio.com/tasks/"
          },
          "url": {
            "selector": "this",
            "attr": "data-id",
            "prefix": "https://podio.com/tasks/"
          },
          "append_to": ".bd"
        }
      },
      {
        "comment": "Project detail",
        "url": "*/*/apps/*!projects/*/*",
        "project": ".breadcrumb .space-name",
        "tasks": {
          "selector": ".breadcrumb",
          "name": "",
          "id": "url",
          "url": "url",
          "append_to": "this"
        }
      },
      {
        "comment": "Task inside app project",
        "url": "*/*/apps/*!projects/*/*",
        "project": ".breadcrumb .space-name",
        "tasks": {
          "selector": ".task-list li",
          "name": {
            "selector": ".task-title",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-id",
            "prefix": "https://podio.com/tasks/"
          },
          "url": {
            "selector": "this",
            "attr": "data-id",
            "prefix": "https://podio.com/tasks/"
          },
          "append_to": ".bd"
        }
      }
    ]
  },
  {
    "id": "redbooth.com",
    "domain": "redbooth.com",
    "name": "Redbooth",
    "app_url": "https://redbooth.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/redbooth.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Task detail",
        "url": "",
        "project": ".js-element.cb__header .js-subtitle a:first-child",
        "tasks": {
          "selector": ".js-element.cb__header",
          "name": {
            "selector": ".js-title-link",
            "attr": "text"
          },
          "id": {
            "selector": ".js-title-link",
            "attr": "href"
          },
          "url": {
            "selector": ".js-title-link",
            "attr": "href",
            "prefix": "origin"
          },
          "append_to": ".tb-element-meta",
          "css_id": "r",
          "css": ".ttC{float:left;padding:2px 5px 2px 5px;}"
        }
      }
    ]
  },
  {
    "id": "redmine",
    "domain": "*.redmine.org",
    "name": "Redmine",
    "app_url": "https://redmine.org/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/redmine.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "redmine issues detail",
        "url": "issues/*",
        "project": "#header h1",
        "tasks": {
          "selector": "#main",
          "name": {
            "selector": "#content h2",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": "#content h2",
          "ccs_id": "r",
          "css": ".ttC{vertical-align:top;margin:-2px 0 0 10px;}"
        }
      }
    ]
  },
  {
    "id": "rememberthemilk",
    "domain": "www.rememberthemilk.com",
    "name": "Remember The Milk",
    "app_url": "https://www.rememberthemilk.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/remember-the-milk.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "",
        "url": "",
        "project": "a[href^='#list']",
        "tasks": {
          "selector": ".b-cS-Bd-zS",
          "name": {
            "selector": ".b-l.b-l-kQ .b-l-Tj",
            "attr": "text"
          },
          "id": "name",
          "url": "url",
          "insert_before": ".b-cS-Bd-jX",
          "css_id": "rtm",
          "css": ".ttC{margin:0 5px 17px 42px!important}"
        }
      }
    ]
  },
  {
    "id": "smartsheet",
    "domain": "*.smartsheet.com",
    "name": "Smartsheet",
    "app_url": "https://www.smartsheet.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/smartsheet.png",
    "settings": {
      "active": true,
      "allFrames": true
    },
    "rules": [
      {
        "comment": "Time tracking formula",
        "url": "",
        "project": "",
        "tasks": {
          "selector": "td:contains('TrackingTime')",
          "name": {
            "selector": "",
            "attr": "text"
          },
          "id": "",
          "url": "url",
          "prepend_to": "this",
          "css_id": "1",
          "css": ".ttC{margin:0 5px}"
        }
      },
      {
        "comment": "new design",
        "url": "",
        "project": "",
        "tasks": {
          "selector": ".gridCell .gridCellContent:contains('TrackingTime')",
          "name": {
            "selector": "",
            "attr": "text"
          },
          "id": "",
          "url": "url",
          "prepend_to": "this",
          "show_title": false,
          "css_id": "2",
          "css": ".ttC{margin:0 5px}"
        }
      }
    ]
  },
  {
    "id": "supportpal",
    "domain": "*.supportpal.com",
    "name": "SupportPal",
    "app_url": "https://www.supportpal.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/SupportPal.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "",
        "url": "",
        "project": "[name=department] [selected=selected]",
        "tasks": {
          "selector": "#content",
          "name": {
            "selector": ".sp-ticket-subject",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_before": ".sp-quick-actions ul li:last-child",
          "css": ".ttC{padding-left:1rem;padding-right:1rem;padding-top:.5rem;padding-bottom:.5rem;}",
          "css_id": "sp"
        }
      }
    ]
  },
  {
    "id": "taskade",
    "domain": "www.taskade.com",
    "name": "Taskade",
    "app_url": "https://www.taskade.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/taskade.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "list view",
        "url": "spaces/*",
        "project": "button[class^=\"FolderOptionsDropdown__StyledDropdownToggle\"] span[class^=\"FolderOptionsDropdown__StyledTitleValue\"]",
        "tasks": {
          "selector": "a[href^=\"/d/\"]",
          "name": {
            "selector": "span[class^=\"DocumentItem__Title\"]",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "href",
            "prefix": "origin"
          },
          "url": {
            "selector": "this",
            "attr": "href",
            "prefix": "origin"
          },
          "prepend_to": "div[class^=\"ProjectAttachmentsBody__ProjectAddons\"]",
          "css_id": "t",
          "css": ".ttC{margin-right:6px;vertical-align:top;line-height:23px}"
        }
      },
      {
        "comment": "detail view",
        "url": "d/*",
        "project": "header a[href^=\"/spaces/\"]:not([class^=\"new-list\"])",
        "tasks": {
          "selector": ".tc-container",
          "name": {
            "selector": ".nodes-wrapper .project-title [class^=\"styled__ProjectTitle\"] > div span span",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "prepend_to": "div[class^=\"ProjectAttachmentsBody__ProjectAddons\"]",
          "css_id": "td",
          "css": ".ttC{margin-right:6px;vertical-align:top;line-height:23px}"
        }
      }
    ]
  },
  {
    "id": "taskBoard",
    "domain": "tasksboard.com",
    "name": "TaskBoard",
    "app_url": "https://tasksboard.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/taskboard.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Track board",
        "url": "",
        "project": "div#board > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)",
        "tasks": {
          "selector": "#board",
          "name": {
            "selector": "",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": "> div:nth-child(2) > div:nth-child(1)",
          "css": ".ttC{padding-left: 0.5rem;}"
        }
      }
    ],
    "components": [
      {
        "description": "Drawer Menu",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<a id=\"ttTimesheet\" href=\"#\" data-action=\"modal\" target=\"_self\"><div class=\"ttLink\"><div class=\"MuiListItemIcon-root\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"NavIcon SidebarTopNavLinks-typeIcon HomeNavIcon\" style=\"width: 1.6em;opacity: 0.5;\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></div><div class=\"MuiListItemText-root\"><span class=\"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock\">TrackingTime</span></div></div></a>"
        },
        "anchor": "div.MuiDrawer-root ul.MuiList-root",
        "placement": "prepend",
        "style": {
          "id": "ttTimesheet",
          "css": "{id} .ttLink{width: 100%; display: flex; position: relative; box-sizing: border-box; text-align: left; -webkit-box-align: center; align-items: center; padding: 8px 16px; -webkit-box-pack: start; justify-content: flex-start; text-decoration: none; cursor: pointer;}"
        }
      }
    ]
  },
  {
    "id": "ticktick",
    "domain": "ticktick.com",
    "name": "TickTick",
    "app_url": "https://ticktick.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/ticktick.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task details",
        "url": "",
        "project_custom": "Tick Tick",
        "tasks": {
          "selector": "#detail-view",
          "name": {
            "selector": "#tasktitle span[role=presentation]",
            "attr": "text"
          },
          "id": "name",
          "url": "",
          "insert_after": "#td-caption",
          "css_id": "tk",
          "css": ".ttC{width:100%;padding:0 20px 4px 20px;}"
        }
      }
    ]
  },
  {
    "id": "todoist",
    "domain": "*.todoist.com",
    "name": "Todoist",
    "app": "todoist",
    "app_is_beta": true,
    "app_url": "https://todoist.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/todoist.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "inbox / project",
        "url": "app/project/*",
        "project": "main [data-project-id] [data-testid=large-header] h1",
        "tasks": {
          "selector": "main ul.items li.task_list_item",
          "name": {
            "selector": ".task_list_item__content .task_content,.task_list_item__content .task_content>a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-item-id"
          },
          "url": {
            "selector": "this",
            "attr": "data-item-id",
            "prefix": "https://todoist.com/app#task/"
          },
          "prepend_to": ".task_list_item__actions",
          "show_duration": true,
          "css_mode": false,
          "css_id": "project_item_list",
          "css": ".ttC .ttB{background-image:none!important;position:relative}.ttC .ttB::before{display:inline-block;width:0;height:0;border-left:8px solid #888;border-top:5px solid transparent;border-bottom:5px solid transparent;content:'';position:absolute;top:50%;left:50%;margin-top:-5px;margin-left:-3px}.ttC .ttB:hover::before{border-left-color:#fff}.ttC.is_tracking .ttB::before{border:4px solid #fff;margin-top:-4px;margin-left:-4px}.ttC .ttA{background-image:none!important;position:relative}.ttC .ttA::before,.ttC .ttA::after{content:'';position:absolute;background-color:#888}.ttC .ttA::before{width:11px;height:1px;left:50%;top:50%;margin-left:-5px}.ttC .ttA::after{width:1px;height:11px;left:50%;top:50%;margin-top:-5px}.ttC .ttA:hover::before,.ttC .ttA:hover::after{background-color:#fff} .ttC{opacity:0;height:24px;vertical-align:middle;} .task_list_item:hover .ttC{opacity:1}"
        }
      },
      {
        "comment": "project board",
        "url": "app/project/*",
        "project": "main [data-project-id] [data-testid=large-header] h1",
        "tasks": {
          "selector": "main .board_section .board_section__task_list .board_task",
          "name": {
            "selector": ".board_task__details .task_content,.board_task__details .task_content>a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-selection-id"
          },
          "url": {
            "selector": "this",
            "attr": "data-selection-id",
            "prefix": "https://todoist.com/app#task/"
          },
          "prepend_to": ".board_task__details__actions",
          "show_duration": true,
          "css_mode": false,
          "css_id": "project_item_list",
          "css": ".ttC .ttB{background-image:none!important;position:relative}.ttC .ttB::before{display:inline-block;width:0;height:0;border-left:8px solid #888;border-top:5px solid transparent;border-bottom:5px solid transparent;content:'';position:absolute;top:50%;left:50%;margin-top:-5px;margin-left:-3px}.ttC .ttB:hover::before{border-left-color:#fff}.ttC.is_tracking .ttB::before{border:4px solid #fff;margin-top:-4px;margin-left:-4px}.ttC .ttA{background-image:none!important;position:relative}.ttC .ttA::before,.ttC .ttA::after{content:'';position:absolute;background-color:#888}.ttC .ttA::before{width:11px;height:1px;left:50%;top:50%;margin-left:-5px}.ttC .ttA::after{width:1px;height:11px;left:50%;top:50%;margin-top:-5px}.ttC .ttA:hover::before,.ttC .ttA:hover::after{background-color:#fff} .ttC{opacity:0;height:24px;vertical-align:middle;width:25px;}.ttC .ttA{display:none;}.board_task:hover .ttC{opacity:1}"
        }
      },
      {
        "comment": "today",
        "url": "app/today",
        "project": {
          "parent": ".task_list_item",
          "selector": ".task_list_item__project a span"
        },
        "project_filter": {
          "split": "/ ",
          "position": 0
        },
        "tasks": {
          "selector": "main ul.items li.task_list_item",
          "name": {
            "selector": ".task_list_item__content .task_content,.task_list_item__content .task_content>a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-item-id"
          },
          "url": {
            "selector": "this",
            "attr": "data-item-id",
            "prefix": "https://todoist.com/app#task/"
          },
          "prepend_to": ".task_list_item__actions",
          "show_duration": true,
          "css_mode": false,
          "css_id": "today_item",
          "css": ".ttC .ttB{background-image:none!important;position:relative}.ttC .ttB::before{display:inline-block;width:0;height:0;border-left:8px solid #888;border-top:5px solid transparent;border-bottom:5px solid transparent;content:'';position:absolute;top:50%;left:50%;margin-top:-5px;margin-left:-3px}.ttC .ttB:hover::before{border-left-color:#fff}.ttC.is_tracking .ttB::before{border:4px solid #fff;margin-top:-4px;margin-left:-4px}.ttC .ttA{background-image:none!important;position:relative}.ttC .ttA::before,.ttC .ttA::after{content:'';position:absolute;background-color:#888}.ttC .ttA::before{width:11px;height:1px;left:50%;top:50%;margin-left:-5px}.ttC .ttA::after{width:1px;height:11px;left:50%;top:50%;margin-top:-5px}.ttC .ttA:hover::before,.ttC .ttA:hover::after{background-color:#fff} .ttC{opacity:0;height:24px;vertical-align:middle;} .task_list_item:hover .ttC{opacity:1}"
        }
      },
      {
        "comment": "upcoming",
        "url": "app/upcoming",
        "project": {
          "parent": ".task_list_item",
          "selector": ".task_list_item__project a span"
        },
        "project_filter": {
          "split": "/ ",
          "position": 0
        },
        "tasks": {
          "selector": "main ul.items li.task_list_item",
          "name": {
            "selector": ".task_list_item__content .task_content,.task_list_item__content .task_content>a",
            "attr": "text"
          },
          "id": {
            "selector": "this",
            "attr": "data-item-id"
          },
          "url": {
            "selector": "this",
            "attr": "data-item-id",
            "prefix": "https://todoist.com/app#task/"
          },
          "prepend_to": ".task_list_item__actions",
          "show_duration": true,
          "css_mode": false,
          "css_id": "upcoming_item",
          "css": ".ttC .ttB{background-image:none!important;position:relative}.ttC .ttB::before{display:inline-block;width:0;height:0;border-left:8px solid #888;border-top:5px solid transparent;border-bottom:5px solid transparent;content:'';position:absolute;top:50%;left:50%;margin-top:-5px;margin-left:-3px}.ttC .ttB:hover::before{border-left-color:#fff}.ttC.is_tracking .ttB::before{border:4px solid #fff;margin-top:-4px;margin-left:-4px}.ttC .ttA{background-image:none!important;position:relative}.ttC .ttA::before,.ttC .ttA::after{content:'';position:absolute;background-color:#888}.ttC .ttA::before{width:11px;height:1px;left:50%;top:50%;margin-left:-5px}.ttC .ttA::after{width:1px;height:11px;left:50%;top:50%;margin-top:-5px}.ttC .ttA:hover::before,.ttC .ttA:hover::after{background-color:#fff} .ttC{opacity:0;height:24px;vertical-align:middle;} .task_list_item:hover .ttC{opacity:1}"
        }
      },
      {
        "comment": "single task",
        "url": "",
        "project": "[data-testid=\"task-detail-default-header\"] > a:first-child span",
        "tasks": {
          "selector": "[role=\"dialog\"]",
          "name": {
            "selector": "[data-item-detail-root]",
            "attr": "data-item-content"
          },
          "id": {
            "selector": "[data-item-detail-root]",
            "attr": "data-item-id"
          },
          "url": {
            "selector": "[data-item-detail-root]",
            "attr": "data-item-id",
            "prefix": "https://todoist.com/app#task/"
          },
          "append_to": "[data-testid=\"task-detail-default-header\"]",
          "show_duration": true,
          "css_mode": false,
          "css_id": "item",
          "css": ".ttC .ttB{background-image:none!important;position:relative}.ttC .ttB::before{display:inline-block;width:0;height:0;border-left:8px solid #888;border-top:5px solid transparent;border-bottom:5px solid transparent;content:'';position:absolute;top:50%;left:50%;margin-top:-5px;margin-left:-3px}.ttC .ttB:hover::before{border-left-color:#fff}.ttC.is_tracking .ttB::before{border:4px solid #fff;margin-top:-4px;margin-left:-4px}.ttC .ttA{background-image:none!important;position:relative}.ttC .ttA::before,.ttC .ttA::after{content:'';position:absolute;background-color:#888}.ttC .ttA::before{width:11px;height:1px;left:50%;top:50%;margin-left:-5px}.ttC .ttA::after{width:1px;height:11px;left:50%;top:50%;margin-top:-5px}.ttC .ttA:hover::before,.ttC .ttA:hover::after{background-color:#fff} .ttC{line-height:20px}"
        }
      }
    ],
    "components": [
      {
        "description": "nav bar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "/app/*",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<li id=\"ttTimesheet\" data-action=\"modal\"><span class=\"item_icon\"><svg width=\"18\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-5 -5 100 100\" style=\" fill: #545454; \"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span><span class=\"item_content\">TrackingTime</span></li>"
        },
        "anchor": "#top-menu",
        "placement": "append",
        "style": {
          "id": "nav_bar_button_style",
          "css": "{id}{ height: 34px; padding: 0 10px; line-height: 34px; border-radius: var(--reactist-border-radius-small); font-size: 0; display: flex; justify-content: flex-start; align-items: center; cursor: pointer; } {id}:hover { background-color:#eee; } {id} .item_icon{ width: 18px; height: 18px; line-height: 18px; } {id} .item_content{ font-size: 14px; line-height: 17px; margin-left: 10px; }"
        }
      },
      {
        "description": "tasks on project list",
        "enabled": true,
        "app_required": true,
        "type": "player",
        "url_pattern": "/app/*",
        "template": "player",
        "selector": ".task_list_item",
        "id": {
          "attr": "data-item-id"
        },
        "anchor": ".task_list_item__actions",
        "placement": "prepend",
        "style": {
          "id": "task_on_list",
          "css": "{id}.TT_list_player_:not(.is_tracking){opacity:0;}.task_list_item:hover {id}.TT_list_player_{opacity:1}"
        }
      },
      {
        "description": "tasks on project board",
        "enabled": true,
        "app_required": true,
        "type": "player",
        "url_pattern": "/app/#project/:id",
        "template": "mini_player",
        "selector": ".board_task",
        "id": {
          "selector": "[id]",
          "attr": "id",
          "parser": {
            "split": "-",
            "pos": 1
          }
        },
        "anchor": ".board_task__details",
        "placement": "append"
      },
      {
        "description": "task detail",
        "enabled": true,
        "app_required": true,
        "type": "iframe",
        "iframe": "task_detail",
        "url_pattern": "/app/#task/:id",
        "selector": ".item_detail",
        "id": {
          "url_pattern": "/app/#task/:id",
          "attr": "id"
        },
        "anchor": ".item_overview_footer",
        "placement": "prepend"
      },
      {
        "description": "project header",
        "enabled": false,
        "app_required": true,
        "type": "project_detail",
        "url_pattern": "/app/#project/:id",
        "id": {
          "attr": "data-project-id"
        },
        "selector": ".project_editor_instance",
        "anchor": ".view_header__actions",
        "placement": "prepend"
      }
    ]
  },
  {
    "id": "trello",
    "domain": "trello.com",
    "name": "Trello",
    "third_party_app": {
      "key": "trello",
      "text": "Enable Power-Up",
      "url": "https://trello.com/power-ups/5f808abe91c1cc5574585240/enable"
    },
    "app_url": "https://trello.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/trello.png",
    "sort": 4,
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Card detail",
        "url": "c/*/*",
        "project": ".mod-board-name .board-header-btn-text",
        "tasks": {
          "selector": ".window-header",
          "name": {
            "selector": ".window-title h2",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": ".js-current-list",
          "show_duration": true,
          "css": ".ttC{margin-left: 10px;padding-left: 8px;border-left: 1px solid #d2d2d2;position:relative;top:-2px}"
        }
      }
    ],
    "components": [
      {
        "description": "Trello header",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "*/boards",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<button id=\"ttTimesheet\" data-action=\"modal\"><span>TrackingTime</span><svg class=\"svg_logo\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></button>"
        },
        "anchor": "[data-test-id=\"header-create-menu-button\"]",
        "placement": "before",
        "style": {
          "id": "ttTimesheet",
          "css": "{id}{border-radius:3px;align-items:center;background-color:hsla(0,0%,100%,.3);color:#fff;fill:#fff;display:flex;font-weight:700;margin:0 4px 0 0;padding-right: 9px;} {id} .svg_logo {width: 20px; height: 20px; margin-left: 10px;}"
        }
      },
      {
        "description": "Card Detail",
        "enabled": true,
        "app_required": true,
        "type": "iframe",
        "iframe": "task_detail",
        "url_pattern": "/c/*",
        "selector": ".card-detail-window",
        "id": {
          "url_pattern": "/c/:id/*",
          "attr": "id"
        },
        "anchor": ".description-content",
        "placement": "after",
        "style": {
          "id": "trello_detail",
          "css": "{id}.TT_iframe_player_{margin-top:10px}"
        }
      },
      {
        "description": "Add event",
        "enabled": true,
        "app_required": true,
        "type": "modal",
        "modal": {
          "display": "right",
          "iframe": "add_event",
          "title": "Add new event"
        },
        "template": {
          "selector": ".TT_add_event_",
          "html": "<div class=\"TT_add_event_ window-module u-clearfix\"><h3 class=\"mod-no-top-margin\">TrackingTime</h3><div class=\"u-clearfix\"><a class=\"button-link\" href=\"#\" title=\"Add Event\" data-action=\"modal\"><span class=\"icon-sm icon-list\"></span><span>Add Event</span></a></div></div>"
        },
        "url_pattern": "/c/*",
        "selector": ".card-detail-window",
        "id": {
          "url_pattern": "/c/:id/*",
          "attr": "id"
        },
        "anchor": ".js-plugin-buttons",
        "placement": "before",
        "style": {
          "id": "trello_detail",
          "css": "#trello_detail.TT_iframe_player_{ margin-top:10px}"
        }
      },
      {
        "description": "Card on Board",
        "enabled": true,
        "app_required": true,
        "type": "player",
        "template": "mini_player",
        "url_pattern": "/b/:id/*",
        "selector": ".list-card[href]",
        "id": {
          "attr": "href",
          "parser": {
            "split": "/",
            "pos": 2
          }
        },
        "anchor": ".list-card-details",
        "placement": "append"
      },
      {
        "description": "Board Header",
        "enabled": false,
        "app_required": true,
        "type": "project_detail",
        "url_pattern": "/b/:id/*",
        "id": {
          "selector": "url",
          "pattern": "/b/:id/*",
          "attr": "id"
        },
        "selector": "#content .board-main-content",
        "anchor": ".board-header-plugin-btns",
        "placement": "prepend",
        "style": {
          "id": "board_header",
          "css": "{id}.TT_project_detail_{float:left;background-color:hsla(0,0%,100%,.24);border-radius:3px;} .body-light-board-background {id}.TT_project_detail_{background-color: rgba(0,0,0,.08);}{id}.TT_project_detail_ .TT_time_accumulated_{background-color:transparent;}.body-light-board-background {id}.TT_project_detail_ .TT_time_{color:#172b4d}"
        }
      }
    ]
  },
  {
    "id": "zendesk",
    "domain": "*.zendesk.com",
    "name": "Zendesk",
    "app_url": "https://www.zendesk.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/temp/logos/zendesk.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Ticket detail",
        "url": "*/tickets/*",
        "project_custom": "Zendesk",
        "tasks": {
          "selector": "#wrapper",
          "name": {
            "selector": ".tab.selected .tab_text .title",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": ".delimited_items"
        }
      },
      {
        "comment": "New Ticket detail",
        "url": "*/tickets/*",
        "project_custom": "Zendesk",
        "tasks": {
          "selector": ".ticket .conversation-polaris",
          "name": {
            "selector": "[data-test-id=\"omni-header-subject\"]",
            "attr": "value"
          },
          "id": "url",
          "url": "url",
          "insert_before": "[data-test-id=\"omni-header-filter-trigger\"]",
          "css_id": "ztd",
          "css": ".ttC{display:inline-flex;text-align:center;width:auto;flex-shrink:0;margin-right:10px;}"
        }
      }
    ]
  },
  {
    "id": "notion",
    "domain": "www.notion.so",
    "name": "Notion",
    "app_url": "https://www.notion.so/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/notion.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Document detail",
        "url": "",
        "project": "div.notion-topbar div.notranslate > div:first-child div:not(.notion-record-icon).notranslate",
        "tasks": {
          "selector": ".notion-topbar",
          "name": {
            "selector": "> div > div.notranslate > div:not(:first-child) > :not(.notion-record-icon)",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_before": "div.notion-topbar-share-menu",
          "css_id": "notion_doc",
          "css": ".ttC{ margin-left: 12px;}"
        }
      },
      {
        "comment": "Card detail",
        "url": "",
        "project": "div.notion-topbar div.notranslate > div:first-child div:not(.notion-record-icon).notranslate",
        "tasks": {
          "selector": ".notion-peek-renderer",
          "name": {
            "selector": ".notion-scroller [data-block-id] > h1.notranslate",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_before": "div.notion-topbar-share-menu",
          "css_id": "notion_card",
          "css": ".ttC{ margin-left: 12px;}"
        }
      }
    ],
    "components": [
      {
        "description": "nav bar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<div id=\"ttTimesheet\" data-action=\"modal\" target=\"_self\" role=\"button\" tabindex=\"0\" style=\"user-select: none; transition: background 20ms ease-in 0s; cursor: pointer;\"><div style=\"display: flex; align-items: center; min-height: 27px; font-size: 14px; padding: 2px 14px; width: 100%;\"><div style=\"flex-shrink: 0; flex-grow: 0; border-radius: 3px; color: rgba(55, 53, 47, 0.6); width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; margin-right: 8px;\"><svg width=\"18\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-5 -5 100 100\" style=\"width: 14px;fill: rgba(55, 53, 47, 0.45);\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></div><div style=\"flex: 1 1 auto; white-space: nowrap; min-width: 0px; overflow: hidden; text-overflow: ellipsis;\"><div>TrackingTime</div></div></div></div>"
        },
        "anchor": ".notion-sidebar > div:nth-child(3) > div:first-child > div:nth-child(2)",
        "placement": "append"
      }
    ]
  },
  {
    "id": "microsoftPlanner",
    "domain": "tasks.office.com",
    "name": "Microsoft Planner",
    "app_url": "https://tasks.office.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/microsoft-planner.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "Card",
        "url": "",
        "project": "#planner-main-content div.primarySection > div.primaryTextSectionContainer > div > button > span",
        "tasks": {
          "selector": ".ms-Dialog-main",
          "name": {
            "selector": "> div.ms-Dialog-inner div.title input.ms-TextField-field",
            "attr": "value"
          },
          "id": "name",
          "url": "url",
          "prepend_to": "> div.ms-Dialog-header > div.ms-Dialog-topButton",
          "css_id": "p_c",
          "css": "#TT_modal_{z-index:1000000;}"
        }
      },
      {
        "comment": "Card V2",
        "url": "",
        "project": ".ms-Dialog-main .planTitle",
        "tasks": {
          "selector": ".ms-Dialog-main",
          "name": {
            "selector": "div.taskEditor-dialog-content div.title > div.ms-TextField input.ms-TextField-field",
            "attr": "value"
          },
          "id": "name",
          "url": "url",
          "prepend_to": "div.taskEditor-dialog-header > div.taskEditor-dialog-topButton",
          "css_id": "p_c_2",
          "css": ".ttC {height: 24px; margin-top: 4px; margin-right: 10px;} #TT_modal_{z-index:1000000;}"
        }
      }
    ],
    "components": [
      {
        "description": "nav bar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<li id=\"ttTimesheet\" class=\"linkItem staticLink\" role=\"menuitem\" aria-posinset=\"2\" aria-setsize=\"3\"><a href=\"#\" data-action=\"modal\" target=\"_self\" aria-label=\"TrackingTime\" title=\"Open TrackingTime\" tabindex=\"0\"><div class=\"linkContents\"><div class=\"outerPaddingRemove\"><i data-icon-name=\"plannerTT\" aria-hidden=\"true\" class=\"plannerIcon plannerPlanHub icon linkIcon staticIcon root-62\"><span class=\"root-span\" aria-hidden=\"true\"><svg width=\"20\" height=\"20\" viewBox=\"-5 -5 100 100\" xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" fill=\"currentColor\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span></i><div class=\"linkTextSection\"><span class=\"leftNavItem\">TrackingTime</span></div></div></div></a></li>"
        },
        "style": {
          "id": "ttTimesheet",
          "css": "{id}{flex: 0 0 36px;min-height: 0px;min-width: 0px;color: rgb(50, 49, 48);display: flex;flex-flow: row nowrap;cursor: pointer;overflow: hidden;padding: 1px 0px;border: 1px solid transparent} {id} a{text-decoration: none;color: inherit;display: flex;flex-flow: row nowrap;flex: 1 1 auto;min-height: 0px;min-width: 0px;padding: 0px 8px;transition: padding 0.5s ease 0s;} {id} > a > .linkContents > .outerPaddingRemove > .icon {display: flex;flex-flow: row nowrap; color: rgb(33, 115, 70);}{id} .linkContents{display: flex;flex-flow: row nowrap;flex: 1 1 auto;min-height: 0px;min-width: 0px;align-items: center;} {id} .linkContents > .outerPaddingRemove {display: flex; flex-flow: row nowrap; flex: 1 1 0px; min-height: 0px; min-width: 0px; align-items: center; margin: -8px;overflow: visible;}{id} .linkTextSection{display: flex;flex-flow: column nowrap;flex: 1 1 auto;min-height: 0px;min-width: 0px;color: rgb(50, 49, 48);margin: 0px 8px;} {id} .plannerIcon {align-items: center;justify-content: center;flex: 0 0 28px;min-height: 0px;min-width: 0px;margin-left: 20px;margin-right: 8px;transition: margin-left 0.5s ease 0s;font-size: 16px;} {id} .plannerIcon > .root-span {display: flex;align-items: center;justify-content: center;}"
        },
        "anchor": ".plannerLeftNavWrapper .staticLinksGroup",
        "placement": "append"
      }
    ]
  },
  {
    "id": "microsoftTodo",
    "domain": "to-do.live.com",
    "name": "Microsoft To Do Live",
    "app_url": "https://to-do.live.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/microsoft-to-do.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task detail",
        "url": "",
        "project_custom": "Microsoft To Do",
        "tasks": {
          "selector": "#app div.rightColumn",
          "name": {
            "selector": "div.detailHeader div.editableContent-display",
            "attr": "title"
          },
          "id": "name",
          "url": "url",
          "append_to": "div.detailHeader div.detailHeader-titleWrapper",
          "css": ".ttC {margin-left: 4px;}"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<div id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\"><li class=\"listItem-container\" role=\"none\"><div id=\"inbox\" class=\"listItem\" role=\"treeitem\" tabindex=\"-1\" data-is-focusable=\"true\" aria-label=\"TrackingTime\"><div class=\"listItem-inner color-blue\" title=\"Tasks\"><span class=\"listItem-icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"NavIcon SidebarTopNavLinks-typeIcon HomeNavIcon\" style=\"margin-left: 3px;width: 18px;\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span><span class=\"listItem-title listItem-titleParsed\"><span>TrackingTime</span></span><span class=\"listItem-count\" aria-hidden=\"true\"></span></div></div></li></div>"
        },
        "anchor": "#app div.sidebar-content div.sidebar-lastStaticList",
        "placement": "before"
      }
    ]
  },
  {
    "id": "microsoftTodoOffice",
    "domain": "to-do.office.com",
    "name": "Microsoft To Do Office",
    "app_url": "https://to-do.office.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/microsoft-to-do.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task detail",
        "url": "",
        "project_custom": "Microsoft To Do",
        "tasks": {
          "selector": "#app div.rightColumn",
          "name": {
            "selector": "div.detailHeader div.editableContent-display",
            "attr": "title"
          },
          "id": "name",
          "url": "url",
          "append_to": "div.detailHeader div.detailHeader-titleWrapper",
          "css": ".ttC {margin-left: 4px;}"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<div id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\"><li class=\"listItem-container\" role=\"none\"><div id=\"inbox\" class=\"listItem\" role=\"treeitem\" tabindex=\"-1\" data-is-focusable=\"true\" aria-label=\"TrackingTime\"><div class=\"listItem-inner color-blue\" title=\"Tasks\"><span class=\"listItem-icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"NavIcon SidebarTopNavLinks-typeIcon HomeNavIcon\" style=\"margin-left: 3px;width: 18px;\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span><span class=\"listItem-title listItem-titleParsed\"><span>TrackingTime</span></span><span class=\"listItem-count\" aria-hidden=\"true\"></span></div></div></li></div>"
        },
        "anchor": "#app div.sidebar-content div.sidebar-lastStaticList",
        "placement": "before"
      }
    ]
  },
  {
    "id": "dixa",
    "domain": "*.dixa.com",
    "name": "Dixa",
    "app_url": "https://www.dixa.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/dixa-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "conversation",
        "url": "conversation/*",
        "project_custom": "Dixa",
        "tasks": {
          "selector": "#content .conversation-view__main [class^=\"conversationHeader__\"]",
          "name": {
            "selector": "[class^=\"headline__\"] > div > span > button span",
            "attr": "text"
          },
          "id": {
            "selector": "[class^=\"headline__\"] > div > span > button span",
            "attr": "text"
          },
          "url": "url",
          "prepend_to": "[class^=\"topActions__\"]>div",
          "css": ".ttC {margin-left: 4px;}"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<li class=\"pageNavItem__nUQJo3EAvR\"><a id=\"ttTimesheet\" data-action=\"modal\" target=\"_self\" class=\"pageNavBtn__JQ0dJHvhSC\" title=\"TrackingTime\" href=\"#\"><svg class=\"icon--icon__root pageNavItemIcon__IJec9eOnsG\" height=\"20\" width=\"20\"><path d=\"M19.75,7.82a10,10,0,1,0-7.57,11.93A10,10,0,0,0,19.75,7.82ZM11.88,18.45A8.65,8.65,0,1,1,18.44,8.11,8.65,8.65,0,0,1,11.88,18.45Z\"></path><path d=\"M10,3.43A6.57,6.57,0,1,0,16.56,10,6.58,6.58,0,0,0,10,3.43ZM8.35,12.92V7.31l4.29,2.79Z\"></path></svg><span class=\"pageNavItemName__dyQNJ5cQQ5\">TrackingTime</span></a></li>"
        },
        "anchor": "#main-sidebar [class^=\"pageNav__\"]",
        "placement": "append"
      }
    ]
  },
  {
    "id": "figma",
    "domain": "www.figma.com",
    "name": "Figma",
    "app_url": "https://www.figma.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/figma-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task detail",
        "url": "",
        "project": "#react-page #fullscreen-filename > div > span",
        "tasks": {
          "selector": "#react-page",
          "name": {
            "selector": "#fullscreen-filename > div > span",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "prepend_to": "div.toolbar_view--rightButtonGroup--1BuhO",
          "css_id": "ttc-figma",
          "css": ".ttC { margin-right: 5px; flex-shrink: 0;  }"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<div class=\"toolbar_view--toolButtonContainer--1HAfB\" id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\"><span class=\"svg-container toolbar_view--iconButton--Zxsnv toolbar_styles--enabledButton--2cWGq\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"20\" height=\"20\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span></div>"
        },
        "anchor": "#react-page [data-testid=\"set-tool-comments\"]",
        "placement": "after"
      }
    ]
  },
  {
    "id": "teamwork",
    "domain": "*.teamwork.com",
    "name": "Teamwork",
    "app_url": "https://www.teamwork.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/teamwork-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "projects task detail - list/board",
        "url": "",
        "project": "div.app-header__base h1.w-header-titles__project-name > a",
        "tasks": {
          "selector": "#TaskContent",
          "name": {
            "selector": "div.row-content-holder > div.w-task-row__name > span",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_after": "div.row-content-holder div.w-task-row__name",
          "css": ".ttC { margin-right: 8px; }"
        }
      },
      {
        "comment": "projects task detail - table",
        "url": "",
        "project": "div.app-header__base h1.w-header-titles__project-name > a",
        "tasks": {
          "selector": "div.task-title-wrapper",
          "name": {
            "selector": "div.task-name > textarea",
            "attr": "value"
          },
          "id": "url",
          "url": "url",
          "insert_after": "this"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<a href=\"#\" class=\"border-none flex-none flex items-center justify-center nav-item mb-[10px] py-0 px-150 cursor-pointer rounded-full h-[40px] relative select-none font-semibold hover:text-white hover:bg-[#141931] text-[#646d7d] bg-transparent\" id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\"><div class=\"flex text-current w-full items-center justify-center\"><div class=\"flex flex-none items-center justify-center w-[20px] h-[20px] text-current fill-current relative\"></div><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"20\" height=\"20\" viewBox=\"-5 -5 100 100\" fill=\"#646D7D\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg><div class=\"flex flex-grow items-center ml-150 skeleton-text\">TrackingTime</div>  <div class=\"flex items-center pr-100\"></div></div></a>"
        },
        "anchor": "div.layout-sidebar div.base-nav-part > div",
        "placement": "after"
      }
    ]
  },
  {
    "id": "meistertask",
    "domain": "*.meistertask.com",
    "name": "Meistertask",
    "app_url": "https://www.meistertask.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/meistertask-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task detail",
        "url": "",
        "project": "div.react-popover-trigger-popover-projectinformation-header div.kr-text",
        "tasks": {
          "selector": ".react-dialog-box",
          "name": {
            "selector": "> .kr-view > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > div.kr-text",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_after": "#mt-toggl-task-button",
          "css": ".ttC { margin-right: 10px; }"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<div class=\"kr-view\" style=\"width: 100%; flex-direction: column;\"><div class=\"kr-view\" style=\"width: 100%; padding-left: 8px; padding-right: 8px;\"><div class=\"kr-view\" style=\"height: 60px; width: 100%; padding-top: 5px; padding-bottom: 5px; border-radius: 10px;\"><a class=\"kr-view\" id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\" href=\"#\" style=\"width: 100%;\"><div class=\"kr-view\" style=\"width: 100%; height: 100%; padding-right: 24px; border-radius: 10px; align-items: center; cursor: pointer; background-color: rgba(255, 255, 255, 0);\"><div class=\"kr-view\" style=\"margin-left: 8px; flex-grow: 1; flex-shrink: 1;\"><div class=\"kr-view\" style=\"width: 24px; height: 24px; color: white;margin-left: 20px;\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"100%\" height=\"100%\" viewBox=\"-5 -5 100 100\" fill=\"#fff\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></div><div class=\"kr-text\" style=\"font-size: 17px; line-height: 25px; font-weight: 700; letter-spacing: normal; color: white; margin-left: 12px;\">TrackingTime</div></div></div></a></div></div><div class=\"kr-view\" style=\"height: 1px; background-color: rgba(255, 255, 255, 0.1); width: 256px; align-self: center;\"></div></div>"
        },
        "anchor": "#DOM_CONTAINER div:nth-child(2) > div > a.kr-view[href=\"/app/dashboard\"]",
        "placement": "after"
      }
    ]
  },
  {
    "id": "evernote",
    "domain": "www.evernote.com",
    "name": "Evernote",
    "app_url": "https://www.evernote.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/evernote-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task detail",
        "url": "",
        "project": "#qa-TASKS_MODAL #qa-TASKS_MODAL_TITLE",
        "tasks": {
          "selector": "#qa-TASKS_MODAL",
          "name": {
            "selector": "#qa-TASKS_MODAL_TITLE",
            "attr": "value"
          },
          "id": "url",
          "url": "url",
          "insert_after": "header h1",
          "css": ".ttC { margin-right: 8px; }"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<li><button type=\"button\" class=\"_832s3r8kdOE_SjKO2aq hANwk8g_6_PVeUc1LRQt E_lbv7gA85FrFeRroPBY xeTO7OmEU9YrQ6eC6cEa\" id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"24\" height=\"18\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg><span class=\"pno23scUJEgskXIMlBo5 HUWoDG8e8KhEOGqVocpC aeZLXyjz5r6O__Qx1PcY XbiqRHDm_t167aWKYIFE\">TrackingTime</span></button></li>"
        },
        "anchor": "nav ul > ul",
        "placement": "before"
      }
    ]
  },
  {
    "id": "coda.io",
    "domain": "coda.io",
    "name": "Coda",
    "app_url": "https://coda.io/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/coda-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "page detail",
        "url": "",
        "project": "div.A_e7kz0h.FKGOLUp4.hreFAm9Y.zCrHZIwS.gjzUOZZj",
        "tasks": {
          "selector": "#coda-react-host",
          "name": {
            "selector": "h1 textarea",
            "attr": "value"
          },
          "id": "url",
          "url": "url",
          "insert_after": "div.Ck7twcZR"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<span class=\"Fr99LwNL\" id=\"ttTimesheet\" role=\"menuitem\" target=\"_self\"><span ><span style=\"vertical-align: middle; padding-right:10px\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"24\" height=\"18\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"></path><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"></path></svg></span>TrackingTime</span></span>"
        },
        "anchor": "[data-coda-ui-id=\"selected-workspace-panel\"] > div:last-child",
        "placement": "prepend"
      }
    ]
  },
  {
    "id": "agiled",
    "domain": "my.agiled.app",
    "name": "Agiled",
    "app_url": "https://my.agiled.app/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/agiled-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "project",
        "url": "",
        "project": "#modalViewTask div.modal-content h5:nth-of-type(2)",
        "tasks": {
          "selector": "#modalViewTask",
          "name": {
            "selector": "#modalViewTaskLabel",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_before": "#modalViewTaskLabel",
          "css": ".ttC { margin-bottom: 8px; }"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<li class=\"menu-item\"><a class=\"menu-link\" id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\"><span class=\"menu-icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"24\" height=\"18\" viewBox=\"-5 -5 100 100\" fill=\"#a6abbd\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span><span class=\"menu-text\">TrackingTime</span></a></li>"
        },
        "anchor": "#stacked-menu > ul.menu > li:nth-of-type(2)",
        "placement": "before"
      }
    ]
  },
  {
    "id": "nifty",
    "domain": "*.nifty.pm",
    "name": "Nifty",
    "app_url": "https://nifty.pm/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/nifty-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task detail",
        "url": "",
        "project": "div.header div.header-main-inner > div.header-title > h1",
        "tasks": {
          "selector": "div.content-panel-holder",
          "name": {
            "selector": "div.content-panel-title > div.multi-line-input",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_after": "div.content-panel-title",
          "css": ".ttC { padding: 0px 25px 10px; }"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<div class=\"nav-item\"><a class=\"nav-item-inner nav-item-inner-no-gutter tour-target-my-tasks\" href=\"#\" id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\"><span class=\"nav-item-image\"><span class=\"nav-item-icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"24\" height=\"18\" viewBox=\"-5 -5 100 100\" fill=\"#C4C8E2\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span></span><span class=\"nav-item-text\">TrackingTime</span></a></div>"
        },
        "anchor": "div.app-sidebar.expanded div.app-sidebar-main div.vertical-nav-body div.nav-group-body",
        "placement": "after"
      }
    ]
  },
  {
    "id": "activecollab",
    "domain": "app.activecollab.com",
    "name": "ActiveCollab",
    "app_url": "https://app.activecollab.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/activecollab-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task detail",
        "url": "",
        "project": "div.project_object_location > span.task__projectname > a",
        "tasks": {
          "selector": "div.task_main",
          "name": {
            "selector": "h1.task-modal-header > span.task_name",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_after": "this",
          "css": ".ttC { margin-bottom: 16px; }"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<li class=\"ripple\" id=\"ttTimesheet\"><a href=\"timesheet\" id=\"main_menu_icon_timesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\"><span class=\"menu_icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"26\" height=\"26\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span><span class=\"menu_text\">TrackingTime</span></a></li>"
        },
        "anchor": "nav#menu_items > ul:nth-child(1)",
        "placement": "append"
      }
    ]
  },
  {
    "id": "clickup",
    "domain": "app.clickup.com",
    "name": "ClickUp",
    "app_url": "https://app.clickup.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/clickup-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task detail",
        "url": "",
        "project": "div.task-container div.task-container__header a.breadcrumbs__link.breadcrumbs__link_list > span",
        "tasks": {
          "selector": "div.task-container",
          "name": {
            "selector": "#task-name",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_before": "div.cu-task-header__section_rightside",
          "css": ".ttC { margin-left: 10px; }"
        }
      },
      {
        "comment": "new task detail",
        "url": "",
        "project": "cu-task-view cu-task-view-header .cu-task-view-header__left .cu-task-view-header__breadcrumbs .cu-task-view-breadcrumbs__text:last-of-type",
        "tasks": {
          "selector": "cu-task-view",
          "name": {
            "selector": "cu-task-hero-section > cu-task-title .cu-task-title__container > textarea",
            "attr": "value"
          },
          "id": "url",
          "url": "url",
          "append_to": "cu-task-hero-section > .cu-task-hero-section__actions",
          "css": ".ttC { margin-left: 10px; }"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<a class=\"cu-simple-bar__item ng-tns-c705-19\" href=\"#\" id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\"><div class=\"cu-simple-bar__item-icon ng-tns-c705-19\"><div class=\"ng-tns-c705-19 icon ng-star-inserted\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"24\" height=\"18\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></div></div><div class=\"cu-simple-bar__item-label ng-tns-c705-19\"> TrackingTime </div></a>"
        },
        "anchor": "div.cu-simple-bar__body > div.cu-simple-bar__item.cu-simple-bar__item_more",
        "placement": "before"
      }
    ]
  },
  {
    "id": "axosoft",
    "domain": "*.axosoft.com",
    "name": "Axosoft",
    "app_url": "https://axosoft.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/axosoft-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task detail",
        "url": "",
        "project": "#gridHeader div.item-field-table > div > div:nth-child(1) > div.item-field-cell-right > div > div.field",
        "tasks": {
          "selector": "#gridHeader",
          "name": {
            "selector": "div.item-body-header > div > h1.item-field-name",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "append_to": "div.item-toolbar > div.axo-menubar > div.axo-menubar-content > ul.axo-menubar-mainmenu",
          "css": ".ttC {margin-left: 10px;}"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<li id=\"ttTimesheet\" data-action=\"modal\" target=\"_self\" title=\"TrackingTime\" class=\"ontime-header-button button button--small button--neutral\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"14\" height=\"12\" style=\"padding-top: 3px;\" viewBox=\"-5 -5 100 100\" fill=\"#fff\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg> TrackingTime</li>"
        },
        "anchor": "ul#topMenu",
        "placement": "prepend"
      }
    ]
  },
  {
    "id": "assembla",
    "domain": "*.assembla.com",
    "name": "Assembla",
    "app_url": "https://assembla.com/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/assembla-time-tracking.png",
    "settings": {
      "active": true
    },
    "rules": [
      {
        "comment": "task detail",
        "url": "",
        "project": "aside.snav-sidebar div.space-name > a",
        "tasks": {
          "selector": "#tickets-show",
          "name": {
            "selector": "div > h1",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_after": "#move-copy-form",
          "css": ".ttC {margin-right: 10px;}"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<li class=\"snav-tool\"><a class=\"snav-link\" href=\"#\" id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\"><span class=\"snav-minimal\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"24\" height=\"18\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg></span><span class=\"snav-extended\">TrackingTime</span></a></li>"
        },
        "anchor": "aside.snav-sidebar > div.snav-sidebar-scroll > div:nth-child(3) > ul.snav-tools",
        "placement": "prepend"
      }
    ]
  },
  {
    "id": "linear.app",
    "domain": "linear.app",
    "name": "Linear.app",
    "app_url": "https://linear.app/",
    "logo": "https://trackingtime.co/wp-content/themes/trackingtime-v4/img/button/linear-time-tracking.png",
    "settings": {
      "active": false
    },
    "rules": [
      {
        "comment": "private issue detail",
        "url": "*/issue/*",
        "project": "main div > button .sc-jcMfQk + span:not([color=\"labelMuted\"]), main div > button:not([aria-label]) [data-type=\"emoji\"] + span:not([color=\"labelMuted\"])",
        "tasks": {
          "selector": "main",
          "name": {
            "selector": "[data-view-id=\"issue-view\"] form > [data-input-type=\"title-input\"]",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_after": "[data-view-id=\"issue-view\"] form > [data-input-type=\"title-input\"]",
          "css": ".ttC{margin-bottom:8px}",
          "css_id": "linear_p"
        }
      },
      {
        "comment": "issue detail",
        "url": "*/issue/*/*",
        "project": "main div > button .sc-jcMfQk + span:not([color=\"labelMuted\"]), main div > button:not([aria-label]) [data-type=\"emoji\"] + span:not([color=\"labelMuted\"])",
        "tasks": {
          "selector": "main",
          "name": {
            "selector": "[data-view-id=\"issue-view\"] form > [data-input-type=\"title-input\"]",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_after": "[data-view-id=\"issue-view\"] form > [data-input-type=\"title-input\"]",
          "css": ".ttC{margin-bottom:8px}",
          "css_id": "linear"
        }
      },
      {
        "comment": "private issue detail - new",
        "url": "*/issue/*",
        "project": "main div > button .sc-iAEawV + span:not([color=\"labelMuted\"]), main div > button:not([aria-label]) [data-type=\"emoji\"] + span:not([color=\"labelMuted\"])",
        "tasks": {
          "selector": "main",
          "name": {
            "selector": "[data-view-id=\"issue-view\"] form > div:first-child > div:first-child p",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_after": "[data-view-id=\"issue-view\"] form > div:first-child > div:first-child",
          "css": ".ttC{margin-bottom:8px}",
          "css_id": "linear_p_new"
        }
      },
      {
        "comment": "issue detail - new",
        "url": "*/issue/*/*",
        "project": "main div > button .sc-iAEawV + span:not([color=\"labelMuted\"]), main div > button:not([aria-label]) [data-type=\"emoji\"] + span:not([color=\"labelMuted\"])",
        "tasks": {
          "selector": "main",
          "name": {
            "selector": "[data-view-id=\"issue-view\"] form > div:first-child > div:first-child p",
            "attr": "text"
          },
          "id": "url",
          "url": "url",
          "insert_after": "[data-view-id=\"issue-view\"] form > div:first-child > div:first-child",
          "css": ".ttC{margin-bottom:8px}",
          "css_id": "linear_new"
        }
      }
    ],
    "components": [
      {
        "description": "navbar button",
        "enabled": true,
        "type": "modal",
        "modal": {
          "iframe": "https://button.trackingtime.co/#/hours"
        },
        "url_pattern": "",
        "template": {
          "selector": "#ttTimesheet",
          "html": "<a draggable=\"false\" id=\"ttTimesheet\" role=\"menuitem\" data-action=\"modal\" target=\"_self\" aria-label=\"Views\" href=\"#\" ><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" width=\"28\" height=\"18\" viewBox=\"-5 -5 100 100\"><path d=\"M51.6,17L26.9,3.2C17-1,6,6.2,6,17.1v55c0,0-0.4,6.9,4.7,11c0,0,0,0,0,0c0,0,0,0,0.1,0c1,0.8,2.3,1.5,3.8,2c0,0,0,0,0.1,0 c0.3,0.1,0.6,0.2,0.8,0.3c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.4,0.1,0.6,0.1c0.3,0.1,0.6,0.1,0.8,0.1c0.1,0,0.1,0,0.1,0 c0.9,0.1,1.7,0.2,2.4,0.2c0,0,0.1,0,0.1,0c0,0,0.1,0,0.3,0c1.3,0,2.2-0.1,2.2-0.1c4.8-0.7,7.6-3.2,9.3-6.1 c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.2-0.6,0.4-0.9c1.3-3.4,1.3-6.6,1.2-7.1C35.1,52.9,32.1,23.9,51.6,17z\"/><path d=\"M76.5,30.9c-0.8-0.6-3.6-2.4-12.3-7.2c-3.6,1.1-6.5,3.2-8.6,5.6c-0.2,0.2-0.5,0.5-0.7,0.8c-0.1,0.1-0.2,0.2-0.2,0.3 c-1,1.2-1.9,2.5-2.6,3.8c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.2,0.4-0.3,0.6c-1.4,2.6-2,4.6-2,4.6c0,0,0,0,0,0 C45.8,50.6,46,64.4,45.9,75l29-16.7c5.6-2.5,9.2-8.1,9.2-14.2C84.1,38.5,81.3,34.2,76.5,30.9z\"/></svg><label>TrackingTime</label></a>"
        },
        "style": {
          "id": "ttTimesheet",
          "css": "{id}:not(style) { width: 100%; display: flex; align-items: center; justify-content: flex-start; margin-bottom: 20px; color: rgb(60, 65, 73); fill: rgb(107, 111, 118); cursor: default; border-radius: 4px; } {id}:not(style) svg { margin-right: -2px; } {id}:not(style) label { font-size: var(--font-size-smallPlus); font-weight: 500; line-height: 27px; height: 27px; border-radius: 4px; padding: 0px 6px 0px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } {id}:not(style):hover { background-color: rgb(240, 243, 249); } .dark {id}:not(style) { color: rgb(215, 216, 219); fill: rgb(138, 143, 152); } .dark {id}:not(style):hover { background-color: rgb(39, 40, 50); } .dark {id}:not(style):hover svg { fill: rgb(238, 239, 252); }"
        },
        "anchor": "nav > div:nth-of-type(2)",
        "placement": "prepend"
      }
    ]
  }
];
var DOMAINS_VERSION = "local";
localStorage.DOMAINS = JSON.stringify(DOMAINS);
localStorage.DOMAINS_VERSION = DOMAINS_VERSION;
