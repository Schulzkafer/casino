export default function (line, credit, betCoef) {
   let mB;
   let bC = 23;
   while (--bC) {
      if (bC < 11) mB = bC * line;
      else if (bC < 19) mB = bC * 5 * line - 40 * line;
      else if (bC < 23) mB = bC * 10 * line - 130 * line;

      if (mB <= credit) return { mB: mB, bC: bC }
   }
   return { mB: line, bC: betCoef }
}
