import { Suspense } from 'react';
import EditSessionContent from '@/components/EditSessionContent';

export default function EditSessionPage() {
  return (
    <Suspense fallback="Loading...">
      <EditSessionContent />
    </Suspense>
  );
}
