let obj = { 'C': 3, 'JS': 4, 'PYTHON': 5, 'HASKELL': 6, 'JAVA': 7, 'CPLUS': 8, 'RUBY': 9 };

export default function (el) {
   return obj[el] || 0;
}