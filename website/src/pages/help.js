/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
import Layout from "@theme/Layout";
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Help() {
  const logoLight = useBaseUrl('/img/blackburn-labs-logo-light.webp');
  const logoDark = useBaseUrl('/img/blackburn-labs-logo-dark.webp');
  return (
    <div className="container margin-vert--lg">
      <div className="row">
        <div className="col col--8 col--offset-2">
          <h1>Get Help</h1>
          <p className="hero__subtitle">
            Find resources, support, and ways to contribute to Proem-UI
          </p>

          {/* Documentation Section */}
          <div className="card margin-vert--lg">
            <div className="card__header">
              <h2>Documentation</h2>
            </div>
            <div className="card__body">
              <p>
                Find comprehensive guides, tutorials, and API references to help you
                get the most out of Proem-UI. Our documentation covers everything
                from getting started to advanced customization.
              </p>
              <a href="/docs/intro" className="button button--primary margin-top--md">
                Visit Documentation
              </a>
            </div>
          </div>

          {/* GitHub Section */}
          <div className="card margin-vert--lg">
            <div className="card__header">
              <h2>GitHub Repository</h2>
            </div>
            <div className="card__body">
              <p>
                Proem-UI is open source! You can contribute to the project, report bugs,
                request features, or submit pull requests on GitHub.
              </p>
              <ul>
                <li>
                  <strong>Report a Bug:</strong> Found an issue? Let us know by{' '}
                  <a
                    href="https://github.com/Blackburn-Labs/proem-ui/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    creating an issue
                  </a>
                </li>
                <li>
                  <strong>Request a Feature:</strong> Have an idea? Share it with us through{' '}
                  <a
                    href="https://github.com/Blackburn-Labs/proem-ui/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub issues
                  </a>
                </li>
                <li>
                  <strong>Contribute:</strong> Want to help? Check out our repository and{' '}
                  <a
                    href="https://github.com/Blackburn-Labs/proem-ui/pulls"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    submit a pull request
                  </a>
                </li>
              </ul>
              <div className="margin-top--md">
                <a
                  href="https://github.com/Blackburn-Labs/proem-ui"
                  className="button button--secondary margin-right--md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
                <a
                  href="https://github.com/Blackburn-Labs/proem-ui/issues"
                  className="button button--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Issues
                </a>
              </div>
            </div>
          </div>

          {/* Professional Support Section */}
          <div className="card margin-vert--lg" style={{borderColor: 'var(--ifm-color-secondary)'}}>
            <div className="card__header">
              <h2>Need Professional Help?</h2>
            </div>
            <div className="card__body">
              <p>
                Looking for expert guidance or custom development? Blackburn Labs
                are bespoke software engineers who specialize in building exceptional
                applications and are happy to help with your project.
              </p>

              <div className="alert alert--info margin-top--md">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <img
                    src={logoDark}
                    alt="Blackburn Labs"
                    className="blackburn-logo-light"
                    style={{ height: '60px', width: 'auto', marginRight: '1rem' }}
                  />
                  <img
                    src={logoLight}
                    alt="Blackburn Labs"
                    className="blackburn-logo-dark"
                    style={{ height: '60px', width: 'auto', marginRight: '1rem' }}
                  />
                  <div>
                    <h4 style={{ margin: 0 }}>Blackburn Labs</h4>
                    <p style={{ margin: 0 }}>
                      <em>Bespoke Software Engineering</em>
                    </p>
                  </div>
                </div>
                <p>
                  From consulting and architecture to full development services,
                  Blackburn Labs brings decades of experience to help you succeed.
                </p>
                <div className="margin-top--md">
                  <a
                    href="https://www.blackburnlabs.com/"
                    className="button button--outline button--secondary margin-right--md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                  <a
                    href="https://www.blackburnlabs.com/contact-us/"
                    className="button button--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div className="card margin-vert--lg">
            <div className="card__header">
              <h2>Stay Connected</h2>
            </div>
            <div className="card__body">
              <p>
                This project is maintained by a dedicated group of people who are
                passionate about making React development better.
              </p>
              <ul>
                <li>Star the project on GitHub to show your support</li>
                <li>Follow development updates and releases</li>
                <li>Share Proem-UI with others who might find it useful</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default props => <Layout><Help {...props} /></Layout>;
