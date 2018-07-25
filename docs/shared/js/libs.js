/*
	libs.js
	https://twitter.com/nulldesign/status/973980884817788933
	https://twitter.com/nulldesign/status/952570206206885889
	https://twitter.com/nulldesign/status/951073961168654336
*/

class scene000{
	constructor( _world, _center ){
		this.world = _world;
		this.container = new THREE.Object3D();
		this.center = generatePoint();
		this.pointer = generateMovePoint();
		this.velocity = new THREE.Vector3( 1, 0, 0 );

		this.container.position.set( _center.x, _center.y, _center.z );

		this.world.add( this.container );
		this.container.add( this.center );
		this.container.add( this.pointer );

		this.mixers = [];
		this.clock = new THREE.Clock();
		loadPigAnimation( this.pointer, this.mixers );
		loadFlag( this.center, new THREE.Color( 1, 0, 0 ) );

		this.label0 = generateLabel('CENTER');

		$('body').append( this.label0 );

		this.pointer.position.x = 100;
		this.pointer.position.z = 100;

	}

	update( _time ){
		var _past = this.pointer.position.clone();
		//	_pointerは_endとの位置や距離に応じて位置を変える
		this.pointer.position.add( this.velocity );

		var _pos = this.pointer.position
		if( _pos.x > 100 && _pos.z >= 0 )
		{
			_pos.x = 100;
			_pos.z = 100;
			this.velocity.x = 0;
			this.velocity.z = -1;
		} else if( _pos.x >= 0 && _pos.z < -100 ){
			_pos.x = 100;
			_pos.z = -100;
			this.velocity.x = -1;
			this.velocity.z = 0;
		} else if( _pos.x < -100 && _pos.z <= 0 ){
			_pos.x = -100;
			_pos.z = -100;
			this.velocity.x = 0;
			this.velocity.z = 1;
		} else if( _pos.x <= 0 && _pos.z > 100 ){
			_pos.x = -100;
			_pos.z = 100;
			this.velocity.x = 1;
			this.velocity.z = 0;
		}

		//	回転
		var _dx = this.pointer.position.x - _past.x;
		var _dz = this.pointer.position.z - _past.z;
		var _rad = Math.atan2( _dz, _dx );
		this.pointer.rotation.y = - _rad;

		//	update animation
		if ( this.mixers.length > 0 ) {
			for ( var i = 0; i < this.mixers.length; i ++ ) {
				this.mixers[ i ].update( this.clock.getDelta() );
			}
		}

		//	label update
		//var _opaicty = _getFogToDomEffect( this.world, this.container );
		var _pos0 = _updateLabelPosition( this.world, this.center );
		this.label0.css({
			'left': _pos0.x + 'px',
			'top': _pos0.y - 20 + 'px',
			//'opacity': _opaicty
		});

	}

	changeFlag( _bool ){
		var _flag = _bool?'block':'none';
		this.label0.css({
			'display': _flag
		});
	}
}

class scene00{
	constructor( _world, _center ){
		this.world = _world;
		this.container = new THREE.Object3D();
		this.center = generatePoint();
		this.pointer = generateMovePoint();

		this.container.position.set( _center.x, _center.y, _center.z );

		this.world.add( this.container );
		this.container.add( this.center );
		this.container.add( this.pointer );
		loadFlag( this.center, new THREE.Color( 1, 0, 0 ) );


		this.mixers = [];
		this.clock = new THREE.Clock();
		loadPigAnimation( this.pointer, this.mixers );

		this.label0 = generateLabel('CENTER');

		$('body').append( this.label0 );

	}

	update( _time ){
		var _past = this.pointer.position.clone();
		var _past = this.pointer.position.clone();
		//	_pointerは_endとの位置や距離に応じて位置を変える
		this.pointer.position.x = Math.cos( _time * 0.001 ) * 100;
		this.pointer.position.y = 0;
		this.pointer.position.z = Math.sin( _time * 0.001 ) * 100;

		var _dx = this.pointer.position.x - _past.x;
		var _dz = this.pointer.position.z - _past.z;
		var _rad = Math.atan2( _dz, _dx );
		this.pointer.rotation.y = - _rad;

		//	update animation
		if ( this.mixers.length > 0 ) {
			for ( var i = 0; i < this.mixers.length; i ++ ) {
				this.mixers[ i ].update( this.clock.getDelta() );
			}
		}

		//	label update
		//var _opaicty = _getFogToDomEffect( this.world, this.container );
		var _pos0 = _updateLabelPosition( this.world, this.center );
		this.label0.css({
			'left': _pos0.x + 'px',
			'top': _pos0.y - 20 + 'px',
			//'opacity': _opaicty
		});

	}

	changeFlag( _bool ){
		var _flag = _bool?'block':'none';
		this.label0.css({
			'display': _flag
		});
	}
}

