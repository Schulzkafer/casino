export default function (v1, v2, v3, ls) {

   function twoRubies(n) {
      if ([v1, v2, v3].filter(x => x[n].name === 'RUBY').length === 2) return h2 = [v1, v2, v3].filter(x => x[n].name !== 'RUBY')[0][n].name;
      else return false;
   }

   let h1 = false;
   let h2 = [v1, v2, v3].every(x => x[1].name === v1[1].name || x[1].name === 'RUBY') ? v1[1].name : false;
   if (h2 === false) h2 = twoRubies(1)
   let h3 = false;

   if (ls > 1) {
      h1 = [v1, v2, v3].every(x => x[0].name === v1[0].name || x[0].name === 'RUBY') ? v1[0].name : false;
      if (h1 === false) h1 = twoRubies(0)
      h3 = [v1, v2, v3].every(x => x[2].name === v1[2].name || x[2].name === 'RUBY') ? v1[2].name : false;
      if (h3 === false) h3 = twoRubies(2)
   }

   return [h1, h2, h3];
}

