/*
	main.js
*/

window.onload = function(){

	//	FadeIn
	$('#container').addClass('open');

	//	three.jsで必要な要素を生成
	var _prop = {
		backgroundColor:0xFFFFFF,
		ambientLightColor:0x666666,
		directionalLightColor:0xFFFFFF
	};
	var _world;
	var _camera;
	var _cameraRotate = 0;
	var _pig;
	var _grid;

	//	簡易シーン管理
	var _sceneCount = 0;
	var _contentsList = [
		{	scene: scene000, position: new THREE.Vector3( -300, 0, -300 ), description: 'Linear: 直線運動', instance: null },
		{	scene: scene00, position: new THREE.Vector3( -300, 0, 0 ), description: 'Circle: 円運動', instance: null },
		{	scene: scene01, position: new THREE.Vector3( 0, 0, 0 ), description: 'Easing: 徐々に近づく', instance: null },
		{	scene: scene02, position: new THREE.Vector3( 400, 0, 0 ), description: 'Easing: 徐々に近づく(目標が動いても追従)', instance: null },
		{	scene: scene03, position: new THREE.Vector3( 0, 0, -200 ), description: 'Easing: 加速度を持って移動', instance: null },
		{	scene: scene04, position: new THREE.Vector3( 400, 0, -200 ), description: 'Easing: 加速度を持って移動', instance: null },
		{	scene: scene05, position: new THREE.Vector3( 0, 0, -400 ), description: 'Bézier Curve: ペジェ曲線に沿って動く', instance: null },
		{	scene: scene06, position: new THREE.Vector3( 400, 0, -400 ), description: 'Bézier Curve: ペジェ曲線に沿って動く', instance: null },
		{	scene: scene07, position: new THREE.Vector3( 0, 0, -600 ), description: 'ナラベル1', instance: null },
		{	scene: scene08, position: new THREE.Vector3( 400, 0, -600 ), description: 'ナラベル2', instance: null },
	];

	execute();

	function execute()
	{
		var _viewScale = 15.0;
		var loader = new THREE.JSONLoader();
		loader.load(
			'pig.json',
			function( geometry, materials ){
				//	success
				var _material = new THREE.MeshPhongMaterial({
					flatShading: true,
					vertexColors: THREE.VertexColors
				});
				_pig = new THREE.Mesh( geometry, _material );
				_pig.geometry.computeBoundingBox();
				_pig.geometry.computeBoundingSphere();
				var _scale = _viewScale / _pig.geometry.boundingSphere.radius * 0.75;
				_pig.scale.set( _scale, _scale, _scale );

				initWebGL();
			},
			function( e ){
				//	progress
			},
			function( e ){
				//	err
			}
		);
	}

	function initWebGL()
	{
		_world = new world('webglView', _prop);
		_camera = new THREE.Object3D();
		_world.scene.add( _camera );
		_camera.add( _world.camera );

		_grid = generateGrid();
		_world.add( _grid );

		generateScenes();
		addEvents();

		//	initial position
		var _pos = _contentsList[0].position;
		_camera.position.set( _pos.x, _pos.y, _pos.z );
		_camera.rotation.y = _cameraRotate;

		//	pigs
		for( var i = 0; i < 50; i++ ){
			var _p = _pig.clone();
			_p.position.x = ( Math.random() - 0.5 ) * 6400;
			_p.position.z = ( Math.random() - 0.5 ) * 6400;
			_p.rotation.y = Math.random() * Math.PI * 2.0;
			_world.add( _p );
		}
	}

	function generateScenes()
	{
		var _texture = new THREE.TextureLoader().load(
			'shared/img/txt_scene.png',
			function(){
				//	generate scene
				for( var i = 0; i < _contentsList.length; i++ ){
					var _sceneClass = _contentsList[i].scene;
					var _initPosition = _contentsList[i].position;
						_initPosition.add( new THREE.Vector3( ( Math.random() - 0.5 ) * 3200, 0, ( Math.random() - 0.5 ) * 3200 ) );

						_initPosition.x = Math.round( _initPosition.x / 100 ) * 100;
						_initPosition.z = Math.round( _initPosition.z / 100 ) * 100;
					var _scene = new _sceneClass( _world, _initPosition );
					if( i != 0 )
					{
						_scene.changeFlag( false );
					}
					_contentsList[i].instance = _scene;

					//	Scene Flag
					var _geo = new THREE.PlaneGeometry( 100, 10, 1, 1);
					var _mat = new THREE.MeshBasicMaterial({
						map: _texture,
						side: THREE.DoubleSide,
						transparent: true
					});
					var _f = new THREE.Mesh( _geo, _mat );
					_world.add( _f );
					_f.position.x = _initPosition.x;
					_f.position.z = _initPosition.z;
					_f.position.y = 60;

					//	sprite
					_geo.faceVertexUvs[0][0][0].x = 0;
					_geo.faceVertexUvs[0][0][0].y = 1.0 - i * 0.1;
					_geo.faceVertexUvs[0][0][1].x = 0;
					_geo.faceVertexUvs[0][0][1].y = 1.0 - i * 0.1 - 0.1;
					_geo.faceVertexUvs[0][0][2].x = 1;
					_geo.faceVertexUvs[0][0][2].y = 1.0 - i * 0.1;

					_geo.faceVertexUvs[0][1][0].x = 0;
					_geo.faceVertexUvs[0][1][0].y = 1.0 - i * 0.1 - 0.1;
					_geo.faceVertexUvs[0][1][1].x = 1;
					_geo.faceVertexUvs[0][1][1].y = 1.0 - i * 0.1 - 0.1;
					_geo.faceVertexUvs[0][1][2].x = 1;
					_geo.faceVertexUvs[0][1][2].y = 1.0 - i * 0.1;


					var _li = $('<li>');
					var _a = $('<a>').attr('href','javascript:void(0);').attr('no',i).text('●');
					_li.append( _a );
					$('#navigation ul').append( _li );

					_a.on('click', function(e){
						_sceneCount = $( this ).attr('no');
						change( _sceneCount );
					})
				}

				$( $('#navigation a')[0] ).addClass('current');
				var _txt = _contentsList[0].description;
				$('#siteFoot p').text( _txt );
				loop(0.0);
			},
			undefined,
			function( err ){

			});
	}

	function addEvents()
	{
		//	スペースキーでシーン遷移	
		window.addEventListener( 'keydown', function(e){
			if( e.keyCode == 32 ){
				_sceneCount ++;
				_sceneCount = _sceneCount % _contentsList.length;
				change(_sceneCount);
			}
		});
	}

	function change(e){
		_cameraRotate += ( Math.random() - 0.5 ) * Math.PI;
		var _txt = _contentsList[_sceneCount].description;
		$('#siteFoot p').text( _txt );

		for( var i = 0; i < _contentsList.length; i++ )
		{
			var _instance = _contentsList[i].instance;
			if( i == e )
			{
				_instance.changeFlag( true );
			} else {
				_instance.changeFlag( false );
			}
		}

		//
		$('#navigation a').removeClass();
		$( $('#navigation a')[e] ).addClass('current');
	}

	function loop( _stepTime )
	{
		window.requestAnimationFrame( loop );


		//	各シーンのアップデート
		var len = _contentsList.length;
		for( var i = 0; i < len; i++ ){
			var _instance = _contentsList[i].instance;
			_instance.update( _stepTime );
		}

		//	シーンに合わせてカメラフォーカスを変える: Scene01のモーションでカメラを動かす
		var _slow = 0.05;
		var _target = _contentsList[_sceneCount].position;
		_camera.position.x += ( _target.x - _camera.position.x ) * _slow;
		_camera.position.y += ( _target.y - _camera.position.y ) * _slow;
		_camera.position.z += ( _target.z - _camera.position.z ) * _slow;
		_camera.rotation.y += ( _cameraRotate - _camera.rotation.y ) * _slow;


	}

}

