import React from 'react';
import Board from './board/Board.jsx';

import './painelControle.scss';

import betCalc from './betCalc';
import maxBetCalc from './maxBetCalc';

export default class PainelControle extends React.Component {
   constructor(props) {
      super(props);
      this.state = { bet: 1, line: 1, credit: 100, betCoef: 1, multiplier: 1, painelControleDisabled: this.props.painelControleDisabled };
      this.start = this.start.bind(this);
      this.changeBet = this.changeBet.bind(this);
      this.maxBet = this.maxBet.bind(this);
      this.chooseLine = this.chooseLine.bind(this);
      this.takePrize = this.takePrize.bind(this);
   }

   start() {
      let res = this.state.credit - this.state.bet;
      if (res < 0) return;
      this.setState({ credit: res })
      this.props.spinAcivate()
   }

   changeBet() {
      let betCoef = (this.state.betCoef === 22) ? 1 : this.state.betCoef + 1;
      let { b, bC } = betCalc(this.state.line, this.state.credit, betCoef);
      let m = b / this.state.line;
      this.setState({ bet: b, betCoef: bC, multiplier: m })
   }

   maxBet() {
      let { mB, bC } = maxBetCalc(this.state.line, this.state.credit, this.state.betCoef);
      let m = mB / this.state.line;
      this.setState({ bet: mB, betCoef: bC, multiplier: m })
   }

   chooseLine() {
      let chosenLine = this.state.line;
      if (chosenLine === 1 && this.state.credit > 2) {
         chosenLine = 3;
      }
      else if (chosenLine === 3) {
         chosenLine = 1;
      }
      let { b, bC } = betCalc(chosenLine, this.state.credit, this.state.betCoef)
      let m = b / chosenLine;
      this.setState({ bet: b, line: chosenLine, betCoef: bC, multiplier: m })
      this.props.changeActiveLines(chosenLine)
   }

   takePrize(sum) {
      this.setState(function (prev) {
         return {
            credit: prev.credit + sum
         }
      }, () => this.props.enablePainelControl())
   }

   render() {
      let pr1won = this.props.pr1 ? this.props.pr1 * this.state.multiplier : 0;
      let pr2won = this.props.pr2 ? this.props.pr2 * this.state.multiplier : 0;
      let pr3won = this.props.pr3 ? this.props.pr3 * this.state.multiplier : 0;
      let sum = pr1won + pr2won + pr3won;

      let betOrTake = sum ? <button onClick={this.takePrize.bind(null, sum)} disabled={this.props.takeButtonDisabled}>TAKE</button> : <button onClick={this.start} disabled={this.props.painelControleDisabled}>START</button>;

      return (
         <>
            <Board bet={this.state.bet} line={this.state.line} credit={this.state.credit}
               pr1={pr1won} pr2={pr2won} pr3={pr3won} sums={sum} />
            <div id="painelControle">
               {betOrTake}
               <button onClick={this.changeBet} disabled={this.props.painelControleDisabled}>BET</button>
               <button onClick={this.maxBet} disabled={this.props.painelControleDisabled}>MAX BET</button>
               <button onClick={this.chooseLine} disabled={this.props.painelControleDisabled}>LINE</button>
            </div>
         </>
      )
   }
}