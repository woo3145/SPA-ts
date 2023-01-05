// diff 알고리즘
// 렌더링 할때 매번 innerHTML을 사용하여 모든 dom을 갈아치우는 것 보다 기존과 변경된 부분만 찾아내어 dom 추가, 삭제, 변경 연산을 하는게 효율적

// 기존 엘리먼트에 새 엘리먼트의 속성값을 업데이트 시켜주는 함수
const updateAttributes = (oldNode: HTMLElement, newNode: HTMLElement) => {
  // 새노드에 포함되지 않은 속성값을 지워줌
  for (const { name } of [...Array.from(oldNode.attributes)]) {
    if (newNode.getAttribute(name)) continue;
    oldNode.removeAttribute(name);
  }
  // 새 노드와 속성값을 일치시켜줌
  for (const { name, value } of [...Array.from(newNode.attributes)]) {
    if (value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }
};

export const updateElement = (
  parent: HTMLElement,
  oldNode?: ChildNode,
  newNode?: ChildNode
) => {
  // 노드가 삭제된 경우
  if (!newNode && oldNode) {
    return oldNode.remove();
  }
  // 새 노드가 추가 된 경우
  if (newNode && !oldNode) {
    return parent.appendChild(newNode);
  }
  // 노드가 형태가 text일 경우 value만 변경
  if (newNode instanceof Text && oldNode instanceof Text) {
    if (newNode.nodeValue === oldNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }
  if (newNode && oldNode) {
    // 노드 타입이 다를경우 (ex. h1 != span)
    if (newNode.nodeName !== oldNode.nodeName) {
      parent.replaceChild(newNode, oldNode);
      return;
    }
    updateAttributes(oldNode as HTMLElement, newNode as HTMLElement);

    reconciliation(oldNode as HTMLElement, newNode as HTMLElement);
  }
};

// 자식노드를 재귀적으로 diff알고리즘 수행
export const reconciliation = (oldNode: HTMLElement, newNode: HTMLElement) => {
  const oldChildNodes = [...Array.from(oldNode.childNodes)];
  const newChildNodes = [...Array.from(newNode.childNodes)];

  const maxLen = Math.max(oldChildNodes.length, newChildNodes.length);

  for (let i = 0; i < maxLen; ++i) {
    updateElement(oldNode as HTMLElement, oldChildNodes[i], newChildNodes[i]);
  }
};
