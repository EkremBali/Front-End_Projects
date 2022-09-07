function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.checkAnswer = function(answer){

    return this.answer === answer;

};

var q1 = new Question("Osmanlı İmparatorluğunun Kurucusu Kimdir?",["Osman Gazi","Ertuğrul Gazi","Orhan Gazi","1.Mehmet"],"Osman Gazi");
var q2 = new Question("Türkiye Cumhuriyetinin Kurucu Lideri Kimdir?",["Fevzi Çakmak","İsmet İnönü","Mustafa Kemal Atatürk","Kazım Karabekir"],"Mustafa Kemal Atatürk");
var q3 = new Question("Büyük Selçuklu İmparatorluğunun Kurucusu Kimdir?",["Selçuk Bey","Tuğrul Bey","Melikşah","Uluğ Bey"],"Tuğrul Bey");

var dogruSayisi = 0;

function soru1Hazirla(dogru){
    var soru = document.getElementById("question");
    soru.innerText=q1.text;

    var butonlar = document.getElementById("buttons");
    for(let i=0;i<4;i++){
        butonlar.children[i].children[0].innerText = q1.choices[i];
        console.log(butonlar.children[i].children[0]);
    }

    var footer = document.getElementById("progress");
    footer.innerText = "Quesiton 1 of 3";

    butonlar.addEventListener("click",function(e){

        if(e.target.id == "buttons"){
    
        }
        else{
            if(q1.checkAnswer(e.target.innerText)){
                dogru++;
                soru2Hazirla(dogru);
            }
            else{
                soru2Hazirla(dogru);
            }
            
        }
    
    });

}

function soru2Hazirla(dogru){
    var soru = document.getElementById("question");
    soru.innerText=q2.text;

    var butonlar = document.getElementById("buttons");
    for(let i=0;i<4;i++){
        butonlar.children[i].children[0].innerText = q2.choices[i];
        console.log(butonlar.children[i].children[0]);
    }

    var footer = document.getElementById("progress");
    footer.innerText = "Quesiton 2 of 3";

    butonlar.addEventListener("click",function(e){

        if(e.target.id == "buttons"){
    
        }
        else{
            if(q2.checkAnswer(e.target.innerText)){
                dogru++;
                soru3Hazirla(dogru);
            }
            else{
                soru3Hazirla(dogru);
            }
            
        }
        
    
    });

}

function soru3Hazirla(dogru){
    var soru = document.getElementById("question");
    soru.innerText=q3.text;

    var butonlar = document.getElementById("buttons");
    for(let i=0;i<4;i++){
        butonlar.children[i].children[0].innerText = q3.choices[i];
        console.log(butonlar.children[i].children[0]);
    }

    var footer = document.getElementById("progress");
    footer.innerText = "Quesiton 3 of 3";

    butonlar.addEventListener("click",function(e){

        if(e.target.id == "buttons"){
    
        }
        else{
            if(q3.checkAnswer(e.target.innerText)){
                dogru++;
                sonucHazirla(dogru);
            }
            else{
                sonucHazirla(dogru);
            }
            
        }
        
    
    });

}

function sonucHazirla(dogru){
    var body = document.querySelector(".card-body");

    for(let i=0;i<=5;i++){
        body.removeChild(body.firstChild); 
    }

    var h2 = document.createElement("h2");
    h2.className = "card-title";
    h2.innerText = "Result";
    
    body.appendChild(h2);

    var h5 = document.createElement("h5");
    h5.innerText = "Your Score : "+dogru;
    
    body.appendChild(h5);
    
}

soru1Hazirla(dogruSayisi);


