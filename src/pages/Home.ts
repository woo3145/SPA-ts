import { Nav } from '@/components/Nav';
import { Component } from '@/core/Component';

export class Home extends Component {
  template(): string {
    return `
    <div>
      <h1>Home</h1>
    </div>`;
  }

  mounted(): void {
    // 자식컴포넌트 렌더링
  }
}
