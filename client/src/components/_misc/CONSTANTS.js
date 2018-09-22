//////////////////////////////////////////////////////////////////
////////////              Sidenav                  ///////////////
//////////////////////////////////////////////////////////////////

export const SIDENAV_MENU = [
  {
    id: 1,
    name: "Contact Us",
    url: "mailto:team@circlemesh.com",
    className: "transparent white-text color-4-border"
  },
  {
    id: 2,
    name: "Sign In",
    url: "/web/form/signin",
    className: "transparent white-text color-4-border"
  },
  {
    id: 3,
    name: "Create Account",
    url: "/web/form/create",
    className: "gradient-2 white-text bold-text"
  }
];

export const MESH_PROPS = (lng, lat) => {
  let primaryOrganizerId;
  process.env.NODE_ENV === "development"
    ? (primaryOrganizerId = "5b66a503265a4a0314331d49")
    : (primaryOrganizerId = "5b66d4d562317f00142d708b");

  return {
    title: "This event has an organizer",
    coordinates: [lng, lat],
    duration: 0.005,
    startDate: new Date(),
    description:
      "Odit sit ab repudiandae dolor necessitatibus ea asperiores a consectetur.",
    address: "077 Ashly Course",
    primaryOrganizerId
  };
};
