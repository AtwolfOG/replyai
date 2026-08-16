import { Platform, Text, type TextProps } from 'react-native';
import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
  className?: string;
};

const typeClasses = {
  default: "text-[16px] leading-[24px] font-medium",
  title: "text-[32px] leading-[52px] font-semibold",
  small: "text-[14px] leading-[20px] font-medium",
  smallBold: "text-[14px] leading-[20px] font-bold",
  subtitle: "text-[28px] leading-[44px] font-semibold",
  link: "text-[14px] leading-[30px]",
  linkPrimary: "text-[14px] leading-[30px]",
  code: "font-mono text-[12px]",
};

export function ThemedText({ style, className, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();
  const hasColorClass = className && /\btext-\S+/.test(className);

  return (
    <Text
      className={cn(typeClasses[type], className)}
      style={[
        (!hasColorClass || themeColor) && { color: theme[themeColor ?? 'text'] },
        type === 'code' && { fontWeight: Platform.select({ android: 700 }) ?? 500 },
        style,
      ]}
      {...rest}
    />
  );
}
