export const mockData: Partial<ReduxStore> = {
  devices: {
    references: [
      {
        id: '1',
        name: 'ICT220',
        imageName: 'ICT220.jpg',
      },
      {
        id: '2',
        name: 'ICT250',
        imageName: 'ICT250.jpg',
      },
      /*
      {
        id: '3',
        name: 'IWL220',
        imageName: 'IWL220.jpg',
      },
      {
        id: '4',
        name: 'IWL225',
        imageName: 'IWL225.jpg',
      },
      {
        id: '5',
        name: 'IWL250',
        imageName: 'IWL250.png',
      },
      */
    ],
    list: [
      {
        id: '1',
        plateNumber: 'UI897404KL',
        serialNumber: 'ERT123',
        terminalNumer: 'XKL567',
        reference: {
          id: '1',
          name: 'ICT220',
          imageName: 'ICT220.jpg',
        },
      },
      {
        id: '2',
        plateNumber: 'KOL97404KL',
        serialNumber: 'NJJT123',
        terminalNumer: 'LKI098',
        reference: {
          id: '1',
          name: 'ICT220',
          imageName: 'ICT220.jpg',
        },
      },
      {
        id: '3',
        plateNumber: 'JNN97404KL',
        serialNumber: 'OPRT123',
        terminalNumer: 'YTU345',
        reference: {
          id: '2',
          name: 'ICT250',
          imageName: 'ICT250.jpg',
        },
      },
    ],
  },
  utils: {
    issueTypes: [
      {
        id: '1',
        description: 'No Prende',
      },
      {
        id: '2',
        description: 'No Carga',
      },
    ],
    loading: false,
  },
  schedule: {
    optimalRouteItems: [],
    pendingServices: [
      {
        id: 1,
        coordinates: { latitude: 4.597015, longitude: -74.1558577 },
        commerce: {
          name: 'Makro Villa del Rio',
          address: 'CRA 63 57G-47 Sur',
        },
        scheduledTime: '',
      },
      {
        id: 2,
        coordinates: { latitude: 4.7349681, longitude: -74.0565834 },
        commerce: {
          name: 'Carulla Soledad',
          address: 'Avx 24 41-43',
        },
        scheduledTime: '',
      },
      {
        id: 3,
        coordinates: { latitude: 4.7707463, longitude: -74.0422917 },
        commerce: {
          name: 'Makro Cumara',
          address: 'Avx 45 192-18',
        },
        scheduledTime: '',
      },
    ],
    polyLineCoordinates: [],
    userLocation: {
      latitude: 4.6774878,
      longitude: -74.0410445,
    },
    activeService: null,
  },
  supplies: {
    list: [],
    types: [
      {
        id: 1,
        name: 'Consumibles',
        references: [
          {
            id: 1,
            name: 'Rollo de papel',
          },
          {
            id: 2,
            name: 'Publicidad',
          },
        ],
      },
      {
        id: 2,
        name: 'Accesorios',
        references: [
          {
            id: 3,
            name: 'Cables Magic box',
          },
          {
            id: 4,
            name: 'Baterias',
          },
          {
            id: 5,
            name: 'Bases',
          },
          {
            id: 6,
            name: 'Fuentes',
          },
        ],
      },
    ],
  },
};
