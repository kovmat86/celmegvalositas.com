/* globals $, window */
import React, {Component} from 'react';

export default class Universe extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.setHeaderPosition);
    this.setHeaderPosition();
    this.initViewportAnimationS();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeaderPosition);
  }

  setHeaderPosition() {
    const height = $('#root > div > div > div > div:nth-child(2) > ul').height();
    $('#szlogo-container').css({ top: height + 20 + 'px' });

    // Smooth Scroll Start
    var navInneer = $('.scroll-nav');
    navInneer.singlePageNav({
      updateHash: false,
      filter: ':not(.external)',
      offset: height + 52,
      speed: 1000,
      currentClass: 'sdm-active',
      easing: 'swing',
    });
    $('.scroll-nav li a[href^=\'#\']').on('click', function(e) {
      e.preventDefault();
      $('.scroll-nav li a').removeClass('sdm-active');
      $(this).addClass('sdm-active');
    });
  }

  initViewportAnimationS() {
    // adding class when an animatble element is in viewport
    const viewportSelector = '.viewport-animation';
    const viewportClassName = 'in-viewport';
    $(viewportSelector).inViewport(function(px) {
      if (px > 0 ) {
        if (!this.classList.contains(viewportClassName)) {
          this.classList.add(viewportClassName);
        }
      } else {
        this.classList.remove(viewportClassName);
      }
    });
  }

  render() {
    return (
      <div id={this.props.id} data-spy="scroll" data-target=".navbar" data-offset="50">
        {this.props.children}
      </div>
    );
  }
}
