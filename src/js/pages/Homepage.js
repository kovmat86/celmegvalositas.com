import React from 'react';
import { Page, Section } from 'neal-react';
import Universe from '../components/Universe';
import { ContentProvider } from '../components/ContentProvider';
import GoogleAnalytics from '../components/GoogleAnalytics';
import HeroVideo from '../components/HeroVideo';
import HeroVideoContent from '../components/HeroVideoContent';
import { Footer } from '../components/Footer';
import NavigationHeader from '../components/NavigationHeader';
import WhereWeAre from '../components/WhereWeAre';
import WhoWeAre from '../components/WhoWeAre';
import WhatWeDo from '../components/WhatWeDo';
import WhyChooseUs from '../components/WhyChooseUs';
import HowWeWork from '../components/HowWeWork';
import HeroFooter from '../components/HeroFooter';
import RequestModal from '../components/RequestModal';
import AppointmentModal from '../components/AppointmentModal';
import PleaseWaitModal from '../components/PleaseWaitModal';
import ErrorModal from '../components/ErrorModal';
import ProductInfoModal from '../components/ProductInfoModal';
import PhoneBackConfirmationModal from '../components/PhoneBackConfirmationModal';
import AppointmentConfirmationModal from '../components/AppointmentConfirmationModal';

const heroVideo = {
  poster: '/resources/images/first-frame-hero.jpg',
  source: {
    url: '/resources/videos/background-video.mp4',
    type: 'video/mp4'
  }
};

export default class Homepage extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
      business: ContentProvider.get('business') || {},
      homepage: ContentProvider.get('homepage') || {},
      pleaseWaitModal: ContentProvider.get('pleaseWaitModal') || {},
      defaultErrorModal: ContentProvider.get('defaultErrorModal') || {},
      messageService: ContentProvider.get('messageService') || {}
    };
  }

  render() {
    return (
      <Universe>
        <Page>
          
          <GoogleAnalytics account="UA-103461022-2" />
          <NavigationHeader contentProvider={ContentProvider} title={this.state.business.title} />

          <HeroVideo {... heroVideo}>
            <HeroVideoContent contentProvider={ContentProvider} />
          </HeroVideo>

          <Section className="gray-bg">
            <WhatWeDo contentProvider={ContentProvider} />
            <WhoWeAre contentProvider={ContentProvider} />
          </Section>

          <Section className="transparent-bg">
            <WhyChooseUs contentProvider={ContentProvider} />
          </Section>

          <Section className="gray-bg">
            <HowWeWork contentProvider={ContentProvider} />
          </Section>

          <WhereWeAre 
            lng={this.state.business.officeLng} 
            lat={this.state.business.officeLat} />

          <Section className="gold-gradient-bg-transparent thinner">
            <HeroFooter contentProvider={ContentProvider} />
          </Section>

          <RequestModal contentProvider={ContentProvider} />
          <AppointmentModal contentProvider={ContentProvider} />
          <PhoneBackConfirmationModal contentProvider={ContentProvider} />
          <AppointmentConfirmationModal contentProvider={ContentProvider} />
          <PleaseWaitModal contentProvider={ContentProvider} />
          <ErrorModal contentProvider={ContentProvider} />

          <Footer brandName={this.state.business.title}
            facebookUrl={this.state.business.facebookUrl}
            twitterUrl={this.state.business.twitterUrl}
            skype={this.state.business.skype}
            whatsup={this.state.business.whatsup}
            email={this.state.business.emailAddress}
            phone1={this.state.business.phoneNumber}
            phone2={this.state.business.phoneNumberOptional}
            address={this.state.business.address}
            formCtaLabel={this.state.messageService.ctaLabel} 
            formTitle={this.state.messageService.title} 
            projectName={this.state.business.projectName}
            projectCode={this.state.business.projectCode}
            projectEndDate={this.state.business.projectEndDate}
            projectSupportRate={this.state.business.projectSupportRate}
            projectSupportInHuf={this.state.business.projectSupportInHuf}
            />

        </Page>
      </Universe>
    );
  }

}

