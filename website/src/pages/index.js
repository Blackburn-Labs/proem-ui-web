/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
import Layout from "@theme/Layout";

const CompLibrary = {
  Container: props => <div {...props}></div>,
  GridBlock: props => {
      return (
          <>
              {props.contents.map(c => {
                  return (<div {...props} style={{ clear: 'both' }}>
                      <h4>{c.title}</h4>
                      <img src={c.image} className={`blockImage imageAlign-${c.imageAlign}`} />
                      {c.content}
                  </div>)
              })}
          </>
      )
  },
  MarkdownBlock: props => <div {...props}></div>
};


const MarkdownBlock = CompLibrary.MarkdownBlock;/* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = props => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/Proem-UI-Icon.svg`} />
        <div className="inner">
          <ProjectTitle
              title={siteConfig.title}
              tagline={'Create React apps that are beautiful and follow best practices in just minutes.'}
          />
          <PromoSection>
            <Button href="#quick-start">Quick Start</Button>
            <Button href={docUrl('intro')}>Help Docs</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <>
        <GridBlock
          align={props.textAlign || 'center'}
          contents={props.children}
          layout={props.layout}
        />
      </>
    );

    const TryOut = () => (
      <Block id="quick-start" textAlign="left">
        {[
          {
            content:
                'Get started quickly by simply using Git to clone Proem-UI:' +
                '\n```\ngit clone https://github.com/Blackburn-Labs/proem-ui.git\n```\n' +
                'Alternatively, you can simply [download](https://github.com/Blackburn-Labs/proem-ui) the files from ' +
                '[GitHub](https://github.com/Blackburn-Labs/proem-ui). Copy the contents of `proem-ui\\template` to ' +
                'your new project. From inside your new project directory run:' +
                '\n```\nnpm install\nnpm start\n```\n' +
                'A `npx` command that makes this even easier will be coming soon. For more information see the ' +
                '[Proem-UI Guides](/docs/intro)' ,
            image: `${baseUrl}img/undraw_monitor.svg`,
            imageAlign: 'left',
            title: 'Quick Start',
          },
        ]}
      </Block>
    );

    const Newsletter = () => (
      <Block background="light">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/undraw_newsletter.svg`,
            imageAlign: 'right',
            title: 'Newsletter',
          },
        ]}
      </Block>
    );

    const WhatIsProem = () => (
      <Block background="light">
        {[
          {
            content:
              '[Proem-UI](www.proemiu.com) is a framework designed to make it easier, faster, and safer to create React ' +
              'apps. It has been used to create enterprise level mobile aps, iOS/Android apps (via Cordova) and even ' +
              'Windows/Mac desktops apps (via Electron). We combine powerful tools like React, Redux, Axios, Webpack, ' +
              'and Babel to give your app a scalable, well architected starting point. Then we add tools like Storybook, ' +
              'ESLint, and Jasmine to make it easier to test and stabilize your app. However, we don\'t stop there. ' +
              'Proem-UI provides guides, helpful material and support for your app.',
            image: `${baseUrl}img/undraw_app_installation.svg`,
            imageAlign: 'right',
            title: 'What is Proem-UI?',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="threeColumn">
        {[
          {
            content: 'Build powerful React app in a fraction of the time. Help follow well researched and battle test architecture and best practices.',
            image: `${baseUrl}img/undraw_react.svg`,
            imageAlign: 'top',
            title: 'A React Framework',
          },
          {
            content: 'Create beautiful apps by leveraging Material-UI, a simple and extensive component library.',
            image: `${baseUrl}img/undraw_experience_design.svg`,
            imageAlign: 'top',
            title: 'Material Design',
          },
          {
            content: 'Let us take the uncertainty and stress our of your project. Go forward knowing your app is will architected and is backed by many well established and powerfull tools. ',
            image: `${baseUrl}img/undraw_completing.svg`,
            imageAlign: 'top',
            title: 'Stress Free Development',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
            <div id="features">
                <Features />
            </div>

            <div id="what-is">
                <WhatIsProem />
            </div>
            <div id="try">
                <TryOut />
            </div>
        </div>
      </div>
    );
  }
}

export default props => <Layout><Index {...props} /></Layout>;
