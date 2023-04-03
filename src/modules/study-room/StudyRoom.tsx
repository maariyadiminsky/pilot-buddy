// todo add typescript
// @ts-nocheck
// import { ChevronRightIcon } from '@heroicons/react/20/solid';

import PageWrapper from '@common/components/PageWrapper';
import PinnedItems from '@common/components/pinned-item/PinnedItems';
import Table from '@common/components/table/Table';

const pinnedItems = [
  {
    id: 1,
    text: 'Private Pilot Exam (Full)',
    lastUpdated: 'March 17, 2020',
    total: 21,
    type: 'question',
    className: 'bg-pink-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: 2,
    text: 'Code Test Study',
    lastUpdated: 'March 17, 2020',
    total: 8,
    type: 'question',
    className: 'bg-purple-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: 1,
    text: 'Private Pilot Exam (Full)',
    lastUpdated: 'March 17, 2020',
    total: 21,
    type: 'question',
    className: 'bg-pink-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: 2,
    text: 'Code Test Study',
    lastUpdated: 'March 17, 2020',
    total: 8,
    type: 'question',
    className: 'bg-purple-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
];

const HomePage = () => (
  <PageWrapper title="Study Room">
    <PinnedItems title="Pinned Sessions" items={pinnedItems} />
    <Table />
  </PageWrapper>
);

export default HomePage;
