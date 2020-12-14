import React from 'react'
import classNames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  classNmae?: string,
  disabled?: boolean,
  size?: ButtonSize,
  btnType?: ButtonType,
  children: React.ReactNode,
  href?: string
}

// 将自定义的属性和Button原生属性交叉到一起
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
// 将自定义的属性和a标签原生属性交叉到一起
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// Paritial将所有属性变成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props
  // btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    // 模板语法
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a 
        href = {href}
        className = {classes}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button 
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button