class scene01{
	constructor( _world, _center ){
		this.world = _world;
		this.container = new THREE.Object3D();
		this.start = generatePoint();
		this.end = generatePoint();
		this.pointer = generateMovePoint();

		this.container.position.set( _center.x, _center.y, _center.z );

		this.world.add( this.container );
		this.container.add( this.start );
		this.container.add( this.end );
		this.container.add( this.pointer );
		loadFlag( this.start, new THREE.Color( 1, 0, 0 ) );
		loadFlag( this.end, new THREE.Color( 0, 0, 1 ) );

		this.mixers = [];
		this.clock = new THREE.Clock();
		loadPigAnimation( this.pointer, this.mixers );

		this.start.position.x = -100;
		this.end.position.x = 100;

		this.label0 = generateLabel('START');
		this.label1 = generateLabel('END');

		$('body').append( this.label0 );
		$('body').append( this.label1 );

	}

	update( _time ){
		var _past = this.pointer.position.clone();
		//	_pointerは_endとの位置や距離に応じて位置を変える
		this.pointer.position.x += ( this.end.position.x - this.pointer.position.x ) * 0.05;
		this.pointer.position.y += ( this.end.position.y - this.pointer.position.y ) * 0.05;
		this.pointer.position.z += ( this.end.position.z - this.pointer.position.z ) * 0.05;

		//	回転
		var _dx = this.pointer.position.x - _past.x;
		var _dz = this.pointer.position.z - _past.z;
		var _rad = Math.atan2( _dz, _dx );
		this.pointer.rotation.y = - _rad;

		//	_pointerと_endの距離が1.0より小さくなったら、_pointerの位置を_startに戻す
		var _distance = this.pointer.position.distanceTo( this.end.position );
		if( _distance < 1.0 )
		{
			this.pointer.position.x = this.start.position.x;
			this.pointer.position.y = this.start.position.y;
			this.pointer.position.z = this.start.position.z;
		}

		//	update animation
		if ( this.mixers.length > 0 ) {
			for ( var i = 0; i < this.mixers.length; i ++ ) {
				this.mixers[ i ].update( this.clock.getDelta() );
			}
		}

		//var _opaicty = _getFogToDomEffect( this.world, this.container );
		var _pos0 = _updateLabelPosition( this.world, this.start );
		this.label0.css({
			'left': _pos0.x + 'px',
			'top': _pos0.y - 20 + 'px',
			//'opacity': _opaicty
		});
		var _pos1 = _updateLabelPosition( this.world, this.end );
		this.label1.css({
			'left': _pos1.x + 'px',
			'top': _pos1.y - 20 + 'px',
			//'opacity': _opaicty
		});

	}

	changeFlag( _bool ){
		var _flag = _bool?'block':'none';
		this.label0.css({
			'display': _flag
		});
		this.label1.css({
			'display': _flag
		});
	}
}

class scene02{
	constructor( _world, _center ){
		this.world = _world;
		this.container = new THREE.Object3D();
		this.start = generatePoint();
		this.end = generatePoint();
		this.pointer = generateMovePoint();

		this.container.position.set( _center.x, _center.y, _center.z );

		this.world.add( this.container );
		this.container.add( this.start );
		this.container.add( this.end );
		this.container.add( this.pointer );
		loadFlag( this.start, new THREE.Color( 1, 0, 0 ) );
		loadFlag( this.end, new THREE.Color( 0, 0, 1 ) );

		this.mixers = [];
		this.clock = new THREE.Clock();
		loadPigAnimation( this.pointer, this.mixers );

		this.start.position.x = -100;
		this.end.position.x = 100;

		this.label0 = generateLabel('START');
		this.label1 = generateLabel('END');

		$('body').append( this.label0 );
		$('body').append( this.label1 );
	}

	update( _time ){
		var _past = this.pointer.position.clone();
		this.end.position.z = Math.sin( _time * 0.001 ) * 100;

		//	_pointerは_endとの位置や距離に応じて位置を変える
		this.pointer.position.x += ( this.end.position.x - this.pointer.position.x ) * 0.05;
		this.pointer.position.y += ( this.end.position.y - this.pointer.position.y ) * 0.05;
		this.pointer.position.z += ( this.end.position.z - this.pointer.position.z ) * 0.05;

		//	回転
		var _dx = this.pointer.position.x - _past.x;
		var _dz = this.pointer.position.z - _past.z;
		var _rad = Math.atan2( _dz, _dx );
		this.pointer.rotation.y = - _rad;

		//	_pointerと_endの距離が1.0より小さくなったら、_pointerの位置を_startに戻す
		var _distance = this.pointer.position.distanceTo( this.end.position );
		if( _distance < 1.0 )
		{
			this.pointer.position.x = this.start.position.x;
			this.pointer.position.y = this.start.position.y;
			this.pointer.position.z = this.start.position.z;
		}

		//	update animation
		if ( this.mixers.length > 0 ) {
			for ( var i = 0; i < this.mixers.length; i ++ ) {
				this.mixers[ i ].update( this.clock.getDelta() );
			}
		}

		//var _opaicty = _getFogToDomEffect( this.world, this.container );
		var _pos0 = _updateLabelPosition( this.world, this.start );
		this.label0.css({
			'left': _pos0.x + 'px',
			'top': _pos0.y - 20 + 'px',
			//'opacity': _opaicty
		});
		var _pos1 = _updateLabelPosition( this.world, this.end );
		this.label1.css({
			'left': _pos1.x + 'px',
			'top': _pos1.y - 20 + 'px',
			//'opacity': _opaicty
		});

	}

