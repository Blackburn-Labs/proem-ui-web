module.exports={
  "title": "Proem-UI",
  "url": "https://Blackburn-Labs.github.io",
  "baseUrl": "/proem-ui-web/",
  "organizationName": "blackburn-labs",
  "projectName": "proem-ui-web",
  "deploymentBranch": "gh-pages",
  "trailingSlash": false,
  "scripts": [
    "https://buttons.github.io/buttons.js"
  ],
  "favicon": "img/Proem-UI-Icon.png",
  "customFields": {
    "repoUrl": "https://github.com/blackburn-labs/proem-ui/",
    "users": [
      {
        "caption": "User1",
        "image": "/img/undraw_open_source.svg",
        "infoLink": "https://www.facebook.com",
        "pinned": true
      }
    ],
    "facebookAppId": "Proem-UI-106443901076665"
  },
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "path": "../docs",
          "sidebarPath": "./sidebars.json"
        },
        "blog": {
          "path": "blog"
        },
        "theme": {
          "customCss": "./src/css/customTheme.css"
        }
      }
    ]
  ],
  "plugins": [],
  "themeConfig": {
    "navbar": {
      "title": "Proem-UI",
      "logo": {
        "src": "img/Proem-UI-Icon.svg"
      },
      "items": [
        {
          "to": "docs/intro",
          "label": "Docs",
          "position": "left"
        },
        {
          "to": "docs/faq",
          "label": "FAQ",
          "position": "left"
        },
        {
          "to": "/help",
          "label": "Help",
          "position": "left"
        },
        {
          "href": "https://github.com/Blackburn-Labs/proem-ui",
          "label": "GitHub",
          "position": "left"
        }
      ]
    },
    "image": "img/undraw_online.svg",
    "footer": {
      "links": [
        {
          "title": "Community",
          "items": [
            {
              "label": "Twitter",
              "to": "https://twitter.com/ProemUI"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2023 Proem-UI",
      "logo": {
        "alt": 'Proem-UI Logo',
        "src": "img/Proem-UI-Icon.svg",
        "width": 160,
        "height": 51,
      }
    }
  }
}
