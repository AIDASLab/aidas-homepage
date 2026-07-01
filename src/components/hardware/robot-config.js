// Data-driven hardware catalog for the interactive lab page.
//
// Each robot is one entry. `tier: '3d'` robots load a URDF and expose joint
// sliders + presets; `tier: 'spec'` robots show a rich spec card + photo until
// a web-ready URDF is wired in. Adding a robot = drop a config entry (+ assets
// under public/hardware/<key>/ for 3d robots).

export const CATEGORY_LABELS = {
  manipulator: 'Manipulators',
  'end-effector': 'End Effectors',
  teleop: 'Teleop / Controllers',
};

export const CATEGORY_ORDER = ['manipulator', 'end-effector', 'teleop'];

export const ROBOTS = [
  {
    key: 'so101',
    name: 'SO-101',
    maker: 'LeRobot / TheRobotStudio',
    category: 'manipulator',
    tier: '3d',
    quantity: 2,
    image: '/hardware/img/so101.jpg',
    vendor: 'ROAS',
    tagline: 'Low-cost open-source 6-DOF teaching arm — the workhorse for imitation-learning data collection.',
    urdf: '/hardware/so101/so101.urdf',
    upAxis: 'Z',
    modelYaw: -Math.PI / 2,
    defaultPreset: 'Ready',
    officialUrl: 'https://github.com/TheRobotStudio/SO-ARM100',
    dof: '6',
    specs: [
      { label: 'Degrees of freedom', value: '6 (5 arm + 1 gripper)' },
      { label: 'Actuators', value: '6× Feetech STS3215 smart servos' },
      { label: 'Design', value: 'Open-source SO-101 follower/leader arm' },
      { label: 'Ecosystem', value: 'Hugging Face LeRobot compatible' },
      { label: 'Control', value: 'Servo position control over TTL bus' },
      { label: 'Model source', value: 'TheRobotStudio SO-ARM100/SO-101 assets' },
    ],
    jointLabels: {
      shoulder_pan: 'Shoulder Pan',
      shoulder_lift: 'Shoulder Lift',
      elbow_flex: 'Elbow Flex',
      wrist_flex: 'Wrist Flex',
      wrist_roll: 'Wrist Roll',
      gripper: 'Gripper',
    },
    presets: [
      { name: 'Home', values: { shoulder_pan: 0, shoulder_lift: 0, elbow_flex: 0, wrist_flex: 0, wrist_roll: 0, gripper: 0 } },
      { name: 'Ready', values: { shoulder_pan: 0, shoulder_lift: -0.6, elbow_flex: 1.2, wrist_flex: 0.4, wrist_roll: 0, gripper: 0.2 } },
      { name: 'Reach out', values: { shoulder_pan: 0, shoulder_lift: 0.9, elbow_flex: -0.4, wrist_flex: -0.5, wrist_roll: 0, gripper: 1.2 } },
      { name: 'Pick left', values: { shoulder_pan: 1.2, shoulder_lift: 0.4, elbow_flex: 0.8, wrist_flex: 0.6, wrist_roll: 0.5, gripper: 1.5 } },
      { name: 'Grip closed', values: { shoulder_pan: 0, shoulder_lift: -0.3, elbow_flex: 1.0, wrist_flex: 0.3, wrist_roll: 0, gripper: -0.1 } },
    ],
  },
];

// ---- Tesollo DG-5F-M (20-DOF dexterous hand) -------------------------------
// 5 fingers × 4 joints: rj_dg_<finger>_<joint>. Joint 1 = base/spread,
// joints 2-4 = flexion (bend is negative per URDF limits). Finger 1 = thumb.
const DG_FINGERS = [1, 2, 3, 4, 5];
const dgLabels = {};
const FINGER_NAMES = { 1: 'Thumb', 2: 'Index', 3: 'Middle', 4: 'Ring', 5: 'Pinky' };
for (const f of DG_FINGERS) {
  dgLabels[`rj_dg_${f}_1`] = `${FINGER_NAMES[f]} · base`;
  dgLabels[`rj_dg_${f}_2`] = `${FINGER_NAMES[f]} · MCP`;
  dgLabels[`rj_dg_${f}_3`] = `${FINGER_NAMES[f]} · PIP`;
  dgLabels[`rj_dg_${f}_4`] = `${FINGER_NAMES[f]} · DIP`;
}
// Preset builders (values are clamped to each joint's real limits at apply time).
function dgPose({ curl = 0, fingers = DG_FINGERS, spread = 0, thumbSpread = 0.35 }) {
  const v = {};
  for (const f of DG_FINGERS) {
    const on = fingers.includes(f);
    const isThumb = f === 1;
    const flex = on ? curl : 0;
    v[`rj_dg_${f}_1`] = on ? (isThumb ? thumbSpread : spread) : 0;
    v[`rj_dg_${f}_2`] = isThumb ? -flex * 1.05 : flex;
    v[`rj_dg_${f}_3`] = flex * 0.78;
    v[`rj_dg_${f}_4`] = flex * 0.55;
  }
  return v;
}

