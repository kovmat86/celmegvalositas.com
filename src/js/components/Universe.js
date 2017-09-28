/* globals $, window */
import React, {Component} from 'react';

export default class Universe extends Component {

  componentDidMount() {
    this.initScrollAnimations();
    this.initViewportAnimationS();
  }

  initScrollAnimations() {
    // Smooth Scroll Start
    var navInneer = $('.scroll-nav');
    navInneer.singlePageNav({
      updateHash: false,
      filter: ':not(.external)',
      offset: 52,
      speed: 1000,
      currentClass: 'sdm-active',
      easing: 'swing',
    });
    $(".scroll-nav li a[href^='#']").on('click', function(e) {
      e.preventDefault();
      $('.scroll-nav li a').removeClass('sdm-active');
      $(this).addClass('sdm-active');
    });
    // Smooth Scroll End
    var win = $(window);
    win.on('scroll',function() {
      var scroll = win.scrollTop();
      if (scroll >= 400) {
        $('#side-cta').addClass('open');
      } else {
        $('#side-cta').removeClass('open');
      }
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
