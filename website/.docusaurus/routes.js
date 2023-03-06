import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '1d3'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '033'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '4b5'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '3bb'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '91c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'bb2'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'b6d'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '6db'),
    exact: true
  },
  {
    path: '/blog/2020/05/29/new-version-2.0.0',
    component: ComponentCreator('/blog/2020/05/29/new-version-2.0.0', '59f'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '33f'),
    exact: true
  },
  {
    path: '/help',
    component: ComponentCreator('/help', 'd7d'),
    exact: true
  },
  {
    path: '/users',
    component: ComponentCreator('/users', '81e'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'b38'),
    routes: [
      {
        path: '/docs/backend',
        component: ComponentCreator('/docs/backend', '63d'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/begin',
        component: ComponentCreator('/docs/begin', '7c4'),
        exact: true
      },
      {
        path: '/docs/components',
        component: ComponentCreator('/docs/components', '629'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/domain',
        component: ComponentCreator('/docs/domain', 'a7d'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/faq',
        component: ComponentCreator('/docs/faq', '014'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'a16'),
        exact: true,
        sidebar: "docs"
      },
      {
        path: '/docs/store',
        component: ComponentCreator('/docs/store', '414'),
        exact: true,
        sidebar: "docs"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '5bc'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
