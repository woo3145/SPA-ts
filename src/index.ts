import { Component, Home } from './pages/Home';
import { Posts } from './pages/Posts';
import { Settings } from './pages/Settings';

interface Route {
  path: string;
  view: Component;
}

const navigateTo = (url: string) => {
  history.pushState(null, '', url);
  router();
};

const router = async () => {
  const routes: Route[] = [
    { path: '/', view: new Home() },
    { path: '/posts', view: new Posts() },
    { path: '/settings', view: new Settings() },
  ];

  const isMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  // 주소가 올바르지 않으면 "/"으로 이동
  let match = isMatches.find((route) => route.isMatch);
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }
  const view: Component = match.route.view;

  const app = document.querySelector('#app');
  if (app) {
    app.innerHTML = await view.getHtml();
  }
};

// 앞으로,뒤로가기 시 라우터실행
window.addEventListener('popstate', router);

// dom 트리가 완성되면 [data-link]를 가진 <a> 태그에 네비게이션 이벤트 추가
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e: any) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
