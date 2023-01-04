import { Component } from '@/core/Component';

interface Props {
  id: number;
}
interface State {
  count: number;
}

export class Counter extends Component<Props, State> {
  setup(): void {
    this.$state = {
      count: 0,
    };
  }

  template(): string {
    return `
        <div>
          <h1>Count_${this.$props.id} : ${this.$state.count}</h1>
          <button class="plus">+</button>
          <button class="minus">-</button>
        </div>`;
  }
  mounted(): void {
    console.log(`counter_${this.$props.id} 렌더링`);
  }

  setEvent(): void {
    this.addEvent('click', '.plus', () => {
      this.plus();
    });
    this.addEvent('click', '.minus', () => {
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