ROBOTS.push({
  key: 'dg-5f-m',
  name: 'DG-5F-M',
  maker: 'Tesollo',
  category: 'end-effector',
  tier: '3d',
  quantity: 1,
  image: '/hardware/img/dg-5f-m.jpg',
  vendor: 'Tesollo',
  tagline: 'Human-scale five-finger dexterous hand — 20 DOF (4 per finger) for anthropomorphic manipulation.',
  urdf: '/hardware/dg5f/dg5f_right.urdf',
  upAxis: 'Z',
  modelScale: 3.2,
  boundsMargin: 4.4,
  packages: { meshes: '/hardware/dg5f/meshes' },
  officialUrl: 'https://en.tesollo.com/dg-5f-m/',
  dof: '20',
  specs: [
    { label: 'Fingers', value: '5 (fully actuated)' },
    { label: 'Degrees of freedom', value: '20 (4 per finger)' },
    { label: 'Weight', value: '1,763 g' },
    { label: 'Enveloping payload', value: '10 kg rated / 20 kg max' },
    { label: 'Pinch payload', value: '2.5 kg rated / 5 kg max' },
    { label: 'Control frequency', value: '250 Hz' },
    { label: 'Power', value: '24 V, max 10 A' },
    { label: 'Comms', value: 'Modbus (RTU/TCP), EtherNet TCP/IP, ROS 2' },
  ],
  jointLabels: dgLabels,
  presets: [
    { name: 'Open', values: dgPose({ curl: 0 }) },
    { name: 'Fist', values: { ...dgPose({ curl: 1.35, spread: 0.02, thumbSpread: 0.9 }), rj_dg_5_1: 1.0, rj_dg_5_2: 0.12, rj_dg_5_3: 1.28, rj_dg_5_4: 1.0 } },
    { name: 'Pinch', values: { ...dgPose({ curl: 0.95, fingers: [1, 2], thumbSpread: 1.05, spread: -0.16 }), rj_dg_2_3: 0.55, rj_dg_2_4: 0.32 } },
    { name: 'Point', values: { ...dgPose({ curl: 1.25, fingers: [1, 3, 4, 5], thumbSpread: 0.75 }), rj_dg_5_1: 0.96, rj_dg_5_2: 0.08, rj_dg_5_3: 1.18, rj_dg_5_4: 0.92 } },
    { name: 'Three', values: { ...dgPose({ curl: 1.05, fingers: [4, 5], thumbSpread: 0.25 }), rj_dg_5_1: 0.92, rj_dg_5_2: 0.05, rj_dg_5_3: 1.05, rj_dg_5_4: 0.82 } },
  ],
});

// ---- Franka Research 3 (7-DOF torque-controlled arm) -----------------------
const FR3_LABELS = {
  fr3_joint1: 'A1 · Base',
  fr3_joint2: 'A2 · Shoulder',
  fr3_joint3: 'A3 · Upper arm',
  fr3_joint4: 'A4 · Elbow',
  fr3_joint5: 'A5 · Forearm',
  fr3_joint6: 'A6 · Wrist 1',
  fr3_joint7: 'A7 · Wrist 2',
};
function fr3Pose(a) {
  return {
    fr3_joint1: a[0], fr3_joint2: a[1], fr3_joint3: a[2], fr3_joint4: a[3],
    fr3_joint5: a[4], fr3_joint6: a[5], fr3_joint7: a[6],
  };
}

