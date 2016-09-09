(function ($) { // iief = Immediately-Invoked Function Expression, mainly useful to limit scope
    $(function() { // Shorthand for $( document ).ready()

        // set some camera attributes
        var VIEW_ANGLE = 45,
            ASPECT = window.innerWidth/window.innerHeight,
            NEAR = 0.1,
            FAR = 1000;

        var scene = new THREE.Scene();


        var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        camera.position.set(0, 0, 15);

        var vertShader = document.getElementById('vertexshader').innerHTML;
        var fragShader = document.getElementById('fragmentshader').innerHTML;

        var uniforms = {
            texture1: { type: 't', value: 0, texture: THREE.ImageUtils.loadTexture( 'img/color.jpeg' ) }
        };

        // create the final material
        var shaderMaterial = new THREE.ShaderMaterial({
            uniforms:       uniforms,
            vertexShader:   vertShader,
            fragmentShader: fragShader
        });

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild(renderer.domElement);

        var plane = {
            width: 5,
            height: 5,
            widthSegments: 10,
            heightSegments: 15
        }

        var geometry = new THREE.PlaneBufferGeometry(plane.width, plane.height, plane.widthSegments, plane.heightSegments)

        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var plane = new THREE.Mesh( geometry, material );
        scene.add(plane);

        plane.rotation.y += 15;

        var render = function () {
            requestAnimationFrame(render);

            plane.rotation.x += 0.1;

            renderer.render(scene, camera);
        };

        render();

    });
}(jQuery));

