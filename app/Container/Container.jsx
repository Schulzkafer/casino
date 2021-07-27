import React from 'react';

import Info from './info/info.jsx';
import Horiz from './horiz/Horiz.jsx';
import PainelControle from './painelControle/PainelControle.jsx';
import DrawLinesAndIndics from './drawLineAndIndics/drawLinesAndIndics.jsx';

import './container.scss';

import getRandomInt from '../static/commonJS/randoms';
import arrImages from '../static/commonJS/images';
import ifMatchesLines from './ifMatchesLines';
import calcPremium from './calcPremium';
import shuffle from '../static/commonJS/shuffle';

export default class Container extends React.Component {
   constructor(props) {
      super(props);
      this.state = ({
         actLine: 1, actImg: 0, pos1: 0, copyArrImages1: shuffle(arrImages.slice()), pos2: 0,
         copyArrImages2: shuffle(arrImages.slice()), pos3: 0, copyArrImages3: shuffle(arrImages.slice()),
         painelControleDisabled: false,
         takeButtonDisabled: true,
         premium1: 0, premium2: 0, premium3: 0,
         drawLine1: false, drawLine2: false, drawLine3: false,
         activeLines: 1,
         info: false,
         pageInfo: 1
      });
      this.spinAcivate = this.spinAcivate.bind(this);
      this.updateArr = this.updateArr.bind(this);
      this.checkMatches = this.checkMatches.bind(this);
      this.enablePainelControl = this.enablePainelControl.bind(this);
      this.changeActiveLines = this.changeActiveLines.bind(this);
      this.showInfo = this.showInfo.bind(this);
      this.changePageInfo = this.changePageInfo.bind(this);
   }

   spinAcivate() {
      let cell = getRandomInt(10, 30);
      let posit = cell * -150;
      this.setState({ actImg: cell, [`pos${this.state.actLine}`]: posit, painelControleDisabled: true })
   }

   updateArr() {
      let object = this.state[`copyArrImages${this.state.actLine}`];
      this.setState(function (prevState) {
         return {
            [`copyArrImages${this.state.actLine}`]: [].concat(object.slice(this.state.actImg), object.slice(0, this.state.actImg)),
            [`pos${prevState.actLine}`]: 0,
            actImg: 0,
            actLine: (prevState.actLine === 3) ? 1 : prevState.actLine + 1,
         };
      }, () => this.state.actLine === 1 ? this.checkMatches() : this.spinAcivate());
   }

   checkMatches() {
      let [l1, l2, l3] = ifMatchesLines(this.state.copyArrImages1.slice(0, 3), this.state.copyArrImages2.slice(0, 3), this.state.copyArrImages3.slice(0, 3), this.state.activeLines);
      let won = false;
      new Promise((res, rej) => {
         let r = calcPremium(l1);
         //console.log(`${l1} : ${r}`);
         if (r) this.setState({ drawLine1: true, premium1: r });
         (r) ? setTimeout(() => {
            won = true;
            res()
         }, 1000) : res()
      }).then(() => {
         return new Promise((res, rej) => {
            let r = calcPremium(l2);
            // console.log(`${l2} : ${r}`);
            if (r) this.setState({ drawLine2: true, premium2: r });
            (r) ? setTimeout(() => {
               won = true;
               res()
            }, 1000) : res()
         })
      }).then(() => {
         return new Promise((res, rej) => {
            let r = calcPremium(l3);
            //console.log(`${l3} : ${r}`);
            if (r) this.setState({ drawLine3: true, premium3: r });
            (r) ? setTimeout(() => {
               won = true;
               res()
            }, 1000) : res()
         })
      }).then(() => {
         (!won) ? this.setState({ painelControleDisabled: false }) : this.setState({ takeButtonDisabled: false });
         // console.log('finished');
      })
   }

   enablePainelControl() {
      this.setState({
         painelControleDisabled: false,
         takeButtonDisabled: true,
         premium1: 0, premium2: 0, premium3: 0,
         drawLine1: false, drawLine2: false, drawLine3: false
      })
   }

   changeActiveLines(n) {
      if (n === 1) this.setState({ activeLines: n, drawLine2: true })
      if (n === 3) this.setState({ activeLines: n, drawLine1: true, drawLine2: true, drawLine3: true })
      setTimeout(() => this.setState({ drawLine1: false, drawLine2: false, drawLine3: false }), 300)
   }

   showInfo() {
      this.setState(function (prev) {
         return {
            info: !prev.info
         }
      })
   }

   changePageInfo() {
      this.setState(function (prev) {
         return {
            pageInfo: (prev.pageInfo === 1) ? 2 : 1
         }
      })
   }

   render() {
      return <div id='container'>
         {
            (!this.state.info) ?
               <>
                  <div id='innerContainer'>
                     {
                        [1, 2, 3].map(x => {
                           return <Horiz key={'horiz' + x} pos={this.state[`pos${x}`]} copyArrImages={this.state[`copyArrImages${x}`]} updateArr={this.updateArr} />
                        })
                     }
                     {
                        [1, 2, 3].map(x => {
                           return <DrawLinesAndIndics key={'DrawLines' + x} xEl={[x]} drawLine1={this.state.drawLine1} drawLine2={this.state.drawLine2} drawLine3={this.state.drawLine3} />
                        })
                     }
                  </div>
                  <PainelControle spinAcivate={this.spinAcivate} painelControleDisabled={this.state.painelControleDisabled}
                     takeButtonDisabled={this.state.takeButtonDisabled} enablePainelControl={this.enablePainelControl}
                     changeActiveLines={this.changeActiveLines}
                     pr1={this.state.premium1} pr2={this.state.premium2} pr3={this.state.premium3} />
               </>
               :
               <Info pageInfo={this.state.pageInfo} />
         }
         <div id='infoButtons' style={{ display: 'flex' }}  >
            <div><button onClick={this.showInfo} disabled={this.state.painelControleDisabled}>INFO</button></div>
            {this.state.info === true ? <div><button onClick={this.changePageInfo}>{this.state.pageInfo === 1 ? 'NEXT' : 'PREVIOUS'}</button></div> : null}
         </div>
      </div>
   }
}