	changeFlag( _bool ){
		var _flag = _bool?'block':'none';
		this.label0.css({
			'display': _flag
		});
		this.label1.css({
			'display': _flag
		});
	}
}

class scene03{
	constructor( _world, _center ){
		this.world = _world;
		this.container = new THREE.Object3D();
		this.start = generatePoint();
		this.end = generatePoint();
		this.pointer = generateMovePoint();

		this.velocity = new THREE.Vector3();

		this.container.position.set( _center.x, _center.y, _center.z );

		this.world.add( this.container );
		this.container.add( this.start );
		this.container.add( this.end );
		this.container.add( this.pointer );
		loadFlag( this.start, new THREE.Color( 1, 0, 0 ) );
		loadFlag( this.end, new THREE.Color( 0, 0, 1 ) );

		this.mixers = [];
		this.clock = new THREE.Clock();
		loadPigAnimation( this.pointer, this.mixers );

		this.start.position.x = -100;
		this.end.position.x = 100;

		this.label0 = generateLabel('START');
		this.label1 = generateLabel('END');

		$('body').append( this.label0 );
		$('body').append( this.label1 );
	}

	update( _time ){
		var _past = this.pointer.position.clone();

		let _accell = 70.0;
		let _slow = 1.07500;
		this.velocity.x = ( this.velocity.x + ( this.end.position.x - this.pointer.position.x ) / _accell ) / _slow;
		this.velocity.y = ( this.velocity.y + ( this.end.position.y - this.pointer.position.y ) / _accell ) / _slow;
		this.velocity.z = ( this.velocity.z + ( this.end.position.z - this.pointer.position.z ) / _accell ) / _slow;

		this.pointer.position.x += this.velocity.x;
		this.pointer.position.y += this.velocity.y;
		this.pointer.position.z += this.velocity.z;

		//	回転
		var _dx = this.pointer.position.x - _past.x;
		var _dz = this.pointer.position.z - _past.z;
		var _rad = Math.atan2( _dz, _dx );
		this.pointer.rotation.y = - _rad;

		let _distance = this.pointer.position.distanceTo( this.end.position );
		let _speed = this.velocity.length();
		if( _distance < 1.0 && _speed < 1.0 )
		{
			this.pointer.position.x = this.start.position.x;
			this.pointer.position.y = this.start.position.y;
			this.pointer.position.z = this.start.position.z;

			this.velocity.x = 0;
			this.velocity.y = 0;
			this.velocity.z = 0;
		}

		//	update animation
		if ( this.mixers.length > 0 ) {
			for ( var i = 0; i < this.mixers.length; i ++ ) {
				this.mixers[ i ].update( this.clock.getDelta() );
			}
		}

		//var _opaicty = _getFogToDomEffect( this.world, this.container );
		var _pos0 = _updateLabelPosition( this.world, this.start );
		this.label0.css({
			'left': _pos0.x + 'px',
			'top': _pos0.y - 20 + 'px',
			//'opacity': _opaicty
		});
		var _pos1 = _updateLabelPosition( this.world, this.end );
		this.label1.css({
			'left': _pos1.x + 'px',
			'top': _pos1.y - 20 + 'px',
			//'opacity': _opaicty
		});


	}

	changeFlag( _bool ){
		var _flag = _bool?'block':'none';
		this.label0.css({
			'display': _flag
		});
		this.label1.css({
			'display': _flag
		});
	}
}

class scene04{
	constructor( _world, _center ){
		this.world = _world;
		this.container = new THREE.Object3D();
		this.start = generatePoint();
		this.end = generatePoint();
		this.pointer = generateMovePoint();

		this.velocity = new THREE.Vector3();

		this.container.position.set( _center.x, _center.y, _center.z );

		this.world.add( this.container );
		this.container.add( this.start );
		this.container.add( this.end );
		this.container.add( this.pointer );
		loadFlag( this.start, new THREE.Color( 1, 0, 0 ) );
		loadFlag( this.end, new THREE.Color( 0, 0, 1 ) );

		this.mixers = [];
		this.clock = new THREE.Clock();
		loadPigAnimation( this.pointer, this.mixers );

		this.start.position.x = -100;
		this.end.position.x = 100;

		this.label0 = generateLabel('START');
		this.label1 = generateLabel('END');

		$('body').append( this.label0 );
		$('body').append( this.label1 );
	}

