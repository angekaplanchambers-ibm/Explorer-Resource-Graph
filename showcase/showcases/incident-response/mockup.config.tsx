/* eslint-disable i18next/no-literal-string */
import type { ShowcaseConfig } from '../../src/types';
import { config as showcaseConfig } from './config';

export const config: ShowcaseConfig = {
  ...showcaseConfig,
  title: 'Incident Response Dashboard Mockups',
  subtitle: 'Standalone gray wireframe states without the narrative showcase wrapper.',
  outputName: '002.IncidentResponse-Mockups-Draft01',
  layout: {
    mode: 'mockup',
    contentMaxWidth: 'none',
    contentPadding: 24,
    sectionGap: 40,
    stateToggles: true,
    frame: {
      title: 'Incident Response',
      height: 'calc(100vh - 96px)',
      minWidth: 1440,
      overflow: 'auto',
      frameOverflow: 'auto',
    },
  },
};
