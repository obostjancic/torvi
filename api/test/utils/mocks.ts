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
    url: 'https://www.willhaben.at/iad/kaufen-und-verkaufen/marktplatz/reifen-felgen/radkappen-6275?keyword=radkappen+16+hyundai&sfId=bd3346c3-10a4-4b07-b142-026a76dd239b&rows=30&isNavigation=true',
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