	update( _time ){
		var _past = this.pointer.position.clone();


		var _timeScale = 0.0005;
		this.end.position.z = Math.sin( _time * _timeScale * 3.0 ) * 80;
		this.start.position.z = Math.cos( _time * _timeScale * 2.0 ) * 80;

		let _accell = 70.0;
		let _slow = 1.07500;
		this.velocity.x = ( this.velocity.x + ( this.end.position.x - this.pointer.position.x ) / _accell ) / _slow;
		this.velocity.y = ( this.velocity.y + ( this.end.position.y - this.pointer.position.y ) / _accell ) / _slow;
		this.velocity.z = ( this.velocity.z + ( this.end.position.z - this.pointer.position.z ) / _accell ) / _slow;

		this.pointer.position.x += this.velocity.x;
		this.pointer.position.y += this.velocity.y;
		this.pointer.position.z += this.velocity.z;

		//	回転
		var _dx = this.pointer.position.x - _past.x;
		var _dz = this.pointer.position.z - _past.z;
		var _rad = Math.atan2( _dz, _dx );
		this.pointer.rotation.y = - _rad;

		let _distance = this.pointer.position.distanceTo( this.end.position );
		let _speed = this.velocity.length();
		if( _distance < 1.0 && _speed < 1.0 )
		{
			this.pointer.position.x = this.start.position.x;
			this.pointer.position.y = this.start.position.y;
			this.pointer.position.z = this.start.position.z;

			this.velocity.x = 0;
			this.velocity.y = 0;
			this.velocity.z = 0;
		}

		//	update animation
		if ( this.mixers.length > 0 ) {
			for ( var i = 0; i < this.mixers.length; i ++ ) {
				this.mixers[ i ].update( this.clock.getDelta() );
			}
		}

		//var _opaicty = _getFogToDomEffect( this.world, this.container );
		var _pos0 = _updateLabelPosition( this.world, this.start );
		this.label0.css({
			'left': _pos0.x + 'px',
			'top': _pos0.y - 20 + 'px',
			//'opacity': _opaicty
		});
		var _pos1 = _updateLabelPosition( this.world, this.end );
		this.label1.css({
			'left': _pos1.x + 'px',
			'top': _pos1.y - 20 + 'px',
			//'opacity': _opaicty
		});

	}

	changeFlag( _bool ){
		var _flag = _bool?'block':'none';
		this.label0.css({
			'display': _flag
		});
		this.label1.css({
			'display': _flag
		});
	}
}

class scene05{
	constructor( _world, _center ){
		this.world = _world;
		this.container = new THREE.Object3D();
		this.start = generatePoint();
		this.end = generatePoint();
		this.pointer = generateMovePoint();

		this.container.position.set( _center.x, _center.y, _center.z );

		this.world.add( this.container );
		this.container.add( this.start );
		this.container.add( this.end );
		this.container.add( this.pointer );
		loadFlag( this.start, new THREE.Color( 1, 0, 0 ) );
		loadFlag( this.end, new THREE.Color( 0, 0, 1 ) );

		this.mixers = [];
		this.clock = new THREE.Clock();
		loadPigAnimation( this.pointer, this.mixers );

		this.start.position.x = -100;
		this.end.position.x = 100;

		this.label0 = generateLabel('START');
		this.label1 = generateLabel('END');

		$('body').append( this.label0 );
		$('body').append( this.label1 );


		var _pointlist = [];
		_pointlist[0] = this.start.position;
		_pointlist[1] = new THREE.Vector3( -30, 0, -100 );
		_pointlist[2] = new THREE.Vector3( 30, 0, 100 );
		_pointlist[3] = this.end.position;

		var _points = SplineCurve3D( _pointlist, 60 );
		this.line = generateLine( _points );
		this.container.add( this.line );

	}

	update( _time ){
		var _past = this.pointer.position.clone();

		var _index = ~~( ( Math.sin( _time * 0.001 ) * 0.5 + 0.5) * this.line.geometry.vertices.length );
		var _pos = this.line.geometry.vertices[ _index ];
		this.pointer.position.x = _pos.x;
		this.pointer.position.y = _pos.y;
		this.pointer.position.z = _pos.z;

		//	回転
		var _dx = this.pointer.position.x - _past.x;
		var _dz = this.pointer.position.z - _past.z;
		var _rad = Math.atan2( _dz, _dx );
		this.pointer.rotation.y = - _rad;

		//	update animation
		if ( this.mixers.length > 0 ) {
			for ( var i = 0; i < this.mixers.length; i ++ ) {
				this.mixers[ i ].update( this.clock.getDelta() );
			}
		}

		//var _opaicty = _getFogToDomEffect( this.world, this.container );
		var _pos0 = _updateLabelPosition( this.world, this.start );
		this.label0.css({
			'left': _pos0.x + 'px',
			'top': _pos0.y - 20 + 'px',
			//'opacity': _opaicty
		});
		var _pos1 = _updateLabelPosition( this.world, this.end );
		this.label1.css({
			'left': _pos1.x + 'px',
			'top': _pos1.y - 20 + 'px',
			//'opacity': _opaicty
		});

	}

