import React from 'react';

import './drawLinesAndIndics.scss';

export default class DrawLinesAndIndics extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return <div className={`containerLineIndic containerLineIndic${this.props.xEl}`}>
         <div className={`drawLine drawLine${this.props.xEl}`}
            style={{ display: this.props[`drawLine${this.props.xEl}`] ? '' : 'none' }}>
         </div>
         <div className={`indicatorLeft`}>{this.props.xEl == 1 ? 2 : this.props.xEl == 2 ? 1 : 3}</div>
         <div className={`indicatorRight`}>{this.props.xEl == 1 ? 2 : this.props.xEl == 2 ? 1 : 3}</div>
      </div>
   }
}