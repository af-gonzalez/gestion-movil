import * as React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Container, Content, Header } from '@components/layout';
import { scaleTime, scaleLinear } from 'd3-scale';
import { line, curveBasis } from 'd3-shape';
import { Svg } from 'expo';
import { styles } from './executive-report.styles';


const { Path, Defs, LinearGradient, Stop } = Svg;
const height = 200;
const { width } = Dimensions.get('window');

const data = [
  { x: new Date(2018, 9, 1), y: 0 },
  { x: new Date(2018, 9, 16), y: 200 },
  { x: new Date(2018, 9, 17), y: 100 },
  { x: new Date(2018, 10, 1), y: 200 },
  { x: new Date(2018, 10, 2), y: 300 },
  { x: new Date(2018, 10, 3), y: 300 },
];

const scaleX = scaleTime().domain([new Date(2018, 9, 1), new Date(2018, 10, 3)]).range([0, width - 20]);
const scaleY = scaleLinear().domain([0, 300]).range([height - 5, 5]);

const linePath = line()
  .x((d: any) => scaleX(d.x))
  .y((d: any) => scaleY(d.y))
  .curve(curveBasis)(data as any);

export class ExecutiveReportScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header title="Reporte Ejecutivo" />
        <Content>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleText}>
              Reporte de transacciones
            </Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Svg width={width} height={height}>
              <Defs>
                <LinearGradient x1="50%" x2="0%" y1="50%" y2="100%" id="gradient">
                  <Stop stopColor="#CDE3F8" offset="0%" />
                  <Stop stopColor="#eef6fd" offset="80%" />
                  <Stop stopColor="#FEFFFF" offset="100%" />
                </LinearGradient>
              </Defs>
              <Path d={linePath} fill="transparent" stroke="#367be2" strokeWidth={5} />
              <Path d={`${linePath} L ${width - 20 } ${height} L 0 ${height}`}
                    fill="url(#gradient)" />
            </Svg>
          </View>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleText}>
              Productos
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Datafonos(100)</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>RBMovil(50)</Text>
          </View>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitleText}>
              Tarjetas Habilitadas
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>MasterCard</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Visa</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>American Express</Text>
          </View>
        </Content>
      </Container>
    );
  }
}