	changeFlag( _bool ){
		var _flag = _bool?'block':'none';
		this.label0.css({
			'display': _flag
		});
		this.label1.css({
			'display': _flag
		});
	}
}

class scene06{
	constructor( _world, _center ){
		this.world = _world;
		this.container = new THREE.Object3D();
		this.start = generatePoint();
		this.end = generatePoint();
		this.pointer = generateMovePoint();

		this.container.position.set( _center.x, _center.y, _center.z );

		this.world.add( this.container );
		this.container.add( this.start );
		this.container.add( this.end );
		this.container.add( this.pointer );
		loadFlag( this.start, new THREE.Color( 1, 0, 0 ) );
		loadFlag( this.end, new THREE.Color( 0, 0, 1 ) );

		this.mixers = [];
		this.clock = new THREE.Clock();
		loadPigAnimation( this.pointer, this.mixers );

		this.start.position.x = -100;
		this.end.position.x = 100;

		this.label0 = generateLabel('START');
		this.label1 = generateLabel('END');

		$('body').append( this.label0 );
		$('body').append( this.label1 );


		var _pointlist = [];
		_pointlist[0] = this.start.position;
		_pointlist[1] = new THREE.Vector3( -30, 0, -100 );
		_pointlist[2] = new THREE.Vector3( 30, 0, 100 );
		_pointlist[3] = this.end.position;

		var _points = SplineCurve3D( _pointlist, 60 );
		this.line = generateLine( _points );
		this.container.add( this.line );

	}

	update( _time ){
		var _past = this.pointer.position.clone();

		var _pointlist = [];
		_pointlist[0] = new THREE.Vector3( -100, 0, 0 );
		_pointlist[1] = new THREE.Vector3( -30, 0, -100 );
		_pointlist[2] = new THREE.Vector3( 30, 0, 100 );
		_pointlist[3] = new THREE.Vector3( 100, 0, 0 );

		var len = _pointlist.length;
		for( var i = 0; i < len; i++ ){
			var _x0 = Math.cos( _time * 0.001 + i / len * Math.PI * 2.0 ) * 25;
			var _z0 = Math.sin( _time * 0.001 + i / len * Math.PI * 2.0 ) * 25;
			_pointlist[i].add( new THREE.Vector3( _x0, 0, _z0 ) );
		}

		var _points = SplineCurve3D( _pointlist, 60 );
		this.line.geometry.vertices = _points;
		this.line.geometry.verticesNeedUpdate = true;

		this.start.position.set( _pointlist[0].x, _pointlist[0].y, _pointlist[0].z );
		this.end.position.set( _pointlist[len-1].x, _pointlist[len-1].y, _pointlist[len-1].z );

		var _index = ~~( ( Math.sin( _time * 0.001 ) * 0.5 + 0.5) * this.line.geometry.vertices.length );
		var _pos = this.line.geometry.vertices[ _index ];
		this.pointer.position.x = _pos.x;
		this.pointer.position.y = _pos.y;
		this.pointer.position.z = _pos.z;

		//	回転
		var _dx = this.pointer.position.x - _past.x;
		var _dz = this.pointer.position.z - _past.z;
		var _rad = Math.atan2( _dz, _dx );
		this.pointer.rotation.y = - _rad;

		//	update animation
		if ( this.mixers.length > 0 ) {
			for ( var i = 0; i < this.mixers.length; i ++ ) {
				this.mixers[ i ].update( this.clock.getDelta() );
			}
		}

		//var _opaicty = _getFogToDomEffect( this.world, this.container );
		var _pos0 = _updateLabelPosition( this.world, this.start );
		this.label0.css({
			'left': _pos0.x + 'px',
			'top': _pos0.y - 20 + 'px',
			//'opacity': _opaicty
		});
		var _pos1 = _updateLabelPosition( this.world, this.end );
		this.label1.css({
			'left': _pos1.x + 'px',
			'top': _pos1.y - 20 + 'px',
			//'opacity': _opaicty
		});

	}

	changeFlag( _bool ){
		var _flag = _bool?'block':'none';
		this.label0.css({
			'display': _flag
		});
		this.label1.css({
			'display': _flag
		});
	}
}