ROBOTS.push({
  key: 'franka-research-3',
  name: 'Franka Research 3',
  maker: 'Franka Robotics',
  category: 'manipulator',
  tier: '3d',
  quantity: 2,
  image: '/hardware/img/franka-research-3.jpg',
  vendor: 'ROAS',
  tagline: '7-DOF torque-controlled research arm with joint torque sensing on every axis — built for contact-rich manipulation and robot learning.',
  urdf: '/hardware/fr3/fr3.urdf',
  upAxis: 'Z',
  modelYaw: -Math.PI / 2,
  defaultPreset: 'Ready',
  packages: { franka_description: '/hardware/fr3' },
  officialUrl: 'https://franka.de/franka-research-3',
  dof: '7',
  specs: [
    { label: 'Degrees of freedom', value: '7 (torque sensing on all joints)' },
    { label: 'Payload', value: '3 kg' },
    { label: 'Reach', value: '855 mm' },
    { label: 'Weight', value: '~18.3 kg' },
    { label: 'Repeatability', value: '±0.1 mm (ISO 9283)' },
    { label: 'Max TCP velocity', value: 'up to 2 m/s' },
    { label: 'Joint torque', value: '±87 Nm (A1–A4), ±12 Nm (A5–A7)' },
    { label: 'Mounting / IP', value: 'Upright, DIN ISO 9409-1-A50; IP40' },
  ],
  jointLabels: FR3_LABELS,
  presets: [
    { name: 'Zero', values: fr3Pose([0, 0, 0, -0.02, 0, 1.57, 0]) },
    { name: 'Ready', values: fr3Pose([0, -0.785, 0, -2.356, 0, 1.571, 0.785]) },
    { name: 'Reach out', values: fr3Pose([0, 0.3, 0, -1.2, 0, 1.5, 0.785]) },
    { name: 'Tuck', values: fr3Pose([0, -1.2, 0, -2.8, 0, 1.8, 0.785]) },
    { name: 'Wave', values: fr3Pose([1.2, -0.6, 0.5, -1.8, 0, 1.4, 0.785]) },
  ],
});

