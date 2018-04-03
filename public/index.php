<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<link rel="stylesheet" href="css/style.min.css">
</head>
<body>

<h1 class="bbb__title">タイトル!</h1>

<section>
	<h2>Gulp開始コマンド</h2>
	vscode上で <code>Ctrl+R</code> 後、<code>Shift+R</code> 。そして <code>dev</code> を実行。（<code>yarn dev</code> でも可）
	<h2>仕様</h2>
	<ul class="aaa__list">
		<li>SASS→CSS自動コンパイル（src/scss/* → public/css/*）</li>
		<li class="aaa__list--active">CSSはBEM推奨</li>
		<li>画像は自動で圧縮（src/images/* → public/images/*）</li>
		<li>JSはbabel[env]にて自動変換後、 <code>bundle.js</code> にバンドル。（src/js/* → public/js/bundle.js）</li>
		<li>ServerSyncが起動するが、<code>localhost:80</code> へのプロクシなので、先に <code>genie up</code> しておくこと。</li>
		<li>htmlやphpの変更は検出していないので手動でブラウザリロードすること。</li>
	</ul>
	<div class="aaa__pictures">
		<img src="images/fruits.jpg" width="200">
		<img src="images/grape.jpg" width="200">
		<img src="images/strawberry.jpg" width="200">
	</div>
</section>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="js/bundle.min.js"></script>

</body>
</html>
