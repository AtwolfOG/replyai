'use client';
import React from 'react';
// import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';
import { tva } from '@gluestack-ui/utils/nativewind-utils';

const StyledExpoLinearGradient = styled(ExpoLinearGradient, { className: 'style' });

const linearGradientStyle = tva({
  base: '',
});

export const LinearGradient = React.forwardRef(
  ({ className, ...props }: any, ref?: any) => {
    return (
      <StyledExpoLinearGradient
        {...props}
        className={linearGradientStyle({ class: className })}
        ref={ref}
      />
    );
  }
);
