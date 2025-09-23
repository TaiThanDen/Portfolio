import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

// đăng ký meshline cho JSX
extend({ MeshLineGeometry, MeshLineMaterial });
declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: any;
            meshLineMaterial: any;
        }
    }
}

type LanyardProps = {
    /** ảnh PNG của mặt thẻ (bắt buộc) */
    cardImage: string;
    /** ảnh PNG của dây đeo (optional) */
    strapImage?: string;
    /** ảnh PNG của móc/khuyên (optional) */
    hookImage?: string;

    /** size thẻ (mặc định 1.6 x 2.25) */
    width?: number;
    height?: number;

    /** thông số vật lý nhẹ hơn để bớt rung */
    mass?: number;
};

export default function LanyardCanvas(props: LanyardProps) {
    return (
        <div className="relative  w-full h-[460px] md:h-[520px]">
            <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
                <color attach="background" args={["#18181c"]} />
                <ambientLight intensity={0.9} />
                <pointLight position={[4, 6, 6]} intensity={1.2} />
                {/* Physics requires the Rapier WASM/runtime to be initialized. */}
                {/* We dynamically import the compat package and only render Physics when it's ready. */}
                <LazyPhysicsWrapper {...props} />
            </Canvas>
        </div>
    );
}

function LazyPhysicsWrapper(props: LanyardProps) {
    const [rapier, setRapier] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
        // dynamic import so Vite can resolve the wasm asset and the module initializes correctly
        import('@dimforge/rapier3d-compat')
            .then((mod) => {
                if (mounted) setRapier(mod);
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error('Failed to load rapier compat:', err);
            });

        return () => {
            mounted = false;
        };
    }, []);

    if (!rapier) return null; // or a fallback placeholder

    return (
        // rapier prop is accepted at runtime by @react-three/rapier but the TS types
        // in this project may not include it. Cast to any to avoid compile error.
        <Physics {...({ rapier, interpolate: true, gravity: [0, -80, 0], timeStep: 1 / 60 } as any)}>
            <Band {...props} />
        </Physics>
    );
}

function Band({
    cardImage,
    strapImage,
    hookImage,
    width = 1.6,
    height = 2.25,
    mass = 0.3,
}: LanyardProps) {
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);
    const hookRef = useRef<THREE.Mesh>(null!);

    // textures
    const cardTex = useMemo(() => {
        const t = new THREE.TextureLoader().load(cardImage);
        t.colorSpace = THREE.SRGBColorSpace;
        return t;
    }, [cardImage]);

    const strapTex = useMemo(() => {
        if (!strapImage) return null;
        const t = new THREE.TextureLoader().load(strapImage);
        t.colorSpace = THREE.SRGBColorSpace;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        return t;
    }, [strapImage]);

    const hookTex = useMemo(() => {
        if (!hookImage) return null;
        const t = new THREE.TextureLoader().load(hookImage);
        t.colorSpace = THREE.SRGBColorSpace;
        t.generateMipmaps = true;
        t.anisotropy = 8; // hiển thị mịn hơn khi nghiêng
        return t;
    }, [hookImage]);

    const { width: W, height: H } = useThree((s) => s.size);
    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
            ])
    );

    const [dragged, setDragged] = useState<THREE.Vector3 | null>(null);

    // joints cho dây
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1, 0]]);

    const vec = useMemo(() => new THREE.Vector3(), []);
    const dir = useMemo(() => new THREE.Vector3(), []);
    const ang = useMemo(() => new THREE.Vector3(), []);
    const rot = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        if (dragged && card.current) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp?.());
            card.current.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z,
            });
        }

        if (fixed.current && band.current && card.current) {
            // cập nhật dây (meshline)
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.translation());
            curve.points[2].copy(j1.current.translation());
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(32));

            // lặp texture dây theo chiều dài
            if (strapTex) {
                const L = curve.getLength();
                strapTex.repeat.set(Math.max(1, L), 1);
                strapTex.needsUpdate = true;
            }

            // giảm xoay ngang cho bớt "quay tít"
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });

            // đặt vị trí hook
            if (hookRef.current) {
                const p = j3.current.translation();
                hookRef.current.position.set(p.x, p.y - 0.2, p.z + 0.01);
            }
        }
    });

    // material thẻ: luôn dùng unlit (MeshBasicMaterial) sau khi loại cardLit
    const cardMat = useMemo(() => {
        return new THREE.MeshBasicMaterial({
            map: cardTex,
            side: THREE.DoubleSide,
            transparent: true,
            toneMapped: false, // giữ màu ảnh đúng 100%
            alphaTest: 0.01,   // bỏ những pixel gần trong suốt
        });
    }, [cardTex]);

    return (
        <>
            {/* neo + joints */}
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} type="fixed" canSleep angularDamping={3} linearDamping={3} />
                <RigidBody ref={j1} position={[0.5, 0, 0]} angularDamping={3} linearDamping={3}>
                    <BallCollider args={[0.1]} sensor />
                </RigidBody>
                <RigidBody ref={j2} position={[1, 0, 0]} angularDamping={3} linearDamping={3}>
                    <BallCollider args={[0.1]} sensor />
                </RigidBody>
                <RigidBody ref={j3} position={[1.5, 0, 0]} angularDamping={3} linearDamping={3}>
                    <BallCollider args={[0.1]} sensor />
                </RigidBody>

                {/* thẻ */}
                <RigidBody
                    ref={card}
                    type={dragged ? "kinematicPosition" : "dynamic"}
                    position={[2, 0, 0]}
                    canSleep
                    gravityScale={1}
                    linearDamping={6}      // tăng damping để ổn định khi va chạm/joint
                    angularDamping={6}
                    mass={mass}
                >
                    <CuboidCollider args={[width * 0.5, height * 0.5, 0.01]} />
                    <mesh
                        renderOrder={2} // vẽ sau dây => đảm bảo thẻ hiển thị phía trên (trừ vùng alphaTest)
                        onPointerDown={(e: any) => {
                            e.target.setPointerCapture?.(e.pointerId);
                            const start = new THREE.Vector3()
                                .copy(e.point)
                                .sub(new THREE.Vector3().copy(card.current.translation()));
                            setDragged(start);
                        }}
                        onPointerUp={(e: any) => {
                            e.target.releasePointerCapture?.(e.pointerId);
                            setDragged(null);
                        }}
                    >
                        <planeGeometry args={[width, height]} />
                        <primitive object={cardMat} attach="material" />
                    </mesh>
                </RigidBody>
            </group>

            {/* dây (meshline có gán map) */}
            <mesh ref={band} renderOrder={1}>
                <meshLineGeometry />
                <meshLineMaterial
                    transparent
                    opacity={strapTex ? 1 : 0.35}
                    color={strapTex ? undefined : "white"}
                    depthTest={true}      // cho phép kiểm tra depth bình thường
                    depthWrite={false}    // không ghi vào depth buffer (tránh che nguồn khác khi render trước)
                    // @ts-ignore
                    resolution={[W, H]}
                    lineWidth={0.7}
                    map={strapTex ?? undefined}
                    useMap={!!strapTex}
                />
            </mesh>

            {/* móc/khuyên (plane ảnh PNG) */}
            {hookTex && (
                <mesh ref={hookRef} rotation={[0, 0, 0]}>
                    <planeGeometry args={[0.35, 0.35]} />
                    <meshBasicMaterial
                        map={hookTex ?? undefined}
                        transparent
                        alphaTest={0.01}
                        side={THREE.DoubleSide}
                        toneMapped={false}
                    />

                </mesh>
            )}
        </>
    );
}
