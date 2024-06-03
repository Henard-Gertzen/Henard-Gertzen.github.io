import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Bird from '../models/Bird';
import Sky from '../models/Sky';
import Plane from '../models/Plane';
import HomeInfo from '../components/HomeInfo';

function Home() {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -20];
    let rotation = [0.1, 2, 0];

    if(window.innerWidth < 768) {
        screenScale = [0.9, 0.9, 0.9];
      } else {
        screenScale = [1, 1, 1];
      }

      return [screenScale, screenPosition, rotation];
  }
  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  const adjustPlaneSize = () => {
    let rotation = [0, 4.5, 5.8];
    let screenScale = null;
    let screenPosition = null;

    if(window.innerWidth < 768) {
      screenScale = [0.0003, 0.0003, 0.0003];
      screenPosition=[-1.2, 0, 0];
      } else {
        screenScale = [0.0006, 0.0006, 0.0006];
        screenPosition=[-2, 1, -4];
      }

    return [screenScale, screenPosition, rotation];
  }
  const [planeScale, planePosition, planeRotation] = adjustPlaneSize();


  return (
    <section className="w-full h-screen relative">
      <div className="absolute bottom-12 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>
      <Canvas 
      className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
      camera={{ near: 0.1, far: 1000}}>
        <Suspense fallback = { <Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2}/>
          <ambientLight intensity={0.5}/>
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>
          
          <Bird />
          <Sky isRotating={isRotating}
               position = {[-5, 2, 1]}/>
          <Island 
            position = {islandPosition}
            scale = {islandScale}
            rotation = {islandRotation}
            isRotating = {isRotating}
            setIsRotating = {setIsRotating}
            setCurrentStage = {setCurrentStage}
          />
          <Plane 
            isRotating = {isRotating}
            position = {planePosition}
            scale = {planeScale}
            rotation = {planeRotation}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home