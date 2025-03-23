let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let input = document.querySelector("input"); 
let btn = document.querySelector("button");
let result = document.querySelector("#result");

btn.addEventListener("click", async () => {
    let word = input.value;
    let data = await dictionaryApi(word);
    if (typeof data === "string") {
        result.innerText = data; // Display error message if API fails
    } else {
        let phonetic = data[0].phonetic || "No phonetic available";
        let meanings = data[0].meanings.map(m => m.definitions[0].definition).join("\n");

        result.innerText = `Phonetic: ${phonetic}\nMeanings:\n${meanings}`;
    }
});

async function dictionaryApi(word) {

    try{
        let res = await axios.get(url+word);
        return res.data;
    } catch(e){
        console.log("Error - ", e);
        return "No data found";
    }
    
}