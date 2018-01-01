(function ($) {

    //Definition des variables
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var volume, player, score, stop, ticker;
    var platfroms = [],
        water = [],
        ennemies = [],
        environment = [];



    //localStorage????

    //variables des platforms
    var platformHeight, platformLength, gapLength;
    var platformWidth = 32;
    var platformBase = canvas.height - platformWidth;
    var platformSpacer = 64;


    /**
     * Charger toutes les images et les sons
     */

    var assetLoader = (function () {
        this.imgs = {
            'backdrop': 'imgs/backdrop.png',
            'backdrop_ground': 'imgs/backdrop_ground.png',
            'bg': 'imgs/bg.png',
            'boxCoin': 'imgs/boxCoin.png',
            'bridge': 'imgs/bridge.png',
            'bush1': 'imgs/bush1.png',
            'bush2': 'imgs/bush2.png',
            'credits-bg': 'imgs/credits-bg.png',
            'grass': 'imgs/grass.png',
            'grassCliffRight': 'imgs/grassCliffRight.png',
            'grassMid1': 'imgs/grassMid1.png',
            'grassMid2': 'imgs/grassMid2.png',
            'menu-bg': 'imgs/menu-bg.png',
            'ninja': 'imgs/ninja.png',
            'plant': 'imgs/plant.png',
            'sky': 'imgs/sky.png',
            'slime': 'imgs/slime.png',
            'soundOff': 'imgs/soundOff.png',
            'soundOn': 'imgs/soundOn.png',
            'spikes': 'imgs/spikes.png',
            'water': 'imgs/water.png'

        };

        this.sounds = {
            'bg': 'sounds/bg.mp3',
            'jump': 'sounds/jump.mp3',
            'gameOver': 'sounds/gameOver.mp3'
        };

        var assetLoaded = 0; //nb d'objets chargé
        var nbImgs = Object.keys(this.imgs).length; //nb d'images chargé
        var nbSounds = Object.keys(this.sounds).length; //nb de sons chargé
        this.totalAsset = nbImgs + nbSounds;
        this.checkAudio = {}; //????


        function assetLoaded(self, folder, name) {
            assetLoaded++;
            self[folder][name].status = 'loaded';
            assetProgress(assetLoaded, self.totalAsset);
            if (assetLoaded === self.totalAsset) {
                clearInterval(self.checkAudio);
                //mainMenu();
            }
        }

        /**
         * check le statut de chargement de tous les fichiers sons
         */
        function checkAudioStatus() {
            for (var sound in this.sounds) {
                if (this.sounds.hasOwnProperty(sound) && this.sounds[sound].status === 'loading' && this.sounds[sound].readyState === 4) {
                    assetLoaded(this, 'sounds', sound);
                }
            }
        }


        var self = this;
        for (var img in this.imgs) {
            if (this.imgs.hasOwnProperty(img)) {
                this.imgs[img] = new Image();
                this.imgs[img].status = 'loading';
                this.imgs[img].onload = function () {
                    assetLoaded(self, 'imgs', img);
                };
                this.imgs[img].src = this.imgs[img];
            }
        }

        for (var sound in this.sounds) {
            if (this.sounds.hasOwnProperty(sound)) {
                this.sounds[sound] = new Audio();
                this.sounds[sound].status = 'loading';
                this.sounds[sound].volume = volume;
                this.sounds[sound].src = this.sounds[sound];
            }
        }
        var that = this;
        if (nbSounds > 0) {
            this.checkAudio = setInterval(function () {
                checkAudioStatus.call(that);
            }, 1000);
        }

        return {
            imgs: this.imgs,
            sounds: this.sounds,
            totalAsset: this.totalAsset
        };

    })();

    function SpriteSheet() {

    }

    function Animation() {

    }

    function random() {

    }

    function bound() {

    }

    function Vector() {

    }

    var background = (function () {

    })();


    function Player() {

    }

    function Sprite() {

    }

    function getType() {

    }

    function updatePlatforms() {

    }

    function updateWater() {

    }

    function updateEnvironment() {

    }

    function updateEnemies() {

    }

    function updatePlayer() {

    }

    function spawnSprites() {

    }
    
    function spawnEnvironmentSprites(){
        
    }
    
    

    /**
     * Check progression de chargement des objets
     */
    function assetProgress(progress, total) {
        var progressBar = document.getElementById('progress-bar');
        progressBar.value = progress / total;
        document.getElementById('prog').innerHTML = Math.round(progressBar.value * 100) + "%";
    }


    function mainMenu() {
        assetLoader.sounds.bg.loop = true;
        $('#progress').hide();
        $('#main').show();
        $('#menu').addClass('main');
        $('.sound').show();
    }

    function startGame() {
        platforms = [];
        water = [];
        environment = [];
        ennemies = [];
        player = new Player();
        ticker = 0;
        stop = false;
        score = 0;
        platformHeight = 2;
        platformLength = 15;
        gapLength = 0;
    }

    function gameOver() {
        stop = true;
        $('#score').html(score);
        $('#game-over').show();
        assetLoader.sounds.bg.pause();
        assetLoader.sounds.gameOver.currentTime = 0;
        assetLoader.sounds.gameOver.play();
    }

    $('.sound').click(function () {
        var $this = $(this);
        if ($this.hasClass('sound-on')) {
            $this.removeClass('sound-on').addClass('sound-off');
            volume = 0;
        } else {
            $this.removeClass('sound-off').addClass('sound-on');
            volume = 1;
        }

        for (var sounsd in assetLoader.sounds) {
            assetLoader.sounds[sound].volume = volume;
        }
    });

    $('.play').click(function () {
        $('#menu').hide();
        startGame();
    });

    $('.restart').click(function () {
        $('#game-over').hide();
        startGame();
    })



}(jQuery));
