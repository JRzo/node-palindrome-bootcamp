let button = document.querySelector('input[type=button]');
button.addEventListener('click', checkWord)


async function checkWord(){
    let v = document.getElementById("palindromeInput").value;

    try{
        const response = await fetch(`/result?answer=${v}`);
        if(!response.ok){
            throw new Error("Not found")
        }

        const data = await response.json();
        console.log(data)
        if(data == true){
            document.querySelector("body").style.background = "lightgreen";
        }
        else{
            document.querySelector("body").style.background = "red";
        }
        return data;
    }
    catch(error){
        console.log(error);
    }
}