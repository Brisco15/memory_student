function memoryGame(){

    let max, imgMix, counter, img1, img2, pairs, clickCounter, startTime, soundSwitch;

    function initVaris(){
        max = 16;              //Anzahl der Bilder
        
        // const tempSet = loadImgSet();
        imgMix = mixMyImg(loadImgSet());
        counter = 0;           //zählt die aufgedeckten Bilder
        img1    = null;       //speichert das 1. Bild
        img2    = null;      //speichert das 2. Bild
        pairs   = 0;         //zählt die gef. Paare
        clickCounter = 0;    //zählt alle Klicks
        startTime    = null; //Spielstart -Zeitstempel
        soundSwitch  = false;//Sound ein - aus
    }


    function createField(){
        for (let i=0; i< max; i++){
            const img = new Image();
            // img.src = 'img_1/memory_1.gif';
            img.setAttribute('src','img_1/memory_1.gif');
            img.setAttribute('alt','Memory Image');
            img.setAttribute('data-index',i);
            img.addEventListener ('click', gameLogic);

            el('#game').append(img);
        }

    }


    function loadImgSet(){
        const pool = []; // 25 BilderPfade
        const set = []; // 8 Paare Zufall

        // pool auffüllen
        for(let i =1;i < 26; i++){
            const path = `img_1/p_${i}.gif`;
            pool.push(path);
        }
        //  console.log(pool)

         // 8 Bildpaare aus dem pool in array set speichern

         for(let i =0; i< max/2; i++){
        //1.zufälligen Index aus dem pool suchen

            const index = Math.floor(Math.random() * pool.length);
            const path = pool.splice(index,1)[0];
            set.push(path);
            set.push(path);
         }
        

         return set;
    }

    function mixMyImg(array){

        const mix = [];
        const le = array.length;
        for (let i = 0; i < le; i++){
            const index = Math.floor(Math.random() * array.length);
            const path = array.splice(index,1)[0];
            mix.push(path);
        }


        return mix;

    }


    function countAllClicks(){
        clickCounter ++;
        el('#klicks').innerText = `Du hast ${clickCounter} mal geklickt`
    }

    function gameLogic(){
        counter++;
        countAllClicks();

        if(counter === 1){
            img1 = this;
            
            img1.removeEventListener('click', gameLogic);
            const index = img1.getAttribute('data-index');
            img1.src = imgMix[index];

        }

        if(counter === 2){
            img2 = this;

            img2.removeEventListener('click', gameLogic);
            const index = img2.getAttribute('data-index');
            img2.src = imgMix[index];


            //Vergleich
            if(img1.src === img2.src){
                //1 pärchen -2 gleiche
                img1.src = 'img_1/wow.gif';
                img2.src = 'img_1/wow.gif';
                counter = 0;

                //Spiel Ende
                pairs ++;
            if(pairs === max/2){
                //  if(pairs === 1){
                    
                    //ENDE
                    //Alle Bilder drehen / wechseln
                    const imgs = group('#game img');
                    const le = imgMix.length;
                    for(let i =0; i < le; i++){
                        imgs[i].src = imgMix[i];
                    }
                    el('#start').className = 'start-aktiv';
                    
                }

            }else{
                //2 ungleiche
                setTimeout(function(){
                    img1.src = 'img_1/memory_1.gif';
                    img2.src = 'img_1/memory_1.gif';
                    img1.addEventListener('click',gameLogic);
                    img2.addEventListener('click',gameLogic);
                    counter = 0;

                },400);

            }

        }

        
        // console.log(this.getAttribute('data-index'));
    }

    function newGame (){
        initVaris();
        const imgs = group('#game img');
        const le = imgs.length;

        for(let i =0; i< le; i ++){
            imgs[i].src = 'img_1/memory_1.gif';
            imgs[i].addEventListener('click', gameLogic);

        }

        el('#start').className = 'start-passiv';


    }

    initVaris();
    createField();
    el('#start').addEventListener('click',newGame);
    

}

memoryGame()


//Experiment

function test (){
    const arr = [1,2,3,4,5,6,7,8,9,0]
    const result = arr.splice(4,1)[0];
    console.log(arr)
    console.log(result)

}
// test();