class scene07{
	constructor( _world, _center ){
		this.world = _world;
		this.container = new THREE.Object3D();
		this.start = generatePoint();
		this.end = generatePoint();
		this.pointer = generateMovePoint();

		this.container.position.set( _center.x, _center.y, _center.z );

		this.world.add( this.container );
		this.container.add( this.start );
		this.container.add( this.end );
		this.container.add( this.pointer );
		loadFlag( this.start, new THREE.Color( 1, 0, 0 ) );
		loadFlag( this.end, new THREE.Color( 0, 0, 1 ) );

		this.pigs = [];
		this.circleA = [];
		this.circleB = [];
		this.clock = new THREE.Clock();


		var _nums = 16;
		var _t = this;
		function __load(){
			_nums --;
			if( _nums >= 0 )
			{
				var _loader = new THREE.FBXLoader();
				_loader.load(
					'pig_anime.fbx',
					function( object ){

						object.mixer = new THREE.AnimationMixer( object );

						var action = object.mixer.clipAction( object.animations[ 0 ] );
						action.play();

						object.name = 'DynamicPig';

						_t.container.add( object );
						object.rotation.y = Math.PI * 0.5;
						object.scale.set(0.1,0.1,0.1);

						var _data = {
							mesh: object,
							delta: Math.random() * 0.025
						}

						_t.pigs.push( _data );

						if( Math.random() < 0.5 ){
							_t.circleA.push( _data );
						} else {
							_t.circleB.push( _data );
						}

						setTimeout( function(){
							__load();
						}, 100);

					},
					function(e){},
					function(err){}
				);
			}
		}
		__load();

		this.start.position.x = -100;
		this.end.position.x = 100;

		this.label0 = generateLabel('CircleA');
		this.label1 = generateLabel('CircleB');

		$('body').append( this.label0 );
		$('body').append( this.label1 );

		var _t;
		var _exchangeCircleKey;
		function exchangeCircle(){
			var lenA = _t.circleA.length;
			var lenB = _t.circleB.length;


			if( Math.random() < 0.5 )
			{
				if( lenA > 5 )
				{
					_change( _t.circleA, _t.circleB );
				} else {
					_change( _t.circleB, _t.circleA );
				}
			} else {
				if( lenB > 5 )
				{
					_change( _t.circleB, _t.circleA );
				} else {
					_change( _t.circleA, _t.circleB );
				}
			}

			var _duration = Math.random() * 4.0 + 2.0;
			_exchangeCircleKey = setTimeout( exchangeCircle, _duration * 1000 );
		}

		function _change( _la, _lb )
		{
			var _num = ~~( Math.random() * 3 ) + 1;
			for( var i = 0; i < _num; i++ ){
				var lenA = _la.length;
				var lenB = _lb.length;
				var _noA = Math.floor( Math.random() * lenA );
				var _data = _la.splice( _noA, 1 );
				var _noB = Math.floor( Math.random() * lenB );
				_lb.splice( _noB, 0, _data[0]);
			}

		}

		setTimeout( exchangeCircle,10 * 1000 );

	}

	update( _time ){

		var _deltaTime = this.clock.getDelta();
		var _speed = 0.0005;

		var len = this.circleA.length;
		var L = len * 40;
		var _R = L / ( Math.PI * 2 );
		_R = _R < 50?50:_R;

		for( var i = 0; i < len; i++ ){
			var _rad = i / len * Math.PI * 2.0 + _time * _speed;
			var _x = Math.cos( _rad ) * _R;
			var _z = Math.sin( _rad ) * _R;
			_x -= 100;

			var _past = this.circleA[i].mesh.position.clone();
			this.circleA[i].mesh.position.x += ( _x - this.circleA[i].mesh.position.x ) * 0.014;
			this.circleA[i].mesh.position.z += ( _z - this.circleA[i].mesh.position.z ) * 0.014;


			//	回転
			var _dx = this.circleA[i].mesh.position.x - _past.x;
			var _dz = this.circleA[i].mesh.position.z - _past.z;
			var _rad = Math.atan2( _dz, _dx ) - Math.PI * 0.5;
			this.circleA[i].mesh.rotation.y = - _rad;

			var _delta = this.circleA[i].delta;
			this.circleA[i].mesh.mixer.update( _deltaTime + _delta );
		}

		var len = this.circleB.length;
		var L = len * 40;
		var _R = L / ( Math.PI * 2 );
		_R = _R < 50?50:_R;

		for( var i = 0; i < len; i++ ){
			var _rad = i / len * Math.PI * 2.0 + _time * _speed;
			var _x = Math.cos( _rad ) * _R;
			var _z = Math.sin( _rad ) * _R;
			_x += 100;

			var _past = this.circleB[i].mesh.position.clone();
			this.circleB[i].mesh.position.x += ( _x - this.circleB[i].mesh.position.x ) * 0.014;
			this.circleB[i].mesh.position.z += ( _z - this.circleB[i].mesh.position.z ) * 0.014;

			//	回転
			var _dx = this.circleB[i].mesh.position.x - _past.x;
			var _dz = this.circleB[i].mesh.position.z - _past.z;
			var _rad = Math.atan2( _dz, _dx ) - Math.PI * 0.5;
			this.circleB[i].mesh.rotation.y = - _rad;

			var _delta = this.circleB[i].delta;
			this.circleB[i].mesh.mixer.update( _deltaTime + _delta );
		}

		//var _opaicty = _getFogToDomEffect( this.world, this.container );
		var _pos0 = _updateLabelPosition( this.world, this.start );
		this.label0.css({
			'left': _pos0.x + 'px',
			'top': _pos0.y - 20 + 'px',
			//'opacity': _opaicty
		});
		var _pos1 = _updateLabelPosition( this.world, this.end );
		this.label1.css({
			'left': _pos1.x + 'px',
			'top': _pos1.y - 20 + 'px',
			//'opacity': _opaicty
		});

	}

