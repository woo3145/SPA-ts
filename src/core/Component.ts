import { reconciliation, updateElement } from '@/utils/diff';

interface Object {
  [key: string]: any;
}

export abstract class Component<Props = {}, State = {}> {
  protected $target: HTMLElement;
  protected props: Props; // 부모자식간 값 전달
  protected state!: State; // 컴포넌트 상태 값

  // 생명주기 setup() -> setEvent() -> render()
  constructor($target: HTMLElement, props: Props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
  }

  private render() {
    // 새노드를 만들어 준 template을 다시 받아온 후 diff 알고리즘을 통해 비교하여 변경부분만 렌더링
    // template은 현재의 state값을 기준으로 생성되기 때문에 기존상태와 비교가능
    const $newNode = this.$target.cloneNode(true) as HTMLElement;
    $newNode.innerHTML = this.template();

    reconciliation(this.$target, $newNode);
    this.mounted();
  }

  protected abstract template(): string;

  protected setup() {}
  protected setEvent() {}
  protected mounted() {}
  protected setState<K extends keyof State>(newState: Pick<State, K> | State) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.render();
  }
  protected addEvent(
    eventType: keyof DocumentEventMap,
    selector: string,
    callback: (e: Event) => void
  ) {
    const children: NodeListOf<HTMLElement> =
      this.$target.querySelectorAll(selector);
    const childrenArr = Array.from(children);

    const isTarget = (target: HTMLElement) =>
      childrenArr.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (e: Event) => {
      if (e.target instanceof HTMLElement) {
        if (!e.target || !isTarget(e.target)) return false;
        callback(e);
      }
    });
  }
}
