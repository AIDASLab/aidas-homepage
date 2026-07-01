// Interactive hardware page — explore the lab's robots in 3D.

import PageLayout from '@/components/layout/page-layout';
import HardwareExplorer from '@/components/hardware/hardware-explorer';

export const metadata = {
  title: 'Robots · AIDAS Lab',
  description: 'Explore the robot platforms currently used in AIDAS Lab research.',
};

export default function HardwarePage() {
  return (
    <PageLayout title="Robots" widthClass="max-w-[1480px]">
      <p className="mx-auto mb-8 max-w-3xl text-center text-sm sm:text-base text-subtle">
        Explore the robot platforms currently owned by AIDAS Lab and used across our embodied AI research.
      </p>
      <HardwareExplorer initialKey="so101" />
    </PageLayout>
  );
}
