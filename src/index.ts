interface test {
  a: string;
}

const component = () => {
  const element = document.createElement('div');

  element.innerHTML = `hello`;

  const arr = [1, 2, 3, 4, 5];
  try {
    arr.forEach((n) => console.log(n));
  } catch (e) {
    console.log(e);
  }

  return element;
};

document.body.appendChild(component());
