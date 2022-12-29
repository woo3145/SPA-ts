interface Route {
  path: string;
  view: () => void;
}

const router = async () => {
  const routes: Route[] = [
    { path: '/', view: () => console.log('Main') },
    { path: '/posts', view: () => console.log('Posts') },
    { path: '/settings', view: () => console.log('Settings') },
  ];

  const isMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let isMatch = isMatches.find((route) => route.isMatch);

  console.log(isMatch, isMatches);
};

document.addEventListener('DOMContentLoaded', () => router());

// const component = () => {
//   const element = document.createElement('div');

//   element.innerHTML = `hello`;

//   return element;
// };

// document.body.appendChild(component());
