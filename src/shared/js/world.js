/*
	THREE.Environment.js
*/


class world{
	constructor( _dom, _prop ){
		this.scene;
		this.camera;
		this.focus;
		this.renderer;
		this.ambient;
		this.directional;
		this.controls;

		this.init( _dom, _prop );

		var _t = this;
		window.addEventListener( 'resize', function(e){
			_t.resize();
			e.preventDefault();
		});

		this.render();
	}
	init( _dom, _prop ){

		let _backgroundColor	=	_prop.backgroundColor?_prop.backgroundColor:0x000000;
		let _ambientLight		=	_prop.ambientLightColor?_prop.ambientLightColor:0x454545;
		let _directionalLight	=	_prop.directionalLightColor?_prop.directionalLightColor:0xFFFFFF;

		let width  = window.innerWidth;
		let height = window.innerHeight;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( _backgroundColor );
		this.scene.fog = new THREE.Fog( _backgroundColor, 100, 1600 );

		this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 1600 );
		//this.camera = new THREE.OrthographicCamera( - width * 0.5, width * 0.5, height * 0.5, - height * 0.5, 0.1, 1000 );
		this.camera.position.set( 100, 200, 300 );
		this.focus = new THREE.Vector3(0,0,0);

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( width, height  );
		this.renderer.setClearColor( _backgroundColor );
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;	//	THREE.BasicShadowMap, THREE.PCFShadowMap, THREE.PCFSoftShadowMap

		document.getElementById( _dom ).appendChild(this.renderer.domElement);

		this.ambient = new THREE.AmbientLight( _ambientLight );
		this.scene.add( this.ambient );

		this.directional = new THREE.DirectionalLight( _directionalLight, 1.0);
		this.directional.position.set( 45, 35, 105 ).normalize().addScalar( 800 );
		this.scene.add( this.directional );

		this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
		this.controls.autoRotate = true;
		this.controls.autoRotateSpeed = 0.2;
		
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.15;
		this.controls.enableZoom = false;

		this.controls.enabled = true;
		this.controls.target = this.focus;

		// this.controls.minDistance = 240;
		// this.controls.maxDistance = 480;

		// this.controls.minPolarAngle = 0; // radians
		// this.controls.maxPolarAngle = Math.PI * 0.45; // radians

	}
	render(){
		let _t = this;
		window.requestAnimationFrame( function( _time ){	_t.render();	} );

		this.controls.update();
		this.camera.lookAt( this.focus );
		this.renderer.render( this.scene, this.camera );
	}
	resize( e ){
		let width  = window.innerWidth;
		let height = window.innerHeight;

		this.renderer.setSize( width, height );
		if( this.camera.aspect )
		{
			this.camera.aspect = width / height;
		} else {
			this.camera.left = - width * 0.5;
			this.camera.right = width * 0.5;
			this.camera.bottom = - height * 0.5;
			this.camera.top = height * 0.5;
		}
		this.camera.updateProjectionMatrix();

		//	update view
		this.controls.update();
		this.camera.lookAt( this.focus );
		this.renderer.render( this.scene, this.camera );
	}
	worldToScreen( _mesh ){
		let vector = new THREE.Vector3();
		let widthHalf = 0.5 * this.renderer.context.canvas.width;
		let heightHalf = 0.5 * this.renderer.context.canvas.height;

		_mesh.updateMatrixWorld();
		vector.setFromMatrixPosition(_mesh.matrixWorld);
		vector.project(this.camera);
		vector.x = ( vector.x * widthHalf ) + widthHalf;
		vector.y = - ( vector.y * heightHalf ) + heightHalf;
		
		//	前後判定
		let _dir0 = new THREE.Vector3().subVectors( this.focus, this.camera.position );
		let _dir1 = new THREE.Vector3().subVectors( _mesh.position, this.camera.position );
		let _d = _dir0.dot( _dir1 );
		if( _d <= 0 ){
			return { 
			    x: - 9999,
			    y: - 9999,
			    display: false
			};
		}

		return { 
		    x: ~~ ( vector.x / window.devicePixelRatio ),
		    y: ~~ ( vector.y / window.devicePixelRatio ),
		    display: true
		};
	}
	add(e){
		this.scene.add( e );
	}
	remove(e){
		this.scene.remove( e );
	}
}