import React from 'react';
import CustomerFeedback from './CustomerFeedback';

class CustomerFeedbackSection extends React.Component {

  static propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.element),
  };

  render() {
    const feedbacks = this.props.data.map(item => {
      const props = {
        text: item.text,
        rating: item.rating,        
        name: item.customerName
      };
      if (item.customerPortrait && item.customerPortrait.file) {
        props.imageUrl = 'http:' + item.customerPortrait.file.url;
      }
      return (
        <CustomerFeedback {... props} />
      );
    });

    return (
      <div className="neal-customer-quotes">
        <HorizontalSplit>
          {feedbacks}
        </HorizontalSplit>
      </div>
    );    
  }

}

export { CustomerFeedbackSection };
export default CustomerFeedbackSection;
