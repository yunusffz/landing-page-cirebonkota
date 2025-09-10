'use client';

import dynamic from 'next/dynamic';

const ClientSideCustomEditor = dynamic(
  () => import('@/components/ui/rich-editor').then(mod => mod.default),
  { ssr: false }
);

export default ClientSideCustomEditor;
