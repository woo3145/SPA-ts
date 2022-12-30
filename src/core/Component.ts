export class Component {
  $target: Element;
  $props: object; // 부모자식간 값 전달
  $state: object; // 컴포넌트 상태 값

  // 생명주기 setup() -> setEvent() -> render()
  constructor($target: Element, props?: object) {
    this.$target = $target;
    this.$props = { ...props };
    this.$state = {};
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
  setState(newState: object) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
