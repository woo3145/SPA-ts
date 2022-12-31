import { Nav } from '@/components/Nav';
import { Component } from '@/core/Component';

export class Settings extends Component {
  template(): string {
    return `<nav data-component="nav"></nav>`;
  }

  mounted(): void {
    // 자식컴포넌트 렌더링
    const $nav = this.$target.querySelector('[data-component="nav"]');

    if ($nav) {
      new Nav($nav);
    }
  }
}
