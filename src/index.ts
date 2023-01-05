import { Layout } from './components/Layout';
import { Component } from './core/Component';
import { Home } from './pages/Home';
import { Posts } from './pages/Posts';
import { Settings } from './pages/Settings';

interface Route {
  path: string;
  view: Class;
}

const navigateTo = (url: string) => {
  history.pushState(null, '', url);
  router();
};

const router = async () => {
  const routes: Route[] = [
    { path: '/', view: Home },
    { path: '/posts', view: Posts },
    { path: '/settings', view: Settings },
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

  const app = document.querySelector('#app');

  if (app) {
    const view = new Layout(app as HTMLElement, { children: match.route.view });
    console.log(view);
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
