import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled, { css } from 'styled-components/native'

import BACKGROUND from './images/background.png';

const colors = {
  White: '#ffffff',
  GreishBlue: '#344356',
  Gold: '#EDAF08',
};

const image = {
  BACKGROUND,
};


export const StyledText = styled.Text`
  margin-top: 9px;
  color: ${(props: any) => props.color || ' #344356'};
  font-size: ${(props: any) => props.fontSize || 16}px;
  font-weight: ${(props: any) => props.fontWeight || 400};
  margin-left: ${(props: any) => props.marginLeft || 20}px;
  margin-right: ${(props: any) => props.marginRight || 20}px;
  margin-top: ${(props: any) => props.marginTop || hp(3)}px;
  padding-bottom: ${(props: any) => props.marginTop || hp(1.5)}px;
  margin-bottom: ${(props: any) => props.marginBottom || hp('1%')}px;
  text-align: ${(props: any) => props.textAlign || 'left'};
`;


export const StyledButton = styled.TouchableOpacity`
 ${(props: any) =>
    props.disabled ?
      css`
        color: red;
        `: css`
        color: green;
        `};
  margin-top: ${(props: any) => props.marginTop || 0}px;
  flex-direction: row;
  justify-content: ${(props: any) => props.justifyContent || 'center'};
  background-color: ${(props: any) => props.backgroundColor || '#ffffff'};
  color: ${(props: any) => props.color || '#3D45F4'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(61, 69, 244, 0.2);
  width: ${(props: any) => props.width || '90%'};
  border-color: ${(props: any) => props.borderColor || 'transparent'};
  border-width: 1px;
  align-items: center;
  align-self: center;
`;

export { colors, image };
