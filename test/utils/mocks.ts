export const mockGrillAreaConfig = {
  name: 'GPM Search',
  type: 'grill-area',
  config: {
    from: '12-01-2022',
    to: '12-31-2022',
    areas: [0, 1],
  },
};

export const mockWillhabenConfig = {
  name: 'Willhaben Search',
  type: 'willhaben',
  config: {
    query: 'sfId=ef0b2f4d-0e3d-4427-9a5b-54bb032b5638&rows=200&isNavigation=true&keyword=radkappen+16',
  },
};

export const mockSlackConfig = {
  type: 'slack',
  config: {
    webhook: 'hook',
  },
};
export const mockEmailConfig = {
  type: 'email',
  config: {
    to: 'ognjen.bostjancic@gmail.com',
  },
};

export const mockFormatConfig = {
  title: 'Grill search',
  prefix: "Here's what changed:",
  postfix: 'You can find out more at ...',
  date: 'dd.MM.yyyy',
};

export const mockSearch = {
  name: 'GPM Search',
  schedule: '0 */5 * * * *',
  config: {
    extraction: { sources: [mockWillhabenConfig] },
    refinement: {
      operators: [
        {
          type: 'group',
          by: 'area',
        },
      ],
    },
    notification: {
      channels: [mockSlackConfig, mockEmailConfig],
      format: mockFormatConfig,
    },
  },
};
