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
    title: 'Learn how to organize data using google maps',
    coordinates: [lng, lat],
    duration: 1,
    startDate: new Date(),
    description:
      'Odit sit ab repudiandae dolor necessitatibus ea asperiores a consectetur.',
    address: '077 Ashly Course'
  };
};
