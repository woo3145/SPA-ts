import { Nav } from '@/components/Nav';
import { Component } from '@/core/Component';

export class Layout<Props extends DefaultProps> extends Component<Props> {
  template(): string {
    return `
    <div>
        <nav data-component="nav"></nav>
        <main data-component="main"></main>
    </div>`;
  }

  mounted(): void {
    // 자식컴포넌트 렌더링
    const $nav = this.$target.querySelector('[data-component="nav"]');
    const $main = this.$target.querySelector('[data-component="main"]');

    if ($nav) {
      new Nav($nav);
    }
    if ($main && this.$props?.children) {
      new this.$props.children($main);
    }
  }
}