// ---- Spec-only robots (rich card + photo; 3D can be wired in later) --------
const SPEC_ROBOTS = [
  {
    key: 'ur7e',
    name: 'UR7e',
    maker: 'Universal Robots',
    category: 'manipulator',
    tier: '3d',
    quantity: 1,
    image: '/hardware/img/ur7e.png',
    vendor: 'Seoul Dynamics',
    urdf: '/hardware/ur7e/ur7e.urdf',
    upAxis: 'Z',
    modelYaw: -Math.PI / 2,
    defaultPreset: 'Ready',
    packages: { ur_description: '/hardware/ur7e' },
    modelNote: 'Model shares the UR5e mesh set (identical 850 mm form factor).',
    jointLabels: {
      shoulder_pan_joint: 'Base · shoulder pan',
      shoulder_lift_joint: 'Shoulder',
      elbow_joint: 'Elbow',
      wrist_1_joint: 'Wrist 1',
      wrist_2_joint: 'Wrist 2',
      wrist_3_joint: 'Wrist 3',
    },
    presets: [
      { name: 'Home', values: { shoulder_pan_joint: 0, shoulder_lift_joint: 0, elbow_joint: 0, wrist_1_joint: 0, wrist_2_joint: 0, wrist_3_joint: 0 } },
      { name: 'Upright', values: { shoulder_pan_joint: 0, shoulder_lift_joint: -1.57, elbow_joint: 0, wrist_1_joint: -1.57, wrist_2_joint: 0, wrist_3_joint: 0 } },
      { name: 'Ready', values: { shoulder_pan_joint: 0, shoulder_lift_joint: -1.57, elbow_joint: 1.57, wrist_1_joint: -1.57, wrist_2_joint: -1.57, wrist_3_joint: 0 } },
      { name: 'Reach out', values: { shoulder_pan_joint: 0, shoulder_lift_joint: -0.7, elbow_joint: 0.7, wrist_1_joint: -1.57, wrist_2_joint: -1.57, wrist_3_joint: 0 } },
      { name: 'Pick', values: { shoulder_pan_joint: 1.0, shoulder_lift_joint: -1.0, elbow_joint: 1.3, wrist_1_joint: -1.9, wrist_2_joint: -1.57, wrist_3_joint: 0 } },
    ],
    officialUrl: 'https://www.universal-robots.com/products/ur7e/',
    dof: '6',
    tagline: '6-axis e-Series collaborative arm — 7.5 kg payload, 850 mm reach for medium-duty automation and research.',
    specs: [
      { label: 'Degrees of freedom', value: '6 rotary joints' },
      { label: 'Payload', value: '7.5 kg' },
      { label: 'Reach', value: '850 mm' },
      { label: 'Weight', value: '20.6 kg' },
      { label: 'Repeatability', value: '±0.03 mm (ISO 9283)' },
      { label: 'Max TCP speed', value: '4 m/s' },
      { label: 'Footprint', value: 'Ø 151 mm' },
      { label: 'Joint ranges', value: '±360° except elbow ±160°' },
      { label: 'Rating', value: 'IP54; PLd Cat.3 safety functions' },
    ],
  },
  {
    key: 'stationary-ai',
    name: 'WidowX AI (Stationary)',
    maker: 'Trossen Robotics',
    category: 'manipulator',
    tier: '3d',
    quantity: 1,
    image: '/hardware/img/widowx-ai.png',
    vendor: null,
    urdf: '/hardware/trossen/stationary_ai.urdf',
    upAxis: 'Z',
    defaultPreset: 'Gather',
    packages: { trossen_arm_description: '/hardware/trossen' },
    controlJoints: [
      'follower_left_joint_0', 'follower_left_joint_1', 'follower_left_joint_2', 'follower_left_joint_3', 'follower_left_joint_4', 'follower_left_joint_5',
      'follower_left_right_carriage_joint', 'follower_left_left_carriage_joint',
      'follower_right_joint_0', 'follower_right_joint_1', 'follower_right_joint_2', 'follower_right_joint_3', 'follower_right_joint_4', 'follower_right_joint_5',
      'follower_right_right_carriage_joint', 'follower_right_left_carriage_joint',
    ],
    jointLabels: {
      follower_left_joint_0: 'L · base', follower_left_joint_1: 'L · shoulder', follower_left_joint_2: 'L · elbow',
      follower_left_joint_3: 'L · wrist 1', follower_left_joint_4: 'L · wrist 2', follower_left_joint_5: 'L · wrist 3',
      follower_left_right_carriage_joint: 'L · gripper right', follower_left_left_carriage_joint: 'L · gripper left',
      follower_right_joint_0: 'R · base', follower_right_joint_1: 'R · shoulder', follower_right_joint_2: 'R · elbow',
      follower_right_joint_3: 'R · wrist 1', follower_right_joint_4: 'R · wrist 2', follower_right_joint_5: 'R · wrist 3',
      follower_right_right_carriage_joint: 'R · gripper right', follower_right_left_carriage_joint: 'R · gripper left',
    },
    presets: [
      { name: 'Home', values: {} },
      { name: 'Gather', values: { follower_left_joint_0: 0.72, follower_right_joint_0: -0.72, follower_left_joint_1: 1.05, follower_right_joint_1: 1.05, follower_left_joint_2: 1.15, follower_right_joint_2: 1.15, follower_left_joint_3: -0.45, follower_right_joint_3: 0.45, follower_left_right_carriage_joint: 0.012, follower_left_left_carriage_joint: 0.012, follower_right_right_carriage_joint: 0.012, follower_right_left_carriage_joint: 0.012 } },
      { name: 'Hand-off', values: { follower_left_joint_0: 0.25, follower_right_joint_0: -0.2, follower_left_joint_1: 0.72, follower_right_joint_1: 0.9, follower_left_joint_2: 0.78, follower_right_joint_2: 1.35, follower_left_joint_3: -0.65, follower_right_joint_3: 0.6, follower_left_joint_4: 0.45, follower_right_joint_4: -0.35, follower_left_right_carriage_joint: 0.005, follower_left_left_carriage_joint: 0.005, follower_right_right_carriage_joint: 0.03, follower_right_left_carriage_joint: 0.03 } },
      { name: 'Reach in', values: { follower_left_joint_0: 0.5, follower_right_joint_0: -0.5, follower_left_joint_1: 0.75, follower_right_joint_1: 0.75, follower_left_joint_2: 1.25, follower_right_joint_2: 1.25, follower_left_joint_4: -0.35, follower_right_joint_4: 0.35, follower_left_right_carriage_joint: 0.018, follower_left_left_carriage_joint: 0.018, follower_right_right_carriage_joint: 0.018, follower_right_left_carriage_joint: 0.018 } },
    ],
    officialUrl: 'https://www.trossenrobotics.com/stationary-ai',
    dof: '2×(6+1)',
    tagline: 'Bimanual ALOHA-style workstation — two leader/follower WidowX AI arms for physical-AI data collection.',
    specs: [
      { label: 'Configuration', value: 'Bimanual · 2 leader + 2 follower arms' },
      { label: 'DoF per arm', value: '6 + 1 gripper' },
      { label: 'Payload per arm', value: '1.5 kg' },
      { label: 'Reach per arm', value: '700 mm' },
      { label: 'Arm weight', value: '4 kg each' },
      { label: 'Cameras', value: '4× Intel RealSense D405' },
      { label: 'Workstation', value: '10-inch touchscreen + frame/accessories' },
    ],
  },
  {
    key: 'franka-hand',
    name: 'Franka Hand',
    maker: 'Franka Robotics',
    category: 'end-effector',
    tier: '3d',
    quantity: 1,
    image: '/hardware/img/franka-hand.jpg',
    vendor: 'Franka Robotics',
    urdf: '/hardware/franka-hand/franka_hand.urdf',
    upAxis: 'Z',
    packages: { franka_hand_description: '/hardware/franka-hand' },
    controlJoints: ['robot_finger_joint1'],
    defaultPreset: 'Open',
    jointLabels: { robot_finger_joint1: 'Finger width' },
    presets: [
      { name: 'Open', values: { robot_finger_joint1: 0.04 } },
      { name: 'Half', values: { robot_finger_joint1: 0.02 } },
      { name: 'Closed', values: { robot_finger_joint1: 0.0 } },
    ],
    officialUrl: 'https://franka.de/documents',
    dof: '1',
    tagline: 'Parallel two-finger electric gripper for the Franka Research platform.',
    specs: [
      { label: 'Type', value: 'Parallel two-finger gripper' },
      { label: 'Stroke', value: '0-80 mm total opening' },
      { label: 'Grasping force', value: '70 N continuous / 140 N max' },
      { label: 'Weight', value: '0.7 kg' },
      { label: 'Model source', value: 'Official franka_description mesh set' },
    ],
  },
  {
    key: '2f-85',
    name: 'Robotiq 2F-85',
    maker: 'Robotiq',
    category: 'end-effector',
    tier: '3d',
    quantity: 2,
    image: '/hardware/img/robotiq-2f-85.png',
    vendor: 'ROAS',
    urdf: '/hardware/robotiq-arg85/robotiq_arg85_description.urdf',
    upAxis: 'Z',
    packages: { robotiq_arg85_description: '/hardware/robotiq-arg85' },
    controlJoints: ['finger_joint'],
    jointMimics: {
      finger_joint: (v) => ({
        left_inner_knuckle_joint: v,
        left_inner_finger_joint: -v,
        right_inner_knuckle_joint: -v,
        right_inner_finger_joint: v,
        right_outer_knuckle_joint: -v,
      }),
    },
    fleetAxis: 'x',
    modelScale: 2.2,
    modelYaw: 0,
    boundsMargin: 1.7,
    defaultPreset: 'Open',
    jointLabels: { finger_joint: 'Grip (open ↔ close)' },
    presets: [
      { name: 'Open', values: { finger_joint: 0 } },
      { name: 'Half', values: { finger_joint: 0.35 } },
      { name: 'Closed', values: { finger_joint: 0.725 } },
    ],
    officialUrl: 'https://robotiq.com/products/2f85-140-adaptive-robot-gripper/',
    dof: '1',
    tagline: 'Electric 2-finger adaptive gripper — 85 mm stroke, programmable force, parallel or encompassing grasp.',
    specs: [
      { label: 'Stroke', value: '0–85 mm (programmable)' },
      { label: 'Grip force', value: '20–235 N' },
      { label: 'Payload', value: '5 kg (both grasp modes)' },
      { label: 'Speed', value: '20–150 mm/s' },
      { label: 'Weight', value: '1 kg' },
      { label: 'Repeatability', value: '0.05 mm' },
      { label: 'Grasp modes', value: 'Parallel / encompassing' },
    ],
  },
  {
    key: 'aloha-cobot-magic',
    name: 'ALOHA Cobot Magic',
    maker: 'AgileX Robotics',
    category: 'manipulator',
    tier: '3d',
    quantity: 1,
    image: '/hardware/img/aloha-cobot-magic.jpg',
    vendor: 'ROAS',
    urdf: '/hardware/mobile_aloha/aloha_new_description/urdf/aloha_tracer2_dabai_dark_web.urdf',
    upAxis: 'Z',
    defaultPreset: 'Reach fwd',
    manualFrame: true,
    modelScale: 1.25,
    modelPosition: [0, -0.18, 0],
    boundsMargin: 4.6,
    packages: {
      aloha_new_description: '/hardware/mobile_aloha/aloha_new_description',
      tracer2_description: '/hardware/mobile_aloha/tracer2_description',
    },
    controlJoints: [
      'fl_joint1', 'fl_joint2', 'fl_joint3', 'fl_joint4', 'fl_joint5', 'fl_joint6',
      'fl_joint7', 'fl_joint8',
      'fr_joint1', 'fr_joint2', 'fr_joint3', 'fr_joint4', 'fr_joint5', 'fr_joint6',
      'fr_joint7', 'fr_joint8',
      'bl_joint1', 'bl_joint2', 'bl_joint3', 'bl_joint4', 'bl_joint5', 'bl_joint6',
      'bl_joint7', 'bl_joint8',
      'br_joint1', 'br_joint2', 'br_joint3', 'br_joint4', 'br_joint5', 'br_joint6',
      'br_joint7', 'br_joint8',
    ],
    jointLabels: {
      fl_joint1: 'L · J1', fl_joint2: 'L · J2', fl_joint3: 'L · J3', fl_joint4: 'L · J4', fl_joint5: 'L · J5', fl_joint6: 'L · J6',
      fl_joint7: 'L · gripper +', fl_joint8: 'L · gripper -',
      fr_joint1: 'R · J1', fr_joint2: 'R · J2', fr_joint3: 'R · J3', fr_joint4: 'R · J4', fr_joint5: 'R · J5', fr_joint6: 'R · J6',
      fr_joint7: 'R · gripper +', fr_joint8: 'R · gripper -',
      bl_joint1: 'Rear L · J1', bl_joint2: 'Rear L · J2', bl_joint3: 'Rear L · J3', bl_joint4: 'Rear L · J4', bl_joint5: 'Rear L · J5', bl_joint6: 'Rear L · J6',
      bl_joint7: 'Rear L · gripper +', bl_joint8: 'Rear L · gripper -',
      br_joint1: 'Rear R · J1', br_joint2: 'Rear R · J2', br_joint3: 'Rear R · J3', br_joint4: 'Rear R · J4', br_joint5: 'Rear R · J5', br_joint6: 'Rear R · J6',
      br_joint7: 'Rear R · gripper +', br_joint8: 'Rear R · gripper -',
    },
    presets: [
      { name: 'Home', values: {} },
      { name: 'Arms up', values: { fl_joint2: 0.9, fr_joint2: 0.9, fl_joint3: -1.05, fr_joint3: -1.05, fl_joint7: 0.03, fl_joint8: -0.03, fr_joint7: 0.03, fr_joint8: -0.03, bl_joint2: 1.05, br_joint2: 1.05, bl_joint3: -1.2, br_joint3: -1.2, bl_joint7: 0.03, bl_joint8: -0.03, br_joint7: 0.03, br_joint8: -0.03 } },
      { name: 'Reach fwd', values: { fl_joint1: 0.28, fr_joint1: -0.28, fl_joint2: 0.55, fr_joint2: 0.55, fl_joint3: -1.35, fr_joint3: -1.35, fl_joint5: 0.45, fr_joint5: -0.45, fl_joint7: 0.006, fl_joint8: -0.006, fr_joint7: 0.032, fr_joint8: -0.032, bl_joint2: 0.35, br_joint2: 0.35, bl_joint3: -0.8, br_joint3: -0.8, bl_joint7: 0.026, bl_joint8: -0.026, br_joint7: 0.026, br_joint8: -0.026 } },
      { name: 'Carry', values: { fl_joint1: 0.55, fr_joint1: -0.55, fl_joint2: 0.78, fr_joint2: 0.78, fl_joint3: -1.55, fr_joint3: -1.55, fl_joint4: -0.4, fr_joint4: 0.4, fl_joint7: 0.004, fl_joint8: -0.004, fr_joint7: 0.004, fr_joint8: -0.004, bl_joint1: -0.45, br_joint1: 0.45, bl_joint2: 1.05, br_joint2: 1.05, bl_joint3: -1.6, br_joint3: -1.6, bl_joint7: 0.032, bl_joint8: -0.032, br_joint7: 0.032, br_joint8: -0.032 } },
    ],
    officialUrl: 'https://global.agilex.ai/products/cobot-magic',
    dof: '4×6',
    tagline: 'Mobile ALOHA platform — four 6-DoF arms (2 leader + 2 follower) on an AgileX Tracer base.',
    specs: [
      { label: 'Configuration', value: '4× 6-DoF lightweight arms on Tracer base' },
      { label: 'Base', value: 'Two-wheel differential AgileX Tracer' },
      { label: 'Base dimensions', value: '685 × 570 × 155 mm' },
      { label: 'Base landing capacity', value: '100 kg' },
      { label: 'Camera', value: 'Orbbec DABAI depth camera (0.3–3 m)' },
      { label: 'Compute', value: 'Orin Nano / APQ4060 class onboard computer' },
      { label: 'Charging period', value: '4 hours' },
    ],
  },
  {
    key: 'r1-lite',
    name: 'R1-Lite',
    maker: 'Galaxea Dynamics',
    category: 'manipulator',
    tier: '3d',
    quantity: 1,
    image: '/hardware/img/r1-lite.png',
    vendor: null,
    urdf: '/hardware/r1lite/robot.urdf',
    upAxis: 'Z',
    defaultPreset: 'Ready',
    controlJoints: [
      'torso_joint1', 'torso_joint2', 'torso_joint3',
      'left_arm_joint1', 'left_arm_joint2', 'left_arm_joint3', 'left_arm_joint4', 'left_arm_joint5', 'left_arm_joint6',
      'left_gripper_finger_joint1', 'left_gripper_finger_joint2',
      'right_arm_joint1', 'right_arm_joint2', 'right_arm_joint3', 'right_arm_joint4', 'right_arm_joint5', 'right_arm_joint6',
      'right_gripper_finger_joint1', 'right_gripper_finger_joint2',
    ],
    jointLabels: {
      torso_joint1: 'Torso 1', torso_joint2: 'Torso 2', torso_joint3: 'Torso 3',
      left_arm_joint1: 'L-arm J1', left_arm_joint2: 'L-arm J2', left_arm_joint3: 'L-arm J3',
      left_arm_joint4: 'L-arm J4', left_arm_joint5: 'L-arm J5', left_arm_joint6: 'L-arm J6',
      left_gripper_finger_joint1: 'L gripper +', left_gripper_finger_joint2: 'L gripper -',
      right_arm_joint1: 'R-arm J1', right_arm_joint2: 'R-arm J2', right_arm_joint3: 'R-arm J3',
      right_arm_joint4: 'R-arm J4', right_arm_joint5: 'R-arm J5', right_arm_joint6: 'R-arm J6',
      right_gripper_finger_joint1: 'R gripper +', right_gripper_finger_joint2: 'R gripper -',
    },
    presets: [
      { name: 'Home', values: {} },
      { name: 'Ready', values: { torso_joint2: 0.15, left_arm_joint1: 0.35, right_arm_joint1: -0.35, left_arm_joint2: 0.92, right_arm_joint2: 0.92, left_arm_joint3: -1.25, right_arm_joint3: -1.25, left_arm_joint4: 0.72, right_arm_joint4: 0.72, left_gripper_finger_joint1: 0.03, left_gripper_finger_joint2: -0.03, right_gripper_finger_joint1: 0.03, right_gripper_finger_joint2: -0.03 } },
      { name: 'Reach fwd', values: { torso_joint1: 0.08, torso_joint2: 0.38, torso_joint3: -0.22, left_arm_joint1: 0.15, right_arm_joint1: -0.15, left_arm_joint2: 0.55, right_arm_joint2: 0.55, left_arm_joint3: -1.55, right_arm_joint3: -1.55, left_arm_joint4: 0.9, right_arm_joint4: 0.9, left_arm_joint5: 0.45, right_arm_joint5: -0.45, left_gripper_finger_joint1: 0.012, left_gripper_finger_joint2: -0.012, right_gripper_finger_joint1: 0.012, right_gripper_finger_joint2: -0.012 } },
      { name: 'Low pick', values: { torso_joint1: -0.35, torso_joint2: 0.72, torso_joint3: -0.45, left_arm_joint1: 0.72, right_arm_joint1: -0.72, left_arm_joint2: 1.15, right_arm_joint2: 1.15, left_arm_joint3: -2.05, right_arm_joint3: -2.05, left_arm_joint4: 0.95, right_arm_joint4: 0.95, left_arm_joint5: -0.65, right_arm_joint5: 0.65, left_gripper_finger_joint1: 0.006, left_gripper_finger_joint2: -0.006, right_gripper_finger_joint1: 0.04, right_gripper_finger_joint2: -0.04 } },
      { name: 'Inspect', values: { torso_joint1: 0.45, torso_joint2: 0.22, torso_joint3: 0.3, left_arm_joint1: -0.3, right_arm_joint1: 0.35, left_arm_joint2: 0.95, right_arm_joint2: 0.72, left_arm_joint3: -1.0, right_arm_joint3: -1.45, left_arm_joint4: -0.7, right_arm_joint4: 1.05, left_arm_joint5: 0.8, right_arm_joint5: -0.55, left_gripper_finger_joint1: 0.045, left_gripper_finger_joint2: -0.045, right_gripper_finger_joint1: 0.018, right_gripper_finger_joint2: -0.018 } },
    ],
    officialUrl: 'https://galaxea-ai.com/products/R1-Lite',
    dof: '23',
    tagline: 'Wheeled dual-arm mobile manipulator — two 6-axis A1X arms, 3-DoF lift torso, omnidirectional chassis.',
    specs: [
      { label: 'Total DoF', value: '23 (chassis + torso + arms + grippers)' },
      { label: 'Single-arm DoF', value: '6' },
      { label: 'Torso DoF', value: '3' },
      { label: 'Arm length', value: '600 mm' },
      { label: 'Arm payload', value: '3 kg rated / 5 kg max @ 0.6 m' },
      { label: 'Vertical workspace', value: '0–1.7 m' },
      { label: 'Max chassis speed', value: '1.5 m/s, 360° omnidirectional' },
      { label: 'Compute', value: 'Intel Core i9-12900HK, 32 GB RAM, 1 TB SSD' },
    ],
  },
  {
    key: 'metagloves-pro',
    name: 'MetaGloves Pro Haptic',
    maker: 'Manus',
    category: 'teleop',
    tier: 'spec',
    quantity: 1,
    vendor: 'Tesollo',
    image: '/hardware/img/metagloves-pro.png',
    officialUrl: 'https://www.manus-meta.com/products/metagloves-pro',
    dof: '25',
    tagline: 'EMF-tracked haptic data glove — full 25-DOF hand capture with per-finger vibrotactile feedback for teleop.',
    specs: [
      { label: 'Degrees of freedom', value: '25 (full anatomical hand)' },
      { label: 'Fingertip sensors', value: '5× 6-DOF EMF sensors per glove' },
      { label: 'IMU', value: '9-DOF (hand orientation)' },
      { label: 'Sample rate', value: '120 Hz' },
      { label: 'Latency', value: '30 ms wired / 50 ms wireless' },
      { label: 'Haptics', value: 'Per-finger LRA vibrotactile' },
      { label: 'Connectivity', value: 'USB-C; Bluetooth 5.0 (≤15 m)' },
    ],
  },
  {
    key: 'gello-duo',
    name: 'Franka Gello Duo',
    maker: 'Franka Robotics / GELLO',
    category: 'teleop',
    tier: 'spec',
    quantity: 1,
    vendor: 'ROAS',
    image: '/hardware/img/gello-duo.png',
    officialUrl: 'https://franka.de/gello',
    dof: '2×7',
    tagline: 'Low-cost 3D-printed kinematic-replica leader arm — puppeteer an FR3 (or FR3 Duo, bimanually) joint-for-joint.',
    specs: [
      { label: 'Type', value: 'Passive leader-arm teleop controller' },
      { label: 'DoF per arm', value: '7 (mirrors FR3) + gripper trigger' },
      { label: 'Follower', value: 'Franka FR3 / FR3 Duo' },
      { label: 'Encoders', value: 'DYNAMIXEL XL330 smart servos (12-bit)' },
      { label: 'Interface', value: 'ROS 2 via U2D2 USB → Dynamixel bus' },
      { label: 'Build', value: '3D-printed, open source (MIT)' },
    ],
  },
];
ROBOTS.push(...SPEC_ROBOTS);

export function getRobot(key) {
  return ROBOTS.find((r) => r.key === key);
}
