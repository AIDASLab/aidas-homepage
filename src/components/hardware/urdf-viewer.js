'use client';

import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Bounds,
  useBounds,
  ContactShadows,
  Grid,
} from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import URDFLoader from 'urdf-loader';

const DEFAULT_CAMERA_POSITION = [0, 3.15, 2.05];

class ViewerErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}

function DefaultView({ viewKey }) {
  const { camera, controls } = useThree();

  useEffect(() => {
    camera.position.set(...DEFAULT_CAMERA_POSITION);
    camera.fov = 35;
    camera.near = 0.01;
    camera.far = 100;
    camera.updateProjectionMatrix();
    controls?.target?.set(0, 0, 0);
    controls?.update?.();
  }, [camera, controls, viewKey]);

  return null;
}

// Shared PBR material for meshes that ship no material of their own (STL/OBJ).
function fallbackMat(path = '') {
  const lower = path.toLowerCase();
  if (lower.includes('cobotmagic')) {
    if (lower.includes('tracer2_description__meshes__base_link')) {
      return new THREE.MeshPhysicalMaterial({ color: 0x202833, metalness: 0.55, roughness: 0.34, clearcoat: 0.18, envMapIntensity: 1.45 });
    }
    if (lower.includes('tracer2_description__meshes__left') || lower.includes('tracer2_description__meshes__right')) {
      return new THREE.MeshPhysicalMaterial({ color: 0x11151b, metalness: 0.5, roughness: 0.52, clearcoat: 0.08, envMapIntensity: 1.15 });
    }
    if (lower.includes('body_v2') || lower.includes('aloha_new_description__meshes__base_link')) {
      return new THREE.MeshPhysicalMaterial({ color: 0xc6d0da, metalness: 0.24, roughness: 0.32, clearcoat: 0.18, envMapIntensity: 1.05 });
    }
    if (lower.includes('camera_stand')) {
      return new THREE.MeshPhysicalMaterial({ color: 0x161b22, metalness: 0.5, roughness: 0.38, clearcoat: 0.12, envMapIntensity: 1.3 });
    }
    if (lower.includes('link6') || lower.includes('link7') || lower.includes('link8')) {
      return new THREE.MeshPhysicalMaterial({ color: lower.includes('link8') ? 0x141820 : 0xcbd5df, metalness: 0.34, roughness: 0.34, clearcoat: 0.16, envMapIntensity: 1.1 });
    }
    if (lower.includes('link1') || lower.includes('link2') || lower.includes('link3') || lower.includes('link4') || lower.includes('link5')) {
      return new THREE.MeshPhysicalMaterial({ color: 0xcdd7e1, metalness: 0.3, roughness: 0.33, clearcoat: 0.16, envMapIntensity: 1.12 });
    }
    return new THREE.MeshPhysicalMaterial({ color: 0xdfe5ec, metalness: 0.42, roughness: 0.32, clearcoat: 0.18, envMapIntensity: 1.35 });
  }
  if (lower.includes('robotiq-arg85') || lower.includes('robotiq_arg85')) {
    if (lower.includes('base_link')) {
      return new THREE.MeshStandardMaterial({ color: 0x1d2229, metalness: 0.45, roughness: 0.38, envMapIntensity: 1.35 });
    }
    if (lower.includes('finger')) {
      return new THREE.MeshStandardMaterial({ color: 0xe8ebef, metalness: 0.28, roughness: 0.32, envMapIntensity: 1.25 });
    }
    return new THREE.MeshStandardMaterial({ color: 0x111418, metalness: 0.5, roughness: 0.42, envMapIntensity: 1.25 });
  }
  if (lower.includes('trossen')) {
    if (lower.includes('tabletop')) {
      return new THREE.MeshStandardMaterial({ color: 0xc9a77f, metalness: 0.05, roughness: 0.55, envMapIntensity: 0.8 });
    }
    return new THREE.MeshStandardMaterial({ color: 0xd7dce3, metalness: 0.42, roughness: 0.4, envMapIntensity: 1.2 });
  }
  return new THREE.MeshStandardMaterial({
    color: 0xd7dbe0,
    metalness: 0.55,
    roughness: 0.42,
    envMapIntensity: 1.1,
  });
}

function tuneLoadedMesh(obj, path) {
  const lower = path.toLowerCase();
  obj.traverse((c) => {
    if (!c.isMesh) return;
    c.castShadow = true;
    c.receiveShadow = true;

    const mats = Array.isArray(c.material) ? c.material : [c.material];
    mats.filter(Boolean).forEach((m) => {
      m.envMapIntensity = m.envMapIntensity ?? 1.1;
      m.needsUpdate = true;
    });
  });
  return obj;
}

/**
 * Loads a URDF via urdf-loader and drives its joints imperatively so slider
 * drags stay smooth. Reports its joint list + footprint width back to the fleet.
 */
