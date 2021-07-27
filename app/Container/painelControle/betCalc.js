export default function (line, credit, betCoef) {
   let b;
   if (betCoef < 11) b = betCoef * line;
   else if (betCoef < 19) b = betCoef * 5 * line - 40 * line;
   else if (betCoef < 23) b = betCoef * 10 * line - 130 * line;
   return b > credit ? { b: line, bC: 1 } : { b: b, bC: betCoef };
}
