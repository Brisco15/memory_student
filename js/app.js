function memoryGame(){

    let max, imgMix, counter, img1, img2, pairs, clickCounter, startTime, soundSwitch;

    function initVaris(){
        max = 16;              //Anzahl der Bilder
        // loadImgSet();//nur test


        const tempSet = loadImgSet();
        imgMix = mixMyImg(tempSet);
        console.log(imgMix);


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

    function gameLogic(){
        // console.log(this.getAttribute('data-index'));
    }







    initVaris();
    createField();
    

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