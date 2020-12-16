import React from "react";
import { fireEvent, render, RenderResult, cleanup } from "@testing-library/react";

import Menu, { MenuProps } from "./menu";
import MenuItem, { MenuItemProps } from "./menuItem";

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>xyz</MenuItem>
      {/* <li>Hello</li> */}
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  // 在每个测试开始之前都会跑
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test')
    // 有3个li
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  });
  it("click items should active and call the right callback", () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    // onSelect被调用传入参数为 2
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    // 测试disabled
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  });
  it("should render vertical mode when mode is set to vertical", () => {
    // 清除wrapper
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  });
});
