type Class = { new (...args: any[]): any };

interface DefaultProps {
  children: Class;
}
