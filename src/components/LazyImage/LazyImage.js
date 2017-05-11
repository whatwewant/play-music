/**
* @Author: eason
* @Date:   2017-05-11T19:56:18+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-05-11T20:40:38+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import LoadingPNG from '../../assets/loading.png';

export default class LazyImage extends PureComponent {

  static propTypes = {
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: LoadingPNG,
  };

  state = {
    link: null,
  };

  onLoad = () => {
    const link = this.props.src;
    this.setState({ link });
  }

  onError = () => {

  }

  render() {
    return (
      <div style={{ position: 'relative', ...this.props.style }}>
        <img
          style={{ display: this.state.link ? 'none' : 'block', padding: 20, width: '100%', height: '100%' }}
          role="presentation"
          src={this.props.placeholder}
        />
        <img
          style={{
            display: this.state.link ? 'block' : 'none',
            width: '100%',
            height: '100%',
          }}
          role="presentation"
          src={this.props.src}
          onLoad={this.onLoad}
          onError={this.onError}
        />
      </div>
    );
  }
}
