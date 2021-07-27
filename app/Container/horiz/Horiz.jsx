import React from 'react';

import './horiz.scss';

export default class Horiz extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className='line' style={{
            top: `${this.props.pos}px`,
            transition: this.props.pos ? 'top 1s ease-out' : null

         }}
            onTransitionEnd={this.props.pos ? this.props.updateArr : null}>
            {
               this.props.copyArrImages.map(function ({ name, src }, i) {
                  return <img key={name + src + i} src={src} className={name} />
               })
            }
         </div>
      )
   }
}