	changeFlag( _bool ){
		var _flag = _bool?'block':'none';
		this.label0.css({
			'display': _flag
		});
		this.label1.css({
			'display': _flag
		});
	}
}

class scene08{
	constructor( _world, _center ){
		this.world = _world;
		this.container = new THREE.Object3D();
		this.start = generatePoint();
		this.end = generatePoint();
		this.pointer = generateMovePoint();

		this.container.position.set( _center.x, _center.y, _center.z );

		this.world.add( this.container );
		this.container.add( this.start );
		this.container.add( this.end );
		this.container.add( this.pointer );
		loadFlag( this.start, new THREE.Color( 1, 0, 0 ) );
		loadFlag( this.end, new THREE.Color( 0, 0, 1 ) );

		this.pigs = [];
		this.circleA = [];
		this.circleB = [];
		this.clock = new THREE.Clock();


		var _nums = 16;
		var _t = this;
		function __load(){
			_nums --;
			if( _nums >= 0 )
			{
				var _loader = new THREE.FBXLoader();
				_loader.load(
					'pig_anime.fbx',
					function( object ){

						object.mixer = new THREE.AnimationMixer( object );

						var action = object.mixer.clipAction( object.animations[ 0 ] );
						action.play();

						object.name = 'DynamicPig';

						_t.container.add( object );
						object.rotation.y = Math.PI * 0.5;
						object.scale.set(0.1,0.1,0.1);

						var _data = {
							mesh: object,
							velocity: new THREE.Vector3(),
							delta: Math.random() * 0.025
						}

						_t.pigs.push( _data );

						if( Math.random() < 0.5 ){
							_t.circleA.push( _data );
						} else {
							_t.circleB.push( _data );
						}

						setTimeout( function(){
							__load();
						}, 100);

					},
					function(e){},
					function(err){}
				);
			}
		}
		__load();

		this.start.position.x = -100;
		this.end.position.x = 100;

		this.label0 = generateLabel('CircleA');
		this.label1 = generateLabel('CircleB');

		$('body').append( this.label0 );
		$('body').append( this.label1 );

		var _t;
		var _exchangeCircleKey;
		function exchangeCircle(){
			var lenA = _t.circleA.length;
			var lenB = _t.circleB.length;


			if( Math.random() < 0.5 )
			{
				if( lenA > 5 )
				{
					_change( _t.circleA, _t.circleB );
				} else {
					_change( _t.circleB, _t.circleA );
				}
			} else {
				if( lenB > 5 )
				{
					_change( _t.circleB, _t.circleA );
				} else {
					_change( _t.circleA, _t.circleB );
				}
			}

			var _duration = Math.random() * 4.0 + 2.0;
			_exchangeCircleKey = setTimeout( exchangeCircle, _duration * 1000 );
		}

		function _change( _la, _lb )
		{
			var _num = ~~( Math.random() * 3 ) + 1;
			for( var i = 0; i < _num; i++ ){
				var lenA = _la.length;
				var lenB = _lb.length;
				var _noA = Math.floor( Math.random() * lenA );
				var _data = _la.splice( _noA, 1 );
				var _noB = Math.floor( Math.random() * lenB );
				_lb.splice( _noB, 0, _data[0]);
			}

		}

		setTimeout( exchangeCircle,10 * 1000 );

	}

