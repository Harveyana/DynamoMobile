import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function SoraText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Sora' }]} />;
}

export function SansText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Sans' }]} />;
}

export function SansBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SansBold' }]} />;
}