(function ($) {

    //Definition des variables
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var volume, player, score, stop, ticker;
    var platfroms = [],
        water = [],
        ennemies = [],
        environment = [];

    var canUseLocalStorage = window.localStorage !== null;
    ctx.font = "15pt Arial";

    //localStorage????

    //variables des platforms
    var platformHeight, platformLength, gapLength;
    var platformWidth = 32;
    var platformBase = canvas.height - platformWidth;
    var platformSpacer = 64;

    // regler les preferences de son
    if (canUseLocalStorage) {
        var playSound = (localStorage['game.playSound'] == true);

        if (playSound) {
            volume = 1;
            $('.sound').addClass('sound-on').removeClass('sound-off');
        } else {
            volume = 0;
            $('.sound').addClass('sound-off').removeClass('sound-on');
        }
    }

    /**
     * Charger toutes les images et les sons
     */

    var assetLoader = (function () {
        this.imgs = {
            'bg': 'imgs/bg.png',
            'sky': 'imgs/sky.png',
            'backdrop': 'imgs/backdrop.png',
            'backdrop2': 'imgs/backdrop_ground.png',
            'water': 'imgs/water.png',
            'grass1': 'imgs/grassMid1.png',
            'grass2': 'imgs/grassMid2.png',
            'avatar_normal': 'imgs/ninja.png',
            'bridge': 'imgs/bridge.png',
            'plant': 'imgs/plant.png',
            'bush1': 'imgs/bush1.png',
            'bush2': 'imgs/bush2.png',
            'cliff': 'imgs/grassCliffRight.png',
            'spikes': 'imgs/spikes.png',
            'grass': 'imgs/grass.png',
            'box': 'imgs/boxCoin.png',
            'slime': 'imgs/slime.png'

        };

        this.sounds = {
            'bg': 'sounds/bg.mp3',
            'jump': 'sounds/jump.mp3',
            'gameOver': 'sounds/gameOver.mp3'
        };

        var assetsLoaded = 0; //nb d'objets chargé
        var nbImgs = Object.keys(this.imgs).length; //nb d'images chargé
        var nbSounds = Object.keys(this.sounds).length; //nb de sons chargé
        this.totalAsset = nbImgs + nbSounds;
        this.checkAudio = {}; //????


        function assetLoaded(self, folder, name) {
            assetsLoaded++;
            self[folder][name].status = 'loaded';
            assetProgress(assetsLoaded, self.totalAsset);
            if (assetsLoaded === self.totalAsset) {
                clearInterval(self.checkAudio);
                mainMenu();
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
        var src = '';
        for (var img in this.imgs) {
            if (this.imgs.hasOwnProperty(img)) {
                src = this.imgs[img];
                this.imgs[img] = new Image();
                this.imgs[img].status = 'loading';
                this.imgs[img].onload = function () {
                    assetLoaded(self, 'imgs', img);
                };
                this.imgs[img].src = src;
            }
        }

        for (var sound in this.sounds) {
            if (this.sounds.hasOwnProperty(sound)) {
                src = this.sounds[sound];
                this.sounds[sound] = new Audio();
                this.sounds[sound].status = 'loading';
                this.sounds[sound].volume = volume;
                this.sounds[sound].src = src;
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
        this.sky = {};
        this.backdrop = {};
        this.backdrop2 = {};

        this.sky.x = 0;
        this.sky.y = 0;
        this.sky.speed = 0.2;

        this.backdrop.x = 0;
        this.backdrop.y = 0;
        this.backdrop.speed = 0.4;

        this.backdrop2.x = 0;
        this.backdrop2.y = 0;
        this.backdrop2.speed = 0.6;

        /**
         * Draw the backgrounds to the screen at different speeds
         */
        this.draw = function () {
            ctx.drawImage(assetLoader.imgs.bg, 0, 0);

            // Pan background
            this.sky.x -= this.sky.speed;
            this.backdrop.x -= this.backdrop.speed;
            this.backdrop2.x -= this.backdrop2.speed;

            // draw images side by side to loop
            ctx.drawImage(assetLoader.imgs.sky, this.sky.x, this.sky.y);
            ctx.drawImage(assetLoader.imgs.sky, this.sky.x + canvas.width, this.sky.y);

            ctx.drawImage(assetLoader.imgs.backdrop, this.backdrop.x, this.backdrop.y);
            ctx.drawImage(assetLoader.imgs.backdrop, this.backdrop.x + canvas.width, this.backdrop.y);

            ctx.drawImage(assetLoader.imgs.backdrop2, this.backdrop2.x, this.backdrop2.y);
            ctx.drawImage(assetLoader.imgs.backdrop2, this.backdrop2.x + canvas.width, this.backdrop2.y);

            // If the image scrolled off the screen, reset
            if (this.sky.x + assetLoader.imgs.sky.width <= 0)
                this.sky.x = 0;
            if (this.backdrop.x + assetLoader.imgs.backdrop.width <= 0)
                this.backdrop.x = 0;
            if (this.backdrop2.x + assetLoader.imgs.backdrop2.width <= 0)
                this.backdrop2.x = 0;
        };

        return {
            sky: this.sky,
            backdrop: this.backdrop,
            backdrop2: this.backdrop2,
            draw: this.draw
        };


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

    function spawnEnvironmentSprites() {

    }

    function animate() {
        if (!stop) {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            background.draw();

            ticker++;
        }

    }
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();



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
        //        player = new Player();
        ticker = 0;
        stop = false;
        score = 0;
        platformHeight = 3;
        platformLength = 23;
        gapLength = 0;



        animate();

        assetLoader.sounds.gameOver.pause();
        assetLoader.sounds.bg.currentTime = 0;
        assetLoader.sounds.bg.play();
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
