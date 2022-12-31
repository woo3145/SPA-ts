import { Component } from '../core/Component';

const navItems = [
  {
    url: '/',
    text: 'Home',
  },
  {
    url: '/posts',
    text: 'Posts',
  },
  {
    url: '/settings',
    text: 'Settings',
  },
];

export class Nav extends Component {
  template() {
    return `
        ${navItems
          .map((item) => {
            return `
            <div>
                <a href="${item.url}" data-link>${item.text}</a>
            </div>
            `;
          })
          .join('')}
    `;
  }
}
