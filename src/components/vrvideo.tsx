'use client';
import React, { useEffect, useState } from 'react';
import 'aframe';
import 'aframe-extras';
import image from '../../public/image/IMG20240528083728.jpg';
import image1 from '../../public/image/IMG20240528083852.jpg';
import image2 from '../../public/image/IMG20240528083954.jpg';
import image3 from '../../public/image/IMG20240528084129.jpg';
import image4 from '../../public/image/IMG20240528084349.jpg';
import image5 from '../../public/image/IMG20240528084439.jpg';
import image6 from '../../public/image/IMG20240528084528.jpg';
import image7 from '../../public/image/IMG20240528084827.jpg';
import image8 from '../../public/image/IMG20240528084907.jpg';
import image9 from '../../public/image/IMG20240528085147.jpg';
import image10 from '../../public/image/IMG20240528085214.jpg';
import image11 from '../../public/image/IMG20240528085328.jpg';
import image12 from '../../public/image/IMG20240528085558.jpg';
import image13 from '../../public/image/IMG20240528085654.jpg';
import image14 from '../../public/image/IMG20240528085735.jpg';
import image15 from '../../public/image/IMG20240528085820.jpg';
import image16 from '../../public/image/IMG20240528085944.jpg';
import image17 from '../../public/image/IMG20240528090018.jpg';
import image18 from '../../public/image/IMG20240528090018.jpg';
import image19 from '../../public/image/IMG20240528090306.jpg';
import image20 from '../../public/image/IMG20240528090409.jpg';
import image21 from '../../public/image/IMG20240528090439.jpg';
import image22 from '../../public/image/IMG20240528090516.jpg';
import image23 from '../../public/image/IMG20240528090557.jpg';
import image24 from '../../public/image/IMG20240528090700.jpg';
import image25 from '../../public/image/IMG20240528090750.jpg';
const scenes = [
  { id: 'greenery', image: image.src, description: 'Greenery Area', hotspots: [{ position: '-2 1 -3', target: 'hall' },{ position: '-7 1 -2', target: 'office' }] },
  { id: 'hall', image: image1.src, description: 'Hall', hotspots: [{ position: '-2 1 -3', target: 'environment' }] },
  { id: 'floor', image: image2.src, description: 'Floor', hotspots: [{ position: '0 1 -3', target: 'environment' }] },
  { id: 'office', image: image3.src, description: 'Office', hotspots: [{ position: '-2 1 -3', target: 'environment' }] },
  { id: 'environment', image: image4.src, description: 'Whole Environment', hotspots: [{ position: '2 1 -3', target: 'i5' }] },
  { id: 'i5', image: image5.src, description: 'Greenery Area', hotspots: [{ position: '-2 1 -3', target: 'i6' }] },
  { id: 'i6', image: image6.src, description: 'Hall', hotspots: [{ position: '-2 1 -3', target: 'i7' }] },
  { id: 'i7', image: image7.src, description: 'Floor', hotspots: [{ position: '0 1 -3', target: 'i8' }] },
  { id: 'i8', image: image8.src, description: 'Office', hotspots: [{ position: '1 1 -3', target: 'i9' }] },
  { id: 'i9', image: image9.src, description: 'Whole Environment', hotspots: [{ position: '2 1 -3', target: 'i10' }] },
  { id: 'i10', image: image10.src, description: 'Greenery Area', hotspots: [{ position: '-2 1 -3', target: 'i11' }] },
  { id: 'i11', image: image11.src, description: 'Hall', hotspots: [{ position: '-2 1 -3', target: 'i12' }] },
  { id: 'i12', image: image12.src, description: 'Floor', hotspots: [{ position: '0 1 -3', target: 'i13' }] },
  { id: 'i13', image: image13.src, description: 'Office', hotspots: [{ position: '1 1 -3', target: 'i14' }] },
  { id: 'i14', image: image14.src, description: 'Whole Environment', hotspots: [{ position: '2 1 -3', target: 'i15' }] },
  { id: 'i15', image: image15.src, description: 'Greenery Area', hotspots: [{ position: '-2 1 -3', target: 'i16' }] },
  { id: 'i16', image: image16.src, description: 'Hall', hotspots: [{ position: '-2 1 -3', target: 'i17' }] },
  { id: 'i17', image: image17.src, description: 'Floor', hotspots: [{ position: '0 1 -3', target: 'i18' }] },
  { id: 'i18', image: image18.src, description: 'Office', hotspots: [{ position: '1 1 -3', target: 'i19' }] },
  { id: 'i19', image: image19.src, description: 'Whole Environment', hotspots: [{ position: '2 1 -3', target: 'i10' }] },
];

const VRBuildingScene: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(scenes[0]);

  useEffect(() => {
    require('aframe');
  }, []);

  useEffect(() => {
    const scene = document.querySelector('a-scene');
    if (scene) {
      const sky = scene.querySelector('a-sky');
      if (sky) {
        sky.setAttribute('animation__fadeout', 'property: material.opacity; to: 0; dur: 500');
        setTimeout(() => {
          const skyEl = sky as any; // Type assertion
          const mesh = skyEl.getObject3D('mesh');
          if (mesh && mesh.material && mesh.material.map!==undefined) {
            const texture = mesh.material.map;
            if (texture && !texture.isDisposed) {
              texture.dispose();
            }
          }

          sky.setAttribute('src', currentScene.image);
          sky.setAttribute('animation__fadein', 'property: material.opacity; to: 1; dur: 500');
        }, 500);
      }
    }
  }, [currentScene]);

  const changeScene = (targetId: string) => {
    const targetScene = scenes.find(scene => scene.id === targetId);
    if (targetScene) {
      setCurrentScene(targetScene);
    }
  };

  return (
    <a-scene>
      <a-assets>
        {scenes.map((scene) => (
          <img key={scene.id} id={scene.id} src={scene.image} alt={scene.description} />
        ))}
      </a-assets>

      <a-sky src={currentScene.image} rotation="0 -130 0" material="opacity: 1"></a-sky>
      <a-entity id="rig" position="0 1.6 0">
        <a-entity camera look-controls wasd-controls="acceleration: 900">
          <a-entity cursor="fuse: true; fuseTimeout: 500"
                    position="0 0 -1"
                    geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                    material="color: black; shader: flat">
          </a-entity>
        </a-entity>
      </a-entity>

      {/* Add Hotspots */}
      {currentScene.hotspots.map((hotspot, index) => (
        <a-entity key={index}
                  geometry="primitive: circle; radius: 0.1"
                  material="color: white; opacity: 0.4; shader: flat"
                  position={hotspot.position}
                  text={`value: ; align: center; width: 3; color: black; anchor: center`}
                  event-set__mouseenter="scale: 1.2 1.2 1.2"
                  event-set__mouseleave="scale: 1 1 1"
                  animation__mouseenter="property: scale; to: 1.2 1.2 1.2; dur: 200"
                  animation__mouseleave="property: scale; to: 1 1 1; dur: 200"
                  onClick={() => changeScene(hotspot.target)}
                  class="clickable">
        </a-entity>
      ))}
    </a-scene>
  );
};

export default VRBuildingScene;
