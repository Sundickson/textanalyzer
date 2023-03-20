let charCount = document.getElementById('char'),
    wordCount = document.getElementById('word'),
    sentence = document.getElementById('sentence'),
    spaces = document.getElementById('spaces'),
    punctuation = document.getElementById('punctuation');

const textarea = document.querySelector('.text-entry textarea'),
      processBtb = document.getElementById('process-btn');

      let UIValues = [charCount, wordCount, sentence, spaces, punctuation];

      function init(){
        UIValues.forEach(value => value.innerHTML = 0);
      }
      init();

     processBtb.addEventListener('click', () => {
        let text = textarea.value;
        charCount.innerHTML = text.length;
        wordCount.innerHTML = findword(text);
        sentence.innerHTML = findSentence(text);
        spaces.innerHTML = text.split(" ").length -1;
        punctuation.innerHTML = findPunctuation(text);
     });
    function findword(text){
        let tempText = text.replace(/[.,!%&*;:.\'"-()]/g,"");
            tempText = tempText.replace(/[\r]/g, "").split(/\n/); // splitting on the new line character

         let templist =[];
         tempText.forEach(word => templist.push(word.split(" ")));
         function extract (arr){
            return arr.reduce((wordlist, word) => {
                return wordlist.concat(Array.isArray(word) ? extract
                 (word) : word);
            },[]);

         }
         let wordList = extract(templist);
         return wordList.filter( char => char != '' ).length;
    }

    function findSentence(text){
        const regex = /[\w|\)][.?!](\s|$)/g;
        let senCount = text.match(regex);
        return senCount ? senCount.length : 0;
       
    }
    
    function findPunctuation(text){
      const regex = /[.,?;:!-'"(){}]/g;
       let puncCount = text.match(regex);
       return puncCount ? puncCount.length : 0;
    }