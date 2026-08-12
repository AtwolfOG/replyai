import { Platform, Text, type TextProps } from 'react-native';

import { ThemeColor } from '@/src/constants/theme';
import { useTheme } from '@/src/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
  className?: string;
};

const typeClasses = {
  small: "text-[14px] leading-[20px] font-medium text-text-body",
  smallBold: "text-[14px] leading-[20px] font-bold text-text-body",
  default: "text-[16px] leading-[24px] font-medium text-text-body",
  title: "text-[32px] font-bold leading-[52px] text-text-heading", // Use font-bold since 600 weight on native mimics bold
  subtitle: "text-[28px] leading-[44px] font-bold text-text-muted",
  link: "leading-[30px] text-[14px] text-text-link",
  linkPrimary: "leading-[30px] text-[14px] text-text-link",
  code: "font-mono text-[12px] font-medium android:font-bold",
};

export function ThemedText({ style, type = 'default', themeColor, className = '', ...rest }: ThemedTextProps) {

  return (
    <Text
      style={style}
      className={`${typeClasses[type]} ${className}`}
      {...rest}
    />
  );
}

