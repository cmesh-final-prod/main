//////////////////////////////////////////////////////////////////
////////////              Sidenav                  ///////////////
//////////////////////////////////////////////////////////////////

export const SIDENAV_MENU = [
  {
    id: 1,
    name: 'About',
    url: '/about',
    onClick: null,
    className: '',
    icon: 'description'
  },
  {
    id: 2,
    name: 'Contact',
    url: '',
    onClick: null,
    className: '',
    icon: 'email'
  }
];

export const MESH_PROPS = (lng, lat) => {
  return {
    title: 'This event has an organizer',
    coordinates: [lng, lat],
    duration: 0.02,
    startDate: new Date(),
    description:
      'Odit sit ab repudiandae dolor necessitatibus ea asperiores a consectetur.',
    address: '077 Ashly Course',
    primaryOrganizerId: '5b66a503265a4a0314331d49'
  };
};