	update( _time ){

		var _deltaTime = this.clock.getDelta();
		var _speed = 0.0005;
		var _accell = 200;
		var _slow = 1.08500

		var len = this.circleA.length;
		var L = len * 40;
		var _R = L / ( Math.PI * 2 );
		_R = _R < 50?50:_R;

		for( var i = 0; i < len; i++ ){
			var _rad = i / len * Math.PI * 2.0 + _time * _speed;
			var _x = Math.cos( _rad ) * _R;
			var _z = Math.sin( _rad ) * _R;
			_x -= 100;

			var _past = this.circleA[i].mesh.position.clone();

			this.circleA[i].velocity.x = ( this.circleA[i].velocity.x + ( _x - this.circleA[i].mesh.position.x ) / _accell ) / _slow;
			this.circleA[i].velocity.z = ( this.circleA[i].velocity.z + ( _z - this.circleA[i].mesh.position.z ) / _accell ) / _slow;
			this.circleA[i].mesh.position.x += this.circleA[i].velocity.x;
			this.circleA[i].mesh.position.z += this.circleA[i].velocity.z;

			//	回転
			var _dx = this.circleA[i].mesh.position.x - _past.x;
			var _dz = this.circleA[i].mesh.position.z - _past.z;
			var _rad = Math.atan2( _dz, _dx ) - Math.PI * 0.5;
			this.circleA[i].mesh.rotation.y = - _rad;

			var _delta = this.circleA[i].delta;
			this.circleA[i].mesh.mixer.update( _deltaTime + _delta );
		}

		var len = this.circleB.length;
		var L = len * 40;
		var _R = L / ( Math.PI * 2 );
		_R = _R < 50?50:_R;

		for( var i = 0; i < len; i++ ){
			var _rad = i / len * Math.PI * 2.0 + _time * _speed;
			var _x = Math.cos( _rad ) * _R;
			var _z = Math.sin( _rad ) * _R;
			_x += 100;

			var _past = this.circleB[i].mesh.position.clone();

			this.circleB[i].velocity.x = ( this.circleB[i].velocity.x + ( _x - this.circleB[i].mesh.position.x ) / _accell ) / _slow;
			this.circleB[i].velocity.z = ( this.circleB[i].velocity.z + ( _z - this.circleB[i].mesh.position.z ) / _accell ) / _slow;
			this.circleB[i].mesh.position.x += this.circleB[i].velocity.x;
			this.circleB[i].mesh.position.z += this.circleB[i].velocity.z;

			//	回転
			var _dx = this.circleB[i].mesh.position.x - _past.x;
			var _dz = this.circleB[i].mesh.position.z - _past.z;
			var _rad = Math.atan2( _dz, _dx ) - Math.PI * 0.5;
			this.circleB[i].mesh.rotation.y = - _rad;

			var _delta = this.circleB[i].delta;
			this.circleB[i].mesh.mixer.update( _deltaTime + _delta );
		}

		//var _opaicty = _getFogToDomEffect( this.world, this.container );
		var _pos0 = _updateLabelPosition( this.world, this.start );
		this.label0.css({
			'left': _pos0.x + 'px',
			'top': _pos0.y - 20 + 'px',
			//'opacity': _opaicty
		});
		var _pos1 = _updateLabelPosition( this.world, this.end );
		this.label1.css({
			'left': _pos1.x + 'px',
			'top': _pos1.y - 20 + 'px',
			//'opacity': _opaicty
		});

	}

	changeFlag( _bool ){
		var _flag = _bool?'block':'none';
		this.label0.css({
			'display': _flag
		});
		this.label1.css({
			'display': _flag
		});
	}
}



function generateGrid(){
	let _g = new THREE.GridHelper( 6400, 64 );
	_g.material.transparent = true;
	_g.material.opacity = 0.2;
	return _g;
}

function generatePoint(){
	return new THREE.Object3D();
}

function generateMovePoint(){
	return new THREE.Object3D();
}

function generateLine( e )
{
	let _g = new THREE.Geometry();
	_g.vertices = e;
	let _m = new THREE.LineBasicMaterial({
		color: 0xFF0000
	});
	return new THREE.Line( _g, _m );
}

function generateLabel( e ){
	let _label = $('<div>').addClass('label');
	_label.text( e );
	return _label;
}

function _updateLabelPosition( _world, _mesh ){
	var _pos = _world.worldToScreen( _mesh );
	return _pos;
}

function _getFogToDomEffect( _world, _targetObj ){
	var _min = _world.scene.fog.near;
	var _max = _world.scene.fog.far;
	var _camera = _world.camera.position;
	var _distance = new THREE.Vector3().subVectors( _camera, _targetObj.position ).length();
	var _opaicty = 1.0;
	_opaicty = _distance < _min ? 1.0 : _distance > _max ? 0.0 : 1.0 - ( _distance - _min ) / ( _max - _min );
	return _opaicty;
}

function loadPigAnimation( _mesh, _mixers ){
	var _loader = new THREE.FBXLoader();
	_loader.load(
		'pig_anime.fbx',
		function( object ){

			object.mixer = new THREE.AnimationMixer( object );
			_mixers.push( object.mixer );

			var action = object.mixer.clipAction( object.animations[ 0 ] );
			action.play();

			object.name = 'DynamicPig';

			_mesh.add( object );
			object.rotation.y = Math.PI * 0.5;
			object.scale.set(0.1,0.1,0.1)
		},
		function(e){},
		function(err){}
	);
}

function loadFlag( _mesh, _color ){
	var _loader = new THREE.FBXLoader();
	_loader.load(
		'flag.fbx',
		function( object ){

			object.name = 'flag';

			_mesh.add( object );
			object.rotation.y = Math.PI * 0.5;
			object.scale.set(0.1,0.1,0.1);

			object.children[0].material.color = _color;
			object.rotation.y = Math.random() * Math.PI * 2.0;
		},
		function(e){},
		function(err){}
	);
}
