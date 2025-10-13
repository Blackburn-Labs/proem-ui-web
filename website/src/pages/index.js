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
              {props.contents.map((c, idx) => {
                  return (<div key={idx} style={{ padding: '20px' }}>
                      {c.title && <h4 className="section-title">{c.title}</h4>}
                      <div {...props} style={{ clear: 'both' }} className="section-content">
                          <img src={c.image} className={`blockImage imageAlign-${c.imageAlign}`} alt={c.title} />
                          <div className="content-wrapper">{c.content}</div>
                      </div>
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
            <Button href="/docs/intro">Help Docs</Button>
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
            content: (
              <>
                <p>Get started quickly by simply using Git to clone Proem-UI:</p>
                <pre><code>git clone https://github.com/Blackburn-Labs/proem-ui.git</code></pre>
                <p>
                  Alternatively, you can simply <a href="https://github.com/Blackburn-Labs/proem-ui">download</a> the files from
                  <a href="https://github.com/Blackburn-Labs/proem-ui">GitHub</a>. Copy the contents of the zip file to
                  your new project. From inside your new project directory, run:
                </p>
                <pre><code>npm install{'\n'}npm start</code></pre>
                <p>
                  A <code>npx</code> command that makes this even easier will be coming soon. For more information, see the
                  <a href="/docs/intro">Proem-UI Guides</a>
                </p>
              </>
            ),
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
            content: (
              <p>
                <a href="https://proemui.com">Proem-UI</a> is a framework designed to make it easier, faster, and safer to create React
                apps. It has been used to create enterprise level mobile apps, iOS/Android apps (via Cordova) and even
                Windows/Mac desktop apps (via Electron). We combine powerful tools like React, Redux, Axios, Webpack,
                and Babel to give your app a scalable, well architected starting point. Then we add tools like Storybook,
                ESLint, and Jasmine to make it easier to test and stabilize your app. However, we don't stop there.
                Proem-UI provides guides, helpful material and support for your app.
              </p>
            ),
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
            content: 'Build a powerful React app in a fraction of the time. Help follow well-researched and battle-tested architecture and best practices.',
            image: `${baseUrl}img/undraw_react.svg`,
            imageAlign: 'top',
            title: 'A React Framework',
          },
          {
            content: 'Create beautiful apps by leveraging Material-UI, a simple and extensive component library.',
            image: `${baseUrl}img/undraw_designing.svg`,
            imageAlign: 'top',
            title: 'Material Design',
          },
          {
            content: 'Let us take the uncertainty and stress out of your project. Go forward knowing your app is well-architected and backed by powerful, well-established tools. ',
            image: `${baseUrl}img/undraw_developer.svg`,
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
            <div id="quick-start">
                <TryOut />
            </div>
        </div>
      </div>
    );
  }
}

export default props => <Layout><Index {...props} /></Layout>;