function RobotModel({
  url,
  packages,
  upAxis = 'Z',
  modelScale = 1,
  modelPosition = [0, 0, 0],
  modelYaw = -Math.PI / 2,
  controlJoints,
  jointMimics,
  jointValues,
  onJoints,
  onMeasured,
  onSettled,
  onError,
}) {
  const [robot, setRobot] = useState(null);
  const robotRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const manager = new THREE.LoadingManager();
    const loader = new URDFLoader(manager);
    if (packages) loader.packages = packages;

    loader.loadMeshCb = (path, mgr, done) => {
      const ext = path.split(/[?#]/)[0].split('.').pop().toLowerCase();
      // Never hand urdf-loader a null (it would throw on scene.add); a failed
      // mesh degrades to an empty node so the rest of the robot still renders.
      const fail = (err) => {
        console.warn('[urdf mesh failed]', path, err?.message || err);
        done(new THREE.Object3D());
      };
      try {
        if (ext === 'stl') {
          new STLLoader(mgr).load(
            path,
            (geometry) => {
              geometry.deleteAttribute('normal');
              geometry.computeVertexNormals();
              done(new THREE.Mesh(geometry, fallbackMat(path)));
            },
            undefined,
            fail
          );
        } else if (ext === 'dae') {
          new ColladaLoader(mgr).load(
            path,
            (collada) => done(tuneLoadedMesh(collada.scene, path)),
            undefined,
            fail
          );
        } else if (ext === 'obj') {
          const cleanPath = path.split(/[?#]/)[0];
          const dir = path.slice(0, path.lastIndexOf('/') + 1);
          const mtlPath = cleanPath.replace(/\.obj$/i, '.mtl');
          new MTLLoader(mgr)
            .setResourcePath(dir)
            .load(
              mtlPath,
              (materials) => {
                materials.preload();
                const objLoader = new OBJLoader(mgr).setMaterials(materials);
                objLoader.load(
                  path,
                  (obj) => {
                    obj.traverse((c) => {
                      if (c.isMesh && c.material) {
                        const mats = Array.isArray(c.material) ? c.material : [c.material];
                        mats.forEach((m) => {
                          m.side = THREE.FrontSide;
                          m.envMapIntensity = 1.05;
                          m.needsUpdate = true;
                        });
                      }
                    });
                    done(obj);
                  },
                  undefined,
                  fail
                );
              },
              undefined,
              () => {
                new OBJLoader(mgr).load(
                  path,
                  (obj) => {
                    obj.traverse((c) => {
                      if (c.isMesh) c.material = fallbackMat(path);
                    });
                    done(obj);
                  },
                  undefined,
                  fail
                );
              }
            );
        } else {
          fail(new Error(`Unsupported mesh type: ${ext}`));
        }
      } catch (e) {
        fail(e);
      }
    };

    // Once all meshes finish, measure footprint + signal the fleet to reframe.
    manager.onLoad = () => {
      if (cancelled || !robotRef.current) return;
      const box = new THREE.Box3().setFromObject(robotRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);
      onMeasured?.({ x: size.x || 0.4, z: size.z || 0.4 });
      requestAnimationFrame(() => onSettled?.());
    };

    loader.load(
      url,
      (result) => {
        if (cancelled) return;
        if (upAxis === 'Z') result.rotation.x = -Math.PI / 2;
        result.rotation.z += modelYaw;
        result.scale.setScalar(modelScale);
        result.position.set(modelPosition[0], modelPosition[1], modelPosition[2]);
        result.traverse((c) => {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
            if (c.material) c.material.envMapIntensity = 1.1;
          }
        });
        robotRef.current = result;
        setRobot(result);
        const joints = Object.entries(result.joints)
          .filter(([name, j]) => {
            if (!j.jointType || j.jointType === 'fixed') return false;
            if (controlJoints && !controlJoints.includes(name)) return false;
            return true;
          })
          .map(([name, j]) => ({
            name,
            type: j.jointType,
            lower: Number(j.limit?.lower ?? -Math.PI),
            upper: Number(j.limit?.upper ?? Math.PI),
          }));
        onJoints?.(joints);
      },
      undefined,
      (err) => {
        if (!cancelled) onError?.(err);
      }
    );

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    const r = robotRef.current;
    if (!r || !jointValues) return;
    for (const [name, value] of Object.entries(jointValues)) {
      if (r.joints[name]) r.setJointValue(name, value);
      const mimics = jointMimics?.[name];
      if (mimics) {
        for (const [mimicName, mimicValue] of Object.entries(mimics(value))) {
          if (r.joints[mimicName]) {
            r.joints[mimicName].ignoreLimits = true;
            r.setJointValue(mimicName, mimicValue);
          }
        }
      }
    }
  }, [jointValues, jointMimics, robot]);

  if (!robot) return null;
  return (
    <group>
      <primitive object={robot} />
    </group>
  );
}

/** Renders `count` independently-articulated copies, placed side by side. */
function RobotFleet({ count = 1, fleetAxis = 'x', jointValues, onJoints, onError, ...rest }) {
  const [size, setSize] = useState(null);
  const bounds = useBounds();
  const n = Math.max(1, count);
  const spacing = size ? Math.max(size.x * 1.35, size.z * 0.8, 0.28) : 0;
  const fleetPosition = (i) => {
    const offset = (i - (n - 1) / 2) * spacing;
    return fleetAxis === 'z' ? [0, 0, offset] : [offset, 0, 0];
  };

  const refit = () => requestAnimationFrame(() => bounds?.refresh().clip().fit());

  useEffect(() => {
    if (size) refit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    if (size) refit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jointValues, size]);

  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <group key={`${rest.url}-${i}`} position={fleetPosition(i)}>
          <RobotModel
            {...rest}
            jointValues={jointValues}
            onJoints={i === 0 ? onJoints : undefined}
            onMeasured={i === 0 ? setSize : undefined}
            onSettled={refit}
            onError={onError}
          />
        </group>
      ))}
    </>
  );
}

