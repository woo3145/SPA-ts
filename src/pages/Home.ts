import { Counter } from '@/components/Counter';
import { Component } from '@/core/Component';

interface Props {}
interface State {
  count: number;
}

export class Home extends Component<Props, State> {
  setup() {
    this.$state = {
      count: 0,
    };
  }
  template(): string {
    return `
    <div>
      <div>
          <h1>Home Counter : ${this.$state.count}</h1>
          <button class="main_plus">+</button>
          <button class="main_minus">-</button>
      </div>
      <div data-component="counter_1"></div>
      <div data-component="counter_2"></div>
      <div data-component="counter_3"></div>
    </div>`;
  }

  mounted(): void {
    // 자식컴포넌트 렌더링
    const $counter_1 = this.$target.querySelector(
      '[data-component="counter_1"]'
    );
    const $counter_2 = this.$target.querySelector(
      '[data-component="counter_2"]'
    );
    const $counter_3 = this.$target.querySelector(
      '[data-component="counter_3"]'
    );
    if ($counter_1) new Counter($counter_1, { id: 1 });
    if ($counter_2) new Counter($counter_2, { id: 2 });
    if ($counter_3) new Counter($counter_3, { id: 3 });
  }

  setEvent(): void {
    this.addEvent('click', '.main_plus', () => {
      this.plus();
    });
    this.addEvent('click', '.main_minus', () => {
      this.minus();
    });
  }

  plus() {
    const { count } = this.$state;
    this.setState({
      count: count + 1,
    });
  }
  minus() {
    const { count } = this.$state;
    this.setState({
      count: count - 1,
    });
  }
}
