interface Object {
  [key: string]: any;
}

export class Component<Props = any, State = any> {
  $target: Element;
  $props: Props; // 부모자식간 값 전달
  $state: State; // 컴포넌트 상태 값

  // 생명주기 setup() -> setEvent() -> render()
  constructor($target: Element, props?: Props) {
    this.$target = $target;
    this.$props = props as Props;
    this.$state = {} as State;
    this.setup();
    this.setEvent();
    this.render();
  }
  template(): string {
    return ``;
  }
  setup() {}
  setEvent() {}
  // render 될때 마다 mounted()
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  mounted() {}
  // 상태 값 변경시 리렌더링
  setState(newState: State) {
    this.$state = newState;
    this.render();
  }

  addEvent(
    eventType: keyof GlobalEventHandlersEventMap,
    selector: string,
    callback: any
  ) {
    const children: NodeListOf<Element> =
      this.$target.querySelectorAll(selector);
    const childrenArr = Array.from(children);

    const isTarget = (target: Element) =>
      childrenArr.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (e: Event) => {
      if (e.target instanceof Element) {
        if (!e.target || !isTarget(e.target)) return false;
        callback(e);
      }
    });
  }
}