export default function UrdfViewer({
  url,
  packages,
  upAxis = 'Z',
  controlJoints,
  count = 1,
  fleetAxis = 'x',
  modelScale = 1,
  modelPosition = [0, 0, 0],
  modelYaw = -Math.PI / 2,
  manualFrame = false,
  boundsMargin = 1.55,
  jointMimics,
  jointValues,
  onLoaded,
}) {
  const [error, setError] = useState(null);
  const modelKey = useMemo(() => url, [url]);

  useEffect(() => {
    setError(null);
  }, [modelKey]);

  const fallback = (
    <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center">
      <div className="max-w-sm rounded-lg border border-slate-200/80 bg-white/75 px-5 py-4 text-sm text-slate-600 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl">
        <p className="font-semibold text-slate-800">3D preview unavailable</p>
        <p className="mt-1 text-slate-500">
          This browser could not create a WebGL context. The catalog and controls are still available.
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#fbfcfe] via-[#eef3f8] to-[#dce5ef]">
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center">
          <div className="max-w-sm rounded-lg border border-red-400/40 bg-red-50 px-5 py-4 text-sm text-red-700">
            <p className="font-semibold">Unable to load the 3D model</p>
            <p className="mt-1 break-all text-red-600/80">{String(error?.message || error)}</p>
          </div>
        </div>
      )}
      <ViewerErrorBoundary fallback={fallback}>
        <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: DEFAULT_CAMERA_POSITION, fov: 35, near: 0.01, far: 100 }}
            gl={{
              antialias: true,
              alpha: true,
              preserveDrawingBuffer: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.12,
            }}
          >
            {/* Bright studio lighting */}
            <hemisphereLight args={[0xffffff, 0xc9d3df, 1.35]} />
            <directionalLight
              position={[4, 7, 5]}
              intensity={3.0}
              castShadow
              shadow-mapSize={[4096, 4096]}
              shadow-bias={-0.0002}
              shadow-camera-near={0.1}
              shadow-camera-far={30}
              shadow-camera-left={-3}
              shadow-camera-right={3}
              shadow-camera-top={3}
              shadow-camera-bottom={-3}
            />
            <directionalLight position={[-5, 3, -2]} intensity={1.0} color={0xffffff} />
            <directionalLight position={[0, 2, -6]} intensity={0.85} color={0xffffff} />

            <Suspense fallback={null}>
              {manualFrame ? (
              <RobotFleet
                url={url}
                packages={packages}
                upAxis={upAxis}
                controlJoints={controlJoints}
                count={count}
                fleetAxis={fleetAxis}
                modelScale={modelScale}
                modelPosition={modelPosition}
                modelYaw={modelYaw}
                jointMimics={jointMimics}
                jointValues={jointValues}
                onJoints={onLoaded}
                onError={setError}
              />
              ) : (
                <Bounds key={modelKey} fit clip observe margin={boundsMargin}>
                  <RobotFleet
                    url={url}
                    packages={packages}
                    upAxis={upAxis}
                    controlJoints={controlJoints}
                    count={count}
                    fleetAxis={fleetAxis}
                    modelScale={modelScale}
                    modelPosition={modelPosition}
                    modelYaw={modelYaw}
                    jointMimics={jointMimics}
                    jointValues={jointValues}
                    onJoints={onLoaded}
                    onError={setError}
                  />
                </Bounds>
              )}
            </Suspense>

            <Grid
              position={[0, -0.004, 0]}
              args={[12, 12]}
              cellSize={0.24}
              cellThickness={0.8}
              cellColor="#b8c4d2"
              sectionSize={1.2}
              sectionThickness={1.1}
              sectionColor="#96a6b8"
              fadeDistance={7}
              fadeStrength={1.2}
              infiniteGrid
            />

            {/* Soft grounding shadow */}
            <ContactShadows
              position={[0, 0.002, 0]}
              scale={6}
              resolution={2048}
              far={3}
              blur={2.8}
              opacity={0.42}
              color="#2a3340"
            />

            <OrbitControls
              makeDefault
              enableDamping
              dampingFactor={0.1}
              minDistance={0.15}
              maxDistance={8}
            />
            <DefaultView viewKey={modelKey} />
        </Canvas>
      </ViewerErrorBoundary>
    </div>
  );
}
