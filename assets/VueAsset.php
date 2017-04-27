<?php

namespace app\assets;

use yii\web\AssetBundle;

class VueAsset extends AssetBundle
{
    public $sourcePath = '@app/vendor/bower';

    public $css = [
    ];

    public $js = [
        'vue/dist/vue.js',
    ];

    public $depends = [
    ];
}
