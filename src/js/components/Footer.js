import React from 'react';
import { Container } from './Helper';
import MessageForm from './MessageForm';

export class Footer extends React.Component {

  render() {
    return (
      <footer className="neal-footer navbar" id="contact">
        <Container>
          <div className="col-xs-12 col-md-6">
            <p className="neal-footer-copyright">
              © 2017, {this.props.brandName}
            </p>
            { this.renderBusinessDetails(this.props.phone1, 'phone') }
            { this.renderBusinessDetails(this.props.whatsup, 'whatsapp') }
            { this.renderBusinessDetails(this.props.phone2, 'phone') }
            { this.renderBusinessDetails(this.props.skype, 'skype') }
            { this.renderBusinessDetails(this.props.email, 'google', `mailto:${this.props.email}`) }
            { this.renderBusinessDetails(this.props.address, 'map-marker') }
            { this.renderBusinessDetails(this.props.projectName, 'copyright') }
            { this.renderBusinessDetails(this.props.projectCode, 'institution') }
            { this.renderBusinessDetails(this.props.projectEndDate, 'clock-o') }
            { this.renderBusinessDetails(this.props.projectSupportInHuf, 'shield') }
            { this.renderBusinessDetails(this.props.projectSupportRate, 'shield') }
            { this.renderSocialIcons() }
          </div>
          <div className="col-xs-12 col-md-6 consultation-container">
            <p>{this.props.formTitle}</p>
            <MessageForm ctaLabel={this.props.formCtaLabel} />
          </div>
        </Container>
      </footer>
    );
  }

  renderBusinessDetails(text, icon, href) {
    if (!text) return null;
    const iconClass = `fa fa-${icon}`;
    if (href) {
      return (
        <p>
           <i className={ iconClass } aria-hidden="true" /> <a href={ href }>{ text }</a>
        </p>        
      );
    } else {
      return (
        <p>
          <i className={ iconClass } aria-hidden="true" /> { text }
        </p>    
      );
    }
  }

  renderSocialIcons() {
    return (
      <ul className="nav navbar-nav neal-footer-social">
        { this.renderSocialIcon('fa-twitter', this.props.twitterUrl) }
        { this.renderSocialIcon('fa-facebook', this.props.facebookUrl) }
        { this.renderSocialIcon('fa-skype', this.props.skype) }
				{ this.renderSocialIcon('fa-whatsapp', this.props.whatsup) }
      </ul>
    );
  }

  renderSocialIcon(iconClass, url) {
    if (!url || !iconClass) { return null; }
    return (
     <li className={`nav-item neal-footer-social-icon ${iconClass.replace('fa-', '')}`}>
        <a href={url} target="_blank">
          <span className="fa-stack">
            <i className="fa fa-circle fa-stack-2x" />
            <i className={`fa ${iconClass} fa-stack-1x fa-inverse`} />
          </span>
        </a>
      </li>
    );
  }
}
