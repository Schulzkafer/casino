import React from 'react';

import './board.scss';

export default class Board extends React.Component {
   constructor(props) {
      super(props);
      this.state = { pr1: this.props.pr1, pr2: this.props.pr2, pr3: this.props.pr3, sum: 0 }
   }
   render() {
      let lineOrWin = this.props.sums ? <div>WON: <span>{this.props.sums}</span></div>
         : <div>LINE: <span>{this.props.line}</span></div>;

      return (
         <div id='board'>
            <div>BET: <span>{this.props.bet}</span></div>
            {lineOrWin}
            <div>CREDIT: <span>{this.props.credit}</span></div>
         </div>
      )
   }
}